import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three';
import type { Texture } from 'three';

/**
 * Prozedurale Oberflaechen fuer den Innenraum.
 *
 * Das GLB hat keine einzige Textur — jede Wand ist eine einfarbige Flaeche.
 * Hier entstehen kachelbare Blech- und Gitterrostmuster als Hoehenfeld, aus dem
 * Normal-, Rauheits- und ein dezenter Farbschmutz-Kanal abgeleitet werden. Das
 * gibt den Flaechen Naehte, Nieten und Gebrauchsspuren, ohne dass ein einziges
 * Bild geladen werden muss.
 *
 * Die UVs kommen aus einer Boxprojektion in Modellkoordinaten (siehe
 * `InteriorLoader.boxProjectUv`), damit benachbarte Teile nahtlos zueinander
 * passen: eine UV-Einheit = {@link TILE_METERS} Meter.
 */

/** Kantenlaenge einer Kachel in Metern. */
export const TILE_METERS = 2;

/** Aufloesung der erzeugten Kacheln. */
const SIZE = 512;

export interface SurfaceMaps {
  /** Dezenter Helligkeitsschmutz, multipliziert die Materialfarbe. */
  map: Texture;
  /** Rauheitsvariation (Kanal G). */
  roughnessMap: Texture;
  /** Aus dem Hoehenfeld abgeleitete Normalen. */
  normalMap: Texture;
}

export type SurfaceKind = 'panel' | 'worn' | 'grate';

/**
 * Wertrauschen auf einem vorberechneten Gitter.
 *
 * Die Kacheln sind 512x512 Pixel und werden mehrfach ueberlagert abgetastet —
 * das Rauschen je Pixel neu zu hashen kostet Millionen Sinus-Aufrufe und
 * bremste die Erzeugung auf ueber eine Sekunde pro Kachel. Stattdessen wird je
 * (Periode, Seed) einmal ein kleines Gitter gefuellt und daraus bilinear
 * interpoliert; das ist derselbe Effekt zum Bruchteil der Kosten.
 */
const lattices = new Map<string, Float32Array>();

function lattice(period: number, seed: number): Float32Array {
  const key = `${period}:${seed}`;
  const cached = lattices.get(key);
  if (cached) return cached;

  const values = new Float32Array(period * period);
  for (let i = 0; i < values.length; i++) {
    const n = Math.sin((i % period) * 127.1 + Math.floor(i / period) * 311.7 + seed * 74.7) * 43758.5453;
    values[i] = n - Math.floor(n);
  }
  lattices.set(key, values);
  return values;
}

/** Bilinear interpoliertes, kachelbares Wertrauschen. */
function valueNoise(x: number, y: number, period: number, seed: number): number {
  const grid = lattice(period, seed);
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const x0 = ((xi % period) + period) % period;
  const y0 = ((yi % period) + period) % period;
  const x1 = (x0 + 1) % period;
  const y1 = (y0 + 1) % period;

  const a = grid[y0 * period + x0]!;
  const b = grid[y0 * period + x1]!;
  const c = grid[y1 * period + x0]!;
  const d = grid[y1 * period + x1]!;

  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
}

/**
 * Mehrere Oktaven Wertrauschen, Ergebnis 0..1. `period` ist die Gitterweite
 * der ersten Oktave in Abtastschritten und muss ganzzahlig sein, damit die
 * Kachel nahtlos bleibt.
 */
function fbm(x: number, y: number, octaves: number, period: number, seed: number): number {
  let sum = 0;
  let amplitude = 0.5;
  let total = 0;
  let scale = 1;
  for (let o = 0; o < octaves; o++) {
    sum += valueNoise(x * scale, y * scale, Math.max(2, Math.round(period * scale)), seed + o) * amplitude;
    total += amplitude;
    amplitude *= 0.5;
    scale *= 2;
  }
  return sum / total;
}

/** Abstand zum naechsten Kachelraster-Gitter in Pixeln (kachelbar). */
function seamDistance(v: number, cells: number): number {
  const step = SIZE / cells;
  const local = v % step;
  return Math.min(local, step - local);
}

/**
 * Hoehenfeld einer Kachel. Werte 0..1; Naehte liegen tief, Nieten hoch.
 */
