import { Vector3 } from 'three';
import type { Object3D } from 'three';
import type { Asteroids } from '../world/Asteroids';
import type { ImpactSink } from './Effects';

/**
 * Rumpfkollision gegen das Asteroidenfeld.
 *
 * Getestet wird als **Sweep**: bei 500 m/s legt das Schiff je Physikschritt
 * gut vier Meter zurueck — ein reiner Ueberlappungstest an der neuen Position
 * wuerde kleine Brocken einfach ueberspringen. Stattdessen laeuft der
 * Schrittweg als Strecke gegen die um den Schiffsradius vergroesserten
 * Brocken.
 */

export interface HullParams {
  /** Kollisionsradius des Schiffs in Metern. */
  radius: number;
  /** Rueckprall entlang der Stossnormalen, 0 = kleben, 1 = elastisch. */
  restitution: number;
  /** Anteil der Tangentialgeschwindigkeit, der beim Schrammen erhalten bleibt. */
  tangentialKeep: number;
  /** Unter dieser Aufprallgeschwindigkeit gibt es keinen Schaden (m/s). */
  minImpactSpeed: number;
  /** Aufprallgeschwindigkeit, die die Huelle komplett aufbraucht (m/s). */
  lethalImpactSpeed: number;
  /** Aufprallgeschwindigkeit je Trefferpunkt Schaden am Brocken. */
  ramSpeedPerHit: number;
  /**
   * Selbstreparatur je Sekunde, sobald {@link HullParams.repairDelay} lang
   * nichts passiert ist. Platzhalter, bis es Stationen zum Andocken gibt —
   * ohne ihn waere eine leere Huelle eine Sackgasse ohne Ausweg.
   */
  repairRate: number;
  /** Ruhe in Sekunden, bevor die Selbstreparatur anlaeuft. */
  repairDelay: number;
}

export const DEFAULT_HULL_PARAMS: HullParams = {
  radius: 4.5,
  restitution: 0.35,
  tangentialKeep: 0.8,
  minImpactSpeed: 8,
  lethalImpactSpeed: 450,
  ramSpeedPerHit: 45,
  repairRate: 0.015,
  repairDelay: 8,
};

/** Ergebnis eines Zusammenstosses. */
export interface Impact {
  /** Aufprallgeschwindigkeit entlang der Stossnormalen in m/s. */
  speed: number;
  /** Zugefuegter Huellenschaden, 0..1. */
  damage: number;
  /** Wurde der Brocken dabei zertruemmert? */
  destroyed: boolean;
}

const _from = new Vector3();
const _direction = new Vector3();
const _normal = new Vector3();
const _center = new Vector3();
const _tangent = new Vector3();

export class HullCollision {
  /** Huellenintegritaet 0..1. */
  integrity = 1;
  /** Sekunden seit dem letzten Zusammenstoss (fuer HUD und Kamera). */
  sinceImpact = Infinity;

  private readonly params: HullParams;
  private readonly previous = new Vector3();
  private hasPrevious = false;

  constructor(
    private readonly asteroids: Asteroids,
    private readonly effects: ImpactSink | null = null,
    params: Partial<HullParams> = {},
  ) {
    this.params = { ...DEFAULT_HULL_PARAMS, ...params };
  }

  getParams(): Readonly<HullParams> {
    return this.params;
  }

  /**
   * Nach einem Floating-Origin-Sprung aufrufen: die gemerkte Vorposition liegt
   * sonst um den Versatz daneben und taeuscht einen riesigen Schritt vor.
   */
  shift(offset: Vector3): void {
    this.previous.sub(offset);
  }

  /** Huelle reparieren (z. B. beim Andocken — noch ungenutzt). */
  repair(): void {
    this.integrity = 1;
  }

  /**
   * Ein Physikschritt. Beruehrt das Schiff einen Brocken, wird es aus ihm
   * herausgeschoben, die Geschwindigkeit reflektiert und beiden Seiten Schaden
   * zugefuegt. Liefert den Zusammenstoss oder `null`.
   */
  update(dt: number, ship: Object3D, velocity: Vector3): Impact | null {
    this.sinceImpact += dt;
    if (this.sinceImpact > this.params.repairDelay && this.integrity < 1) {
      this.integrity = Math.min(this.integrity + this.params.repairRate * dt, 1);
    }

    if (!this.hasPrevious) {
      this.previous.copy(ship.position);
      this.hasPrevious = true;
      return null;
    }

    _direction.subVectors(ship.position, this.previous);
    const travelled = _direction.length();
    this.previous.copy(ship.position);

    // Auch im Stand pruefen (Brocken driften ja selbst).
    const length = Math.max(travelled, 1e-4);
    if (travelled > 1e-6) _direction.divideScalar(travelled);
    else _direction.set(0, 0, 1);
    _from.copy(ship.position).addScaledVector(_direction, -travelled);

    const hit = this.asteroids.hitSegment(_from, _direction, length, this.params.radius);
    if (!hit) return null;

    this.asteroids.getCenter(hit.index, _center);
    // Massgeblich ist die Position im Moment der Beruehrung, nicht die am
    // Schrittende: bei einem Durchschlag laege das Schiff sonst schon hinter
    // dem Brocken, und die Stossnormale zeigte in Flugrichtung — der Aufprall
    // wuerde als "entfernt sich" gewertet und bliebe folgenlos.
    _normal.subVectors(hit.point, _center);
    const distance = _normal.length();
    if (distance < 1e-6) _normal.set(0, 1, 0);
    else _normal.divideScalar(distance);

    // Schiff auf die Beruehrungsstelle zuruecksetzen.
    const clearance = hit.radius + this.params.radius;
    ship.position.copy(_center).addScaledVector(_normal, clearance);
    this.previous.copy(ship.position);

    const approach = velocity.dot(_normal);
    const speed = approach < 0 ? -approach : 0;

    // Normalanteil zurueckwerfen, Tangentialanteil abbremsen.
    if (approach < 0) {
      _tangent.copy(velocity).addScaledVector(_normal, -approach);
      velocity
        .copy(_tangent)
        .multiplyScalar(this.params.tangentialKeep)
        .addScaledVector(_normal, -approach * this.params.restitution);
    }

    const damage =
      speed <= this.params.minImpactSpeed
        ? 0
        : Math.min((speed - this.params.minImpactSpeed) / this.params.lethalImpactSpeed, 1);
    this.integrity = Math.max(this.integrity - damage, 0);
    this.sinceImpact = 0;

    const ram = Math.max(1, Math.round(speed / this.params.ramSpeedPerHit));
    const destroyed = this.asteroids.damage(hit.index, ram);

    if (this.effects) {
      if (destroyed) this.effects.spawnExplosion(hit.point, hit.radius, _tangent.set(0, 0, 0));
      else this.effects.spawnImpact(hit.point, Math.min(hit.radius, 8));
    }

    return { speed, damage, destroyed };
  }
}
