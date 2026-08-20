import type { Vector3 } from 'three';
import type { GoodId } from '../cargo/CargoGoods';

/**
 * Gemeinsames Vokabular fuer Asteroiden, Bergbau und Landung.
 *
 * Drei Arbeitspakete greifen darauf zu: das Feld selbst (erzeugt die Brocken
 * und haelt ihren Vorrat), der Bergbau (Scanner und Foerderstrahl) und die
 * Landung auf den grossen Brocken. Ohne eine gemeinsame Stelle wuerde jedes
 * davon seine eigenen Mineralien und Groessenklassen erfinden.
 *
 * **Was hier nicht steht:** was der Spieler bereits gescannt hat. Das ist sein
 * Wissen, nicht die Eigenschaft eines Brockens, und gehoert zum Bergbau.
 */

/** Was in einem Brocken steckt. Genau eines je Asteroid. */
export type MineralId =
  | 'rock'      // taubes Gestein — nur Beimengung, kaum Ertrag
  | 'iron'      // haeufig, wenig wert
  | 'ice'       // Wassereis
  | 'copper'
  | 'silicon'
  | 'platinum'  // selten
  | 'crystal';  // sehr selten

export interface Mineral {
  readonly id: MineralId;
  /** Anzeigename, deutsch. */
  readonly name: string;
  /** Drei Zeichen fuer Scanner und Displays. */
  readonly code: string;
  /** Was im Laderaum landet. Mehrere Mineralien duerfen dieselbe Ware liefern. */
  readonly good: GoodId;
  /**
   * Relative Haeufigkeit im Feld. Die Summe muss nicht 1 ergeben, das Feld
   * normiert selbst.
   */
  readonly frequency: number;
  /**
   * Foerderbare Tonnen je Kubikmeter Brocken. Taubes Gestein liegt nahe null,
   * Kristall ist selten, aber ergiebig pro Tonne Wert — nicht pro Volumen.
   */
  readonly tonsPerCubicMeter: number;
  /**
   * Haerte 0..1. Multipliziert die Foerderdauer: Kristall dauert deutlich
   * laenger als Eis. So ist die wertvolle Ware nicht einfach nur seltener,
   * sondern auch muehsamer.
   */
  readonly hardness: number;
  /** Grundfarbe des Gesteins. */
  readonly rock: number;
  /** Farbe der Adern und Einschluesse — der sichtbare Hinweis auf den Inhalt. */
  readonly vein: number;
  /** Leuchten die Adern von selbst? (Kristall, Eis im Sonnenlicht.) */
  readonly veinEmissive: boolean;
}

/**
 * Der Katalog. Die Haeufigkeiten sind so gesetzt, dass ein zufaellig
 * gegriffener Brocken meistens langweilig ist — sonst lohnt sich das Scannen
 * nicht.
 */
export const MINERALS: Record<MineralId, Mineral> = {
  rock: {
    id: 'rock', name: 'Taubes Gestein', code: 'TAB', good: 'ore',
    frequency: 30, tonsPerCubicMeter: 0.004, hardness: 0.45,
    rock: 0x6a6259, vein: 0x565049, veinEmissive: false,
  },
  iron: {
    id: 'iron', name: 'Eisenerz', code: 'FE', good: 'ore',
    frequency: 26, tonsPerCubicMeter: 0.022, hardness: 0.5,
    rock: 0x6b503c, vein: 0xa8663a, veinEmissive: false,
  },
  ice: {
    id: 'ice', name: 'Wassereis', code: 'H2O', good: 'water',
    frequency: 16, tonsPerCubicMeter: 0.030, hardness: 0.22,
    rock: 0x7b8c96, vein: 0xc8e6f0, veinEmissive: false,
  },
  copper: {
    id: 'copper', name: 'Kupfererz', code: 'CU', good: 'copper',
    frequency: 12, tonsPerCubicMeter: 0.016, hardness: 0.55,
    rock: 0x5f5a4e, vein: 0x2f9c7a, veinEmissive: false,
  },
  silicon: {
    id: 'silicon', name: 'Siliziumerz', code: 'SI', good: 'silicon',
    frequency: 9, tonsPerCubicMeter: 0.014, hardness: 0.62,
    rock: 0x6d6d70, vein: 0xb9bcc4, veinEmissive: false,
  },
  platinum: {
    id: 'platinum', name: 'Platinerz', code: 'PT', good: 'platinum',
    frequency: 4, tonsPerCubicMeter: 0.008, hardness: 0.8,
    rock: 0x4f4d52, vein: 0xdcd8c8, veinEmissive: false,
  },
  crystal: {
    id: 'crystal', name: 'Resonanzkristall', code: 'KRS', good: 'crystal',
    frequency: 2, tonsPerCubicMeter: 0.006, hardness: 1,
    rock: 0x3d3a52, vein: 0x8f6fe8, veinEmissive: true,
  },
};

