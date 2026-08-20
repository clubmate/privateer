import { BoxGeometry, Group, Mesh, MeshBasicMaterial, Object3D, Vector3 } from 'three';
import type { Texture } from 'three';
import { GOODS } from './CargoGoods';
import type { CargoHold } from './CargoHold';
import { CrateFactory } from './CargoCrates';
import { planStowage, STOW_SLOTS, type StowagePlan } from './CargoStowage';

/**
 * Macht das Frachtmanifest im begehbaren Laderaum sichtbar: gekaufte Ware
 * liegt als Kiste hinten im Schiff, verkaufte ist weg. Wer wissen will, was er
 * geladen hat, geht nach achtern und schaut — das ist der ganze Punkt.
 *
 * **Statische Kisten:** Das GLB bringt fertig gebaute Kisten mit
 * (`SM_Crate0` .. `SM_Crate4` samt Deckeln, Ecken, Gurten) und die passenden
 * Kollisionsboxen. Die werden hier stillgelegt statt aus dem Generator
 * entfernt: `tools/build_interior.py` baut den Raum auch fuer Screenshots und
 * fuer den Fall, dass die Ladungslogik nicht laeuft — ein Frachtraum mit
 * nackten Waenden waere dort ein Rueckschritt.
 *
 * **Koordinaten:** Die Kisten haengen als Kinder am `ShipInterior`-Root und
 * rechnen deshalb in GLB-Koordinaten (Nase +Z). Der Root ist gegenueber dem
 * Schiffs-Rig um 180 Grad um Y gedreht — alles, was nach draussen geht
 * (Interaktionspunkte), wird in {@link toShipLocal} gespiegelt.
 */

/** Prefix der stillgelegten GLB-Kisten; siehe Kopfkommentar. */
const RETIRED_PREFIX = 'OFF_';

/** Sammelknoten der dynamischen Kisten. */
const GROUP_NAME = 'CargoStacks';

/** Kollisionsboxen der dynamischen Kisten — vom Ship-Rig eingesammelt. */
const COLLIDER_PREFIX = 'COL_Cargo_';

/** Hoehe, auf der ein Stapel angefasst wird (Brusthoehe des Spielers). */
const ANCHOR_HEIGHT = 1.15;

/** Rueckfallpunkt fuer die Interaktion, wenn der Laderaum leer ist. */
const EMPTY_ANCHOR = new Vector3(0, ANCHOR_HEIGHT, -2.0);

export interface CargoVisualsOptions {
  /** Woher die Ladung kommt. */
  hold: CargoHold;
  /**
   * Wird gerufen, nachdem sich die Kollisionsboxen geaendert haben. Hier
   * gehoert `ship.refreshColliders()` + `walk.rebuildCollision()` hinein.
   */
  onCollidersChanged?: () => void;
  /**
   * Wird gerufen, wenn sich die Geometrie geaendert hat. Die Schattenkarte
   * wird nur einmal gezeichnet (siehe `renderer.shadowMap.autoUpdate`) und
   * braucht danach einen Anstoss, sonst wirft eine neue Kiste keinen Schatten.
   */
  onGeometryChanged?: () => void;
}

export class CargoVisuals {
  /**
   * Punkte, an denen sich das Manifest oeffnen laesst — vorn und achtern im
   * Laderaum, jeweils am aeussersten belegten Stapel. Die Vektoren werden
   * **in place** fortgeschrieben; `Interactables` kopiert sie bewusst nicht,
   * also bleiben einmal angemeldete Punkte gueltig.
   */
  readonly anchors: readonly [Vector3, Vector3] = [new Vector3(), new Vector3()];

  private readonly hold: CargoHold;
  private readonly options: CargoVisualsOptions;
  private readonly factory = new CrateFactory();
  private readonly group = new Group();
  private readonly colliderGeometries: BoxGeometry[] = [];
  /** Kollisionsboxen sind unsichtbar; das Material zeichnet nie. */
  private readonly colliderMaterial = new MeshBasicMaterial({ visible: false });

  private interior: Object3D | null = null;
  private plan: StowagePlan = planStowage([]);
  private unsubscribe: (() => void) | null = null;

  constructor(options: CargoVisualsOptions) {
    this.hold = options.hold;
    this.options = options;
    this.group.name = GROUP_NAME;
    this.updateAnchors();
    this.unsubscribe = this.hold.onChange(() => this.rebuild());
  }

  /**
   * An einen Innenraum haengen. Darf mehrfach laufen (Placeholder -> GLB);
   * der alte Raum verliert seine Kisten dabei nicht, er wird ohnehin verworfen.
   */
  attach(interior: Object3D): void {
    if (this.interior === interior) return;
    this.interior = interior;
    retireStaticCrates(interior);
    interior.add(this.group);
    this.rebuild();
  }

  /** Aktueller Stauplan (Diagnose, Tests, Debug-Konsole). */
  getPlan(): StowagePlan {
    return this.plan;
  }

  /** Zahl der aufgestellten Gebinde. */
  get crateCount(): number {
    return this.plan.units.length;
  }

