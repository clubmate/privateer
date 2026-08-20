import { Matrix4, Quaternion, Vector3 } from 'three';

/**
 * Andocklogik ohne Renderabhaengigkeit: Zustandsmaschine, Freigabepruefung und
 * die Bahn des Autopiloten. Alles hier rechnet mit Zahlen und Vektoren, damit
 * es kopflos testbar bleibt (siehe Docking.test.ts); die Anbindung an Schiff,
 * Station und Anzeige macht {@link DockingController}.
 */

/**
 * Zustaende des Andockvorgangs.
 *
 * ```
 * far -> in-range -> cleared -> docking -> docked -> undocking -> far
 *          ^            |                              |
 *          +------------+ (Freigabe verfaellt)         +-> far
 * ```
 */
export type DockingState = 'far' | 'in-range' | 'cleared' | 'docking' | 'docked' | 'undocking';

/** Warum eine Freigabeanforderung abgelehnt wurde. */
export type DenialReason = 'range' | 'corridor' | 'angle' | 'speed' | 'state';

export interface DockingParams {
  /** Ab hier gilt die Station als in Reichweite (Anflugmarker), in m. */
  rangeIn: number;
  /** Erst hier faellt sie wieder auf `far` zurueck — Hysterese gegen Flackern. */
  rangeOut: number;
  /** Hoechstentfernung fuer eine Freigabe, in m. */
  clearanceRange: number;
  /** Ab dieser Entfernung verfaellt eine erteilte Freigabe wieder, in m. */
  clearanceExpire: number;
  /** Hoechstgeschwindigkeit bei der Freigabe, in m/s. */
  clearanceSpeed: number;
  /** Groesster Winkel zwischen Nase und Einflugachse, in rad. */
  maxNoseAngle: number;
  /** Groesster Winkel zwischen Schiffsposition und Achse (Anflugkegel), in rad. */
  maxCorridorAngle: number;
  /** Sekunden zwischen Freigabe und Uebernahme durch den Autopiloten. */
  clearanceHold: number;
  /** Stuetzpunkt des Anflugbogens auf der Achse, in m vor der Bucht. */
  approachHold: number;
  /** Kuerzeste und laengste Dauer des Andockmanoevers, in s. */
  minDockDuration: number;
  maxDockDuration: number;
  /** Sekunden pro Meter Anfangsentfernung fuer die Dauer dazwischen. */
  dockDurationPerMeter: number;
  /** Dauer des Ablegens in s und Strecke, die dabei zurueckgelegt wird, in m. */
  undockDuration: number;
  undockDistance: number;
}

export const DEFAULT_DOCKING_PARAMS: DockingParams = {
  rangeIn: 3000,
  rangeOut: 3400,
  clearanceRange: 1500,
  clearanceExpire: 2400,
  clearanceSpeed: 100,
  maxNoseAngle: (35 * Math.PI) / 180,
  maxCorridorAngle: (60 * Math.PI) / 180,
  clearanceHold: 1.6,
  approachHold: 420,
  minDockDuration: 8,
  maxDockDuration: 12,
  dockDurationPerMeter: 1 / 250,
  undockDuration: 8,
  undockDistance: 620,
};

/** Messwerte eines Frames, aus denen die Logik entscheidet. */
export interface DockingSample {
  /** Entfernung Schiff -> Andockpunkt in m. */
  distance: number;
  /** Bahngeschwindigkeit des Schiffs in m/s. */
  speed: number;
  /** Winkel zwischen Schiffsnase und Einflugachse (in die Bucht), in rad. */
  noseAngle: number;
  /**
   * Winkel zwischen der Achse aus der Bucht heraus und der Richtung zum
   * Schiff, in rad. Klein = das Schiff steht vor dem Maul, gross = es haengt
   * seitlich oder hinter der Station.
   */
  corridorAngle: number;
}

export type ClearanceResult =
  | { granted: true; message: string }
  | { granted: false; reason: DenialReason; message: string };

/** Meldungstexte der Station — ASCII, wie das uebrige HUD. */
export const CLEARANCE_GRANTED = 'FREIGABE ERTEILT — BUCHT OFFEN';

function deg(rad: number): number {
  return Math.round((rad * 180) / Math.PI);
}

/**
 * Physische Freigabekriterien. Geprueft wird in der Reihenfolge, in der ein
 * Pilot die Fehler beheben wuerde: erst hinfliegen, dann vor das Maul, dann
 * ausrichten, dann bremsen. Gemeldet wird nur der erste Verstoss — zwei
 * Fehlermeldungen gleichzeitig liest niemand.
 */
