import { Quaternion, Vector3 } from 'three';
import type { Object3D } from 'three';

/**
 * Steuereingaben eines Physikschritts. Alle Achsen -1..1, Vorzeichen aus
 * Pilotensicht:
 *  - `main`     +1 = Schub vorwaerts (-Z),        -1 = Retroschub
 *  - `lateral`  +1 = Schub nach rechts (+X)
 *  - `vertical` +1 = Schub nach oben (+Y)
 *  - `pitch`    +1 = Nase hoch
 *  - `yaw`      +1 = Nase nach rechts
 *  - `roll`     +1 = im Uhrzeigersinn rollen (rechte Tragflaeche runter)
 */
export interface FlightInputs {
  main: number;
  lateral: number;
  vertical: number;
  pitch: number;
  yaw: number;
  roll: number;
  afterburner: boolean;
}

export function createFlightInputs(): FlightInputs {
  return { main: 0, lateral: 0, vertical: 0, pitch: 0, yaw: 0, roll: 0, afterburner: false };
}

export interface ShipPhysicsParams {
  /** Leermasse inkl. Ladung in kg. */
  mass: number;
  /** Haupttriebwerk (nach vorn) in Newton. */
  mainThrust: number;
  /** Retro-Duesen (nach hinten) in Newton. */
  retroThrust: number;
  /** Manoevrierduesen seitlich in Newton. */
  lateralThrust: number;
  /** Manoevrierduesen hoch/runter in Newton. */
  verticalThrust: number;
  /** Schubfaktor des Nachbrenners auf das Haupttriebwerk. */
  afterburnerFactor: number;
  /** Winkelbeschleunigungen in rad/s^2. */
  pitchAccel: number;
  yawAccel: number;
  rollAccel: number;
  /** Betrag der maximalen Winkelgeschwindigkeit in rad/s. */
  maxAngularVelocity: number;
  /** Faktor auf die Winkelbeschleunigung, wenn der Assist Rotation ausdaempft. */
  angularBrakeFactor: number;
  /** Obergrenze der Sollgeschwindigkeit in m/s. */
  maxSetSpeed: number;
  /** Harte Obergrenze der Bahngeschwindigkeit (Nachbrenner) in m/s. */
  maxSpeed: number;
  /** Schrittweite von W/S pro Tastendruck in m/s. */
  setSpeedStep: number;
  /** Schrittweite von W/S beim Halten in m/s pro Sekunde. */
  setSpeedRate: number;
  /** Kennwerte des Arcade-Modus (siehe {@link ArcadeParams}). */
  arcade: ArcadeParams;
}

/**
 * Arcade-Modus: das Schiff verhaelt sich wie ein Flugzeug im Weltraum statt wie
 * ein Newtonscher Koerper. Die Nase bestimmt die Flugrichtung, es gibt keinen
 * Drift und keinen Nachdreh.
 */
export interface ArcadeParams {
  /** Drehrate bei Vollausschlag in rad/s (Pitch/Yaw). */
  turnRate: number;
  /** Rollrate bei Vollausschlag in rad/s. */
  rollRate: number;
  /** Zeitkonstante, bis die Drehrate der Eingabe folgt, in s. */
  turnSmoothing: number;
  /**
   * Zeitkonstante, mit der der Geschwindigkeitsvektor der Nase folgt, in s.
   * Klein = klebrig wie ein Jaeger, gross = mehr Drift.
   */
  grip: number;
  /** Laengsbeschleunigung auf die Sollgeschwindigkeit in m/s^2. */
  accel: number;
  /** Verzoegerung beim Bremsen in m/s^2. */
  brake: number;
  /** Seitlicher/vertikaler Versatz bei Vollausschlag in m/s. */
  strafeSpeed: number;
  /** Zielgeschwindigkeit des Nachbrenners in m/s. */
  boostSpeed: number;
  /** Beschleunigung des Nachbrenners in m/s^2. */
  boostAccel: number;
}

/**
 * Getunte Werte: ~8 m/s^2 vorwaerts (32 m/s^2 mit Nachbrenner), deutlich
 * schwaechere Quer-/Retroduesen, damit Kursaenderungen traege wirken; die
 * Drehung erreicht ihre Maximalrate in gut einer halben Sekunde.
 */
