import {
  Box3,
  BufferAttribute,
  DoubleSide,
  FrontSide,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PointLight,
  Vector3,
} from 'three';
import type { Material, Texture } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createScreenTexture, type ScreenKind } from './InteriorScreens';

/**
 * Laedt `public/models/ship-interior.glb` und bringt es auf die Konventionen
 * aus PLAN.md.
 *
 * **Achsen:** Das GLB kommt aus dem Blender-Export mit der Nase entlang **+Z**
 * (Blender-Nase -Y wird beim glTF-Export zu +Z, nicht zu -Z). PLAN.md und das
 * FlightModel verlangen aber Nase = -Z. Deshalb wird der Innenraum-Root hier um
 * 180 Grad um Y gedreht; die Marker `Seat_Pilot`/`Stand_Pilot` bekommen die
 * gleiche Drehung noch einmal lokal, damit ihr eigenes -Z weiterhin zur Nase
 * zeigt (die Kamera haengt im Sitzen mit Identitaetstransform am Sitzmarker).
 *
 * Alle Zahlen unten sind **GLB-Innenraumkoordinaten** (Nase +Z, Boden y=0),
 * also vor der 180-Grad-Drehung. Grundriss:
 *   Frachtraum z -5.20 .. -1.20 (x +-1.60, Decke 2.30)
 *   Gang       z -1.20 ..  1.40 (x +-0.70, Decke 2.10)
 *   Cockpit    z  1.40 ..  5.05 (x +-1.55, Kanzel ab z 2.95)
 */

const INTERIOR_ROOT = 'ShipInterior';
const GLASS_MATERIAL = 'Glass';
const MARKERS = ['Seat_Pilot', 'Stand_Pilot'];

/**
 * Dezente Innenbeleuchtung: [Name, Farbe, Intensitaet, Position, Reichweite].
 * Die Lampen haengen bewusst mindestens ~0,4 m von Decken und Moebeln entfernt —
 * bei physikalischem 1/r²-Abfall brennt sonst genau darunter alles aus.
 */
const LIGHTS: Array<[string, number, number, [number, number, number], number]> = [
  // Cockpit: Deckenleuchte hinter dem Sitz, kuehles Streulicht ueber der
  // Konsole und zwei schwache Sill-Lampen, die die Kanzelstreben modellieren.
  ['Light_Cockpit', 0xa9c8ff, 4.0, [0, 1.90, 2.05], 8],
  ['Light_Console', 0x5ec6ff, 1.1, [0, 1.62, 3.95], 3.2],
  ['Light_Ck_SillL', 0xff8f6a, 0.9, [-1.15, 0.55, 2.60], 2.6],
  ['Light_Ck_SillR', 0xff8f6a, 0.9, [1.15, 0.55, 2.60], 2.6],
  // Gang: warmes Deckenlicht plus kalter Akzent auf dem Wandscreen.
  ['Light_Corridor', 0xffd2a0, 4.0, [0, 1.80, 0.10], 5],
  ['Light_Cr_Screen', 0x66d8ff, 0.7, [-0.35, 1.25, 0.25], 1.4],
  // Wohn-/Frachtraum: Hauptlicht vorn, waermeres Licht ueber den Kisten.
  ['Light_Bay_Fore', 0xcfe0ff, 6.5, [0, 1.95, -2.30], 7],
  ['Light_Bay_Aft', 0xffcf9a, 4.5, [0, 1.95, -4.05], 6],
  // Kojenlampe (Koje liegt bei x +1.0, z -2.6, Kojendach bei y 1.20).
  ['Light_Bunk', 0xffb877, 0.9, [1.0, 0.95, -2.60], 2.0],
  // Werkbank an der Backbordwand.
  ['Light_Bench', 0x9fd4ff, 0.8, [-1.15, 1.35, -3.45], 2.2],
];

/**
 * Sitzpose. Das GLB setzt den Augenpunkt auf (0, 1.22, 3.20); das sitzt tief
 * und dicht an der Konsole — man schaut vor allem auf das Armaturenbrett.
 * Etwas hoeher und ein Stueck zurueck (Kopf vor der Rueckenlehne) gibt freie
 * Sicht ueber den Blendschutz. Werte in GLB-Koordinaten (Nase +Z).
 */
const SEAT_EYE: [number, number, number] = [0, 1.33, 3.05];

