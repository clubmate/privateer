import type { FlightDamage } from '../ship/FlightModel';
import type { WeaponDamage } from '../combat/Weapons';

/**
 * Bordsysteme und ihr Zustand.
 *
 * Der Innenraum war bis hierher Kulisse. Mit den Subsystemen bekommt er eine
 * Aufgabe: ein Treffer beschaedigt benannte Systeme, die Auswirkung merkt man
 * im Flug, und repariert wird nur an der Stelle im Schiff, an der das System
 * sitzt (siehe `RepairPanels.ts`).
 *
 * Diese Datei ist bewusst frei von Three-Abhaengigkeiten und Zeichencode: sie
 * ist die Regel, nicht die Darstellung, und laeuft so kopflos im Test.
 */

export type SystemId =
  | 'engine'
  | 'thrusters'
  | 'weapons'
  | 'generator'
  | 'lifeSupport'
  | 'sensors'
  | 'lighting';

export interface SystemDefinition {
  id: SystemId;
  /** Kuerzel auf der Cockpitanzeige, drei Zeichen. */
  code: string;
  /** Klartext im Reparatur-Prompt. */
  name: string;
  /** Grundgewicht bei der Schadensverteilung (Trefferflaeche des Systems). */
  weight: number;
  /**
   * Richtung im Schiffssystem, aus der das System bevorzugt getroffen wird
   * (Nase -Z, oben +Y, Steuerbord +X). Nullvektor = keine Vorzugsrichtung.
   */
  exposure: readonly [number, number, number];
  /** Wirkt die Vorzugsrichtung nach beiden Seiten? (Duesen sitzen links *und* rechts.) */
  symmetric: boolean;
  /** Unter diesem Zustand arbeitet das System merklich schlechter. */
  impairedAt: number;
  /** Auf oder unter diesem Zustand ist es ausgefallen. */
  failedAt: number;
}

/**
 * Reihenfolge = Reihenfolge auf der Cockpitanzeige. Die Gewichte spiegeln, wie
 * viel Schiff hinter dem jeweiligen System steckt: das Triebwerk fuellt das
 * halbe Heck, die Sensorik ist eine Antenne.
 */
export const SYSTEM_DEFINITIONS: readonly SystemDefinition[] = [
  {
    id: 'engine',
    code: 'TRW',
    name: 'TRIEBWERK',
    weight: 1.3,
    exposure: [0, 0, 1], // Heck
    symmetric: false,
    impairedAt: 0.65,
    failedAt: 0.12,
  },
  {
    id: 'thrusters',
    code: 'DUE',
    name: 'MANOEVRIERDUESEN',
    weight: 1.1,
    exposure: [1, 0, 0], // Flanken
    symmetric: true,
    impairedAt: 0.7,
    failedAt: 0.12,
  },
  {
    id: 'weapons',
    code: 'WAF',
    name: 'BORDKANONEN',
    weight: 0.9,
    exposure: [0, 0, -1], // Muendungen an der Nase
    symmetric: false,
    impairedAt: 0.7,
    failedAt: 0.15,
  },
  {
    id: 'generator',
    code: 'GEN',
    name: 'GENERATOR',
    weight: 1.0,
    exposure: [0, 0, 0],
    symmetric: false,
    impairedAt: 0.6,
    failedAt: 0.12,
  },
  {
    id: 'lifeSupport',
    code: 'LEB',
    name: 'LEBENSERHALTUNG',
    weight: 0.8,
    exposure: [0, 1, 0], // Waermetauscher auf dem Ruecken
    symmetric: false,
    impairedAt: 0.6,
    failedAt: 0.2,
  },
  {
    id: 'sensors',
    code: 'SEN',
    name: 'SENSORIK',
    weight: 0.7,
    exposure: [0, 0, -1], // Radarkeule in der Nase
    symmetric: false,
    impairedAt: 0.6,
    failedAt: 0.25,
  },
  {
    id: 'lighting',
    code: 'LIC',
    name: 'BELEUCHTUNG',
    weight: 1.0,
    exposure: [0, 0, 0],
    symmetric: false,
    impairedAt: 0.8,
    failedAt: 0.15,
  },
] as const;

export const SYSTEM_IDS: readonly SystemId[] = SYSTEM_DEFINITIONS.map((d) => d.id);

