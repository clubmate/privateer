import { Mesh, MeshStandardMaterial, Object3D, PointLight } from 'three';
import type { Material, Texture } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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
  // Cockpit: Deckenleuchte hinter dem Sitz + kuehles Streulicht ueber der Konsole.
  ['Light_Cockpit', 0xa9c8ff, 4.5, [0, 1.90, 2.05], 8],
  ['Light_Console', 0x66c8ff, 1.4, [0, 1.75, 3.95], 3.0],
  // Gang: warmes Deckenlicht.
  ['Light_Corridor', 0xffd2a0, 4.0, [0, 1.80, 0.10], 5],
  // Wohn-/Frachtraum: Hauptlicht vorn, waermeres Licht ueber den Kisten.
  ['Light_Bay_Fore', 0xcfe0ff, 7.0, [0, 1.95, -2.30], 7],
  ['Light_Bay_Aft', 0xffcf9a, 4.5, [0, 1.95, -4.05], 6],
  // Kojenlampe (Koje liegt bei x +1.0, z -2.6, Kojendach bei y 1.20).
  ['Light_Bunk', 0xffb877, 0.9, [1.0, 0.95, -2.60], 2.0],
];

/** Staerke der Umgebungsreflexion auf den Innenraummaterialien. */
const ENV_INTENSITY = 1.0;
const ENV_INTENSITY_GLASS = 0.6;

/**
 * Daempfung der Emissive-Materialien. Das GLB nutzt
 * `KHR_materials_emissive_strength` 1,3–2,5; ohne Bloom brennen die Flaechen
 * damit auf reines Weiss aus, statt farbig zu leuchten.
 */
const EMISSIVE_SCALE: Record<string, number> = {
  Screen_Emissive: 0.5,
  Screen_Emissive_Amber: 0.55,
  Light_Strip: 0.6,
  Light_Strip_Red: 0.75,
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
 * - `Glass` braucht in Three.js zusaetzlich `depthWrite = false`, damit der
 *   Weltraum hinter der Kanzel sauber durchscheint.
 * - Die Hull-/Panel-Materialien sind stark metallisch (0,75–0,92). Ohne
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
  addInteriorLights(root);

  return root;
}
