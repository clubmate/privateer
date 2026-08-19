import { Vector3 } from 'three';
import type { Asteroids } from '../world/Asteroids';

/**
 * Zielerfassung fuer die Bordkanonen.
 *
 * Erfasst wird der Brocken, der dem Fadenkreuz am naechsten liegt; erneutes
 * Druecken schaltet auf den naechsten Kandidaten weiter. Aus Zielbewegung und
 * Geschossgeschwindigkeit ergibt sich der Vorhaltepunkt — bei driftenden
 * Brocken auf 2 km trifft man sonst hinter dem Ziel vorbei.
 */

export interface TargetingParams {
  /** Groesste Erfassungsentfernung in Metern. */
  range: number;
  /** Halber Oeffnungswinkel des Erfassungskegels um die Nase, in Radiant. */
  cone: number;
  /** Ueber dieser Entfernung faellt eine Erfassung wieder weg. */
  dropRange: number;
}

export const DEFAULT_TARGETING_PARAMS: TargetingParams = {
  range: 3000,
  cone: Math.PI / 5, // 36 Grad
  dropRange: 4000,
};

/** Momentaufnahme des erfassten Ziels. */
export interface TargetInfo {
  index: number;
  /** Weltposition des Mittelpunkts. */
  position: Vector3;
  /** Eigenbewegung in m/s. */
  velocity: Vector3;
  /** Punkt, auf den gehalten werden muss (Vorhalt). */
  lead: Vector3;
  distance: number;
  radius: number;
  /** Zustand 0..1. */
  integrity: number;
}

/**
 * Punkt, an dem ein mit `projectileSpeed` abgefeuertes Geschoss das Ziel
 * trifft.
 *
 * Loest |r + v t| = s t nach der kleinsten positiven Flugzeit t auf, mit
 * r = Zielabstand und v = Relativgeschwindigkeit. Ist das Ziel schneller als
 * das Geschoss (keine positive Loesung), gibt es keinen Vorhaltepunkt — dann
 * bleibt die Zielposition selbst die beste Auskunft.
 */
export function computeLeadPoint(
  targetPosition: Vector3,
  targetVelocity: Vector3,
  shooterPosition: Vector3,
  shooterVelocity: Vector3,
  projectileSpeed: number,
  out: Vector3,
): Vector3 {
  const r = _r.subVectors(targetPosition, shooterPosition);
  const v = _v.subVectors(targetVelocity, shooterVelocity);

  const a = v.lengthSq() - projectileSpeed * projectileSpeed;
  const b = 2 * r.dot(v);
  const c = r.lengthSq();

  let time = -1;
  if (Math.abs(a) < 1e-6) {
    // Ziel genau so schnell wie das Geschoss: lineare Gleichung.
    if (Math.abs(b) > 1e-6) time = -c / b;
  } else {
    const discriminant = b * b - 4 * a * c;
    if (discriminant >= 0) {
      const root = Math.sqrt(discriminant);
      const t1 = (-b - root) / (2 * a);
      const t2 = (-b + root) / (2 * a);
      // Kleinste positive Loesung; negative bedeuten "nicht einholbar".
      const positives = [t1, t2].filter((t) => t > 0);
      if (positives.length > 0) time = Math.min(...positives);
    }
  }

  if (time <= 0 || !Number.isFinite(time)) return out.copy(targetPosition);
  // Versetzt wird mit der *Relativ*geschwindigkeit: das Geschoss erbt die
  // Bahngeschwindigkeit des Schiffs, im mitbewegten System zieht also nur die
  // Differenz. Mit der absoluten Zielgeschwindigkeit laege der Haltepunkt
  // falsch, sobald das eigene Schiff selbst quer fliegt.
  return out.copy(v).multiplyScalar(time).add(targetPosition);
}

const _r = new Vector3();
const _v = new Vector3();
const _center = new Vector3();
const _velocity = new Vector3();
const _toTarget = new Vector3();

export class Targeting {
  private index = -1;
  private readonly params: TargetingParams;
  private readonly info: TargetInfo = {
    index: -1,
    position: new Vector3(),
    velocity: new Vector3(),
    lead: new Vector3(),
    distance: 0,
    radius: 0,
    integrity: 1,
  };

  constructor(params: Partial<TargetingParams> = {}) {
    this.params = { ...DEFAULT_TARGETING_PARAMS, ...params };
  }

  getParams(): Readonly<TargetingParams> {
    return this.params;
  }

  /** Index des erfassten Ziels, oder -1. */
  getIndex(): number {
    return this.index;
  }

  clear(): void {
    this.index = -1;
  }

  /**
   * Naechstes Ziel erfassen: Kandidaten sind lebende Brocken im Kegel um die
   * Nase, sortiert nach Winkelabstand zum Fadenkreuz. Ist bereits eines
   * erfasst, wird auf den naechsten der Liste weitergeschaltet.
   */
  cycle(asteroids: Asteroids, origin: Vector3, forward: Vector3): number {
    const candidates: Array<{ index: number; angle: number }> = [];

    for (let i = 0; i < asteroids.count; i++) {
      if (!asteroids.isAlive(i)) continue;
      asteroids.getCenter(i, _center);
      _toTarget.subVectors(_center, origin);
      const distance = _toTarget.length();
      if (distance > this.params.range || distance < 1e-3) continue;

      const angle = _toTarget.divideScalar(distance).angleTo(forward);
      if (angle > this.params.cone) continue;
      candidates.push({ index: i, angle });
    }

    if (candidates.length === 0) {
      this.index = -1;
      return -1;
    }

    candidates.sort((a, b) => a.angle - b.angle);
    const current = candidates.findIndex((c) => c.index === this.index);
    this.index = candidates[(current + 1) % candidates.length]!.index;
    return this.index;
  }

  /**
   * Zustand des Ziels fuer HUD und Radar. Liefert `null`, wenn nichts erfasst
   * ist oder das Ziel zerstoert bzw. ausser Reichweite geraten ist; die
   * Erfassung faellt dann von selbst weg.
   */
  update(
    asteroids: Asteroids,
    origin: Vector3,
    shooterVelocity: Vector3,
    projectileSpeed: number,
  ): TargetInfo | null {
    if (this.index < 0) return null;
    if (!asteroids.isAlive(this.index)) {
      this.index = -1;
      return null;
    }

    asteroids.getCenter(this.index, _center);
    const distance = _center.distanceTo(origin);
    if (distance > this.params.dropRange) {
      this.index = -1;
      return null;
    }

    asteroids.getVelocity(this.index, _velocity);
    const info = this.info;
    info.index = this.index;
    info.position.copy(_center);
    info.velocity.copy(_velocity);
    info.distance = distance;
    info.radius = asteroids.getRadius(this.index);
    info.integrity = asteroids.getIntegrity(this.index);
    computeLeadPoint(_center, _velocity, origin, shooterVelocity, projectileSpeed, info.lead);
    return info;
  }
}
