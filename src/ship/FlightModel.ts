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
};

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

  /** Flight-Assist (Rotationsdaempfung + Geschwindigkeitsregelung). */
  assistEnabled = true;
  /** Sollgeschwindigkeit entlang der Nase in m/s (0..maxSetSpeed). */
  setSpeed = 0;

  private fullStopActive = false;

  private readonly params: ShipPhysicsParams;
  private readonly invQuat = new Quaternion();
  private readonly stepQuat = new Quaternion();
  private readonly axis = new Vector3();
  private readonly velLocal = new Vector3();
  private readonly accelLocal = new Vector3();

  constructor(
    private readonly ship: Object3D,
    params: Partial<ShipPhysicsParams> = {},
  ) {
    this.params = { ...DEFAULT_SHIP_PARAMS, ...params };
  }

  getParams(): Readonly<ShipPhysicsParams> {
    return this.params;
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

  /** V: Flight-Assist umschalten. */
  toggleAssist(): boolean {
    this.assistEnabled = !this.assistEnabled;
    return this.assistEnabled;
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
    this.integrateRotation(dt);
    this.integrateTranslation(dt);
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