function heightField(kind: SurfaceKind): Float32Array {
  const height = new Float32Array(SIZE * SIZE);
  const cells = kind === 'grate' ? 16 : 2;
  const rivetSpacing = SIZE / 8;

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const grain = fbm(x / 24, y / 24, 4, SIZE / 24, kind === 'worn' ? 7 : 3);
      // Sehr flach halten: die Huellenmaterialien sind stark metallisch und
      // spiegeln jede Delle als Glanzlicht — zu viel Korn sieht nass aus.
      let h = 0.55 + (grain - 0.5) * (kind === 'worn' ? 0.12 : 0.06);

      const seam = Math.min(seamDistance(x, cells), seamDistance(y, cells));
      if (kind === 'grate') {
        // Lochblech: runde Vertiefungen im Raster.
        const step = SIZE / cells;
        const cx = (x % step) - step / 2;
        const cy = (y % step) - step / 2;
        const r = Math.hypot(cx, cy) / (step * 0.36);
        if (r < 1) h -= (1 - r * r) * 0.55;
      } else {
        // Blechnaht: schmale Kerbe mit weicher Schulter.
        if (seam < 3) h -= (1 - seam / 3) * 0.22;
        // Nieten entlang der Naht.
        if (seam < 4) {
          const alongX = seamDistance(x, cells) < seamDistance(y, cells);
          const along = alongX ? y : x;
          const d = Math.abs((along % rivetSpacing) - rivetSpacing / 2);
          if (d < 1.6) h += (1 - d / 1.6) * 0.16;
        }
      }

      // Kratzer: duenne, gerichtete Linien.
      if (kind === 'worn') {
        const scratch = fbm((x + y * 0.35) / 3, y / 90, 2, SIZE / 3, 21);
        if (scratch > 0.8) h -= (scratch - 0.8) * 0.5;
      }

      height[y * SIZE + x] = Math.min(Math.max(h, 0), 1);
    }
  }
  return height;
}

function makeTexture(data: Uint8ClampedArray<ArrayBuffer>, srgb: boolean): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D-Context fuer Oberflaechentextur nicht verfuegbar');
  ctx.putImageData(new ImageData(data, SIZE, SIZE), 0, 0);

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.anisotropy = 8;
  if (srgb) texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** Erzeugt Farb-, Rauheits- und Normalkachel fuer eine Oberflaechenart. */
export function createSurfaceMaps(kind: SurfaceKind): SurfaceMaps {
  const height = heightField(kind);

  const albedo = new Uint8ClampedArray(SIZE * SIZE * 4);
  const rough = new Uint8ClampedArray(SIZE * SIZE * 4);
  const normal = new Uint8ClampedArray(SIZE * SIZE * 4);

  // Staerke der Normalen: aus dem Hoehenfeld in Pixeln.
  const strength = kind === 'grate' ? 4.0 : 2.2;

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = y * SIZE + x;
      const h = height[i]!;

      // --- Farbe: nur Helligkeit, die Materialfarbe kommt aus dem GLB.
      const dirt = fbm(x / 60, y / 60, 3, SIZE / 60, kind === 'worn' ? 11 : 5);
      // Um 0,9 zentriert: die Kachel multipliziert die Materialfarbe des GLB
      // und soll sie schattieren, nicht generell abdunkeln.
      const shade = 0.78 + h * 0.2 + (dirt - 0.5) * 0.18;
      const c = Math.round(Math.min(Math.max(shade, 0), 1) * 255);
      albedo[i * 4] = c;
      albedo[i * 4 + 1] = c;
      albedo[i * 4 + 2] = c;
      albedo[i * 4 + 3] = 255;

      // --- Rauheit: Vertiefungen und Schmutz sind matter als die Flaeche.
      // Die Map *multipliziert* die Materialrauheit und kann sie deshalb nur
      // senken — also nahe 1 bleiben, sonst wird die ganze Huelle spiegelnd.
      const r = 0.86 + (1 - h) * 0.18 + (dirt - 0.5) * 0.16;
      const rc = Math.round(Math.min(Math.max(r, 0), 1) * 255);
      rough[i * 4] = rc;
      rough[i * 4 + 1] = rc;
      rough[i * 4 + 2] = rc;
      rough[i * 4 + 3] = 255;

      // --- Normale aus zentralen Differenzen (kachelbar per Modulo).
      const left = height[y * SIZE + ((x - 1 + SIZE) % SIZE)]!;
      const right = height[y * SIZE + ((x + 1) % SIZE)]!;
      const up = height[((y - 1 + SIZE) % SIZE) * SIZE + x]!;
      const down = height[((y + 1) % SIZE) * SIZE + x]!;
      const dx = (left - right) * strength;
      const dy = (up - down) * strength;
      const len = Math.hypot(dx, dy, 1);
      normal[i * 4] = Math.round(((dx / len) * 0.5 + 0.5) * 255);
      normal[i * 4 + 1] = Math.round(((dy / len) * 0.5 + 0.5) * 255);
      normal[i * 4 + 2] = Math.round((1 / len) * 0.5 * 255 + 127.5);
      normal[i * 4 + 3] = 255;
    }
  }

  return {
    map: makeTexture(albedo, true),
    roughnessMap: makeTexture(rough, false),
    normalMap: makeTexture(normal, false),
  };
}
