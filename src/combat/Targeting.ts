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
      // Zwei Vergleiche statt Feld, Closure und Spread — dieselbe Antwort.
      if (t1 > 0) time = t2 > 0 ? Math.min(t1, t2) : t1;
      else if (t2 > 0) time = t2;
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
  /** Arbeitsfelder fuer {@link cycle} — wiederverwendet statt je Druck neu. */
  private readonly candidates: number[] = [];
  private readonly scores: number[] = [];
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
    // Gerechnet wird im Kosinus, nicht im Winkel. `angleTo` ist ein `acos` und
    // zwei Wurzeln je Kandidat — bei 420 Brocken also 420 `acos` je
    // Tastendruck, nur um danach zu sortieren. Beide Vektoren sind normiert,
    // das Skalarprodukt ist der Kosinus, und weil er auf [0, pi] streng
    // faellt, ergibt "absteigend nach Kosinus" exakt dieselbe Reihenfolge wie
    // "aufsteigend nach Winkel".
    const minCos = Math.cos(this.params.cone);
    const range = this.params.range;
    const candidates = this.candidates;
    const scores = this.scores;
    let count = 0;

    for (let i = 0; i < asteroids.count; i++) {
      if (!asteroids.isAlive(i)) continue;
      asteroids.getCenter(i, _center);
      _toTarget.subVectors(_center, origin);
      const distanceSq = _toTarget.lengthSq();
      if (distanceSq > range * range || distanceSq < 1e-6) continue;

      const cos = _toTarget.dot(forward) / Math.sqrt(distanceSq);
      if (cos < minCos) continue;
      candidates[count] = i;
      scores[count] = cos;
      count++;
    }

    if (count === 0) {
      this.index = -1;
      return -1;
    }

    // Einfaches Einfuegesortieren: die Liste ist kurz (was im Kegel liegt),
    // und ein Vergleicher waere hier eine Closure je Tastendruck.
    for (let i = 1; i < count; i++) {
      const value = candidates[i]!;
      const score = scores[i]!;
      let j = i - 1;
      while (j >= 0 && scores[j]! < score) {
        candidates[j + 1] = candidates[j]!;
        scores[j + 1] = scores[j]!;
        j--;
      }
      candidates[j + 1] = value;
      scores[j + 1] = score;
    }

    let current = -1;
    for (let i = 0; i < count; i++) {
      if (candidates[i] === this.index) {
        current = i;
        break;
      }
    }
    this.index = candidates[(current + 1) % count]!;
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
