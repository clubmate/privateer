import { describe, expect, it } from 'vitest';
import { RepairController } from './Repair';
import { ShipSystems } from './Systems';

/** Systeme mit einem angeschlagenen Triebwerk plus Reparatursteuerung. */
function setup(health = 0.5): { systems: ShipSystems; repair: RepairController } {
  const systems = new ShipSystems();
  systems.damage('engine', 1 - health);
  return { systems, repair: new RepairController(systems) };
}

/** `seconds` Sekunden reparieren, der Spieler steht dabei direkt davor. */
function run(repair: RepairController, seconds: number, distance = 0.6): void {
  const dt = 1 / 60;
  for (let i = 0; i < Math.round(seconds / dt); i++) repair.update(dt, distance);
}

describe('RepairController', () => {
  it('lehnt heile Systeme ab', () => {
    const { repair } = setup(1);
    expect(repair.start('engine')).toBe(false);
    expect(repair.isActive()).toBe(false);
  });

  it('hebt den Zustand waehrend der Reparatur an', () => {
    const { systems, repair } = setup(0.5);
    repair.toolInHand = true;
    expect(repair.start('engine')).toBe(true);

    run(repair, 1);
    expect(repair.getProgress()).toBeGreaterThan(0);
    expect(systems.getHealth('engine')).toBeGreaterThan(0.5);
    expect(systems.getHealth('engine')).toBeLessThan(1);
  });

  it('macht bis zum vollen Zustand fertig', () => {
    const { systems, repair } = setup(0.5);
    repair.toolInHand = true;
    repair.start('engine');

    run(repair, 30);
    expect(systems.getHealth('engine')).toBe(1);
    expect(repair.isActive()).toBe(false);
    expect(repair.getLastEnd()?.reason).toBe('done');
  });

  it('bricht ab, wenn der Spieler weglaeuft', () => {
    const { systems, repair } = setup(0.4);
    repair.toolInHand = true;
    repair.start('engine');
    run(repair, 1);
    const reached = systems.getHealth('engine');

    repair.update(1 / 60, 4);
    expect(repair.isActive()).toBe(false);
    expect(repair.getLastEnd()?.reason).toBe('aborted');
    // Der Teilfortschritt bleibt erhalten — sonst waere Weglaufen eine Strafe.
    expect(systems.getHealth('engine')).toBeCloseTo(reached, 6);
  });

  it('bricht ab, wenn der Spieler sich hinsetzt', () => {
    const { repair } = setup(0.4);
    repair.start('engine');
    repair.update(1 / 60, null);
    expect(repair.isActive()).toBe(false);
  });

  it('dauert ohne Werkzeug laenger', () => {
    const withTool = setup(0.5);
    withTool.repair.toolInHand = true;
    withTool.repair.start('engine');
    run(withTool.repair, 2);

    const without = setup(0.5);
    without.repair.start('engine');
    run(without.repair, 2);

    expect(without.repair.getProgress()).toBeLessThan(withTool.repair.getProgress());
  });

  it('dauert bei groesserem Schaden laenger', () => {
    const light = setup(0.8);
    light.repair.toolInHand = true;
    light.repair.start('engine');
    run(light.repair, 2);

    const heavy = setup(0.1);
    heavy.repair.toolInHand = true;
    heavy.repair.start('engine');
    run(heavy.repair, 2);

    expect(heavy.repair.getProgress()).toBeLessThan(light.repair.getProgress());
  });

  it('laeuft ohne Generator langsamer', () => {
    const fast = setup(0.5);
    fast.repair.toolInHand = true;
    fast.repair.start('engine');
    run(fast.repair, 2);

    const slow = setup(0.5);
    slow.systems.damage('generator', 1);
    slow.repair.toolInHand = true;
    slow.repair.start('engine');
    run(slow.repair, 2);

    expect(slow.repair.getProgress()).toBeLessThan(fast.repair.getProgress());
  });

  it('nimmt einen Treffer waehrend der Reparatur mit', () => {
    const { systems, repair } = setup(0.6);
    repair.toolInHand = true;
    repair.start('engine');
    run(repair, 1);

    const before = systems.getHealth('engine');
    systems.damage('engine', 0.3);
    expect(systems.getHealth('engine')).toBeCloseTo(before - 0.3, 6);
    // Die laufende Reparatur arbeitet danach von diesem Wert aus weiter.
    run(repair, 1);
    expect(systems.getHealth('engine')).toBeGreaterThan(before - 0.3);
  });
});
