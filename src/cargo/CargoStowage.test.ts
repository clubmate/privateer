import { describe, expect, it } from 'vitest';
import { CargoHold } from './CargoHold';
import { CONTAINER_HEIGHT, GOODS, GOOD_IDS, UNIT_DEPTH, UNIT_WIDTH, unitCount } from './CargoGoods';
import { evadeStowage, planStowage, STOW_SLOTS, stowageCapacity, type StowedUnit } from './CargoStowage';

/** Grenzen des Frachtraums in GLB-Innenraumkoordinaten (ASSET-NOTES.md). */
const BAY = { minX: -1.45, maxX: 1.45, minZ: -5.2, maxZ: -1.2, ceiling: 2.3 };

/** Kapsel des Spielers (WalkController): Radius 0,3 m. */
const RADIUS = 0.3;

function footprint(unit: StowedUnit): { minX: number; maxX: number; minZ: number; maxZ: number } {
  // Die Streuung dreht die Kisten nur um wenige Grad; fuer die Platzpruefung
  // reicht die achsenparallele Huelle plus Zuschlag fuer die Drehung.
  const grow = Math.abs(Math.sin(unit.yaw)) * (unit.width + unit.depth) * 0.5;
  return {
    minX: unit.x - unit.width / 2 - grow,
    maxX: unit.x + unit.width / 2 + grow,
    minZ: unit.z - unit.depth / 2 - grow,
    maxZ: unit.z + unit.depth / 2 + grow,
  };
}

/**
 * Wie weit kommt der Spieler von der Frachtraumtuer aus nach achtern?
 *
 * Eine Pruefung Querschnitt fuer Querschnitt reicht dafuer nicht: sie findet
 * in jeder Scheibe eine Luecke und uebersieht, dass zwei Luecken auf
 * verschiedenen Seiten liegen koennen. Ein Koerper mit Radius kommt dann
 * nirgends hindurch. Deshalb echte Erreichbarkeit auf einem Gitter, mit um den
 * Kapselradius aufgeblasenen Hindernissen. Rueckgabe ist das kleinste (also
 * achterlichste) erreichbare z.
 */
function reachableDepth(units: readonly StowedUnit[]): number {
  const boxes = units.map(footprint);
  const step = 0.05;

  const blocked = (x: number, z: number): boolean => {
    for (const box of boxes) {
      if (
        x > box.minX - RADIUS && x < box.maxX + RADIUS
        && z > box.minZ - RADIUS && z < box.maxZ + RADIUS
      ) return true;
    }
    // Werkbank backbord.
    if (x < -0.9 + RADIUS && z > -2.4 - RADIUS && z < -1.3 + RADIUS) return true;
    // Bordwaende.
    return x < BAY.minX + RADIUS || x > BAY.maxX - RADIUS;
  };

  const minIz = Math.ceil(BAY.minZ / step);
  const maxIz = Math.floor(-1.25 / step);
  const minIx = Math.ceil(BAY.minX / step);
  const maxIx = Math.floor(BAY.maxX / step);
  const key = (ix: number, iz: number) => `${ix}:${iz}`;

  // Start: die ganze Breite der Frachtraumtuer.
  const queue: Array<[number, number]> = [];
  for (let ix = minIx; ix <= maxIx; ix++) {
    if (!blocked(ix * step, maxIz * step)) queue.push([ix, maxIz]);
  }
  expect(queue.length, 'Frachtraumtuer ist zugestellt').toBeGreaterThan(0);

  const seen = new Set(queue.map(([ix, iz]) => key(ix, iz)));
  let deepest = maxIz * step;
  while (queue.length > 0) {
    const [ix, iz] = queue.pop()!;
    deepest = Math.min(deepest, iz * step);
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const nx = ix + dx;
      const nz = iz + dz;
      if (nx < minIx || nx > maxIx || nz < minIz || nz > maxIz) continue;
      if (seen.has(key(nx, nz)) || blocked(nx * step, nz * step)) continue;
      seen.add(key(nx, nz));
      queue.push([nx, nz]);
    }
  }
  return deepest;
}

function fullHold(good: (typeof GOOD_IDS)[number]): CargoHold {
  const hold = new CargoHold();
  hold.add(good, hold.getCapacity());
  return hold;
}

