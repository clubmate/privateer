import { describe, expect, it } from 'vitest';
import { CargoHold } from './CargoHold';
import { CONTAINER_HEIGHT, GOODS, GOOD_IDS, UNIT_DEPTH, UNIT_WIDTH, unitCount } from './CargoGoods';
import { planStowage, STOW_SLOTS, stowageCapacity, type StowedUnit } from './CargoStowage';

/** Grenzen des Frachtraums in GLB-Innenraumkoordinaten (ASSET-NOTES.md). */
const BAY = { minX: -1.45, maxX: 1.45, minZ: -5.2, maxZ: -1.2, ceiling: 2.3 };

/** Kapsel des Spielers (WalkController): Radius 0,3 m. */
const PLAYER_DIAMETER = 0.6;

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

  it('laesst auch bei voller Ladung ueberall einen Durchgang', () => {
    const hold = new CargoHold();
    hold.add('ore', 10);
    hold.add('water', 8);
    hold.add('food', 10);
    hold.add('electronics', 12);
    const boxes = planStowage(hold.getManifest()).units.map(footprint);

    // Der Frachtraum wird in Querschnitte zerlegt; in jedem muss zwischen den
    // Kisten eine Luecke fuer die Spielerkapsel bleiben. Ausgenommen ist das
    // Heck ab z -4,20: dort ist Stauraum, kein Weg.
    for (let z = -4.2; z <= -1.25; z += 0.05) {
      const spans = boxes
        .filter((box) => box.minZ <= z && box.maxZ >= z)
        .map((box) => [box.minX, box.maxX] as const)
        .sort((a, b) => a[0] - b[0]);

      let cursor = BAY.minX;
      let widest = 0;
      for (const [min, max] of spans) {
        widest = Math.max(widest, min - cursor);
        cursor = Math.max(cursor, max);
      }
      widest = Math.max(widest, BAY.maxX - cursor);
      expect(widest, `Querschnitt bei z=${z.toFixed(2)}`).toBeGreaterThanOrEqual(PLAYER_DIAMETER);
    }
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