export interface SystemsParams {
  /** Faktor vom Huellenschaden (0..1) auf den gesamten Systemschaden. */
  damageScale: number;
  /** Darunter bleibt ein Streifschuss folgenlos. */
  minDamage: number;
  /** Gewichtszuschlag aus der Trefferrichtung (0 = Richtung egal). */
  directionGain: number;
  /** Anteil, den ein intakter Generator vom Stoss abfaengt. */
  shieldAbsorb: number;
  /** Sekunden bis zur leeren Luft bei komplett ausgefallener Lebenserhaltung. */
  oxygenSeconds: number;
  /** Anteil je Sekunde, mit dem sich die Luft nach der Reparatur erholt. */
  oxygenRecovery: number;
  /** Dauerhafter Drehratenversatz bei komplett ausgefallenen Duesen, rad/s. */
  maxYawBias: number;
}

export const DEFAULT_SYSTEMS_PARAMS: SystemsParams = {
  damageScale: 1.8,
  minDamage: 0.004,
  directionGain: 2.0,
  shieldAbsorb: 0.35,
  oxygenSeconds: 210,
  oxygenRecovery: 0.06,
  maxYawBias: 0.11,
};

/** Was ein einzelner Treffer einem System angetan hat. */
export interface SystemHit {
  id: SystemId;
  /** Abgezogener Zustand, 0..1. */
  amount: number;
}

/** Grobe Ampel fuer Anzeige und Panelfarbe. */
export type SystemStatus = 'ok' | 'impaired' | 'failed';

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Zustand aller Bordsysteme.
 *
 * Der Zufall wird injiziert (`random`), damit die Schadensverteilung im Test
 * exakt vorhersagbar ist — ohne das laesst sich "ein Treffer von hinten trifft
 * eher das Triebwerk" nicht pruefen, nur behaupten.
 */
export class ShipSystems {
  /** Luftvorrat 0..1; faellt nur bei defekter Lebenserhaltung. */
  oxygen = 1;

  private readonly health = new Map<SystemId, number>();
  private readonly params: SystemsParams;
  private readonly random: () => number;
  /** Seite, zu der die defekten Duesen ziehen (+1 = nach Steuerbord). */
  private driftSign = 1;

  constructor(options: { random?: () => number; params?: Partial<SystemsParams> } = {}) {
    this.random = options.random ?? Math.random;
    this.params = { ...DEFAULT_SYSTEMS_PARAMS, ...options.params };
    for (const def of SYSTEM_DEFINITIONS) this.health.set(def.id, 1);
    this.driftSign = this.random() < 0.5 ? -1 : 1;
  }

  getParams(): Readonly<SystemsParams> {
    return this.params;
  }

  static definition(id: SystemId): SystemDefinition {
    const def = SYSTEM_DEFINITIONS.find((d) => d.id === id);
    if (!def) throw new Error(`Unbekanntes System: ${id}`);
    return def;
  }

  /** Zustand eines Systems, 0..1. */
  getHealth(id: SystemId): number {
    return this.health.get(id) ?? 1;
  }

  getStatus(id: SystemId): SystemStatus {
    const def = ShipSystems.definition(id);
    const health = this.getHealth(id);
    if (health <= def.failedAt) return 'failed';
    if (health < def.impairedAt) return 'impaired';
    return 'ok';
  }

  isFailed(id: SystemId): boolean {
    return this.getStatus(id) === 'failed';
  }

  isImpaired(id: SystemId): boolean {
    return this.getStatus(id) !== 'ok';
  }

  /** Gibt es ueberhaupt etwas zu reparieren? */
  get anyDamaged(): boolean {
    return SYSTEM_IDS.some((id) => this.getHealth(id) < 1);
  }

  get anyImpaired(): boolean {
    return SYSTEM_IDS.some((id) => this.isImpaired(id));
  }

  get anyFailed(): boolean {
    return SYSTEM_IDS.some((id) => this.isFailed(id));
  }

  /** Schlechtestes System (fuer die Warnleuchte im Cockpit). */
  worst(): SystemId {
    let worst: SystemId = SYSTEM_IDS[0]!;
    for (const id of SYSTEM_IDS) {
      if (this.getHealth(id) < this.getHealth(worst)) worst = id;
    }
    return worst;
  }

