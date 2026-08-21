import {
  BoxGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  PointLight,
  SRGBColorSpace,
  Vector3,
} from 'three';
import type { Object3D } from 'three';
import { SYSTEM_DEFINITIONS, type ShipSystems, type SystemStatus } from './Systems';

/**
 * Warnanzeige im Cockpit.
 *
 * Der Pilot muss auch im Sitzen mitbekommen, dass etwas kaputt ist. Das HUD
 * gehoert einem anderen Arbeitspaket, also steht die Warnung diegetisch im
 * Raum: ein kleines Stoerungsfeld auf dem Blendschutz, wie die Annunciator-
 * Tafel eines Verkehrsflugzeugs, dazu eine rote Warnlampe, die den ganzen
 * Arbeitsplatz mitfaerbt.
 *
 * Koordinaten sind **GLB-Innenraumkoordinaten** (Nase +Z), wie bei den
 * Reparaturklappen — die Tafel haengt unter dem Innenraum-Root.
 */

/** Mittelpunkt der Tafel, neben der Sichtlinie zur Nase. */
const PANEL_POSITION = new Vector3(0.55, 1.185, 4.35);
/**
 * Lage der Tafel: 180 Grad um Y (Flaeche zeigt zum Sitz) und danach um die
 * eigene Querachse nach hinten gekippt.
 *
 * Bewusst als Euler und nicht ueber `setFromUnitVectors`: die kuerzeste Drehung
 * von +Z auf eine nach hinten-oben zeigende Normale laeuft ueber mehr als
 * 90 Grad um X und stellt die Tafel dabei auf den Kopf — die Schrift stand
 * spiegelverkehrt im Bild.
 */
const PANEL_TILT = -0.44;
const PANEL_WIDTH = 0.44;
const PANEL_HEIGHT = 0.16;

/** Aufloesung der Tafel; 4 Spalten a 128 px, 2 Zeilen a 96 px. */
const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 192;
const COLUMNS = 4;

/** Blinkfrequenz der ausgefallenen Felder in Hz. */
const BLINK_HZ = 2;

/** Farbtafel je Status: [Feldhintergrund, Schrift]. */
const CELL_COLORS: Record<SystemStatus, [string, string]> = {
  ok: ['#0c2412', '#6fd587'],
  impaired: ['#3a2a06', '#ffc247'],
  failed: ['#3d0d07', '#ff6a52'],
};

export class Annunciator {
  private readonly group = new Group();
  private readonly canvas: HTMLCanvasElement | null;
  private readonly ctx: CanvasRenderingContext2D | null;
  private texture: CanvasTexture | null = null;
  private caution: PointLight | null = null;
  private signature = '';
  private time = 0;

  constructor() {
    this.group.name = 'DamageAnnunciator';
    this.canvas = typeof document === 'undefined' ? null : document.createElement('canvas');
    if (this.canvas) {
      this.canvas.width = CANVAS_WIDTH;
      this.canvas.height = CANVAS_HEIGHT;
    }
    this.ctx = this.canvas?.getContext('2d') ?? null;
  }

  /** Tafel in den geladenen Innenraum haengen. */
  attach(interior: Object3D): void {
    this.detach();
    if (!this.canvas) return;

    this.texture = new CanvasTexture(this.canvas);
    this.texture.colorSpace = SRGBColorSpace;

    this.group.position.copy(PANEL_POSITION);
    this.group.rotation.set(PANEL_TILT, Math.PI, 0, 'YXZ');

    const screen = new Mesh(
      new PlaneGeometry(PANEL_WIDTH, PANEL_HEIGHT),
      new MeshStandardMaterial({
        color: 0x050505,
        emissive: new Color(0xffffff),
        emissiveMap: this.texture,
        emissiveIntensity: 1.0,
        roughness: 0.4,
        metalness: 0,
        side: DoubleSide,
      }),
    );
    screen.position.z = 0.026;
    this.group.add(screen);

    const housing = new Mesh(
      new BoxGeometry(PANEL_WIDTH + 0.03, PANEL_HEIGHT + 0.03, 0.05),
      new MeshStandardMaterial({ color: 0x26292d, metalness: 0.8, roughness: 0.5 }),
    );
    housing.castShadow = true;
    this.group.add(housing);

    // Der Blendschutz traegt die Tafel; ohne Fuss schwebt sie ueber dem Pult.
    const stand = new Mesh(
      new BoxGeometry(0.06, 0.1, 0.05),
      new MeshStandardMaterial({ color: 0x3a3d42, metalness: 0.85, roughness: 0.55 }),
    );
    stand.position.set(PANEL_POSITION.x, 1.085, PANEL_POSITION.z + 0.015);

    // Warnlampe: faerbt bei Ausfall das halbe Cockpit rot. Unsichtbar, solange
    // alles laeuft — ein abgeschaltetes Licht kostet auch nichts.
    this.caution = new PointLight(0xff3418, 0, 2.0, 1.25);
    this.caution.name = 'Damage_MasterCaution';
    this.caution.position.set(PANEL_POSITION.x, 1.42, PANEL_POSITION.z - 0.25);
    this.caution.visible = false;

    interior.add(this.group, stand, this.caution);
    // Innenraum = Layer 0 (siehe render/Postprocessing.ts); Layer werden in
    // Three nicht vererbt.
    for (const object of [this.group, stand, this.caution]) {
      object.traverse((child) => child.layers.set(0));
    }
  }