export const DEFAULT_SHIP_PARAMS: ShipPhysicsParams = {
  mass: 15_000,
  mainThrust: 120_000, // 8.0 m/s^2
  retroThrust: 60_000, // 4.0 m/s^2
  lateralThrust: 52_500, // 3.5 m/s^2
  verticalThrust: 45_000, // 3.0 m/s^2
  afterburnerFactor: 4,
  pitchAccel: 2.4,
  yawAccel: 2.0,
  rollAccel: 3.2,
  maxAngularVelocity: 1.5,
  angularBrakeFactor: 1.35,
  maxSetSpeed: 500,
  maxSpeed: 850,
  setSpeedStep: 10,
  setSpeedRate: 60,
  arcade: {
    turnRate: 1.25, // ~72 Grad/s
    rollRate: 2.2,
    turnSmoothing: 0.07,
    grip: 0.25,
    accel: 70,
    brake: 110,
    strafeSpeed: 60,
    boostSpeed: 780,
    boostAccel: 160,
  },
};

/**
 * Flugmodi, zyklisch ueber V:
 *  - `arcade`: Nase = Flugrichtung, kein Drift, straffe Drehraten (Standard).
 *  - `assist`: Newtonsch mit Flight-Assist (Sollgeschwindigkeit, Drehdaempfung).
 *  - `newton`: rein Newtonsch, W/S sind direkter Schub.
 */
export type FlightMode = 'arcade' | 'assist' | 'newton';

/** Reihenfolge, in der V die Modi durchschaltet. */
export const FLIGHT_MODE_ORDER: readonly FlightMode[] = ['arcade', 'assist', 'newton'];

/** Unterhalb dieser Bahngeschwindigkeit gilt Full Stop als erledigt. */
const FULL_STOP_EPSILON = 0.5;
/** Ab hier zaehlt eine Achse als aktiv gesteuert. */
const INPUT_EPSILON = 0.01;

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

/**
 * Newtonsches Flugmodell mit Flight-Assist. Position und Lage leben direkt auf
 * dem uebergebenen Schiffs-Object3D; das Modell haelt Geschwindigkeit (Welt)
 * und Winkelgeschwindigkeit (schiffslokal).
 *
 * Wird mit festem Timestep getickt (siehe `Time`/`FIXED_DT`).
 */
export class FlightModel {
  /** Bahngeschwindigkeit in Weltkoordinaten, m/s. */
  readonly velocity = new Vector3();
  /** Winkelgeschwindigkeit im Schiffssystem, rad/s (x=Pitch, y/z siehe Konvention). */
  readonly angularVelocity = new Vector3();
  /** Eingaben des naechsten Schritts; der Controller schreibt hier hinein. */
  readonly inputs: FlightInputs = createFlightInputs();

  /** Aktueller Flugmodus; Standard ist Arcade. */
  mode: FlightMode = 'arcade';
  /** Sollgeschwindigkeit entlang der Nase in m/s (0..maxSetSpeed). */
  setSpeed = 0;

  private fullStopActive = false;
  /** Aktuelle Laengsgeschwindigkeit im Arcade-Modus, m/s. */
  private arcadeSpeed = 0;

  private readonly params: ShipPhysicsParams;
  private readonly invQuat = new Quaternion();
  private readonly stepQuat = new Quaternion();
  private readonly axis = new Vector3();
  private readonly velLocal = new Vector3();
  private readonly accelLocal = new Vector3();
  private readonly velTarget = new Vector3();

  constructor(
    private readonly ship: Object3D,
    params: Partial<ShipPhysicsParams> = {},
  ) {
    this.params = { ...DEFAULT_SHIP_PARAMS, ...params };
  }

  getParams(): Readonly<ShipPhysicsParams> {
    return this.params;
  }

  /** True, solange der Modus die Geschwindigkeit regelt (Arcade oder Assist). */
  get assistEnabled(): boolean {
    return this.mode !== 'newton';
  }

  get isArcade(): boolean {
    return this.mode === 'arcade';
  }

  /** Betrag der Bahngeschwindigkeit in m/s. */
  getSpeed(): number {
    return this.velocity.length();
  }

  /** Geschwindigkeitsanteil entlang der Nase (negativ = rueckwaerts), m/s. */
  getForwardSpeed(): number {
    this.axis.set(0, 0, -1).applyQuaternion(this.ship.quaternion);
    return this.velocity.dot(this.axis);
  }

  get fullStop(): boolean {
    return this.fullStopActive;
  }

  /** Sollgeschwindigkeit relativ aendern (W/S). Bricht einen Full Stop ab. */
  adjustSetSpeed(delta: number): void {
    if (delta !== 0) this.fullStopActive = false;
    this.setSpeed = clamp(this.setSpeed + delta, 0, this.params.maxSetSpeed);
  }

  setSetSpeed(value: number): void {
    this.setSpeed = clamp(value, 0, this.params.maxSetSpeed);
  }

  /** X: Sollgeschwindigkeit 0 und aktiv bis zum Stillstand bremsen. */
  requestFullStop(): void {
    this.setSpeed = 0;
    this.fullStopActive = true;
  }

  cancelFullStop(): void {
    this.fullStopActive = false;
  }

