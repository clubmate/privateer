import { CargoError, type CargoHold } from '../cargo/CargoHold';
import { GOODS, GOOD_IDS, isGoodId, type GoodId } from '../cargo/CargoGoods';
import type {
  CargoCapacity,
  ManifestEntry,
  StationService,
  StationTrade,
  TradeGood,
  TradeResult,
} from './StationTrade';

/**
 * Das Stationsmenue auf den echten Laderaum legen.
 *
 * `createStationTradeStub` hielt Credits, Bestaende und Ladung selbst und
 * handelte einen eigenen Warenkatalog (Medikamente, Luxusgueter). Der
 * Laderaum kennt aber seine eigenen Waren, und nur die koennen als Kisten im
 * Frachtraum stehen — deshalb ist hier der Laderaum die Quelle der Wahrheit
 * und die Station leitet ihren Katalog aus {@link GOODS} ab. Was man kauft,
 * liegt hinterher wirklich hinten im Schiff.
 *
 * Die Station bleibt fuer ihren eigenen Vorrat zustaendig: der lebt hier und
 * nirgends sonst.
 */

/** Aufschlag der Station beim Verkauf an den Spieler. */
const BUY_MARKUP = 1.35;

/** Abschlag beim Ankauf vom Spieler. Die Spanne ist der Gewinn der Station. */
const SELL_MARKDOWN = 0.82;

/** Anfangsvorrat je Ware in Tonnen. Knappe Waren sind die teuren. */
const INITIAL_STOCK: Record<GoodId, number> = {
  ore: 180,
  water: 240,
  food: 90,
  parts: 46,
  electronics: 24,
  contraband: 6,
};

/** Preis je Prozentpunkt Huelle. */
const REPAIR_PRICE_PER_PERCENT = 34;

/** Preis fuer eine volle Tankfuellung bzw. volle Magazine. */
const FUEL_FULL_PRICE = 620;
const AMMO_FULL_PRICE = 940;

export interface CargoStationTradeOptions {
  hold: CargoHold;
  /** Huellenzustand 0..1 lesen. */
  getHull(): number;
  /** Huellenzustand 0..1 setzen. */
  setHull(value: number): void;
}

/** Preis, den die Station je Tonne verlangt. */
export function buyPriceOf(good: GoodId): number {
  return Math.round(GOODS[good].basePrice * BUY_MARKUP);
}

/** Preis, den die Station je Tonne zahlt. */
export function sellPriceOf(good: GoodId): number {
  return Math.round(GOODS[good].basePrice * SELL_MARKDOWN);
}

/**
 * Meldungen des Laderaums erscheinen unveraendert in der Statuszeile des
 * Menues; der Vertrag dort verlangt Grossbuchstaben.
 */
function shout(message: string): string {
  return message.toUpperCase();
}

export function createCargoStationTrade(options: CargoStationTradeOptions): StationTrade {
  const { hold, getHull, setHull } = options;
  const stock = { ...INITIAL_STOCK };

  // Treibstoff und Munition verbraucht im Spiel noch nichts. Die Fuellstaende
  // stehen trotzdem hier, damit das Menue vollstaendig bleibt und der Tag, an
  // dem es einen Verbrauch gibt, nur diese beiden Zeilen kostet.
  let fuel = 0.62;
  let ammo = 0.45;

  function refillPrice(level: number, fullPrice: number): number {
    return Math.round((1 - level) * fullPrice);
  }

  /** Abbuchen, wenn das Guthaben reicht. Gibt die Absage zurueck, sonst null. */
  function pay(amount: number): TradeResult | null {
    if (amount <= 0) return { ok: false, message: 'NICHTS ZU TUN' };
    if (amount > hold.getCredits()) {
      return { ok: false, message: `ZU WENIG CREDITS — ${amount} CR NOETIG` };
    }
    hold.addCredits(-amount);
    return null;
  }

  return {
    getCredits: () => hold.getCredits(),

    getCapacity: (): CargoCapacity => ({
      used: hold.getUsedCapacity(),
      total: hold.getCapacity(),
    }),

    getManifest: (): readonly ManifestEntry[] =>
      hold.getManifest().map((lot) => ({
        id: lot.good,
        name: GOODS[lot.good].name.toUpperCase(),
        tons: lot.tons,
        averagePrice: Math.round(lot.avgPrice),
      })),

    getGoods: (): readonly TradeGood[] =>
      GOOD_IDS.map((id): TradeGood => ({
        id,
        name: GOODS[id].name.toUpperCase(),
        buyPrice: buyPriceOf(id),
        sellPrice: sellPriceOf(id),
        stock: stock[id],
      })),

    buy(goodId, tons): TradeResult {
      if (!isGoodId(goodId)) return { ok: false, message: 'WARE UNBEKANNT' };
      const amount = Math.floor(tons);
      if (amount <= 0) return { ok: false, message: 'MENGE UNGUELTIG' };
      if (stock[goodId] < amount) {
        return { ok: false, message: `NUR ${stock[goodId]} T VORRAETIG` };
      }
      const price = buyPriceOf(goodId);
      try {
        // Der Laderaum prueft Kapazitaet und Guthaben und bucht beides.
        hold.buy(goodId, amount, price);
      } catch (error) {
        if (error instanceof CargoError) return { ok: false, message: shout(error.message) };
        throw error;
      }
      stock[goodId] -= amount;
      return {
        ok: true,
        message: `${amount} T ${GOODS[goodId].name.toUpperCase()} GELADEN — ${price * amount} CR`,
      };
    },

    sell(goodId, tons): TradeResult {
      if (!isGoodId(goodId)) return { ok: false, message: 'WARE UNBEKANNT' };
      const amount = Math.floor(tons);
      if (amount <= 0) return { ok: false, message: 'MENGE UNGUELTIG' };
      const price = sellPriceOf(goodId);
      let proceeds: number;
      try {
        proceeds = hold.sell(goodId, amount, price);
      } catch (error) {
        if (error instanceof CargoError) return { ok: false, message: shout(error.message) };
        throw error;
      }
      stock[goodId] += amount;
      return {
        ok: true,
        message: `${amount} T ${GOODS[goodId].name.toUpperCase()} VERKAUFT — ${proceeds} CR`,
      };
    },

    getServices: (): readonly StationService[] => [
      {
        id: 'hull',
        name: 'HUELLE',
        level: getHull(),
        price: Math.round((1 - getHull()) * 100 * REPAIR_PRICE_PER_PERCENT),
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

    useService(serviceId): TradeResult {
      if (serviceId === 'hull') {
        const missing = 1 - getHull();
        const denied = pay(Math.round(missing * 100 * REPAIR_PRICE_PER_PERCENT));
        if (denied) return denied;
        setHull(1);
        return { ok: true, message: 'HUELLE INSTANDGESETZT' };
      }
      if (serviceId === 'fuel') {
        const denied = pay(refillPrice(fuel, FUEL_FULL_PRICE));
        if (denied) return denied;
        fuel = 1;
        return { ok: true, message: 'TANKS VOLL' };
      }
      if (serviceId === 'ammo') {
        const denied = pay(refillPrice(ammo, AMMO_FULL_PRICE));
        if (denied) return denied;
        ammo = 1;
        return { ok: true, message: 'MAGAZINE VOLL' };
      }
      return { ok: false, message: 'DIENST UNBEKANNT' };
    },
  };
}
