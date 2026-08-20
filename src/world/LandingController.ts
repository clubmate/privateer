import { Object3D, Quaternion, Vector3 } from 'three';
import type { Input } from '../core/Input';
import type { FlightModel } from '../ship/FlightModel';
import { SIZE_CLASSES, type AsteroidField, type SurfaceSample } from './AsteroidTypes';
import { LandingComms } from '../ui/LandingComms';
import { LandingDust, LandingMarker, type LandingMarkerMode } from './LandingVisuals';
import {
  computeTouchdownPose,
  createAscentPath,
  createDescentPath,
  createLandingSample,
  DEFAULT_LANDING_PARAMS,
  LandingMachine,
  readAsteroidOrientation,
  sampleLandingPath,
  shiftLandingPath,
  SurfaceAnchor,
  type LandingParams,
  type LandingPath,
  type LandingSample,
  type LandingState,
} from './Landing';

/**
 * Bindeglied zwischen der reinen Landelogik ({@link LandingMachine}), dem
 * Schiff, dem Asteroidenfeld und der Anzeige. Hier passiert alles, was
 * Three-Objekte anfasst; die Entscheidungen faellt die Zustandsmaschine.
 *
 * Wie beim Andocken kommt der Autopilot ohne Aenderung am {@link FlightModel}
 * aus: solange er fuehrt, werden dessen Eingaben genullt und Position und Lage
 * des Schiffs nach der Integration ueberschrieben.
 *
 * Der Unterschied zur Station: der Landeplatz haelt nicht still. Der Brocken
 * dreht sich und driftet, also wird die Pose des aufgesetzten Schiffs **jeden
 * Frame** neu aus ihm abgeleitet (siehe {@link SurfaceAnchor}) — einmal setzen
 * und liegenlassen hiesse, im naechsten Frame durch den Fels zu fallen.
 */

/** Taste fuer Landung und Abheben. */
const KEY = 'KeyL';

/** So lange steht eine Meldung, in Sekunden. */
const MESSAGE_DURATION = 4.5;

/** Stoss beim Aufsetzen und beim Loesen, 0..1 fuer {@link CameraShake.add}. */
const TOUCHDOWN_IMPULSE = 0.5;
const LIFTOFF_IMPULSE = 0.22;

export interface LandingControllerDeps {
  ship: Object3D;
  flight: FlightModel;
  /** Nur ueber das Interface — das Feld selbst wird gerade umgebaut. */
  field: AsteroidField;
  input: Input;
  /** Index des erfassten Ziels, -1 wenn keins. */
  getTargetIndex: () => number;
  /** Laeuft der Spieler gerade durchs Schiff? Dann ist er nicht am Steuer. */
  isWalking?: () => boolean;
  /**
   * Kollision mit dem Landeplatz aussetzen. Bekommt den Index des Brockens,
   * auf dem gelandet wird, sonst -1. Ohne das zerlegt die Rumpfkollision die
   * eigene Landung.
   */
  setCollisionExempt?: (index: number) => void;
  /** Stoss auf die Kamera, 0..1 — z. B. `(a) => shake.add(a)`. */
  onImpulse?: (amount: number) => void;
  params?: Partial<LandingParams>;
}

const _center = new Vector3();
const _orientation = new Quaternion();
const _normal = new Vector3();
const _pos = new Vector3();
const _quat = new Quaternion();

export class LandingController {
  readonly machine: LandingMachine;
  /** Landemarker und Staub. Gehoert in die Weltschicht (WORLD_LAYER). */
  readonly visuals = new Object3D();

  private readonly ship: Object3D;
  private readonly flight: FlightModel;
  private readonly field: AsteroidField;
  private readonly input: Input;
  private readonly getTargetIndex: () => number;
  private readonly isWalking: () => boolean;
  private readonly setCollisionExempt: (index: number) => void;
  private readonly onImpulse: (amount: number) => void;
  private readonly params: LandingParams;

  private readonly comms = new LandingComms();
  private readonly marker = new LandingMarker();
  private readonly dust = new LandingDust();

  private readonly sample: LandingSample = createLandingSample();
  private readonly surface: SurfaceSample = { point: new Vector3(), normal: new Vector3() };
  /** Aufsetzpose, waehrend des Sinkflugs jeden Frame nachgefuehrt. */
  private readonly touchdown = { position: new Vector3(), quaternion: new Quaternion() };
  private readonly anchor = new SurfaceAnchor();

