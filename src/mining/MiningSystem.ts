import { Vector3 } from 'three';
import {
  MINERALS,
  type AsteroidField,
  type MineralId,
  type SurfaceSample,
} from '../world/AsteroidTypes';
import type { CargoHold } from '../cargo/CargoHold';

/**
 * Bergbau: Scanner und Foerderstrahl.
 *
 * Reine Logik — kein Canvas, kein Three-Objekt ausser Vektoren. Der sichtbare
 * Strahl haengt an {@link MiningBeam} und liest nur den Zustand, den diese
 * Klasse fuehrt. So laesst sich das Wesentliche (Foerderrate, Vorratsabbau,
 * Scanwissen, Kapazitaetsgrenze) kopflos testen.
 *
 * **Wissen gehoert dem Spieler, nicht dem Feld.** Was gescannt wurde, steht
 * hier — je Index zusammen mit der Generation des Brockens. Waechst ein
 * zerstoerter Platz nach, zaehlt die Generation hoch und der alte Scan gilt
 * nicht mehr; sonst zeigte der Scanner Platin auf einem Kieselstein.
 */

/** Kleinster Posten, der sich noch zu buchen lohnt (1 kg). */
const TON_EPSILON = 1e-3;

export type MiningPhase = 'idle' | 'scan' | 'mine';

export interface MiningParams {
  /** Groesste Entfernung (Oberflaeche) fuer einen Scan, in Metern. */
  scanRange: number;
  /** Dauer eines Scans in Sekunden. */
  scanTime: number;
  /** Reichweite des Foerderstrahls (Oberflaeche) in Metern. */
  beamRange: number;
  /** Sekunden, bis der Strahl volle Leistung hat. */
  spinUp: number;
  /**
   * Foerderleistung in Tonnen je Sekunde bei Haerte 0. Geteilt wird durch
   * `hardnessFloor + hardness` — siehe {@link miningRate}.
   */
  baseRate: number;
  /**
   * Untergrenze im Nenner der Foerderrate. Ohne sie liefe weiches Material
   * (Eis, Haerte 0,22) mehr als viermal so schnell wie Kristall; mit ihr ist
   * es knapp dreimal so schnell — deutlich spuerbar, aber kein Knopfdruck.
   */
  hardnessFloor: number;
  /**
   * Tonnen je Klumpen, der im Laderaum ankommt. Der Strahl loest laufend
   * Material, gebucht wird aber portionsweise: das gibt dem Vorgang einen
   * Takt, und der Laderaum baut seine Kisten nicht 120-mal je Sekunde neu.
   */
  chunkTons: number;
}

export const DEFAULT_MINING_PARAMS: MiningParams = {
  scanRange: 1500,
  scanTime: 2.4,
  beamRange: 600,
  spinUp: 0.8,
  baseRate: 0.2,
  hardnessFloor: 0.2,
  chunkTons: 0.5,
};

/**
 * Foerderrate in Tonnen je Sekunde. Eis geht schnell, Kristall zaeh; der
 * Bonus (1 = normal) kommt von aussen, siehe {@link MiningOptions.getYieldBonus}.
 */
export function miningRate(
  mineral: MineralId,
  bonus = 1,
  params: MiningParams = DEFAULT_MINING_PARAMS,
): number {
  const hardness = MINERALS[mineral].hardness;
  return (params.baseRate / (params.hardnessFloor + hardness)) * bonus;
}

/**
 * Sichtlinienpruefung. `true` = freie Bahn. Absichtlich injizierbar: das
 * Interface {@link AsteroidField} kennt keinen Streckentest, und der Bergbau
 * soll nicht an der konkreten Feldklasse haengen.
 */
export type LineOfSight = (from: Vector3, to: Vector3, targetIndex: number) => boolean;

/** Was {@link createLineOfSight} braucht — die Feldklasse erfuellt es bereits. */
export interface SegmentCaster {
  hitSegment(
    from: Vector3,
    direction: Vector3,
    length: number,
    padding?: number,
  ): { index: number } | null;
}

