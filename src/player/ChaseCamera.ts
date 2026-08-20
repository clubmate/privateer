import { Matrix4, Quaternion, Vector3 } from 'three';
import type { Object3D, PerspectiveCamera } from 'three';
import type { Ship } from '../ship/Ship';

/**
 * Verfolgerkamera fuer die Aussenansicht.
 *
 * **Warum die Kamera nicht einfach ans Schiffs-Rig gehaengt wird:** starr
 * mitgefuehrt steht das Schiff im Bild absolut still, und der Eindruck von
 * Geschwindigkeit und Drehung geht vollstaendig verloren. Die Kamera folgt
 * deshalb einer *gedaempften* Pose: die Position zieht der Sollposition
 * hinterher, und die Lage, an der der Versatz haengt, folgt der Schiffslage mit
 * einer eigenen, laengeren Zeitkonstante. In einer Kurve schwenkt die Kamera
 * dadurch nach aussen und faellt danach wieder hinter das Heck.
 *
 * **Warum die Kamera trotzdem am Sitzmarker haengen bleibt:** `PlayerState`
 * haengt die Kamera zwischen Sitzmarker und Schiffs-Rig um und blendet dabei
 * Posen. Wer in der Aussenansicht daran ruettelt, zerlegt beim naechsten
 * Aufstehen die Hierarchie. Stattdessen wird die gewuenschte **Weltpose** in
 * den lokalen Raum des Sitzmarkers umgerechnet und dort gesetzt — die
 * Hierarchie bleibt exakt so, wie `PlayerState` sie erwartet, und beim
 * Zurueckschalten setzt `PlayerState` von selbst wieder die Identitaet.
 *
 * Die eigentliche Rechnung steckt in reinen Funktionen und in
 * {@link ChaseCameraState}; die Klasse {@link ChaseCamera} macht nur die
 * Anbindung an Schiff, Kamera und Tastatur.
 */

export type ViewMode = 'cockpit' | 'chase';

/** Umschalttaste (physisch, QWERTZ-sicher wie der Rest der Steuerung). */
export const CHASE_KEY = 'KeyC';

export interface ChaseParams {
  /**
   * Grundversatz im Schiffssystem: +Z ist **hinter** dem Schiff (die Nase
   * zeigt auf -Z), +Y darueber.
   */
  offset: readonly [number, number, number];
  /** Zusaetzlicher Abstand nach hinten bei {@link speedReference}. */
  speedPull: number;
  /** Bahngeschwindigkeit in m/s, bei der `speedPull` voll wirkt. */
  speedReference: number;
  /** Zeitkonstante der Positionsdaempfung in s. */
  positionTau: number;
  /** Zeitkonstante, mit der die Versatzrichtung der Schiffslage folgt, in s. */
  orientationTau: number;
  /** Blickpunkt vor der Schiffsnase in m. */
  lookAhead: number;
  /** Blickpunkt ueber dem Schiffsursprung in m. */
  lookLift: number;
}

/**
 * Getunte Werte. Der Rumpf reicht von z = -5,9 (Nase) bis z = +8,1 (Heck), die
 * Kamera steht also gut sieben Meter hinter dem Heck und etwas darueber.
 * `orientationTau` ist bewusst deutlich groesser als `positionTau`: das
 * Nachziehen in der Kurve ist der Effekt, der die Kamera lebendig macht.
 */
export const DEFAULT_CHASE_PARAMS: ChaseParams = {
  offset: [0, 3.1, 14.0],
  speedPull: 4.5,
  speedReference: 420,
  positionTau: 0.26,
  orientationTau: 0.55,
  lookAhead: 9,
  lookLift: 1.1,
};

/**
 * Daempfungsanteil eines Schrittes: `1 - e^(-dt/tau)`.
 *
 * Ein fester Faktor pro Frame waere von der Bildrate abhaengig — bei 30 fps
 * zoege die Kamera doppelt so traege nach wie bei 60. Diese Form ist
 * bildratenunabhaengig und liefert immer einen Wert in 0..1.
 */
