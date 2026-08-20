import { GOODS, isGoodId, type GoodId } from './CargoGoods';

/**
 * Zustand des Laderaums: was liegt drin, was hat es gekostet, wie viel Platz
 * ist noch frei.
 *
 * Reine Logik, kein Three.js — die Sichtbarmachung im Frachtraum haengt an
 * {@link CargoHold.onChange} und nicht andersherum. Genauso haengt sich ein
 * Handelsmenue an: `getCredits`/`getCapacity`/`getManifest`/`buy`/`sell` sind
 * absichtlich genau die Handvoll Methoden, die ein Kaufdialog braucht.
 */

/** Tragfaehigkeit des Frachtraums in Tonnen. */
export const DEFAULT_CAPACITY = 40;

/** Startguthaben in Credits. */
export const DEFAULT_CREDITS = 2400;

/** Leermasse des Schiffs in kg (ohne Ladung), siehe FlightModel-Vorgabe. */
export const EMPTY_SHIP_MASS = 15_000;

/**
 * Alles unter einem Kilogramm ist kein Posten mehr. Ohne diese Grenze bleibt
 * nach einer Reihe von Teilverkaeufen ein Rest wie 1e-14 t stehen, und der
 * Frachtraum zeigt eine Kiste "Erz" an, die es nicht mehr gibt.
 */
const TON_EPSILON = 1e-3;

/**
 * Fliesskommarauschen wegschneiden — auf ein Gramm genau, nicht auf ein Kilo:
 * ein grobes Raster wuerde bei jedem Teilverkauf in dieselbe Richtung runden
 * und den Bestand langsam nach oben treiben.
 */
function cleanTons(tons: number): number {
  return Math.round(tons * 1e6) / 1e6;
}

/** Ein Posten im Frachtmanifest. */
export interface CargoLot {
  readonly good: GoodId;
  /** Tonnage an Bord. */
  readonly tons: number;
  /** Mengengewichteter Einkaufspreis je Tonne in Credits. */
  readonly avgPrice: number;
}

/** Fehler, dessen Text so im HUD stehen darf. */
export class CargoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CargoError';
  }
}

export interface CargoHoldOptions {
  capacity?: number;
  credits?: number;
}

interface Entry {
  tons: number;
  /** Summe der bezahlten Credits — daraus faellt der Durchschnittspreis. */
  spent: number;
}

export class CargoHold {
  private readonly capacity: number;
  private credits: number;
  /** Einfuegereihenfolge bleibt erhalten: das Manifest soll nicht springen. */
  private readonly entries = new Map<GoodId, Entry>();
  private readonly listeners = new Set<() => void>();

  constructor(options: CargoHoldOptions = {}) {
    this.capacity = options.capacity ?? DEFAULT_CAPACITY;
    this.credits = options.credits ?? DEFAULT_CREDITS;
  }

  // ------------------------------------------------------------- Abfragen

  /** Tragfaehigkeit in Tonnen. */
  getCapacity(): number {
    return this.capacity;
  }

  /** Belegte Tonnage. */
  getUsedCapacity(): number {
    let sum = 0;
    for (const entry of this.entries.values()) sum += entry.tons;
    return cleanTons(sum);
  }

  /** Freie Tonnage. */
  getFreeCapacity(): number {
    return cleanTons(this.capacity - this.getUsedCapacity());
  }

  /** Tonnage einer Warenart. */
  getTons(good: GoodId): number {
    return this.entries.get(good)?.tons ?? 0;
  }

  /** Mengengewichteter Einkaufspreis je Tonne; 0, wenn nichts an Bord ist. */
  getAveragePrice(good: GoodId): number {
    const entry = this.entries.get(good);
    if (!entry || entry.tons <= 0) return 0;
    return entry.spent / entry.tons;
  }

  /** Alle Posten in Ladereihenfolge. Leere Posten kommen nicht vor. */
  getManifest(): readonly CargoLot[] {
    const lots: CargoLot[] = [];
    for (const [good, entry] of this.entries) {
      if (entry.tons <= 0) continue;
      lots.push({ good, tons: entry.tons, avgPrice: entry.spent / entry.tons });
    }
    return lots;
  }

  getCredits(): number {
    return this.credits;
  }

  /** Was die Ladung im Einkauf gekostet hat, in Credits. */
  getPurchaseValue(): number {
    let sum = 0;
    for (const entry of this.entries.values()) sum += entry.spent;
    return sum;
  }

  /** Masse der Ladung in kg. */
  getCargoMass(): number {
    return this.getUsedCapacity() * 1000;
  }

  /** Gesamtmasse des Schiffs in kg — das, was das Flugmodell spuert. */
  getShipMass(emptyMass: number = EMPTY_SHIP_MASS): number {
    return emptyMass + this.getCargoMass();
  }

  /** Anteil der belegten Kapazitaet, 0..1. */
  getLoadFactor(): number {
    return this.capacity > 0 ? this.getUsedCapacity() / this.capacity : 0;
  }

  // ------------------------------------------------------------ Pruefungen