  /** Direkt Schaden setzen (Debugkonsole und Tests). */
  damage(id: SystemId, amount: number): void {
    if (amount <= 0) return;
    this.health.set(id, clamp01(this.getHealth(id) - amount));
    if (id === 'thrusters') this.driftSign = this.random() < 0.5 ? -1 : 1;
  }

  /** Zustand anheben (Reparatur). */
  repair(id: SystemId, amount: number): void {
    if (amount <= 0) return;
    this.health.set(id, clamp01(this.getHealth(id) + amount));
  }

  repairAll(): void {
    for (const id of SYSTEM_IDS) this.health.set(id, 1);
    this.oxygen = 1;
  }

  /**
   * Schaden eines Rumpftreffers auf die Systeme verteilen.
   *
   * `direction` ist der Einheitsvektor vom Schiffsmittelpunkt zur
   * Einschlagstelle, **im Schiffssystem** (siehe `HullCollision.Impact`). Er
   * verschiebt die Gewichte: ein Schlag aufs Heck erwischt eher das Triebwerk
   * als die Radarkeule in der Nase. Der Rest ist gewichteter Zufall ohne
   * Zuruecklegen — ein Brocken zertruemmert nicht siebenmal dasselbe Relais.
   */
  applyImpact(damage: number, direction: { x: number; y: number; z: number }): SystemHit[] {
    const p = this.params;
    if (damage < p.minDamage) return [];

    // Ein laufender Generator faengt einen Teil des Stosses ab; er nimmt ihn
    // aber selbst mit, deshalb steht er ganz normal in der Verlosung.
    const absorbed = 1 - p.shieldAbsorb * this.getHealth('generator');
    const total = clamp01(damage * p.damageScale * absorbed);
    if (total < p.minDamage) return [];

    const count = total > 0.25 ? 3 : total > 0.1 ? 2 : 1;
    const shares = [0.6, 0.28, 0.12].slice(0, count);
    const sum = shares.reduce((a, b) => a + b, 0);

    const pool = SYSTEM_DEFINITIONS.map((def) => ({
      def,
      weight: def.weight * (1 + p.directionGain * exposureFactor(def, direction)),
    }));

    const hits: SystemHit[] = [];
    for (let i = 0; i < count && pool.length > 0; i++) {
      const index = pickWeighted(pool, this.random());
      const def = pool[index]!.def;
      pool.splice(index, 1);

      const amount = (total * shares[i]!) / sum;
      this.health.set(def.id, clamp01(this.getHealth(def.id) - amount));
      hits.push({ id: def.id, amount });
    }

    // Neue Schlagseite wuerfeln, sobald die Duesen etwas abbekommen haben:
    // sonst zieht das Schiff nach einer Reparatur wieder in dieselbe Richtung.
    if (hits.some((h) => h.id === 'thrusters')) {
      this.driftSign = this.random() < 0.5 ? -1 : 1;
    }
    return hits;
  }

  /**
   * Laufende Effekte fortschreiben. Bisher nur die Luft: bei defekter
   * Lebenserhaltung tickt sie herunter, nach der Reparatur wieder herauf.
   */
  update(dt: number): void {
    const health = this.getHealth('lifeSupport');
    const def = ShipSystems.definition('lifeSupport');
    if (health >= def.impairedAt) {
      this.oxygen = clamp01(this.oxygen + this.params.oxygenRecovery * dt);
      return;
    }
    // Zwischen Schwelle und Ausfall linear: ein angeschlagener Waermetauscher
    // haelt die Luft noch eine Weile, ein zerstoerter gar nicht.
    const severity = clamp01((def.impairedAt - health) / Math.max(def.impairedAt, 1e-3));
    this.oxygen = clamp01(this.oxygen - (severity * dt) / this.params.oxygenSeconds);
  }

  /** Restliche Luft in Sekunden; `Infinity`, solange nichts verbraucht wird. */
  getOxygenSeconds(): number {
    const health = this.getHealth('lifeSupport');
    const def = ShipSystems.definition('lifeSupport');
    if (health >= def.impairedAt) return Infinity;
    const severity = clamp01((def.impairedAt - health) / Math.max(def.impairedAt, 1e-3));
    if (severity <= 0) return Infinity;
    return (this.oxygen * this.params.oxygenSeconds) / severity;
  }

