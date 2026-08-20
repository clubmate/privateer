import { describe, expect, it } from 'vitest';
import { PerspectiveCamera, Quaternion, Raycaster, Vector3 } from 'three';
import type { LOD, Mesh } from 'three';
import { Asteroids } from './Asteroids';
import { MINERAL_IDS, SIZE_CLASSES, yieldTons } from './AsteroidTypes';
import { ARCHETYPES, buildRockGeometry, RockShape } from './AsteroidShapes';

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

  /**
   * Frueher stand hier `normal.z ≈ 1` und `Abstand === getRadius` — beides
   * galt nur, solange jeder Brocken eine Kugel war. Mit echter Form liegt der
   * Punkt irgendwo zwischen kleinstem und groesstem Radius, und die Normale
   * ist die Neigung der Flaeche, nicht die Blickrichtung. Genau darauf baut
   * die Landung auf, also wird jetzt das geprueft.
   */
  it('tastet die Oberflaeche zwischen Beobachter und Mittelpunkt ab', () => {
    const field = new Asteroids({ count: 5, seed: 17 });
    const center = field.getCenter(0, new Vector3());
    const from = center.clone().add(new Vector3(0, 0, 5000));
    const sample = { point: new Vector3(), normal: new Vector3() };

    expect(field.sampleSurface(0, from, sample)).toBe(true);
    // Punkt liegt auf der Sichtlinie, innerhalb des Umrisses und nicht im Kern.
    const radius = sample.point.distanceTo(center);
    expect(radius).toBeLessThanOrEqual(field.getRadius(0) + 1e-6);
    expect(radius).toBeGreaterThan(field.getRadius(0) * 0.25);
    expect(sample.point.x).toBeCloseTo(center.x, 6);
    expect(sample.point.y).toBeCloseTo(center.y, 6);
    // Die Normale zeigt nach aussen, aber nicht zwingend genau zum Beobachter.
    expect(sample.normal.length()).toBeCloseTo(1);
    expect(sample.normal.z).toBeGreaterThan(0.3);
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

describe('Asteroiden — Formen', () => {
  /** Richtungen gleichmaessig ueber die Kugel abtasten. */
  function directions(n: number): Vector3[] {
    const out: Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const a = golden * i;
      out.push(new Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
    }
    return out;
  }

  it('bleibt innerhalb des Umrissradius', () => {
    for (const id of ARCHETYPES) {
      const shape = new RockShape(id, 42);
      for (const d of directions(400)) {
        expect(shape.radius(d.x, d.y, d.z)).toBeLessThanOrEqual(1);
        expect(shape.radius(d.x, d.y, d.z)).toBeGreaterThan(0);
      }
    }
  });

  it('macht aus keinem Archetyp eine Kugel', () => {
    for (const id of ARCHETYPES) {
      const shape = new RockShape(id, 7);
      let min = Infinity;
      let max = 0;
      for (const d of directions(600)) {
        const r = shape.radius(d.x, d.y, d.z);
        min = Math.min(min, r);
        max = Math.max(max, r);
      }
      // Eine Kugel haette 1. Alles ueber 0,85 sieht aus wie eine Kartoffel.
      expect(min / max).toBeLessThan(0.85);
    }
    // Und der Splitter ist deutlich langgestreckt.
    const splinter = new RockShape('splinter', 7);
    let min = Infinity;
    for (const d of directions(600)) min = Math.min(min, splinter.radius(d.x, d.y, d.z));
    expect(min).toBeLessThan(0.5);
  });

  it('baut Geometrie, deren Dreiecke nach aussen zeigen', () => {
    const geometry = buildRockGeometry(new RockShape('cratered', 5), 2);
    const position = geometry.attributes['position']!;
    const index = geometry.index;
    const a = new Vector3();
    const b = new Vector3();
    const c = new Vector3();
    const faces = index ? index.count / 3 : position.count / 3;
    for (let f = 0; f < faces; f++) {
      const i0 = index ? index.getX(f * 3) : f * 3;
      const i1 = index ? index.getX(f * 3 + 1) : f * 3 + 1;
      const i2 = index ? index.getX(f * 3 + 2) : f * 3 + 2;
      a.fromBufferAttribute(position, i0);
      b.fromBufferAttribute(position, i1);
      c.fromBufferAttribute(position, i2);
      const normal = b.clone().sub(a).cross(c.clone().sub(a));
      const centroid = a.clone().add(b).add(c).divideScalar(3);
      expect(normal.dot(centroid)).toBeGreaterThan(0);
    }
    // Adern, Mulden und Flecken liegen als Attribut bereit.
    const detail = geometry.attributes['aRockDetail']!;
    expect(detail.itemSize).toBe(3);
    expect(detail.count).toBe(position.count);
  });

  it('schattiert frische Bruchkanten flach und Rundlinge glatt', () => {
    expect(new RockShape('shard', 1).sharp).toBe(true);
    expect(new RockShape('cratered', 1).sharp).toBe(false);
    // Flach heisst: keine geteilten Vertices, also kein Index.
    expect(buildRockGeometry(new RockShape('shard', 1), 1).index).toBeNull();
    expect(buildRockGeometry(new RockShape('cratered', 1), 1).index).not.toBeNull();
  });
});

describe('Asteroidenfeld — Groessen und Plaetze', () => {
  it('haelt sich an die Groessenklassen', () => {
    const field = new Asteroids({ count: 300, seed: 5 });
    const seen = new Set<string>();
    for (let i = 0; i < field.count; i++) {
      const cls = SIZE_CLASSES[field.getSizeClass(i)];
      seen.add(cls.id);
      expect(field.getRadius(i)).toBeGreaterThanOrEqual(cls.minRadius);
      expect(field.getRadius(i)).toBeLessThanOrEqual(cls.maxRadius);
    }
    // Vom Geroell bis zum Planetoiden ist alles vertreten.
    expect(seen.size).toBe(5);
  });

  it('setzt Grossbrocken so, dass sie einander nicht durchdringen', () => {
    const field = new Asteroids({ count: 300, seed: 5 });
    const a = new Vector3();
    const b = new Vector3();
    const big: number[] = [];
    for (let i = 0; i < field.count; i++) if (field.getRadius(i) >= 60) big.push(i);
    expect(big.length).toBeGreaterThan(3);

    for (const i of big) {
      field.getCenter(i, a);
      // Und keiner verschluckt den Startpunkt des Schiffes.
      expect(a.length()).toBeGreaterThan(field.getRadius(i) * 1.5);
      for (const j of big) {
        if (j <= i) continue;
        field.getCenter(j, b);
        expect(a.distanceTo(b)).toBeGreaterThan(field.getRadius(i) + field.getRadius(j));
      }
    }
  });

  it('legt jeden Brocken in die uebergebene Renderschicht — auch die Detailstufen', () => {
    const field = new Asteroids({ count: 60, seed: 8 });
    field.setLayer(1);
    let meshes = 0;
    let planetoids = 0;
    field.traverse((child) => {
      expect(child.layers.mask).toBe(1 << 1);
      if ((child as { isInstancedMesh?: boolean }).isInstancedMesh) meshes++;
      if ((child as { isLOD?: boolean }).isLOD) planetoids++;
    });
    expect(meshes).toBeGreaterThan(1);
    // Grossbrocken haengen als eigener Knoten mit zwei Detailstufen im Feld.
    expect(planetoids).toBeGreaterThan(0);
  });
});

describe('Asteroidenfeld — Treffer auf echter Geometrie', () => {
  /** Ein moeglichst grosser Brocken des Feldes. */
  function biggest(field: Asteroids): number {
    let best = 0;
    for (let i = 1; i < field.count; i++) {
      if (field.getRadius(i) > field.getRadius(best)) best = i;
    }
    return best;
  }

  it('trifft genau dort, wo sampleSurface die Oberflaeche meldet', () => {
    const field = new Asteroids({ count: 120, seed: 31 });
    const index = biggest(field);
    const center = field.getCenter(index, new Vector3());
    const sample = { point: new Vector3(), normal: new Vector3() };

    for (const offset of [new Vector3(0, 0, 1), new Vector3(0.6, 0.5, -0.6), new Vector3(-1, 0.2, 0.3)]) {
      const from = center.clone().addScaledVector(offset.normalize(), 3000);
      expect(field.sampleSurface(index, from, sample)).toBe(true);
      const direction = center.clone().sub(from).normalize();
      const hit = field.hitSegment(from, direction, 4000);
      expect(hit).not.toBeNull();
      expect(hit!.index).toBe(index);
      // Wenige Zentimeter Abweichung, nicht zig Meter wie beim Kugeltest.
      expect(hit!.point.distanceTo(sample.point)).toBeLessThan(0.5);
      expect(hit!.radius).toBeCloseTo(sample.point.distanceTo(center), 1);
    }
  });

  it('meldet keinen Treffer, wo nur die Umrisskugel im Weg liegt', () => {
    const field = new Asteroids({ count: 120, seed: 31 });
    const index = biggest(field);
    const center = field.getCenter(index, new Vector3());
    const radius = field.getRadius(index);
    const sample = { point: new Vector3(), normal: new Vector3() };

    // Eine Richtung suchen, in der die Oberflaeche deutlich unter dem Umriss
    // liegt — eine Mulde oder eine Bruchflaeche.
    let hollow: Vector3 | null = null;
    for (let i = 0; i < 200 && !hollow; i++) {
      const d = new Vector3(Math.sin(i * 1.7), Math.cos(i * 2.3), Math.sin(i * 0.9)).normalize();
      field.sampleSurface(index, center.clone().addScaledVector(d, 5000), sample);
      if (sample.point.distanceTo(center) < radius * 0.8) hollow = d;
    }
    expect(hollow).not.toBeNull();

    // Punkt zwischen Oberflaeche und Umrisskugel: die Kugel wuerde melden,
    // die Form nicht.
    const surface = sample.point.distanceTo(center);
    const from = center.clone().addScaledVector(hollow!, (surface + radius) * 0.5);
    expect(from.distanceTo(center)).toBeLessThan(radius);
    expect(field.hitSegment(from, hollow!.clone().negate(), 0.05)).toBeNull();
  });

  it('haelt beim Sweep den Rumpfradius Abstand', () => {
    const field = new Asteroids({ count: 120, seed: 31 });
    const index = biggest(field);
    const center = field.getCenter(index, new Vector3());
    const from = center.clone().add(new Vector3(0, 0, 4000));
    const direction = center.clone().sub(from).normalize();

    const bare = field.hitSegment(from, direction, 5000)!;
    const bareDistance = bare.distance;
    const padded = field.hitSegment(from, direction, 5000, 12)!;
    expect(padded.index).toBe(index);
    // Mit Rumpfradius endet die Fahrt zwoelf Meter frueher ...
    expect(bareDistance - padded.distance).toBeCloseTo(12, 0);
    // ... der gemeldete Radius bleibt aber der der Oberflaeche, sonst setzt
    // die Rumpfkollision das Schiff zu weit heraus.
    expect(padded.radius).toBeCloseTo(bare.radius, 0);
  });
});

describe('Asteroidenfeld — Oberflaeche fuer die Landung', () => {
  /** Groesster Brocken und der Mesh, mit dem er gezeichnet wird. */
  function planetoid(field: Asteroids): { index: number; mesh: Mesh } {
    let index = 0;
    for (let i = 1; i < field.count; i++) {
      if (field.getRadius(i) > field.getRadius(index)) index = i;
    }
    field.updateMatrixWorld(true);
    const center = field.getCenter(index, new Vector3());
    let node: LOD | null = null;
    field.traverse((child) => {
      if (!(child as Partial<LOD>).isLOD) return;
      if (child.getWorldPosition(new Vector3()).distanceTo(center) > 1e-3) return;
      node = child as LOD;
    });
    if (!node) throw new Error('kein Grossbrocken gefunden');

    // Anflug nachstellen: erst dann baut der Knoten seine Nahstufe, und die
    // ist es, auf der das Schiff aufsetzt.
    const camera = new PerspectiveCamera();
    camera.position.copy(center).add(new Vector3(0, 0, field.getRadius(index) * 2));
    camera.updateMatrixWorld();
    (node as LOD).update(camera);
    field.updateMatrixWorld(true);
    return { index, mesh: (node as LOD).levels[0]!.object as Mesh };
  }

  /**
   * Der Kern des Vertrags zur Landung: der gemeldete Punkt muss auf den
   * Dreiecken liegen, die der Spieler sieht. Eine Kugelnaeherung liegt bei
   * dieser Deformation stellenweise ueber fuenfzig Meter daneben — das Schiff
   * schwebte sichtbar ueber dem Fels.
   */
  it('meldet bei Planetoiden Punkte auf der gezeichneten Geometrie', () => {
    const field = new Asteroids({ count: 200, seed: 31 });
    const { index, mesh } = planetoid(field);
    expect(field.getSizeClass(index)).toBe('huge');
    expect(field.isLandable(index)).toBe(true);

    const center = field.getCenter(index, new Vector3());
    const sample = { point: new Vector3(), normal: new Vector3() };
    const caster = new Raycaster();
    const errors: number[] = [];
    let worstSphere = 0;

    for (let k = 0; k < 40; k++) {
      // Richtungen ueber die Kugel streuen (goldener Winkel).
      const y = 1 - (k / 39) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const a = Math.PI * (3 - Math.sqrt(5)) * k;
      const dir = new Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
      const from = center.clone().addScaledVector(dir, field.getRadius(index) * 4);

      expect(field.sampleSurface(index, from, sample)).toBe(true);
      caster.set(from, dir.clone().negate());
      const hits = caster.intersectObject(mesh, false);
      if (hits.length === 0) continue;
      errors.push(hits[0]!.point.distanceTo(sample.point));
      // Zum Vergleich: was die alte Kugelnaeherung geliefert haette.
      worstSphere = Math.max(
        worstSphere,
        Math.abs(field.getRadius(index) - hits[0]!.point.distanceTo(center)),
      );

      // Die Normale ist die Neigung der getroffenen Flaeche, nicht die
      // Blickrichtung — das Schiff richtet sich danach aus.
      const face = hits[0]!.normal!.clone().transformDirection(mesh.matrixWorld);
      expect(sample.normal.dot(face)).toBeGreaterThan(0.72);
    }

    expect(errors.length).toBeGreaterThan(30);
    errors.sort((a, b) => a - b);
    const median = errors[Math.floor(errors.length / 2)]!;
    // Auf einem 400-m-Brocken: im Mittel unter einem Meter. Der schlechteste
    // Fall liegt hoeher, und das bleibt auch so — eine ebene Bruchflaeche hat
    // eine echte Kante, und die kann eine Dreieckssehne nicht treffen.
    expect(median).toBeLessThan(1);
    expect(errors[errors.length - 1]!).toBeLessThan(3);
    // Die Kugelnaeherung laege dagegen zig Meter daneben — dafuer steht der
    // ganze Aufwand hier.
    expect(worstSphere).toBeGreaterThan(20);
  });

  it('gibt die Eigendrehung heraus, damit das Schiff mitdreht', () => {
    const field = new Asteroids({ count: 20, seed: 5 });
    const before = field.getOrientation(0, new Quaternion());
    field.update(2);
    const after = field.getOrientation(0, new Quaternion());
    expect(before.angleTo(after)).toBeGreaterThan(0);

    // Der abgetastete Punkt dreht mit dem Brocken mit.
    const center = field.getCenter(0, new Vector3());
    const from = center.clone().add(new Vector3(0, 0, 900));
    const sample = { point: new Vector3(), normal: new Vector3() };
    field.sampleSurface(0, from, sample);
    const first = sample.point.distanceTo(center);
    field.update(3);
    field.getCenter(0, center);
    field.sampleSurface(0, center.clone().add(new Vector3(0, 0, 900)), sample);
    expect(sample.point.distanceTo(center)).not.toBeCloseTo(first, 6);
  });
});
