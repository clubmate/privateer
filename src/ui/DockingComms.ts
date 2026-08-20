import type { DockingState } from '../world/Docking';
import './station.css';

/**
 * Funkverkehr mit der Andockkontrolle: eine Meldezeile und der Fortschritt des
 * laufenden Manoevers, beides oben mittig.
 *
 * Bewusst getrennt vom Cockpit-HUD — die Meldungen kommen von aussen, nicht
 * von der eigenen Bordelektronik, und das soll man auch sehen.
 */

export interface CommsState {
  state: DockingState;
  /** Fortschritt 0..1 des An- oder Ablegens. */
  progress: number;
  distance: number;
  speed: number;
  /** Steht die letzte Meldung noch? */
  showMessage: boolean;
}

const MANOEUVRE_LABEL: Partial<Record<DockingState, string>> = {
  cleared: 'FREIGABE ERTEILT',
  docking: 'ANDOCKMANOEVER',
  undocking: 'ABLEGEMANOEVER',
};

export class DockingComms {
  private readonly root: HTMLDivElement;
  private readonly line: HTMLDivElement;
  private readonly progress: HTMLDivElement;
  private readonly progressLabel: HTMLSpanElement;
  private readonly progressValue: HTMLSpanElement;
  private readonly progressFill: HTMLElement;

  private lastText = '';
  private lastValue = '';

  constructor(parent: HTMLElement = document.body) {
    this.root = document.createElement('div');
    this.root.className = 'stncomms';

    this.line = document.createElement('div');
    this.line.className = 'stncomms__line';
    this.line.hidden = true;

    this.progress = document.createElement('div');
    this.progress.className = 'stncomms__progress';
    this.progress.hidden = true;

    const row = document.createElement('div');
    row.className = 'stncomms__progress-row';
    this.progressLabel = document.createElement('span');
    this.progressValue = document.createElement('span');
    row.append(this.progressLabel, this.progressValue);

    const bar = document.createElement('div');
    bar.className = 'stncomms__progress-bar';
    this.progressFill = document.createElement('i');
    bar.append(this.progressFill);

    this.progress.append(row, bar);
    this.root.append(this.line, this.progress);
    parent.append(this.root);
  }

  /** Meldung der Station setzen. `good = false` faerbt sie als Ablehnung. */
  showMessage(text: string, good: boolean): void {
    this.line.textContent = text;
    this.line.classList.toggle('is-bad', !good);
    this.line.hidden = false;
    this.lastText = text;
  }

  update(state: CommsState): void {
    if (!state.showMessage && !this.line.hidden) {
      this.line.hidden = true;
      this.lastText = '';
    } else if (state.showMessage && this.line.hidden && this.lastText) {
      this.line.hidden = false;
    }

    const label = MANOEUVRE_LABEL[state.state];
    this.progress.hidden = label === undefined;
    if (label === undefined) return;

    this.progressLabel.textContent = label;

    // Waehrend `cleared` fliegt der Pilot noch selbst — dann zaehlt die
    // Entfernung, nicht ein Fortschritt, den es noch nicht gibt.
    const value =
      state.state === 'cleared'
        ? `${Math.round(state.distance)} M · ${Math.round(state.speed)} M/S`
        : `${Math.round(state.progress * 100)} %`;
    if (value !== this.lastValue) {
      this.progressValue.textContent = value;
      this.lastValue = value;
    }

    const fill = state.state === 'cleared' ? 0 : state.progress;
    this.progressFill.style.width = `${(fill * 100).toFixed(1)}%`;
  }

  dispose(): void {
    this.root.remove();
  }
}
