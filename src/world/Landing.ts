import { Matrix4, Quaternion, Vector3 } from 'three';
import type { AsteroidField, SurfaceSample } from './AsteroidTypes';
import {
  quaternionLookingAlong,
  sampleDockPath,
  shiftDockPath,
  type DockPath,
  type Pose,
} from './Docking';

/**
 * Landelogik ohne Renderabhaengigkeit: Zustandsmaschine, Freigabepruefung,
 * Sinkkurve und die Verankerung auf der Oberflaeche. Alles hier rechnet mit
 * Zahlen und Vektoren und bleibt damit kopflos testbar (siehe Landing.test.ts);
 * die Anbindung an Schiff, Feld und Anzeige macht {@link LandingController}.
 *
 * Aufgebaut wie {@link ./Docking}, weil es dieselbe Aufgabe ist: ein Manoever,
 * das der Pilot anfordert, das der Autopilot ausfuehrt und das ihn danach in
 * einem festen Zustand ablegt. Bahn und Zeitkennlinie werden von dort
 * uebernommen statt nachgebaut — ein Andockbogen und ein Landeanflug sind
 * dieselbe Bezierkurve mit anderer Achse.
 */

/**
 * Zustaende der Landung.
 *
 * ```
 * far -> in-range -> cleared -> descending -> landed -> ascending -> far
 *          ^            |                                 |
 *          +------------+ (Freigabe verfaellt)            +-> far
 * ```
 */
export type LandingState = 'far' | 'in-range' | 'cleared' | 'descending' | 'landed' | 'ascending';

/** Warum die Landung abgelehnt wurde. */
export type LandingDenialReason =
  | 'target'
  | 'landable'
  | 'surface'
  | 'range'
  | 'speed'
  | 'state';

export interface LandingParams {
  /**
   * Ab dieser Hoehe ueber Grund gilt ein Planetoid als Landeplatz in
   * Reichweite (Marker erscheint), in m.
   */
  rangeIn: number;
  /** Erst hier faellt er wieder auf `far` — Hysterese gegen Flackern, in m. */
  rangeOut: number;
  /** Hoechste Hoehe ueber Grund fuer eine Landefreigabe, in m. */
  clearanceAltitude: number;
  /** Ab dieser Hoehe verfaellt eine erteilte Freigabe wieder, in m. */
  clearanceExpire: number;
  /** Hoechstgeschwindigkeit bei der Freigabe, in m/s. */
  clearanceSpeed: number;
  /** Sekunden zwischen Freigabe und Uebernahme durch den Autopiloten. */
  clearanceHold: number;
  /**
   * Stuetzpunkt der Sinkkurve, in m ueber dem Aufsetzpunkt. Er zieht den
   * letzten Bahnabschnitt auf die Flaechennormale — das Schiff kommt dadurch
   * senkrecht herunter und nicht schraeg in den Fels.
   */
  approachHold: number;
  /** Kuerzeste und laengste Dauer des Sinkflugs, in s. */
  minDescentDuration: number;
  maxDescentDuration: number;
  /** Sekunden je Meter Anfangshoehe fuer die Dauer dazwischen. */
  descentDurationPerMeter: number;
  /** Dauer des Abhebens in s und Hoehe, die dabei gewonnen wird, in m. */
  liftoffDuration: number;
  liftoffHeight: number;
  /**
   * Abstand von der Schiffsmitte zur Rumpfunterkante in m. Ohne ihn steht das
   * Schiff mit der Mitte auf dem Fels — also zur Haelfte darin.
   */
  hullHeight: number;
  /** Ertragsfaktor beim Foerdern aus dem Stand (1 = wie im Flug). */
  landedYieldBonus: number;
}

export const DEFAULT_LANDING_PARAMS: LandingParams = {
  rangeIn: 1400,
  rangeOut: 1700,
  clearanceAltitude: 700,
  clearanceExpire: 1100,
  clearanceSpeed: 90,
  clearanceHold: 1.4,
  approachHold: 220,
  minDescentDuration: 6,
  maxDescentDuration: 12,
  descentDurationPerMeter: 1 / 70,
  liftoffDuration: 5,
  liftoffHeight: 260,
  hullHeight: 3.2,
  landedYieldBonus: 2.5,
};

