import { MathUtils, Quaternion, Vector3 } from 'three';
import type { PerspectiveCamera } from 'three';
import type { FlightMode } from '../ship/FlightModel';
import type { TargetInfo } from '../combat/Targeting';
import './hud.css';

/** Anzeigemodus: sitzend (Flug-HUD) oder stehend (Gehen). */
export type HudMode = 'seated' | 'walking';

/** Zustand, den das HUD pro Frame anzeigt. */
export interface HudState {
  camera: PerspectiveCamera;
  /** Bahngeschwindigkeit in Weltkoordinaten (fuer Prograde/Retrograde). */
  velocity: Vector3;
  speed: number;
  setSpeed: number;
  /** Aktueller Flugmodus (Chip rechts unten). */
  mode: FlightMode;
  fullStop: boolean;
  afterburner: boolean;
  pointerLocked: boolean;
  /** Virtueller Mausoffset, -1..1 (y positiv = unten). */
  mouseOffset: { x: number; y: number };
  /** Obergrenze der Sollgeschwindigkeit fuer den Balken. */
  maxSetSpeed: number;
  /** Zahl der zerstoerten Brocken. */
  kills: number;
  /** Sekunden seit dem letzten Treffer (blitzt kurz im Fadenkreuz auf). */
  sinceHit: number;
  /** Erfasstes Ziel, oder `null`. */
  target: TargetInfo | null;
  /** Huellenintegritaet 0..1. */
  hull: number;
  /** Sekunden seit dem letzten Zusammenstoss (roter Rand). */
  sinceImpact: number;
}

/** Beschriftung des Modus-Chips. */
const MODE_LABEL: Record<FlightMode, string> = {
  arcade: 'ARCADE',
  assist: 'NEWTON · ASSIST',
  newton: 'NEWTON · FREI',
};

/** So lange leuchtet das Fadenkreuz nach einem Treffer auf, in Sekunden. */
const HIT_FLASH_DURATION = 0.18;

/** So lange leuchtet der Schadensrand nach einem Zusammenstoss, in Sekunden. */
const DAMAGE_FLASH_DURATION = 0.6;

/** Kleinste und groesste Kantenlaenge der Zielklammer in Pixeln. */
const TARGET_BOX_MIN = 34;
const TARGET_BOX_MAX = 260;

/** Ab diesem Zustand gilt die Huelle als kritisch. */
const HULL_WARN = 0.35;

/** Ab dieser Geschwindigkeit hat der Velocity-Vektor eine sinnvolle Richtung. */
const MARKER_MIN_SPEED = 1;
/** Rand, an dem ausserhalb liegende Marker kleben (NDC). */
const CLAMP_MARGIN = 0.93;
/** Sichtbarer Radius des Vollausschlags fuer den Maus-Cursor, relativ zu min(w,h). */
const CURSOR_RADIUS_FACTOR = 0.38;

const CROSSHAIR_SVG = `
<svg width="72" height="72" viewBox="0 0 72 72" fill="none">
  <circle cx="36" cy="36" r="13" stroke="currentColor" stroke-width="1" opacity="0.55"/>
  <circle cx="36" cy="36" r="1.6" fill="currentColor"/>
  <path d="M36 4v14M36 54v14M4 36h14M54 36h14" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 22v-8h8M58 22v-8h-8M14 50v8h8M58 50v8h-8" stroke="currentColor" stroke-width="1" opacity="0.5"/>
</svg>`;

const LEAD_SVG = `
<svg width="30" height="30" viewBox="0 0 30 30" fill="none">
  <circle cx="15" cy="15" r="9" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 3"/>
  <circle cx="15" cy="15" r="2" fill="currentColor"/>
</svg>`;

const CURSOR_SVG = `
<svg width="26" height="26" viewBox="0 0 26 26" fill="none">
  <circle cx="13" cy="13" r="6" stroke="currentColor" stroke-width="1.2"/>
  <path d="M13 0v5M13 21v5M0 13h5M21 13h5" stroke="currentColor" stroke-width="1.2"/>
</svg>`;