  /** V: Flugmodus weiterschalten (Arcade -> Assist -> Newton -> Arcade). */
  cycleMode(): FlightMode {
    const next = FLIGHT_MODE_ORDER[(FLIGHT_MODE_ORDER.indexOf(this.mode) + 1) % FLIGHT_MODE_ORDER.length];
    this.setMode(next);
    return this.mode;
  }

  /**
   * Modus setzen. Beim Wechsel wird der interne Zustand angeglichen, damit die
   * Geschwindigkeit nicht springt: Arcade uebernimmt die aktuelle Vorwaerts-
   * geschwindigkeit, Newton faengt mit dem vorhandenen Vektor an.
   */
  setMode(mode: FlightMode): void {
    if (mode === this.mode) return;
    this.mode = mode;
    this.fullStopActive = false;
    if (mode === 'arcade') {
      this.arcadeSpeed = Math.max(this.getForwardSpeed(), 0);
      this.setSpeed = clamp(this.arcadeSpeed, 0, this.params.maxSetSpeed);
    }
  }

  /** Alle Eingaben nullen (z. B. beim Verlassen des Sitzes). */
  clearInputs(): void {
    const i = this.inputs;
    i.main = 0;
    i.lateral = 0;
    i.vertical = 0;
    i.pitch = 0;
    i.yaw = 0;
    i.roll = 0;
    i.afterburner = false;
  }

  /** Ein Physikschritt mit festem dt. */
  update(dt: number): void {
    if (this.mode === 'arcade') {
      this.integrateArcadeRotation(dt);
      this.integrateArcadeTranslation(dt);
      return;
    }
    this.integrateRotation(dt);
    this.integrateTranslation(dt);
  }

  // ------------------------------------------------------------------ Arcade

  /**
   * Drehung im Arcade-Modus: die Eingabe ist eine *Sollrate*, keine
   * Beschleunigung. Die Rate folgt ihr mit kurzer Zeitkonstante, ohne
   * Eingabe steht die Drehung sofort wieder still.
   */
  private integrateArcadeRotation(dt: number): void {
    const a = this.params.arcade;
    const i = this.inputs;
    const w = this.angularVelocity;

    const follow = 1 - Math.exp(-dt / Math.max(a.turnSmoothing, 1e-4));
    w.x += (clamp(i.pitch, -1, 1) * a.turnRate - w.x) * follow;
    w.y += (-clamp(i.yaw, -1, 1) * a.turnRate - w.y) * follow;
    w.z += (-clamp(i.roll, -1, 1) * a.rollRate - w.z) * follow;

    const speed = w.length();
    const angle = speed * dt;
    if (angle > 1e-9) {
      this.axis.copy(w).normalize();
      this.stepQuat.setFromAxisAngle(this.axis, angle);
      this.ship.quaternion.multiply(this.stepQuat).normalize();
    }
  }

  /**
   * Translation im Arcade-Modus: eine skalare Laengsgeschwindigkeit auf der
   * Nase plus seitlicher Versatz. Der Geschwindigkeitsvektor zieht mit der
   * Zeitkonstante `grip` hinter der Nase her — das gibt Kurven etwas Gewicht,
   * ohne echten Drift.
   */
  private integrateArcadeTranslation(dt: number): void {
    const p = this.params;
    const a = p.arcade;
    const i = this.inputs;

    if (i.afterburner) this.fullStopActive = false;

    const target = i.afterburner ? a.boostSpeed : this.fullStopActive ? 0 : this.setSpeed;
    const rate = i.afterburner ? a.boostAccel : target > this.arcadeSpeed ? a.accel : a.brake;
    const delta = target - this.arcadeSpeed;
    this.arcadeSpeed += clamp(delta, -rate * dt, rate * dt);

    if (this.fullStopActive && Math.abs(this.arcadeSpeed) < FULL_STOP_EPSILON) {
      this.arcadeSpeed = 0;
      this.fullStopActive = false;
    }

    // Sollgeschwindigkeit im Schiffssystem -> Welt.
    this.velTarget.set(
      clamp(i.lateral, -1, 1) * a.strafeSpeed,
      clamp(i.vertical, -1, 1) * a.strafeSpeed,
      -this.arcadeSpeed,
    );
    this.velTarget.applyQuaternion(this.ship.quaternion);

    const follow = 1 - Math.exp(-dt / Math.max(a.grip, 1e-4));
    this.velocity.lerp(this.velTarget, follow);

    const speed = this.velocity.length();
    if (speed > p.maxSpeed) this.velocity.multiplyScalar(p.maxSpeed / speed);

    this.ship.position.addScaledVector(this.velocity, dt);
  }

  // ------------------------------------------------------------------ Drehung

