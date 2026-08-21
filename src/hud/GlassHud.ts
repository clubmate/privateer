import {
  AdditiveBlending,
  BufferGeometry,
  CanvasTexture,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from 'three';
import type { Object3D, PerspectiveCamera, Texture } from 'three';
import type { HudState } from './HudState';
import { MINERALS } from '../world/AsteroidTypes';
import { formatTons } from '../cargo/CargoHold';
import type { MiningStatus } from '../mining/MiningSystem';

/**
 * Das Flug-HUD als echte Projektion vor der Kanzel.
 *
 * Fadenkreuz, Zielklammer, Vorhalt und Bahnmarken haengen nicht mehr flach im
 * DOM, sondern als leuchtende Flaechen 2,4 m vor dem Augenpunkt — also
 * ausserhalb der Scheibe, ueber der Nase. Jedes Zeichen wird jeden Frame auf
 * die Richtung gesetzt, die es meint (Weltrichtung, vom Auge aus), und dreht
 * sich zum Auge: die Anzeige zeigt weiter korrekt in die Welt, bekommt aber
 * Tiefe, Perspektive und den Versatz gegen den Kanzelrahmen.
 *
 * Verankert ist die Gruppe am Schiff, nicht an der Kamera. Beim Rumpeln
 * (CameraShake) wandert das Fadenkreuz deshalb ueber das Bild — es sitzt auf
 * der Kanonenlinie, und die zittert nicht mit dem Kopf des Piloten.
 *
 * Alle Materialien blenden additiv und schreiben keine Tiefe: die Zeichen
 * verdecken nichts, sie liegen ueber dem Bild wie ein Reflex auf Glas.
 */

/** Abstand der Zeichenebene vom Augenpunkt in Metern (Nasenspitze: ca. 2,0 m). */
const DEPTH = 2.4;

/**
 * Vollausschlag des Steuerkreuzes als Anteil der halben Bildhoehe — derselbe
 * Wert, den das DOM-HUD als `CURSOR_RADIUS_FACTOR` 0,38 benutzt hat (0,38
 * Bildhoehe = 0,76 in NDC).
 */
export const CURSOR_SPAN = 0.76;

/** Groesse der Zielklammer auf der Zeichenebene, in Metern. */
const BOX_MIN = 0.10;
const BOX_MAX = 0.95;

/** Ab diesem Winkel zur Blickachse verschwinden die Bahnmarken. */
const MARKER_LIMIT_DEG = 46;
const MARKER_FADE_DEG = 8;

/** Ab dieser Bahngeschwindigkeit hat der Geschwindigkeitsvektor eine Richtung. */
const MARKER_MIN_SPEED = 1;

/** So lange blitzt das Fadenkreuz nach einem Treffer auf, in Sekunden. */
const HIT_FLASH = 0.18;

/** Farben. Werte ueber 1 sind Absicht: der Bloom soll sie aufgreifen. */
const FLIGHT_COLOR = new Color(0.55, 2.1, 1.35);
const TARGET_COLOR = new Color(2.4, 1.35, 0.45);

// ------------------------------------------------------------------ Rechnen

/**
 * Blickrichtung des Steuerkreuzes im Kameraraum. Der Mausoffset ist der
 * gleiche wie im DOM-HUD (-1..1, y positiv = unten); umgerechnet wird ueber
 * das Sichtfeld, damit das Kreuz an derselben Bildstelle sitzt wie vorher.
 */
export function cursorDirection(
  offsetX: number,
  offsetY: number,
  fovDeg: number,
  out: Vector3,
): Vector3 {
  const tanHalf = Math.tan((fovDeg * Math.PI) / 360);
  return out.set(CURSOR_SPAN * offsetX * tanHalf, -CURSOR_SPAN * offsetY * tanHalf, -1).normalize();
}

/**
 * Kantenlaenge der Zielklammer auf der Zeichenebene: so gross, dass sie den
 * Brocken wirklich einrahmt, aber nie unter Fingernagelgroesse faellt.
 */
export function boxEdge(radius: number, distance: number, depth = DEPTH): number {
  const edge = (2 * radius * depth) / Math.max(distance, 1);
  return Math.max(BOX_MIN, Math.min(BOX_MAX, edge));
}

/**
 * Deckkraft einer Bahnmarke ueber dem Winkel zur Blickachse. Anders als im
 * DOM klebt in 3D nichts am Bildrand — statt zu springen, blendet die Marke
 * am Rand des Sichtfelds weich aus.
 */
export function markerOpacity(angleDeg: number, limitDeg = MARKER_LIMIT_DEG, fadeDeg = MARKER_FADE_DEG): number {
  if (angleDeg <= limitDeg - fadeDeg) return 1;
  if (angleDeg >= limitDeg) return 0;
  return (limitDeg - angleDeg) / fadeDeg;
}

// ------------------------------------------------------------ Zeichenvorrat

/** Leinwand fuer ein Symbol; weiss auf durchsichtig, die Farbe kommt vom Material. */
function symbolCanvas(size: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D-Context fuer das Scheiben-HUD nicht verfuegbar');
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#ffffff';
  ctx.lineCap = 'round';
  // Der Halo macht aus einer harten Linie eine Leuchtspur — ohne ihn sehen
  // die Zeichen wie aufgeklebte Vektoren aus.
  ctx.shadowColor = 'rgba(255,255,255,0.9)';
  ctx.shadowBlur = size * 0.05;
  return [canvas, ctx];
}

function texture(canvas: HTMLCanvasElement): CanvasTexture {
  const t = new CanvasTexture(canvas);
  t.anisotropy = 4;
  return t;
}

function crosshairTexture(): Texture {
  const [canvas, ctx] = symbolCanvas(256);
  const c = 128;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(c, c, 30, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(c, c, 62, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.lineWidth = 6;
  for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]] as const) {
    ctx.beginPath();
    ctx.moveTo(c + dx * 74, c + dy * 74);
    ctx.lineTo(c + dx * 116, c + dy * 116);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(c, c, 4, 0, Math.PI * 2);
  ctx.fill();
  return texture(canvas);
}

function cornerTexture(): Texture {
  const [canvas, ctx] = symbolCanvas(64);
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(8, 56);
  ctx.lineTo(8, 8);
  ctx.lineTo(56, 8);
  ctx.stroke();
  return texture(canvas);
}

function leadTexture(): Texture {
  const [canvas, ctx] = symbolCanvas(128);
  const c = 64;
  ctx.lineWidth = 6;
  ctx.setLineDash([9, 7]);
  ctx.beginPath();
  ctx.arc(c, c, 38, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(c, c, 6, 0, Math.PI * 2);
  ctx.fill();
  return texture(canvas);
}

function progradeTexture(): Texture {
  const [canvas, ctx] = symbolCanvas(128);
  const c = 64;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(c, c, 26, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(c, c, 5, 0, Math.PI * 2);
  ctx.fill();
  for (const [dx, dy] of [[0, -1], [-1, 0], [1, 0]] as const) {
    ctx.beginPath();
    ctx.moveTo(c + dx * 26, c + dy * 26);
    ctx.lineTo(c + dx * 52, c + dy * 52);
    ctx.stroke();
  }
  return texture(canvas);
}

function retrogradeTexture(): Texture {
  const [canvas, ctx] = symbolCanvas(128);
  const c = 64;
  ctx.lineWidth = 5;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.arc(c, c, 26, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(c - 15, c - 15);
  ctx.lineTo(c + 15, c + 15);
  ctx.moveTo(c + 15, c - 15);
  ctx.lineTo(c - 15, c + 15);
  ctx.stroke();
  for (const [dx, dy] of [[0, -1], [-1, 0], [1, 0], [0, 1]] as const) {
    ctx.beginPath();
    ctx.moveTo(c + dx * 26, c + dy * 26);
    ctx.lineTo(c + dx * 48, c + dy * 48);
    ctx.stroke();
  }
  return texture(canvas);
}

function cursorTexture(): Texture {
  const [canvas, ctx] = symbolCanvas(128);
  const c = 64;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(c, c, 20, 0, Math.PI * 2);
  ctx.stroke();
  for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]] as const) {
    ctx.beginPath();
    ctx.moveTo(c + dx * 32, c + dy * 32);
    ctx.lineTo(c + dx * 50, c + dy * 50);
    ctx.stroke();
  }
  return texture(canvas);
}

/** Ring des Vollausschlags: eine duenne Linie, kein Symbol. */
function ringGeometry(segments = 96): BufferGeometry {
  const points: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    points.push(Math.cos(a), Math.sin(a), 0);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(points, 3));
  return geometry;
}

