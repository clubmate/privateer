import { MathUtils, Vector2 } from 'three';
import type { Input } from '../core/Input';
import type { FlightModel } from '../ship/FlightModel';

/** Tastenbelegung sitzend (physische Codes, siehe PLAN.md). */
const KEYS = {
  speedUp: 'KeyW',
  speedDown: 'KeyS',
  rollLeft: 'KeyQ',
  rollRight: 'KeyE',
  strafeLeft: 'KeyA',
  strafeRight: 'KeyD',
  up: 'ShiftLeft',
  down: 'ControlLeft',
  fullStop: 'KeyX',
  mode: 'KeyV',
  afterburner: 'Tab',
} as const;

export interface SeatedControllerOptions {
  /** Maus-Pixel bis zum Vollausschlag des virtuellen Steuerkreuzes. */
  pixelsToFullDeflection: number;
  /** Radius der Totzone im Zentrum, normiert (0..1). */
  deadzone: number;
  /** Kennlinie: >1 macht die Mitte feinfuehliger. */
  responseExponent: number;
  /** Verzoegerung, bis W/S kontinuierlich weiterzaehlen, in Sekunden. */
  repeatDelay: number;
  /**
   * Arcade-Modus: Grad Drehung je Mauspixel. Die Maus steuert dort direkt die
   * Ausrichtung (wie Zielen in einem Shooter) statt einen stehenden Ausschlag
   * aufzubauen; die Drehrate deckelt `arcade.turnRate` im FlightModel.
   */
  degreesPerPixel: number;
  /** Glaettung der gemessenen Mausgeschwindigkeit im Arcade-Modus, in Sekunden. */
  aimSmoothing: number;
}

const DEFAULT_OPTIONS: SeatedControllerOptions = {
  pixelsToFullDeflection: 300,
  deadzone: 0.06,
  responseExponent: 1.6,
  repeatDelay: 0.3,
  degreesPerPixel: 0.08,
  aimSmoothing: 0.035,
};

/**
 * Uebersetzt Tastatur/Maus in `FlightInputs`.
 *
 * **Arcade** (Standard): die Maus dreht das Schiff direkt, Pixel mal
 * {@link SeatedControllerOptions.degreesPerPixel}; steht die Maus still, steht
 * auch die Drehung. Das HUD zeigt den aktuellen Steuerbefehl als Cursor.
 *
 * **Newton**: Maus wie in Privateer — die Mausdeltas summieren sich zu einem
 * virtuellen Offset vom Bildschirmzentrum (geclampt auf den Einheitskreis).
 * Der Offset bleibt stehen, wo der Pilot ihn hinschiebt, und erzeugt
 * proportionalen Pitch-/Yaw-Torque.
 *
 * `update()` laeuft einmal pro Frame (siehe dort). Ueber `enable()`/`disable()`
 * abschaltbar — AP4 (Walk-Mode) schaltet ihn beim Aufstehen ab und beim
 * Hinsetzen wieder an.
 */
export class SeatedController {
  private readonly options: SeatedControllerOptions;
  /** Virtueller Mausoffset, -1..1 in Einheiten der halben Bildhoehe. */
  private readonly offset = new Vector2();
  private readonly mouseDelta = { x: 0, y: 0 };
  /** Geglaettete Mausgeschwindigkeit in Pixel/s (nur Arcade). */
  private readonly aimRate = new Vector2();
  private readonly holdTime = new Map<string, number>();

  private enabled = true;

  constructor(
    private readonly input: Input,
    private readonly flight: FlightModel,
    options: Partial<SeatedControllerOptions> = {},
  ) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  get isEnabled(): boolean {
    return this.enabled;
  }

  /** Steuerung aktivieren (AP4: nach dem Hinsetzen). */
  enable(): void {
    if (this.enabled) return;
    this.enabled = true;
    this.holdTime.clear();
  }

  /**
   * Steuerung abschalten (AP4: beim Aufstehen). Die Flugeingaben werden
   * genullt; das Schiff fliegt mit Flight-Assist auf Kurs weiter.
   */
  disable(): void {
    if (!this.enabled) return;
    this.enabled = false;
    this.offset.set(0, 0);
    this.aimRate.set(0, 0);
    this.flight.clearInputs();
    this.holdTime.clear();
  }

  /** Virtueller Mausoffset fuer das HUD, Komponenten -1..1 (y: +unten). */
  getMouseOffset(): Vector2 {
    return this.offset;
  }

