import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  PointLight,
  Points,
  PointsMaterial,
  Quaternion,
  SRGBColorSpace,
  Vector3,
} from 'three';
import { CHEST_HEIGHT, type Interactable, type Interactables } from '../player/Interactables';
import type { RepairController } from './Repair';
import { ShipSystems, type SystemId, type SystemStatus } from './Systems';

/**
 * Reparaturstellen an Bord: pro System eine Klappe an der Stelle im Schiff, an
 * der das System auch sitzt.
 *
 * **Koordinaten:** Die Platzierungen stehen in **GLB-Innenraumkoordinaten**
 * (Nase +Z, Boden y=0, siehe ASSET-NOTES.md), weil dort auch der Grundriss
 * steht und sich jede Zahl gegen die Modellmasse pruefen laesst. Die Panels
 * haengen deshalb direkt unter dem Innenraum-Root — der traegt die 180-Grad-
 * Drehung, die aus der GLB-Nase +Z die Projektnase -Z macht. Fuer das
 * Interactables-Register wird die Position mit `interior.matrix` in den
 * Schiffslokalraum umgerechnet, in dem der WalkController laeuft.
 *
 * Die Panels werden **nicht** ins GLB gebaut: `tools/build_interior.py` ist die
 * Quelle des Raums, nicht der Spielmechanik.
 */

export interface PanelPlacement {
  id: SystemId;
  /** Mittelpunkt des Gehaeuses in GLB-Koordinaten. */
  position: readonly [number, number, number];
  /** Aussennormale der Frontplatte in GLB-Koordinaten. */
  facing: readonly [number, number, number];
  /** Breite und Hoehe der Frontplatte in Metern. */
  size: readonly [number, number];
  /** Reichweite der Interaktion; Standard aus `Interactables`. */
  range?: number;
}

/**
 * Wo welches System aufzumachen ist. Die Zahlen sind an den Modellmassen
 * ausgerichtet (Wandinnenflaechen, Spanten, Kisten) — jedes Panel sitzt in
 * einer Luecke zwischen den Spanten, nicht darueber.
 */
export const PANEL_PLACEMENTS: readonly PanelPlacement[] = [
  // Sicherungskasten im Gang, auf halber Strecke: das erste, was man sieht,
  // wenn man aufsteht und nach hinten geht.
  { id: 'lighting', position: [0.695, 1.4, 0.45], facing: [-1, 0, 0], size: [0.34, 0.46] },
  // Lebenserhaltung haengt unter dem Leitungsstrang an der Gangdecke.
  { id: 'lifeSupport', position: [0, 1.845, -0.85], facing: [0, -1, 0], size: [0.36, 0.3] },
  // Triebwerkszugang: grosse Klappe in der Rueckwand des Frachtraums.
  {
    id: 'engine',
    position: [-0.05, 1.42, -5.17],
    facing: [0, 0, 1],
    size: [0.8, 0.62],
    range: 1.7,
  },
  // Manoevrierduesen sitzen in den Flanken — Zugang ueber die Bordwand.
  { id: 'thrusters', position: [1.615, 1.45, -3.25], facing: [-1, 0, 0], size: [0.4, 0.44] },
  // Generator ganz achtern an Backbord, hinter dem Spant.
  { id: 'generator', position: [-1.615, 1.45, -4.93], facing: [1, 0, 0], size: [0.4, 0.5] },
  // Waffenrechner im Fussraum unter der Cockpitkonsole.
  { id: 'weapons', position: [-0.62, 0.5, 3.735], facing: [0, 0, -1], size: [0.44, 0.34] },
  // Sensorik neben dem Sitz an der Cockpitwand.
  { id: 'sensors', position: [-1.575, 1.38, 2.32], facing: [1, 0, 0], size: [0.34, 0.42] },
] as const;

