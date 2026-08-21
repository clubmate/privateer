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
import { createSurfaceMaps, TILE_METERS, type SurfaceKind, type SurfaceMaps } from './InteriorSurfaces';
import { addLightShafts } from './LightShafts';

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
 *
 * **Abfall:** Physikalisch korrekte 1/r²-Lampen sind in einem 2,3 m hohen Raum
 * nicht zu baendigen — eine Lampe, die 3 m weiter noch etwas beitraegt, brennt
 * die Decke 0,35 m darueber komplett weiss. Deshalb {@link LIGHT_DECAY}
 * deutlich unter 2: der Helligkeitsunterschied zwischen Lampennaehe und
 * Raumende schrumpft von Faktor ~70 auf ~9.
 */
const LIGHTS: Array<[string, number, number, [number, number, number], number]> = [
  // Frachtraum: drei Deckenleuchten, die mittlere ist im Modell defekt und
  // bekommt deshalb kein Licht — die Luecke im Lichtband ist Absicht.
  ['Light_Bay_Aft', 0xffcf9a, 1.15, [0, 2.05, -4.30], 6],
  ['Light_Bay_Fore', 0xffd8b0, 1.30, [0, 2.05, -2.10], 6],
  ['Light_Bench', 0x9fd4ff, 0.16, [-1.25, 1.45, -1.85], 2.2],
  ['Light_Bunk', 0xffb877, 0.14, [-1.75, 1.35, -3.55], 2.0],
  // Gang: eine funktionierende Leuchte, dazu der Schein des Wandmonitors.
  ['Light_Corridor', 0xffd2a0, 1.00, [0, 1.86, 0.10], 4.5],
  ['Light_Cr_Screen', 0xffae5c, 0.10, [-0.45, 1.35, 0.35], 1.3],
  // Cockpit: Deckenleuchte hinter dem Sitz, Schein der Instrumente von unten.
  ['Light_Cockpit', 0xa9c8ff, 1.05, [0, 2.05, 2.05], 7],
  ['Light_Console', 0xffb060, 0.40, [0, 1.30, 3.85], 2.6],
];

/** Abfallexponent der Innenlampen (2 = physikalisch, siehe {@link LIGHTS}). */
const LIGHT_DECAY = 1.25;

/**
 * Lampen, die Schatten werfen. Punktlichter kosten sechs Schattenrenderings
 * pro Stueck — deshalb nur die drei Raumleuchten und nicht jede Akzentlampe.
 * Da sich im Innenraum nichts bewegt, wird die Schattenkarte ohnehin nur
 * einmal gezeichnet (siehe `renderer.shadowMap.autoUpdate` in main.ts).
 */
const SHADOW_CASTERS = new Set(['Light_Cockpit', 'Light_Corridor', 'Light_Bay_Fore']);

/** Aufloesung der Schattenkarte je Wuerfelseite. */
const SHADOW_MAP_SIZE = 1024;

/**
 * Oberflaechenart je GLB-Material. Materialien ohne Eintrag (Glas, Leuchten,
 * Displays, Polster) bleiben glatt.
 */
const SURFACES: Record<string, SurfaceKind> = {
  Paint_Beige: 'panel',
  Paint_Olive: 'panel',
  Paint_Worn: 'worn',
  Metal_Bare: 'worn',
  Metal_Dark: 'panel',
  Metal_Rust: 'worn',
  Floor_Tread: 'grate',
  Hazard: 'worn',
};

/** Staerke der prozeduralen Normalen (x/y der Normal-Map). */
const NORMAL_SCALE = 0.55;

/**
 * Versatz der Boxprojektion in UV-Einheiten. Ohne ihn faellt eine Blechnaht
 * genau auf die Symmetrieebene x=0 und teilt Armaturenbrett und Decke mittig.
 */
const UV_OFFSET: [number, number] = [0.137, 0.081];

/**
 * Materialkorrektur gegen das GLB: dort ist praktisch alles Metall
 * (metalness 0,70–0,92) bei sehr dunkler Grundfarbe. Metalle haben keinen
 * diffusen Anteil — ihr ganzes Aussehen kommt aus der Reflexion, und die wird
 * mit der Grundfarbe eingefaerbt. Bei 0,10 bleibt davon fast nichts uebrig:
 * genau daher das flache, tote Grau.
 *
 * Richtig ist die Trennung nach Bauart: **lackierte Bleche sind Dielektrika**
 * (metalness ~0), blankes Stahlzeug bleibt metallisch und wird deutlich heller.
 */
