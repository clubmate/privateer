import type { StationInfo } from '../world/Station';
import type { StationTrade, TradeResult } from '../world/StationTrade';
// Gefoerderte Mengen sind krumm: 12,401934 T liest sich wie ein Messfehler.
import { formatTons } from '../cargo/CargoHold';
import './station.css';

/**
 * Stationsmenue: Reparatur, Versorgung, Handel, Ablegen.
 *
 * Das Menue kennt nur die {@link StationTrade}-Schnittstelle — es weiss nicht,
 * ob dahinter die Attrappe oder der echte Laderaum haengt. Aufgebaut wird das
 * DOM einmal; {@link refresh} schreibt danach nur noch geaenderte Werte, weil
 * es in jedem Frame laeuft, solange das Menue offen ist.
 */

/** Handelsmengen, zwischen denen der Spieler umschaltet. */
const AMOUNTS = [1, 5, 25] as const;

interface GoodRow {
  buyPrice: HTMLTableCellElement;
  sellPrice: HTMLTableCellElement;
  stock: HTMLTableCellElement;
  onboard: HTMLTableCellElement;
  buy: HTMLButtonElement;
  sell: HTMLButtonElement;
}

interface ServiceRow {
  root: HTMLDivElement;
  name: HTMLSpanElement;
  price: HTMLSpanElement;
  bar: HTMLDivElement;
  fill: HTMLElement;
  button: HTMLButtonElement;
}

export interface StationPanelDeps {
  trade: StationTrade;
  info: StationInfo;
  /** Ablegen ausloesen; liefert `false`, wenn das gerade nicht geht. */
  onUndock: () => boolean;
  /** Nach dem Schliessen — der Aufrufer holt sich den Zeiger zurueck. */
  onClose: () => void;
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function setText(node: HTMLElement, value: string): void {
  if (node.textContent !== value) node.textContent = value;
}

function setDisabled(button: HTMLButtonElement, disabled: boolean): void {
  if (button.disabled !== disabled) button.disabled = disabled;
}

function credits(value: number): string {
  return value.toLocaleString('de-DE');
}

export class StationPanel {
  private readonly trade: StationTrade;
  private readonly deps: StationPanelDeps;

  private readonly root: HTMLDivElement;
  private readonly creditsValue: HTMLElement;
  private readonly services: HTMLDivElement;
  private readonly tbody: HTMLTableSectionElement;
  private readonly holdValue: HTMLElement;
  private readonly holdFill: HTMLElement;
  private readonly manifest: HTMLElement;
  private readonly status: HTMLElement;
  private readonly amountButtons: HTMLButtonElement[] = [];

  private readonly goodRows = new Map<string, GoodRow>();
  private readonly serviceRows = new Map<string, ServiceRow>();

  private amount: number = AMOUNTS[0];
  private open_ = false;

