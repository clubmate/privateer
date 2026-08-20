import { Vector3 } from 'three';
import type { Asteroids } from './Asteroids';

/**
 * **Hilfsmittel, kein Spielinhalt.**
 *
 * Das heutige Asteroidenfeld erzeugt Brocken bis 50 m Radius — die
 * Groessenklasse `huge` (ab 150 m), die als einzige `isLandable` meldet, kommt
 * darin gar nicht vor. Damit die Landung entwickelt, getestet und abgenommen
 * werden kann, setzt diese Funktion einzelne Plaetze des Feldes von Hand auf
 * Planetoidengroesse um.
 *
 * Sobald das neue Feld echte Grossbrocken liefert, faellt die Datei ersatzlos
 * weg — sie wird nur aus dem Landungs-Block in `main.ts` aufgerufen.
 *
 * Zugegriffen wird auf die internen Reihen von {@link Asteroids}, so wie es
 * auch die Tests der Rumpfkollision tun: das ist der einzige Weg, einen
 * reproduzierbaren Aufbau zu erzwingen, ohne fremde Dateien zu aendern.
 */

export interface PlanetoidSpec {
  /** Mittelpunkt in Weltkoordinaten. */
  position: Vector3;
  /** Umrissradius in Metern — ab 150 m gilt der Brocken als Planetoid. */
  radius: number;
  /** Eigendrehung in rad/s. Ein 300-m-Fels dreht sich langsam. */
  spin?: number;
  /** Drehachse; ohne Angabe schraeg gestellt. */
  axis?: Vector3;
}

/** Muss zu `HIT_RADIUS_FACTOR` in Asteroids.ts passen. */
const HIT_RADIUS_FACTOR = 1.15;
/** Muss zu `HITPOINTS_PER_METER` in Asteroids.ts passen. */
const HITPOINTS_PER_METER = 14;

interface AsteroidInternals {
  positions: Vector3[];
  velocities: Vector3[];
  scales: number[];
  speeds: number[];
  axes: Vector3[];
  hitpoints: number[];
  maxHitpoints: number[];
  mined: number[];
}

/**
 * Setzt die letzten Plaetze des Feldes auf Planetoiden um und liefert deren
 * Indizes. Die letzten, weil dort am wenigsten stoert, dass ein kleiner
 * Brocken verschwindet.
 */
export function addDebugPlanetoids(asteroids: Asteroids, specs: readonly PlanetoidSpec[]): number[] {
  const internals = asteroids as unknown as AsteroidInternals;
  const indices: number[] = [];

  specs.forEach((spec, n) => {
    const index = asteroids.count - 1 - n;
    if (index < 0) return;

    const scale = spec.radius / HIT_RADIUS_FACTOR;
    internals.positions[index]!.copy(spec.position).sub(asteroids.position);
    // Planetoiden treiben nicht durchs Feld — sonst laesst sich ein Landeplatz
    // nicht zweimal anfliegen.
    internals.velocities[index]!.set(0, 0, 0);
    internals.scales[index] = scale;
    internals.speeds[index] = spec.spin ?? 0.05;
    internals.axes[index]!.copy(spec.axis ?? new Vector3(0.22, 1, 0.16)).normalize();
    internals.hitpoints[index] = 1 + Math.floor(scale / HITPOINTS_PER_METER);
    internals.maxHitpoints[index] = internals.hitpoints[index]!;
    internals.mined[index] = 0;
    indices.push(index);
  });

  clearIntruders(asteroids, indices);
  // Schreibt die Instanzmatrizen neu, ohne etwas weiterzudrehen.
  asteroids.update(0);
  return indices;
}

/**
 * Kleinbrocken aus dem Inneren der neuen Planetoiden raeumen.
 *
 * Sie stecken sonst im Fels und ragen aus ihm heraus — und weil die Landung
 * nur die Kollision mit *ihrem* Brocken aussetzt, schlaegt das Schiff beim
 * Sinkflug in einen von ihnen ein. Sie wachsen nach der ueblichen Frist
 * anderswo im Feld nach.
 */
function clearIntruders(asteroids: Asteroids, planetoids: readonly number[]): void {
  const center = new Vector3();
  const other = new Vector3();

  for (const index of planetoids) {
    asteroids.getCenter(index, center);
    const reach = asteroids.getRadius(index) * 1.5;
    for (let i = 0; i < asteroids.count; i++) {
      if (i === index || !asteroids.isAlive(i) || planetoids.includes(i)) continue;
      asteroids.getCenter(i, other);
      if (other.distanceTo(center) < reach + asteroids.getRadius(i)) {
        asteroids.damage(i, Number.MAX_SAFE_INTEGER);
      }
    }
  }
}
