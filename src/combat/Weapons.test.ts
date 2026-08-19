import { describe, expect, it } from 'vitest';
import { Object3D, Vector3 } from 'three';
import { Asteroids } from '../world/Asteroids';
import type { ImpactSink } from './Effects';
import { Weapons } from './Weapons';

/** Effektsenke ohne Canvas: zaehlt nur mit, was passiert waere. */
class RecordingSink implements ImpactSink {
  impacts = 0;
  explosions = 0;
  spawnImpact(): void {
    this.impacts++;
  }
  spawnExplosion(): void {
    this.explosions++;
  }
}

/** Feld mit einem Brocken direkt vor der Nase (Nase = -Z). */
function setup(distance = 400, radius = 25) {
  const asteroids = new Asteroids({ count: 1, minRadius: radius, maxRadius: radius, seed: 5 });
  const internals = asteroids as unknown as { positions: Vector3[]; velocities: Vector3[] };
  internals.positions[0]!.set(0, 0, -distance);
  internals.velocities[0]!.set(0, 0, 0);

  const sink = new RecordingSink();
  const weapons = new Weapons(asteroids, sink);
  const ship = new Object3D();
  return { asteroids, weapons, ship, sink };
}

/** `seconds` Sekunden Waffenlogik mit festem Timestep. */
function run(weapons: Weapons, ship: Object3D, velocity: Vector3, seconds: number): void {
  const dt = 1 / 120;
  for (let i = 0; i < Math.round(seconds / dt); i++) weapons.update(dt, ship, velocity);
}

describe('Weapons', () => {
  it('feuert nur mit gedruecktem Abzug', () => {
    const { weapons, ship, sink } = setup();
    run(weapons, ship, new Vector3(), 1);
    expect(sink.impacts).toBe(0); // kein Muendungsblitz
  });

  it('haelt die Feuerrate ein', () => {
    const { weapons, ship, sink } = setup(100_000); // nichts in Reichweite
    weapons.setTrigger(true);
    run(weapons, ship, new Vector3(), 1);

    const expected = Math.floor(1 / weapons.getParams().fireInterval);
    // Jeder Schuss erzeugt genau einen Muendungsblitz.
    expect(sink.impacts).toBeGreaterThanOrEqual(expected - 1);
    expect(sink.impacts).toBeLessThanOrEqual(expected + 1);
  });

  it('trifft einen Brocken vor der Nase und beschaedigt ihn', () => {
    const { asteroids, weapons, ship } = setup(400, 25);
    weapons.setTrigger(true);
    run(weapons, ship, new Vector3(), 0.6);

    expect(asteroids.getIntegrity(0)).toBeLessThan(1);
  });

  it('zaehlt Abschuesse und meldet den Treffer ans HUD', () => {
    const { asteroids, weapons, ship, sink } = setup(400, 8); // ein Treffer genuegt
    weapons.setTrigger(true);
    run(weapons, ship, new Vector3(), 1.5);

    expect(weapons.kills).toBe(1);
    expect(asteroids.isAlive(0)).toBe(false);
    expect(sink.explosions).toBe(1);
    expect(weapons.getTimeSinceHit()).toBeLessThan(1.5);
  });

  it('trifft nichts, was ausserhalb der Reichweite liegt', () => {
    const { asteroids, weapons, ship } = setup(20_000, 25);
    weapons.setTrigger(true);
    run(weapons, ship, new Vector3(), 5);

    expect(asteroids.getIntegrity(0)).toBe(1);
  });

  it('nimmt die Bahngeschwindigkeit des Schiffs mit', () => {
    const { weapons, ship } = setup(100_000);
    const drift = new Vector3(0, 0, -400);
    weapons.setTrigger(true);
    weapons.update(1 / 120, ship, drift);

    // Nach einer Sekunde muss das Geschoss um Muendungsgeschwindigkeit *plus*
    // Schiffsgeschwindigkeit vorangekommen sein.
    const internals = weapons as unknown as { bolts: Array<{ velocity: Vector3 }> };
    const bolt = internals.bolts.find((b) => b.velocity.lengthSq() > 0)!;
    expect(bolt.velocity.length()).toBeCloseTo(weapons.getParams().boltSpeed + 400, 0);
  });

  it('verschiebt fliegende Geschosse beim Origin-Sprung mit', () => {
    const { weapons, ship } = setup(100_000);
    weapons.setTrigger(true);
    weapons.update(1 / 120, ship, new Vector3());

    const internals = weapons as unknown as { bolts: Array<{ position: Vector3; remaining: number }> };
    const bolt = internals.bolts.find((b) => b.remaining > 0)!;
    const before = bolt.position.clone();

    const offset = new Vector3(10_000, 0, 0);
    weapons.shift(offset);
    expect(bolt.position.distanceTo(before.sub(offset))).toBeLessThan(1e-6);
  });

  it('laesst Geschosse nach der Reichweite verloeschen', () => {
    const { weapons, ship } = setup(100_000);
    weapons.setTrigger(true);
    weapons.update(1 / 120, ship, new Vector3());
    weapons.setTrigger(false);

    const internals = weapons as unknown as { bolts: Array<{ remaining: number }> };
    expect(internals.bolts.some((b) => b.remaining > 0)).toBe(true);

    const flightTime = weapons.getParams().range / weapons.getParams().boltSpeed;
    run(weapons, ship, new Vector3(), flightTime + 0.2);
    expect(internals.bolts.every((b) => b.remaining <= 0)).toBe(true);
  });
});
