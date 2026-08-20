import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { Asteroids } from './Asteroids';
import { MINERAL_IDS, SIZE_CLASSES, yieldTons } from './AsteroidTypes';

/** Kleines, schnell simulierbares Feld mit festem Seed. */
function field(overrides = {}): Asteroids {
  return new Asteroids({
    count: 40,
    innerRadius: 100,
    outerRadius: 600,
    minRadius: 5,
    maxRadius: 40,
    seed: 99,
    ...overrides,
  });
}

/** Erster lebender Brocken des Feldes. */
function anyAlive(asteroids: Asteroids): number {
  for (let i = 0; i < asteroids.count; i++) if (asteroids.isAlive(i)) return i;
  throw new Error('kein lebender Brocken im Feld');
}

describe('Asteroids — Drift', () => {
  it('bewegt die Brocken', () => {
    const asteroids = field();
    const before = new Vector3();
    const after = new Vector3();
    asteroids.getCenter(0, before);

    asteroids.update(1);
    asteroids.getCenter(0, after);
    expect(after.distanceTo(before)).toBeGreaterThan(0);
  });

  it('haelt sie im Feld — auch nach langer Zeit', () => {
    const asteroids = field();
    for (let i = 0; i < 2000; i++) asteroids.update(0.5); // ~17 Minuten

    const center = new Vector3();
    for (let i = 0; i < asteroids.count; i++) {
      asteroids.getCenter(i, center);
      // Feld liegt im Ursprung; Grenze ist outerRadius * 1.15 plus etwas Puffer
      // fuer den Schritt, in dem die Umkehr greift.
      expect(center.length()).toBeLessThan(600 * 1.3);
    }
  });

  it('bewegt zerstoerte Brocken nicht mehr', () => {
    const asteroids = field();
    const index = anyAlive(asteroids);
    const before = new Vector3();
    const after = new Vector3();

    while (asteroids.isAlive(index)) asteroids.damage(index, 1);
    asteroids.getCenter(index, before);
    asteroids.update(1);
    asteroids.getCenter(index, after);
    expect(after.distanceTo(before)).toBe(0);
  });
});

describe('Asteroids — Treffer', () => {
  it('trifft einen Brocken, auf den die Strecke zeigt', () => {
    const asteroids = field();
    const index = anyAlive(asteroids);
    const center = new Vector3();
    asteroids.getCenter(index, center);

    const from = center.clone().multiplyScalar(0.2); // innerhalb des Feldes
    const direction = center.clone().sub(from).normalize();
    const hit = asteroids.hitSegment(from, direction, 5000);

    expect(hit).not.toBeNull();
    // Getroffen wird der naechste Brocken auf der Linie — nicht zwingend der
    // anvisierte, aber in jedem Fall einer, der wirklich im Weg liegt.
    expect(hit!.point.distanceTo(center)).toBeLessThanOrEqual(
      asteroids.getRadius(hit!.index) + center.distanceTo(from),
    );
    const hitCenter = new Vector3();
    asteroids.getCenter(hit!.index, hitCenter);
    expect(hit!.point.distanceTo(hitCenter)).toBeLessThanOrEqual(asteroids.getRadius(hit!.index) + 1e-3);
  });

  it('meldet nichts, wenn die Strecke zu kurz ist', () => {
    const asteroids = field();
    const index = anyAlive(asteroids);
    const center = new Vector3();
    asteroids.getCenter(index, center);

    const from = center.clone().multiplyScalar(0.2);
    const direction = center.clone().sub(from).normalize();
    expect(asteroids.hitSegment(from, direction, 1)).toBeNull();
  });

  it('liefert den naechstgelegenen Treffer', () => {
    const asteroids = field();
    const from = new Vector3(0, 0, 0);
    const direction = new Vector3(1, 0, 0);
    const hit = asteroids.hitSegment(from, direction, 100_000);
    if (!hit) return; // in dieser Richtung liegt nichts — dann ist nichts zu pruefen

    const center = new Vector3();
    for (let i = 0; i < asteroids.count; i++) {
      if (!asteroids.isAlive(i)) continue;
      asteroids.getCenter(i, center);
      const along = center.dot(direction);
      const perp = Math.sqrt(Math.max(center.lengthSq() - along * along, 0));
      if (along < 0 || perp > asteroids.getRadius(i)) continue;
      const entry = along - Math.sqrt(asteroids.getRadius(i) ** 2 - perp * perp);
      expect(hit.distance).toBeLessThanOrEqual(Math.max(entry, 0) + 1e-6);
    }
  });

  it('ignoriert zerstoerte Brocken', () => {
    const asteroids = field();
    const from = new Vector3(0, 0, 0);
    const direction = new Vector3(1, 0, 0);
    const first = asteroids.hitSegment(from, direction, 100_000);
    if (!first) return;

    const index = first.index;
    while (asteroids.isAlive(index)) asteroids.damage(index, 1);

    const second = asteroids.hitSegment(from, direction, 100_000);
    expect(second?.index).not.toBe(index);
  });
});