  constructor(deps: StationPanelDeps, parent: HTMLElement = document.body) {
    this.deps = deps;
    this.trade = deps.trade;

    this.root = el('div', 'stn');
    this.root.hidden = true;

    const frame = el('div', 'stn__frame');
    this.root.append(frame);

    // ------------------------------------------------------------- Kopf
    const head = el('header', 'stn__head');
    head.append(
      el('div', 'stn__title', deps.info.name),
      el('div', 'stn__sub', `SEKTOR ${deps.info.sector} · ANDOCKBUCHT ${deps.info.bay}`),
    );
    const creditsBox = el('div', 'stn__credits');
    creditsBox.append(el('span', undefined, 'CREDITS'));
    this.creditsValue = el('b', undefined, '0');
    creditsBox.append(this.creditsValue);
    head.append(creditsBox);
    frame.append(head);

    // ------------------------------------------------------------ Koerper
    const body = el('div', 'stn__body');
    frame.append(body);

    const serviceSection = el('section', 'stn__section');
    serviceSection.append(el('div', 'stn__legend', 'WERFT UND VERSORGUNG'));
    this.services = el('div', 'stn__services');
    serviceSection.append(this.services);
    body.append(serviceSection);

    const tradeSection = el('section', 'stn__section');
    tradeSection.append(el('div', 'stn__legend', 'WARENBOERSE'));
    tradeSection.append(this.buildAmountSelector());

    const table = el('table', 'stn__table');
    const thead = el('thead');
    const headRow = el('tr');
    for (const label of ['WARE', 'KAUF', 'VERKAUF', 'VORRAT', 'AN BORD', '']) {
      headRow.append(el('th', undefined, label));
    }
    thead.append(headRow);
    this.tbody = el('tbody');
    table.append(thead, this.tbody);
    tradeSection.append(table);
    body.append(tradeSection);

    // ------------------------------------------------------------- Fuss
    const foot = el('footer', 'stn__foot');

    const hold = el('div', 'stn__hold');
    this.holdValue = el('b', undefined, '0 / 0 T');
    const holdLabel = el('div');
    holdLabel.append(document.createTextNode('LADERAUM  '), this.holdValue);
    const holdBar = el('div', 'stn__bar');
    this.holdFill = el('i');
    holdBar.append(this.holdFill);
    this.manifest = el('div', undefined, '');
    hold.append(holdLabel, holdBar, this.manifest);

    this.status = el('div', 'stn__status', '');

    const actions = el('div', 'stn__actions');
    const undock = el('button', 'stn__primary', 'ABLEGEN [G]');
    undock.type = 'button';
    undock.addEventListener('click', () => {
      if (this.deps.onUndock()) this.close();
      else this.setStatus({ ok: false, message: 'ABLEGEN NICHT MOEGLICH' });
    });
    const close = el('button', undefined, 'SCHLIESSEN [ESC]');
    close.type = 'button';
    close.addEventListener('click', () => this.close());
    actions.append(undock, close);

    foot.append(hold, this.status, actions);
    frame.append(foot);

    parent.append(this.root);
    window.addEventListener('keydown', this.onKeyDown);
  }

  get isOpen(): boolean {
    return this.open_;
  }

  open(): void {
    if (this.open_) return;
    this.open_ = true;
    this.root.hidden = false;
    this.setStatus({ ok: true, message: 'KLAMMERN VERRIEGELT' });
    this.refresh();
  }

  close(): void {
    if (!this.open_) return;
    this.open_ = false;
    this.root.hidden = true;
    this.deps.onClose();
  }

  /** Werte nachziehen. Laeuft jeden Frame, schreibt aber nur Geaendertes. */
  refresh(): void {
    setText(this.creditsValue, credits(this.trade.getCredits()));
    this.refreshServices();
    this.refreshGoods();
    this.refreshHold();
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    this.root.remove();
  }

  // ---------------------------------------------------------------- Aufbau

  private buildAmountSelector(): HTMLElement {
    const row = el('div', 'stn__amounts');
    row.append(el('span', undefined, 'MENGE'));
    for (const value of AMOUNTS) {
      const button = el('button', 'stn__mini', `${value} T`);
      button.type = 'button';
      button.addEventListener('click', () => {
        this.amount = value;
        for (const other of this.amountButtons) {
          other.classList.toggle('is-active', other === button);
        }
      });
      button.classList.toggle('is-active', value === this.amount);
      this.amountButtons.push(button);
      row.append(button);
    }
    return row;
  }

  private buildServiceRow(id: string): ServiceRow {
    const root = el('div', 'stn__service');
    const name = el('span', 'stn__service-name', '');
    const price = el('span', 'stn__service-price', '');
    const bar = el('div', 'stn__bar');
    const fill = el('i');
    bar.append(fill);
    const button = el('button', undefined, '');
    button.type = 'button';
    button.addEventListener('click', () => this.setStatus(this.trade.useService(id)));

    root.append(name, price, bar, button);
    this.services.append(root);
    return { root, name, price, bar, fill, button };
  }

