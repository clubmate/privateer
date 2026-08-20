import { GOODS } from './CargoGoods';
import { formatTons, type CargoHold } from './CargoHold';
import './cargo.css';

/**
 * Frachtmanifest als DOM-Overlay im Stil des Cockpit-HUD.
 *
 * Bewusst nur eine Anzeige und kein Handelsmenue: gekauft und verkauft wird an
 * der Station, hier steht nur, was an Bord ist. Geoeffnet wird es am
 * Kistenstapel im Laderaum (`KeyF` ueber das `Interactables`-Register),
 * geschlossen mit `Esc` oder erneutem `F`.
 */

/** Leermasse des Schiffs fuer die Massenzeile, in kg. */
const EMPTY_MASS_TONS = 15;

function element<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function credits(value: number): string {
  return `${Math.round(value).toLocaleString('de-DE')} Cr`;
}

export class CargoPanel {
  private readonly root = element('div', 'cargo');
  private readonly body = element('tbody');
  private readonly empty = element('div', 'cargo__empty', 'LADERAUM LEER');
  private readonly totals = element('div', 'cargo__totals');
  private readonly bar = element('div', 'cargo__bar');
  private readonly barFill = element('i');
  private readonly table = element('table', 'cargo__table');

  private open = false;
  private readonly unsubscribe: () => void;
  private readonly onKeyDown: (event: KeyboardEvent) => void;

  constructor(private readonly hold: CargoHold) {
    this.build();
    document.body.appendChild(this.root);

    // Waehrend das Panel offen ist, soll ein Verkauf sofort sichtbar sein.
    this.unsubscribe = this.hold.onChange(() => {
      if (this.open) this.render();
    });

    // Esc kommt nicht ueber den Input-Sampler: es beendet zugleich den
    // Pointer Lock, und dabei geht die Flanke im Spielframe verloren.
    this.onKeyDown = (event) => {
      if (event.code === 'Escape' && this.open) this.hide();
    };
    window.addEventListener('keydown', this.onKeyDown);
  }

  get isOpen(): boolean {
    return this.open;
  }

  show(): void {
    this.open = true;
    this.render();
    this.root.hidden = false;
  }

  hide(): void {
    this.open = false;
    this.root.hidden = true;
  }

  toggle(): void {
    if (this.open) this.hide();
    else this.show();
  }

  dispose(): void {
    this.unsubscribe();
    window.removeEventListener('keydown', this.onKeyDown);
    this.root.remove();
  }

  // ---------------------------------------------------------------- Aufbau

  private build(): void {
    this.root.hidden = true;

    const title = element('div', 'cargo__title');
    title.append(element('span', undefined, 'FRACHTMANIFEST'), element('span', undefined, 'LADERAUM'));

    const head = element('thead');
    const headRow = element('tr');
    for (const label of ['WARE', 'TONNEN', 'EK / T', 'WERT']) {
      headRow.appendChild(element('th', undefined, label));
    }
    head.appendChild(headRow);
    this.table.append(head, this.body);

    this.bar.appendChild(this.barFill);
    this.root.append(title, this.table, this.empty, this.totals, this.bar);
    this.root.appendChild(element('div', 'cargo__hint', 'F / ESC — SCHLIESSEN'));
  }

  private render(): void {
    const manifest = this.hold.getManifest();
    this.body.replaceChildren();

    for (const lot of manifest) {
      const good = GOODS[lot.good];
      const row = element('tr');

      const name = element('td');
      const chip = element('span', 'cargo__chip');
      chip.style.background = `#${good.color.toString(16).padStart(6, '0')}`;
      name.append(chip, document.createTextNode(`${good.name} (${good.code})`));

      row.append(
        name,
        element('td', undefined, formatTons(lot.tons)),
        // Einstandspreis 0 heisst selbst gefoerdert — „0 Cr" laese sich, als
        // waere die Ladung wertlos.
        element('td', undefined, lot.avgPrice > 0 ? credits(lot.avgPrice) : 'EIGEN'),
        element('td', undefined, lot.avgPrice > 0 ? credits(lot.avgPrice * lot.tons) : '—'),
      );
      this.body.appendChild(row);
    }

    const filled = manifest.length > 0;
    this.table.hidden = !filled;
    this.empty.hidden = filled;

    const used = this.hold.getUsedCapacity();
    const capacity = this.hold.getCapacity();
    const load = this.hold.getLoadFactor();

    this.totals.replaceChildren(
      this.line('BELEGT', `${formatTons(used)} / ${capacity} t`),
      this.line('FREI', `${formatTons(this.hold.getFreeCapacity())} t`),
      this.line('EINSTAND', credits(this.hold.getPurchaseValue())),
      this.line('GUTHABEN', credits(this.hold.getCredits())),
      this.line('MASSE', `${formatTons(EMPTY_MASS_TONS + used)} t`),
    );

    this.barFill.style.width = `${Math.min(load, 1) * 100}%`;
    this.bar.classList.toggle('is-full', load > 0.9);
  }

  private line(label: string, value: string): HTMLElement {
    const row = element('div', 'cargo__row');
    row.append(element('span', undefined, label), element('span', undefined, value));
    return row;
  }
}