/** Messwerte eines Frames, aus denen die Logik entscheidet. */
export interface LandingSample {
  /** Ist ueberhaupt ein Brocken erfasst? */
  hasTarget: boolean;
  /** Meldet das Feld fuer diesen Brocken eine Landeflaeche? */
  landable: boolean;
  /** Liefert `sampleSurface` einen Aufsetzpunkt? */
  hasSurface: boolean;
  /** Hoehe ueber Grund in m: Schiffsmitte bis Aufsetzpunkt. */
  altitude: number;
  /** Bahngeschwindigkeit des Schiffs in m/s. */
  speed: number;
  /** Name der Groessenklasse, fuer die Absage („Felsen", „Planetoid"). */
  sizeName: string;
}

export function createLandingSample(): LandingSample {
  return {
    hasTarget: false,
    landable: false,
    hasSurface: false,
    altitude: Infinity,
    speed: 0,
    sizeName: '',
  };
}

export type LandingClearance =
  | { granted: true; message: string }
  | { granted: false; reason: LandingDenialReason; message: string };

/** Meldung des Bordrechners bei erteilter Freigabe — ASCII wie das uebrige HUD. */
export const LANDING_GRANTED = 'LANDEFREIGABE — SINKFLUG EINGELEITET';

/**
 * Freigabekriterien. Geprueft wird in der Reihenfolge, in der ein Pilot die
 * Fehler beheben wuerde: erst ein Ziel erfassen, dann ein taugliches, dann
 * hinfliegen, dann bremsen. Gemeldet wird nur der erste Verstoss — zwei
 * Absagen gleichzeitig liest niemand.
 */
export function evaluateLandingClearance(
  sample: LandingSample,
  params: LandingParams = DEFAULT_LANDING_PARAMS,
): LandingClearance {
  if (!sample.hasTarget) {
    return { granted: false, reason: 'target', message: 'KEIN ZIEL ERFASST (T)' };
  }
  if (!sample.landable) {
    const what = sample.sizeName ? sample.sizeName.toUpperCase() : 'BROCKEN';
    return { granted: false, reason: 'landable', message: `KEIN LANDEPLATZ — ${what} ZU KLEIN` };
  }
  if (!sample.hasSurface) {
    return { granted: false, reason: 'surface', message: 'KEIN LANDEPLATZ — OBERFLAECHE UNKLAR' };
  }
  if (sample.altitude > params.clearanceAltitude) {
    return {
      granted: false,
      reason: 'range',
      message: `ZU WEIT (${Math.round(sample.altitude)} M UEBER GRUND, MAX ${params.clearanceAltitude} M)`,
    };
  }
  if (sample.speed > params.clearanceSpeed) {
    return {
      granted: false,
      reason: 'speed',
      message: `ZU SCHNELL (${Math.round(sample.speed)} M/S, MAX ${params.clearanceSpeed} M/S)`,
    };
  }
  return { granted: true, message: LANDING_GRANTED };
}

/**
 * Zustandsmaschine der Landung. Kennt weder Three-Objekte noch Eingaben — sie
 * bekommt je Schritt einen {@link LandingSample} und sagt, was gilt.
 */
export class LandingMachine {
  private currentState: LandingState = 'far';
  /** Restzeit bis der Autopilot uebernimmt (Zustand `cleared`). */
  private hold = 0;
  /** Fortschritt 0..1 in `descending`/`ascending`. */
  private progressValue = 0;
  /** Dauer des laufenden Manoevers in s. */
  private durationValue = 0;
  private lastMessage = '';

  constructor(readonly params: LandingParams = DEFAULT_LANDING_PARAMS) {}

  get state(): LandingState {
    return this.currentState;
  }

  get progress(): number {
    return this.progressValue;
  }

  get duration(): number {
    return this.durationValue;
  }

  /** Letzte Rueckmeldung (Freigabe, Absage, Verfall). */
  get message(): string {
    return this.lastMessage;
  }

  /**
   * True, solange der Autopilot Position und Lage bestimmt und die
   * Steuereingaben verworfen werden.
   */
  get controlsShip(): boolean {
    const s = this.currentState;
    return s === 'descending' || s === 'landed' || s === 'ascending';
  }

  /** Steht das Schiff auf dem Fels? */
  get isLanded(): boolean {
    return this.currentState === 'landed';
  }

