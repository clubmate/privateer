/**
 * Schnittstelle zwischen Stationsmenue und Bordwirtschaft.
 *
 * Das Menue (`ui/StationPanel.ts`) kennt weder Laderaum noch Huelle, sondern
 * nur diese sieben Methoden — der Laderaum entsteht in einem eigenen
 * Arbeitspaket und wird spaeter hier eingehaengt. Bis dahin liefert
 * {@link createStationTradeStub} eine vollstaendig funktionierende Attrappe,
 * die ihren Zustand selbst haelt.
 *
 * **Vertrag:**
 * - Alle Preise und Betraege sind ganze Credits, alle Mengen ganze Tonnen.
 * - Kein Aufruf wirft. Was nicht geht, kommt als `TradeResult` mit `ok: false`
 *   und einem Text zurueck, den das Menue unveraendert anzeigt (deutsch,
 *   Grossbuchstaben, ohne Umlaute).
 * - Die Getter duerfen jeden Frame gerufen werden und muessen billig sein.
 * - Die Listen aus {@link getGoods} und {@link getManifest} gelten als
 *   Momentaufnahme; das Menue haelt sie nicht ueber Frames hinweg fest.
 */
export interface StationTrade {
  /** Verfuegbare Credits des Spielers. */
  getCredits(): number;

  /** Belegter und gesamter Laderaum in Tonnen. */
  getCapacity(): CargoCapacity;

  /** Was gerade an Bord ist. Leere Posten tauchen nicht auf. */
  getManifest(): readonly ManifestEntry[];

  /** Was die Station handelt, mit ihren aktuellen Preisen. */
  getGoods(): readonly TradeGood[];

  /** `tons` Tonnen der Ware kaufen. */
  buy(goodId: string, tons: number): TradeResult;

  /** `tons` Tonnen der Ware verkaufen. */
  sell(goodId: string, tons: number): TradeResult;

  /**
   * Dienstleistungen der Station (Reparatur, Treibstoff, Munition). Bewusst
   * generisch: das Menue zeichnet fuer jeden Posten dieselbe Zeile mit Balken,
   * Preis und Knopf, und neue Dienste brauchen keine Menueaenderung.
   */
  getServices(): readonly StationService[];

  /** Dienst in Anspruch nehmen. */
  useService(serviceId: string): TradeResult;
}

export interface CargoCapacity {
  /** Belegt, in Tonnen. */
  used: number;
  /** Gesamt, in Tonnen. */
  total: number;
}

export interface ManifestEntry {
  /** Gleiche ID wie in {@link TradeGood}. */
  id: string;
  name: string;
  tons: number;
  /** Durchschnittlicher Einkaufspreis je Tonne — fuer die Gewinnanzeige. */
  averagePrice: number;
}

export interface TradeGood {
  id: string;
  /** Anzeigename, deutsch und in Grossbuchstaben. */
  name: string;
  /** Was die Station je Tonne verlangt. */
  buyPrice: number;
  /** Was die Station je Tonne zahlt (immer <= `buyPrice`). */
  sellPrice: number;
  /** Vorrat der Station in Tonnen; 0 = nichts zu kaufen. */
  stock: number;
}

export interface StationService {
  id: string;
  /** Anzeigename, z. B. `'HUELLE'`. */
  name: string;
  /** Fuellstand 0..1 fuer den Balken. */
  level: number;
  /** Preis fuer die vollstaendige Wiederherstellung, in Credits. */
  price: number;
  /** Beschriftung des Knopfes, z. B. `'REPARIEREN'`. */
  action: string;
}

export interface TradeResult {
  ok: boolean;
  /** Rueckmeldung fuer die Statuszeile des Menues. */
  message: string;
}

// --------------------------------------------------------------- Attrappe

export interface StationTradeStubOptions {
  credits: number;
  capacity: number;
  /** Huellenzustand 0..1 lesen; fehlt der Haken, fuehrt die Attrappe Buch. */
  getHull?: () => number;
  /** Huellenzustand 0..1 setzen. */
  setHull?: (value: number) => void;
}

/** Preis je Prozentpunkt Huelle. */
const REPAIR_PRICE_PER_PERCENT = 34;
/** Preis fuer eine volle Tankfuellung bzw. volle Magazine. */
const FUEL_FULL_PRICE = 620;
const AMMO_FULL_PRICE = 940;

/** Grundstock der Station. Preise mit Spanne — Kaufen kostet mehr als Verkaufen. */
const CATALOG: readonly TradeGood[] = [
  { id: 'ore', name: 'EISENERZ', buyPrice: 42, sellPrice: 31, stock: 180 },
  { id: 'water', name: 'WASSER', buyPrice: 18, sellPrice: 12, stock: 240 },
  { id: 'food', name: 'NAHRUNG', buyPrice: 65, sellPrice: 48, stock: 90 },
  { id: 'parts', name: 'ERSATZTEILE', buyPrice: 155, sellPrice: 118, stock: 46 },
  { id: 'meds', name: 'MEDIKAMENTE', buyPrice: 310, sellPrice: 244, stock: 18 },
  { id: 'lux', name: 'LUXUSGUETER', buyPrice: 780, sellPrice: 605, stock: 6 },
];