/**
 * Kanzelstreben: das GLB hat acht Laengsrippen und vier Spanten. Die Rippen,
 * die ueber den Kopf laufen, treffen sich vor der Nase genau im Blickfeld —
 * sie fliegen raus. Kriterium ist die Hoehe: alles, was bis unter
 * `FRAME_MAX_Y` bleibt, ist eine Bordwandrippe und darf bleiben.
 */
const FRAME_MAX_Y = 1.7;

/** Spanten vor dieser z-Ebene liegen im Blickfeld und werden entfernt. */
const RING_MAX_Z = 3.4;

/** Anzahl gleich grosser Indexbloecke (= Rippen bzw. Spanten) je Mesh. */
const FRAME_BLOCKS: Record<string, number> = {
  SM_Canopy_Frames_Long: 8,
  SM_Canopy_Frames_Ring: 4,
};

/** Displaymotiv je Screen-Mesh; die Farbe kommt aus dem GLB-Material. */
const SCREENS: Record<string, ScreenKind> = {
  SM_Screen_MFD: 'radar',
  SM_Screen_L: 'bars',
  SM_Screen_R: 'text',
  SM_Screen_Overhead: 'ladder',
  SM_Screen_Corridor: 'text',
  SM_Screen_Bench: 'bars',
};

/** Abstand, um den Aufkleber und Zierleisten von ihrer Traegerflaeche wegruecken. */
const DECAL_OFFSET = 0.0015;

/** Toleranz, ab der zwei Flaechen als "in derselben Ebene" gelten. */
const COPLANAR_EPSILON = 1e-4;
/** Mindestueberlappung, damit ein Ebenenkonflikt ueberhaupt sichtbar waere. */
const COPLANAR_MIN_OVERLAP = 0.01;
/** Obergrenze der Aufloesungsdurchgaenge (siehe {@link separateCoplanarFaces}). */
const COPLANAR_PASSES = 4;

/**
 * Grober Mittelpunkt des begehbaren Volumens (GLB-Koordinaten). Damit wird
 * entschieden, welche Seite einer ebenen Flaeche die Innenseite ist: Im GLB
 * zeigen einige Normalen nach aussen (die Konsolenscreens z. B. nach unten),
 * und daran haengen sowohl die UV-Ausrichtung als auch die Richtung, in die
 * Aufkleber von ihrer Traegerflaeche wegruecken.
 */
const INTERIOR_CENTER = new Vector3(0, 1.15, 0);

/** Staerke der Umgebungsreflexion auf den Innenraummaterialien. */
const ENV_INTENSITY = 1.0;
const ENV_INTENSITY_GLASS = 0.6;

/**
 * Daempfung der Emissive-Materialien. Das GLB nutzt
 * `KHR_materials_emissive_strength` 1,3–2,5; ohne Bloom brennen die Flaechen
 * damit auf reines Weiss aus, statt farbig zu leuchten.
 */
const EMISSIVE_SCALE: Record<string, number> = {
  Screen_Emissive: 0.4,
  Screen_Emissive_Amber: 0.45,
  // Die Deckenstreifen sind grossflaechig; mit Bloom reicht deutlich weniger,
  // sonst sind es weisse Rechtecke statt Lampen.
  Light_Strip: 0.3,
  Light_Strip_Red: 0.5,
};

/** Erzeugt die Punktlichter (Emissive-Materialien leuchten selbst nicht). */
function addInteriorLights(root: Object3D): void {
  for (const [name, color, intensity, pos, distance] of LIGHTS) {
    const light = new PointLight(color, intensity, distance, 2);
    light.name = name;
    light.position.set(pos[0], pos[1], pos[2]);
    root.add(light);
  }
}

/**
 * Materialkorrekturen:
 * - **Culling:** Im GLB ist *jedes* Material `doubleSided`. Rippen, Leisten und
 *   Paneele liegen aber buendig auf Waenden auf; ihre Rueckseite hat dort exakt
 *   dieselbe Tiefe wie die Wand und flimmert (Z-Fighting). `FrontSide` schneidet
 *   diese Rueckseiten weg — das war die Ursache des Flimmerns an den Waenden.
 *   Flache Meshes (Aufkleber, Screens ohne Dicke) behalten `DoubleSide`, sonst
 *   waeren sie von einer Seite unsichtbar.
 * - `Glass` braucht zusaetzlich `depthWrite = false`, damit der Weltraum hinter
 *   der Kanzel sauber durchscheint.
 * - Die Hull-/Panel-Materialien sind stark metallisch (0,75-0,92). Ohne
 *   Umgebungsreflexion haben Metalle keinen Diffusanteil und bleiben schwarz;
 *   ein kleines PMREM-Environment gibt ihnen etwas zum Spiegeln.
 */