  /**
   * True, sobald der Landeplatz feststeht: ab dem Sinkflug bis zum Ende des
   * Abhebens darf die Rumpfkollision mit *diesem* Brocken nicht mehr
   * ansprechen, sonst zerlegt die Landung das Schiff.
   */
  get holdsSite(): boolean {
    return this.controlsShip;
  }

  /** Ein Schritt. Rueckgabe ist der Zustand *nach* dem Schritt. */
  update(dt: number, sample: LandingSample): LandingState {
    switch (this.currentState) {
      case 'far':
        if (sample.hasTarget && sample.landable && sample.altitude < this.params.rangeIn) {
          this.currentState = 'in-range';
        }
        break;

      case 'in-range':
        if (!sample.hasTarget || !sample.landable || sample.altitude > this.params.rangeOut) {
          this.currentState = 'far';
        }
        break;

      case 'cleared':
        // Die Freigabe gilt nur, solange das Ziel steht und das Schiff in der
        // Naehe bleibt — ein Zielwechsel waehrend des Wartens hebt sie auf.
        if (!sample.hasTarget || !sample.landable) {
          this.currentState = 'far';
          this.lastMessage = 'LANDEFREIGABE VERFALLEN — ZIEL VERLOREN';
          break;
        }
        if (sample.altitude > this.params.clearanceExpire) {
          this.currentState = 'in-range';
          this.lastMessage = 'LANDEFREIGABE VERFALLEN';
          break;
        }
        this.hold -= dt;
        if (this.hold <= 0) {
          this.currentState = 'descending';
          this.progressValue = 0;
          this.durationValue = this.descentDurationFor(sample.altitude);
          this.lastMessage = 'AUTOPILOT UEBERNIMMT';
        }
        break;

      case 'descending':
        this.progressValue = Math.min(this.progressValue + dt / this.durationValue, 1);
        if (this.progressValue >= 1) {
          this.currentState = 'landed';
          this.lastMessage = 'AUFGESETZT';
        }
        break;

      case 'landed':
        break;

      case 'ascending':
        this.progressValue = Math.min(this.progressValue + dt / this.durationValue, 1);
        if (this.progressValue >= 1) {
          this.currentState = 'far';
          this.progressValue = 0;
          this.durationValue = 0;
          this.lastMessage = 'ABGEHOBEN — STEUERUNG FREI';
        }
        break;
    }
    return this.currentState;
  }

  /**
   * Landung anfordern (Taste L). Waehrend `cleared` bricht ein zweiter Druck
   * den Anflug wieder ab — sonst sitzt der Pilot in einem Manoever fest, das
   * er versehentlich ausgeloest hat.
   */
  requestLanding(sample: LandingSample): LandingClearance {
    if (this.currentState === 'cleared') {
      this.currentState = 'in-range';
      this.lastMessage = 'SINKFLUG ABGEBROCHEN';
      return { granted: false, reason: 'state', message: this.lastMessage };
    }
    if (this.currentState !== 'far' && this.currentState !== 'in-range') {
      this.lastMessage = 'MANOEVER LAEUFT';
      return { granted: false, reason: 'state', message: this.lastMessage };
    }

    const result = evaluateLandingClearance(sample, this.params);
    this.lastMessage = result.message;
    if (result.granted) {
      this.currentState = 'cleared';
      this.hold = this.params.clearanceHold;
    }
    return result;
  }

  /** Abheben (Taste L). Nur aus `landed` heraus. */
  requestLiftoff(): boolean {
    if (this.currentState !== 'landed') return false;
    this.currentState = 'ascending';
    this.progressValue = 0;
    this.durationValue = this.params.liftoffDuration;
    this.lastMessage = 'ABHEBEN';
    return true;
  }

  /**
   * Notaus: zurueck in den freien Flug. Braucht es, wenn der Landeplatz unter
   * dem Schiff verschwindet — ein zerschossener oder nachgewachsener Brocken
   * hinterliesse sonst ein Schiff, das an einem Punkt im Nichts klebt.
   */
  abort(message = ''): void {
    this.currentState = 'far';
    this.progressValue = 0;
    this.durationValue = 0;
    this.hold = 0;
    if (message) this.lastMessage = message;
  }