export function evaluateClearance(
  sample: DockingSample,
  params: DockingParams = DEFAULT_DOCKING_PARAMS,
): ClearanceResult {
  if (sample.distance > params.clearanceRange) {
    return {
      granted: false,
      reason: 'range',
      message: `AUSSER REICHWEITE (${Math.round(sample.distance)} M, MAX ${params.clearanceRange} M)`,
    };
  }
  if (sample.corridorAngle > params.maxCorridorAngle) {
    return {
      granted: false,
      reason: 'corridor',
      message: `ANFLUGKORRIDOR VERLASSEN (${deg(sample.corridorAngle)} GRAD ABSEITS)`,
    };
  }
  if (sample.noseAngle > params.maxNoseAngle) {
    return {
      granted: false,
      reason: 'angle',
      message: `ANFLUGWINKEL (${deg(sample.noseAngle)} GRAD, MAX ${deg(params.maxNoseAngle)} GRAD)`,
    };
  }
  if (sample.speed > params.clearanceSpeed) {
    return {
      granted: false,
      reason: 'speed',
      message: `ZU SCHNELL (${Math.round(sample.speed)} M/S, MAX ${params.clearanceSpeed} M/S)`,
    };
  }
  return { granted: true, message: CLEARANCE_GRANTED };
}

/**
 * Zustandsmaschine des Andockens. Kennt weder Three-Objekte noch Eingaben —
 * sie bekommt je Schritt einen {@link DockingSample} und sagt, was gilt.
 */
export class DockingMachine {
  private currentState: DockingState = 'far';
  /** Restzeit bis der Autopilot uebernimmt (Zustand `cleared`). */
  private hold = 0;
  /** Fortschritt 0..1 in `docking`/`undocking`. */
  private progressValue = 0;
  /** Dauer des laufenden Manoevers in s. */
  private durationValue = 0;
  private lastMessage = '';

  constructor(readonly params: DockingParams = DEFAULT_DOCKING_PARAMS) {}

  get state(): DockingState {
    return this.currentState;
  }

  /** Fortschritt 0..1 des laufenden An- oder Ablegemanoevers. */
  get progress(): number {
    return this.progressValue;
  }

  /** Dauer des laufenden Manoevers in s (0, wenn keins laeuft). */
  get duration(): number {
    return this.durationValue;
  }

  /** Letzte Rueckmeldung der Station (Freigabe, Ablehnung, Verfall). */
  get message(): string {
    return this.lastMessage;
  }

  /**
   * True, solange der Autopilot Position und Lage des Schiffs bestimmt und die
   * Steuereingaben verworfen werden.
   */
  get controlsShip(): boolean {
    const s = this.currentState;
    return s === 'docking' || s === 'docked' || s === 'undocking';
  }

  /** Ein Schritt. Rueckgabe ist der Zustand *nach* dem Schritt. */
  update(dt: number, sample: DockingSample): DockingState {
    switch (this.currentState) {
      case 'far':
        if (sample.distance < this.params.rangeIn) this.currentState = 'in-range';
        break;

      case 'in-range':
        if (sample.distance > this.params.rangeOut) this.currentState = 'far';
        break;

      case 'cleared':
        // Die Freigabe gilt nur, solange das Schiff auch in der Naehe bleibt.
        if (sample.distance > this.params.clearanceExpire) {
          this.currentState = 'in-range';
          this.lastMessage = 'FREIGABE VERFALLEN';
          break;
        }
        this.hold -= dt;
        if (this.hold <= 0) {
          this.currentState = 'docking';
          this.progressValue = 0;
          this.durationValue = this.dockDurationFor(sample.distance);
          this.lastMessage = 'AUTOPILOT UEBERNIMMT';
        }
        break;

      case 'docking':
        this.progressValue = Math.min(this.progressValue + dt / this.durationValue, 1);
        if (this.progressValue >= 1) {
          this.currentState = 'docked';
          this.lastMessage = 'ANGEDOCKT';
        }
        break;

      case 'docked':
        break;

      case 'undocking':
        this.progressValue = Math.min(this.progressValue + dt / this.durationValue, 1);
        if (this.progressValue >= 1) {
          this.currentState = 'far';
          this.progressValue = 0;
          this.durationValue = 0;
          this.lastMessage = 'ABGELEGT — STEUERUNG FREI';
        }
        break;
    }
    return this.currentState;
  }

