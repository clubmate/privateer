import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { CargoHold } from '../cargo/CargoHold';
import {
  MINERALS,
  type AsteroidField,
  type AsteroidSize,
  type MineralId,
  type SurfaceSample,
} from '../world/AsteroidTypes';
import {
  DEFAULT_MINING_PARAMS,
  MiningSystem,
  createLineOfSight,
  miningRate,
} from './MiningSystem';

/**
 * Geprueft wird die Logik: Foerderrate, Vorratsabbau, Scanwissen und die
 * Kapazitaetsgrenze. Der Strahl selbst ist Three-Geometrie und gehoert ins
 * Bild, nicht in einen Node-Test.
 */

/** Kleines Feld von Hand — der Bergbau kennt nur das Interface. */
class FakeField implements AsteroidField {
  readonly count: number;
  private readonly minerals: MineralId[];
  private readonly totals: number[];
  private readonly mined: number[];
  private readonly generations: number[];
  private readonly centers: Vector3[];
  private readonly radii: number[];
  private readonly alive: boolean[];

  constructor(minerals: MineralId[], total = 100, radius = 10) {
    this.count = minerals.length;
    this.minerals = [...minerals];
    this.totals = minerals.map(() => total);
    this.mined = minerals.map(() => 0);
    this.generations = minerals.map(() => 0);
    this.centers = minerals.map((_, i) => new Vector3(0, 0, -100 - i * 500));
    this.radii = minerals.map(() => radius);
    this.alive = minerals.map(() => true);
  }

  isAlive(index: number): boolean {
    return this.alive[index]!;
  }

  getCenter(index: number, out: Vector3): Vector3 {
    return out.copy(this.centers[index]!);
  }

  getRadius(index: number): number {
    return this.radii[index]!;
  }

  getMineral(index: number): MineralId {
    return this.minerals[index]!;
  }

  getSizeClass(): AsteroidSize {
    return 'small';
  }

  isLandable(): boolean {
    return false;
  }

  getGeneration(index: number): number {
    return this.generations[index]!;
  }

  getRemainingTons(index: number): number {
    if (!this.alive[index]) return 0;
    return Math.max(this.totals[index]! - this.mined[index]!, 0);
  }

  getTotalTons(index: number): number {
    return this.totals[index]!;
  }

  mine(index: number, tons: number): number {
    const taken = Math.min(Math.max(tons, 0), this.getRemainingTons(index));
    this.mined[index]! += taken;
    return taken;
  }

  sampleSurface(index: number, from: Vector3, out: SurfaceSample): boolean {
    if (!this.alive[index]) return false;
    out.normal.subVectors(from, this.centers[index]!).normalize();
    out.point.copy(this.centers[index]!).addScaledVector(out.normal, this.radii[index]!);
    return true;
  }

  // --- nur fuer den Test ---

  /** Brocken zerstoeren und andernorts neu setzen (Generation hoch). */
  reseed(index: number, mineral: MineralId): void {
    this.minerals[index] = mineral;
    this.mined[index] = 0;
    this.generations[index]! += 1;
  }

  setDistance(index: number, meters: number): void {
    this.centers[index]!.set(0, 0, -(meters + this.radii[index]!));
  }
}

const ORIGIN = new Vector3(0, 0, 0);

function setup(minerals: MineralId[] = ['iron'], total = 100) {
  const field = new FakeField(minerals, total);
  const hold = new CargoHold({ capacity: 40, credits: 0 });
  const mining = new MiningSystem({ field, hold });
  return { field, hold, mining };
}

/** `seconds` Sekunden in 120-Hz-Schritten fahren. */
function run(mining: MiningSystem, seconds: number, index = 0, origin = ORIGIN): void {
  const dt = 1 / 120;
  for (let i = 0; i < Math.round(seconds * 120); i++) mining.update(dt, index, origin);
}

