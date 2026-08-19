import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { toRadarPoint, type RadarPoint } from './RadarScreen';

/**
 * Nur die Abbildung wird getestet, nicht das Zeichnen: dafuer braeuchte es ein
 * Canvas, und die Aussage waere "Canvas ruft Canvas auf".
 */
const point = (): RadarPoint => ({ x: 0, y: 0, radius: 0 });

describe('toRadarPoint', () => {
  const range = 2000;

  it('legt das eigene Schiff in die Mitte', () => {
    const p = toRadarPoint(new Vector3(0, 0, 0), range, point());
    expect(p.x).toBeCloseTo(0, 6);
    expect(p.y).toBeCloseTo(0, 6);
    expect(p.radius).toBe(0);
  });

  it('zeigt einen Kontakt voraus (-Z) nach oben', () => {
    const p = toRadarPoint(new Vector3(0, 0, -range), range, point());
    expect(p.x).toBeCloseTo(0, 6);
    expect(p.y).toBeCloseTo(1, 6);
  });

  it('zeigt einen Kontakt achtern nach unten', () => {
    const p = toRadarPoint(new Vector3(0, 0, range), range, point());
    expect(p.y).toBeCloseTo(-1, 6);
  });

  it('zeigt Steuerbord rechts und Backbord links', () => {
    expect(toRadarPoint(new Vector3(range, 0, 0), range, point()).x).toBeCloseTo(1, 6);
    expect(toRadarPoint(new Vector3(-range, 0, 0), range, point()).x).toBeCloseTo(-1, 6);
  });

  it('ignoriert die Hoehe in der Draufsicht', () => {
    const flat = toRadarPoint(new Vector3(300, 0, -800), range, point());
    const high = toRadarPoint(new Vector3(300, 5000, -800), range, point());
    expect(high.x).toBeCloseTo(flat.x, 6);
    expect(high.y).toBeCloseTo(flat.y, 6);
  });

  it('markiert Kontakte ausserhalb der Reichweite ueber radius > 1', () => {
    expect(toRadarPoint(new Vector3(0, 0, -range * 0.9), range, point()).radius).toBeLessThan(1);
    expect(toRadarPoint(new Vector3(0, 0, -range * 1.1), range, point()).radius).toBeGreaterThan(1);
  });

  it('skaliert linear mit der Entfernung', () => {
    const near = toRadarPoint(new Vector3(0, 0, -range / 4), range, point());
    const far = toRadarPoint(new Vector3(0, 0, -range / 2), range, point());
    expect(far.y).toBeCloseTo(near.y * 2, 6);
  });
});
