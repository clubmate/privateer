import { Euler, Matrix4, Quaternion, Vector3 } from 'three';
import type { Object3D, PerspectiveCamera } from 'three';
import type { Input } from '../core/Input';
import type { Hud } from '../hud/Hud';
import type { Ship } from '../ship/Ship';
import type { SeatedController } from './SeatedController';
import type { WalkController } from './WalkController';
import { labelOf, type Interactable, type Interactables } from './Interactables';

export type PlayerMode = 'seated' | 'walking';

/** Aufstehen/Hinsetzen (PLAN.md). */
const TOGGLE_KEY = 'KeyF';
/** Reichweite fuer den Hinsetzen-Prompt, horizontal im Schiffslokalraum. */
const SIT_RANGE = 1.5;
/** Dauer des Kamera-Blends zwischen Sitz- und Stehpose. */
const BLEND_DURATION = 0.5;
/** So lange nach dem Aufstehen wird die Gehen-Hilfe eingeblendet. */
const INFO_DURATION = 3.5;

const PROMPT_STAND = 'F — AUFSTEHEN';
const PROMPT_SIT = 'F — HINSETZEN';
const PROMPT_WALK_HELP = 'WASD — GEHEN · MAUS — UMSEHEN';

export interface PlayerStateDeps {
  input: Input;
  ship: Ship;
  camera: PerspectiveCamera;
  seated: SeatedController;
  walk: WalkController;
  hud: Hud;
  /** Anfassbare Punkte an Bord; fehlt sie, gibt es nur den Sitz. */
  interactables?: Interactables;
}

const _mat = new Matrix4();
const _seatMat = new Matrix4();
const _pos = new Vector3();
const _scale = new Vector3();
const _euler = new Euler(0, 0, 0, 'YXZ');

/**
 * State-Machine SEATED <-> WALKING.
 *
 * SEATED: die Kamera haengt mit Identitaetstransform am Marker `Seat_Pilot`,
 * der {@link SeatedController} steuert das Schiff. WALKING: die Kamera haengt
 * direkt am Schiffs-Rig und wird vom {@link WalkController} gesetzt; das
 * FlightModel laeuft unveraendert weiter (Flight-Assist haelt Kurs).
 *
 * `update()` laeuft einmal pro Frame (Tastenflanken gelten genau einen Frame),
 * `fixedUpdate()` im Physikschritt, `updateCamera()` im Renderpfad.
 */
export class PlayerState {
  private mode: PlayerMode = 'seated';

  /** 0..1 Fortschritt des Posen-Blends; 1 = fertig. */
  private blend = 1;
  private readonly blendPos = new Vector3();
  private readonly blendQuat = new Quaternion();

  private infoTimer = 0;
  /** Sitzposition im Schiffslokalraum (Marker bewegt sich relativ zum Schiff nicht). */
  private readonly seatLocal = new Vector3();

  private readonly input: Input;
  private readonly ship: Ship;
  private readonly camera: PerspectiveCamera;
  private readonly seated: SeatedController;
  private readonly walk: WalkController;
  private readonly hud: Hud;
  private readonly interactables: Interactables | undefined;

  constructor(deps: PlayerStateDeps) {
    this.input = deps.input;
    this.ship = deps.ship;
    this.camera = deps.camera;
    this.seated = deps.seated;
    this.walk = deps.walk;
    this.hud = deps.hud;
    this.interactables = deps.interactables;

    this.refreshInterior();
  }

  getMode(): PlayerMode {
    return this.mode;
  }

  get isWalking(): boolean {
    return this.mode === 'walking';
  }

  /**
   * Nach `ship.setInterior()` aufrufen: Marker und Kollisionsboxen neu lesen,
   * Kamera wieder anhaengen bzw. Spieler auf den Aufstehpunkt setzen.
   */
  refreshInterior(): void {
    this.walk.rebuildCollision();
    this.localPosition(this.ship.getSeatPilot(), this.seatLocal);

    if (this.mode === 'seated') {
      this.attachToSeat();
      this.blend = 1;
    } else {
      this.localPosition(this.ship.getStandPilot(), _pos);
      this.walk.reset(_pos, this.walk.yaw, this.walk.pitch);
    }
  }

  /** Zustand und Eingaben, einmal pro Frame. */
  update(dt: number): void {
    if (this.blend < 1) this.blend = Math.min(this.blend + dt / BLEND_DURATION, 1);

    if (this.mode === 'seated') this.updateSeated();
    else this.updateWalking(dt);
  }

  /** Laufphysik im festen Timestep. */
  fixedUpdate(dt: number): void {
    if (this.mode === 'walking') this.walk.update(dt);
  }

  /** Kamerapose setzen — im Renderpfad, direkt vor `updateMatrixWorld()`. */
  updateCamera(): void {
    const t = smoothstep(this.blend);

    if (this.mode === 'walking') {
      this.walk.getEyePosition(this.camera.position);
      this.walk.getQuaternion(this.camera.quaternion);
    } else {
      // Sitzend: Identitaet auf dem Sitzmarker.
      this.camera.position.set(0, 0, 0);
      this.camera.quaternion.identity();
    }

    // Kurzer Blend aus der zuletzt gehaltenen Pose (Sitz <-> Stehen).
    if (t < 1) {
      this.camera.position.lerp(this.blendPos, 1 - t);
      this.camera.quaternion.slerp(this.blendQuat, 1 - t);
    }
  }