function fixMaterials(root: Object3D, environment: Texture | null): void {
  const seen = new Set<Material>();
  root.traverse((obj) => {
    if (!(obj instanceof Mesh)) return;
    const materials: Material[] = Array.isArray(obj.material) ? obj.material : [obj.material];
    for (const material of materials) {
      if (!material || seen.has(material)) continue;
      seen.add(material);

      const isGlass = material.name === GLASS_MATERIAL;
      material.side = isGlass ? DoubleSide : FrontSide;
      if (isGlass) material.depthWrite = false;

      if (material instanceof MeshStandardMaterial) {
        if (environment) {
          material.envMap = environment;
          material.envMapIntensity = isGlass ? ENV_INTENSITY_GLASS : ENV_INTENSITY;
        }
        const scale = EMISSIVE_SCALE[material.name];
        if (scale !== undefined) material.emissiveIntensity *= scale;
      }
      material.needsUpdate = true;
    }
  });
}

const _box = new Box3();
const _point = new Vector3();
const _normal = new Vector3();

/**
 * Normale eines ebenen Meshes, zur Rauminnenseite hin ausgerichtet (siehe
 * {@link INTERIOR_CENTER}); `null`, wenn das Mesh nicht eben ist. Eben heisst:
 * alle Vertexnormalen zeigen in dieselbe Richtung — das trifft auf Screens,
 * Aufkleber und Abschlussbleche zu, auch wenn sie schraeg im Raum stehen.
 */
function planarNormal(mesh: Mesh, out: Vector3): Vector3 | null {
  const normals = mesh.geometry.getAttribute('normal');
  if (!normals || normals.count === 0) return null;
  out.fromBufferAttribute(normals as BufferAttribute, 0).normalize();
  for (let i = 1; i < normals.count; i++) {
    _point.fromBufferAttribute(normals as BufferAttribute, i).normalize();
    if (out.dot(_point) < 0.999) return null;
  }

  mesh.geometry.computeBoundingBox();
  const bounds = mesh.geometry.boundingBox;
  if (bounds) {
    bounds.getCenter(_point);
    if (out.dot(_point.subVectors(INTERIOR_CENTER, _point)) < 0) out.negate();
  }
  return out;
}

/**
 * Ebene Meshes (Screens, Aufkleber, Nasenkappe) liegen exakt in der Ebene ihrer
 * Traegerflaeche — das flimmert. Sie bekommen `DoubleSide` zurueck (eine Flaeche
 * ohne Dicke waere sonst von hinten unsichtbar) und ruecken 1,5 mm entlang
 * ihrer Normalen von der Traegerflaeche weg.
 */
function separateDecals(root: Object3D): void {
  root.traverse((obj) => {
    if (!(obj instanceof Mesh) || obj.name.startsWith('COL_')) return;
    if (!planarNormal(obj, _normal)) return;

    obj.position.addScaledVector(_normal, DECAL_OFFSET);
    const materials: Material[] = Array.isArray(obj.material) ? obj.material : [obj.material];
    for (const material of materials) material.side = DoubleSide;
  });
}

/**
 * Zwei Flaechen in derselben Ebene, die in dieselbe Richtung schauen, streiten
 * sich um die Tiefe und flimmern beim Gehen. Im GLB trifft das vor allem die
 * Zierleisten ("Belt"), die genau buendig ueber den Wandrippen liegen — an
 * jeder Kreuzung ein handtellergrosser Fleck auf Brusthoehe.
 *
 * Der Pass sucht solche Paare ueber die Bounding-Boxen und schiebt jeweils das
 * kleinere Mesh 1,5 mm aus der Ebene heraus. Achsen, auf denen ein Mesh nach
 * beiden Seiten kollidiert, bleiben unangetastet — die liessen sich nur durch
 * Skalieren trennen.
 */