describe('miningRate', () => {
  it('geht bei Eis deutlich schneller als bei Kristall', () => {
    expect(miningRate('ice')).toBeGreaterThan(miningRate('crystal') * 2);
  });

  it('faellt monoton mit der Haerte', () => {
    const ids: MineralId[] = ['ice', 'rock', 'iron', 'copper', 'silicon', 'platinum', 'crystal'];
    const sorted = [...ids].sort((a, b) => MINERALS[a].hardness - MINERALS[b].hardness);
    let last = Infinity;
    for (const id of sorted) {
      const rate = miningRate(id);
      expect(rate).toBeLessThanOrEqual(last + 1e-9);
      last = rate;
    }
  });

  it('nimmt den Ertragsbonus als Faktor', () => {
    expect(miningRate('iron', 2)).toBeCloseTo(miningRate('iron') * 2, 9);
  });
});

describe('Scanner', () => {
  it('deckt das Mineral erst nach der vollen Scandauer auf', () => {
    const { mining } = setup(['platinum']);
    mining.requestScan();
    run(mining, DEFAULT_MINING_PARAMS.scanTime * 0.5);
    expect(mining.getStatus().mineral).toBeNull();
    expect(mining.getStatus().scanProgress).toBeGreaterThan(0.4);
    expect(mining.getStatus().scanProgress).toBeLessThan(0.6);

    run(mining, DEFAULT_MINING_PARAMS.scanTime * 0.6);
    expect(mining.getStatus().mineral).toBe('platinum');
    expect(mining.isScanned(0)).toBe(true);
  });

  it('braucht Reichweite', () => {
    const { field, mining } = setup(['platinum']);
    field.setDistance(0, DEFAULT_MINING_PARAMS.scanRange + 200);
    mining.requestScan();
    run(mining, DEFAULT_MINING_PARAMS.scanTime * 2);
    expect(mining.isScanned(0)).toBe(false);
    expect(mining.getStatus().message).toContain('REICHWEITE');
  });

  it('vergisst den Scan, sobald der Platz neu gesetzt wurde', () => {
    const { field, mining } = setup(['platinum']);
    mining.requestScan();
    run(mining, DEFAULT_MINING_PARAMS.scanTime * 1.1);
    expect(mining.getKnownMineral(0)).toBe('platinum');

    field.reseed(0, 'rock');
    expect(mining.isScanned(0)).toBe(false);
    expect(mining.getKnownMineral(0)).toBeNull();
  });

  it('bricht bei erneutem Druecken ab', () => {
    const { mining } = setup();
    mining.requestScan();
    run(mining, 0.5);
    mining.requestScan();
    run(mining, DEFAULT_MINING_PARAMS.scanTime * 2);
    expect(mining.isScanned(0)).toBe(false);
  });
});