  private integrateRotation(dt: number): void {
    const p = this.params;
    const i = this.inputs;
    const w = this.angularVelocity;

    // Eingaben auf die lokalen Rotationsachsen abbilden: positive Drehung um
    // +X hebt die Nase, um +Y dreht sie nach links, um +Z rollt sie links.
    w.x = this.stepAxis(w.x, clamp(i.pitch, -1, 1), p.pitchAccel, dt);
    w.y = this.stepAxis(w.y, -clamp(i.yaw, -1, 1), p.yawAccel, dt);
    w.z = this.stepAxis(w.z, -clamp(i.roll, -1, 1), p.rollAccel, dt);

    const speed = w.length();
    if (speed > p.maxAngularVelocity) w.multiplyScalar(p.maxAngularVelocity / speed);

    const angle = speed * dt;
    if (angle > 1e-9) {
      this.axis.copy(w).normalize();
      this.stepQuat.setFromAxisAngle(this.axis, angle);
      this.ship.quaternion.multiply(this.stepQuat).normalize();
    }
  }

  /**
   * Eine Rotationsachse fortschreiben: mit Eingabe beschleunigen, ohne Eingabe
   * (und bei aktivem Assist) aktiv auf 0 zurueckregeln.
   */
  private stepAxis(w: number, cmd: number, accel: number, dt: number): number {
    if (Math.abs(cmd) > INPUT_EPSILON) return w + cmd * accel * dt;
    if (!this.assistEnabled) return w;
    const brake = accel * this.params.angularBrakeFactor * dt;
    if (Math.abs(w) <= brake) return 0;
    return w - Math.sign(w) * brake;
  }

  // ------------------------------------------------------------- Translation

  private integrateTranslation(dt: number): void {
    const p = this.params;
    const i = this.inputs;

    const mainAccel = p.mainThrust / p.mass;
    const retroAccel = p.retroThrust / p.mass;
    const lateralAccel = p.lateralThrust / p.mass;
    const verticalAccel = p.verticalThrust / p.mass;

    const burning = i.afterburner;
    if (burning) this.fullStopActive = false;

    // Geschwindigkeit ins Schiffssystem: dort sind die Duesenachsen trivial.
    this.invQuat.copy(this.ship.quaternion).invert();
    this.velLocal.copy(this.velocity).applyQuaternion(this.invQuat);

    const a = this.accelLocal.set(0, 0, 0);
    const braking = this.fullStopActive;
    const regulating = braking || this.assistEnabled;
    // Zielgeschwindigkeit im Schiffssystem: Nase (-Z) mal Sollgeschwindigkeit.
    const targetZ = braking ? 0 : -this.setSpeed;

    // --- Querachse (X)
    if (Math.abs(i.lateral) > INPUT_EPSILON) {
      a.x = clamp(i.lateral, -1, 1) * lateralAccel;
    } else if (regulating) {
      a.x = clamp((0 - this.velLocal.x) / dt, -lateralAccel, lateralAccel);
    }

    // --- Hochachse (Y)
    if (Math.abs(i.vertical) > INPUT_EPSILON) {
      a.y = clamp(i.vertical, -1, 1) * verticalAccel;
    } else if (regulating) {
      a.y = clamp((0 - this.velLocal.y) / dt, -verticalAccel, verticalAccel);
    }

    // --- Laengsachse (Z, Nase = -Z)
    if (burning) {
      // Nachbrenner uebersteuert die Sollgeschwindigkeit komplett.
      a.z = -mainAccel * p.afterburnerFactor;
    } else if (this.assistEnabled || braking) {
      // Assist regelt auf targetZ; nach vorn steht der Hauptschub zur
      // Verfuegung, nach hinten nur die schwaecheren Retroduesen.
      a.z = clamp((targetZ - this.velLocal.z) / dt, -mainAccel, retroAccel);
    } else if (Math.abs(i.main) > INPUT_EPSILON) {
      // Assist AUS: W/S sind direkter Schub, nichts wird geregelt.
      const cmd = clamp(i.main, -1, 1);
      a.z = cmd > 0 ? -cmd * mainAccel : -cmd * retroAccel;
    }

    if (braking && this.velocity.lengthSq() < FULL_STOP_EPSILON * FULL_STOP_EPSILON) {
      // Restgeschwindigkeit wegschneiden statt ewig zu zappeln.
      this.velocity.set(0, 0, 0);
      a.set(0, 0, 0);
      this.fullStopActive = false;
    }

    // Beschleunigung zurueck in Weltkoordinaten und integrieren.
    a.applyQuaternion(this.ship.quaternion);
    this.velocity.addScaledVector(a, dt);

    const speed = this.velocity.length();
    if (speed > p.maxSpeed) this.velocity.multiplyScalar(p.maxSpeed / speed);

    this.ship.position.addScaledVector(this.velocity, dt);
  }
}