  /**
   * Eingaben abtasten und in `flight.inputs` schreiben.
   *
   * Muss **einmal pro Frame** mit der variablen Delta-Zeit laufen, nicht im
   * fixen Physikschritt: `Input.wasPressed`/`wasReleased` gelten genau einen
   * Frame, und auf schnellen Displays (>120 Hz) enthaelt ein Frame gar keinen
   * Physikschritt — Tastendruecke gingen dann verloren. Die Eingaben sind
   * Pegelsignale, das FlightModel liest sie mit 120 Hz weiter.
   */
  update(dt: number): void {
    if (!this.enabled) return;

    this.updateMouse(dt);
    this.updateSetSpeed(dt);

    const i = this.flight.inputs;
    i.roll = this.axis(KEYS.rollRight, KEYS.rollLeft);
    i.lateral = this.axis(KEYS.strafeRight, KEYS.strafeLeft);
    i.vertical = this.axis(KEYS.up, KEYS.down);
    i.afterburner = this.input.isDown(KEYS.afterburner);

    // Bei Assist AUS ist W/S direkter Schub statt Sollgeschwindigkeit.
    i.main = this.flight.assistEnabled ? 0 : this.axis(KEYS.speedUp, KEYS.speedDown);

    if (this.input.wasPressed(KEYS.mode)) this.flight.cycleMode();
    if (this.input.wasPressed(KEYS.fullStop)) this.flight.requestFullStop();

    // Manueller Schub bricht einen laufenden Full Stop ab.
    if (i.lateral !== 0 || i.vertical !== 0 || i.main !== 0) this.flight.cancelFullStop();
  }

  // ----------------------------------------------------------------- Maus

  private updateMouse(dt: number): void {
    const i = this.flight.inputs;
    if (!this.input.pointerLocked) {
      this.offset.set(0, 0);
      i.pitch = 0;
      i.yaw = 0;
      return;
    }

    this.input.consumeMouseDelta(this.mouseDelta);
    if (this.flight.isArcade) this.updateArcadeAim(dt);
    else this.updateVirtualStick();
  }

  /**
   * Arcade: aus der Mausgeschwindigkeit wird direkt die Drehrate — schnelle
   * Maus, schnelle Drehung, begrenzt auf Vollausschlag. Ohne Mausbewegung ist
   * der Befehl null, das Schiff bleibt auf Kurs.
   *
   * Gemessen wird die *Geschwindigkeit* (geglaettet), nicht der Frame-Weg:
   * Bei mehr Bildern als Physikschritten enthaelt ein Frame keinen Schritt,
   * und ein Weg-pro-Frame-Befehl ginge dort verloren.
   */
  private updateArcadeAim(dt: number): void {
    const step = Math.max(dt, 1e-3);
    const follow = 1 - Math.exp(-step / Math.max(this.options.aimSmoothing, 1e-4));
    this.aimRate.x += (this.mouseDelta.x / step - this.aimRate.x) * follow;
    this.aimRate.y += (this.mouseDelta.y / step - this.aimRate.y) * follow;

    const rate = this.flight.getParams().arcade.turnRate;
    const gain = MathUtils.degToRad(this.options.degreesPerPixel) / rate;

    const yaw = clamp(this.aimRate.x * gain, -1, 1);
    const pitch = clamp(-this.aimRate.y * gain, -1, 1); // Maus hoch (dy<0) = Nase hoch

    const i = this.flight.inputs;
    i.yaw = yaw;
    i.pitch = pitch;
    // Fuer das HUD: der Cursor zeigt den aktuellen Steuerbefehl.
    this.offset.set(yaw, -pitch);
  }

  /** Newton: aufsummierter Ausschlag, der stehen bleibt (Privateer-Trimmung). */
  private updateVirtualStick(): void {
    const scale = 1 / this.options.pixelsToFullDeflection;
    this.offset.x += this.mouseDelta.x * scale;
    this.offset.y += this.mouseDelta.y * scale;

    const mag = this.offset.length();
    if (mag > 1) this.offset.multiplyScalar(1 / mag);

    const { deadzone, responseExponent } = this.options;
    const clamped = Math.min(mag, 1);
    let response = 0;
    if (clamped > deadzone) {
      response = Math.pow((clamped - deadzone) / (1 - deadzone), responseExponent) / clamped;
    }

    const i = this.flight.inputs;
    i.yaw = this.offset.x * response;
    i.pitch = -this.offset.y * response; // Maus nach oben (dy<0) = Nase hoch
  }

  // ------------------------------------------------------- Sollgeschwindigkeit

  private updateSetSpeed(dt: number): void {
    // Buchhaltung laeuft auch bei Assist AUS mit, damit die Halte-Timer nach
    // dem Wiedereinschalten nicht sofort losrattern.
    const delta = this.stepFor(KEYS.speedUp, dt) - this.stepFor(KEYS.speedDown, dt);
    if (delta !== 0 && this.flight.assistEnabled) this.flight.adjustSetSpeed(delta);
  }

  /**
   * Liefert die Sollgeschwindigkeitsaenderung dieser Taste in diesem Schritt:
   * eine volle Stufe pro Tastendruck, danach kontinuierlich beim Halten.
   */
  private stepFor(code: string, dt: number): number {
    const p = this.flight.getParams();
    let delta = this.input.wasPressed(code) ? p.setSpeedStep : 0;

    if (this.input.isDown(code)) {
      const held = (this.holdTime.get(code) ?? 0) + dt;
      this.holdTime.set(code, held);
      if (held > this.options.repeatDelay) delta += p.setSpeedRate * dt;
    } else {
      this.holdTime.set(code, 0);
    }
    return delta;
  }

  // ---------------------------------------------------------------- Tasten

  private axis(positive: string, negative: string): number {
    return (this.input.isDown(positive) ? 1 : 0) - (this.input.isDown(negative) ? 1 : 0);
  }
}

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}
