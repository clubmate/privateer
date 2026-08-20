import {
  BufferAttribute,
  CanvasTexture,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  SRGBColorSpace,
  Vector3,
} from 'three';
import type { Object3D } from 'three';
import { HULL_WARN, MODE_SHORT, type HudState } from '../hud/HudState';

/**
 * Die Instrumente des Schiffs — auf den Schirmen, die im Cockpit wirklich
 * haengen, statt als Rechtecke ueber dem Bild.
 *
 * Jeder Schirm ist eine Canvas-Textur, die als `emissiveMap` auf dem
 * GLB-Material liegt (Muster: {@link RadarScreen}). Die Texturen sind
 * **graustufig**: Three multipliziert sie mit der Emissive-Farbe des Materials,
 * Bernstein und Gruen kommen also aus dem Modell. Eine Warnung darf deshalb
 * nicht ueber Farbe laufen, sondern nur ueber Blinken und Invertierung.
 *
 * Aufteilung (siehe {@link SCREENS}):
 *  - ein MFD Antrieb/Flug, eines Ziel/Gefecht,
 *  - Overhead-Panel Kurs und Lage,
 *  - Gangschirm Schiffsstatus fuer den, der hinten steht,
 *  - Werkbankschirm im Frachtraum.
 */

// ------------------------------------------------------------------ Rechnen

/** Lage des Schiffs in Grad, wie sie das Kursdisplay anzeigt. */
export interface Attitude {
  /** Nase ueber der Bezugsebene, -90..90. */
  pitch: number;
  /** Peilung 0..360; 0 zeigt entlang -Z (Nord der Sektorkarte). */
  bearing: number;
  /** Rollwinkel -180..180, positiv = Steuerbord tief. */
  roll: number;
}

const _forward = new Vector3();
const _up = new Vector3();
const _right = new Vector3();
const _rel = new Vector3();
const _delta = new Vector3();

const RAD_TO_DEG = 180 / Math.PI;

/**
 * Lage aus der Schiffsorientierung. Die Nase zeigt im Schiffssystem auf -Z,
 * die Peilung waechst nach Steuerbord.
 */
export function attitudeFrom(orientation: Quaternion): Attitude {
  _forward.set(0, 0, -1).applyQuaternion(orientation);
  _up.set(0, 1, 0).applyQuaternion(orientation);
  _right.set(1, 0, 0).applyQuaternion(orientation);

  const pitch = Math.asin(Math.max(-1, Math.min(1, _forward.y))) * RAD_TO_DEG;
  const bearing = (Math.atan2(_forward.x, -_forward.z) * RAD_TO_DEG + 360) % 360;
  // Vorzeichen gedreht, damit "rechts herum" positiv ist: bei Rollen nach
  // Steuerbord sinkt die rechte Seite, also wird `right.y` negativ.
  const roll = -Math.atan2(_right.y, _up.y) * RAD_TO_DEG;
  return { pitch, bearing, roll };
}

/** Kantenlaenge einer Sektorzelle in Metern. */
export const SECTOR_SIZE = 20_000;

/**
 * Sektorname aus der Weltposition. Rein aus dem Ort abgeleitet, damit die
 * Anzeige beim Fliegen tatsaechlich weiterzaehlt statt Text zu behaupten.
 */
export function sectorLabel(position: Vector3): string {
  const col = Math.floor(position.x / SECTOR_SIZE);
  const row = Math.floor(position.z / SECTOR_SIZE);
  const letter = String.fromCharCode(65 + (((col % 26) + 26) % 26));
  const number = ((row % 100) + 100) % 100;
  return `TROJA ${letter}-${number.toString().padStart(2, '0')}`;
}

/**
 * Annaeherungsrate in m/s: positiv, solange der Abstand schrumpft. Fuer den
 * Piloten die eigentliche Gefechtszahl — die Entfernung allein sagt nicht, ob
 * er gerade auffaehrt.
 */
