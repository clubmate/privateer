import { CanvasTexture, LinearFilter, Mesh, MeshStandardMaterial, Quaternion, Vector3 } from 'three';
import type { Object3D } from 'three';
import type { Asteroids } from '../world/Asteroids';

/**
 * Das mittlere Cockpit-Display als lebendes Radar.
 *
 * Statt eines gemalten Standbildes zeichnet dieses Display jede Aktualisierung
 * die tatsaechlichen Kontakte: Draufsicht mit der eigenen Nase nach oben, ein
 * Strich je Kontakt nach oben oder unten fuer den Hoehenunterschied, das
 * erfasste Ziel hervorgehoben.
 */

/**
 * Mesh im GLB, das ersetzt wird: der mittlere Konsolenmonitor. Er ist im
 * Modell bewusst quadratisch angelegt (0,34 m x 0,31 m) — auf den flankierenden
 * Breitbandmonitoren wuerde der Radarkreis zur Ellipse.
 */
const SCREEN_MESH = 'SM_Screen_MFD1';

/** Aufloesung der Displaytextur. */
const SIZE = 256;

/** Aktualisierungen je Sekunde — mehr braucht ein Radar nicht. */
const REFRESH_HZ = 15;

/** Umlaufgeschwindigkeit des Suchkeils in Radiant je Sekunde. */
const SWEEP_RATE = 1.4;

/**
 * Den Suchkeil um die verstrichene Zeit weiterdrehen.
 *
 * Als eigene Funktion, weil hier zwei Fallen liegen, die im Bild erst
 * auffallen, wenn es zu spaet ist:
 *
 * 1. Der Zaehler der Anzeige startet auf `Infinity`, damit das erste Bild
 *    sofort entsteht. Ungeklemmt wird daraus ein NaN im Winkel — und ein NaN
 *    im Winkel legt beim naechsten Farbverlauf den ganzen Bilddurchlauf lahm.
 * 2. Gerechnet gehoert die Zeit *seit der letzten Aktualisierung*, nicht die
 *    eines Bildes. Steht dort das Bild-Delta, dreht der Keil bei 60 Bildern
 *    und 15 Hz mit einem Viertel seiner Geschwindigkeit — und bei 30 Bildern
 *    mit der Haelfte.
 */
export function advanceSweep(sweep: number, elapsed: number, maxElapsed: number): number {
  return (sweep + Math.min(elapsed, maxElapsed) * SWEEP_RATE) % (Math.PI * 2);
}

export interface RadarParams {
  /** Angezeigte Entfernung bis zum Rand in Metern. */
  range: number;
  /** Hoechstzahl gezeichneter Kontakte (die naechsten zuerst). */
  maxContacts: number;
}

export const DEFAULT_RADAR_PARAMS: RadarParams = {
  range: 2500,
  maxContacts: 48,
};

/** Bildschirmkoordinaten eines Kontakts, -1..1, y positiv = voraus. */
export interface RadarPoint {
  x: number;
  y: number;
  /** Entfernung in der Draufsicht, 0..1 bezogen auf die Reichweite. */
  radius: number;
}

/**
 * Kontakt aus dem Schiffssystem auf die Radarscheibe abbilden: `x` nach
 * steuerbord, `y` nach vorn (die Nase zeigt im Schiffssystem nach -Z).
 * Werte ausserhalb des Einheitskreises liegen ausser Reichweite.
 */
export function toRadarPoint(local: Vector3, range: number, out: RadarPoint): RadarPoint {
  out.x = local.x / range;
  out.y = -local.z / range;
  out.radius = Math.hypot(out.x, out.y);
  return out;
}

const _local = new Vector3();
const _center = new Vector3();
const _inverse = new Quaternion();
const _point: RadarPoint = { x: 0, y: 0, radius: 0 };

interface Contact {
  x: number;
  y: number;
  height: number;
  size: number;
  locked: boolean;
}

export interface RadarView {
  /** Schiffsposition in Weltkoordinaten. */
  origin: Vector3;
  /** Schiffslage. */
  orientation: Quaternion;
  asteroids: Asteroids;
  /** Index des erfassten Ziels, oder -1. */
  targetIndex: number;
}

export class RadarScreen {
  readonly texture: CanvasTexture;

  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly params: RadarParams;
  private readonly contacts: Contact[] = [];
  /** Belegte Eintraege im Pool — `contacts` selbst wird nie gekuerzt. */
  private contactCount = 0;
  private sinceRefresh = Infinity;
  private sweep = 0;

  constructor(params: Partial<RadarParams> = {}) {
    this.params = { ...DEFAULT_RADAR_PARAMS, ...params };

    this.canvas = document.createElement('canvas');
    this.canvas.width = SIZE;
    this.canvas.height = SIZE;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('2D-Context fuer das Radar nicht verfuegbar');
    this.ctx = ctx;

    this.texture = new CanvasTexture(this.canvas);
    this.texture.magFilter = LinearFilter;
    this.texture.flipY = false; // glTF-UV-Konvention, wie die uebrigen Screens
    this.drawFrame();
  }

  /**
   * Das Radar auf das MFD legen. Nach `Ship.setInterior()` aufrufen — vorher
   * gibt es das Mesh noch nicht.
   */
  attachTo(interior: Object3D): boolean {
    const mesh = interior.getObjectByName(SCREEN_MESH);
    if (!(mesh instanceof Mesh)) return false;
    const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
    if (!(material instanceof MeshStandardMaterial)) return false;

    material.emissiveMap = this.texture;
    material.needsUpdate = true;
    return true;
  }