const MATERIAL_LOOK: Record<string, { color: number; metalness: number; roughness: number }> = {
  // Lackiertes Blech — Dielektrikum, kein Metall (siehe Kopfkommentar oben).
  Paint_Beige: { color: 0x8a7f68, metalness: 0.04, roughness: 0.62 },
  Paint_Olive: { color: 0x4f5442, metalness: 0.05, roughness: 0.68 },
  Paint_Worn: { color: 0x6e6656, metalness: 0.07, roughness: 0.78 },
  // Blankes Stahlzeug bleibt metallisch und deutlich heller.
  Metal_Bare: { color: 0x8b8f95, metalness: 0.9, roughness: 0.42 },
  Metal_Dark: { color: 0x33363a, metalness: 0.85, roughness: 0.55 },
  // Rost ist Oxid, also kein Metall.
  Metal_Rust: { color: 0x7a4526, metalness: 0.08, roughness: 0.9 },
  Floor_Tread: { color: 0x4a4a46, metalness: 0.8, roughness: 0.55 },
  Rubber_Black: { color: 0x1a1a1a, metalness: 0.0, roughness: 0.94 },
  Fabric_Seat: { color: 0x3a342b, metalness: 0.0, roughness: 0.95 },
  Hazard: { color: 0xc39a2a, metalness: 0.0, roughness: 0.62 },
};