const PROGRADE_SVG = `
<svg width="34" height="34" viewBox="0 0 34 34" fill="none">
  <circle cx="17" cy="17" r="7" stroke="currentColor" stroke-width="1.4"/>
  <circle cx="17" cy="17" r="1.5" fill="currentColor"/>
  <path d="M17 10V3M17 24v3M10 17H3M24 17h7" stroke="currentColor" stroke-width="1.4"/>
</svg>`;

const RETROGRADE_SVG = `
<svg width="34" height="34" viewBox="0 0 34 34" fill="none">
  <circle cx="17" cy="17" r="7" stroke="currentColor" stroke-width="1.2"/>
  <path d="M12 12l10 10M22 12L12 22" stroke="currentColor" stroke-width="1.2"/>
  <path d="M17 10V4M17 24v6M10 17H4M24 17h6" stroke="currentColor" stroke-width="1.2"/>
</svg>`;

interface Projection {
  x: number;
  y: number;
  clamped: boolean;
}

/**
 * DOM-Overlay ueber dem Canvas: Fadenkreuz, virtueller Maus-Cursor,
 * Geschwindigkeitsanzeige, Prograde-/Retrograde-Marker, Assist-Status und eine
 * Prompt-Zeile fuer Interaktionen (AP4).
 */
export class Hud {
  readonly root: HTMLDivElement;

  private readonly cursor: HTMLDivElement;
  private readonly ring: HTMLDivElement;
  private readonly prograde: HTMLDivElement;
  private readonly retrograde: HTMLDivElement;
  private readonly center: HTMLDivElement;
  private readonly target: HTMLDivElement;
  private readonly targetBox: HTMLDivElement;
  private readonly targetRange: HTMLSpanElement;
  private readonly targetIntegrity: HTMLElement;
  private readonly lead: HTMLDivElement;
  private readonly damage: HTMLDivElement;
  private readonly hullValue: HTMLSpanElement;
  private readonly killsValue: HTMLSpanElement;
  private readonly speedValue: HTMLSpanElement;
  private readonly setValue: HTMLSpanElement;
  private readonly barFill: HTMLDivElement;
  private readonly barSet: HTMLDivElement;
  private readonly assistChip: HTMLSpanElement;
  private readonly burnChip: HTMLSpanElement;
  private readonly prompt: HTMLDivElement;
  private readonly hint: HTMLDivElement;

  private mode: HudMode = 'seated';
  private width = window.innerWidth;
  private height = window.innerHeight;

  private readonly invQuat = new Quaternion();
  private readonly dir = new Vector3();
  private readonly local = new Vector3();
  private readonly cameraPosition = new Vector3();
  private readonly proj: Projection = { x: 0, y: 0, clamped: false };

  /** Letzte gesetzte Texte/Zustaende, um DOM-Schreiben zu sparen. */
  private lastSpeed = -1;
  private lastSet = -1;
  private lastMode = '';
  private lastKills = -1;
  private lastHull = -1;
  private lastHitFlash: boolean | null = null;
  private lastBurn = false;
  private lastLocked: boolean | null = null;