  /** Kisten neu aufstellen. Laeuft bei jeder Manifestaenderung. */
  rebuild(): void {
    this.plan = planStowage(this.hold.getManifest());
    this.updateAnchors();
    if (!this.interior) return;

    this.clearGroup();
    this.factory.setEnvironment(findEnvironment(this.interior));

    for (const unit of this.plan.units) {
      const good = GOODS[unit.good];
      const crate = this.factory.create(good);
      crate.position.set(unit.x, unit.y, unit.z);
      crate.rotation.y = unit.yaw;
      crate.name = `Cargo_${unit.slot}_${unit.level}`;
      this.group.add(crate);

      const geometry = new BoxGeometry(unit.width, unit.height, unit.depth);
      this.colliderGeometries.push(geometry);
      const collider = new Mesh(geometry, this.colliderMaterial);
      collider.name = `${COLLIDER_PREFIX}${unit.slot}_${unit.level}`;
      collider.position.set(unit.x, unit.y + unit.height / 2, unit.z);
      collider.rotation.y = unit.yaw;
      collider.visible = false;
      this.group.add(collider);
    }

    // Der Innenraum wird ueber Layer 0 gezeichnet (siehe render/Postprocessing);
    // ohne die Zuweisung sind die Kisten in der falschen Tiefenschicht.
    this.group.traverse((object) => object.layers.set(0));
    this.group.updateMatrixWorld(true);

    this.options.onCollidersChanged?.();
    this.options.onGeometryChanged?.();
  }

  dispose(): void {
    this.unsubscribe?.();
    this.unsubscribe = null;
    this.clearGroup();
    this.group.removeFromParent();
    this.colliderMaterial.dispose();
    this.factory.dispose();
    this.interior = null;
  }

  // --------------------------------------------------------------- intern

  private clearGroup(): void {
    // Kisten sind Klone: Geometrie und Material gehoeren der Factory und
    // duerfen hier nicht freigegeben werden. Nur die Kollisionsboxen sind je
    // Aufstellung neu.
    this.group.clear();
    for (const geometry of this.colliderGeometries) geometry.dispose();
    this.colliderGeometries.length = 0;
  }

  /**
   * Interaktionspunkte auf den vordersten und den achterlichsten belegten
   * Stapel legen. So ist das Manifest von beiden Enden des Laderaums aus
   * erreichbar, ohne dass zwei Prompts gleichzeitig auftauchen.
   */
  private updateAnchors(): void {
    const used = new Set(this.plan.units.map((unit) => unit.slot));
    const slots = STOW_SLOTS.filter((slot) => used.has(slot.id));

    if (slots.length === 0) {
      for (const anchor of this.anchors) toShipLocal(EMPTY_ANCHOR, anchor);
      return;
    }

    let fore = slots[0];
    let aft = slots[0];
    for (const slot of slots) {
      if (slot.z > fore.z) fore = slot;
      if (slot.z < aft.z) aft = slot;
    }
    toShipLocal(new Vector3(fore.x, ANCHOR_HEIGHT, fore.z), this.anchors[0]);
    toShipLocal(new Vector3(aft.x, ANCHOR_HEIGHT, aft.z), this.anchors[1]);
  }
}

/**
 * Reflexionsumgebung des Innenraums heraussuchen. Die Aufnahme entsteht erst
 * ein paar Frames nach dem Laden (siehe `captureInteriorEnvironment` in
 * main.ts) und wird auf die Innenraummaterialien gelegt — die Kisten holen sie
 * sich hier ab, statt eine zweite Quelle dafuer zu brauchen.
 */
function findEnvironment(interior: Object3D): Texture | null {
  let found: Texture | null = null;
  interior.traverse((object) => {
    if (found || !(object instanceof Mesh) || object.name.startsWith('COL_')) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      const envMap = (material as { envMap?: Texture | null }).envMap;
      if (envMap) {
        found = envMap;
        return;
      }
    }
  });
  return found;
}

/**
 * GLB-Koordinate in Schiffslokalkoordinaten. Der Innenraum-Root steht um 180
 * Grad um Y gedreht unter dem Rig (siehe InteriorLoader), also kippen x und z
 * das Vorzeichen.
 */
export function toShipLocal(source: Vector3, out: Vector3): Vector3 {
  return out.set(-source.x, source.y, -source.z);
}

/**
 * Die fest gebauten Kisten aus dem GLB stilllegen: sichtbare unsichtbar
 * schalten, ihre Kollisionsboxen umbenennen. Das Umbenennen ist der Punkt —
 * `Ship` sammelt Kollision ueber das Praefix `COL_` ein, und eine Box, die
 * nicht mehr so heisst, faellt bei jedem Neuaufbau von selbst heraus.
 */
function retireStaticCrates(interior: Object3D): void {
  const retired: Object3D[] = [];
  interior.traverse((object) => {
    if (/^SM_Crate\d/.test(object.name)) {
      object.visible = false;
      retired.push(object);
    } else if (object.name.startsWith('COL_Crate')) {
      retired.push(object);
    }
  });
  for (const object of retired) {
    if (!object.name.startsWith(RETIRED_PREFIX)) object.name = RETIRED_PREFIX + object.name;
  }
}