function separateCoplanarFaces(root: Object3D): void {
  const meshes: Mesh[] = [];
  root.traverse((obj) => {
    if (!(obj instanceof Mesh) || obj.name.startsWith('COL_')) return;
    obj.geometry.computeBoundingBox();
    if (obj.geometry.boundingBox) meshes.push(obj);
  });

  const volume = (box: Box3): number => {
    box.getSize(_point);
    return Math.max(_point.x, 1e-4) * Math.max(_point.y, 1e-4) * Math.max(_point.z, 1e-4);
  };

  // Ein Mesh kann auf mehreren Flaechen aufliegen; ein Durchgang schiebt dann
  // beide Partner gleich weit und loest den Konflikt nicht. Deshalb wird bis
  // zur Konfliktfreiheit wiederholt.
  for (let pass = 0; pass < COPLANAR_PASSES; pass++) {
    const boxes = meshes.map((mesh) =>
      (mesh.geometry.boundingBox as Box3).clone().translate(mesh.position),
    );
    const shifts = new Map<number, Map<number, Set<number>>>();
    const addShift = (mesh: number, axis: number, sign: number): void => {
      let axes = shifts.get(mesh);
      if (!axes) shifts.set(mesh, (axes = new Map()));
      let signs = axes.get(axis);
      if (!signs) axes.set(axis, (signs = new Set()));
      signs.add(sign);
    };

    for (let i = 0; i < meshes.length; i++) {
      for (let k = i + 1; k < meshes.length; k++) {
        for (let axis = 0; axis < 3; axis++) {
          if (overlap(boxes[i], boxes[k], (axis + 1) % 3) < COPLANAR_MIN_OVERLAP) continue;
          if (overlap(boxes[i], boxes[k], (axis + 2) % 3) < COPLANAR_MIN_OVERLAP) continue;

          for (const [side, sign] of [['min', -1], ['max', 1]] as const) {
            const a = boxes[i][side].getComponent(axis);
            const b = boxes[k][side].getComponent(axis);
            if (Math.abs(a - b) > COPLANAR_EPSILON) continue;
            // Das kleinere Mesh ist die Zierde und wandert nach vorn.
            addShift(volume(boxes[i]) <= volume(boxes[k]) ? i : k, axis, sign);
          }
        }
      }
    }

    if (shifts.size === 0) return;
    for (const [index, axes] of shifts) {
      for (const [axis, signs] of axes) {
        if (signs.size !== 1) continue; // beidseitig eingeklemmt
        const position = meshes[index].position;
        position.setComponent(axis, position.getComponent(axis) + [...signs][0] * DECAL_OFFSET);
      }
    }
  }
}

/** Ueberlappung zweier Boxen auf einer Achse (negativ = kein Kontakt). */
function overlap(a: Box3, b: Box3, axis: number): number {
  return Math.min(a.max.getComponent(axis), b.max.getComponent(axis))
    - Math.max(a.min.getComponent(axis), b.min.getComponent(axis));
}

/**
 * Behaelt nur die Indexbloecke eines Meshes, deren Geometrie `keep` erfuellt.
 * Die Kanzelstreben liegen als gleich grosse Bloecke (eine Rippe bzw. ein
 * Spant je Block) hintereinander im Indexpuffer.
 */
function keepFrameBlocks(mesh: Mesh, blocks: number, keep: (bounds: Box3) => boolean): void {
  const geometry = mesh.geometry;
  const index = geometry.getIndex();
  const position = geometry.getAttribute('position');
  if (!index || index.count % blocks !== 0) return;

  const perBlock = index.count / blocks;
  const kept: number[] = [];
  for (let block = 0; block < blocks; block++) {
    _box.makeEmpty();
    for (let i = block * perBlock; i < (block + 1) * perBlock; i++) {
      _point.fromBufferAttribute(position as BufferAttribute, index.getX(i));
      _box.expandByPoint(_point);
    }
    if (!keep(_box)) continue;
    for (let i = block * perBlock; i < (block + 1) * perBlock; i++) kept.push(index.getX(i));
  }
  geometry.setIndex(kept);
}

/**
 * Cockpit freiraeumen: die Streben, die quer durchs Blickfeld laufen, kommen
 * raus (siehe {@link FRAME_MAX_Y} und {@link RING_MAX_Z}), und der Augenpunkt
 * rueckt auf {@link SEAT_EYE}.
 */
function declutterCockpit(root: Object3D): void {
  for (const [name, blocks] of Object.entries(FRAME_BLOCKS)) {
    const mesh = root.getObjectByName(name);
    if (!(mesh instanceof Mesh)) continue;
    const limit = name === 'SM_Canopy_Frames_Ring'
      ? (bounds: Box3) => bounds.min.z < RING_MAX_Z
      : (bounds: Box3) => bounds.max.y < FRAME_MAX_Y;
    keepFrameBlocks(mesh, blocks, limit);
  }

  const seat = root.getObjectByName('Seat_Pilot');
  if (seat) seat.position.set(SEAT_EYE[0], SEAT_EYE[1], SEAT_EYE[2]);
}