  /**
   * Naeher heran = kuerzerer Sinkflug. Untere Grenze, damit es auch aus 50 m
   * nicht nach Ruck aussieht, obere, damit es nicht langweilt.
   */
  private descentDurationFor(altitude: number): number {
    const p = this.params;
    const raw = p.minDescentDuration + Math.max(altitude, 0) * p.descentDurationPerMeter;
    return Math.min(Math.max(raw, p.minDescentDuration), p.maxDescentDuration);
  }
}

// ------------------------------------------------------------------- Bahn

/**
 * Die Bahn ist dieselbe Struktur wie beim Andocken — quadratische Bezierkurve
 * mit eigener Zeitkennlinie. Nur die Achse ist eine andere: statt der
 * Buchtachse fuehrt hier die Flaechennormale.
 */
export type LandingPath = DockPath;

export { sampleDockPath as sampleLandingPath, shiftDockPath as shiftLandingPath };

const _n = new Vector3();
const _forward = new Vector3();
const _tmp = new Vector3();
const _mat = new Matrix4();
const _scale = new Vector3();

/**
 * Aufsetzpose aus Oberflaechenpunkt und Normale.
 *
 * Das Schiff steht **auf** dem Fels: die Mitte liegt um die Rumpfhoehe ueber
 * dem Aufsetzpunkt, und die Hochachse (+Y) faellt mit der Flaechennormalen
 * zusammen. Die Nase behaelt ihre Richtung, wird aber in die Tangentialebene
 * projiziert — sonst bohrte sie sich beim Ausrichten in den Boden.
 */
export function computeTouchdownPose(
  surface: SurfaceSample,
  shipQuaternion: Quaternion,
  hullHeight: number,
  out: Pose,
): Pose {
  _n.copy(surface.normal).normalize();
  out.position.copy(surface.point).addScaledVector(_n, hullHeight);

  _forward.set(0, 0, -1).applyQuaternion(shipQuaternion);
  _forward.addScaledVector(_n, -_forward.dot(_n));
  if (_forward.lengthSq() < 1e-8) {
    // Nase zeigt senkrecht auf den Fels: irgendeine Tangente tut es, Haupt-
    // sache sie ist stabil. Die Weltachse nehmen, die am wenigsten fluchtet.
    _forward.set(0, 1, 0).addScaledVector(_n, -_n.y);
    if (_forward.lengthSq() < 1e-8) _forward.set(1, 0, 0).addScaledVector(_n, -_n.x);
  }
  _forward.normalize();

  quaternionLookingAlong(_forward, _n, out.quaternion);
  return out;
}

/**
 * Sinkkurve aufbauen. `normal` ist die Flaechennormale am Aufsetzpunkt,
 * `entrySpeed` die Bahngeschwindigkeit im Moment der Uebernahme.
 *
 * Der Stuetzpunkt liegt ueber dem Aufsetzpunkt auf der Normalen: die Kurve
 * zieht das Schiff also erst ueber den Landeplatz und laesst es dann senkrecht
 * heruntersinken. Er wird nie hoeher gelegt als das Schiff selbst steht, sonst
 * stiege der Anflug aus geringer Hoehe erst wieder auf.
 */
export function createDescentPath(
  ship: Pose,
  touchdown: Pose,
  normal: Vector3,
  duration: number,
  entrySpeed: number,
  params: LandingParams = DEFAULT_LANDING_PARAMS,
): LandingPath {
  const distance = ship.position.distanceTo(touchdown.position);
  const hold = Math.min(params.approachHold, Math.max(distance * 0.6, 20));
  const control = touchdown.position.clone().addScaledVector(_n.copy(normal).normalize(), hold);

  // Grobe Bogenlaenge: Sehne plus halber Umweg ueber den Stuetzpunkt.
  const length =
    0.5 * (distance + ship.position.distanceTo(control) + control.distanceTo(touchdown.position));
  const entryRate = length > 1e-3 ? (entrySpeed * duration) / length : 0;

  return {
    start: { position: ship.position.clone(), quaternion: ship.quaternion.clone() },
    control,
    end: { position: touchdown.position.clone(), quaternion: touchdown.quaternion.clone() },
    duration,
    entryRate,
    // Frueh ausgedreht: die letzten 25 % sinkt das Schiff bereits waagerecht
    // zur Flaeche, damit es nicht auf einer Kufe aufsetzt.
    alignStart: 0,
    alignEnd: 0.75,
  };
}

/**
 * Abhebebahn: senkrecht von der Flaeche weg, Lage bleibt. Wer gerade gelandet
 * ist, will erst Abstand — die Richtung sucht er sich danach selbst.
 */