function symbolMaterial(map: Texture, color: Color, opacity = 1): MeshBasicMaterial {
  return new MeshBasicMaterial({
    map,
    color,
    transparent: true,
    opacity,
    blending: AdditiveBlending,
    // Kein Tiefentest, kein Tiefenschreiben: die Zeichen liegen ueber allem
    // und verdecken nichts. Die Reihenfolge macht `renderOrder`.
    depthTest: false,
    depthWrite: false,
    fog: false,
  });
}

function symbol(map: Texture, size: number, color: Color, opacity = 1): Mesh {
  const mesh = new Mesh(new PlaneGeometry(size, size), symbolMaterial(map, color, opacity));
  mesh.renderOrder = 900;
  mesh.frustumCulled = false;
  return mesh;
}

/**
 * Die Bergbauzeile unter der Zielklammer. Kurz halten: mehr als 16 Zeichen
 * passen bei 20 px nicht auf die 256 Pixel breite Leinwand.
 */
export function miningLine(mining: MiningStatus | null): string {
  if (!mining || mining.targetIndex < 0) return '';
  if (mining.scanProgress > 0 && mining.scanProgress < 1) {
    return `SCAN ${Math.round(mining.scanProgress * 100)}%`;
  }
  if (mining.beamActive && mining.mineral) {
    return `${MINERALS[mining.mineral].code} +${formatTons(mining.sessionTons)} T`;
  }
  if (!mining.mineral) return 'UNBEKANNT';
  return MINERALS[mining.mineral].name.toUpperCase();
}

