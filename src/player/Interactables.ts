import { Vector3 } from 'three';

/**
 * Register fuer Dinge, die man an Bord anfassen kann.
 *
 * Der Walk-Mode kannte bisher genau eine Interaktion: den Pilotensitz. Sobald
 * es Reparaturstellen, Frachtkisten oder eine Andockkonsole gibt, braucht es
 * eine gemeinsame Stelle, an der sich solche Punkte anmelden — sonst baut sich
 * jedes Feature seine eigene Abfrage und der Spieler bekommt zwei Prompts
 * gleichzeitig.
 *
 * Konvention: `position` liegt im **Schiffslokalraum** (dieselbe Basis wie
 * `WalkController.position`, Boden bei y=0). Verglichen wird gegen die Brust
 * des Spielers, nicht gegen seine Fuesse — sonst ist eine Konsole auf
 * Huefthoehe je nach Standpunkt mal in, mal ausser Reichweite.
 */

/** Reichweite, wenn ein Interactable nichts anderes angibt. */
export const DEFAULT_RANGE = 1.4;

/** Hoehe ueber dem Fusspunkt, von der aus gemessen wird. */
export const CHEST_HEIGHT = 1.2;

export interface Interactable {
  /**
   * Text im HUD-Prompt, z. B. `'F — SICHERUNG TAUSCHEN'`. Als Funktion, wenn
   * er vom Zustand abhaengt (`'F — 4 T ERZ ABLADEN'`).
   */
  label: string | (() => string);
  /** Punkt im Schiffslokalraum. Wird nicht kopiert — Bewegen ist erlaubt. */
  position: Vector3;
  /** Reichweite in Metern; Standard {@link DEFAULT_RANGE}. */
  range?: number;
  /** Aktuell anbietbar? Fehlt die Funktion, gilt das Interactable als aktiv. */
  enabled?: () => boolean;
  /** Wird bei `F` in Reichweite gerufen. */
  activate: () => void;
}

export class Interactables {
  private readonly items: Interactable[] = [];

  /** Meldet einen Punkt an und gibt die Abmeldefunktion zurueck. */
  add(item: Interactable): () => void {
    this.items.push(item);
    return () => this.remove(item);
  }

  remove(item: Interactable): void {
    const index = this.items.indexOf(item);
    if (index >= 0) this.items.splice(index, 1);
  }

  clear(): void {
    this.items.length = 0;
  }

  get count(): number {
    return this.items.length;
  }

  /**
   * Naechster aktiver Punkt in Reichweite von `feet` (Fusspunkt im
   * Schiffslokalraum), oder `null`. Bei mehreren Kandidaten gewinnt der
   * naechste — nicht der zuerst angemeldete.
   */
  findNearest(feet: Vector3): Interactable | null {
    let best: Interactable | null = null;
    let bestDistance = Infinity;

    for (const item of this.items) {
      if (item.enabled && !item.enabled()) continue;
      const distance = this.distanceTo(feet, item);
      const range = item.range ?? DEFAULT_RANGE;
      if (distance > range || distance >= bestDistance) continue;
      best = item;
      bestDistance = distance;
    }
    return best;
  }

  /** Entfernung Brust -> Punkt. Oeffentlich, damit der Sitz mitkonkurrieren kann. */
  distanceTo(feet: Vector3, item: Interactable): number {
    const dx = feet.x - item.position.x;
    const dy = feet.y + CHEST_HEIGHT - item.position.y;
    const dz = feet.z - item.position.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
}

/** Label aufloesen (String oder Funktion). */
export function labelOf(item: Interactable): string {
  return typeof item.label === 'function' ? item.label() : item.label;
}
