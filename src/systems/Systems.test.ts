import { describe, expect, it } from 'vitest';
import { ShipSystems, SYSTEM_IDS, type SystemId } from './Systems';

/** Reproduzierbare Zufallsfolge — sonst laesst sich Verteilung nur behaupten. */
function lcg(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x1_0000_0000;
  };
}

const REAR = { x: 0, y: 0, z: 1 };
const FRONT = { x: 0, y: 0, z: -1 };
const SIDE = { x: 1, y: 0, z: 0 };

/** Zaehlt, welche Systeme `count` Treffer aus `direction` erwischen. */
function histogram(
  direction: { x: number; y: number; z: number },
  count: number,
  damage = 0.05,
): Record<string, number> {
  const random = lcg(1234);
  const tally: Record<string, number> = {};
  for (let i = 0; i < count; i++) {
    const systems = new ShipSystems({ random });
    for (const hit of systems.applyImpact(damage, direction)) {
      tally[hit.id] = (tally[hit.id] ?? 0) + 1;
    }
  }
  return tally;
}

describe('ShipSystems — Zustand', () => {
  it('startet mit heilen Systemen', () => {
    const systems = new ShipSystems();
    for (const id of SYSTEM_IDS) {
      expect(systems.getHealth(id)).toBe(1);
      expect(systems.getStatus(id)).toBe('ok');
    }
    expect(systems.anyDamaged).toBe(false);
  });

  it('kennt beeintraechtigt und ausgefallen', () => {
    const systems = new ShipSystems();
    systems.damage('engine', 0.5); // 0.5 < impairedAt 0.65
    expect(systems.getStatus('engine')).toBe('impaired');
    expect(systems.isFailed('engine')).toBe(false);

    systems.damage('engine', 0.45); // 0.05 <= failedAt 0.12
    expect(systems.getStatus('engine')).toBe('failed');
    expect(systems.anyFailed).toBe(true);
  });

  it('deckelt Zustaende auf 0..1', () => {
    const systems = new ShipSystems();
    systems.damage('sensors', 5);
    expect(systems.getHealth('sensors')).toBe(0);
    systems.repair('sensors', 5);
    expect(systems.getHealth('sensors')).toBe(1);
  });

  it('nennt das schlechteste System', () => {
    const systems = new ShipSystems();
    systems.damage('lighting', 0.3);
    systems.damage('weapons', 0.6);
    expect(systems.worst()).toBe<SystemId>('weapons');
  });
});

describe('ShipSystems — Schadensverteilung', () => {
  it('ignoriert Streifschuesse', () => {
    const systems = new ShipSystems({ random: lcg(7) });
    expect(systems.applyImpact(0.001, REAR)).toEqual([]);
    expect(systems.anyDamaged).toBe(false);
  });

  it('verteilt grosse Treffer auf mehrere Systeme', () => {
    const systems = new ShipSystems({ random: lcg(7) });
    const hits = systems.applyImpact(0.5, REAR);
    expect(hits).toHaveLength(3);
    expect(new Set(hits.map((h) => h.id)).size).toBe(3); // ohne Zuruecklegen
  });

  it('nimmt genau so viel Zustand weg, wie es verteilt', () => {
    const systems = new ShipSystems({ random: lcg(9) });
    const hits = systems.applyImpact(0.3, SIDE);
    for (const hit of hits) {
      expect(systems.getHealth(hit.id)).toBeCloseTo(1 - hit.amount, 6);
    }
  });

  it('liefert bei gleicher Zufallsfolge dasselbe Ergebnis', () => {
    const a = new ShipSystems({ random: lcg(42) }).applyImpact(0.4, REAR);
    const b = new ShipSystems({ random: lcg(42) }).applyImpact(0.4, REAR);
    expect(a).toEqual(b);
  });

  it('trifft von hinten eher das Triebwerk als die Sensorik', () => {
    const tally = histogram(REAR, 400);
    expect(tally.engine ?? 0).toBeGreaterThan(3 * (tally.sensors ?? 0));
  });

  it('trifft von vorn eher Sensorik und Kanonen als das Triebwerk', () => {
    const front = histogram(FRONT, 400);
    const rear = histogram(REAR, 400);
    expect(front.sensors ?? 0).toBeGreaterThan(rear.sensors ?? 0);
    expect(front.weapons ?? 0).toBeGreaterThan(rear.weapons ?? 0);
    expect(front.engine ?? 0).toBeLessThan(rear.engine ?? 0);
  });

  it('trifft von der Seite eher die Manoevrierduesen', () => {
    const side = histogram(SIDE, 400);
    const rear = histogram(REAR, 400);
    expect(side.thrusters ?? 0).toBeGreaterThan(rear.thrusters ?? 0);
    // Symmetrisch: von backbord wie von steuerbord.
    const port = histogram({ x: -1, y: 0, z: 0 }, 400);
    expect(port.thrusters ?? 0).toBe(side.thrusters ?? 0);
  });

  it('faengt mit heilem Generator einen Teil des Stosses ab', () => {
    const sum = (hits: Array<{ amount: number }>): number =>
      hits.reduce((total, hit) => total + hit.amount, 0);

    const withGenerator = new ShipSystems({ random: lcg(5) });
    const withoutGenerator = new ShipSystems({ random: lcg(5) });
    withoutGenerator.damage('generator', 1);

    // Gemessen wird der verteilte Schaden, nicht der verlorene Zustand: ein
    // bereits zerstoertes System kann nichts mehr verlieren.
    expect(sum(withoutGenerator.applyImpact(0.2, REAR)))
      .toBeGreaterThan(sum(withGenerator.applyImpact(0.2, REAR)));
  });
});