// ------------------------------------------------------------------ Klasse

const _eye = new Vector3();
const _eyeWorld = new Vector3();
const _dir = new Vector3();
const _tmp = new Vector3();
const _forward = new Vector3();
/** Weltdrehung der Gruppe, invertiert: Welt -> Cockpitraum. */
const _toLocal = new Quaternion();
const _inverse = new Matrix4();
const _quat = new Quaternion();
const _look = new Matrix4();
const _up = new Vector3(0, 1, 0);

export class GlassHud {
  /** An das Schiffs-Rig haengen (`ship.add(glass.group)`). */
  readonly group = new Group();

  private readonly crosshair: Mesh;
  private readonly cursor: Mesh;
  private readonly ring: Line;
  private readonly prograde: Mesh;
  private readonly retrograde: Mesh;
  private readonly lead: Mesh;
  private readonly targetGroup = new Group();
  private readonly corners: Mesh[] = [];
  private readonly labelMesh: Mesh;
  private readonly labelCanvas: HTMLCanvasElement;
  private readonly labelCtx: CanvasRenderingContext2D;
  private readonly labelTexture: CanvasTexture;
  private lastLabel = '';

  constructor() {
    this.group.name = 'GlassHud';
    this.group.renderOrder = 900;

    this.crosshair = symbol(crosshairTexture(), 0.34, FLIGHT_COLOR);
    this.cursor = symbol(cursorTexture(), 0.13, FLIGHT_COLOR, 0.8);
    this.prograde = symbol(progradeTexture(), 0.15, FLIGHT_COLOR, 0.9);
    this.retrograde = symbol(retrogradeTexture(), 0.15, FLIGHT_COLOR, 0.55);
    this.lead = symbol(leadTexture(), 0.11, TARGET_COLOR, 0.95);

    const ringMaterial = new LineBasicMaterial({
      color: FLIGHT_COLOR,
      transparent: true,
      opacity: 0.16,
      blending: AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    });
    this.ring = new Line(ringGeometry(), ringMaterial);
    this.ring.renderOrder = 899;
    this.ring.frustumCulled = false;

    // Vier Ecken statt eines Rahmens: die Klammer waechst mit dem Ziel, die
    // Ecken bleiben gleich gross und verdecken so gut wie nichts.
    const corner = cornerTexture();
    for (let i = 0; i < 4; i++) {
      const mesh = symbol(corner, 0.055, TARGET_COLOR, 0.95);
      mesh.rotation.z = (-i * Math.PI) / 2;
      this.corners.push(mesh);
      this.targetGroup.add(mesh);
    }

    this.labelCanvas = document.createElement('canvas');
    this.labelCanvas.width = 256;
    // Drei Zeilen: Entfernung, Zustand, Inhalt. Der Inhalt gehoert an das Ziel
    // und nicht nur auf den Schirm — dorthin sieht der Pilot beim Foerdern.
    this.labelCanvas.height = 96;
    const ctx = this.labelCanvas.getContext('2d');
    if (!ctx) throw new Error('2D-Context fuer die Zielschrift nicht verfuegbar');
    this.labelCtx = ctx;
    this.labelTexture = new CanvasTexture(this.labelCanvas);
    this.labelMesh = new Mesh(
      new PlaneGeometry(0.30, 0.1125),
      symbolMaterial(this.labelTexture, TARGET_COLOR, 0.95),
    );
    this.labelMesh.renderOrder = 901;
    this.labelMesh.frustumCulled = false;
    this.targetGroup.add(this.labelMesh);
    this.targetGroup.visible = false;

    this.group.add(
      this.ring,
      this.crosshair,
      this.cursor,
      this.prograde,
      this.retrograde,
      this.lead,
      this.targetGroup,
    );
    // Layer 0: der Innenraum wird von der Nahkamera gezeichnet.
    this.group.traverse((object) => object.layers.set(0));
  }