export const MINERAL_IDS: readonly MineralId[] = Object.keys(MINERALS) as MineralId[];

export function isMineralId(value: string): value is MineralId {
  return value in MINERALS;
}

/**
 * Groessenklassen. Die Grenzen sind Radien in Metern; die Klasse entscheidet
 * ueber Aussehen, Detailgrad und darueber, ob man landen kann.
 */
export type AsteroidSize = 'pebble' | 'small' | 'medium' | 'large' | 'huge';

export interface SizeClass {
  readonly id: AsteroidSize;
  readonly name: string;
  /** Radienbereich in Metern. */
  readonly minRadius: number;
  readonly maxRadius: number;
  /** Relative Haeufigkeit. Kleines Geroell ueberwiegt deutlich. */
  readonly frequency: number;
  /**
   * Kann das Schiff aufsetzen? Nur die groessten Brocken bieten eine Flaeche,
   * die gross genug und flach genug ist.
   */
  readonly landable: boolean;
}

export const SIZE_CLASSES: Record<AsteroidSize, SizeClass> = {
  pebble: { id: 'pebble', name: 'Geroell', minRadius: 2, maxRadius: 6, frequency: 40, landable: false },
  small: { id: 'small', name: 'Brocken', minRadius: 6, maxRadius: 20, frequency: 34, landable: false },
  medium: { id: 'medium', name: 'Felsen', minRadius: 20, maxRadius: 60, frequency: 18, landable: false },
  large: { id: 'large', name: 'Grossfelsen', minRadius: 60, maxRadius: 150, frequency: 6, landable: false },
  huge: { id: 'huge', name: 'Planetoid', minRadius: 150, maxRadius: 420, frequency: 2, landable: true },
};

export const SIZE_IDS: readonly AsteroidSize[] = Object.keys(SIZE_CLASSES) as AsteroidSize[];

/**
 * Was ein Brocken an Erz hergibt: Volumen mal Ergiebigkeit. Bewusst als reine
 * Funktion, damit Feld und Bergbau denselben Wert ausrechnen.
 */
export function yieldTons(radius: number, mineral: MineralId): number {
  const volume = (4 / 3) * Math.PI * radius * radius * radius;
  return volume * MINERALS[mineral].tonsPerCubicMeter;
}

/** Punkt und Normale auf der Oberflaeche eines Brockens. */
export interface SurfaceSample {
  /** Weltkoordinaten. */
  point: Vector3;
  /** Nach aussen zeigende Flaechennormale. */
  normal: Vector3;
}

/**
 * Was Bergbau und Landung vom Asteroidenfeld brauchen.
 *
 * Bewusst schmal und index-basiert wie die vorhandene API: das Feld haelt
 * seine Brocken in parallelen Feldern, nicht als Objekte, und das soll auch
 * bei einigen hundert Brocken so bleiben.
 */
export interface AsteroidField {
  /** Anzahl der Plaetze im Feld (auch zerstoerte zaehlen mit). */
  readonly count: number;

  isAlive(index: number): boolean;
  /** Mittelpunkt in Weltkoordinaten. */
  getCenter(index: number, out: Vector3): Vector3;
  /** Grober Umriss in Metern — fuer Reichweiten und Radar. */
  getRadius(index: number): number;

  getMineral(index: number): MineralId;
  getSizeClass(index: number): AsteroidSize;
  /** Bietet der Brocken eine Landeflaeche? */
  isLandable(index: number): boolean;

  /**
   * Zaehler, der bei jedem Neusetzen eines Platzes hochgeht. Wer sich Wissen
   * ueber einen Index merkt (z. B. „gescannt"), vergleicht ihn — sonst gilt
   * der Scan nach dem Nachwachsen fuer einen voellig anderen Brocken.
   */
  getGeneration(index: number): number;

  /** Verbleibende foerderbare Masse in Tonnen. */
  getRemainingTons(index: number): number;
  /** Gesamtvorrat im unberuehrten Zustand, fuer Anzeigen. */
  getTotalTons(index: number): number;
  /**
   * Bis zu `tons` foerdern. Liefert, was tatsaechlich kam — am Ende des
   * Vorrats ist das weniger als angefordert.
   */
  mine(index: number, tons: number): number;

  /**
   * Oberflaeche in Richtung `from` abtasten: der Punkt, an dem ein Strahl von
   * `from` zum Mittelpunkt die echte Geometrie trifft, samt Normale.
   * `false`, wenn nichts getroffen wird (Brocken tot oder Richtung entartet).
   */
  sampleSurface(index: number, from: Vector3, out: SurfaceSample): boolean;
}
