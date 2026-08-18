/** Fester Physik-Timestep: 120 Hz (siehe PLAN.md). */
export const FIXED_DT = 1 / 120;

/** Maximale Simulationszeit, die ein einzelner Frame nachholen darf. */
const MAX_FRAME_TIME = 0.25;

/**
 * Zeitquelle fuer den Game-Loop: Akkumulator fuer feste Physikschritte,
 * variable Delta-Zeit fuers Rendern.
 */
export class Time {
  /** Delta des letzten Frames in Sekunden (variabel, geclamped). */
  frameDelta = 0;
  /** Simulierte Gesamtzeit in Sekunden. */
  elapsed = 0;
  /** Restanteil im Akkumulator, 0..1 — fuer Render-Interpolation. */
  alpha = 0;

  private last = performance.now() / 1000;
  private accumulator = 0;

  /**
   * Fuehrt fuer die vergangene Realzeit so viele feste Schritte aus, wie
   * anstehen. Rueckgabe: variable Delta-Zeit fuers Rendern.
   */
  tick(fixedStep: (dt: number) => void): number {
    const now = performance.now() / 1000;
    const delta = Math.min(now - this.last, MAX_FRAME_TIME);
    this.last = now;
    this.frameDelta = delta;

    this.accumulator += delta;
    while (this.accumulator >= FIXED_DT) {
      this.accumulator -= FIXED_DT;
      this.elapsed += FIXED_DT;
      fixedStep(FIXED_DT);
    }
    this.alpha = this.accumulator / FIXED_DT;
    return delta;
  }
}