  // ------------------------------------------------- Auswirkungen im Spiel

  /**
   * Multiplikatoren fuer das Flugmodell. Bewusst als Faktoren und nicht als
   * Eingriff in die Physik: das FlightModel bleibt so testbar wie vorher.
   */
  getFlightDamage(): FlightDamage {
    const engine = this.getHealth('engine');
    const thrusters = this.getHealth('thrusters');
    const engineOut = this.isFailed('engine');
    const thrustersOut = this.isFailed('thrusters');

    // Der Sprung an der Ausfallschwelle ist Absicht: ein ausgefallenes
    // Triebwerk soll sich wie ein Ausfall anfuehlen, nicht wie "etwas zaeher".
    const thrust = engineOut ? 0.12 : 0.35 + 0.65 * engine;
    const topSpeed = engineOut ? 0.15 : 0.3 + 0.7 * engine;
    const torque = thrustersOut ? 0.25 : 0.4 + 0.6 * thrusters;

    // Einseitiges Ziehen erst, wenn die Duesen wirklich angeschlagen sind —
    // ein Kratzer soll den Kurs nicht dauerhaft verziehen.
    const def = ShipSystems.definition('thrusters');
    const bias = thrusters >= def.impairedAt
      ? 0
      : ((def.impairedAt - thrusters) / def.impairedAt) * this.params.maxYawBias * this.driftSign;

    return {
      thrust,
      topSpeed,
      torque,
      yawBias: bias,
      // Der Nachbrenner zieht seine Leistung aus dem Generator.
      afterburner: !this.isFailed('generator'),
    };
  }

  /** Multiplikatoren fuer die Bordkanonen. */
  getWeaponDamage(): WeaponDamage {
    const health = this.getHealth('weapons');
    const status = this.getStatus('weapons');
    return {
      reload: 1 + (1 - health) * 1.8,
      activeGuns: status === 'failed' ? 0 : status === 'impaired' ? 1 : 2,
    };
  }

  /** Faellt die Zielerfassung aus? */
  get sensorsOnline(): boolean {
    return !this.isFailed('sensors');
  }

  /**
   * Helligkeit der Innenbeleuchtung 0..1. Der Generator liefert den Strom, die
   * Lampen verteilen ihn — beide zaehlen.
   */
  getLightLevel(): number {
    const lighting = this.getHealth('lighting');
    const power = 0.55 + 0.45 * this.getHealth('generator');
    if (this.isFailed('lighting')) return 0.0;
    return clamp01((0.35 + 0.65 * lighting) * power);
  }

  /** Flackerstaerke 0..1 — je kaputter die Beleuchtung, desto unruhiger. */
  getFlicker(): number {
    return clamp01((1 - this.getHealth('lighting')) * 1.2);
  }

  /** Notbeleuchtung (rote Bodenstreifen) statt Deckenlicht. */
  get emergencyLighting(): boolean {
    return this.isFailed('lighting') || this.isFailed('generator');
  }

  /**
   * Tempo der Reparaturen. Ohne Strom wird jede Reparatur zur Handarbeit —
   * das gibt dem Generator eine Rolle, solange es noch keine Schilde gibt.
   */
  getRepairSpeed(): number {
    return 0.45 + 0.55 * this.getHealth('generator');
  }
}

/**
 * Richtungszuschlag eines Systems fuer einen Treffer aus `direction`.
 * Ergebnis 0..1; 1 = voll von der empfindlichen Seite getroffen.
 */
function exposureFactor(
  def: SystemDefinition,
  direction: { x: number; y: number; z: number },
): number {
  const [ex, ey, ez] = def.exposure;
  if (ex === 0 && ey === 0 && ez === 0) return 0;
  const dot = ex * direction.x + ey * direction.y + ez * direction.z;
  return def.symmetric ? Math.abs(dot) : Math.max(dot, 0);
}

/** Index eines gewichteten Loses; `roll` ist 0..1. */
function pickWeighted(pool: Array<{ weight: number }>, roll: number): number {
  let total = 0;
  for (const entry of pool) total += entry.weight;
  if (total <= 0) return 0;

  let cursor = roll * total;
  for (let i = 0; i < pool.length; i++) {
    cursor -= pool[i]!.weight;
    if (cursor <= 0) return i;
  }
  return pool.length - 1;
}