  constructor(parent: HTMLElement = document.body) {
    this.root = document.createElement('div');
    this.root.className = 'hud';
    this.root.innerHTML = `
      <div class="hud__ring"></div>
      <div class="hud__center">${CROSSHAIR_SVG}</div>
      <div class="hud__cursor">${CURSOR_SVG}</div>
      <div class="hud__target" hidden>
        <div class="hud__target-box"></div>
        <div class="hud__target-info">
          <span data-target-range>0 M</span>
          <span class="hud__target-bar"><i data-target-integrity></i></span>
        </div>
      </div>
      <div class="hud__lead" hidden>${LEAD_SVG}</div>
      <div class="hud__marker hud__marker--pro" hidden>${PROGRADE_SVG}</div>
      <div class="hud__marker hud__marker--retro" hidden>${RETROGRADE_SVG}</div>

      <div class="hud__panel hud__panel--flight">
        <div class="hud__row">
          <span class="hud__label">SPD</span>
          <span class="hud__value hud__value--big" data-speed>0</span>
        </div>
        <div class="hud__row">
          <span class="hud__label">SET</span>
          <span class="hud__value" data-set>0 M/S</span>
        </div>
        <div class="hud__bar">
          <div class="hud__bar-fill" data-fill></div>
          <div class="hud__bar-set" data-setmark></div>
        </div>
        <div class="hud__row">
          <span class="hud__label">HUELLE</span>
          <span class="hud__value" data-hull>100%</span>
        </div>
        <div class="hud__row">
          <span class="hud__label">KILLS</span>
          <span class="hud__value" data-kills>0</span>
        </div>
      </div>

      <div class="hud__status">
        <span class="hud__chip is-on" data-assist>ARCADE</span>
        <span class="hud__chip" data-burn>AB</span>
      </div>

      <div class="hud__keys hud__keys--flight">MAUS/LEER FEUERN &middot; T ZIEL &middot; W/S SET SPEED &middot; Q/E ROLL &middot; A/D STRAFE &middot; SHIFT/CTRL LIFT &middot; X FULL STOP &middot; V FLUGMODUS &middot; TAB BURN &middot; F AUFSTEHEN</div>
      <div class="hud__keys hud__keys--walk">W/A/S/D GEHEN &middot; MAUS UMSEHEN &middot; F AM SITZ HINSETZEN</div>
      <div class="hud__damage"></div>
      <div class="hud__prompt" hidden></div>
      <div class="hud__hint" hidden>KLICKEN ZUM STEUERN</div>
    `;
    parent.appendChild(this.root);

    this.center = this.require('.hud__center');
    this.target = this.require('.hud__target');
    this.targetBox = this.require('.hud__target-box');
    this.targetRange = this.require('[data-target-range]');
    this.targetIntegrity = this.require('[data-target-integrity]');
    this.lead = this.require('.hud__lead');
    this.damage = this.require('.hud__damage');
    this.hullValue = this.require('[data-hull]');
    this.killsValue = this.require('[data-kills]');
    this.cursor = this.require('.hud__cursor');
    this.ring = this.require('.hud__ring');
    this.prograde = this.require('.hud__marker--pro');
    this.retrograde = this.require('.hud__marker--retro');
    this.speedValue = this.require('[data-speed]');
    this.setValue = this.require('[data-set]');
    this.barFill = this.require('[data-fill]');
    this.barSet = this.require('[data-setmark]');
    this.assistChip = this.require('[data-assist]');
    this.burnChip = this.require('[data-burn]');
    this.prompt = this.require('.hud__prompt');
    this.hint = this.require('.hud__hint');

    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  dispose(): void {
    window.removeEventListener('resize', this.onResize);
    this.root.remove();
  }

  // --------------------------------------------------- API fuer AP4 (Prompts)

  /**
   * Anzeigemodus umschalten. Beim Gehen verschwinden die Flugelemente
   * (Fadenkreuz, Steuerkreuz-Cursor, Prograde/Retrograde); die
   * Geschwindigkeitsanzeige bleibt, weil das Schiff weiterfliegt.
   */
  setMode(mode: HudMode): void {
    if (this.mode === mode) return;
    this.mode = mode;
    if (mode === 'walking') {
      this.target.hidden = true;
      this.lead.hidden = true;
    }
    this.root.classList.toggle('hud--walking', mode === 'walking');
  }

  getMode(): HudMode {
    return this.mode;
  }

  /** Interaktions-Prompt einblenden, z. B. "F — Aufstehen". */
  showPrompt(text: string): void {
    if (this.prompt.textContent !== text) this.prompt.textContent = text;
    this.prompt.hidden = false;
  }

  hidePrompt(): void {
    this.prompt.hidden = true;
  }

  // ------------------------------------------------------------------ Update

  update(state: HudState): void {
    this.updateReadouts(state);
    this.updateCursor(state);
    this.updateMarkers(state);
    this.updateTarget(state);

    if (this.lastLocked !== state.pointerLocked) {
      this.lastLocked = state.pointerLocked;
      this.hint.hidden = state.pointerLocked;
    }
  }

  private updateReadouts(state: HudState): void {
    const speed = Math.round(state.speed);
    if (speed !== this.lastSpeed) {
      this.lastSpeed = speed;
      this.speedValue.textContent = `${speed} M/S`;
      const pct = Math.min(state.speed / Math.max(state.maxSetSpeed, 1), 1) * 100;
      this.barFill.style.width = `${pct.toFixed(1)}%`;
    }

    const set = Math.round(state.setSpeed);
    if (set !== this.lastSet) {
      this.lastSet = set;
      this.setValue.textContent = `${set} M/S`;
      const pct = (set / Math.max(state.maxSetSpeed, 1)) * 100;
      this.barSet.style.left = `${pct.toFixed(1)}%`;
    }

    const mode = state.fullStop ? 'FULL STOP' : MODE_LABEL[state.mode];
    if (mode !== this.lastMode) {
      this.lastMode = mode;
      this.assistChip.textContent = mode;
      this.assistChip.classList.toggle('is-on', !state.fullStop && state.mode !== 'newton');
      this.assistChip.classList.toggle('is-warn', state.fullStop);
    }

    const hull = Math.round(state.hull * 100);
    if (hull !== this.lastHull) {
      this.lastHull = hull;
      this.hullValue.textContent = `${hull}%`;
      this.hullValue.classList.toggle('is-warn', state.hull < HULL_WARN);
    }

    // Roter Rand direkt nach einem Zusammenstoss; klingt weich aus.
    const damage = Math.max(0, 1 - state.sinceImpact / DAMAGE_FLASH_DURATION);
    this.damage.style.opacity = damage.toFixed(3);

    if (state.kills !== this.lastKills) {
      this.lastKills = state.kills;
      this.killsValue.textContent = `${state.kills}`;
    }

    const hitFlash = state.sinceHit < HIT_FLASH_DURATION;
    if (hitFlash !== this.lastHitFlash) {
      this.lastHitFlash = hitFlash;
      this.center.classList.toggle('is-hit', hitFlash);
    }

    if (state.afterburner !== this.lastBurn) {
      this.lastBurn = state.afterburner;
      this.burnChip.textContent = state.afterburner ? 'AFTERBURNER' : 'AB';
      this.burnChip.classList.toggle('is-warn', state.afterburner);
    }
  }

  /**
   * Zielklammer und Vorhaltemarke setzen. Die Klammer skaliert mit der
   * scheinbaren Groesse des Brockens, damit sie ihn wirklich einrahmt.
   */
  private updateTarget(state: HudState): void {
    const target = state.target;
    if (!target || this.mode === 'walking') {
      this.target.hidden = true;
      this.lead.hidden = true;
      return;
    }

    state.camera.getWorldPosition(this.cameraPosition);

    this.dir.subVectors(target.position, this.cameraPosition).normalize();
    const box = this.project(this.dir, state.camera);
    this.target.hidden = false;
    this.target.classList.toggle('is-clamped', box.clamped);
    this.target.style.transform = `translate(${box.x.toFixed(1)}px, ${box.y.toFixed(1)}px)`;

    const tanHalf = Math.tan(MathUtils.degToRad(state.camera.fov) * 0.5);
    const size = MathUtils.clamp(
      ((target.radius / Math.max(target.distance, 1)) / tanHalf) * this.height,
      TARGET_BOX_MIN,
      TARGET_BOX_MAX,
    );
    this.targetBox.style.width = `${size.toFixed(0)}px`;
    this.targetBox.style.height = `${size.toFixed(0)}px`;

    this.targetRange.textContent =
      target.distance >= 1000
        ? `${(target.distance / 1000).toFixed(2)} KM`
        : `${Math.round(target.distance)} M`;
    this.targetIntegrity.style.width = `${(target.integrity * 100).toFixed(0)}%`;

    // Vorhaltemarke nur zeigen, wenn sie sichtbar vom Ziel abweicht.
    this.dir.subVectors(target.lead, this.cameraPosition).normalize();
    const lead = this.project(this.dir, state.camera);
    const apart = Math.hypot(lead.x - box.x, lead.y - box.y);
    this.lead.hidden = lead.clamped || apart < 6;
    if (!this.lead.hidden) {
      this.lead.style.transform = `translate(${lead.x.toFixed(1)}px, ${lead.y.toFixed(1)}px)`;
    }
  }

  private updateCursor(state: HudState): void {
    const visible = state.pointerLocked;
    this.cursor.hidden = !visible;
    this.ring.style.opacity = visible ? '' : '0';
    if (!visible) return;

    const radius = Math.min(this.width, this.height) * CURSOR_RADIUS_FACTOR;
    const x = this.width * 0.5 + state.mouseOffset.x * radius;
    const y = this.height * 0.5 + state.mouseOffset.y * radius;
    this.cursor.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  }

  private updateMarkers(state: HudState): void {
    if (state.speed < MARKER_MIN_SPEED) {
      this.prograde.hidden = true;
      this.retrograde.hidden = true;
      return;
    }

    this.dir.copy(state.velocity).normalize();
    this.place(this.prograde, this.dir, state.camera);
    this.dir.multiplyScalar(-1);
    this.place(this.retrograde, this.dir, state.camera);
  }

  private place(el: HTMLDivElement, worldDir: Vector3, camera: PerspectiveCamera): void {
    const p = this.project(worldDir, camera);
    el.hidden = false;
    el.classList.toggle('is-clamped', p.clamped);
    el.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`;
  }

  /**
   * Richtungsvektor (Welt) auf Bildschirmkoordinaten abbilden. Liegt die
   * Richtung ausserhalb des Sichtfelds oder hinter der Kamera, klemmt der
   * Marker richtungstreu am Bildrand.
   */
  private project(worldDir: Vector3, camera: PerspectiveCamera): Projection {
    camera.getWorldQuaternion(this.invQuat).invert();
    this.local.copy(worldDir).applyQuaternion(this.invQuat);

    const tanHalf = Math.tan(MathUtils.degToRad(camera.fov) * 0.5);
    const front = -this.local.z;

    let ndcX: number;
    let ndcY: number;
    if (front > 1e-4) {
      ndcX = this.local.x / (front * tanHalf * camera.aspect);
      ndcY = this.local.y / (front * tanHalf);
    } else {
      // Hinter der Kamera: Richtung spiegeln und weit nach aussen schieben,
      // damit das Clamping unten den Marker an den richtigen Rand legt.
      const len = Math.hypot(this.local.x, this.local.y);
      if (len < 1e-6) {
        ndcX = 0;
        ndcY = -10;
      } else {
        ndcX = (-this.local.x / len) * 10;
        ndcY = (-this.local.y / len) * 10;
      }
    }

    const over = Math.max(Math.abs(ndcX) / CLAMP_MARGIN, Math.abs(ndcY) / CLAMP_MARGIN, 1);
    const clamped = over > 1;
    ndcX /= over;
    ndcY /= over;

    this.proj.x = (ndcX * 0.5 + 0.5) * this.width;
    this.proj.y = (0.5 - ndcY * 0.5) * this.height;
    this.proj.clamped = clamped;
    return this.proj;
  }

  // ------------------------------------------------------------------ Layout

  private onResize = (): void => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const radius = Math.min(this.width, this.height) * CURSOR_RADIUS_FACTOR;
    this.ring.style.width = `${radius * 2}px`;
    this.ring.style.height = `${radius * 2}px`;
  };

  private require<T extends HTMLElement>(selector: string): T {
    const el = this.root.querySelector<T>(selector);
    if (!el) throw new Error(`HUD: Element "${selector}" fehlt`);
    return el;
  }
}