/** Werkzeugkasten an der Werkbank (GLB-Koordinaten, siehe `SM_Bench_ToolRack`). */
const TOOL_POSITION = new Vector3(-1.42, 1.42, -1.86);
/** Werkzeug am Bord, das beim Mitnehmen aus dem Halter verschwindet. */
const TOOL_MESH = 'SM_Bench_Tool2';

/** Tiefe des Gehaeuses in Metern. */
const HOUSING_DEPTH = 0.06;

/** Statusfarben der Leuchtleiste. */
const STATUS_COLOR: Record<SystemStatus, number> = {
  ok: 0x2f7a3a,
  impaired: 0xffa42a,
  failed: 0xff2f1e,
};

/** Grundhelligkeit der Leiste je Status (heil leuchtet nur schwach mit). */
const STATUS_EMISSIVE: Record<SystemStatus, number> = {
  ok: 0.25,
  impaired: 1.3,
  failed: 1.9,
};

/** Pulsfrequenz der Leiste in Hz je Status. */
const STATUS_PULSE: Record<SystemStatus, number> = { ok: 0, impaired: 1.1, failed: 2.6 };

/** Funken pro Sekunde bei Ausfall bzw. Beeintraechtigung. */
const SPARK_RATE: Record<SystemStatus, number> = { ok: 0, impaired: 3, failed: 22 };

const _quat = new Quaternion();
const _forward = new Vector3(0, 0, 1);
const _vec = new Vector3();
const _color = new Color();

/**
 * Beschriftung als Blechschild. Ohne Text sieht jede Klappe aus wie jede
 * andere; mit Text weiss man vom Gang aus, was da blinkt.
 */
function createLabelTexture(text: string): CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#151719';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#5a5f66';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

  ctx.fillStyle = '#d8d2c2';
  ctx.font = 'bold 62px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Enge Schilder: lange Namen werden gestaucht statt abgeschnitten.
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 4, canvas.width - 48);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/**
 * Funken aus einer defekten Klappe. Punkte statt Sprites: es sind viele kleine,
 * kurzlebige Lichter, und ein Punkt kostet keine eigene Matrix.
 */
class Sparks {
  readonly points: Points<BufferGeometry, PointsMaterial>;

  private readonly life: Float32Array;
  private readonly velocity: Float32Array;
  private readonly positions: Float32Array;
  private readonly count: number;
  private pending = 0;

  constructor(count: number, private readonly area: readonly [number, number]) {
    this.count = count;
    this.positions = new Float32Array(count * 3);
    this.velocity = new Float32Array(count * 3);
    this.life = new Float32Array(count);
    // Ungenutzte Funken parken weit weg statt unsichtbar zu sein — ein
    // Punkt ohne eigene Deckkraft laesst sich nicht einzeln ausblenden.
    for (let i = 0; i < count; i++) this.positions[i * 3 + 1] = -999;

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(this.positions, 3));
    // Klein und warm: additiv gemischt und mit Bloom darueber wird aus jedem
    // Punkt sonst ein weisses Quadrat statt eines Funkens.
    const material = new PointsMaterial({
      color: 0xff7b23,
      size: 0.009,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: AdditiveBlending,
      depthWrite: false,
    });
    this.points = new Points(geometry, material);
    this.points.name = 'RepairPanel_Sparks';
    // Die geparkten Punkte wuerden die Bounding-Sphere aufblaehen.
    this.points.frustumCulled = false;
  }

  /**
   * `gravity` ist die Richtung "unten" im Panel-Koordinatensystem; sonst
   * fielen die Funken an der Deckenklappe zur Seite statt nach unten.
   */
  update(dt: number, rate: number, gravity: Vector3, random: () => number): void {
    this.pending += rate * dt;

    for (let i = 0; i < this.count; i++) {
      if (this.life[i] > 0) {
        this.life[i] -= dt;
        if (this.life[i] <= 0) {
          this.positions[i * 3 + 1] = -999;
          continue;
        }
        for (let axis = 0; axis < 3; axis++) {
          this.velocity[i * 3 + axis] += gravity.getComponent(axis) * 2.6 * dt;
          this.positions[i * 3 + axis] += this.velocity[i * 3 + axis] * dt;
        }
        continue;
      }

      if (this.pending < 1) continue;
      this.pending -= 1;
      this.spawn(i, random);
    }

    this.points.geometry.getAttribute('position').needsUpdate = true;
  }

  private spawn(index: number, random: () => number): void {
    const [w, h] = this.area;
    this.positions[index * 3] = (random() - 0.5) * w;
    this.positions[index * 3 + 1] = (random() - 0.5) * h;
    this.positions[index * 3 + 2] = HOUSING_DEPTH / 2 + 0.01;
    this.velocity[index * 3] = (random() - 0.5) * 0.8;
    this.velocity[index * 3 + 1] = (random() - 0.5) * 0.8;
    this.velocity[index * 3 + 2] = 0.3 + random() * 1.1;
    this.life[index] = 0.22 + random() * 0.45;
  }
}