  private path: LandingPath | null = null;
  /** Hoehe des Bezier-Stuetzpunktes ueber dem Aufsetzpunkt, in m. */
  private holdDistance = 0;
  /** Brocken, auf dem gelandet wird bzw. der anvisiert ist. -1 = keiner. */
  private site = -1;
  /** Generation des Landeplatzes — wechselt sie, ist es ein anderer Brocken. */
  private siteGeneration = -1;
  private exempt = -1;
  private previousState: LandingState = 'far';
  private messageTimer = 0;
  private hintText = '';

  constructor(deps: LandingControllerDeps) {
    this.ship = deps.ship;
    this.flight = deps.flight;
    this.field = deps.field;
    this.input = deps.input;
    this.getTargetIndex = deps.getTargetIndex;
    this.isWalking = deps.isWalking ?? (() => false);
    this.setCollisionExempt = deps.setCollisionExempt ?? (() => {});
    this.onImpulse = deps.onImpulse ?? (() => {});
    this.params = { ...DEFAULT_LANDING_PARAMS, ...deps.params };
    this.machine = new LandingMachine(this.params);

    this.visuals.name = 'Landing';
    this.visuals.add(this.marker, this.dust);
  }

  // ------------------------------------------------- Schnittstelle Bergbau

  /** Steht das Schiff auf einem Brocken? */
  isLanded(): boolean {
    return this.machine.isLanded;
  }

  /** Index des Brockens, auf dem das Schiff steht; -1, wenn es fliegt. */
  getLandedIndex(): number {
    return this.machine.isLanded ? this.site : -1;
  }

  /**
   * Ertragsfaktor fuer den Foerderstrahl: 1 im Flug, mehr aus dem Stand. Wer
   * aufgesetzt hat, haelt den Strahl ruhig auf derselben Stelle — das ist der
   * Grund, ueberhaupt zu landen.
   */
  getYieldBonus(): number {
    return this.machine.isLanded ? this.params.landedYieldBonus : 1;
  }

  /** True, solange der Autopilot fuehrt — das HUD kann das anzeigen. */
  get isAutopilot(): boolean {
    return this.machine.controlsShip;
  }

  // ----------------------------------------------------------- Spielschleife

  /**
   * Einmal pro Frame, **nach** `asteroids.update()` (der Brocken muss auf
   * seiner aktuellen Lage stehen) und **vor** `scene.updateMatrixWorld()`.
   */
  update(dt: number): void {
    this.measure();

    if (!this.isWalking() && this.input.wasPressed(KEY)) this.handleKey();

    const state = this.machine.update(dt, this.sample);
    if (state !== this.previousState) {
      this.onStateChange(this.previousState, state);
      this.previousState = state;
    }

    // Verliert der Landeplatz seine Gueltigkeit (zerschossen, nachgewachsen),
    // wird das Manoever abgebrochen — sonst klebte das Schiff an einem Punkt
    // im Nichts.
    if (this.machine.holdsSite && !this.siteIsValid()) {
      this.machine.abort();
      this.previousState = this.machine.state;
      this.releaseShip('LANDEPLATZ VERLOREN — STEUERUNG FREI');
    } else if (this.machine.controlsShip) {
      this.driveShip();
    }

    this.updateExemption();
    if (this.messageTimer > 0) this.messageTimer -= dt;
    this.updateVisuals(dt);
    this.updateDisplays();
  }

  /** Floating Origin: die laufende Bahn mitverschieben. */
  shift(offset: Vector3): void {
    if (this.path) shiftLandingPath(this.path, offset);
    // Marker, Staub und die verankerte Pose haengen am Brocken und werden
    // jeden Frame aus dessen Mittelpunkt neu abgeleitet — die brauchen nichts.
  }

  dispose(): void {
    this.comms.dispose();
    this.marker.dispose();
    this.dust.dispose();
  }

  // ------------------------------------------------------------- Messung

  private measure(): void {
    // Steht der Landeplatz fest, zaehlt nur noch er: ein Zielwechsel mitten im
    // Sinkflug darf das Manoever nicht auf einen anderen Brocken umlenken.
    const index = this.machine.holdsSite ? this.site : this.getTargetIndex();
    const s = this.sample;

    s.hasTarget = index >= 0 && index < this.field.count && this.field.isAlive(index);
    if (!s.hasTarget) {
      s.landable = false;
      s.hasSurface = false;
      s.altitude = Infinity;
      s.sizeName = '';
      s.speed = this.flight.getSpeed();
      if (!this.machine.holdsSite) this.site = -1;
      return;
    }

    if (!this.machine.holdsSite) this.site = index;
    s.landable = this.field.isLandable(index);
    s.sizeName = SIZE_CLASSES[this.field.getSizeClass(index)].name;
    s.hasSurface = this.field.sampleSurface(index, this.ship.position, this.surface);
    s.altitude = s.hasSurface ? this.ship.position.distanceTo(this.surface.point) : Infinity;
    s.speed = this.flight.getSpeed();
  }

