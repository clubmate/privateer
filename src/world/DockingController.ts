import { Quaternion, Vector3 } from 'three';
import type { Object3D } from 'three';
import type { Input } from '../core/Input';
import type { FlightModel } from '../ship/FlightModel';
import type { Station } from './Station';
import type { StationTrade } from './StationTrade';
import type { MarkerMode } from './ApproachMarker';
import { DockingComms } from '../ui/DockingComms';
import { StationPanel } from '../ui/StationPanel';
import {
  createDockPath,
  createUndockPath,
  DockingMachine,
  sampleDockPath,
  shiftDockPath,
  type DockingSample,
  type DockingState,
  type DockPath,
} from './Docking';

/**
 * Bindeglied zwischen der reinen Andocklogik ({@link DockingMachine}), dem
 * Schiff und der Anzeige. Hier passiert alles, was Three-Objekte anfasst; die
 * Entscheidungen selbst faellt die Zustandsmaschine.
 *
 * Der Autopilot kommt ohne Aenderung am {@link FlightModel} aus: solange er
 * fuehrt, werden dessen Eingaben genullt und Position und Lage des Schiffs
 * nach der Integration ueberschrieben. Das Flugmodell rechnet also weiter,
 * bewegt aber nichts mehr.
 */

/** Taste fuer Freigabe und Ablegen. */
const KEY = 'KeyG';

/** So lange steht eine Rueckmeldung der Station, in Sekunden. */
const MESSAGE_DURATION = 4.5;

export interface DockingControllerDeps {
  ship: Object3D;
  flight: FlightModel;
  station: Station;
  input: Input;
  trade: StationTrade;
}

const _dockPos = new Vector3();
const _dockQuat = new Quaternion();
const _axis = new Vector3();
const _axisIn = new Vector3();
const _up = new Vector3();
const _nose = new Vector3();
const _toShip = new Vector3();
const _pos = new Vector3();
const _quat = new Quaternion();

function angleBetween(a: Vector3, b: Vector3): number {
  return Math.acos(Math.min(Math.max(a.dot(b), -1), 1));
}

export class DockingController {
  readonly machine = new DockingMachine();
  readonly panel: StationPanel;

  private readonly ship: Object3D;
  private readonly flight: FlightModel;
  private readonly station: Station;
  private readonly input: Input;

  private readonly comms = new DockingComms();
  private readonly sample: DockingSample = {
    distance: Infinity,
    speed: 0,
    noseAngle: 0,
    corridorAngle: 0,
  };

  private path: DockPath | null = null;
  private previousState: DockingState = 'far';
  private messageTimer = 0;

  constructor(deps: DockingControllerDeps) {
    this.ship = deps.ship;
    this.flight = deps.flight;
    this.station = deps.station;
    this.input = deps.input;

    this.panel = new StationPanel({
      trade: deps.trade,
      info: deps.station.info,
      onUndock: () => this.machine.requestUndock(),
      onClose: () => this.input.requestPointerLock(),
    });
  }

  /** Einmal pro Frame, vor `scene.updateMatrixWorld()`. */
  update(dt: number): void {
    this.station.update(dt);
    this.measure();

    if (this.input.wasPressed(KEY)) this.handleKey();

    const state = this.machine.update(dt, this.sample);
    if (state !== this.previousState) {
      this.onStateChange(this.previousState, state);
      this.previousState = state;
    }

    if (this.machine.controlsShip) this.driveShip();

    if (this.messageTimer > 0) this.messageTimer -= dt;
    this.updateDisplays();
  }

  /** Floating Origin: Station und laufende Bahn mitverschieben. */
  shift(offset: Vector3): void {
    this.station.shift(offset);
    if (this.path) shiftDockPath(this.path, offset);
  }

  /** True, solange der Autopilot fuehrt — das HUD kann das anzeigen. */
  get isAutopilot(): boolean {
    return this.machine.controlsShip;
  }

  dispose(): void {
    this.panel.dispose();
    this.comms.dispose();
  }

  // ------------------------------------------------------------- Messung

  private measure(): void {
    this.station.getDockPosition(_dockPos);
    this.station.getDockAxis(_axis);

    this.sample.distance = this.ship.position.distanceTo(_dockPos);
    this.sample.speed = this.flight.getSpeed();

    // Winkel zwischen Nase und der Achse *in* die Bucht hinein.
    _nose.set(0, 0, -1).applyQuaternion(this.ship.quaternion);
    this.sample.noseAngle = angleBetween(_nose, _axisIn.copy(_axis).negate());

    // Steht das Schiff ueberhaupt vor dem Maul? Direkt am Andockpunkt ist die
    // Frage sinnlos — dann gilt der Korridor als eingehalten.
    _toShip.copy(this.ship.position).sub(_dockPos);
    if (_toShip.lengthSq() < 1e-4) {
      this.sample.corridorAngle = 0;
    } else {
      this.sample.corridorAngle = angleBetween(_toShip.normalize(), _axis);
    }
  }