export function smoothingFactor(tau: number, dt: number): number {
  if (!(tau > 0)) return 1;
  if (!(dt > 0)) return 0;
  return 1 - Math.exp(-dt / tau);
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/** Abstand hinter dem Schiff inklusive Geschwindigkeitszuschlag. */
export function chaseDistance(params: ChaseParams, speed: number): number {
  return params.offset[2] + params.speedPull * clamp01(speed / params.speedReference);
}

/**
 * Sollposition der Kamera in Weltkoordinaten. `lagRotation` ist die
 * *nachgezogene* Schiffslage, nicht die aktuelle — daraus entsteht der
 * Schwenk nach aussen.
 */
export function chaseTargetPosition(
  shipPosition: Vector3,
  lagRotation: Quaternion,
  params: ChaseParams,
  speed: number,
  out: Vector3,
): Vector3 {
  out.set(params.offset[0], params.offset[1], chaseDistance(params, speed));
  out.applyQuaternion(lagRotation);
  return out.add(shipPosition);
}

/**
 * Blickpunkt: leicht vor der Nase und etwas ueber dem Ursprung. Direkt auf das
 * Schiff zu blicken klebt den Rumpf in die Bildmitte; der Punkt davor gibt dem
 * Flug Richtung und laesst das Schiff in Kurven aus der Mitte wandern.
 */
export function chaseLookTarget(
  shipPosition: Vector3,
  shipRotation: Quaternion,
  params: ChaseParams,
  out: Vector3,
): Vector3 {
  out.set(0, params.lookLift, -params.lookAhead);
  out.applyQuaternion(shipRotation);
  return out.add(shipPosition);
}

const _lookMatrix = new Matrix4();

/** Drehung, deren -Z von `eye` auf `target` zeigt. */
export function lookRotation(
  eye: Vector3,
  target: Vector3,
  up: Vector3,
  out: Quaternion,
): Quaternion {
  _lookMatrix.lookAt(eye, target, up);
  return out.setFromRotationMatrix(_lookMatrix);
}

/**
 * Zustandswechsel der Ansicht. Beim Gehen gibt es keine Aussenansicht — der
 * Spieler laeuft dann im Schiff herum, und die Kamera gehoert dem
 * {@link WalkController}.
 */
export function nextViewMode(current: ViewMode, pressed: boolean, walking: boolean): ViewMode {
  if (walking) return 'cockpit';
  if (!pressed) return current;
  return current === 'cockpit' ? 'chase' : 'cockpit';
}

const _target = new Vector3();
const _look = new Vector3();
const _up = new Vector3();

/**
 * Der reine Kamerazustand: gedaempfte Position, nachgezogene Lage, daraus die
 * Blickrichtung. Kennt weder Szenengraph noch Renderer und ist damit
 * vollstaendig testbar.
 */
export class ChaseCameraState {
  /** Aktuelle Kameraposition in Weltkoordinaten. */
  readonly position = new Vector3();
  /** Aktuelle Kameradrehung in Weltkoordinaten. */
  readonly rotation = new Quaternion();
  /** Nachgezogene Schiffslage; an ihr haengt der Versatz. */
  readonly lag = new Quaternion();

  readonly params: ChaseParams;
  private started = false;

  constructor(params: Partial<ChaseParams> = {}) {
    this.params = { ...DEFAULT_CHASE_PARAMS, ...params };
  }

  get initialized(): boolean {
    return this.started;
  }

  /** Hart auf die Sollpose setzen — beim Einschalten der Aussenansicht. */
  reset(shipPosition: Vector3, shipRotation: Quaternion, speed = 0): void {
    this.lag.copy(shipRotation);
    chaseTargetPosition(shipPosition, this.lag, this.params, speed, this.position);
    this.aim(shipPosition, shipRotation);
    this.started = true;
  }

  /** Einen Frame weiterdaempfen. */
  step(dt: number, shipPosition: Vector3, shipRotation: Quaternion, speed: number): void {
    if (!this.started) {
      this.reset(shipPosition, shipRotation, speed);
      return;
    }
    this.lag.slerp(shipRotation, smoothingFactor(this.params.orientationTau, dt));
    chaseTargetPosition(shipPosition, this.lag, this.params, speed, _target);
    this.position.lerp(_target, smoothingFactor(this.params.positionTau, dt));
    this.aim(shipPosition, shipRotation);
  }

  /**
   * Blickrichtung neu bestimmen. Die Oben-Richtung kommt aus der nachgezogenen
   * Lage: rollt das Schiff, rollt die Kamera gedaempft mit — ohne das wirkt
   * jede Rolle wie ein Fehler im Bild.
   */
  private aim(shipPosition: Vector3, shipRotation: Quaternion): void {
    chaseLookTarget(shipPosition, shipRotation, this.params, _look);
    _up.set(0, 1, 0).applyQuaternion(this.lag);
    lookRotation(this.position, _look, _up, this.rotation);
  }
}

export interface ChaseUpdate {
  /** True, solange der Spieler steht und laeuft. */
  walking: boolean;
  /** Bahngeschwindigkeit in m/s. */
  speed: number;
  /** True in dem Frame, in dem {@link CHASE_KEY} gedrueckt wurde. */
  toggle: boolean;
}

const _shipMatrix = new Matrix4();
const _seatLocal = new Matrix4();
const _seatWorld = new Matrix4();
const _desired = new Matrix4();
const _scale = new Vector3(1, 1, 1);

/**
 * Bindet {@link ChaseCameraState} an Schiff und Kamera.
 *
 * `update()` muss **nach** `PlayerState.updateCamera()` und **vor**
 * `scene.updateMatrixWorld()` laufen: die Sitzpose wird dort jeden Frame neu
 * gesetzt, und die Aussenansicht ueberschreibt sie anschliessend.
 */
export class ChaseCamera {
  private mode: ViewMode = 'cockpit';
  private readonly state = new ChaseCameraState();

  constructor(
    private readonly ship: Ship,
    private readonly camera: PerspectiveCamera,
  ) {}

  getMode(): ViewMode {
    return this.mode;
  }

  get isChasing(): boolean {
    return this.mode === 'chase';
  }

  update(dt: number, input: ChaseUpdate): ViewMode {
    const previous = this.mode;
    this.mode = nextViewMode(this.mode, input.toggle, input.walking);

    if (this.mode !== 'chase') return this.mode;

    if (previous !== 'chase') {
      this.state.reset(this.ship.position, this.ship.quaternion, input.speed);
    } else {
      this.state.step(dt, this.ship.position, this.ship.quaternion, input.speed);
    }

    this.applyToCamera();
    return this.mode;
  }

  /**
   * Weltpose in den lokalen Raum des Sitzmarkers umrechnen und setzen.
   *
   * Der Marker sitzt fest am Schiff, seine Weltmatrix aus dem letzten Frame ist
   * also gegenueber dem Schiff exakt — nur die Schiffsmatrix selbst muss frisch
   * sein. Genau deshalb wird sie hier aus Position und Lage neu
   * zusammengesetzt, statt `updateMatrixWorld()` ueber den ganzen Innenraum
   * laufen zu lassen: bei 780 m/s haenge die Kamera sonst einen Frame und damit
   * gut dreizehn Meter zurueck.
   */
  private applyToCamera(): void {
    const seat: Object3D = this.ship.getSeatPilot();
    _shipMatrix.compose(this.ship.position, this.ship.quaternion, this.ship.scale);
    _seatLocal.copy(this.ship.matrixWorld).invert().multiply(seat.matrixWorld);
    _seatWorld.multiplyMatrices(_shipMatrix, _seatLocal);

    _desired.compose(this.state.position, this.state.rotation, _scale.set(1, 1, 1));
    _desired.premultiply(_seatWorld.invert());
    _desired.decompose(this.camera.position, this.camera.quaternion, _scale);
    this.camera.scale.set(1, 1, 1);
  }
}