/** Ein aufgebautes Panel mit allem, was pro Frame angefasst wird. */
interface Panel {
  id: SystemId;
  group: Group;
  status: MeshStandardMaterial;
  light: PointLight;
  sparks: Sparks;
  /** "Unten" im Panelsystem — fuer den Funkenflug. */
  gravity: Vector3;
  /** Position im Schiffslokalraum (Basis des WalkControllers). */
  local: Vector3;
  detach: (() => void) | null;
}

export class RepairPanels {
  private readonly panels: Panel[] = [];
  private readonly root = new Group();
  private toolTaken = false;
  private toolMesh: Object3D | null = null;
  private toolDetach: (() => void) | null = null;
  private time = 0;

  constructor(
    private readonly systems: ShipSystems,
    private readonly repair: RepairController,
    private readonly interactables: Interactables,
    private readonly random: () => number = Math.random,
  ) {
    this.root.name = 'RepairPanels';
  }

  /** Zugriff fuer die Debugkonsole. */
  getPanels(): ReadonlyArray<{ id: SystemId; local: Vector3 }> {
    return this.panels;
  }

  /**
   * Panels bauen und in den geladenen Innenraum haengen. Mehrfach aufrufbar:
   * ein alter Satz wird vorher abgeraeumt (der Innenraum kann getauscht werden).
   */
  attach(interior: Object3D): void {
    this.detach();
    interior.add(this.root);
    // Der Innenraum ist direktes Kind des Schiffs-Rigs; seine Matrix bildet
    // also GLB-Koordinaten auf den Schiffslokalraum ab, in dem der
    // WalkController und damit das Interactables-Register rechnen.
    interior.updateMatrix();

    for (const placement of PANEL_PLACEMENTS) {
      const panel = this.build(placement);
      const [px, py, pz] = placement.position;
      panel.local.copy(_vec.set(px, py, pz).applyMatrix4(interior.matrix));
      this.root.add(panel.group);
      this.register(panel, placement.range);
      this.panels.push(panel);
    }

    this.attachTool(interior);

    // Alles im Innenraum gehoert auf Layer 0 (siehe render/Postprocessing.ts);
    // Kinder erben Layer in Three nicht, deshalb explizit.
    this.root.traverse((object) => object.layers.set(0));
  }

  /** Panels und Anmeldungen wieder entfernen. */
  detach(): void {
    for (const panel of this.panels) panel.detach?.();
    this.panels.length = 0;
    this.toolDetach?.();
    this.toolDetach = null;
    this.toolMesh = null;
    this.root.clear();
    this.root.removeFromParent();
  }

