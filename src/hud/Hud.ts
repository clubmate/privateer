import { HULL_WARN, MODE_LABEL, type HudState } from './HudState';
import './hud.css';

export type { HudState } from './HudState';

/** Anzeigemodus: sitzend (Flug) oder stehend (Gehen). */
export type HudMode = 'seated' | 'walking';

/**
 * Was vom DOM-Overlay uebrig ist.
 *
 * Die Instrumente sind in den Raum gewandert: Geschwindigkeit, Ziel, Kurs und
 * Huelle stehen auf den Cockpitschirmen (`CockpitDisplays`), Fadenkreuz und
 * Bahnmarken liegen als Projektion vor der Scheibe (`GlassHud`). Im DOM bleibt
 * nur, was kein Geraet im Schiff sein kann: Interaktions-Prompts,
 * Systemmeldungen, der Schadensblitz — und eine abschaltbare Hilfsanzeige.
 *
 * **H** schaltet die Hilfsanzeige um: dieselben Zahlen noch einmal flach ueber
 * dem Bild, fuer Spieler, die lieber ablesen als aus der Sitzposition zu
 * lesen. Standard ist aus.
 */

/** So lange leuchtet der Schadensrand nach einem Zusammenstoss, in Sekunden. */
const DAMAGE_FLASH_DURATION = 0.6;

export class Hud {
  readonly root: HTMLDivElement;

  private readonly helper: HTMLDivElement;
  private readonly damage: HTMLDivElement;
  private readonly prompt: HTMLDivElement;
  private readonly hint: HTMLDivElement;
  private readonly speedValue: HTMLSpanElement;
  private readonly setValue: HTMLSpanElement;
  private readonly barFill: HTMLDivElement;
  private readonly barSet: HTMLDivElement;
  private readonly hullValue: HTMLSpanElement;
  private readonly killsValue: HTMLSpanElement;
  private readonly targetValue: HTMLSpanElement;
  private readonly assistChip: HTMLSpanElement;
  private readonly burnChip: HTMLSpanElement;

  private mode: HudMode = 'seated';
  private helperOn = false;

  /** Letzte gesetzte Werte, um DOM-Schreiben zu sparen. */
  private lastSpeed = -1;
  private lastSet = -1;
  private lastMode = '';
  private lastKills = -1;
  private lastHull = -1;
  private lastTarget = '';
  private lastBurn: boolean | null = null;
  private lastLocked: boolean | null = null;
  private lastDamage = -1;

  constructor(parent: HTMLElement = document.body) {
    this.root = document.createElement('div');
    this.root.className = 'hud';
    this.root.innerHTML = `
      <div class="hud__helper" hidden>
        <div class="hud__panel">
          <div class="hud__row">
            <span class="hud__label">SPD</span>
            <span class="hud__value hud__value--big" data-speed>0 M/S</span>
          </div>
          <div class="hud__row">
            <span class="hud__label">SET</span>
            <span class="hud__value" data-set>0 M/S</span>
          </div>
          <div class="hud__bar">
            <div class="hud__bar-fill" data-fill></div>
            <div class="hud__bar-set" data-setmark></div>
          </div>
          <div class="hud__row">
            <span class="hud__label">HUELLE</span>
            <span class="hud__value" data-hull>100%</span>
          </div>
          <div class="hud__row">
            <span class="hud__label">ZIEL</span>
            <span class="hud__value" data-target>--</span>
          </div>
          <div class="hud__row">
            <span class="hud__label">KILLS</span>
            <span class="hud__value" data-kills>0</span>
          </div>
        </div>
        <div class="hud__status">
          <span class="hud__chip is-on" data-assist>ARCADE</span>
          <span class="hud__chip" data-burn>AB</span>
        </div>
      </div>

      <div class="hud__keys hud__keys--flight">MAUS/LEER&nbsp;FEUERN &middot; T&nbsp;ZIEL &middot; R&nbsp;SCAN &middot; M&nbsp;FOERDERN &middot; W/S&nbsp;SET&nbsp;SPEED &middot; Q/E&nbsp;ROLL &middot; A/D&nbsp;STRAFE &middot; SHIFT/CTRL&nbsp;LIFT &middot; X&nbsp;FULL&nbsp;STOP &middot; TAB&nbsp;BURN &middot; V&nbsp;FLUGMODUS &middot; G&nbsp;ANDOCKEN &middot; L&nbsp;LANDEN &middot; C&nbsp;AUSSENANSICHT &middot; H&nbsp;HILFSANZEIGE &middot; ESC&nbsp;MENUE&nbsp;ZU &middot; F&nbsp;AUFSTEHEN</div>
      <div class="hud__keys hud__keys--walk">W/A/S/D&nbsp;GEHEN &middot; MAUS&nbsp;UMSEHEN &middot; F&nbsp;HINSETZEN,&nbsp;REPARIEREN,&nbsp;WERKZEUG,&nbsp;FRACHT &middot; ESC&nbsp;PANEL&nbsp;ZU</div>
      <div class="hud__damage"></div>
      <div class="hud__prompt" hidden></div>
      <div class="hud__hint" hidden>KLICKEN ZUM STEUERN</div>
    `;
    parent.appendChild(this.root);

    this.helper = this.require('.hud__helper');
    this.damage = this.require('.hud__damage');
    this.prompt = this.require('.hud__prompt');
    this.hint = this.require('.hud__hint');
    this.speedValue = this.require('[data-speed]');
    this.setValue = this.require('[data-set]');
    this.barFill = this.require('[data-fill]');
    this.barSet = this.require('[data-setmark]');
    this.hullValue = this.require('[data-hull]');
    this.killsValue = this.require('[data-kills]');
    this.targetValue = this.require('[data-target]');
    this.assistChip = this.require('[data-assist]');
    this.burnChip = this.require('[data-burn]');

    // Eigener Lauscher statt einer Abfrage in main.ts: die Taste betrifft nur
    // das HUD, und die Einhaengestelle im Spiel bleibt so klein wie moeglich.
    window.addEventListener('keydown', this.onKeyDown);
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    this.root.remove();
  }