export function closingRate(
  targetPosition: Vector3,
  targetVelocity: Vector3,
  shipPosition: Vector3,
  shipVelocity: Vector3,
): number {
  _delta.subVectors(targetPosition, shipPosition);
  const distance = _delta.length();
  if (distance < 1e-3) return 0;
  _rel.subVectors(targetVelocity, shipVelocity);
  return -_rel.dot(_delta) / distance;
}

/** Entfernung fuer die Schirme: unter 1 km in Metern, darueber in Kilometern. */
export function formatRange(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(2)} KM`;
  return `${Math.round(meters)} M`;
}

/** Anteil 0..1, auch bei unsinnigen Grenzen. */
export function ratio(value: number, max: number): number {
  if (!(max > 0)) return 0;
  return Math.max(0, Math.min(1, value / max));
}

/** Zahl leuchtender Segmente eines Segmentbalkens (mind. 1, sobald etwas da ist). */
export function litSegments(value: number, max: number, segments: number): number {
  const r = ratio(value, max);
  if (r <= 0) return 0;
  return Math.max(1, Math.min(segments, Math.ceil(r * segments)));
}

// ------------------------------------------------------------- Zeichenwerkzeug

/**
 * Graustufen-Palette. Der Grund ist dunkel, aber nicht schwarz: eine schwarze
 * Flaeche schaltet den Schirm faktisch aus, und aus der Sitzposition sieht ein
 * dunkles Rechteck aus wie ein totes Geraet. Gelesen wird ueber die hellen
 * Baender und Ziffern.
 */
const SKIN = {
  bg: '#111111',
  well: '#222222',
  grid: '#3d3d3d',
  dim: '#9a9a9a',
  ink: '#d8d8d8',
  // Das Kopfband ist die groesste helle Flaeche; auf reinem Weiss brennt es
  // durch den Bloom aus und frisst die Ziffern daneben mit auf.
  band: '#c4c4c4',
  hot: '#ffffff',
};

interface Paint {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** Laufzeit in Sekunden, fuer Blinken und Wandern. */
  t: number;
}

type Draw = (p: Paint, state: HudState) => void;

function font(p: Paint, size: number, weight = ''): void {
  p.ctx.font = `${weight} ${size}px ui-monospace, Menlo, monospace`;
}

/** Beschriftung: klein, gesperrt, gedaempft — das Ruhige im Bild. */
function label(p: Paint, text: string, x: number, y: number, size = 13, color = SKIN.dim): void {
  const ctx = p.ctx as CanvasRenderingContext2D & { letterSpacing?: string };
  font(p, size, 'bold');
  // Sperrung gibt es erst in neueren Browsern; ohne sie sieht es nur enger aus.
  if ('letterSpacing' in ctx) ctx.letterSpacing = '2px';
  ctx.fillStyle = color;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(text, x, y);
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
}

/** Zahlenwert: gross, hell, mit Halo — das, was aus zwei Metern lesbar bleibt. */
function value(
  p: Paint,
  text: string,
  x: number,
  y: number,
  size: number,
  align: CanvasTextAlign = 'left',
  color = SKIN.hot,
): void {
  const ctx = p.ctx;
  font(p, size, 'bold');
  ctx.textAlign = align;
  ctx.textBaseline = 'alphabetic';
  // Nur ein Hauch Halo: den Rest macht der Bloom im Renderpfad.
  ctx.shadowColor = 'rgba(255,255,255,0.45)';
  ctx.shadowBlur = size * 0.10;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.shadowBlur = 0;
  ctx.textAlign = 'left';
}

/** Kopfband: heller Balken mit ausgesparter Schrift. */
function header(p: Paint, title: string, right = ''): number {
  const ctx = p.ctx;
  const h = Math.round(p.h * 0.115);
  ctx.fillStyle = SKIN.band;
  ctx.fillRect(0, 0, p.w, h);
  const ctxLs = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
  font(p, h * 0.6, 'bold');
  if ('letterSpacing' in ctxLs) ctxLs.letterSpacing = '3px';
  ctx.fillStyle = SKIN.bg;
  ctx.textBaseline = 'middle';
  ctx.fillText(title, 8, h * 0.55);
  if (right) {
    ctx.textAlign = 'right';
    ctx.fillText(right, p.w - 8, h * 0.55);
    ctx.textAlign = 'left';
  }
  if ('letterSpacing' in ctxLs) ctxLs.letterSpacing = '0px';
  ctx.textBaseline = 'alphabetic';
  return h;
}

/** Umrandete Zelle mit dunklem Grund. */
function well(p: Paint, x: number, y: number, w: number, h: number, on = false): void {
  const ctx = p.ctx;
  ctx.fillStyle = on ? SKIN.ink : SKIN.well;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = on ? SKIN.hot : SKIN.grid;
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
}

/** Segmentbalken. `mark` setzt eine Sollmarke (0..1). */
function gauge(
  p: Paint,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: number,
  segments = 20,
  mark = -1,
): void {
  const ctx = p.ctx;
  const gap = 2;
  const seg = (w - gap * (segments - 1)) / segments;
  const lit = litSegments(fill, 1, segments);
  for (let i = 0; i < segments; i++) {
    ctx.fillStyle = i < lit ? SKIN.hot : SKIN.well;
    ctx.fillRect(x + i * (seg + gap), y, seg, h);
  }
  if (mark >= 0) {
    const mx = Math.round(x + Math.max(0, Math.min(1, mark)) * w);
    ctx.fillStyle = SKIN.ink;
    ctx.fillRect(mx - 1, y - 4, 2, h + 8);
  }
}

/** Statuslampe: aus = Umriss, an = gefuellt mit ausgesparter Schrift. */
function lamp(p: Paint, x: number, y: number, w: number, h: number, text: string, on: boolean): void {
  well(p, x, y, w, h, on);
  const ctx = p.ctx;
  font(p, h * 0.5, 'bold');
  ctx.fillStyle = on ? SKIN.bg : SKIN.dim;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + w / 2, y + h * 0.56);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

/**
 * Platzhalterzelle fuer Werte, die es im Spiel noch nicht gibt (Fracht,
 * Schadensmodell, Andocken). Sie sieht bewusst *unversorgt* aus statt etwas zu
 * behaupten — und haelt den Platz frei, an den die Werte spaeter gehoeren.
 */
function reserved(p: Paint, x: number, y: number, w: number, h: number, text: string): void {
  well(p, x, y, w, h);
  const ctx = p.ctx;
  font(p, h * 0.32, 'bold');
  ctx.fillStyle = SKIN.grid;
  ctx.fillText(text, x + 6, y + h * 0.42);
  font(p, h * 0.42, 'bold');
  ctx.fillText('- - -', x + 6, y + h * 0.85);
}

/** Grundflaeche mit leichtem Leuchtabfall nach unten. */
function clear(p: Paint): void {
  const ctx = p.ctx;
  ctx.fillStyle = SKIN.bg;
  ctx.fillRect(0, 0, p.w, p.h);
  const glow = ctx.createRadialGradient(p.w / 2, p.h * 0.42, 0, p.w / 2, p.h * 0.42, p.w * 0.75);
  glow.addColorStop(0, 'rgba(255,255,255,0.07)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, p.w, p.h);
}

/**
 * Zeilenraster und ein wandernder heller Streifen. Beides kostet nichts und
 * ist der Unterschied zwischen "Bild auf einer Flaeche" und "Geraet, das an
 * ist".
 */
function scanlines(p: Paint): void {
  const ctx = p.ctx;
  ctx.fillStyle = 'rgba(0,0,0,0.20)';
  for (let y = 0; y < p.h; y += 4) ctx.fillRect(0, y, p.w, 2);

  const sweep = ((p.t * 0.18) % 1) * (p.h + 40) - 20;
  const band = ctx.createLinearGradient(0, sweep - 18, 0, sweep + 18);
  band.addColorStop(0, 'rgba(255,255,255,0)');
  band.addColorStop(0.5, 'rgba(255,255,255,0.05)');
  band.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = band;
  ctx.fillRect(0, sweep - 18, p.w, 36);

  // Dunkle Ecken: die Roehre leuchtet in der Mitte staerker.
  const vignette = ctx.createRadialGradient(p.w / 2, p.h / 2, p.h * 0.35, p.w / 2, p.h / 2, p.w * 0.72);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, p.w, p.h);
}

/** Blinktakt, 0 oder 1. */
function blink(t: number, hz = 1.6): number {
  return (t * hz) % 1 < 0.5 ? 1 : 0;
}

// ------------------------------------------------------------------ Schirme

/** MFD links: Antrieb. Grosse Istgeschwindigkeit, Soll als Balken, Modus. */
const drawDrive: Draw = (p, s) => {
  clear(p);
  const top = header(p, 'ANTRIEB', MODE_SHORT[s.mode]);
  const pad = 12;

  label(p, 'GESCHW', pad, top + 22);
  value(p, `${Math.round(s.speed)}`, pad - 2, top + 75, 54);
  const speedWidth = p.ctx.measureText(`${Math.round(s.speed)}`).width;
  label(p, 'M/S', pad + speedWidth + 8, top + 75, 15, SKIN.ink);

  // Soll rechts daneben, kleiner: der Pilot vergleicht zwei Zahlen.
  label(p, 'SOLL', p.w - pad - 100, top + 22);
  value(p, `${Math.round(s.setSpeed)}`, p.w - pad, top + 55, 30, 'right', SKIN.ink);
  label(p, `MAX ${Math.round(s.maxSetSpeed)}`, p.w - pad - 100, top + 75, 12);

  gauge(p, pad, top + 87, p.w - pad * 2, 12, ratio(s.speed, s.maxSetSpeed), 24,
    ratio(s.setSpeed, s.maxSetSpeed));

  // Lampenreihe: was gerade eingreift.
  const lampY = top + 107;
  const lampW = (p.w - pad * 2 - 16) / 3;
  lamp(p, pad, lampY, lampW, 24, 'BRENNER', s.afterburner && blink(p.t, 4) > 0);
  lamp(p, pad + lampW + 8, lampY, lampW, 24, 'STOP', s.fullStop);
  lamp(p, pad + (lampW + 8) * 2, lampY, lampW, 24, 'ASSIST', s.mode !== 'newton');

  // Platz fuer die parallel entstehenden Systeme.
  const restY = lampY + 32;
  const cellW = (p.w - pad * 2 - 8) / 2;
  reserved(p, pad, restY, cellW, p.h - restY - 8, 'TRIEBWERK');
  reserved(p, pad + cellW + 8, restY, cellW, p.h - restY - 8, 'TANK');

  scanlines(p);
};

/** MFD rechts: Gefecht. Ziel oben, eigene Huelle unten. */
const drawCombat: Draw = (p, s) => {
  clear(p);
  const target = s.target;
  const top = header(p, 'ZIEL', target ? 'ERFASST' : 'FREI');
  const pad = 12;
  const mid = Math.round(p.h * 0.60);

  if (!target) {
    label(p, 'KEIN ZIEL', pad, top + 38, 17);
    label(p, 'T ERFASST DEN NAECHSTEN BROCKEN', pad, top + 60, 11, SKIN.grid);
    // Suchlauf: ein Strich, der wandert, damit der Schirm nicht tot wirkt.
    const x = pad + ((p.t * 0.5) % 1) * (p.w - pad * 2);
    p.ctx.fillStyle = SKIN.grid;
    p.ctx.fillRect(pad, top + 78, p.w - pad * 2, 1);
    p.ctx.fillStyle = SKIN.ink;
    p.ctx.fillRect(x - 12, top + 76, 24, 4);
  } else {
    label(p, `BROCKEN ${target.index.toString().padStart(3, '0')}`, pad, top + 20);
    const range = formatRange(target.distance);
    const [number, unit] = range.split(' ');
    value(p, number!, pad - 2, top + 68, 44);
    const numberWidth = p.ctx.measureText(number!).width;
    label(p, unit!, pad + numberWidth + 8, top + 68, 15, SKIN.ink);

    const rate = closingRate(target.position, target.velocity, s.position, s.velocity);
    label(p, 'NAEHERUNG', p.w - pad - 112, top + 20);
    value(p, `${rate >= 0 ? '+' : ''}${Math.round(rate)}`, p.w - pad, top + 56, 28, 'right', SKIN.ink);

    label(p, 'INTEGRITAET', pad, mid - 26);
    gauge(p, pad, mid - 20, p.w - pad * 2 - 68, 10, target.integrity, 16);
    value(p, `${Math.round(target.integrity * 100)}%`, p.w - pad, mid - 10, 18, 'right', SKIN.ink);
  }

  // Trennlinie: unten geht es um das eigene Schiff.
  p.ctx.fillStyle = SKIN.grid;
  p.ctx.fillRect(pad, mid + 4, p.w - pad * 2, 1);

  const critical = s.hull < HULL_WARN || s.sinceImpact < 1.2;
  label(p, 'EIGENE HUELLE', pad, mid + 30);
  gauge(p, pad, mid + 38, p.w - pad * 2 - 126, 14, s.hull, 14);
  value(p, `${Math.round(s.hull * 100)}%`, p.w - pad - 70, mid + 52, 22, 'right', SKIN.ink);
  lamp(p, p.w - pad - 64, mid + 36, 64, 20, 'SCHADEN', critical && blink(p.t, 2) > 0);

  label(p, `ABSCHUESSE ${s.kills}`, pad, p.h - 12, 13, SKIN.ink);
  scanlines(p);
};

/** Overhead: Kurs, Lage, Sektor. Breites Band, deshalb drei Spalten. */
const drawNav: Draw = (p, s) => {
  clear(p);
  const top = header(p, 'KURS', sectorLabel(s.position));
  const ctx = p.ctx;
  const att = attitudeFrom(s.orientation);

  // Links: Lagekugel. Der Horizont kippt gegen den Rollwinkel.
  const cx = 54;
  const cy = top + 52;
  const r = 40;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = SKIN.bg;
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  ctx.translate(cx, cy);
  ctx.rotate((-att.roll * Math.PI) / 180);
  ctx.translate(0, att.pitch * 1.1);
  ctx.fillStyle = 'rgba(255,255,255,0.10)';
  ctx.fillRect(-r * 2, 0, r * 4, r * 3);
  ctx.strokeStyle = SKIN.hot;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-r * 2, 0);
  ctx.lineTo(r * 2, 0);
  ctx.stroke();
  ctx.strokeStyle = SKIN.grid;
  ctx.lineWidth = 1;
  for (const d of [-30, -20, -10, 10, 20, 30]) {
    const y = d * 1.1;
    const w = d % 20 === 0 ? 20 : 11;
    ctx.beginPath();
    ctx.moveTo(-w, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.restore();
  ctx.strokeStyle = SKIN.dim;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  // Festes Schiffssymbol in der Mitte der Kugel.
  ctx.strokeStyle = SKIN.hot;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 14, cy);
  ctx.lineTo(cx - 5, cy);
  ctx.moveTo(cx + 5, cy);
  ctx.lineTo(cx + 14, cy);
  ctx.moveTo(cx, cy - 4);
  ctx.lineTo(cx, cy + 4);
  ctx.stroke();

  // Mitte: Peilung als Zahl ueber einem Band.
  label(p, 'PEILUNG', 112, top + 22);
  value(p, `${Math.round(att.bearing).toString().padStart(3, '0')}`, 112, top + 66, 44);

  // Rechts: Lage in Zahlen.
  label(p, 'LAGE', p.w - 12 - 92, top + 22);
  value(p, `${att.pitch >= 0 ? '+' : ''}${att.pitch.toFixed(0)}`, p.w - 12, top + 44, 22, 'right', SKIN.ink);
  label(p, 'ROLL', p.w - 12 - 92, top + 66);
  value(p, `${att.roll >= 0 ? '+' : ''}${att.roll.toFixed(0)}`, p.w - 12, top + 88, 22, 'right', SKIN.ink);

  // Peilband ueber die volle Breite: +-30 Grad, alle 5 Grad ein Strich.
  const tapeY = p.h - 34;
  const perDeg = p.w / 70;
  ctx.fillStyle = SKIN.grid;
  ctx.fillRect(0, tapeY, p.w, 1);
  for (let d = Math.ceil(att.bearing - 35); d <= att.bearing + 35; d++) {
    if (d % 5 !== 0) continue;
    const x = p.w / 2 + (d - att.bearing) * perDeg;
    const major = ((d % 10) + 10) % 10 === 0;
    ctx.fillStyle = major ? SKIN.ink : SKIN.dim;
    ctx.fillRect(x, tapeY, 1, major ? 10 : 5);
    if (major) {
      font(p, 12, 'bold');
      ctx.fillStyle = SKIN.dim;
      ctx.textAlign = 'center';
      ctx.fillText(`${((d % 360) + 360) % 360}`, x, tapeY + 24);
      ctx.textAlign = 'left';
    }
  }
  ctx.fillStyle = SKIN.hot;
  ctx.beginPath();
  ctx.moveTo(p.w / 2, tapeY - 2);
  ctx.lineTo(p.w / 2 - 6, tapeY - 12);
  ctx.lineTo(p.w / 2 + 6, tapeY - 12);
  ctx.closePath();
  ctx.fill();

  scanlines(p);
};

/** Gang: was man wissen will, wenn man hinten steht und das Schiff fliegt. */
const drawCorridor: Draw = (p, s) => {
  clear(p);
  const top = header(p, 'SCHIFF', blink(p.t, 0.5) > 0 ? 'AKTIV' : '');
  const pad = 12;

  label(p, 'GESCHWINDIGKEIT', pad, top + 26);
  value(p, `${Math.round(s.speed)}`, pad - 2, top + 73, 48);
  const w = p.ctx.measureText(`${Math.round(s.speed)}`).width;
  label(p, 'M/S', pad + w + 8, top + 73, 14, SKIN.ink);
  label(p, `SOLL ${Math.round(s.setSpeed)}`, p.w - pad - 96, top + 73, 14, SKIN.dim);

  gauge(p, pad, top + 81, p.w - pad * 2, 10, ratio(s.speed, s.maxSetSpeed), 20,
    ratio(s.setSpeed, s.maxSetSpeed));

  label(p, 'MODUS', pad, top + 111);
  label(p, s.fullStop ? 'FULL STOP' : MODE_SHORT[s.mode], p.w - pad - 104, top + 111, 15, SKIN.hot);

  label(p, 'HUELLE', pad, top + 139);
  gauge(p, pad, top + 145, p.w - pad * 2 - 62, 12, s.hull, 14);
  value(p, `${Math.round(s.hull * 100)}%`, p.w - pad, top + 157, 18, 'right', SKIN.ink);

  label(p, 'SEKTOR', pad, top + 181);
  label(p, sectorLabel(s.position), p.w - pad - 136, top + 181, 14, SKIN.ink);

  // Zeile fuer Fracht und Andocken, sobald es sie gibt.
  reserved(p, pad, p.h - 36, p.w - pad * 2, 28, 'FRACHT / DOCK');
  scanlines(p);
};

/** Werkbank im Frachtraum: Zustand des Schiffs und Platz fuer die Ladung. */
const drawBench: Draw = (p, s) => {
  clear(p);
  const top = header(p, 'WERKBANK');
  const pad = 10;

  label(p, 'HUELLE', pad, top + 24);
  value(p, `${Math.round(s.hull * 100)}%`, pad - 2, top + 66, 42);
  gauge(p, pad, top + 76, p.w - pad * 2, 12, s.hull, 14);

  const cellW = (p.w - pad * 2 - 8) / 2;
  const cellY = top + 96;
  const cellH = (p.h - cellY - pad - 8) / 2;
  reserved(p, pad, cellY, cellW, cellH, 'FRACHT');
  reserved(p, pad + cellW + 8, cellY, cellW, cellH, 'TEILE');
  reserved(p, pad, cellY + cellH + 8, cellW, cellH, 'REPARATUR');
  reserved(p, pad + cellW + 8, cellY + cellH + 8, cellW, cellH, 'ENERGIE');

  scanlines(p);
};

// -------------------------------------------------------------- Schirmtabelle

interface ScreenDef {
  mesh: string;
  width: number;
  height: number;
  /** Aktualisierungen je Sekunde. */
  hz: number;
  /**
   * Flaechennormale und "rechts aus Sicht des Lesers", beide im Modellraum
   * des GLB (Nase +Z). Daraus entstehen die planaren UVs; die des Laders
   * taugen nur fuer waagerechte Flaechen (siehe {@link setPlanarUv}).
   */
  normal: [number, number, number];
  right: [number, number, number];
  draw: Draw;
}

/**
 * Seitenverhaeltnis der Leinwaende = Seitenverhaeltnis der Meshes, sonst
 * stauchen die Ziffern. MFD0 liegt aus Sicht des Piloten rechts, MFD2 links
 * (der Innenraum wird beim Laden um die Y-Achse gedreht).
 */
const SCREENS: ScreenDef[] = [
  {
    mesh: 'SM_Screen_MFD2', width: 384, height: 216, hz: 12,
    normal: [0, 1, 0], right: [-1, 0, 0], draw: drawDrive,
  },
  {
    mesh: 'SM_Screen_MFD0', width: 384, height: 216, hz: 12,
    normal: [0, 1, 0], right: [-1, 0, 0], draw: drawCombat,
  },
  {
    // Haengt ueber dem Kopf: von unten gesehen kippt die Leserichtung.
    mesh: 'SM_Screen_Overhead', width: 400, height: 160, hz: 8,
    normal: [0, -1, 0], right: [-1, 0, 0], draw: drawNav,
  },
  {
    mesh: 'SM_Screen_Corridor', width: 352, height: 256, hz: 5,
    normal: [1, 0, 0], right: [0, 0, -1], draw: drawCorridor,
  },
  {
    mesh: 'SM_Screen_Bench', width: 320, height: 232, hz: 3,
    normal: [1, 0, 0], right: [0, 0, -1], draw: drawBench,
  },
];

/**
 * Planare UVs aus der Bounding-Box: `u` laeuft nach `right`, `v` nach unten.
 *
 * Der Lader erzeugt UVs aus der Flaechennormalen — die findet er bei den
 * gefasten Schirmkoerpern aber nicht (sechs Flaechen, sechs Normalen) und faellt
 * auf "waagerecht" zurueck. Fuer die Wandschirme in Gang und Frachtraum
 * bedeutet das eine Projektion auf ihre 12 mm Dicke: die Textur wird zum
 * Streifen. Deshalb hier noch einmal, mit bekannter Lage.
 */
function setPlanarUv(mesh: Mesh, normal: Vector3, right: Vector3): void {
  const position = mesh.geometry.getAttribute('position') as BufferAttribute;
  const down = new Vector3().crossVectors(right, normal).normalize();

  let uMin = Infinity;
  let uMax = -Infinity;
  let vMin = Infinity;
  let vMax = -Infinity;
  const point = new Vector3();
  for (let i = 0; i < position.count; i++) {
    point.fromBufferAttribute(position, i);
    const u = point.dot(right);
    const v = point.dot(down);
    uMin = Math.min(uMin, u);
    uMax = Math.max(uMax, u);
    vMin = Math.min(vMin, v);
    vMax = Math.max(vMax, v);
  }

  const uSpan = Math.max(uMax - uMin, 1e-6);
  const vSpan = Math.max(vMax - vMin, 1e-6);
  const uv = new Float32Array(position.count * 2);
  for (let i = 0; i < position.count; i++) {
    point.fromBufferAttribute(position, i);
    uv[i * 2] = (point.dot(right) - uMin) / uSpan;
    uv[i * 2 + 1] = (point.dot(down) - vMin) / vSpan;
  }
  mesh.geometry.setAttribute('uv', new BufferAttribute(uv, 2));
}

/**
 * Anhebung der Leuchtstaerke gegenueber dem Wert aus dem GLB. Die Schirme
 * tragen jetzt Inhalt statt einer Leuchtflaeche — mit der Daempfung des Laders
 * (0,3) blieben sie im Cockpit unter der Wahrnehmungsschwelle.
 */
const EMISSIVE_BOOST = 1.45;

interface Panel {
  def: ScreenDef;
  paint: Paint;
  texture: CanvasTexture;
  material: MeshStandardMaterial;
  /** Grundhelligkeit des Materials, Bezug fuer das Flackern. */
  baseEmissive: number;
  /** Wert aus dem GLB, wird beim Abraeumen zurueckgesetzt. */
  originalEmissive: number;
  /** Sekunden seit dem letzten Neuzeichnen. */
  since: number;
}

export class CockpitDisplays {
  private readonly panels: Panel[] = [];
  private time = 0;

  /**
   * Schirme auf den geladenen Innenraum legen. Nach `Ship.setInterior()`
   * aufrufen; liefert die Zahl der belegten Flaechen.
   */
  attachTo(interior: Object3D): number {
    this.dispose();
    for (const def of SCREENS) {
      const mesh = interior.getObjectByName(def.mesh);
      if (!(mesh instanceof Mesh)) continue;
      const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
      if (!(material instanceof MeshStandardMaterial)) continue;

      setPlanarUv(
        mesh,
        new Vector3(...def.normal).normalize(),
        new Vector3(...def.right).normalize(),
      );

      const canvas = document.createElement('canvas');
      canvas.width = def.width;
      canvas.height = def.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error(`2D-Context fuer ${def.mesh} nicht verfuegbar`);

      const texture = new CanvasTexture(canvas);
      texture.colorSpace = SRGBColorSpace;
      texture.magFilter = LinearFilter;
      // Die Konsolenschirme liegen flach; ohne Anisotropie verschmiert die
      // Schrift aus der Sitzposition zu Streifen.
      texture.anisotropy = 8;
      texture.flipY = false; // glTF-UV-Konvention wie die uebrigen Screens
      material.emissiveMap = texture;
      material.emissiveIntensity *= EMISSIVE_BOOST;
      material.needsUpdate = true;

      this.panels.push({
        def,
        paint: { ctx, w: def.width, h: def.height, t: 0 },
        texture,
        material,
        baseEmissive: material.emissiveIntensity,
        originalEmissive: material.emissiveIntensity / EMISSIVE_BOOST,
        since: Infinity,
      });
    }
    return this.panels.length;
  }

  /**
   * Schirme fortschreiben. Je Frame wird hoechstens **ein** Schirm neu
   * gezeichnet — fuenf Canvas-Durchgaenge im selben Frame waeren ein sichtbarer
   * Ruckler, und keine dieser Anzeigen braucht mehr als ein paar Bilder je
   * Sekunde. Das Flackern dagegen laeuft in jedem Frame: es ist nur eine
   * Materialzahl und laesst die Schirme atmen.
   */
  update(dt: number, state: HudState): void {
    this.time += dt;

    // Der ueberfaelligste Schirm kommt dran, nicht der naechste in der Liste:
    // sonst verhungert bei knapper Bildrate immer derselbe.
    let candidate: Panel | null = null;
    let worst = 1;
    for (const panel of this.panels) {
      panel.since += dt;
      const due = panel.since * panel.def.hz;
      if (due >= worst) {
        worst = due;
        candidate = panel;
      }
      panel.material.emissiveIntensity = panel.baseEmissive * flicker(this.time, panel.def.hz);
    }

    if (candidate) {
      candidate.paint.t = this.time;
      candidate.since = 0;
      candidate.def.draw(candidate.paint, state);
      candidate.texture.needsUpdate = true;
    }
  }

  dispose(): void {
    for (const panel of this.panels) {
      panel.material.emissiveIntensity = panel.originalEmissive;
      panel.texture.dispose();
    }
    this.panels.length = 0;
  }
}

/**
 * Leichtes Flackern der Leuchtstaerke. Zwei ungerade Frequenzen ueberlagert,
 * damit kein Takt hoerbar wird; der Ausschlag bleibt klein — sichtbar, sobald
 * man hinsieht, nie stoerend.
 */
function flicker(t: number, seed: number): number {
  return 1
    + Math.sin(t * (7.3 + seed * 0.7)) * 0.018
    + Math.sin(t * (19.1 + seed * 1.3)) * 0.012;
}
