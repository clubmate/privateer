import { describe, expect, it } from 'vitest';
import { beaconLevel, plumeLength, thrustLevel, type ThrustSource } from './Exterior';

function source(overrides: Partial<ThrustSource> = {}): ThrustSource {
  return {
    assistEnabled: true,
    setSpeed: 0,
    maxSetSpeed: 500,
    main: 0,
    afterburner: false,
    ...overrides,
  };
}

describe('thrustLevel', () => {
  it('folgt in den geregelten Modi der Sollgeschwindigkeit', () => {
    expect(thrustLevel(source({ setSpeed: 0 }))).toBe(0);
    expect(thrustLevel(source({ setSpeed: 250 }))).toBeCloseTo(0.5, 10);
    expect(thrustLevel(source({ setSpeed: 500 }))).toBe(1);
  });

  it('begrenzt auf 0..1', () => {
    expect(thrustLevel(source({ setSpeed: 900 }))).toBe(1);
    expect(thrustLevel(source({ setSpeed: -50 }))).toBe(0);
  });

  it('nimmt im freien Newton-Modus die Schubeingabe', () => {
    const free = { assistEnabled: false, setSpeed: 500 };
    expect(thrustLevel(source({ ...free, main: 0 }))).toBe(0);
    expect(thrustLevel(source({ ...free, main: 0.6 }))).toBeCloseTo(0.6, 10);
    // Retroschub laesst die Hauptduesen nicht brennen.
    expect(thrustLevel(source({ ...free, main: -1 }))).toBe(0);
  });

  it('geht bei maxSetSpeed = 0 nicht kaputt', () => {
    expect(thrustLevel(source({ maxSetSpeed: 0, setSpeed: 10 }))).toBe(0);
  });
});

describe('plumeLength', () => {
  it('waechst mit dem Schub', () => {
    expect(plumeLength(1, false)).toBeGreaterThan(plumeLength(0, false));
  });

  it('ist mit Nachbrenner deutlich laenger', () => {
    expect(plumeLength(1, true)).toBeGreaterThan(plumeLength(1, false) * 2);
  });

  it('bleibt auch im Leerlauf sichtbar', () => {
    expect(plumeLength(0, false)).toBeGreaterThan(0);
  });
});

describe('beaconLevel', () => {
  it('blitzt am Anfang der Periode', () => {
    expect(beaconLevel(0, 1.7)).toBeCloseTo(1, 6);
  });

  it('ist zwischen den Blitzen dunkel', () => {
    expect(beaconLevel(0.8, 1.7)).toBe(0);
    expect(beaconLevel(1.4, 1.7)).toBe(0);
  });

  it('hat einen zweiten Blitz kurz nach dem ersten', () => {
    expect(beaconLevel(0.2, 1.7)).toBeCloseTo(1, 6);
    expect(beaconLevel(0.1, 1.7)).toBe(0);
  });

  it('wiederholt sich periodisch und vertraegt negative Zeiten', () => {
    expect(beaconLevel(1.7, 1.7)).toBeCloseTo(beaconLevel(0, 1.7), 6);
    expect(beaconLevel(-1.7, 1.7)).toBeCloseTo(beaconLevel(0, 1.7), 6);
  });

  it('verschiebt sich mit der Phase', () => {
    // Zwei Blitzer mit verschiedener Phase blitzen nicht gleichzeitig.
    expect(beaconLevel(0, 1.7, 0)).toBeCloseTo(1, 6);
    expect(beaconLevel(0, 1.7, 0.9)).toBe(0);
  });
});
