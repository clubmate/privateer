import { describe, expect, it } from 'vitest';
import { Quaternion, Vector3 } from 'three';
import {
  attitudeFrom,
  closingRate,
  formatRange,
  litSegments,
  ratio,
  sectorLabel,
  SECTOR_SIZE,
  mineralHeadline,
  miningActivity,
} from './CockpitDisplays';
import type { MiningStatus } from '../mining/MiningSystem';

/**
 * Getestet wird, was rechenbar ist: Lage, Sektor, Naeherungsrate, Formate.
 * Das Zeichnen selbst braeuchte ein Canvas und wuerde nur bestaetigen, dass
 * Canvas Canvas aufruft.
 */

const aroundX = (deg: number) => new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), (deg * Math.PI) / 180);
const aroundY = (deg: number) => new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), (deg * Math.PI) / 180);
/** Drehung um die Nase (-Z). */
const aroundNose = (deg: number) => new Quaternion().setFromAxisAngle(new Vector3(0, 0, -1), (deg * Math.PI) / 180);

describe('attitudeFrom', () => {
  it('meldet fuer die Ruhelage Null in allen drei Winkeln', () => {
    const a = attitudeFrom(new Quaternion());
    expect(a.pitch).toBeCloseTo(0, 6);
    expect(a.bearing).toBeCloseTo(0, 6);
    expect(a.roll).toBeCloseTo(0, 6);
  });

  it('zaehlt die Peilung nach Steuerbord', () => {
    expect(attitudeFrom(aroundY(-90)).bearing).toBeCloseTo(90, 4);
    expect(attitudeFrom(aroundY(90)).bearing).toBeCloseTo(270, 4);
  });

  it('meldet die Nase oben als positive Lage', () => {
    expect(attitudeFrom(aroundX(30)).pitch).toBeCloseTo(30, 4);
    expect(attitudeFrom(aroundX(-30)).pitch).toBeCloseTo(-30, 4);
  });

  it('meldet Rollen nach Steuerbord positiv', () => {
    expect(attitudeFrom(aroundNose(20)).roll).toBeCloseTo(20, 4);
    expect(attitudeFrom(aroundNose(-20)).roll).toBeCloseTo(-20, 4);
  });

  it('haelt die Lage im Bereich -90..90', () => {
    expect(attitudeFrom(aroundX(89)).pitch).toBeLessThanOrEqual(90);
    expect(attitudeFrom(aroundX(-89)).pitch).toBeGreaterThanOrEqual(-90);
  });
});

describe('sectorLabel', () => {
  it('nennt den Ursprung als erste Zelle', () => {
    expect(sectorLabel(new Vector3(0, 0, 0))).toBe('TROJA A-00');
  });

  it('zaehlt entlang X den Buchstaben, entlang Z die Zahl', () => {
    expect(sectorLabel(new Vector3(SECTOR_SIZE * 1.5, 0, SECTOR_SIZE * 2.2))).toBe('TROJA B-02');
  });

  it('kommt mit negativen Koordinaten zurecht', () => {
    expect(sectorLabel(new Vector3(-1, 0, -1))).toBe('TROJA Z-99');
  });

  it('haengt nicht an der Hoehe', () => {
    expect(sectorLabel(new Vector3(100, 900_000, 100))).toBe(sectorLabel(new Vector3(100, 0, 100)));
  });
});

describe('closingRate', () => {
  const origin = new Vector3(0, 0, 0);
  const still = new Vector3(0, 0, 0);

  it('ist positiv, solange der Abstand schrumpft', () => {
    const rate = closingRate(new Vector3(0, 0, -100), new Vector3(0, 0, 40), origin, still);
    expect(rate).toBeCloseTo(40, 6);
  });

  it('ist negativ, wenn sich das Ziel entfernt', () => {
    const rate = closingRate(new Vector3(0, 0, -100), new Vector3(0, 0, -40), origin, still);
    expect(rate).toBeCloseTo(-40, 6);
  });

  it('rechnet die eigene Fahrt mit', () => {
    const rate = closingRate(new Vector3(0, 0, -100), still, origin, new Vector3(0, 0, -60));
    expect(rate).toBeCloseTo(60, 6);
  });

  it('ignoriert Querbewegung', () => {
    const rate = closingRate(new Vector3(0, 0, -100), new Vector3(50, 0, 0), origin, still);
    expect(rate).toBeCloseTo(0, 6);
  });
});