  private buildGoodRow(id: string, name: string): GoodRow {
    const tr = el('tr');
    tr.append(el('td', 'stn__good', name));
    const buyPrice = el('td');
    const sellPrice = el('td');
    const stock = el('td');
    const onboard = el('td', 'stn__onboard');
    const actions = el('td');

    const buy = el('button', 'stn__mini', 'KAUFEN');
    buy.type = 'button';
    buy.addEventListener('click', () => this.setStatus(this.trade.buy(id, this.amount)));
    const sell = el('button', 'stn__mini', 'VERKAUFEN');
    sell.type = 'button';
    // Aus dem Bergbau kommen krumme Mengen. Wer 25 T waehlt und 12,4 T an
    // Bord hat, will die 12,4 loswerden — nicht sechsmal auf kleinere Knoepfe
    // klicken.
    sell.addEventListener('click', () => {
      const held = this.heldTons(id);
      this.setStatus(this.trade.sell(id, Math.min(this.amount, Math.floor(held))));
    });
    actions.append(buy, sell);

    tr.append(buyPrice, sellPrice, stock, onboard, actions);
    this.tbody.append(tr);
    return { buyPrice, sellPrice, stock, onboard, buy, sell };
  }

  // -------------------------------------------------------------- Nachziehen

  private refreshServices(): void {
    const purse = this.trade.getCredits();
    for (const service of this.trade.getServices()) {
      let row = this.serviceRows.get(service.id);
      if (!row) {
        row = this.buildServiceRow(service.id);
        this.serviceRows.set(service.id, row);
      }
      const percent = Math.round(service.level * 100);
      setText(row.name, `${service.name}  ${percent} %`);
      setText(row.price, service.level >= 1 ? 'VOLL' : `${credits(service.price)} CR`);
      row.fill.style.width = `${percent}%`;
      row.bar.classList.toggle('is-low', service.level < 0.35);
      setText(row.button, service.action);
      setDisabled(row.button, service.level >= 1 || service.price > purse);
    }
  }

  /** Tonnen dieser Ware an Bord. */
  private heldTons(id: string): number {
    return this.trade.getManifest().find((e) => e.id === id)?.tons ?? 0;
  }

  private refreshGoods(): void {
    const purse = this.trade.getCredits();
    const capacity = this.trade.getCapacity();
    const free = capacity.total - capacity.used;
    const onboard = new Map(this.trade.getManifest().map((e) => [e.id, e.tons]));

    for (const good of this.trade.getGoods()) {
      let row = this.goodRows.get(good.id);
      if (!row) {
        row = this.buildGoodRow(good.id, good.name);
        this.goodRows.set(good.id, row);
      }
      const held = onboard.get(good.id) ?? 0;
      setText(row.buyPrice, credits(good.buyPrice));
      setText(row.sellPrice, credits(good.sellPrice));
      setText(row.stock, `${good.stock} T`);
      setText(row.onboard, `${formatTons(held)} T`);
      row.onboard.classList.toggle('is-zero', held === 0);

      setDisabled(
        row.buy,
        good.stock < this.amount ||
          free < this.amount ||
          good.buyPrice * this.amount > purse,
      );
      setDisabled(row.sell, held < 1);
    }
  }

  private refreshHold(): void {
    const { used, total } = this.trade.getCapacity();
    setText(this.holdValue, `${formatTons(used)} / ${total} T`);
    this.holdFill.style.width = `${total > 0 ? (used / total) * 100 : 0}%`;

    const entries = this.trade.getManifest();
    const text = entries.length
      ? entries.map((e) => `${formatTons(e.tons)} T ${e.name}`).join('  ·  ')
      : 'LEER';
    setText(this.manifest, text);
  }

  private setStatus(result: TradeResult): void {
    setText(this.status, result.message);
    this.status.classList.toggle('is-bad', !result.ok);
    this.status.classList.toggle('is-good', result.ok);
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (!this.open_ || event.code !== 'Escape') return;
    event.preventDefault();
    this.close();
  };
}
