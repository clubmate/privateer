import { CanvasTexture, LinearFilter, SRGBColorSpace } from 'three';
import type { Texture } from 'three';

/**
 * Prozedurale Displayinhalte fuer die Emissive-Flaechen im Innenraum.
 *
 * Das GLB liefert nur einfarbige Leuchtflaechen. Hier entstehen daraus per
 * Canvas kleine Instrumentenbilder (Radar, Balken, Zeilen), die als
 * `emissiveMap` auf das jeweilige Mesh gelegt werden — dadurch bekommen die
 * Screens Struktur statt einer flachen Farbflaeche.
 *
 * Die Texturen sind **graustufig**: Three multipliziert die Emissive-Map mit
 * der Emissive-Farbe des Materials. Cyan oder Bernstein kommen also aus dem
 * GLB-Material, die Textur steuert nur die Helligkeit. Ein dunkler Hintergrund
 * wuerde den Screen schlicht ausschalten.
 */

/** Kantenlaenge der Texturen. Klein reicht: die Screens sind handtellergross. */
const SIZE = 256;

export type ScreenKind = 'radar' | 'bars' | 'text' | 'ladder';

interface Style {
  /** Helle Zeichenfarbe (Schrift, Balkenfuellung, Kontakte). */
  ink: string;
  /** Gedaempfte Zeichenfarbe fuer Raster und leere Balken. */
  dim: string;
  /** Grundhelligkeit der Flaeche. */
  base: string;
}

/** Graustufen-Palette; die Farbe kommt aus dem Material (siehe Kopfkommentar). */
const STYLE: Style = { ink: '#ffffff', dim: '#4e4e4e', base: '#7d7d7d' };

function canvas(style: Style): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const el = document.createElement('canvas');
  el.width = SIZE;
  el.height = SIZE;
  const ctx = el.getContext('2d');
  if (!ctx) throw new Error('2D-Context fuer Screen-Textur nicht verfuegbar');
  ctx.fillStyle = style.base;
  ctx.fillRect(0, 0, SIZE, SIZE);
  return [el, ctx];
}

/** Feine Scanlines ueber das fertige Bild — macht die Flaeche lebendiger. */
function scanlines(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = 'rgba(0,0,0,0.16)';
  for (let y = 0; y < SIZE; y += 6) ctx.fillRect(0, y, SIZE, 2);
}

function drawRadar(ctx: CanvasRenderingContext2D, s: Style): void {
  const c = SIZE / 2;
  ctx.strokeStyle = s.dim;
  ctx.lineWidth = 2;
  for (const r of [30, 60, 90, 118]) {
    ctx.beginPath();
    ctx.arc(c, c, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(c, 8);
  ctx.lineTo(c, SIZE - 8);
  ctx.moveTo(8, c);
  ctx.lineTo(SIZE - 8, c);
  ctx.stroke();

  // Sweep-Keil und ein paar Kontakte.
  const grad = ctx.createLinearGradient(c, c, SIZE, 40);
  grad.addColorStop(0, 'rgba(255,255,255,0.6)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(c, c);
  ctx.arc(c, c, 118, -1.2, -0.5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = s.ink;
  for (const [x, y, r] of [
    [168, 84, 5],
    [96, 150, 4],
    [190, 176, 3],
    [70, 78, 3],
  ]) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBars(ctx: CanvasRenderingContext2D, s: Style): void {
  const rows = ['PWR', 'SHD', 'FUEL', 'ENG', 'CARGO', 'O2'];
  const levels = [0.92, 0.74, 0.61, 0.88, 0.35, 0.97];
  ctx.font = 'bold 20px monospace';
  ctx.textBaseline = 'middle';
  rows.forEach((label, i) => {
    const y = 28 + i * 38;
    ctx.fillStyle = s.dim;
    ctx.fillText(label, 12, y);
    ctx.fillRect(96, y - 10, 148, 20);
    ctx.fillStyle = s.ink;
    ctx.fillRect(96, y - 10, 148 * levels[i], 20);
  });
}

function drawText(ctx: CanvasRenderingContext2D, s: Style): void {
  const lines = [
    'NAV LINK  OK',
    'JUMP DRV  IDLE',
    '',
    'SECTOR   TROJA-4',
    'BEARING  114.6',
    'RANGE    8.42 KM',
    '',
    'CARGO    12 / 40 T',
    'CREDITS  4 180',
  ];
  ctx.font = '19px monospace';
  ctx.textBaseline = 'top';
  lines.forEach((line, i) => {
    ctx.fillStyle = i < 2 ? s.ink : s.dim;
    ctx.fillText(line, 14, 14 + i * 26);
  });
  ctx.fillStyle = s.ink;
  ctx.fillRect(14, 14 + lines.length * 26, 14, 18);
}

function drawLadder(ctx: CanvasRenderingContext2D, s: Style): void {
  ctx.strokeStyle = s.dim;
  ctx.lineWidth = 3;
  for (let i = 0; i < 9; i++) {
    const y = 20 + i * 26;
    const w = i % 2 === 0 ? 96 : 56;
    ctx.beginPath();
    ctx.moveTo(SIZE / 2 - w, y);
    ctx.lineTo(SIZE / 2 + w, y);
    ctx.stroke();
  }
  ctx.strokeStyle = s.ink;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(28, 150);
  ctx.lineTo(SIZE - 28, 122);
  ctx.stroke();
}

const DRAW: Record<ScreenKind, (ctx: CanvasRenderingContext2D, s: Style) => void> = {
  radar: drawRadar,
  bars: drawBars,
  text: drawText,
  ladder: drawLadder,
};

/** Erzeugt die Emissive-Map fuer einen Screen. */
export function createScreenTexture(kind: ScreenKind): Texture {
  const [el, ctx] = canvas(STYLE);
  DRAW[kind](ctx, STYLE);
  scanlines(ctx);

  const texture = new CanvasTexture(el);
  texture.colorSpace = SRGBColorSpace;
  texture.magFilter = LinearFilter;
  texture.anisotropy = 4;
  texture.flipY = false; // glTF-UV-Konvention
  return texture;
}