describe('Stellplaetze', () => {
  it('liegen alle im Frachtraum und nicht in der Werkbank', () => {
    for (const slot of STOW_SLOTS) {
      expect(slot.x - UNIT_WIDTH / 2).toBeGreaterThanOrEqual(BAY.minX);
      expect(slot.x + UNIT_WIDTH / 2).toBeLessThanOrEqual(BAY.maxX);
      expect(slot.z - UNIT_DEPTH / 2).toBeGreaterThanOrEqual(BAY.minZ);
      expect(slot.z + UNIT_DEPTH / 2).toBeLessThanOrEqual(BAY.maxZ);
      expect(slot.headroom).toBeLessThanOrEqual(BAY.ceiling);

      // Werkbank: x -1,60 .. -0,90 bei z -2,40 .. -1,30.
      const overlapsBenchX = slot.x - UNIT_WIDTH / 2 < -0.9;
      const overlapsBenchZ = slot.z - UNIT_DEPTH / 2 < -1.3 && slot.z + UNIT_DEPTH / 2 > -2.4;
      expect(overlapsBenchX && overlapsBenchZ).toBe(false);
    }
  });

  it('haben eindeutige Kennungen und ueberschneiden sich nicht', () => {
    const ids = STOW_SLOTS.map((slot) => slot.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (let i = 0; i < STOW_SLOTS.length; i++) {
      for (let k = i + 1; k < STOW_SLOTS.length; k++) {
        const a = STOW_SLOTS[i];
        const b = STOW_SLOTS[k];
        const overlapX = Math.abs(a.x - b.x) < UNIT_WIDTH - 1e-6;
        const overlapZ = Math.abs(a.z - b.z) < UNIT_DEPTH - 1e-6;
        expect(overlapX && overlapZ).toBe(false);
      }
    }
  });

  it('legt alle Gangplaetze auf dieselbe Seite', () => {
    // Ein Slalom von Reihe zu Reihe waere nicht passierbar: die Reihen stehen
    // nur 0,08 m auseinander, die Spielerkapsel ist 0,60 m tief.
    const aisleX = STOW_SLOTS.filter((slot) => slot.aisle).map((slot) => Math.sign(slot.x));
    expect(new Set(aisleX).size).toBe(1);
  });

  it('fuellt Wand und Heck vor dem Gehweg', () => {
    const firstAisle = STOW_SLOTS.findIndex((slot) => slot.aisle);
    const lastWall = STOW_SLOTS.map((slot) => slot.aisle).lastIndexOf(false);
    expect(firstAisle).toBeGreaterThan(lastWall);
  });

  it('bietet fuer jede Warenart genug Platz fuer eine volle Ladung', () => {
    for (const id of GOOD_IDS) {
      const needed = unitCount(GOODS[id], 40);
      expect(stowageCapacity(id)).toBeGreaterThanOrEqual(needed);
    }
  });
});

describe('planStowage', () => {
  it('liefert fuer einen leeren Laderaum nichts', () => {
    const plan = planStowage([]);
    expect(plan.units).toEqual([]);
    expect(plan.slotsUsed).toBe(0);
    expect(plan.aisleSlotsUsed).toBe(0);
  });

  it('erzeugt genau so viele Gebinde wie die Tonnage verlangt', () => {
    for (const id of GOOD_IDS) {
      const plan = planStowage([{ good: id, tons: 12 }]);
      expect(plan.units).toHaveLength(unitCount(GOODS[id], 12));
      expect(plan.overflow).toBe(0);
    }
  });

  it('stapelt bis unter die Decke des Stellplatzes und dann daneben', () => {
    const plan = planStowage([{ good: 'food', tons: 40 }]);
    const height = CONTAINER_HEIGHT.crate;
    const perSlot = new Map<string, StowedUnit[]>();
    for (const unit of plan.units) {
      const list = perSlot.get(unit.slot) ?? [];
      list.push(unit);
      perSlot.set(unit.slot, list);
    }

    for (const [id, units] of perSlot) {
      const slot = STOW_SLOTS.find((entry) => entry.id === id);
      expect(slot).toBeDefined();
      units.sort((a, b) => a.level - b.level);
      units.forEach((unit, index) => {
        expect(unit.level).toBe(index);
        expect(unit.y).toBeCloseTo(index * height, 6);
      });
      expect(units.length * height).toBeLessThanOrEqual(slot!.headroom + 1e-6);
    }
  });

  it('mischt keine zwei Warenarten in einen Stapel', () => {
    const hold = new CargoHold();
    hold.add('ore', 8);
    hold.add('water', 6);
    hold.add('electronics', 5);
    const plan = planStowage(hold.getManifest());

    const goodsPerSlot = new Map<string, Set<string>>();
    for (const unit of plan.units) {
      const set = goodsPerSlot.get(unit.slot) ?? new Set<string>();
      set.add(unit.good);
      goodsPerSlot.set(unit.slot, set);
    }
    for (const set of goodsPerSlot.values()) expect(set.size).toBe(1);
  });

  it('haelt jede Kiste im Frachtraum und unter der Decke', () => {
    const plan = planStowage(fullHold('food').getManifest());
    for (const unit of plan.units) {
      const box = footprint(unit);
      expect(box.minX).toBeGreaterThanOrEqual(BAY.minX - 1e-6);
      expect(box.maxX).toBeLessThanOrEqual(BAY.maxX + 1e-6);
      expect(box.minZ).toBeGreaterThanOrEqual(BAY.minZ - 1e-6);
      expect(box.maxZ).toBeLessThanOrEqual(BAY.maxZ + 1e-6);
      expect(unit.y + unit.height).toBeLessThanOrEqual(BAY.ceiling);
    }
  });

  it('bleibt fuer jede Warenart bei voller Ladung ohne Ueberlauf', () => {
    for (const id of GOOD_IDS) {
      const plan = planStowage(fullHold(id).getManifest());
      expect(plan.overflow).toBe(0);
    }
  });

  it('laesst den Gehweg leer, solange wenig geladen ist', () => {
    const hold = new CargoHold();
    hold.add('ore', 8);
    const plan = planStowage(hold.getManifest());
    expect(plan.aisleSlotsUsed).toBe(0);
  });

  it('stellt bei voller Ladung Kisten in den Gehweg', () => {
    const hold = new CargoHold();
    // Gemischte Vollladung — so faehrt ein Haendler wirklich.
    hold.add('ore', 10);
    hold.add('water', 8);
    hold.add('food', 10);
    hold.add('electronics', 12);
    const plan = planStowage(hold.getManifest());
    expect(plan.aisleSlotsUsed).toBeGreaterThan(0);
  });

  it('laesst auch bei voller Ladung einen begehbaren Weg nach achtern', () => {
    const hold = new CargoHold();
    hold.add('ore', 10);
    hold.add('water', 8);
    hold.add('food', 10);
    hold.add('electronics', 12);

    // Bis vor die achterste Reihe muss man kommen. Weiter hinten ist kein Weg:
    // S0, P0 und C0 stehen dort nebeneinander und schliessen den Raum ab —
    // das ist Stauraum, kein Gang.
    expect(reachableDepth(planStowage(hold.getManifest()).units)).toBeLessThanOrEqual(-4.0);
  });

  it('ist leer deutlich weiter begehbar als voll', () => {
    const hold = new CargoHold();
    hold.add('ore', 6);
    const leicht = reachableDepth(planStowage(hold.getManifest()).units);

    hold.add('food', 20);
    hold.add('electronics', 14);
    const voll = reachableDepth(planStowage(hold.getManifest()).units);

    expect(leicht).toBeLessThan(voll);
  });

  it('stellt dieselbe Ladung immer gleich hin', () => {
    const lots = [{ good: 'parts' as const, tons: 9 }];
    expect(planStowage(lots)).toEqual(planStowage(lots));
  });

  it('meldet Ueberlauf, statt Kisten ins Nichts zu stellen', () => {
    const plan = planStowage([{ good: 'food', tons: 40 }], [STOW_SLOTS[0]]);
    expect(plan.units.length).toBeLessThan(unitCount(GOODS.food, 40));
    expect(plan.overflow).toBe(unitCount(GOODS.food, 40) - plan.units.length);
  });
});

describe('evadeStowage', () => {
  const fullUnits = () => {
    const hold = new CargoHold();
    hold.add('ore', 10);
    hold.add('water', 8);
    hold.add('food', 10);
    hold.add('electronics', 12);
    return planStowage(hold.getManifest()).units;
  };

  it('laesst einen freien Standpunkt in Ruhe', () => {
    const units = planStowage([{ good: 'ore', tons: 6 }]).units;
    // Mitte des Gangs, weit weg von den beiden belegten Wandplaetzen.
    expect(evadeStowage(0, -2.0, RADIUS, units)).toBeNull();
  });

  it('schiebt aus einer Kiste heraus und nicht in die naechste', () => {
    const units = fullUnits();
    const slot = STOW_SLOTS.find((entry) => entry.id === 'A1')!;
    const free = evadeStowage(slot.x, slot.z, RADIUS, units);

    expect(free).not.toBeNull();
    for (const unit of units) {
      const overlapX = Math.abs(free!.x - unit.x) < unit.width / 2 + RADIUS - 1e-9;
      const overlapZ = Math.abs(free!.z - unit.z) < unit.depth / 2 + RADIUS - 1e-9;
      expect(overlapX && overlapZ, `steckt noch in ${unit.slot}/${unit.level}`).toBe(false);
    }
  });

  it('schiebt nicht durch die Bordwand und nicht in die Werkbank', () => {
    const units = fullUnits();
    for (const slot of STOW_SLOTS) {
      const free = evadeStowage(slot.x, slot.z, RADIUS, units);
      if (!free) continue;
      expect(free.x).toBeGreaterThanOrEqual(BAY.minX + RADIUS - 1e-9);
      expect(free.x).toBeLessThanOrEqual(BAY.maxX - RADIUS + 1e-9);
      expect(free.z).toBeGreaterThanOrEqual(BAY.minZ + RADIUS - 1e-9);
      expect(free.z).toBeLessThanOrEqual(BAY.maxZ - RADIUS + 1e-9);
      // Werkbank: x -1,60 .. -0,90 bei z -2,40 .. -1,30.
      const inBench = free.x < -0.9 + RADIUS && free.z > -2.4 - RADIUS && free.z < -1.3 + RADIUS;
      expect(inBench, `${slot.id} landet in der Werkbank`).toBe(false);
    }
  });

  it('weicht nur ein kleines Stueck aus, nicht quer durch den Raum', () => {
    const units = fullUnits();
    const slot = STOW_SLOTS.find((entry) => entry.id === 'A2')!;
    const free = evadeStowage(slot.x, slot.z, RADIUS, units)!;
    expect(Math.hypot(free.x - slot.x, free.z - slot.z)).toBeLessThan(1.2);
  });
});