/**
 * Vollstaendig spielbare Attrappe: haelt Credits, Laderaum, Bestaende und
 * Fuellstaende selbst. Huelle kann sie ueber die Haken aus
 * {@link StationTradeStubOptions} an die echte Rumpfkollision durchreichen —
 * so repariert das Menue schon jetzt wirklich etwas.
 */
export function createStationTradeStub(
  options: Partial<StationTradeStubOptions> = {},
): StationTrade {
  let credits = options.credits ?? 4200;
  const total = options.capacity ?? 40;
  const goods = CATALOG.map((g) => ({ ...g }));
  const hold = new Map<string, { tons: number; averagePrice: number }>();
  let ownHull = 1;
  let fuel = 0.62;
  let ammo = 0.45;

  hold.set('water', { tons: 6, averagePrice: 16 });

  const getHull = options.getHull ?? (() => ownHull);
  const setHull =
    options.setHull ??
    ((value: number) => {
      ownHull = value;
    });

  function used(): number {
    let sum = 0;
    for (const entry of hold.values()) sum += entry.tons;
    return sum;
  }

  function find(id: string): TradeGood | undefined {
    return goods.find((g) => g.id === id);
  }

  /** Preis fuer das Auffuellen von `level` auf 1. */
  function refillPrice(level: number, fullPrice: number): number {
    return Math.round((1 - level) * fullPrice);
  }

  function pay(amount: number): TradeResult | null {
    if (amount <= 0) return { ok: false, message: 'NICHTS ZU TUN' };
    if (amount > credits) {
      return { ok: false, message: `ZU WENIG CREDITS — ${amount} CR NOETIG` };
    }
    credits -= amount;
    return null;
  }

  return {
    getCredits: () => credits,

    getCapacity: () => ({ used: used(), total }),

    getManifest: () =>
      [...hold.entries()].map(([id, entry]) => ({
        id,
        name: find(id)?.name ?? id.toUpperCase(),
        tons: entry.tons,
        averagePrice: entry.averagePrice,
      })),

    getGoods: () => goods,

    buy(goodId, tons) {
      const good = find(goodId);
      if (!good) return { ok: false, message: 'WARE UNBEKANNT' };
      const amount = Math.floor(tons);
      if (amount <= 0) return { ok: false, message: 'MENGE UNGUELTIG' };
      if (good.stock < amount) {
        return { ok: false, message: `NUR ${good.stock} T VORRAETIG` };
      }
      const free = total - used();
      if (free < amount) {
        return { ok: false, message: `LADERAUM VOLL — NOCH ${free} T FREI` };
      }
      const price = good.buyPrice * amount;
      const denied = pay(price);
      if (denied) return denied;

      good.stock -= amount;
      const entry = hold.get(goodId) ?? { tons: 0, averagePrice: good.buyPrice };
      // Mischkalkulation, damit die Gewinnanzeige nach mehreren Kaeufen stimmt.
      entry.averagePrice = Math.round(
        (entry.averagePrice * entry.tons + price) / (entry.tons + amount),
      );
      entry.tons += amount;
      hold.set(goodId, entry);
      return { ok: true, message: `${amount} T ${good.name} GEKAUFT — ${price} CR` };
    },

    sell(goodId, tons) {
      const good = find(goodId);
      if (!good) return { ok: false, message: 'WARE UNBEKANNT' };
      const entry = hold.get(goodId);
      const amount = Math.floor(tons);
      if (amount <= 0) return { ok: false, message: 'MENGE UNGUELTIG' };
      if (!entry || entry.tons < amount) {
        return { ok: false, message: `NUR ${entry?.tons ?? 0} T AN BORD` };
      }

      const price = good.sellPrice * amount;
      credits += price;
      good.stock += amount;
      entry.tons -= amount;
      if (entry.tons <= 0) hold.delete(goodId);

      const profit = price - entry.averagePrice * amount;
      const suffix = profit >= 0 ? `+${profit}` : `${profit}`;
      return { ok: true, message: `${amount} T ${good.name} VERKAUFT — ${price} CR (${suffix})` };
    },

    getServices: () => [
      {
        id: 'hull',
        name: 'HUELLE',
        level: getHull(),
        price: refillPrice(getHull(), REPAIR_PRICE_PER_PERCENT * 100),
        action: 'REPARIEREN',
      },
      {
        id: 'fuel',
        name: 'TREIBSTOFF',
        level: fuel,
        price: refillPrice(fuel, FUEL_FULL_PRICE),
        action: 'TANKEN',
      },
      {
        id: 'ammo',
        name: 'MUNITION',
        level: ammo,
        price: refillPrice(ammo, AMMO_FULL_PRICE),
        action: 'FASSEN',
      },
    ],

    useService(serviceId) {
      const service = this.getServices().find((s) => s.id === serviceId);
      if (!service) return { ok: false, message: 'DIENST UNBEKANNT' };
      if (service.level >= 1) return { ok: false, message: `${service.name} IST VOLL` };

      const denied = pay(service.price);
      if (denied) return denied;

      if (serviceId === 'hull') setHull(1);
      else if (serviceId === 'fuel') fuel = 1;
      else ammo = 1;
      return { ok: true, message: `${service.name} AUFGEFUELLT — ${service.price} CR` };
    },
  };
}