  // ------------------------------------------------------------------- API

  /**
   * Anzeigemodus umschalten. Beim Gehen bleibt die Hilfsanzeige aus — die
   * Flugwerte stehen dann auf dem Schirm im Gang.
   */
  setMode(mode: HudMode): void {
    if (this.mode === mode) return;
    this.mode = mode;
    this.root.classList.toggle('hud--walking', mode === 'walking');
    this.applyHelper();
  }

  getMode(): HudMode {
    return this.mode;
  }

  /** Interaktions-Prompt einblenden, z. B. "F — Aufstehen". */
  showPrompt(text: string): void {
    if (this.prompt.textContent !== text) this.prompt.textContent = text;
    // Auch `hidden` nur bei echtem Wechsel: `PlayerState` ruft das je Bild,
    // solange der Spieler sitzt, und jede Zuweisung stoesst den Browser in
    // Layout und Neuzeichnung. Es war die einzige ungeprueft geschriebene
    // DOM-Eigenschaft im Flugbetrieb.
    if (this.prompt.hidden) this.prompt.hidden = false;
  }

  hidePrompt(): void {
    if (!this.prompt.hidden) this.prompt.hidden = true;
  }

  /** Flache Hilfsanzeige (H). */
  setHelperVisible(visible: boolean): void {
    this.helperOn = visible;
    this.applyHelper();
  }

  isHelperVisible(): boolean {
    return this.helperOn;
  }

  // ---------------------------------------------------------------- Update

  update(state: HudState): void {
    // Roter Rand direkt nach einem Zusammenstoss; klingt weich aus. Das ist
    // kein Instrument, sondern der Schreck — der bleibt im DOM.
    const damage = Math.max(0, 1 - state.sinceImpact / DAMAGE_FLASH_DURATION);
    if (Math.abs(damage - this.lastDamage) > 0.01) {
      this.lastDamage = damage;
      this.damage.style.opacity = damage.toFixed(3);
    }

    if (this.lastLocked !== state.pointerLocked) {
      this.lastLocked = state.pointerLocked;
      this.hint.hidden = state.pointerLocked;
    }

    if (this.helperOn && this.mode === 'seated') this.updateHelper(state);
  }

  private updateHelper(state: HudState): void {
    const speed = Math.round(state.speed);
    if (speed !== this.lastSpeed) {
      this.lastSpeed = speed;
      this.speedValue.textContent = `${speed} M/S`;
      const pct = Math.min(state.speed / Math.max(state.maxSetSpeed, 1), 1) * 100;
      this.barFill.style.width = `${pct.toFixed(1)}%`;
    }

    const set = Math.round(state.setSpeed);
    if (set !== this.lastSet) {
      this.lastSet = set;
      this.setValue.textContent = `${set} M/S`;
      const pct = (set / Math.max(state.maxSetSpeed, 1)) * 100;
      this.barSet.style.left = `${pct.toFixed(1)}%`;
    }

    const mode = state.fullStop ? 'FULL STOP' : MODE_LABEL[state.mode];
    if (mode !== this.lastMode) {
      this.lastMode = mode;
      this.assistChip.textContent = mode;
      this.assistChip.classList.toggle('is-on', !state.fullStop && state.mode !== 'newton');
      this.assistChip.classList.toggle('is-warn', state.fullStop);
    }

    const hull = Math.round(state.hull * 100);
    if (hull !== this.lastHull) {
      this.lastHull = hull;
      this.hullValue.textContent = `${hull}%`;
      this.hullValue.classList.toggle('is-warn', state.hull < HULL_WARN);
    }

    if (state.kills !== this.lastKills) {
      this.lastKills = state.kills;
      this.killsValue.textContent = `${state.kills}`;
    }

    const target = state.target;
    const targetText = !target
      ? '--'
      : `${target.distance >= 1000
          ? `${(target.distance / 1000).toFixed(2)} KM`
          : `${Math.round(target.distance)} M`} · ${Math.round(target.integrity * 100)}%`;
    if (targetText !== this.lastTarget) {
      this.lastTarget = targetText;
      this.targetValue.textContent = targetText;
    }

    if (state.afterburner !== this.lastBurn) {
      this.lastBurn = state.afterburner;
      this.burnChip.textContent = state.afterburner ? 'AFTERBURNER' : 'AB';
      this.burnChip.classList.toggle('is-warn', state.afterburner);
    }
  }

  // ------------------------------------------------------------------ intern

  private applyHelper(): void {
    this.helper.hidden = !this.helperOn || this.mode === 'walking';
    // Nach dem Einblenden alle Werte einmal neu schreiben lassen.
    if (!this.helper.hidden) {
      this.lastSpeed = -1;
      this.lastSet = -1;
      this.lastMode = '';
      this.lastKills = -1;
      this.lastHull = -1;
      this.lastTarget = '';
      this.lastBurn = null;
    }
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (event.code !== 'KeyH' || event.repeat) return;
    this.setHelperVisible(!this.helperOn);
  };

  private require<T extends HTMLElement>(selector: string): T {
    const el = this.root.querySelector<T>(selector);
    if (!el) throw new Error(`HUD: Element "${selector}" fehlt`);
    return el;
  }
}