describe('Asteroids — Zerstoerung und Nachwuchs', () => {
  it('braucht bei grossen Brocken mehrere Treffer', () => {
    const asteroids = field();
    let big = -1;
    for (let i = 0; i < asteroids.count; i++) {
      if (asteroids.isAlive(i) && asteroids.getRadius(i) > 30) big = i;
    }
    if (big < 0) return;

    expect(asteroids.damage(big, 1)).toBe(false);
    expect(asteroids.isAlive(big)).toBe(true);
    expect(asteroids.getIntegrity(big)).toBeLessThan(1);
  });

  it('meldet die Zerstoerung genau einmal', () => {
    const asteroids = field();
    const index = anyAlive(asteroids);
    let destroyed = false;
    while (asteroids.isAlive(index)) destroyed = asteroids.damage(index, 1) || destroyed;

    expect(destroyed).toBe(true);
    expect(asteroids.damage(index, 1)).toBe(false); // kein zweiter Abschuss
    expect(asteroids.getIntegrity(index)).toBe(0);
  });

  it('laesst zerstoerte Brocken nach der Wartezeit neu entstehen', () => {
    const asteroids = field({ respawnDelay: 5 });
    const index = anyAlive(asteroids);
    while (asteroids.isAlive(index)) asteroids.damage(index, 1);

    asteroids.update(4);
    expect(asteroids.isAlive(index)).toBe(false);

    asteroids.update(2);
    expect(asteroids.isAlive(index)).toBe(true);
    expect(asteroids.getIntegrity(index)).toBe(1);

    const center = new Vector3();
    asteroids.getCenter(index, center);
    expect(center.length()).toBeGreaterThanOrEqual(100);
    expect(center.length()).toBeLessThanOrEqual(600);
  });
});

describe('Asteroidenfeld als Bergbaurevier', () => {
  it('gibt jedem Brocken genau ein Mineral', () => {
    const field = new Asteroids({ count: 60, seed: 7 });
    for (let i = 0; i < field.count; i++) {
      expect(MINERAL_IDS).toContain(field.getMineral(i));
    }
  });

  it('zieht die Mineralien nach Haeufigkeit — taubes Gestein ueberwiegt', () => {
    const field = new Asteroids({ count: 400, seed: 11 });
    const tally: Record<string, number> = {};
    for (let i = 0; i < field.count; i++) {
      const id = field.getMineral(i);
      tally[id] = (tally[id] ?? 0) + 1;
    }
    expect(tally['rock'] ?? 0).toBeGreaterThan(tally['crystal'] ?? 0);
    expect(tally['iron'] ?? 0).toBeGreaterThan(tally['platinum'] ?? 0);
  });

  it('leitet den Vorrat aus Volumen und Ergiebigkeit ab', () => {
    const field = new Asteroids({ count: 20, seed: 3 });
    for (let i = 0; i < field.count; i++) {
      expect(field.getTotalTons(i)).toBeCloseTo(
        yieldTons(field.getRadius(i), field.getMineral(i)),
      );
      expect(field.getRemainingTons(i)).toBeCloseTo(field.getTotalTons(i));
    }
  });

  it('foerdert hoechstens den Vorrat und zaehlt ihn herunter', () => {
    const field = new Asteroids({ count: 5, seed: 5 });
    const total = field.getTotalTons(0);
    expect(field.mine(0, total * 0.25)).toBeCloseTo(total * 0.25);
    expect(field.getRemainingTons(0)).toBeCloseTo(total * 0.75);

    // Mehr als da ist, gibt es nicht.
    expect(field.mine(0, total * 10)).toBeCloseTo(total * 0.75);
    expect(field.getRemainingTons(0)).toBe(0);
    expect(field.mine(0, 5)).toBe(0);
  });

  it('gibt aus einem zerstoerten Brocken nichts mehr her', () => {
    const field = new Asteroids({ count: 5, seed: 9 });
    while (field.isAlive(0)) field.damage(0, 1);
    expect(field.getRemainingTons(0)).toBe(0);
  });

  it('zaehlt die Generation hoch, wenn ein Platz neu gesetzt wird', () => {
    const field = new Asteroids({ count: 5, seed: 13, respawnDelay: 1 });
    const before = field.getGeneration(0);
    while (field.isAlive(0)) field.damage(0, 1);
    field.update(1.5);
    expect(field.getGeneration(0)).toBe(before + 1);
    expect(field.isAlive(0)).toBe(true);
    // Der Vorrat des neuen Brockens ist unberuehrt.
    expect(field.getRemainingTons(0)).toBeCloseTo(field.getTotalTons(0));
  });

  it('tastet die Oberflaeche zwischen Beobachter und Mittelpunkt ab', () => {
    const field = new Asteroids({ count: 5, seed: 17 });
    const center = field.getCenter(0, new Vector3());
    const from = center.clone().add(new Vector3(0, 0, 5000));
    const sample = { point: new Vector3(), normal: new Vector3() };

    expect(field.sampleSurface(0, from, sample)).toBe(true);
    expect(sample.normal.z).toBeCloseTo(1);
    expect(sample.point.distanceTo(center)).toBeCloseTo(field.getRadius(0));
    // Der Punkt liegt zwischen Beobachter und Mittelpunkt.
    expect(sample.point.distanceTo(from)).toBeLessThan(from.distanceTo(center));
  });

  it('nennt nur die groessten Brocken landbar', () => {
    const field = new Asteroids({ count: 40, seed: 21 });
    for (let i = 0; i < field.count; i++) {
      const landable = field.isLandable(i);
      expect(landable).toBe(SIZE_CLASSES[field.getSizeClass(i)].landable);
      if (landable) expect(field.getRadius(i)).toBeGreaterThan(150);
    }
  });
});