export function createAscentPath(
  from: Pose,
  normal: Vector3,
  params: LandingParams = DEFAULT_LANDING_PARAMS,
): LandingPath {
  _n.copy(normal).normalize();
  const end = from.position.clone().addScaledVector(_n, params.liftoffHeight);
  return {
    start: { position: from.position.clone(), quaternion: from.quaternion.clone() },
    control: from.position.clone().addScaledVector(_n, params.liftoffHeight * 0.5),
    end: { position: end, quaternion: from.quaternion.clone() },
    duration: params.liftoffDuration,
    // Kein Anfangsschwung: das Schiff steht. Damit ist die Kennlinie ein
    // reiner Ease-in-out.
    entryRate: 0,
    alignStart: 0,
    alignEnd: 1,
  };
}

// --------------------------------------------------------------- Verankerung

/**
 * Optionale Erweiterung des Feldes: die Eigendrehung eines Brockens.
 *
 * {@link AsteroidField} kennt sie nicht — fuer Bergbau und Radar reicht der
 * Mittelpunkt. Ein aufgesetztes Schiff braucht sie aber, sonst dreht der Fels
 * unter ihm weg. Siehe {@link readAsteroidOrientation}.
 */
export interface OrientedAsteroidField {
  getOrientation(index: number, out: Quaternion): Quaternion;
}

interface InstancedLike {
  getMatrixAt(index: number, matrix: Matrix4): void;
}

/**
 * Eigendrehung eines Brockens lesen — mit Rueckfallebene.
 *
 * 1. Meldet das Feld `getOrientation`, gilt das.
 * 2. Sonst wird die Instanzmatrix ausgelesen (jedes InstancedMesh kann das).
 *    Das Feld selbst wird nur verschoben, nie gedreht; die Instanzdrehung ist
 *    damit auch die Weltdrehung.
 * 3. Kann das Feld beides nicht, bleibt es bei der Einheitsdrehung: das Schiff
 *    folgt dann der Drift, aber nicht der Rotation.
 */
export function readAsteroidOrientation(
  field: AsteroidField,
  index: number,
  out: Quaternion,
): Quaternion {
  const oriented = field as Partial<OrientedAsteroidField>;
  if (typeof oriented.getOrientation === 'function') {
    return oriented.getOrientation(index, out);
  }
  const instanced = field as unknown as Partial<InstancedLike>;
  if (typeof instanced.getMatrixAt === 'function') {
    instanced.getMatrixAt(index, _mat);
    _mat.decompose(_tmp, out, _scale);
    return out.normalize();
  }
  return out.identity();
}

/**
 * Festmacher auf der Oberflaeche.
 *
 * Die Pose des aufgesetzten Schiffs wird **nicht** einmal gesetzt, sondern
 * jeden Frame aus dem Brocken abgeleitet: gemerkt wird sie relativ zu dessen
 * Mittelpunkt und Eigendrehung. Nur so haelt sie, wenn der Fels weiterdreht
 * und driftet — und einen Floating-Origin-Sprung ueberlebt sie nebenbei auch,
 * weil der Mittelpunkt jedes Mal frisch abgefragt wird.
 */
export class SurfaceAnchor {
  private readonly localPosition = new Vector3();
  private readonly localQuaternion = new Quaternion();
  private readonly inverse = new Quaternion();
  private captured = false;

  get isSet(): boolean {
    return this.captured;
  }

  /** Weltpose relativ zum Brocken merken. */
  capture(
    center: Vector3,
    orientation: Quaternion,
    position: Vector3,
    quaternion: Quaternion,
  ): void {
    this.inverse.copy(orientation).invert();
    this.localPosition.subVectors(position, center).applyQuaternion(this.inverse);
    this.localQuaternion.copy(this.inverse).multiply(quaternion);
    this.captured = true;
  }

  /** Gemerkte Pose in die aktuelle Lage des Brockens zurueckrechnen. */
  apply(
    center: Vector3,
    orientation: Quaternion,
    outPosition: Vector3,
    outQuaternion: Quaternion,
  ): void {
    outPosition.copy(this.localPosition).applyQuaternion(orientation).add(center);
    outQuaternion.copy(orientation).multiply(this.localQuaternion);
  }

  clear(): void {
    this.captured = false;
  }
}