describe('Balken und Formate', () => {
  it('begrenzt den Anteil auf 0..1', () => {
    expect(ratio(-5, 100)).toBe(0);
    expect(ratio(150, 100)).toBe(1);
    expect(ratio(25, 100)).toBeCloseTo(0.25, 6);
    expect(ratio(5, 0)).toBe(0);
  });

  it('laesst ein Segment leuchten, sobald ueberhaupt etwas anliegt', () => {
    expect(litSegments(0, 1, 10)).toBe(0);
    expect(litSegments(0.001, 1, 10)).toBe(1);
    expect(litSegments(0.55, 1, 10)).toBe(6);
    expect(litSegments(2, 1, 10)).toBe(10);
  });

  it('wechselt bei einem Kilometer die Einheit', () => {
    expect(formatRange(999)).toBe('999 M');
    expect(formatRange(1000)).toBe('1.00 KM');
    expect(formatRange(1234.5)).toBe('1.23 KM');
  });
});

// ------------------------------------------------------------------ Bergbau

/** Ein Bergbauzustand von Hand — nur die Felder, die die Schirme lesen. */
function miningStatus(overrides: Partial<MiningStatus> = {}): MiningStatus {
  return {
    phase: 'idle',
    targetIndex: 3,
    mineral: null,
    scanned: false,
    scanProgress: 0,
    distance: 200,
    beamRange: 600,
    remainingTons: 40,
    totalTons: 80,
    sessionTons: 0,
    batchProgress: 0,
    rate: 0,
    bonus: 1,
    beamActive: false,
    charge: 0,
    hitPoint: new Vector3(),
    hitNormal: new Vector3(0, 1, 0),
    hasHit: true,
    deliveries: 0,
    sinceDelivery: Infinity,
    message: 'BEREIT',
    cargoUsed: 12,
    cargoFree: 28,
    cargoCapacity: 40,
    ...overrides,
  };
}

describe('mineralHeadline', () => {
  it('meldet ohne Bergbausystem und ohne Ziel "FREI"', () => {
    expect(mineralHeadline(null)).toBe('FREI');
    expect(mineralHeadline(miningStatus({ targetIndex: -1 }))).toBe('FREI');
  });

  it('nennt einen ungescannten Brocken "UNBEKANNT"', () => {
    expect(mineralHeadline(miningStatus())).toBe('UNBEKANNT');
  });

  it('nennt nach dem Scan das Mineral', () => {
    expect(mineralHeadline(miningStatus({ mineral: 'platinum', scanned: true })))
      .toBe('PLATINERZ');
  });
});

describe('miningActivity', () => {
  it('zeigt den laufenden Scan mit seinem Fortschritt', () => {
    const a = miningActivity(miningStatus({ scanProgress: 0.5 }));
    expect(a.text).toBe('SCAN 50%');
    expect(a.fill).toBeCloseTo(0.5, 6);
  });

  it('zeigt bei liegendem Strahl die Rate und den Klumpenfortschritt', () => {
    const a = miningActivity(miningStatus({ beamActive: true, rate: 0.29, batchProgress: 0.4 }));
    expect(a.text).toContain('0.29 T/S');
    expect(a.fill).toBeCloseTo(0.4, 6);
  });

  it('zeigt sonst die Meldung des Systems ohne Balken', () => {
    const a = miningActivity(miningStatus({ message: 'LADERAUM VOLL' }));
    expect(a.text).toBe('LADERAUM VOLL');
    expect(a.fill).toBe(0);
  });
});