  /**
   * Darstellung fortschreiben. `playerFeet` ist der Fusspunkt im
   * Schiffslokalraum oder `null`, wenn der Spieler sitzt — daran haengt der
   * Abbruch einer laufenden Reparatur.
   */
  update(dt: number, playerFeet: Vector3 | null): void {
    this.time += dt;

    const job = this.repair.getJob();
    let distance: number | null = null;
    if (job && playerFeet) {
      const panel = this.panels.find((p) => p.id === job);
      if (panel) distance = chestDistance(playerFeet, panel.local);
    }
    this.repair.update(dt, distance);

    for (const panel of this.panels) {
      const status = this.systems.getStatus(panel.id);
      const repairing = this.repair.isActive(panel.id);

      // Waehrend der Reparatur laeuft die Leiste als Fortschrittsbalken in
      // Weiss durch — Audio gibt es nicht, die Rueckmeldung muss man sehen.
      const pulse = repairing
        ? 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(this.time * 14))
        : STATUS_PULSE[status] === 0
          ? 1
          : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(this.time * STATUS_PULSE[status] * Math.PI * 2));

      _color.setHex(repairing ? 0x9fd4ff : STATUS_COLOR[status]);
      panel.status.emissive.copy(_color);
      panel.status.color.copy(_color).multiplyScalar(0.25);
      panel.status.emissiveIntensity = (repairing ? 1.8 : STATUS_EMISSIVE[status]) * pulse;

      // Nur beschaedigte Panels leuchten in den Raum. Unsichtbare Lichter
      // landen gar nicht erst im Renderdurchgang und kosten dann auch nichts.
      const glowing = status !== 'ok' || repairing;
      panel.light.visible = glowing;
      if (glowing) {
        panel.light.color.copy(_color);
        panel.light.intensity = (repairing ? 0.5 : status === 'failed' ? 0.75 : 0.4) * pulse;
      }