  /** Bild aktualisieren; laeuft mit {@link REFRESH_HZ}, nicht mit der Bildrate. */
  update(dt: number, view: RadarView): void {
    this.sinceRefresh += dt;
    if (this.sinceRefresh < 1 / REFRESH_HZ) return;
    // Siehe {@link advanceSweep} — die Zeit seit der letzten Aktualisierung.
    this.sweep = advanceSweep(this.sweep, this.sinceRefresh, 2 / REFRESH_HZ);
    this.sinceRefresh = 0;

    this.collect(view);
    this.drawFrame();
    this.texture.needsUpdate = true;
  }

  // ------------------------------------------------------------------ intern

  private collect(view: RadarView): void {
    // Der Pool waechst mit, wird aber nie verworfen: sonst entstuenden je
    // Aktualisierung bis zu 48 frische Objekte, also gut siebenhundert je
    // Sekunde, fuer Daten, die einen Zeichenvorgang lang leben.
    this.contactCount = 0;
    _inverse.copy(view.orientation).invert();

    const { asteroids } = view;
    for (let i = 0; i < asteroids.count; i++) {
      if (!asteroids.isAlive(i)) continue;
      asteroids.getCenter(i, _center);
      _local.subVectors(_center, view.origin);
      if (_local.lengthSq() > this.params.range * this.params.range * 2.25) continue;
      _local.applyQuaternion(_inverse);

      toRadarPoint(_local, this.params.range, _point);
      if (_point.radius > 1) continue;

      const contact =
        this.contacts[this.contactCount] ??
        (this.contacts[this.contactCount] = { x: 0, y: 0, height: 0, size: 0, locked: false });
      contact.x = _point.x;
      contact.y = _point.y;
      contact.height = Math.max(Math.min(_local.y / this.params.range, 1), -1);
      contact.size = asteroids.getRadius(i);
      contact.locked = i === view.targetIndex;
      this.contactCount++;
    }

    // Bei vollem Feld nur die naechsten zeichnen — das Display bleibt lesbar.
    if (this.contactCount > this.params.maxContacts) {
      // Nur der belegte Teil des Pools wird sortiert; dahinter stehen die
      // ausgemusterten Eintraege des letzten Durchgangs.
      const live = this.contacts.slice(0, this.contactCount);
      live.sort((a, b) => a.x * a.x + a.y * a.y - (b.x * b.x + b.y * b.y));
      for (let i = 0; i < live.length; i++) this.contacts[i] = live[i]!;
      this.contactCount = this.params.maxContacts;
    }
  }

  private drawFrame(): void {
    const ctx = this.ctx;
    const c = SIZE / 2;
    const r = SIZE / 2 - 12;

    ctx.fillStyle = '#0a2b33';
    ctx.fillRect(0, 0, SIZE, SIZE);

    // Ringe und Achsen.
    ctx.strokeStyle = '#2f8ea3';
    ctx.lineWidth = 2;
    for (const ring of [0.33, 0.66, 1]) {
      ctx.beginPath();
      ctx.arc(c, c, r * ring, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(c, c - r);
    ctx.lineTo(c, c + r);
    ctx.moveTo(c - r, c);
    ctx.lineTo(c + r, c);
    ctx.stroke();

    // Umlaufender Suchkeil.
    const gradient = ctx.createLinearGradient(c, c, c + Math.cos(this.sweep) * r, c + Math.sin(this.sweep) * r);
    gradient.addColorStop(0, 'rgba(180,255,255,0.35)');
    gradient.addColorStop(1, 'rgba(180,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(c, c);
    ctx.arc(c, c, r, this.sweep - 0.45, this.sweep);
    ctx.closePath();
    ctx.fill();

    // Eigenes Schiff.
    ctx.fillStyle = '#eaffff';
    ctx.beginPath();
    ctx.moveTo(c, c - 9);
    ctx.lineTo(c - 6, c + 7);
    ctx.lineTo(c + 6, c + 7);
    ctx.closePath();
    ctx.fill();

    for (let n = 0; n < this.contactCount; n++) {
      const contact = this.contacts[n]!;
      // Bildschirm-y waechst nach unten, voraus soll oben sein.
      const x = c + contact.x * r;
      const y = c - contact.y * r;
      const dot = Math.max(2, Math.min(7, 2 + contact.size / 9));

      // Hoehenstrich: zeigt, ob der Brocken ueber oder unter der Ebene liegt.
      ctx.strokeStyle = contact.locked ? '#ffd27a' : '#7fd8e8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - contact.height * 14);
      ctx.stroke();

      ctx.fillStyle = contact.locked ? '#ffc14d' : '#bff0ff';
      ctx.beginPath();
      ctx.arc(x, y, dot, 0, Math.PI * 2);
      ctx.fill();

      if (contact.locked) {
        ctx.strokeStyle = '#ffc14d';
        ctx.lineWidth = 2;
        ctx.strokeRect(x - dot - 5, y - dot - 5, (dot + 5) * 2, (dot + 5) * 2);
      }
    }

    // Reichweitenangabe.
    ctx.fillStyle = '#8fdcea';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${(this.params.range / 1000).toFixed(1)} KM`, c, SIZE - 8);

    // Feine Zeilen, wie bei den uebrigen Displays.
    ctx.fillStyle = 'rgba(0,0,0,0.16)';
    for (let y = 0; y < SIZE; y += 6) ctx.fillRect(0, y, SIZE, 2);
  }
}
