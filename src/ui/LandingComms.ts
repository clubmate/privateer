import type { LandingState } from '../world/Landing';
import './landing.css';

/**
 * Meldungen des Landeautopiloten: eine Meldezeile und der Fortschritt des
 * laufenden Manoevers.
 *
 * Aufgebaut wie {@link ../ui/DockingComms}, aber bewusst als eigenes Element:
 * die Andockmeldungen kommen von der Station, diese hier vom eigenen
 * Bordrechner — und beide koennen im Grenzfall gleichzeitig etwas zu sagen
 * haben.
 */

export interface LandingCommsState {
  state: LandingState;
  /** Fortschritt 0..1 des Sink- oder Steigflugs. */
  progress: number;
  /** Hoehe ueber Grund in m. */
  altitude: number;
  speed: number;
  /** Steht die letzte Meldung noch? */
  showMessage: boolean;
}

const MANOEUVRE_LABEL: Partial<Record<LandingState, string>> = {
  cleared: 'LANDEFREIGABE',
  descending: 'SINKFLUG',
  landed: 'AUFGESETZT',
  ascending: 'ABHEBEN',
};

export class LandingComms {
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
    this.root.className = 'lndcomms';

    this.line = document.createElement('div');
    this.line.className = 'lndcomms__line';
    this.line.hidden = true;

    this.progress = document.createElement('div');
    this.progress.className = 'lndcomms__progress';
    this.progress.hidden = true;

    const row = document.createElement('div');
    row.className = 'lndcomms__progress-row';
    this.progressLabel = document.createElement('span');
    this.progressValue = document.createElement('span');
    row.append(this.progressLabel, this.progressValue);

    const bar = document.createElement('div');
    bar.className = 'lndcomms__progress-bar';
    this.progressFill = document.createElement('i');
    bar.append(this.progressFill);

    this.progress.append(row, bar);
    this.root.append(this.line, this.progress);
    parent.append(this.root);
  }

  /** Meldung setzen. `good = false` faerbt sie als Absage. */
  showMessage(text: string, good: boolean): void {
    this.line.textContent = text;
    this.line.classList.toggle('is-bad', !good);
    this.line.hidden = false;
    this.lastText = text;
  }

  update(state: LandingCommsState): void {
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

    // Waehrend `cleared` fliegt der Pilot noch selbst, und aufgesetzt gibt es
    // keinen Fortschritt mehr — dann zaehlt die Hoehe ueber Grund.
    const value =
      state.state === 'cleared'
        ? `${Math.round(state.altitude)} M · ${Math.round(state.speed)} M/S`
        : state.state === 'landed'
          ? 'L — ABHEBEN'
          : `${Math.round(state.progress * 100)} %`;
    if (value !== this.lastValue) {
      this.progressValue.textContent = value;
      this.lastValue = value;
    }

    const fill = state.state === 'cleared' ? 0 : state.state === 'landed' ? 1 : state.progress;
    this.progressFill.style.width = `${(fill * 100).toFixed(1)}%`;
  }

  dispose(): void {
    this.root.remove();
  }
}