const _dir = new Vector3();

/**
 * Sichtlinie ueber einen Streckentest: alles zwischen Schiff und Ziel
 * blockiert, der Zielbrocken selbst natuerlich nicht.
 */
export function createLineOfSight(caster: SegmentCaster): LineOfSight {
  return (from, to, targetIndex) => {
    _dir.subVectors(to, from);
    const length = _dir.length();
    if (length < 1e-3) return true;
    _dir.divideScalar(length);
    const hit = caster.hitSegment(from, _dir, length);
    return !hit || hit.index === targetIndex;
  };
}

/** Momentaufnahme fuer Schirme, Scheibe und den Strahl. Wird wiederverwendet. */
export interface MiningStatus {
  phase: MiningPhase;
  /** Erfasster Brocken, oder -1. */
  targetIndex: number;
  /** Aufgedecktes Mineral — `null` heisst auf dem Schirm "UNBEKANNT". */
  mineral: MineralId | null;
  /** Gilt ein Scan fuer den aktuellen Brocken? */
  scanned: boolean;
  /** Fortschritt eines laufenden Scans, 0..1. */
  scanProgress: number;
  /** Entfernung zur Oberflaeche des Ziels in Metern. */
  distance: number;
  /** Reichweite des Strahls in Metern (fuer Balken). */
  beamRange: number;
  /** Restvorrat des Brockens in Tonnen. */
  remainingTons: number;
  /** Vorrat im unberuehrten Zustand. */
  totalTons: number;
  /** Was dieser Brocken bisher hergegeben hat, in Tonnen. */
  sessionTons: number;
  /** Fortschritt bis zum naechsten Klumpen, 0..1. */
  batchProgress: number;
  /** Aktuelle Rate in t/s (inkl. Anlauf und Bonus); 0, wenn nichts laeuft. */
  rate: number;
  /** Ertragsfaktor von aussen, 1 = normal. */
  bonus: number;
  /** Der Strahl liegt an und loest Material. */
  beamActive: boolean;
  /** Anlauf des Strahls, 0..1 — die Darstellung faehrt damit hoch und runter. */
  charge: number;
  /** Auftreffpunkt auf der Oberflaeche (nur gueltig bei `hasHit`). */
  hitPoint: Vector3;
  /** Flaechennormale am Auftreffpunkt. */
  hitNormal: Vector3;
  hasHit: boolean;
  /** Zahl der bisher gebuchten Klumpen — die Darstellung blitzt bei Zuwachs. */
  deliveries: number;
  /** Sekunden seit dem letzten gebuchten Klumpen. */
  sinceDelivery: number;
  /** Klartext fuer die Schirme, z. B. "LADERAUM VOLL". */
  message: string;
  /** Belegte, freie und gesamte Tonnage des Laderaums. */
  cargoUsed: number;
  cargoFree: number;
  cargoCapacity: number;
}

export interface MiningOptions {
  field: AsteroidField;
  hold: CargoHold;
  /**
   * Ertragsbonus von aussen, 1 = normal. Die Landung auf einem Planetoiden
   * haengt sich hier ein — der Bergbau ruft nichts aus der Landung auf.
   */
  getYieldBonus?: () => number;
  /** Sichtlinienpruefung; ohne sie gilt die Bahn immer als frei. */
  lineOfSight?: LineOfSight;
  params?: Partial<MiningParams>;
}

const _center = new Vector3();

export class MiningSystem {
  private readonly field: AsteroidField;
  private readonly hold: CargoHold;
  private readonly getYieldBonus: () => number;
  private readonly lineOfSight: LineOfSight | null;
  readonly params: MiningParams;

  /** Gescannte Brocken: Index -> Generation, fuer die der Scan gilt. */
  private readonly scans = new Map<number, number>();

  private beamHeld = false;
  private scanning = false;
  private scanTimer = 0;
  /** Brocken, an den ein laufender Scan gebunden ist; -1 = noch nicht gebunden. */
  private scanIndex = -1;
  /** Meldung des Scanners fuer diesen Schritt; sie geht der des Strahls vor. */
  private scanMessage: string | null = null;

