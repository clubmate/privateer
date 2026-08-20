import { CanvasTexture, LinearFilter, Object3D, Sprite, SpriteMaterial, SRGBColorSpace } from 'three';

/**
 * Anflugmarker der Station — eine Klammer im Raum, kein DOM-Element.
 *
 * Das HUD haengt am Bildschirm; dieser Marker haengt an der Station und wird
 * dadurch von Kanzelstreben und Rumpf verdeckt wie alles andere draussen. Er
 * besteht aus zwei Sprites: der Klammer, die die Station umfasst, und einer
 * Beschriftung darunter. Beide sind Billboards, drehen sich also mit — auch
 * wenn das Schiff rollt.
 */

export type MarkerMode = 'hidden' | 'far' | 'in-range' | 'cleared';

/** Kleinster Weltdurchmesser der Klammer in m — sie soll die Station fassen. */
const MIN_FRAME_SIZE = 460;
/** Anteil der Entfernung, den die Klammer aufspannt (~5,7 Grad). */
const FRAME_ANGULAR = 0.1;
/** Obergrenze desselben Anteils (~17 Grad), damit sie im Nahbereich nicht das Bild sprengt. */
const MAX_FRAME_ANGULAR = 0.3;
/** Anteil der Entfernung, den die Schrift aufspannt. */
const LABEL_ANGULAR = 0.052;
/** Seitenverhaeltnis der Schrifttafel. */
const LABEL_ASPECT = 4;

const FRAME_PX = 256;
const LABEL_PX = 1024;

const COLORS: Record<Exclude<MarkerMode, 'hidden'>, string> = {
  far: 'rgba(102, 234, 255, 0.55)',
  'in-range': 'rgba(102, 234, 255, 0.95)',
  cleared: 'rgba(255, 179, 71, 1)',
};

function makeSprite(width: number, height: number): { sprite: Sprite; canvas: HTMLCanvasElement } {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.generateMipmaps = false;
  const sprite = new Sprite(
    new SpriteMaterial({
      map: texture,
      transparent: true,
      // Der Marker soll die Station markieren, nicht hinter ihr verschwinden.
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  return { sprite, canvas };
}

export class ApproachMarker extends Object3D {
  private readonly frame: Sprite;
  private readonly frameCanvas: HTMLCanvasElement;
  private readonly label: Sprite;
  private readonly labelCanvas: HTMLCanvasElement;

  private drawnMode: MarkerMode | '' = '';
  private drawnText = '';

  constructor() {
    super();
    this.name = 'ApproachMarker';
    // Der Marker verdeckt nichts und wird von nichts verdeckt; er soll auch
    // dann nicht wegfallen, wenn sein Mittelpunkt knapp aus dem Bild laeuft.
    this.frustumCulled = false;

    const frame = makeSprite(FRAME_PX, FRAME_PX);
    this.frame = frame.sprite;
    this.frameCanvas = frame.canvas;

    const label = makeSprite(LABEL_PX, LABEL_PX / LABEL_ASPECT);
    this.label = label.sprite;
    this.labelCanvas = label.canvas;

    for (const sprite of [this.frame, this.label]) {
      sprite.frustumCulled = false;
      sprite.renderOrder = 5;
      this.add(sprite);
    }
    this.visible = false;
  }

  /**
   * Marker fuer diesen Frame setzen. `distance` ist die Entfernung zur Kamera
   * und bestimmt die Groesse: die Klammer haelt einen festen Sehwinkel, faellt
   * aber nie unter {@link MIN_FRAME_SIZE} — sonst laege sie bei weiter
   * Entfernung innerhalb der Silhouette der Station.
   */
  update(mode: MarkerMode, distance: number, name: string, hint: string): void {
    this.visible = mode !== 'hidden';
    if (!this.visible) return;

    const frameSize = Math.min(
      Math.max(MIN_FRAME_SIZE, distance * FRAME_ANGULAR),
      distance * MAX_FRAME_ANGULAR,
    );
    this.frame.scale.set(frameSize, frameSize, 1);

    const labelWidth = Math.max(distance * LABEL_ANGULAR, frameSize * 0.42);
    const labelHeight = labelWidth / LABEL_ASPECT;
    this.label.scale.set(labelWidth, labelHeight, 1);
    // `center` verschiebt in der Billboard-Ebene, nicht in Weltrichtung — nur
    // so bleibt die Schrift unter der Klammer, auch wenn das Schiff rollt.
    this.label.center.set(0.5, 0.5 + (frameSize * 0.58) / labelHeight);

    if (mode !== this.drawnMode) {
      this.drawFrame(mode);
      this.drawnMode = mode;
      this.drawnText = '';
    }

    const text = `${name}  ${formatDistance(distance)}\n${hint}`;
    if (text !== this.drawnText) {
      this.drawLabel(mode, text);
      this.drawnText = text;
    }
  }

  private drawFrame(mode: MarkerMode): void {
    if (mode === 'hidden') return;
    const ctx = this.frameCanvas.getContext('2d');
    if (!ctx) return;
    const s = FRAME_PX;
    ctx.clearRect(0, 0, s, s);

    const color = COLORS[mode];
    const inset = 14;
    const arm = 52;
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineCap = 'square';

    // Vier Ecken statt eines geschlossenen Rahmens: verdeckt weniger.
    for (const [cx, cy, sx, sy] of [
      [inset, inset, 1, 1],
      [s - inset, inset, -1, 1],
      [inset, s - inset, 1, -1],
      [s - inset, s - inset, -1, -1],
    ] as const) {
      ctx.beginPath();
      ctx.moveTo(cx + sx * arm, cy);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx, cy + sy * arm);
      ctx.stroke();
    }

    // Kurze Strichmarken an den Kantenmitten — gibt der Klammer eine Mitte.
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.6;
    for (const [x1, y1, x2, y2] of [
      [s / 2, inset, s / 2, inset + 16],
      [s / 2, s - inset, s / 2, s - inset - 16],
      [inset, s / 2, inset + 16, s / 2],
      [s - inset, s / 2, s - inset - 16, s / 2],
    ] as const) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const map = this.frame.material.map;
    if (map) map.needsUpdate = true;
  }

  private drawLabel(mode: MarkerMode, text: string): void {
    if (mode === 'hidden') return;
    const ctx = this.labelCanvas.getContext('2d');
    if (!ctx) return;
    const w = this.labelCanvas.width;
    const h = this.labelCanvas.height;
    ctx.clearRect(0, 0, w, h);

    const color = COLORS[mode];
    const [title = '', hint = ''] = text.split('\n');

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.font = "600 78px ui-monospace, 'DejaVu Sans Mono', monospace";
    ctx.fillText(title, w / 2, h * 0.33);

    ctx.globalAlpha = 0.78;
    ctx.font = "500 58px ui-monospace, 'DejaVu Sans Mono', monospace";
    ctx.fillText(hint, w / 2, h * 0.72);
    ctx.globalAlpha = 1;

    const map = this.label.material.map;
    if (map) map.needsUpdate = true;
  }
}

/** Entfernung lesbar und traege genug, dass die Tafel nicht jeden Frame neu muss. */
export function formatDistance(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} KM`;
  return `${Math.round(meters / 10) * 10} M`;
}