  // ------------------------------------------------------------- Eingabe

  private handleKey(): void {
    if (this.machine.state === 'docked') {
      this.machine.requestUndock();
      return;
    }
    const result = this.machine.requestClearance(this.sample);
    this.comms.showMessage(
      result.granted ? result.message : `ANDOCKKONTROLLE: ${result.message}`,
      result.granted,
    );
    this.messageTimer = MESSAGE_DURATION;
  }

  // ---------------------------------------------------------- Uebergaenge

  private onStateChange(from: DockingState, to: DockingState): void {
    if (to === 'docking') {
      this.beginDocking();
    } else if (to === 'docked') {
      this.panel.open();
      // Menue ist mit der Maus bedienbar — der Zeiger muss frei sein.
      this.input.exitPointerLock();
      this.comms.showMessage(`ANGEDOCKT — BUCHT ${this.station.info.bay}`, true);
      this.messageTimer = MESSAGE_DURATION;
    } else if (to === 'undocking') {
      this.beginUndocking();
      this.panel.close();
    } else if (from === 'undocking') {
      this.releaseShip();
    } else if (to === 'in-range' && from === 'cleared') {
      this.comms.showMessage(`ANDOCKKONTROLLE: ${this.machine.message}`, false);
      this.messageTimer = MESSAGE_DURATION;
    }
  }

  private beginDocking(): void {
    this.station.getDockPosition(_dockPos);
    this.station.getDockQuaternion(_dockQuat);
    this.station.getDockAxis(_axis);

    this.path = createDockPath(
      { position: this.ship.position, quaternion: this.ship.quaternion },
      { position: _dockPos, quaternion: _dockQuat },
      _axis,
      this.machine.duration,
      this.flight.getSpeed(),
      this.machine.params,
    );
    this.comms.showMessage('AUTOPILOT — ANFLUG LAEUFT', true);
    this.messageTimer = MESSAGE_DURATION;
  }

  private beginUndocking(): void {
    this.station.getDockPosition(_dockPos);
    this.station.getDockQuaternion(_dockQuat);
    this.station.getDockAxis(_axis);
    this.station.getDockUp(_up);

    this.path = createUndockPath(
      { position: _dockPos, quaternion: _dockQuat },
      _axis,
      _up,
      this.machine.params,
    );
    this.comms.showMessage('ABLEGEN — KLAMMERN GELOEST', true);
    this.messageTimer = MESSAGE_DURATION;
  }

  /** Steuerung zurueck an den Piloten. */
  private releaseShip(): void {
    this.path = null;
    this.flight.velocity.set(0, 0, 0);
    this.flight.angularVelocity.set(0, 0, 0);
    this.flight.setSetSpeed(0);
    this.flight.cancelFullStop();
    this.flight.clearInputs();
    this.comms.showMessage('STEUERUNG FREI', true);
    this.messageTimer = MESSAGE_DURATION;
  }

  // ------------------------------------------------------------ Autopilot

  /**
   * Pose des Schiffs setzen und das Flugmodell stilllegen. Das Ueberschreiben
   * passiert *nach* dessen Integration, deshalb bleibt vom Eigenantrieb nichts
   * uebrig — auch dann nicht, wenn der Pilot waehrenddessen an der Maus haengt.
   */
  private driveShip(): void {
    if (this.machine.state === 'docked') {
      // Im Liegeplatz wird die Pose jeden Frame frisch aus der Station
      // abgeleitet; damit ueberlebt sie auch einen Floating-Origin-Sprung.
      this.station.getDockPosition(_pos);
      this.station.getDockQuaternion(_quat);
    } else if (this.path) {
      sampleDockPath(this.path, this.machine.progress, _pos, _quat);
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

  // ------------------------------------------------------------- Anzeige

  private updateDisplays(): void {
    const state = this.machine.state;
    const mode: MarkerMode =
      state === 'far'
        ? 'far'
        : state === 'in-range'
          ? 'in-range'
          : state === 'cleared'
            ? 'cleared'
            : 'hidden';

    const hint =
      state === 'far'
        ? `HANDELSPOSTEN · SEKTOR ${this.station.info.sector}`
        : state === 'in-range'
          ? 'G — FREIGABE ANFORDERN'
          : 'FREIGABE ERTEILT · ANFLUG FREI';

    this.station.marker.update(mode, this.sample.distance, this.station.info.name, hint);

    this.comms.update({
      state,
      progress: this.machine.progress,
      distance: this.sample.distance,
      speed: this.sample.speed,
      showMessage: this.messageTimer > 0,
    });

    if (this.panel.isOpen) this.panel.refresh();
  }
}