  /**
   * Grund, warum `tons` dieser Ware **nicht** an Bord passen — oder `null`,
   * wenn sie passen. Der Text ist zur Anzeige gedacht.
   */
  checkAdd(good: GoodId, tons: number): string | null {
    if (!isGoodId(good)) return `Unbekannte Ware "${good}"`;
    if (!Number.isFinite(tons) || tons <= 0) return 'Menge muss groesser als 0 sein';
    const free = this.getFreeCapacity();
    if (tons > free + TON_EPSILON) {
      return `Laderaum voll: noch ${formatTons(free)} t frei, ${formatTons(tons)} t angefordert`;
    }
    return null;
  }

  canAdd(good: GoodId, tons: number): boolean {
    return this.checkAdd(good, tons) === null;
  }

  /** Grund, warum sich `tons` **nicht** abladen lassen — oder `null`. */
  checkRemove(good: GoodId, tons: number): string | null {
    if (!isGoodId(good)) return `Unbekannte Ware "${good}"`;
    if (!Number.isFinite(tons) || tons <= 0) return 'Menge muss groesser als 0 sein';
    const have = this.getTons(good);
    if (tons > have + TON_EPSILON) {
      const name = GOODS[good].name;
      return `Nur ${formatTons(have)} t ${name} an Bord, ${formatTons(tons)} t angefordert`;
    }
    return null;
  }

  canRemove(good: GoodId, tons: number): boolean {
    return this.checkRemove(good, tons) === null;
  }

  // ------------------------------------------------------------ Operationen

  /**
   * Ware laden. `pricePerTon` wandert in den Durchschnittspreis des Postens
   * (fuer die Manifestanzeige); Credits ruehrt `add` nicht an — dafuer ist
   * {@link buy} da.
   */
  add(good: GoodId, tons: number, pricePerTon: number = GOODS[good]?.basePrice ?? 0): void {
    const problem = this.checkAdd(good, tons);
    if (problem) throw new CargoError(problem);

    const entry = this.entries.get(good) ?? { tons: 0, spent: 0 };
    entry.tons = cleanTons(entry.tons + tons);
    entry.spent += tons * pricePerTon;
    this.entries.set(good, entry);
    this.emit();
  }

  /** Ware abladen. Gibt ab, was tatsaechlich vom Posten verschwunden ist. */
  remove(good: GoodId, tons: number): number {
    const problem = this.checkRemove(good, tons);
    if (problem) throw new CargoError(problem);

    const entry = this.entries.get(good);
    if (!entry) return 0;

    // Anteilig auch die Einstandskosten abziehen, damit der Durchschnittspreis
    // eines Restpostens derselbe bleibt wie vor dem Teilverkauf.
    const taken = Math.min(tons, entry.tons);
    const share = taken / entry.tons;
    entry.spent -= entry.spent * share;
    entry.tons = cleanTons(entry.tons - taken);
    if (entry.tons < TON_EPSILON) this.entries.delete(good);
    this.emit();
    return taken;
  }

  /**
   * Kaufen: prueft Kapazitaet **und** Guthaben, bucht beides. Genau das, was
   * ein Handelsmenue an der Station braucht.
   */
  buy(good: GoodId, tons: number, pricePerTon: number = GOODS[good]?.basePrice ?? 0): number {
    const problem = this.checkAdd(good, tons);
    if (problem) throw new CargoError(problem);
    const cost = tons * pricePerTon;
    if (cost > this.credits) {
      throw new CargoError(
        `Zu wenig Guthaben: ${Math.round(cost)} Cr noetig, ${Math.round(this.credits)} Cr vorhanden`,
      );
    }
    this.credits -= cost;
    this.add(good, tons, pricePerTon);
    return cost;
  }

  /** Verkaufen: laedt ab und schreibt den Erloes gut. Gibt den Erloes zurueck. */
  sell(good: GoodId, tons: number, pricePerTon: number = GOODS[good]?.basePrice ?? 0): number {
    const problem = this.checkRemove(good, tons);
    if (problem) throw new CargoError(problem);
    const taken = this.remove(good, tons);
    const proceeds = taken * pricePerTon;
    this.credits += proceeds;
    return proceeds;
  }

  setCredits(value: number): void {
    this.credits = value;
    this.emit();
  }

  addCredits(delta: number): void {
    this.credits += delta;
    this.emit();
  }

  /** Laderaum leeren (Debug, Spielstart). */
  clear(): void {
    if (this.entries.size === 0) return;
    this.entries.clear();
    this.emit();
  }

  // ------------------------------------------------------------- Ereignis

  /**
   * Benachrichtigung bei jeder Aenderung des Manifests oder des Guthabens.
   * Gibt die Abmeldefunktion zurueck.
   */
  onChange(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit(): void {
    for (const listener of this.listeners) listener();
  }
}

/** Tonnage fuer Anzeige und Fehlertexte: hoechstens eine Nachkommastelle. */
export function formatTons(tons: number): string {
  const rounded = Math.round(tons * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}
