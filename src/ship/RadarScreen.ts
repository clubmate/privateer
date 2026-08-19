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
    this.sinceRefresh = 0;
    this.sweep = (this.sweep + dt * 1.4) % (Math.PI * 2);

    this.collect(view);
    this.drawFrame();
    this.texture.needsUpdate = true;
  }

  // ------------------------------------------------------------------ intern

  private collect(view: RadarView): void {
    this.contacts.length = 0;
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

      this.contacts.push({
        x: _point.x,
        y: _point.y,
        height: Math.max(Math.min(_local.y / this.params.range, 1), -1),
        size: asteroids.getRadius(i),
        locked: i === view.targetIndex,
      });
    }

    // Bei vollem Feld nur die naechsten zeichnen — das Display bleibt lesbar.
    if (this.contacts.length > this.params.maxContacts) {
      this.contacts.sort((a, b) => Math.hypot(a.x, a.y) - Math.hypot(b.x, b.y));
      this.contacts.length = this.params.maxContacts;
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

    for (const contact of this.contacts) {
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