/** Displaymotiv je Screen-Mesh; die Farbe kommt aus dem GLB-Material. */
const SCREENS: Record<string, ScreenKind> = {
  SM_Screen_MFD0: 'bars',
  // Traegt im Spiel das Radar (siehe RadarScreen); das Motiv hier ist nur der
  // Rueckfall, solange der Innenraum noch nicht angebunden ist.
  SM_Screen_MFD1: 'radar',
  SM_Screen_MFD2: 'text',
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

/**
 * Staerke der Umgebungsreflexion auf den Innenraummaterialien. Das
 * PMREM-Environment traegt die Grundhelligkeit des Raums, ohne zu blenden.
 * Seit die lackierten Flaechen Dielektrika sind (siehe {@link MATERIAL_LOOK}),
 * haben sie wieder einen diffusen Anteil und brauchen deutlich weniger davon
 * als die frueheren Schwarzmetalle.
 */
const ENV_INTENSITY = 1.0;
const ENV_INTENSITY_GLASS = 0.6;

/**
 * Daempfung der Emissive-Materialien. Das GLB nutzt
 * `KHR_materials_emissive_strength` 1,3–2,5; ohne Bloom brennen die Flaechen
 * damit auf reines Weiss aus, statt farbig zu leuchten.
 */
const EMISSIVE_SCALE: Record<string, number> = {
  Screen_Amber: 0.34,
  Screen_Green: 0.30,
  // Die Leuchtflaechen sind gross; mit Bloom reicht wenig, sonst sind es
  // weisse Rechtecke statt Lampen.
  Lamp_Warm: 0.22,
  Lamp_Red: 0.40,
};

/** Erzeugt die Punktlichter (Emissive-Materialien leuchten selbst nicht). */
function addInteriorLights(root: Object3D): void {
  for (const [name, color, intensity, pos, distance] of LIGHTS) {
    const light = new PointLight(color, intensity, distance, LIGHT_DECAY);
    light.name = name;
    light.position.set(pos[0], pos[1], pos[2]);

    if (SHADOW_CASTERS.has(name)) {
      light.castShadow = true;
      light.shadow.mapSize.set(SHADOW_MAP_SIZE, SHADOW_MAP_SIZE);
      light.shadow.camera.near = 0.1;
      light.shadow.camera.far = distance;
      // Kantiges Modell mit grossen Flaechen: ohne Normal-Bias zieht sich der
      // Selbstschatten als Streifenmuster ueber Waende und Decke.
      light.shadow.bias = -0.002;
      light.shadow.normalBias = 0.035;
      // Eingefroren. Lampen und Einrichtung stehen fest zueinander, die Karte
      // aendert sich also nie — und seit die Sonne draussen ihre eigene Karte
      // mehrmals je Sekunde neu zeichnet, wuerde jede dieser Punktlampen sonst
      // im selben Takt sechs Wuerfelseiten mitzeichnen. Freigegeben wird sie
      // genau einmal, siehe {@link refreshInteriorShadows}.
      light.shadow.autoUpdate = false;
      light.shadow.needsUpdate = true;
    }

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
 * Sichtbare Meshes werfen und empfangen Schatten; Kollisionsboxen nicht.
 */
function enableShadows(root: Object3D): void {
  root.traverse((obj) => {
    if (!(obj instanceof Mesh) || obj.name.startsWith('COL_')) return;
    obj.castShadow = true;
    obj.receiveShadow = true;
  });
}

/**
 * Materialien auf die Kennwerte aus {@link MATERIAL_LOOK} bringen.
 */
function fixMaterialLook(root: Object3D): void {
  const done = new Set<Material>();
  root.traverse((obj) => {
    if (!(obj instanceof Mesh) || obj.name.startsWith('COL_')) return;
    const materials: Material[] = Array.isArray(obj.material) ? obj.material : [obj.material];
    for (const material of materials) {
      if (!material || done.has(material)) continue;
      done.add(material);

      const look = MATERIAL_LOOK[material.name];
      if (!look || !(material instanceof MeshStandardMaterial)) continue;
      material.color.setHex(look.color);
      material.metalness = look.metalness;
      material.roughness = look.roughness;
      material.needsUpdate = true;
    }
  });
}

/**
 * Boxprojizierte UVs in Modellkoordinaten: pro Vertex entscheidet die Normale,
 * welche der drei Achsen wegfaellt. Weil projiziert wird, passen benachbarte
 * Teile ohne Naht zueinander, und eine UV-Einheit entspricht ueberall
 * {@link TILE_METERS} Metern.
 *
 * Meshes, die schon UVs mitbringen, bleiben unangetastet.
 */
function boxProjectUv(mesh: Mesh): void {
  const geometry = mesh.geometry;
  if (geometry.getAttribute('uv')) return;
  const position = geometry.getAttribute('position') as BufferAttribute | undefined;
  const normals = geometry.getAttribute('normal') as BufferAttribute | undefined;
  if (!position || !normals) return;

  const uv = new Float32Array(position.count * 2);
  for (let i = 0; i < position.count; i++) {
    _point.fromBufferAttribute(position, i);
    _normal.fromBufferAttribute(normals, i);

    const ax = Math.abs(_normal.x);
    const ay = Math.abs(_normal.y);
    const az = Math.abs(_normal.z);

    let u: number;
    let v: number;
    if (ax >= ay && ax >= az) {
      u = _point.z;
      v = _point.y;
    } else if (ay >= az) {
      u = _point.x;
      v = _point.z;
    } else {
      u = _point.x;
      v = _point.y;
    }
    uv[i * 2] = u / TILE_METERS + UV_OFFSET[0];
    uv[i * 2 + 1] = v / TILE_METERS + UV_OFFSET[1];
  }
  geometry.setAttribute('uv', new BufferAttribute(uv, 2));
}

/**
 * Prozedurale Bleche, Naehte und Gitterroste auf die Huellenmaterialien legen
 * (siehe {@link SURFACES}). Ohne das ist jede Wand eine einfarbige Flaeche.
 */
function applySurfaces(root: Object3D): void {
  const cache = new Map<SurfaceKind, SurfaceMaps>();
  const maps = (kind: SurfaceKind): SurfaceMaps => {
    let entry = cache.get(kind);
    if (!entry) cache.set(kind, (entry = createSurfaceMaps(kind)));
    return entry;
  };

  const done = new Set<Material>();
  root.traverse((obj) => {
    if (!(obj instanceof Mesh) || obj.name.startsWith('COL_')) return;
    boxProjectUv(obj);

    const materials: Material[] = Array.isArray(obj.material) ? obj.material : [obj.material];
    for (const material of materials) {
      if (!material || done.has(material)) continue;
      done.add(material);

      const kind = SURFACES[material.name];
      if (kind === undefined || !(material instanceof MeshStandardMaterial)) continue;

      const surface = maps(kind);
      material.map = surface.map;
      material.roughnessMap = surface.roughnessMap;
      material.normalMap = surface.normalMap;
      material.normalScale.set(NORMAL_SCALE, NORMAL_SCALE);
      material.needsUpdate = true;
    }
  });
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
 * Reflexionsumgebung nachtraeglich austauschen — dafuer gedacht, die
 * nachgebaute Kammer durch eine Aufnahme des echten Innenraums zu ersetzen
 * (siehe `captureInteriorEnvironment`).
 */
/**
 * Die Schattenkarten des Innenraums einmal neu zeichnen lassen. Noetig, wenn
 * sich am Aufbau etwas geaendert hat — sie stehen sonst auf Dauer still
 * (siehe `light.shadow.autoUpdate` in {@link addInteriorLights}).
 */
export function refreshInteriorShadows(root: Object3D): void {
  root.traverse((child: Object3D) => {
    const light = child as Object3D & { shadow?: { needsUpdate: boolean } };
    if (light.shadow) light.shadow.needsUpdate = true;
  });
}

export function setInteriorEnvironment(root: Object3D, environment: Texture): void {
  const done = new Set<Material>();
  root.traverse((obj) => {
    if (!(obj instanceof Mesh)) return;
    const materials: Material[] = Array.isArray(obj.material) ? obj.material : [obj.material];
    for (const material of materials) {
      if (!material || done.has(material) || !(material instanceof MeshStandardMaterial)) continue;
      done.add(material);
      material.envMap = environment;
      material.envMapIntensity = material.name === GLASS_MATERIAL ? ENV_INTENSITY_GLASS : ENV_INTENSITY;
      material.needsUpdate = true;
    }
  });
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
  fixMaterialLook(root);
  separateCoplanarFaces(root);
  separateDecals(root);
  applySurfaces(root);
  applyScreens(root);
  enableShadows(root);
  addInteriorLights(root);
  addLightShafts(root);

  return root;
}