  private charge = 0;
  /** Geloestes, noch nicht gebuchtes Material. */
  private pending = 0;
  private pendingMineral: MineralId | null = null;

  private readonly sample: SurfaceSample = { point: new Vector3(), normal: new Vector3() };
  private readonly status: MiningStatus = {
    phase: 'idle',
    targetIndex: -1,
    mineral: null,
    scanned: false,
    scanProgress: 0,
    distance: 0,
    beamRange: 0,
    remainingTons: 0,
    totalTons: 0,
    sessionTons: 0,
    batchProgress: 0,
    rate: 0,
    bonus: 1,
    beamActive: false,
    charge: 0,
    hitPoint: new Vector3(),
    hitNormal: new Vector3(0, 1, 0),
    hasHit: false,
    deliveries: 0,
    sinceDelivery: Infinity,
    message: 'BEREIT',
    cargoUsed: 0,
    cargoFree: 0,
    cargoCapacity: 0,
  };

  constructor(options: MiningOptions) {
    this.field = options.field;
    this.hold = options.hold;
    this.getYieldBonus = options.getYieldBonus ?? (() => 1);
    this.lineOfSight = options.lineOfSight ?? null;
    this.params = { ...DEFAULT_MINING_PARAMS, ...options.params };
    this.status.beamRange = this.params.beamRange;
  }

  // --------------------------------------------------------------- Eingaben

  /** Scan auf dem erfassten Brocken starten — erneutes Druecken bricht ab. */
  requestScan(): void {
    this.scanning = !this.scanning;
    this.scanTimer = 0;
    // Gebunden wird erst im naechsten Schritt: beim Druecken steht noch nicht
    // fest, welchen Brocken die Zielerfassung dann meldet.
    this.scanIndex = -1;
  }

  /** Foerdertaste (gehalten), einmal je Frame gesetzt. */
  setBeam(held: boolean): void {
    this.beamHeld = held;
  }

  // ---------------------------------------------------------------- Wissen

  /** Gilt ein Scan fuer diesen Platz? Nach dem Nachwachsen nicht mehr. */
  isScanned(index: number): boolean {
    if (index < 0) return false;
    const generation = this.scans.get(index);
    return generation !== undefined && generation === this.field.getGeneration(index);
  }

  /** Das aufgedeckte Mineral, oder `null` fuer "UNBEKANNT". */
  getKnownMineral(index: number): MineralId | null {
    return this.isScanned(index) ? this.field.getMineral(index) : null;
  }

  /** Scan vermerken (auch der erste gefoerderte Klumpen deckt auf). */
  remember(index: number): void {
    if (index < 0) return;
    this.scans.set(index, this.field.getGeneration(index));
  }

  /** Zahl der gueltigen Scans — fuer Anzeigen und Tests. */
  getScanCount(): number {
    let count = 0;
    for (const index of this.scans.keys()) if (this.isScanned(index)) count++;
    return count;
  }

  getStatus(): Readonly<MiningStatus> {
    return this.status;
  }

  // ---------------------------------------------------------------- Schritt