  /**
   * Freigabe anfordern (KeyG). Waehrend `cleared` bricht ein zweiter Druck den
   * Anflug wieder ab — sonst sitzt der Pilot in einem Manoever fest, das er
   * versehentlich ausgeloest hat.
   */
  requestClearance(sample: DockingSample): ClearanceResult {
    if (this.currentState === 'cleared') {
      this.currentState = 'in-range';
      this.lastMessage = 'ANFLUG ABGEBROCHEN';
      return { granted: false, reason: 'state', message: this.lastMessage };
    }
    if (this.currentState !== 'far' && this.currentState !== 'in-range') {
      this.lastMessage = 'KEINE FREIGABE MOEGLICH';
      return { granted: false, reason: 'state', message: this.lastMessage };
    }

    const result = evaluateClearance(sample, this.params);
    this.lastMessage = result.message;
    if (result.granted) {
      this.currentState = 'cleared';
      this.hold = this.params.clearanceHold;
    }
    return result;
  }

  /** Ablegen (KeyG oder Menuepunkt). Nur aus `docked` heraus. */
  requestUndock(): boolean {
    if (this.currentState !== 'docked') return false;
    this.currentState = 'undocking';
    this.progressValue = 0;
    this.durationValue = this.params.undockDuration;
    this.lastMessage = 'ABLEGEMANOEVER';
    return true;
  }

  /** Notaus: zurueck in den freien Flug, ohne Meldung. */
  reset(): void {
    this.currentState = 'far';
    this.progressValue = 0;
    this.durationValue = 0;
    this.hold = 0;
  }

  /**
   * Naeher heran = kuerzeres Manoever. Untere Grenze, damit es auch aus
   * 200 m nicht nach Ruck aussieht, obere, damit es nicht langweilt.
   */
  private dockDurationFor(distance: number): number {
    const p = this.params;
    const raw = p.minDockDuration + distance * p.dockDurationPerMeter;
    return Math.min(Math.max(raw, p.minDockDuration), p.maxDockDuration);
  }
}

// ------------------------------------------------------------------- Bahn

export interface Pose {
  position: Vector3;
  quaternion: Quaternion;
}

/**
 * Bahn des Autopiloten als quadratische Bezierkurve. Der Stuetzpunkt liegt auf
 * der Einflugachse vor der Bucht: dadurch zieht die Kurve das Schiff erst auf
 * die Achse und faehrt dann geradeaus hinein, statt schraeg durch die
 * Bucht-Wand zu schneiden.
 */
