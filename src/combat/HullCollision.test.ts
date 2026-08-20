import { describe, expect, it } from 'vitest';
import { Object3D, Vector3 } from 'three';
import { Asteroids } from '../world/Asteroids';
import { HullCollision } from './HullCollision';

/**
 * Feld mit genau einem Brocken bei (0,0,-500): `count: 1` plus ein Seed liefert
 * keine feste Position, deshalb wird der Brocken danach dorthin gesetzt und
 * seine Drift genullt — so ist der Aufbau der Tests exakt beschreibbar.
 */
function fieldWithSingleRock(
  distance = 500,
  radius = 20,
): { asteroids: Asteroids; center: Vector3; surface: number } {
  const asteroids = new Asteroids({ count: 1, minRadius: radius, maxRadius: radius, seed: 3 });
  const center = new Vector3(0, 0, -distance);
  // Zugriff auf die internen Reihen: im Test ist das der praeziseste Weg,
  // einen reproduzierbaren Aufbau herzustellen.
  const internals = asteroids as unknown as {
    positions: Vector3[];
    velocities: Vector3[];
  };
  internals.positions[0]!.copy(center);
  internals.velocities[0]!.set(0, 0, 0);
  // Brocken sind nicht rund: der Abstand der Oberflaeche vom Mittelpunkt
  // haengt von der Richtung ab. Das Schiff kommt hier immer aus +z, also
  // zaehlt der Radius in diese Richtung — nicht der Umriss.
  const sample = { point: new Vector3(), normal: new Vector3() };
  asteroids.sampleSurface(0, center.clone().add(new Vector3(0, 0, 100)), sample);
  return { asteroids, center, surface: sample.point.distanceTo(center) };
}

function shipAt(x: number, y: number, z: number): Object3D {
  const ship = new Object3D();
  ship.position.set(x, y, z);
  return ship;
}