  /** Ist der gemerkte Landeplatz noch derselbe Brocken? */
  private siteIsValid(): boolean {
    if (this.site < 0 || this.site >= this.field.count) return false;
    if (!this.field.isAlive(this.site)) return false;
    return this.field.getGeneration(this.site) === this.siteGeneration;
  }

  // ------------------------------------------------------------- Eingabe

  private handleKey(): void {
    if (this.machine.state === 'landed') {
      this.machine.requestLiftoff();
      return;
    }
    const result = this.machine.requestLanding(this.sample);
    this.comms.showMessage(
      result.granted ? result.message : `LANDEANFORDERUNG: ${result.message}`,
      result.granted,
    );
    this.messageTimer = MESSAGE_DURATION;
    this.hintText = '';
  }

  // ---------------------------------------------------------- Uebergaenge

  private onStateChange(from: LandingState, to: LandingState): void {
    if (to === 'descending') {
      this.beginDescent();
    } else if (to === 'landed') {
      this.onTouchdown();
    } else if (to === 'ascending') {
      this.beginAscent();
    } else if (from === 'ascending') {
      this.releaseShip();
    } else if (to === 'in-range' && from === 'cleared') {
      this.comms.showMessage(`LANDEANFORDERUNG: ${this.machine.message}`, false);
      this.messageTimer = MESSAGE_DURATION;
    }
  }

  private beginDescent(): void {
    this.siteGeneration = this.field.getGeneration(this.site);
    // Aufsetzpunkt festlegen und **relativ zum Brocken** merken: waehrend der
    // naechsten Sekunden dreht er sich weiter, der Zielpunkt muss mitgehen.
    this.field.sampleSurface(this.site, this.ship.position, this.surface);
    computeTouchdownPose(
      this.surface,
      this.ship.quaternion,
      this.params.hullHeight,
      this.touchdown,
    );
    this.field.getCenter(this.site, _center);
    readAsteroidOrientation(this.field, this.site, _orientation);
    this.anchor.capture(_center, _orientation, this.touchdown.position, this.touchdown.quaternion);

    this.path = createDescentPath(
      { position: this.ship.position, quaternion: this.ship.quaternion },
      this.touchdown,
      this.surface.normal,
      this.machine.duration,
      this.flight.getSpeed(),
      this.params,
    );
    this.holdDistance = this.path.control.distanceTo(this.touchdown.position);

    this.comms.showMessage('AUTOPILOT — SINKFLUG LAEUFT', true);
    this.messageTimer = MESSAGE_DURATION;
  }

  private onTouchdown(): void {
    this.path = null;
    this.dust.burst(1);
    this.onImpulse(TOUCHDOWN_IMPULSE);
    this.comms.showMessage('AUFGESETZT — L HEBT WIEDER AB', true);
    this.messageTimer = MESSAGE_DURATION;
  }

  private beginAscent(): void {
    // Senkrecht weg von der Flaeche: die Hochachse des aufgesetzten Schiffs
    // *ist* die Flaechennormale.
    _normal.set(0, 1, 0).applyQuaternion(this.ship.quaternion);
    this.path = createAscentPath(
      { position: this.ship.position.clone(), quaternion: this.ship.quaternion.clone() },
      _normal,
      this.params,
    );
    this.anchor.clear();
    this.dust.burst(0.55);
    this.onImpulse(LIFTOFF_IMPULSE);
    this.comms.showMessage('ABHEBEN — LANDESTUETZEN EINGEFAHREN', true);
    this.messageTimer = MESSAGE_DURATION;
  }

  /** Steuerung zurueck an den Piloten. */
  private releaseShip(message = 'STEUERUNG FREI'): void {
    this.path = null;
    this.anchor.clear();
    this.site = -1;
    this.siteGeneration = -1;
    this.flight.velocity.set(0, 0, 0);
    this.flight.angularVelocity.set(0, 0, 0);
    this.flight.setSetSpeed(0);
    this.flight.cancelFullStop();
    this.flight.clearInputs();
    this.comms.showMessage(message, true);
    this.messageTimer = MESSAGE_DURATION;
  }

  // ------------------------------------------------------------ Autopilot

