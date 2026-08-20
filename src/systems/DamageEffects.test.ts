import { describe, expect, it } from 'vitest';
import { Object3D, Vector3 } from 'three';
import { Asteroids } from '../world/Asteroids';
import type { ImpactSink } from '../combat/Effects';
import { Weapons } from '../combat/Weapons';
import { FlightModel } from '../ship/FlightModel';
import { ShipSystems } from './Systems';

/**
 * Der Nachweis, dass Schaden im Spiel ankommt: die Faktoren aus `ShipSystems`
 * werden hier tatsaechlich durch Flugmodell und Waffen geschickt. Ohne diese
 * Tests waere nur belegt, dass die Zahlen kleiner werden, nicht dass das Schiff
 * langsamer fliegt.
 */

function run(flight: FlightModel, seconds: number): void {
  const dt = 1 / 120;
  for (let i = 0; i < Math.round(seconds / dt); i++) flight.update(dt);
}

/** Endgeschwindigkeit bei Sollgeschwindigkeit 300 nach der Einschwingzeit. */
function topSpeed(systems: ShipSystems | null): number {
  const flight = new FlightModel(new Object3D());
  if (systems) flight.setDamage(systems.getFlightDamage());
  flight.setSetSpeed(300);
  run(flight, 20);
  return flight.getSpeed();
}

class CountingSink implements ImpactSink {
  shots = 0;
  spawnImpact(): void {
    this.shots++;
  }
  spawnExplosion(): void {}
}

/** Schuesse in einer Sekunde Dauerfeuer, ohne etwas in Reichweite. */
function shotsPerSecond(systems: ShipSystems | null): number {
  const asteroids = new Asteroids({ count: 1, seed: 3 });
  const internals = asteroids as unknown as { positions: Vector3[] };
  internals.positions[0]!.set(0, 0, -100_000);

  const sink = new CountingSink();
  const weapons = new Weapons(asteroids, sink);
  if (systems) weapons.setDamage(systems.getWeaponDamage());
  weapons.setTrigger(true);

  const ship = new Object3D();
  const velocity = new Vector3();
  const dt = 1 / 120;
  for (let i = 0; i < 120; i++) weapons.update(dt, ship, velocity);
  return sink.shots;
}

describe('Schadenswirkung im Flugmodell', () => {
  it('laesst ein heiles Schiff unveraendert fliegen', () => {
    expect(topSpeed(new ShipSystems())).toBeCloseTo(topSpeed(null), 6);
  });

  it('drueckt die Hoechstgeschwindigkeit bei defektem Triebwerk', () => {
    const systems = new ShipSystems();
    systems.damage('engine', 0.5);
    const hurt = topSpeed(systems);
    expect(hurt).toBeLessThan(topSpeed(null) * 0.8);

    systems.damage('engine', 0.45);
    expect(topSpeed(systems)).toBeLessThan(hurt);
  });

  it('macht die Drehung mit defekten Duesen traeger', () => {
    const healthy = new FlightModel(new Object3D());
    healthy.inputs.yaw = 1;
    run(healthy, 2);

    const systems = new ShipSystems();
    systems.damage('thrusters', 0.6);
    const hurt = new FlightModel(new Object3D());
    hurt.setDamage(systems.getFlightDamage());
    hurt.inputs.yaw = 1;
    run(hurt, 2);

    expect(Math.abs(hurt.angularVelocity.y)).toBeLessThan(
      Math.abs(healthy.angularVelocity.y) * 0.9,
    );
  });

  it('zieht mit defekten Duesen zur Seite, auch ohne Eingabe', () => {
    const systems = new ShipSystems();
    systems.damage('thrusters', 0.9);

    const ship = new Object3D();
    const flight = new FlightModel(ship);
    flight.setDamage(systems.getFlightDamage());
    run(flight, 3);

    // Der Flight-Assist haelt die Drehrate auf 0, der Versatz dreht trotzdem.
    expect(flight.angularVelocity.length()).toBeLessThan(1e-6);
    const nose = new Vector3(0, 0, -1).applyQuaternion(ship.quaternion);
    expect(Math.abs(nose.x)).toBeGreaterThan(0.05);
  });

  it('sperrt den Nachbrenner ohne Generator', () => {
    const systems = new ShipSystems();
    systems.damage('generator', 1);

    const flight = new FlightModel(new Object3D());
    flight.setDamage(systems.getFlightDamage());
    flight.inputs.afterburner = true;
    run(flight, 10);

    // Ohne Strom bleibt es bei der Sollgeschwindigkeit 0 statt Boost.
    expect(flight.getSpeed()).toBeLessThan(1);
  });
});

describe('Schadenswirkung an den Bordkanonen', () => {
  it('laesst heile Kanonen unveraendert feuern', () => {
    expect(shotsPerSecond(new ShipSystems())).toBe(shotsPerSecond(null));
  });

  it('feuert mit beschaedigtem Waffenrechner langsamer', () => {
    const systems = new ShipSystems();
    systems.damage('weapons', 0.5);
    expect(shotsPerSecond(systems)).toBeLessThan(shotsPerSecond(null));
  });

  it('schweigt bei ausgefallenen Kanonen', () => {
    const systems = new ShipSystems();
    systems.damage('weapons', 1);
    expect(shotsPerSecond(systems)).toBe(0);
  });
});
