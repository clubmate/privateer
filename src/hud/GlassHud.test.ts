import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { boxEdge, cursorDirection, CURSOR_SPAN, markerOpacity, miningLine } from './GlassHud';
import type { MiningStatus } from '../mining/MiningSystem';

/**
 * Geprueft wird die Abbildung — wohin ein Zeichen zeigt und wie gross es
 * wird. Das Zeichnen laeuft ueber Canvas und WebGL und gehoert ins Bild, nicht
 * in einen Test.
 */

const FOV = 65;
const tanHalf = Math.tan((FOV * Math.PI) / 360);
/** Bildkoordinate (NDC) einer Richtung im Kameraraum. */
const ndc = (dir: Vector3) => ({
  x: dir.x / (-dir.z * tanHalf),
  y: dir.y / (-dir.z * tanHalf),
});

describe('cursorDirection', () => {
  it('zeigt ohne Ausschlag genau nach vorn', () => {
    const dir = cursorDirection(0, 0, FOV, new Vector3());
    expect(dir.x).toBeCloseTo(0, 6);
    expect(dir.y).toBeCloseTo(0, 6);
    expect(dir.z).toBeCloseTo(-1, 6);
  });

  it('liefert eine Richtung der Laenge eins', () => {
    expect(cursorDirection(1, -1, FOV, new Vector3()).length()).toBeCloseTo(1, 6);
  });

  it('legt den Ausschlag nach rechts und (y positiv) nach unten', () => {
    const dir = cursorDirection(0.5, 0.5, FOV, new Vector3());
    expect(dir.x).toBeGreaterThan(0);
    expect(dir.y).toBeLessThan(0);
  });

  it('trifft dieselbe Bildstelle wie das fruehere DOM-Overlay', () => {
    const dir = cursorDirection(0.5, 0.25, FOV, new Vector3());
    const p = ndc(dir);
    expect(p.x).toBeCloseTo(CURSOR_SPAN * 0.5, 6);
    expect(p.y).toBeCloseTo(-CURSOR_SPAN * 0.25, 6);
  });

  it('bleibt beim Vollausschlag innerhalb des Bildes', () => {
    const p = ndc(cursorDirection(1, 1, FOV, new Vector3()));
    expect(Math.abs(p.y)).toBeLessThan(1);
  });
});

describe('boxEdge', () => {
  it('waechst mit der scheinbaren Groesse des Brockens', () => {
    const near = boxEdge(20, 200, 2.4);
    const far = boxEdge(20, 400, 2.4);
    expect(near).toBeCloseTo(far * 2, 6);
  });

  it('rahmt den Brocken massstaeblich ein', () => {
    // Halbmesser 20 m auf 400 m: 0,05 rad -> 0,05 * 2,4 m auf der Zeichenebene.
    expect(boxEdge(20, 400, 2.4)).toBeCloseTo(0.24, 6);
  });

  it('faellt nie unter die Mindestgroesse und waechst nicht ueber den Rand', () => {
    expect(boxEdge(1, 5000, 2.4)).toBeCloseTo(0.10, 6);
    expect(boxEdge(400, 100, 2.4)).toBeCloseTo(0.95, 6);
  });

  it('haelt auch bei Entfernung null einen endlichen Wert', () => {
    expect(Number.isFinite(boxEdge(30, 0, 2.4))).toBe(true);
  });
});

describe('markerOpacity', () => {
  it('zeigt Marken vor dem Piloten voll an', () => {
    expect(markerOpacity(0, 46, 8)).toBe(1);
    expect(markerOpacity(30, 46, 8)).toBe(1);
  });

  it('blendet zum Rand des Sichtfelds hin aus', () => {
    expect(markerOpacity(42, 46, 8)).toBeCloseTo(0.5, 6);
    expect(markerOpacity(46, 46, 8)).toBe(0);
    expect(markerOpacity(120, 46, 8)).toBe(0);
  });

  it('faellt monoton', () => {
    let last = 1;
    for (let a = 0; a <= 60; a += 2) {
      const value = markerOpacity(a, 46, 8);
      expect(value).toBeLessThanOrEqual(last + 1e-9);
      last = value;
    }
  });
});

/** Nur die Felder, die die Zeile unter der Zielklammer liest. */
function miningStatus(overrides: Partial<MiningStatus> = {}): MiningStatus {
  return {
    phase: 'idle', targetIndex: 2, mineral: null, scanned: false, scanProgress: 0,
    distance: 200, targetRadius: 14, beamRange: 600, remainingTons: 40, totalTons: 80, sessionTons: 0,
    batchProgress: 0, rate: 0, bonus: 1, beamActive: false, charge: 0,
    hitPoint: new Vector3(), hitNormal: new Vector3(0, 1, 0), hasHit: true,
    deliveries: 0, sinceDelivery: Infinity, message: 'BEREIT',
    cargoUsed: 0, cargoFree: 40, cargoCapacity: 40,
    ...overrides,
  };
}

describe('miningLine', () => {
  it('bleibt ohne Ziel leer', () => {
    expect(miningLine(null)).toBe('');
    expect(miningLine(miningStatus({ targetIndex: -1 }))).toBe('');
  });

  it('nennt einen ungescannten Brocken UNBEKANNT', () => {
    expect(miningLine(miningStatus())).toBe('UNBEKANNT');
  });

  it('zeigt waehrend des Scans den Fortschritt', () => {
    expect(miningLine(miningStatus({ scanProgress: 0.25 }))).toBe('SCAN 25%');
  });

  it('zeigt beim Foerdern Kuerzel und Ausbeute des Brockens', () => {
    const line = miningLine(miningStatus({ beamActive: true, mineral: 'ice', sessionTons: 3.25 }));
    expect(line).toBe('H2O +3.3 T');
  });

  it('passt in die Breite der Leinwand', () => {
    const long = miningLine(miningStatus({ mineral: 'crystal', scanned: true }));
    expect(long.length).toBeLessThanOrEqual(17);
  });
});