describe('Foerderstrahl', () => {
  it('foerdert ungefaehr mit der Rate des Minerals in den Laderaum', () => {
    const { hold, mining } = setup(['iron']);
    mining.setBeam(true);
    run(mining, 20);
    mining.setBeam(false);
    run(mining, 0.1);

    // Der Anlauf kostet den halben Spin-up; alles darueber laeuft mit voller Rate.
    const expected = miningRate('iron') * (20 - DEFAULT_MINING_PARAMS.spinUp / 2);
    expect(hold.getTons('ore')).toBeGreaterThan(expected * 0.9);
    expect(hold.getTons('ore')).toBeLessThan(expected * 1.1);
  });

  it('braucht eine ganze Weile: 40 t Eisen dauern laenger als zwei Minuten', () => {
    expect(40 / miningRate('iron')).toBeGreaterThan(120);
  });

  it('legt das Material als die Ware des Minerals ab', () => {
    const { hold, mining } = setup(['crystal']);
    mining.setBeam(true);
    run(mining, 10);
    expect(hold.getTons('crystal')).toBeGreaterThan(0);
    expect(hold.getTons('ore')).toBe(0);
  });

  it('deckt den Brocken auch ohne Scan auf, sobald der erste Klumpen ankommt', () => {
    const { mining } = setup(['silicon']);
    expect(mining.isScanned(0)).toBe(false);
    mining.setBeam(true);
    run(mining, 10);
    expect(mining.isScanned(0)).toBe(true);
    expect(mining.getStatus().mineral).toBe('silicon');
  });

  it('nimmt den Ertragsbonus von aussen mit', () => {
    const field = new FakeField(['iron']);
    const hold = new CargoHold({ capacity: 40, credits: 0 });
    let bonus = 1;
    const mining = new MiningSystem({ field, hold, getYieldBonus: () => bonus });
    mining.setBeam(true);
    run(mining, 10);
    const plain = hold.getTons('ore');

    hold.clear();
    bonus = 3;
    run(mining, 10);
    expect(hold.getTons('ore')).toBeGreaterThan(plain * 2.5);
  });

  it('nimmt dem Brocken genau das, was im Laderaum ankommt', () => {
    const { field, hold, mining } = setup(['ice'], 6);
    mining.setBeam(true);
    run(mining, 60);
    mining.setBeam(false);
    run(mining, 0.1);
    expect(hold.getTons('water')).toBeCloseTo(6, 3);
    expect(field.getRemainingTons(0)).toBeCloseTo(0, 6);
    expect(mining.getStatus().message).toBe('BROCKEN ERSCHOEPFT');
  });

  it('haelt an der Kapazitaetsgrenze an und meldet den vollen Laderaum', () => {
    const { hold, mining } = setup(['ice'], 500);
    mining.setBeam(true);
    run(mining, 400);
    expect(hold.getUsedCapacity()).toBeCloseTo(hold.getCapacity(), 3);
    expect(hold.getFreeCapacity()).toBeGreaterThanOrEqual(0);
    expect(mining.getStatus().message).toBe('LADERAUM VOLL');
  });

  it('foerdert nicht ohne Ziel', () => {
    const { hold, mining } = setup();
    mining.setBeam(true);
    run(mining, 10, -1);
    expect(hold.getUsedCapacity()).toBe(0);
    expect(mining.getStatus().message).toBe('KEIN ZIEL');
  });

  it('foerdert nicht ueber die Reichweite hinaus', () => {
    const { field, hold, mining } = setup();
    field.setDistance(0, DEFAULT_MINING_PARAMS.beamRange + 50);
    mining.setBeam(true);
    run(mining, 10);
    expect(hold.getUsedCapacity()).toBe(0);
    expect(mining.getStatus().message).toBe('AUSSER REICHWEITE');
    expect(mining.getStatus().beamActive).toBe(false);
  });

  it('foerdert nicht durch einen Brocken hindurch', () => {
    const field = new FakeField(['iron']);
    const hold = new CargoHold({ capacity: 40, credits: 0 });
    const mining = new MiningSystem({
      field,
      hold,
      lineOfSight: () => false,
    });
    mining.setBeam(true);
    run(mining, 10);
    expect(hold.getUsedCapacity()).toBe(0);
    expect(mining.getStatus().message).toBe('SICHT VERSTELLT');
  });

  it('bucht den angebrochenen Klumpen beim Loslassen', () => {
    const { hold, mining } = setup(['ice']);
    mining.setBeam(true);
    // Kurz genug, dass der erste Klumpen noch nicht voll ist.
    run(mining, 1.2);
    const inFlight = hold.getTons('water');
    mining.setBeam(false);
    run(mining, 0.1);
    expect(hold.getTons('water')).toBeGreaterThan(inFlight);
  });

  it('bucht den angebrochenen Klumpen auch beim Zielwechsel', () => {
    const { hold, mining } = setup(['ice', 'iron'], 100);
    mining.setBeam(true);
    run(mining, 1.2, 0);
    run(mining, 0.1, 1);
    expect(hold.getTons('water')).toBeGreaterThan(0);
  });
});

describe('createLineOfSight', () => {
  const from = new Vector3(0, 0, 0);
  const to = new Vector3(0, 0, -100);

  it('laesst den Zielbrocken selbst durch', () => {
    const los = createLineOfSight({ hitSegment: () => ({ index: 7 }) });
    expect(los(from, to, 7)).toBe(true);
  });

  it('sperrt, wenn ein anderer Brocken davor liegt', () => {
    const los = createLineOfSight({ hitSegment: () => ({ index: 3 }) });
    expect(los(from, to, 7)).toBe(false);
  });

  it('laesst die freie Bahn durch', () => {
    const los = createLineOfSight({ hitSegment: () => null });
    expect(los(from, to, 7)).toBe(true);
  });
});