describe('ShipSystems — Auswirkungen', () => {
  it('laesst heile Systeme neutral', () => {
    const systems = new ShipSystems();
    expect(systems.getFlightDamage()).toEqual({
      thrust: 1,
      topSpeed: 1,
      torque: 1,
      yawBias: 0,
      afterburner: true,
    });
    expect(systems.getWeaponDamage()).toEqual({ reload: 1, activeGuns: 2 });
    expect(systems.sensorsOnline).toBe(true);
    expect(systems.getLightLevel()).toBe(1);
  });

  it('nimmt dem Triebwerk Schub und Hoechstgeschwindigkeit', () => {
    const systems = new ShipSystems();
    systems.damage('engine', 0.5);
    const half = systems.getFlightDamage();
    expect(half.thrust).toBeLessThan(1);
    expect(half.topSpeed).toBeLessThan(1);

    systems.damage('engine', 0.45);
    const dead = systems.getFlightDamage();
    expect(dead.thrust).toBeLessThan(half.thrust);
    expect(dead.topSpeed).toBeLessThan(0.2);
  });

  it('laesst defekte Duesen einseitig ziehen', () => {
    const systems = new ShipSystems({ random: lcg(3) });
    expect(systems.getFlightDamage().yawBias).toBe(0);

    systems.damage('thrusters', 0.4); // 0.6 < impairedAt 0.7
    const bias = systems.getFlightDamage().yawBias;
    expect(Math.abs(bias)).toBeGreaterThan(0);
    expect(Math.abs(bias)).toBeLessThanOrEqual(systems.getParams().maxYawBias);

    systems.repair('thrusters', 1);
    expect(systems.getFlightDamage().yawBias).toBe(0);
  });

  it('nimmt dem Generator den Nachbrenner', () => {
    const systems = new ShipSystems();
    systems.damage('generator', 0.95);
    expect(systems.getFlightDamage().afterburner).toBe(false);
  });

  it('verlaengert die Nachladezeit und legt Kanonen still', () => {
    const systems = new ShipSystems();
    systems.damage('weapons', 0.4); // beeintraechtigt
    const hurt = systems.getWeaponDamage();
    expect(hurt.reload).toBeGreaterThan(1);
    expect(hurt.activeGuns).toBe(1);

    systems.damage('weapons', 0.5); // ausgefallen
    expect(systems.getWeaponDamage().activeGuns).toBe(0);
  });

  it('schaltet die Zielerfassung mit der Sensorik ab', () => {
    const systems = new ShipSystems();
    systems.damage('sensors', 0.5);
    expect(systems.sensorsOnline).toBe(true);
    systems.damage('sensors', 0.3);
    expect(systems.sensorsOnline).toBe(false);
  });

  it('dimmt das Licht und schaltet auf Notbeleuchtung', () => {
    const systems = new ShipSystems();
    systems.damage('lighting', 0.5);
    expect(systems.getLightLevel()).toBeLessThan(1);
    expect(systems.getFlicker()).toBeGreaterThan(0);
    expect(systems.emergencyLighting).toBe(false);

    systems.damage('lighting', 0.4);
    expect(systems.getLightLevel()).toBe(0);
    expect(systems.emergencyLighting).toBe(true);
  });

  it('verbraucht Luft nur bei defekter Lebenserhaltung', () => {
    const systems = new ShipSystems();
    for (let i = 0; i < 600; i++) systems.update(1 / 120);
    expect(systems.oxygen).toBe(1);
    expect(systems.getOxygenSeconds()).toBe(Infinity);

    systems.damage('lifeSupport', 1);
    for (let i = 0; i < 60 * 120; i++) systems.update(1 / 120);
    expect(systems.oxygen).toBeLessThan(1);
    expect(systems.getOxygenSeconds()).toBeLessThan(systems.getParams().oxygenSeconds);

    // Nach der Reparatur fuellt sich die Luft wieder auf.
    systems.repair('lifeSupport', 1);
    for (let i = 0; i < 60 * 120; i++) systems.update(1 / 120);
    expect(systems.oxygen).toBe(1);
  });

  it('macht Reparaturen ohne Generator langsamer', () => {
    const systems = new ShipSystems();
    const full = systems.getRepairSpeed();
    systems.damage('generator', 1);
    expect(systems.getRepairSpeed()).toBeLessThan(full);
  });
});