  /**
   * Pose des Schiffs setzen und das Flugmodell stilllegen. Das Ueberschreiben
   * passiert *nach* dessen Integration, deshalb bleibt vom Eigenantrieb nichts
   * uebrig — auch dann nicht, wenn der Pilot waehrenddessen an der Steuerung
   * haengt oder gerade durchs Schiff laeuft.
   */
  private driveShip(): void {
    const state = this.machine.state;

    if (state === 'landed') {
      // Jeden Frame frisch aus dem Brocken: er dreht sich weiter und driftet.
      this.field.getCenter(this.site, _center);
      readAsteroidOrientation(this.field, this.site, _orientation);
      this.anchor.apply(_center, _orientation, _pos, _quat);
    } else if (this.path && state === 'descending') {
      // Auch das Ziel wandert. Ende und Stuetzpunkt der Kurve werden deshalb
      // jeden Frame nachgezogen, bevor auf ihr abgetastet wird.
      this.field.getCenter(this.site, _center);
      readAsteroidOrientation(this.field, this.site, _orientation);
      this.anchor.apply(_center, _orientation, this.touchdown.position, this.touchdown.quaternion);
      _normal.set(0, 1, 0).applyQuaternion(this.touchdown.quaternion);
      this.path.end.position.copy(this.touchdown.position);
      this.path.end.quaternion.copy(this.touchdown.quaternion);
      this.path.control.copy(this.touchdown.position).addScaledVector(_normal, this.holdDistance);
      sampleLandingPath(this.path, this.machine.progress, _pos, _quat);
    } else if (this.path) {
      sampleLandingPath(this.path, this.machine.progress, _pos, _quat);
    } else {
      return;
    }

    this.ship.position.copy(_pos);
    this.ship.quaternion.copy(_quat);

    this.flight.velocity.set(0, 0, 0);
    this.flight.angularVelocity.set(0, 0, 0);
    this.flight.setSetSpeed(0);
    this.flight.cancelFullStop();
    this.flight.clearInputs();
  }

  /** Kollision mit dem Landeplatz aussetzen bzw. wieder scharfschalten. */
  private updateExemption(): void {
    const index = this.machine.holdsSite ? this.site : -1;
    if (index === this.exempt) return;
    this.exempt = index;
    this.setCollisionExempt(index);
  }

  // ------------------------------------------------------------- Anzeige

  private updateVisuals(dt: number): void {
    const state = this.machine.state;
    const mode: LandingMarkerMode =
      state === 'in-range'
        ? 'in-range'
        : state === 'cleared'
          ? 'cleared'
          : state === 'descending'
            ? 'descending'
            : 'hidden';

    if (mode === 'descending') {
      _normal.set(0, 1, 0).applyQuaternion(this.touchdown.quaternion);
      _pos.copy(this.touchdown.position).addScaledVector(_normal, -this.params.hullHeight);
      this.marker.update(dt, mode, _pos, _normal, this.ship.position.distanceTo(_pos));
    } else if (mode !== 'hidden' && this.sample.hasSurface) {
      this.marker.update(dt, mode, this.surface.point, this.surface.normal, this.sample.altitude);
    } else {
      this.marker.update(dt, 'hidden', this.surface.point, this.surface.normal, 0);
    }

    // Der Staub haengt am Aufsetzpunkt und damit am Brocken: die Gruppe folgt
    // der verankerten Pose, die Koerner rechnen in deren lokalem System.
    if (this.anchor.isSet) {
      this.dust.position.copy(this.ship.position);
      this.dust.quaternion.copy(this.ship.quaternion);
    }
    this.dust.update(dt);
  }

  private updateDisplays(): void {
    const state = this.machine.state;
    // In Reichweite steht der Hinweis dauerhaft — solange keine Meldung ihn
    // ueberdeckt. Die Hoehe wird gerundet, sonst schreibt das DOM jeden Frame.
    const showHint = state === 'in-range' && this.messageTimer <= 0 && !this.isWalking();
    if (showHint) {
      const rounded = Math.round(this.sample.altitude / 10) * 10;
      const text = `L — LANDEN · ${rounded} M UEBER GRUND`;
      if (text !== this.hintText) {
        this.comms.showMessage(text, true);
        this.hintText = text;
      }
    } else if (this.hintText) {
      this.hintText = '';
    }

    this.comms.update({
      state,
      progress: this.machine.progress,
      altitude: Number.isFinite(this.sample.altitude) ? this.sample.altitude : 0,
      speed: this.sample.speed,
      showMessage: this.messageTimer > 0 || showHint,
    });
  }
}