describe('HullCollision', () => {
  it('meldet im ersten Schritt nichts (keine Vorposition)', () => {
    const { asteroids } = fieldWithSingleRock();
    const hull = new HullCollision(asteroids);
    expect(hull.update(1 / 120, shipAt(0, 0, 0), new Vector3())).toBeNull();
  });

  it('laesst freie Fahrt in Ruhe', () => {
    const { asteroids } = fieldWithSingleRock();
    const hull = new HullCollision(asteroids);
    const ship = shipAt(0, 0, 0);
    const velocity = new Vector3(0, 0, 0);

    hull.update(1 / 120, ship, velocity);
    for (let i = 0; i < 100; i++) {
      ship.position.x += 1;
      expect(hull.update(1 / 120, ship, velocity)).toBeNull();
    }
    expect(hull.integrity).toBe(1);
  });

  it('erwischt den Brocken auch bei einem Schritt, der ihn ueberspringt', () => {
    // 500 m/s: rund 4 m je Schritt. Hier wird bewusst in einem einzigen Schritt
    // weit hinter den Brocken gesprungen — ohne Sweep-Test bliebe das unbemerkt.
    const { asteroids } = fieldWithSingleRock(500, 20);
    const hull = new HullCollision(asteroids);
    const ship = shipAt(0, 0, 0);
    const velocity = new Vector3(0, 0, -20_000);

    hull.update(1 / 120, ship, velocity);
    ship.position.set(0, 0, -1000); // quer durch den Brocken hindurch
    const impact = hull.update(1 / 120, ship, velocity);

    expect(impact).not.toBeNull();
    expect(impact!.speed).toBeGreaterThan(0);
  });

  it('schiebt das Schiff aus dem Brocken heraus', () => {
    const { asteroids, center, surface } = fieldWithSingleRock(500, 20);
    const hull = new HullCollision(asteroids);
    const ship = shipAt(0, 0, -400);
    const velocity = new Vector3(0, 0, -100);

    hull.update(1 / 120, ship, velocity);
    ship.position.set(0, 0, -500); // mitten im Brocken
    hull.update(1 / 120, ship, velocity);

    const clearance = surface + hull.getParams().radius;
    expect(ship.position.distanceTo(center)).toBeCloseTo(clearance, 3);
  });

  it('wirft das Schiff zurueck statt es durchfliegen zu lassen', () => {
    const { asteroids, surface } = fieldWithSingleRock(500, 20);
    const hull = new HullCollision(asteroids);
    const ship = shipAt(0, 0, -400);
    const velocity = new Vector3(0, 0, -100);

    hull.update(1 / 120, ship, velocity);
    ship.position.set(0, 0, -500 + surface);
    hull.update(1 / 120, ship, velocity);

    expect(velocity.z).toBeGreaterThan(0); // Richtung umgekehrt
    expect(Math.abs(velocity.z)).toBeLessThan(100); // und langsamer als vorher
  });

  it('kostet Huelle — je schneller, desto mehr', () => {
    const slow = fieldWithSingleRock(500, 20);
    const fast = fieldWithSingleRock(500, 20);
    const touch = -500 + slow.surface;
    const hullSlow = new HullCollision(slow.asteroids);
    const hullFast = new HullCollision(fast.asteroids);

    const crash = (hull: HullCollision, speed: number): number => {
      const ship = shipAt(0, 0, -400);
      const velocity = new Vector3(0, 0, -speed);
      hull.update(1 / 120, ship, velocity);
      ship.position.set(0, 0, touch);
      hull.update(1 / 120, ship, velocity);
      return hull.integrity;
    };

    const afterSlow = crash(hullSlow, 40);
    const afterFast = crash(hullFast, 200);
    expect(afterSlow).toBeLessThan(1);
    expect(afterFast).toBeLessThan(afterSlow);
    expect(afterFast).toBeGreaterThanOrEqual(0);
  });

  it('laesst sanftes Anlegen ohne Schaden zu', () => {
    const { asteroids, surface } = fieldWithSingleRock(500, 20);
    const hull = new HullCollision(asteroids);
    const ship = shipAt(0, 0, -400);
    const velocity = new Vector3(0, 0, -3); // unter minImpactSpeed

    hull.update(1 / 120, ship, velocity);
    ship.position.set(0, 0, -500 + surface + hull.getParams().radius - 0.5);
    const impact = hull.update(1 / 120, ship, velocity);

    expect(impact).not.toBeNull();
    expect(impact!.damage).toBe(0);
    expect(hull.integrity).toBe(1);
  });

  it('zertruemmert kleine Brocken beim Rammen', () => {
    const { asteroids } = fieldWithSingleRock(500, 6);
    const hull = new HullCollision(asteroids);
    const ship = shipAt(0, 0, -400);
    const velocity = new Vector3(0, 0, -150);

    hull.update(1 / 120, ship, velocity);
    ship.position.set(0, 0, -496);
    const impact = hull.update(1 / 120, ship, velocity);

    expect(impact!.destroyed).toBe(true);
    expect(asteroids.isAlive(0)).toBe(false);
  });

  it('repariert sich nach einer Weile Ruhe langsam selbst', () => {
    const { asteroids, surface } = fieldWithSingleRock(500, 20);
    const hull = new HullCollision(asteroids, null, { repairDelay: 2, repairRate: 0.1 });
    const ship = shipAt(0, 0, -400);
    const velocity = new Vector3(0, 0, -150);

    hull.update(1 / 120, ship, velocity);
    ship.position.set(0, 0, -500 + surface);
    hull.update(1 / 120, ship, velocity);
    const damaged = hull.integrity;
    expect(damaged).toBeLessThan(1);

    // Weit weg vom Brocken warten.
    ship.position.set(0, 0, 5000);
    hull.update(1 / 120, ship, velocity);
    for (let i = 0; i < 120; i++) hull.update(1 / 60, ship, velocity); // 2 s: noch Sperrfrist
    expect(hull.integrity).toBeCloseTo(damaged, 2);

    for (let i = 0; i < 300; i++) hull.update(1 / 60, ship, velocity); // weitere 5 s
    expect(hull.integrity).toBeGreaterThan(damaged);
    expect(hull.integrity).toBeLessThanOrEqual(1);
  });

  it('faellt nach einem Origin-Sprung nicht auf den Versatz herein', () => {
    const { asteroids } = fieldWithSingleRock(500, 20);
    const hull = new HullCollision(asteroids);
    const ship = shipAt(0, 0, 0);
    const velocity = new Vector3(0, 0, -100);

    hull.update(1 / 120, ship, velocity);

    // Welt um 10 km zurueckgeschoben: Schiff und Feld wandern gemeinsam.
    const offset = new Vector3(0, 0, -10_000);
    ship.position.sub(offset);
    asteroids.position.sub(offset);
    hull.shift(offset);

    expect(hull.update(1 / 120, ship, velocity)).toBeNull();
    expect(hull.integrity).toBe(1);
  });

  it('laesst den eigenen Landeplatz in Ruhe', () => {
    const { asteroids, center, surface } = fieldWithSingleRock(500, 20);
    const hull = new HullCollision(asteroids);
    const ship = shipAt(0, 0, -400);
    const velocity = new Vector3(0, 0, -60);
    // Dicht ueber der Oberflaeche — genau dort setzt der Landeautopilot auf.
    const touchdown = -500 + surface + 0.2;

    hull.update(1 / 120, ship, velocity);
    hull.setExemptIndex(0);
    ship.position.set(0, 0, touchdown);
    expect(hull.update(1 / 120, ship, velocity)).toBeNull();
    expect(hull.integrity).toBe(1);
    // Und das Schiff bleibt, wo der Autopilot es hingesetzt hat.
    expect(ship.position.z).toBe(touchdown);
    expect(velocity.z).toBe(-60);

    // Nach dem Abheben ist der Brocken wieder scharf.
    hull.setExemptIndex(-1);
    ship.position.set(0, 0, touchdown - 12);
    expect(hull.update(1 / 120, ship, velocity)).not.toBeNull();
    expect(ship.position.distanceTo(center)).toBeCloseTo(
      surface + hull.getParams().radius,
      3,
    );
  });
});