  /**
   * Ein Physikschritt. `targetIndex` kommt aus der Zielerfassung, `origin` ist
   * die Schiffsposition (Reichweite und Sichtlinie messen von dort).
   */
  update(dt: number, targetIndex: number, origin: Vector3): void {
    const s = this.status;
    s.sinceDelivery += dt;
    s.bonus = this.bonus();
    s.cargoCapacity = this.hold.getCapacity();
    s.cargoUsed = this.hold.getUsedCapacity();
    s.cargoFree = this.hold.getFreeCapacity();

    this.scanMessage = null;
    const index = targetIndex >= 0 && this.field.isAlive(targetIndex) ? targetIndex : -1;
    // Zielwechsel: der angebrochene Klumpen gehoert zum alten Brocken und wird
    // sofort gebucht, ein bereits gebundener Scan verfaellt.
    if (index !== s.targetIndex) {
      this.flush();
      if (this.scanIndex >= 0) this.cancelScan();
      s.sessionTons = 0;
      s.targetIndex = index;
    }

    if (index < 0) {
      this.idle(dt, 'KEIN ZIEL');
      return;
    }

    this.field.getCenter(index, _center);
    const distance = Math.max(_center.distanceTo(origin) - this.field.getRadius(index), 0);
    s.distance = distance;
    s.mineral = this.getKnownMineral(index);
    s.scanned = s.mineral !== null;
    s.remainingTons = this.field.getRemainingTons(index);
    s.totalTons = this.field.getTotalTons(index);
    s.hasHit = this.field.sampleSurface(index, origin, this.sample);
    if (s.hasHit) {
      s.hitPoint.copy(this.sample.point);
      s.hitNormal.copy(this.sample.normal);
    }

    this.stepScan(dt, index, distance);
    this.stepBeam(dt, index, distance, origin);
    // Der Scanner hat Vorrang, solange der Strahl nicht liegt: "ausser
    // Reichweite fuer den Scan" ist die genauere Auskunft als "anfliegen".
    if (!s.beamActive && this.scanMessage) s.message = this.scanMessage;
  }

  /** Laufende Foerderung um `offset` verschieben (Floating Origin). */
  shift(offset: Vector3): void {
    this.status.hitPoint.sub(offset);
  }

  // ----------------------------------------------------------------- intern

  private bonus(): number {
    const value = this.getYieldBonus();
    return Number.isFinite(value) && value > 0 ? value : 1;
  }

  private cancelScan(): void {
    this.scanning = false;
    this.scanTimer = 0;
    this.scanIndex = -1;
    this.status.scanProgress = 0;
  }

  private idle(dt: number, message: string): void {
    const s = this.status;
    this.cancelScan();
    this.cool(dt);
    s.phase = 'idle';
    s.scanProgress = 0;
    s.beamActive = false;
    s.rate = 0;
    s.hasHit = false;
    s.mineral = null;
    s.scanned = false;
    s.distance = 0;
    s.remainingTons = 0;
    s.totalTons = 0;
    s.batchProgress = 0;
    s.message = message;
  }

  private stepScan(dt: number, index: number, distance: number): void {
    const s = this.status;
    if (!this.scanning) {
      s.scanProgress = 0;
      return;
    }
    // Gebunden wird auch ausser Reichweite: der Scanner bleibt scharf und
    // sagt, warum er nicht weiterkommt — ein Zielwechsel bricht ihn ab.
    this.scanIndex = index;
    if (distance > this.params.scanRange) {
      this.scanMessage = 'SCAN AUSSER REICHWEITE';
      return;
    }

    this.scanTimer += dt;
    s.scanProgress = Math.min(this.scanTimer / this.params.scanTime, 1);
    if (this.scanTimer < this.params.scanTime) return;

    this.cancelScan();
    this.remember(index);
    s.mineral = this.field.getMineral(index);
    s.scanned = true;
    s.scanProgress = 1;
  }

