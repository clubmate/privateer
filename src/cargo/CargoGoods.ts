/**
 * Warenkatalog des Laderaums.
 *
 * Die Warenarten sind bewusst wenige und deutlich verschieden — sie muessen
 * sich im Frachtraum **auf einen Blick** unterscheiden lassen, sonst ist die
 * ganze Uebung umsonst. Deshalb traegt jede Ware nicht nur Preis und Volumen,
 * sondern auch ihr Gebinde, ihre Lackfarbe und ihr Kuerzel fuer den Aufkleber.
 */

export type GoodId =
  | 'ore'
  | 'water'
  | 'food'
  | 'parts'
  | 'electronics'
  | 'contraband'
  // Aus dem Bergbau: siehe world/AsteroidTypes.ts. Erz und Eis fallen in die
  // vorhandenen Posten `ore` und `water` — geschmolzenes Eis ist Wasser.
  | 'copper'
  | 'silicon'
  | 'platinum'
  | 'crystal';

/**
 * Gebindeart. Bestimmt Form und Hoehe eines Stellplatz-Gebindes und damit
 * mittelbar, wie hoch sich eine Ware stapeln laesst.
 */
export type ContainerKind = 'bin' | 'crate' | 'barrels' | 'case';

export interface Good {
  readonly id: GoodId;
  /** Anzeigename im Manifest. */
  readonly name: string;
  /** Drei Zeichen fuer den Aufkleber auf der Kiste. */
  readonly code: string;
  /**
   * Stauvolumen je Tonne in m^3.
   *
   * Bewusst gestaucht gegenueber echten Dichten: mit 1,0 m^3/t fuer Wasser
   * passten 40 t nie in einen vier Meter langen Frachtraum, und die Kisten
   * sollen den Bestand zeigen, nicht die Kapazitaet erklaeren. Die Rangfolge
   * stimmt — Erz staut am dichtesten, Elektronik am sperrigsten.
   */
  readonly volumePerTon: number;
  readonly container: ContainerKind;
  /** Richtpreis je Tonne in Credits; die Station schlaegt ihren Aufschlag drauf. */
  readonly basePrice: number;
  /** Lackfarbe des Gebindes. */
  readonly color: number;
  /** Farbe von Markierung, Beschriftung und Deckelrand. */
  readonly accent: number;
  /** Traegt Gefahrgut-Schraffur statt eines glatten Aufklebers. */
  readonly hazard: boolean;
}

/** Grundflaeche eines Stellplatzes in Metern (x mal z). */
export const UNIT_WIDTH = 0.64;
export const UNIT_DEPTH = 0.78;

/** Bauhoehe je Gebindeart in Metern. */
export const CONTAINER_HEIGHT: Record<ContainerKind, number> = {
  bin: 0.62,
  crate: 0.66,
  barrels: 0.86,
  case: 0.5,
};

export const GOODS: Record<GoodId, Good> = {
  ore: {
    id: 'ore',
    name: 'Erz',
    code: 'ORE',
    volumePerTon: 0.13,
    container: 'bin',
    basePrice: 22,
    color: 0x6b4a2c,
    accent: 0xc39a2a,
    hazard: false,
  },
  water: {
    id: 'water',
    name: 'Wasser',
    code: 'H2O',
    volumePerTon: 0.16,
    container: 'barrels',
    basePrice: 8,
    color: 0x2f5f74,
    accent: 0x8fd4e8,
    hazard: false,
  },
  food: {
    id: 'food',
    name: 'Nahrung',
    code: 'NUT',
    volumePerTon: 0.20,
    container: 'crate',
    basePrice: 15,
    color: 0x7c7148,
    accent: 0xd8c98a,
    hazard: false,
  },
  parts: {
    id: 'parts',
    name: 'Ersatzteile',
    code: 'PRT',
    volumePerTon: 0.18,
    container: 'crate',
    basePrice: 46,
    color: 0x4a5340,
    accent: 0x9fb08c,
    hazard: false,
  },
  electronics: {
    id: 'electronics',
    name: 'Elektronik',
    code: 'ELC',
    volumePerTon: 0.155,
    container: 'case',
    basePrice: 118,
    color: 0x2c3138,
    accent: 0x66eaff,
    hazard: false,
  },
  contraband: {
    id: 'contraband',
    name: 'Kontrabande',
    code: '---',
    volumePerTon: 0.165,
    container: 'crate',
    basePrice: 240,
    color: 0x24211f,
    accent: 0xb4342a,
    hazard: true,
  },
  copper: {
    id: 'copper',
    name: 'Kupfererz',
    code: 'CU',
    volumePerTon: 0.135,
    container: 'bin',
    basePrice: 58,
    color: 0x4e4136,
    accent: 0x2f9c7a,
    hazard: false,
  },
  silicon: {
    id: 'silicon',
    name: 'Siliziumerz',
    code: 'SI',
    volumePerTon: 0.145,
    container: 'bin',
    basePrice: 74,
    color: 0x5a5a5e,
    accent: 0xb9bcc4,
    hazard: false,
  },
  platinum: {
    id: 'platinum',
    name: 'Platinerz',
    code: 'PT',
    volumePerTon: 0.105,
    container: 'case',
    basePrice: 410,
    color: 0x3f3d42,
    accent: 0xdcd8c8,
    hazard: false,
  },
  crystal: {
    id: 'crystal',
    name: 'Resonanzkristall',
    code: 'KRS',
    volumePerTon: 0.19,
    container: 'case',
    basePrice: 690,
    color: 0x312e42,
    accent: 0x8f6fe8,
    hazard: false,
  },
};

/** Alle Warenarten in fester Reihenfolge (Manifest, Handelsmenue, Tests). */
export const GOOD_IDS: readonly GoodId[] = Object.keys(GOODS) as GoodId[];

/** Gibt es diese Warenart? Schuetzt die Schnittstelle zum Stationsmenue. */
export function isGoodId(value: string): value is GoodId {
  return Object.prototype.hasOwnProperty.call(GOODS, value);
}

/**
 * Tonnen, die in **ein** Gebinde passen. Aus Grundflaeche, Bauhoehe und
 * Stauvolumen — nicht von Hand gepflegt, damit Form und Kapazitaet nicht
 * auseinanderlaufen, wenn eine Kiste umgemessen wird.
 */
export function tonsPerUnit(good: Good): number {
  const volume = UNIT_WIDTH * UNIT_DEPTH * CONTAINER_HEIGHT[good.container];
  return volume / good.volumePerTon;
}

/** Zahl der Gebinde fuer `tons` Tonnen; angebrochene Gebinde zaehlen voll. */
export function unitCount(good: Good, tons: number): number {
  if (tons <= 0) return 0;
  // Toleranz gegen Fliesskommareste: 4,000000001 t sollen nicht ein Gebinde
  // mehr ergeben als 4 t.
  return Math.ceil(tons / tonsPerUnit(good) - 1e-9);
}