  dispose(): void {
    this.group.traverse((object) => {
      if (object instanceof Mesh || object instanceof Line) {
        object.geometry.dispose();
        const material = object.material;
        if (Array.isArray(material)) material.forEach((m) => m.dispose());
        else material.dispose();
      }
    });
    this.group.removeFromParent();
  }

  /**
   * Zeichen neu setzen. Nach `scene.updateMatrixWorld()` aufrufen — die
   * Kamerapose des Frames muss stehen; die eigenen Weltmatrizen zieht die
   * Methode am Ende selbst nach.
   */
  update(state: HudState): void {
    // Beim Gehen ist das Flug-HUD aus; der Spieler sitzt nicht an den Kanonen.
    // Von aussen ebenfalls: die Symbole liegen vor der Kanzel, nicht im Raum.
    this.group.visible = !state.walking && !state.external;
    if (state.walking || state.external) return;

    const camera = state.camera;
    camera.getWorldPosition(_eyeWorld);
    _inverse.copy(this.group.matrixWorld).invert();
    _eye.copy(_eyeWorld).applyMatrix4(_inverse);
    this.group.getWorldQuaternion(_toLocal).invert();

    // Blickachse im Gruppenraum — Bezug fuer alles, was am Bildrand ausblendet.
    camera.getWorldQuaternion(_quat);
    _forward.set(0, 0, -1).applyQuaternion(_quat).applyQuaternion(_toLocal);

    // Fadenkreuz: die Kanonenlinie, also die Nase des Schiffs (-Z im Rig).
    this.place(this.crosshair, _dir.set(0, 0, -1));
    const flash = Math.max(0, 1 - state.sinceHit / HIT_FLASH);
    this.crosshair.scale.setScalar(1 + flash * 0.18);
    (this.crosshair.material as MeshBasicMaterial).opacity = 0.85 + flash * 0.15;

    this.updateCursor(state, camera);
    this.updateMarkers(state);
    this.updateTarget(state);

    this.group.updateMatrixWorld(true);
  }

  // ------------------------------------------------------------------ intern

  /**
   * Ein Zeichen auf eine Richtung legen: Punkt auf der Zeichenebene und
   * Drehung zum Auge. Die Kippachse bleibt die Schiffssenkrechte, damit die
   * Zeichen mit dem Cockpit stehen und nicht mit dem Blick rollen.
   */
  private place(object: Object3D, dirLocal: Vector3): void {
    object.position.copy(dirLocal).multiplyScalar(DEPTH).add(_eye);
    _look.lookAt(_eye, object.position, _up);
    object.quaternion.setFromRotationMatrix(_look);
  }

  /** Winkel zwischen einer Richtung und der Blickachse, in Grad. */
  private angleToView(dirLocal: Vector3): number {
    return (Math.acos(Math.max(-1, Math.min(1, dirLocal.dot(_forward)))) * 180) / Math.PI;
  }

  private updateCursor(state: HudState, camera: PerspectiveCamera): void {
    const visible = state.pointerLocked;
    this.cursor.visible = visible;
    this.ring.visible = visible;
    if (!visible) return;

    cursorDirection(state.mouseOffset.x, state.mouseOffset.y, camera.fov, _dir);
    camera.getWorldQuaternion(_quat);
    _dir.applyQuaternion(_quat).applyQuaternion(_toLocal);
    this.place(this.cursor, _dir);

    // Ring des Vollausschlags: liegt um die Blickachse, Radius = Ausschlag.
    this.place(this.ring, _tmp.copy(_forward));
    const radius = DEPTH * CURSOR_SPAN * Math.tan((camera.fov * Math.PI) / 360);
    this.ring.scale.setScalar(radius);
  }