  private stepBeam(dt: number, index: number, distance: number, origin: Vector3): void {
    const s = this.status;
    const scanning = this.scanning;

    if (!this.beamHeld) {
      this.cool(dt);
      this.flush();
      s.beamActive = false;
      s.rate = 0;
      s.phase = scanning ? 'scan' : 'idle';
      s.message = scanning ? 'SCAN LAEUFT' : this.readyMessage(index, distance);
      return;
    }

    const problem = this.blocker(index, distance, origin);
    if (problem) {
      this.cool(dt);
      this.flush();
      s.beamActive = false;
      s.rate = 0;
      s.phase = scanning ? 'scan' : 'idle';
      s.message = problem;
      return;
    }

    const mineral = this.field.getMineral(index);
    // Der Anlauf haengt am Strahl, nicht am Brocken: er faehrt hoch, solange
    // gefoerdert wird, und faellt beim Loslassen wieder ab.
    this.charge = Math.min(1, this.charge + dt / this.params.spinUp);
    const rate = miningRate(mineral, this.bonus(), this.params) * this.charge;

    // Nie mehr loesen, als noch an Bord passt — sonst haenge geloestes
    // Material in der Luft, das nirgends mehr hin kann.
    const room = this.hold.getFreeCapacity() - this.pending;
    const want = Math.min(rate * dt, Math.max(room, 0));
    const got = this.field.mine(index, want);

    if (got > 0) {
      if (this.pendingMineral !== mineral) this.flush();
      this.pendingMineral = mineral;
      this.pending += got;
      s.sessionTons += got;
      // Solange ein voller Klumpen zusammen ist *und* er auch an Bord passt.
      while (this.pending >= this.params.chunkTons && this.deliver(this.params.chunkTons)) {
        // nichts weiter — die Arbeit steckt in deliver()
      }
    }

    s.phase = 'mine';
    s.charge = this.charge;
    s.beamActive = true;
    s.rate = rate;
    s.remainingTons = this.field.getRemainingTons(index);
    s.batchProgress = Math.min(this.pending / this.params.chunkTons, 1);
    s.message = 'FOERDERUNG LAEUFT';
  }

  /** Warum der Strahl nicht foerdert — oder `null`. Text ist zur Anzeige. */
  private blocker(index: number, distance: number, origin: Vector3): string | null {
    if (distance > this.params.beamRange) return 'AUSSER REICHWEITE';
    if (!this.status.hasHit) return 'KEIN AUFTREFFPUNKT';
    if (this.lineOfSight && !this.lineOfSight(origin, this.status.hitPoint, index)) {
      return 'SICHT VERSTELLT';
    }
    if (this.field.getRemainingTons(index) <= TON_EPSILON) return 'BROCKEN ERSCHOEPFT';
    if (this.hold.getFreeCapacity() - this.pending <= TON_EPSILON) return 'LADERAUM VOLL';
    return null;
  }

  /** Meldung im Ruhezustand: was den Spieler gerade davon abhaelt. */
  private readyMessage(index: number, distance: number): string {
    if (this.field.getRemainingTons(index) <= TON_EPSILON) return 'BROCKEN ERSCHOEPFT';
    if (this.hold.getFreeCapacity() <= TON_EPSILON) return 'LADERAUM VOLL';
    if (distance > this.params.beamRange) return 'ANFLIEGEN';
    return 'BEREIT';
  }

  private cool(dt: number): void {
    // Doppelt so schnell aus wie an: der Strahl soll beim Loslassen erloeschen,
    // nicht ausklingen.
    this.charge = Math.max(0, this.charge - (dt / this.params.spinUp) * 2);
    this.status.charge = this.charge;
  }

  /** Angebrochenen Klumpen buchen (Loslassen, Zielwechsel, Materialwechsel). */
  private flush(): void {
    if (this.pending > TON_EPSILON) this.deliver(this.pending);
    if (this.pending <= TON_EPSILON) this.pending = 0;
    this.status.batchProgress = Math.min(this.pending / this.params.chunkTons, 1);
  }

  /**
   * Bis zu `tons` in den Laderaum buchen. `false`, wenn nichts hineinging —
   * dann bleibt das Geloeste anliegend und der Strahl meldet "LADERAUM VOLL".
   */
  private deliver(tons: number): boolean {
    const mineral = this.pendingMineral;
    if (!mineral) {
      this.pending = 0;
      return false;
    }
    const take = Math.min(tons, this.pending, this.hold.getFreeCapacity());
    if (take <= TON_EPSILON) return false;

    this.pending -= take;
    // Einstandspreis 0: das Material ist nicht gekauft, sondern gefoerdert —
    // beim Verkauf ist der ganze Erloes Gewinn.
    this.hold.add(MINERALS[mineral].good, take, 0);
    this.status.deliveries++;
    this.status.sinceDelivery = 0;
    // Was im Laderaum liegt, kennt der Spieler: der erste Klumpen deckt den
    // Brocken auf, auch ohne Scan.
    this.remember(this.status.targetIndex);
    return true;
  }
}