  // ------------------------------------------------------------- Zustaende

  private updateSeated(): void {
    if (this.input.wasPressed(TOGGLE_KEY)) {
      this.standUp();
      return;
    }
    this.hud.showPrompt(PROMPT_STAND);
  }

  private updateWalking(dt: number): void {
    this.walk.updateLook();

    // Sitz und angemeldete Interaktionspunkte konkurrieren um dieselbe Taste;
    // es gewinnt, was naeher ist. Sonst verdeckt eine Reparaturstelle im
    // Cockpit den Hinsetzen-Prompt (oder umgekehrt).
    const seatDistance = this.seatDistance();
    const item = this.interactables?.findNearest(this.walk.position) ?? null;
    const itemDistance = item
      ? this.interactables!.distanceTo(this.walk.position, item)
      : Infinity;
    const seatWins = seatDistance < SIT_RANGE && seatDistance <= itemDistance;
    const active: Interactable | null = seatWins ? null : item;

    if (this.input.wasPressed(TOGGLE_KEY)) {
      if (seatWins) {
        this.sitDown();
        return;
      }
      if (active) {
        active.activate();
        return;
      }
    }

    if (this.infoTimer > 0) this.infoTimer -= dt;

    if (seatWins) this.hud.showPrompt(PROMPT_SIT);
    else if (active) this.hud.showPrompt(labelOf(active));
    else if (this.infoTimer > 0) this.hud.showPrompt(PROMPT_WALK_HELP);
    else this.hud.hidePrompt();
  }

  /** Horizontaler Abstand zum Sitzmarker im Schiffslokalraum. */
  private seatDistance(): number {
    const dx = this.walk.position.x - this.seatLocal.x;
    const dz = this.walk.position.z - this.seatLocal.z;
    return Math.hypot(dx, dz);
  }

  // ------------------------------------------------------------ Uebergaenge

  private standUp(): void {
    this.seated.disable();

    // Startpose des Blends: aktuelle Sitzpose, ausgedrueckt im Schiffslokalraum.
    this.localMatrix(this.ship.getSeatPilot(), _seatMat);
    _seatMat.decompose(this.blendPos, this.blendQuat, _scale);

    // Blickrichtung uebernehmen, damit beim Aufstehen nichts springt.
    _euler.setFromQuaternion(this.blendQuat, 'YXZ');

    this.localPosition(this.ship.getStandPilot(), _pos);
    this.walk.rebuildCollision();
    this.walk.reset(_pos, _euler.y, 0);

    // Kamera vom Sitz loesen und ans Schiffs-Rig haengen.
    this.ship.add(this.camera);
    this.camera.scale.set(1, 1, 1);

    this.mode = 'walking';
    this.blend = 0;
    this.infoTimer = INFO_DURATION;
    this.hud.setMode('walking');
    this.hud.showPrompt(PROMPT_WALK_HELP);
  }

  private sitDown(): void {
    // Aktuelle Kamerapose (Schiffslokalraum) in Sitzkoordinaten umrechnen, damit
    // der Blend zur Identitaet auf dem Sitz sauber startet.
    _mat.compose(this.camera.position, this.camera.quaternion, _scale.set(1, 1, 1));
    this.localMatrix(this.ship.getSeatPilot(), _seatMat);
    _mat.premultiply(_seatMat.invert());
    _mat.decompose(this.blendPos, this.blendQuat, _scale);

    this.ship.getSeatPilot().add(this.camera);
    this.camera.position.copy(this.blendPos);
    this.camera.quaternion.copy(this.blendQuat);
    this.camera.scale.set(1, 1, 1);

    this.mode = 'seated';
    this.blend = 0;
    this.seated.enable();
    this.hud.setMode('seated');
    this.hud.showPrompt(PROMPT_STAND);
  }

  // --------------------------------------------------------------- Helfer

  /** Kamera starr auf den Sitzmarker setzen (Cockpitansicht). */
  private attachToSeat(): void {
    this.ship.getSeatPilot().add(this.camera);
    this.camera.position.set(0, 0, 0);
    this.camera.quaternion.identity();
    this.camera.scale.set(1, 1, 1);
  }

  /** Transform eines Markers relativ zum Schiffs-Rig. */
  private localMatrix(object: Object3D, out: Matrix4): Matrix4 {
    this.ship.updateMatrixWorld(true);
    out.copy(this.ship.matrixWorld).invert().multiply(object.matrixWorld);
    return out;
  }

  private localPosition(object: Object3D, out: Vector3): Vector3 {
    this.localMatrix(object, _mat);
    return out.setFromMatrixPosition(_mat);
  }
}

/** Weiche Ein-/Ausblendung fuer den Posenwechsel. */
function smoothstep(t: number): number {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * (3 - 2 * x);
}
