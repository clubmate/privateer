import { MathUtils } from 'three';
import type { PerspectiveCamera } from 'three';

/**
 * Kamerawackler nach Treffern und Zusammenstoessen.
 *
 * Arbeitet mit "Trauma" (0..1), das gleichmaessig abklingt; der Ausschlag geht
 * quadratisch damit, sodass kleine Rempler kaum, harte Einschlaege deutlich zu
 * spueren sind. Die Bewegung kommt aus einem festen Pseudozufallsgenerator —
 * gleicher Verlauf bei gleichem Spielstand, und im Test nachrechenbar.
 */

export interface ShakeParams {
  /** Trauma-Abbau je Sekunde. */
  decay: number;
  /** Groesster Versatz in Metern bei vollem Trauma. */
  maxOffset: number;
  /** Groesste Verrollung in Radiant bei vollem Trauma. */
  maxRoll: number;
  /** Schwingungen je Sekunde. */
  frequency: number;
}

export const DEFAULT_SHAKE_PARAMS: ShakeParams = {
  decay: 1.4,
  maxOffset: 0.16,
  maxRoll: 0.05,
  frequency: 22,
};

export class CameraShake {
  private trauma = 0;
  private time = 0;
  private readonly params: ShakeParams;

  constructor(params: Partial<ShakeParams> = {}) {
    this.params = { ...DEFAULT_SHAKE_PARAMS, ...params };
  }

  /** Aktuelles Trauma 0..1. */
  getTrauma(): number {
    return this.trauma;
  }

  /** Stoss hinzufuegen; `amount` 0..1, mehrere Stoesse addieren sich. */
  add(amount: number): void {
    this.trauma = MathUtils.clamp(this.trauma + amount, 0, 1);
  }

  reset(): void {
    this.trauma = 0;
    this.time = 0;
  }

  update(dt: number): void {
    this.time += dt;
    this.trauma = Math.max(this.trauma - this.params.decay * dt, 0);
  }

  /**
   * Wackler auf die bereits gesetzte Kamerapose legen. Muss **nach**
   * `PlayerState.updateCamera()` laufen, weil die dort ueberschrieben wird.
   */
  applyTo(camera: PerspectiveCamera): void {
    if (this.trauma <= 0) return;
    const shake = this.trauma * this.trauma;
    const t = this.time * this.params.frequency;

    const x = wave(t, 0) * shake * this.params.maxOffset;
    const y = wave(t, 17.3) * shake * this.params.maxOffset;
    const roll = wave(t, 41.7) * shake * this.params.maxRoll;

    camera.translateX(x);
    camera.translateY(y);
    camera.rotateZ(roll);
  }
}

/**
 * Pseudozufaellige Schwingung -1..1. Drei unharmonische Sinus ergeben einen
 * Verlauf ohne hoerbare Periode, bleiben aber deterministisch.
 */
function wave(t: number, phase: number): number {
  return (
    Math.sin(t + phase) * 0.6 +
    Math.sin(t * 1.7 + phase * 1.3) * 0.3 +
    Math.sin(t * 2.9 + phase * 0.7) * 0.1
  );
}