  detach(): void {
    this.group.removeFromParent();
    this.group.clear();
    this.caution?.removeFromParent();
    this.caution = null;
    this.texture?.dispose();
    this.texture = null;
    this.signature = '';
  }

  update(dt: number, systems: ShipSystems): void {
    this.time += dt;
    const blink = Math.floor(this.time * BLINK_HZ * 2) % 2 === 0;

    if (this.caution) {
      const failed = systems.anyFailed;
      const visible = failed || systems.anyImpaired;
      this.caution.visible = visible;
      if (visible) {
        const pulse = 0.5 + 0.5 * Math.sin(this.time * (failed ? 9 : 3.5));
        this.caution.intensity = (failed ? 0.45 : 0.2) * pulse;
        this.caution.color.setHex(failed ? 0xff3418 : 0xffa42a);
      }
    }

    this.draw(systems, blink);
  }

  private draw(systems: ShipSystems, blink: boolean): void {
    const ctx = this.ctx;
    if (!ctx || !this.texture) return;

    const seconds = systems.getOxygenSeconds();
    const oxygenText = Number.isFinite(seconds) ? formatClock(seconds) : 'OK';
    const statuses = SYSTEM_DEFINITIONS.map((def) => systems.getStatus(def.id));

    // Der Blinktakt gehoert nur dann in die Signatur, wenn ueberhaupt etwas
    // blinkt. Sonst wechselt sie viermal je Sekunde, die Tafel wird neu
    // gezeichnet und hochgeladen — fuer acht Zahlen, die sich minutenlang
    // nicht ruehren. Bei echtem Ausfall bleibt das Blinken unveraendert.
    const anyFailed = statuses.some((status) => status === 'failed');

    // Neu zeichnen nur bei echter Aenderung: sonst laeuft in jedem Frame ein
    // Canvas-Upload mit, fuer ein Bild, das sich nicht bewegt.
    const signature = `${statuses.join('')}|${oxygenText}|${anyFailed && blink}`;
    if (signature === this.signature) return;
    this.signature = signature;

    const cellWidth = CANVAS_WIDTH / COLUMNS;
    const cellHeight = CANVAS_HEIGHT / 2;

    ctx.fillStyle = '#08090a';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (let i = 0; i < COLUMNS * 2; i++) {
      const x = (i % COLUMNS) * cellWidth;
      const y = Math.floor(i / COLUMNS) * cellHeight;

      const isOxygen = i === SYSTEM_DEFINITIONS.length;
      if (i > SYSTEM_DEFINITIONS.length) continue;

      const status: SystemStatus = isOxygen
        ? oxygenText === 'OK'
          ? 'ok'
          : seconds < 90
            ? 'failed'
            : 'impaired'
        : statuses[i]!;
      const code = isOxygen ? 'O2' : SYSTEM_DEFINITIONS[i]!.code;
      const value = isOxygen
        ? oxygenText
        : `${Math.round(systems.getHealth(SYSTEM_DEFINITIONS[i]!.id) * 100)}%`;

      const [background, ink] = CELL_COLORS[status];
      // Ausfaelle blinken; alles andere steht ruhig da, damit das Blinken auch
      // etwas heisst.
      const dark = status === 'failed' && !blink;
      ctx.fillStyle = dark ? '#120303' : background;
      ctx.fillRect(x + 4, y + 4, cellWidth - 8, cellHeight - 8);

      ctx.fillStyle = dark ? '#5a1c14' : ink;
      ctx.font = 'bold 42px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(code, x + cellWidth / 2, y + cellHeight / 2 - 16);
      ctx.font = 'bold 28px "Courier New", monospace';
      ctx.fillText(value, x + cellWidth / 2, y + cellHeight / 2 + 24);
    }

    this.texture.needsUpdate = true;
  }
}

/** Sekunden als mm:ss, gedeckelt bei 99:59. */
function formatClock(seconds: number): string {
  const total = Math.max(0, Math.min(Math.round(seconds), 99 * 60 + 59));
  const minutes = Math.floor(total / 60);
  return `${minutes}:${String(total % 60).padStart(2, '0')}`;
}