      panel.sparks.update(
        dt,
        repairing ? 6 : SPARK_RATE[status],
        panel.gravity,
        this.random,
      );
    }
  }

  // ------------------------------------------------------------------ intern

  private build(placement: PanelPlacement): Panel {
    const [width, height] = placement.size;
    const group = new Group();
    const def = ShipSystems.definition(placement.id);
    group.name = `RepairPanel_${placement.id}`;
    group.position.set(placement.position[0], placement.position[1], placement.position[2]);

    // Frontplatte zeigt lokal nach +Z und wird auf die Wandnormale gedreht.
    _vec.set(placement.facing[0], placement.facing[1], placement.facing[2]).normalize();
    _quat.setFromUnitVectors(_forward, _vec);
    group.quaternion.copy(_quat);

    const housing = new Mesh(
      new BoxGeometry(width, height, HOUSING_DEPTH),
      new MeshStandardMaterial({ color: 0x2c2f33, metalness: 0.85, roughness: 0.5 }),
    );
    housing.castShadow = true;
    housing.receiveShadow = true;
    group.add(housing);

    // Umlaufender Rahmen aus blankem Stahl: die Klappe soll aufgeschraubt
    // aussehen, nicht aufgemalt.
    const frame = new Mesh(
      new BoxGeometry(width + 0.05, height + 0.05, HOUSING_DEPTH * 0.6),
      new MeshStandardMaterial({ color: 0x7d8288, metalness: 0.9, roughness: 0.45 }),
    );
    frame.position.z = -HOUSING_DEPTH * 0.25;
    frame.castShadow = true;
    frame.receiveShadow = true;
    group.add(frame);

    // Statusleiste im oberen Drittel.
    const status = new MeshStandardMaterial({
      color: 0x0a1a0d,
      emissive: new Color(STATUS_COLOR.ok),
      emissiveIntensity: STATUS_EMISSIVE.ok,
      roughness: 0.35,
      metalness: 0,
      side: DoubleSide,
    });
    const bar = new Mesh(new PlaneGeometry(width * 0.62, Math.min(height * 0.16, 0.05)), status);
    bar.position.set(0, height * 0.28, HOUSING_DEPTH / 2 + 0.002);
    group.add(bar);

    // Beschriftung darunter.
    const labelTexture = createLabelTexture(def.name);
    if (labelTexture) {
      const label = new Mesh(
        new PlaneGeometry(width * 0.78, Math.min(height * 0.24, 0.075)),
        new MeshStandardMaterial({
          map: labelTexture,
          emissiveMap: labelTexture,
          emissive: new Color(0xffffff),
          // Gerade genug Eigenleuchten, um im Halbdunkel lesbar zu bleiben.
          emissiveIntensity: 0.16,
          roughness: 0.7,
          metalness: 0,
        }),
      );
      label.position.set(0, -height * 0.14, HOUSING_DEPTH / 2 + 0.002);
      group.add(label);
    }

    const light = new PointLight(STATUS_COLOR.failed, 0, 2.2, 1.25);
    light.name = `RepairPanel_${placement.id}_Glow`;
    light.position.set(0, 0, 0.28);
    light.visible = false;
    group.add(light);

    const sparks = new Sparks(20, [width * 0.8, height * 0.8]);
    group.add(sparks.points);

    // "Unten" der Welt in Panelkoordinaten: die Deckenklappe im Gang steht
    // sonst kopfueber und ihre Funken fliegen nach achtern.
    const gravity = new Vector3(0, -1, 0).applyQuaternion(group.quaternion.clone().invert());

    return {
      id: placement.id,
      group,
      status,
      light,
      sparks,
      gravity,
      local: new Vector3(),
      detach: null,
    };
  }

  private register(panel: Panel, range: number | undefined): void {
    const def = ShipSystems.definition(panel.id);
    const item: Interactable = {
      position: panel.local,
      label: () => this.labelFor(panel.id, def.name),
      // Heile Klappen bieten nichts an, sonst steht im ganzen Schiff ein
      // Prompt, der beim Druecken nichts tut.
      enabled: () => this.systems.getHealth(panel.id) < 1 || this.repair.isActive(panel.id),
      activate: () => {
        if (this.repair.isActive(panel.id)) this.repair.cancel();
        else this.repair.start(panel.id);
      },
    };
    if (range !== undefined) item.range = range;
    panel.detach = this.interactables.add(item);
  }

  private labelFor(id: SystemId, name: string): string {
    if (this.repair.isActive(id)) {
      return `F — REPARATUR ${Math.round(this.repair.getProgress() * 100)}%  (ABBRECHEN)`;
    }
    const percent = Math.round(this.systems.getHealth(id) * 100);
    const tool = this.toolTaken ? '' : ' — OHNE WERKZEUG LANGSAM';
    return `F — ${name} REPARIEREN (${percent}%)${tool}`;
  }

  /**
   * Werkzeug an der Werkbank. Optional im besten Sinn: ohne geht es auch, nur
   * halb so schnell — und man merkt beim zweiten Schaden, dass der Umweg ueber
   * den Frachtraum sich lohnt.
   */
  private attachTool(interior: Object3D): void {
    this.toolMesh = interior.getObjectByName(TOOL_MESH) ?? null;
    this.toolTaken = false;
    this.repair.toolInHand = false;
    if (this.toolMesh) this.toolMesh.visible = true;

    _vec.copy(TOOL_POSITION).applyMatrix4(interior.matrix);
    const local = _vec.clone();

    this.toolDetach = this.interactables.add({
      position: local,
      label: () => (this.toolTaken ? 'F — WERKZEUG ZURUECKLEGEN' : 'F — WERKZEUG NEHMEN'),
      range: 1.1,
      activate: () => {
        this.toolTaken = !this.toolTaken;
        this.repair.toolInHand = this.toolTaken;
        // Der Halter an der Werkbank steht danach sichtbar leer.
        if (this.toolMesh) this.toolMesh.visible = !this.toolTaken;
      },
    });
  }
}

/** Abstand Brust -> Punkt, wie ihn das Interactables-Register misst. */
function chestDistance(feet: Vector3, target: Vector3): number {
  const dx = feet.x - target.x;
  const dy = feet.y + CHEST_HEIGHT - target.y;
  const dz = feet.z - target.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