  private updateMarkers(state: HudState): void {
    if (state.speed < MARKER_MIN_SPEED) {
      this.prograde.visible = false;
      this.retrograde.visible = false;
      return;
    }

    _dir.copy(state.velocity).normalize().applyQuaternion(_toLocal);
    this.showMarker(this.prograde, _dir, 0.9);
    this.showMarker(this.retrograde, _dir.multiplyScalar(-1), 0.5);
  }

  private showMarker(mesh: Mesh, dirLocal: Vector3, maxOpacity: number): void {
    const opacity = markerOpacity(this.angleToView(dirLocal)) * maxOpacity;
    mesh.visible = opacity > 0.02;
    if (!mesh.visible) return;
    (mesh.material as MeshBasicMaterial).opacity = opacity;
    this.place(mesh, dirLocal);
  }

  private updateTarget(state: HudState): void {
    const target = state.target;
    if (!target) {
      this.targetGroup.visible = false;
      this.lead.visible = false;
      return;
    }

    // Richtung zum Ziel, vom Auge aus — nicht vom Schiffsmittelpunkt: auf
    // 200 m Entfernung sind das zwei Grad Unterschied.
    _dir.subVectors(target.position, _eyeWorld).normalize().applyQuaternion(_toLocal);

    const visible = this.angleToView(_dir) < 88;
    this.targetGroup.visible = visible;
    if (visible) {
      this.place(this.targetGroup, _dir);
      const edge = boxEdge(target.radius, target.distance) * 0.5;
      const positions: Array<[number, number]> = [
        [-edge, edge], [edge, edge], [edge, -edge], [-edge, -edge],
      ];
      this.corners.forEach((corner, i) => {
        const [x, y] = positions[i]!;
        corner.position.set(x, y, 0);
      });
      this.labelMesh.position.set(0, -edge - 0.06, 0);
      this.updateLabel(target.distance, target.integrity, state.mining ?? null);
    }

    // Vorhalt nur, wenn er sichtbar neben dem Ziel liegt.
    _dir.subVectors(target.lead, _eyeWorld).normalize().applyQuaternion(_toLocal);
    const apart = _tmp.copy(_dir).multiplyScalar(DEPTH).add(_eye).distanceTo(this.targetGroup.position);
    this.lead.visible = visible && apart > 0.012;
    if (this.lead.visible) this.place(this.lead, _dir);
  }

  /**
   * Entfernung, Zustand und Inhalt unter der Klammer; nur bei Aenderung neu
   * gemalt. Die dritte Zeile ist der Bergbau: was drinsteckt, wie weit der
   * Scan ist, wie viel dieser Brocken schon hergegeben hat.
   */
  private updateLabel(distance: number, integrity: number, mining: MiningStatus | null): void {
    // Unter einem Kilometer auf fuenf Meter gerundet. Auf den Meter genau
    // wechselte die Zeile bei jeder Relativgeschwindigkeit ueber 1 m/s in
    // *jedem* Bild — also sechzig Neuzeichnungen und Texturuploads je Sekunde
    // fuer eine Zahl, die niemand so schnell liest.
    //
    // Die Tafel selbst wandert unveraendert fluessig mit: ihre Lage wird
    // weiterhin je Bild gesetzt (siehe `targetGroup`). Traeger wird nur der
    // Textinhalt, und dort gibt es keine bewegte Kante, die stufig werden
    // koennte.
    const text = distance >= 1000
      ? `${(distance / 1000).toFixed(2)} KM`
      : `${Math.round(distance / 5) * 5} M`;
    const bars = Math.round(integrity * 10);
    const content = miningLine(mining);
    const line = `${text}  ${bars}  ${content}`;
    if (line === this.lastLabel) return;
    this.lastLabel = line;

    const ctx = this.labelCtx;
    ctx.clearRect(0, 0, 256, 96);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(255,255,255,0.8)';
    ctx.shadowBlur = 6;
    ctx.font = 'bold 30px ui-monospace, Menlo, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 18);
    ctx.font = 'bold 22px ui-monospace, Menlo, monospace';
    ctx.fillText(`${'|'.repeat(bars)}${'.'.repeat(10 - bars)}`, 128, 48);
    if (content) {
      ctx.font = 'bold 20px ui-monospace, Menlo, monospace';
      ctx.fillText(content, 128, 78);
    }
    this.labelTexture.needsUpdate = true;
  }
}