export interface DockPath {
  start: Pose;
  /** Stuetzpunkt der Bezierkurve (auf der Achse). */
  control: Vector3;
  end: Pose;
  duration: number;
  /** Normierte Anfangsgeschwindigkeit der Zeitkennlinie, 0..1.2. */
  entryRate: number;
  /** Zeitfenster 0..1, in dem die Lage ausgedreht wird. */
  alignStart: number;
  alignEnd: number;
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Zeitkennlinie mit vorgegebener Anfangssteigung: `h(0)=0`, `h(1)=1`,
 * `h'(0)=rate`, `h'(1)=0`.
 *
 * Ein reiner Ease-in-out faengt mit Geschwindigkeit null an — das Schiff kommt
 * aber mit bis zu 100 m/s an und wuerde im Moment der Uebernahme sichtbar
 * stehenbleiben. Mit `rate` = normierter Anfangsgeschwindigkeit geht der
 * Autopilot nahtlos aus der Flugbewegung hervor und bremst weich aus.
 */
export function easeWithEntry(t: number, rate: number): number {
  const x = clamp01(t);
  const v = Math.min(Math.max(rate, 0), 1.2);
  return clamp01(v * x + (3 - 2 * v) * x * x + (v - 2) * x * x * x);
}

/** Klassischer Ease-in-out (Geschwindigkeit null an beiden Enden). */
export function smoothstep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

const _m = new Matrix4();
const _dir = new Vector3();
const _up = new Vector3();
const ZERO = new Vector3();

/**
 * Lage, in der die Nase (-Z) entlang `forward` zeigt. `up` gibt nur die
 * Rollreferenz; steht es fast parallel zu `forward`, wird ausgewichen.
 */
export function quaternionLookingAlong(forward: Vector3, up: Vector3, out: Quaternion): Quaternion {
  // Object3D-Konvention: die lookAt-Matrix legt +Z auf (eye - target). Die Nase
  // ist -Z, also muss +Z entgegen der Flugrichtung stehen.
  _dir.copy(forward).normalize().negate();
  _up.copy(up).normalize();
  // Entartete Referenz ausweichen: die Achse waehlen, die am wenigsten mit der
  // Flugrichtung fluchtet.
  if (Math.abs(_up.dot(_dir)) > 0.99) {
    if (Math.abs(_dir.y) < 0.9) _up.set(0, 1, 0);
    else _up.set(1, 0, 0);
  }
  _m.lookAt(_dir, ZERO, _up);
  return out.setFromRotationMatrix(_m);
}

/**
 * Anflugbahn aufbauen. `axisOut` zeigt aus der Bucht heraus (Einheitsvektor),
 * `entrySpeed` ist die Bahngeschwindigkeit im Moment der Uebernahme.
 */
export function createDockPath(
  ship: Pose,
  dock: Pose,
  axisOut: Vector3,
  duration: number,
  entrySpeed: number,
  params: DockingParams = DEFAULT_DOCKING_PARAMS,
): DockPath {
  const distance = ship.position.distanceTo(dock.position);
  // Stuetzpunkt nicht weiter draussen als das Schiff selbst — sonst wuerde die
  // Kurve aus kurzer Distanz erst wieder nach aussen ziehen.
  const hold = Math.min(params.approachHold, Math.max(distance * 0.65, 60));
  const control = dock.position.clone().addScaledVector(axisOut, hold);

  // Grobe Bogenlaenge: Sehne plus halber Umweg ueber den Stuetzpunkt.
  const length =
    0.5 * (distance + ship.position.distanceTo(control) + control.distanceTo(dock.position));
  const entryRate = length > 1e-3 ? (entrySpeed * duration) / length : 0;

  return {
    start: { position: ship.position.clone(), quaternion: ship.quaternion.clone() },
    control,
    end: { position: dock.position.clone(), quaternion: dock.quaternion.clone() },
    duration,
    entryRate,
    // Ausgedreht wird frueh: die letzten 30 % gehen achsparallel in die Bucht.
    alignStart: 0,
    alignEnd: 0.7,
  };
}

/**
 * Ablegebahn: erst geradlinig rueckwaerts aus der Bucht, dann in der zweiten
 * Haelfte um 180 Grad herumschwenken, damit der Pilot nach dem Ablegen die
 * Station im Ruecken hat und nicht die Bucht-Rueckwand ansieht.
 */
export function createUndockPath(
  dock: Pose,
  axisOut: Vector3,
  up: Vector3,
  params: DockingParams = DEFAULT_DOCKING_PARAMS,
): DockPath {
  const end = dock.position.clone().addScaledVector(axisOut, params.undockDistance);
  const endQuat = quaternionLookingAlong(axisOut, up, new Quaternion());
  return {
    start: { position: dock.position.clone(), quaternion: dock.quaternion.clone() },
    control: dock.position.clone().addScaledVector(axisOut, params.undockDistance * 0.5),
    end: { position: end, quaternion: endQuat },
    duration: params.undockDuration,
    entryRate: 0,
    alignStart: 0.45,
    alignEnd: 1,
  };
}

/** Pose zum Zeitpunkt `t` (0..1) auf der Bahn. */
export function sampleDockPath(
  path: DockPath,
  t: number,
  outPosition: Vector3,
  outQuaternion: Quaternion,
): void {
  const u = easeWithEntry(t, path.entryRate);
  const inv = 1 - u;

  // Quadratische Bezierkurve: (1-u)^2*A + 2(1-u)u*C + u^2*B
  outPosition
    .copy(path.start.position)
    .multiplyScalar(inv * inv)
    .addScaledVector(path.control, 2 * inv * u)
    .addScaledVector(path.end.position, u * u);

  const span = Math.max(path.alignEnd - path.alignStart, 1e-4);
  const rot = smoothstep((clamp01(t) - path.alignStart) / span);
  outQuaternion.copy(path.start.quaternion).slerp(path.end.quaternion, rot);
}

/** Floating Origin: alle Weltpunkte der Bahn mitverschieben. */
export function shiftDockPath(path: DockPath, offset: Vector3): void {
  path.start.position.sub(offset);
  path.control.sub(offset);
  path.end.position.sub(offset);
}
