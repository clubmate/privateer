import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { Interactables, labelOf } from './Interactables';

const noop = (): void => {};

describe('Interactables', () => {
  it('findet nichts, wenn nichts angemeldet ist', () => {
    const reg = new Interactables();
    expect(reg.findNearest(new Vector3())).toBeNull();
  });

  it('meldet einen Punkt in Reichweite, aber nicht ausserhalb', () => {
    const reg = new Interactables();
    reg.add({ label: 'F — TEST', position: new Vector3(0, 1.2, -1), activate: noop });

    expect(reg.findNearest(new Vector3(0, 0, 0))).not.toBeNull();
    expect(reg.findNearest(new Vector3(0, 0, -4))).toBeNull();
  });

  it('misst von der Brust, nicht von den Fuessen', () => {
    const reg = new Interactables();
    // Konsole auf 1,2 m: von den Fuessen aus 1,2 m entfernt, von der Brust 0.
    const item = { label: 'x', position: new Vector3(0, 1.2, 0), activate: noop };
    reg.add(item);
    expect(reg.distanceTo(new Vector3(0, 0, 0), item)).toBeCloseTo(0);
  });

  it('waehlt den naechsten von mehreren Kandidaten', () => {
    const reg = new Interactables();
    reg.add({ label: 'fern', position: new Vector3(0, 1.2, -1.2), activate: noop });
    reg.add({ label: 'nah', position: new Vector3(0, 1.2, -0.3), activate: noop });

    expect(labelOf(reg.findNearest(new Vector3())!)).toBe('nah');
  });

  it('ueberspringt abgeschaltete Punkte', () => {
    const reg = new Interactables();
    let live = false;
    reg.add({ label: 'aus', position: new Vector3(), enabled: () => live, activate: noop });

    expect(reg.findNearest(new Vector3(0, 0, 0))).toBeNull();
    live = true;
    expect(reg.findNearest(new Vector3(0, 0, 0))).not.toBeNull();
  });

  it('meldet Punkte wieder ab', () => {
    const reg = new Interactables();
    const remove = reg.add({ label: 'x', position: new Vector3(), activate: noop });
    expect(reg.count).toBe(1);
    remove();
    expect(reg.count).toBe(0);
    expect(reg.findNearest(new Vector3())).toBeNull();
  });

  it('loest Labels als Funktion auf', () => {
    let tons = 4;
    const item = { label: () => `F — ${tons} T`, position: new Vector3(), activate: noop };
    expect(labelOf(item)).toBe('F — 4 T');
    tons = 7;
    expect(labelOf(item)).toBe('F — 7 T');
  });
});
