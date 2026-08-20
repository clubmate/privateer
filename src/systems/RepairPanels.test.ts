import { describe, expect, it } from 'vitest';
import { PANEL_PLACEMENTS } from './RepairPanels';
import { SYSTEM_IDS } from './Systems';

/**
 * Regeln fuer die Lage der Reparaturklappen.
 *
 * Beide Regeln stammen aus dem Durchlaufen im Walk-Mode, nicht aus der Theorie:
 * die Klappe im Fussraum liess sich nie ansprechen, weil der Sitz denselben
 * Tastendruck gewinnt, und die Klappe an der Gangdecke trug ihre Beschriftung
 * kopfueber. Beides sieht man dem Zahlentripel nicht an — deshalb hier.
 */

/** Pilotensitz in GLB-Innenraumkoordinaten (siehe `tools/build_interior.py`). */
const SEAT = { x: 0, z: 3.02 };
/** So weit reicht der Hinsetzen-Prompt (`PlayerState.SIT_RANGE`). */
const SIT_RANGE = 1.5;

describe('PANEL_PLACEMENTS', () => {
  it('hat genau eine Klappe je System', () => {
    const ids = PANEL_PLACEMENTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort()).toEqual([...SYSTEM_IDS].sort());
  });

  it('haelt jede Klappe aus dem Zugriffsbereich des Sitzes heraus', () => {
    for (const placement of PANEL_PLACEMENTS) {
      const distance = Math.hypot(placement.position[0] - SEAT.x, placement.position[2] - SEAT.z);
      // Bei Gleichstand gewinnt der Sitz; naeher dran gaebe es keinen
      // Standpunkt mehr, an dem die Klappe den Prompt bekommt.
      expect(distance, `${placement.id} steht zu dicht am Sitz`).toBeGreaterThan(SIT_RANGE);
    }
  });

  it('braucht fuer senkrechte Klappen eine Oberkante', () => {
    for (const placement of PANEL_PLACEMENTS) {
      const [, fy] = placement.facing;
      // Zeigt die Frontplatte nach oben oder unten, ist "oben" auf dem Schild
      // nicht mehr durch die Weltachse bestimmt und muss angegeben werden.
      if (Math.abs(fy) > 0.95) {
        expect(placement.up, `${placement.id} braucht ein up`).toBeDefined();
      }
    }
  });

  it('hat normierte Aussennormalen entlang einer Achse', () => {
    for (const placement of PANEL_PLACEMENTS) {
      const [fx, fy, fz] = placement.facing;
      expect(Math.hypot(fx, fy, fz)).toBeCloseTo(1, 5);
    }
  });
});