/**
 * Planare UVs fuer die Screen-Meshes erzeugen — das GLB liefert keine.
 *
 * Aufgespannt wird ein Rahmen aus der Flaechennormalen: fuer Wandscreens ist
 * oben `+Y`, fuer die flach liegenden Konsolenscreens die Nase, damit die
 * Schrift vom Sitz aus richtig herum steht. `u` laeuft nach rechts (aus
 * Pilotensicht), `v` nach unten — das ist die glTF-Konvention, zu der auch
 * `flipY = false` der Textur passt.
 */
function planarUv(mesh: Mesh, normal: Vector3): void {
  const geometry = mesh.geometry;
  const position = geometry.getAttribute('position') as BufferAttribute;

  // Waagerechte Flaechen (Konsole, Overhead-Panel): oben ist die Nase, bei
  // Flaechen, auf die man von unten schaut, entsprechend andersherum.
  const up = Math.abs(normal.y) > 0.85
    ? new Vector3(0, 0, Math.sign(normal.y))
    : new Vector3(0, 1, 0);
  const right = new Vector3().crossVectors(up, normal).normalize();
  const down = new Vector3().crossVectors(right, normal).normalize();

  let uMin = Infinity;
  let uMax = -Infinity;
  let vMin = Infinity;
  let vMax = -Infinity;
  for (let i = 0; i < position.count; i++) {
    _point.fromBufferAttribute(position, i);
    const u = _point.dot(right);
    const v = _point.dot(down);
    uMin = Math.min(uMin, u);
    uMax = Math.max(uMax, u);
    vMin = Math.min(vMin, v);
    vMax = Math.max(vMax, v);
  }

  const uSpan = Math.max(uMax - uMin, 1e-6);
  const vSpan = Math.max(vMax - vMin, 1e-6);
  const uv = new Float32Array(position.count * 2);
  for (let i = 0; i < position.count; i++) {
    _point.fromBufferAttribute(position, i);
    uv[i * 2] = (_point.dot(right) - uMin) / uSpan;
    uv[i * 2 + 1] = (_point.dot(down) - vMin) / vSpan;
  }
  geometry.setAttribute('uv', new BufferAttribute(uv, 2));
}

/**
 * Den Leuchtflaechen echte Displayinhalte geben (siehe {@link SCREENS}). Jedes
 * Screen-Mesh bekommt eine eigene Materialkopie mit `emissiveMap`, damit die
 * Motive sich unterscheiden.
 */
function applyScreens(root: Object3D): void {
  for (const [name, kind] of Object.entries(SCREENS)) {
    const mesh = root.getObjectByName(name);
    if (!(mesh instanceof Mesh)) continue;
    const source = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
    if (!(source instanceof MeshStandardMaterial)) continue;

    const normal = planarNormal(mesh, _normal);
    planarUv(mesh, normal ?? _normal.set(0, 1, 0));
    const material = source.clone();
    material.name = `${source.name}_${name}`;
    material.emissiveMap = createScreenTexture(kind);
    // Die flachen Wandscreens teilen sich ihr Material mit den Kastenscreens;
    // die Kopie bekommt das passende Culling zurueck.
    material.side = normal ? DoubleSide : FrontSide;
    material.emissiveIntensity = source.emissiveIntensity * 1.15;
    material.needsUpdate = true;
    mesh.material = material;
  }
}

/**
 * Laedt den Innenraum. Der zurueckgegebene Root traegt den Namen
 * `ShipInterior` und kann direkt an `Ship.setInterior()` uebergeben werden.
 *
 * `environment` ist eine vorberechnete PMREM-Textur (siehe `main.ts`); ohne sie
 * bleiben die metallischen Materialien sehr dunkel.
 */
export async function loadShipInterior(
  url: string,
  environment: Texture | null = null,
): Promise<Object3D> {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(url);

  const root = gltf.scene.getObjectByName(INTERIOR_ROOT) ?? gltf.scene;
  root.name = INTERIOR_ROOT;
  // Falls der Root noch an gltf.scene haengt: loesen, damit Ship ihn adoptiert.
  root.removeFromParent();

  // Nase des GLB zeigt auf +Z -> auf die Projektkonvention -Z drehen.
  root.rotation.y = Math.PI;
  for (const name of MARKERS) {
    const marker = root.getObjectByName(name);
    if (marker) marker.rotation.y = Math.PI;
  }

  fixMaterials(root, environment);
  separateCoplanarFaces(root);
  separateDecals(root);
  declutterCockpit(root);
  applyScreens(root);
  addInteriorLights(root);

  return root;
}
