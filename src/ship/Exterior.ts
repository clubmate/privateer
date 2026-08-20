import {
  AdditiveBlending,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  DoubleSide,
  FrontSide,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PMREMGenerator,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
} from 'three';
import type { Material, Texture, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createSurfaceMaps, TILE_METERS, type SurfaceKind, type SurfaceMaps } from './InteriorSurfaces';
import type { FlightModel } from './FlightModel';

/**
 * Laedt `public/models/ship-exterior.glb` — den Rumpf, wie ihn der Spieler in
 * der Aussenansicht sieht — und haelt die Effekte daran am Leben.
 *
 * **Achsen:** Wie beim Innenraum kommt das GLB mit der Nase entlang **+Z** aus
 * Blender; das Projekt erwartet **-Z**. Der Root wird deshalb um 180 Grad um Y
 * gedreht. Modell-**+X** ist damit in Three **-X**, also **Backbord** — daher
 * sitzt das rote Positionslicht im Generator auf +X.
 *
 * **Sichtbarkeit:** Der Rumpf umschliesst die Kamera. Innenraum (Layer 0) und
 * Rumpf werden von derselben Nahkamera gezeichnet, im Cockpit saesse der Pilot
 * also in einem geschlossenen Blechkasten. Der Rumpf ist deshalb
 * **standardmaessig unsichtbar** und wird nur von der Verfolgerkamera
 * eingeschaltet (siehe {@link Exterior.setVisible}).
 *
 * **Warum Layer 0 und nicht WORLD_LAYER:** Der Renderpfad zeichnet die Welt vor
 * dem Innenraum und loescht dazwischen die Tiefe. Laege der Rumpf in der Welt,
 * wuerde der Innenraum ueber ihn hinweggezeichnet — man saehe das Cockpit durch
 * die Aussenhaut. Auf Layer 0 sortieren Rumpf und Innenraum korrekt
 * gegeneinander; der Preis ist, dass ein Asteroid zwischen Kamera und Schiff
 * den Rumpf nicht verdeckt. In der Aussenansicht ist das der deutlich
 * kleinere Fehler.
 */

const EXTERIOR_ROOT = 'ShipExterior';
const GLASS_MATERIAL = 'Glass';

/**
 * Materialkorrektur gegen das GLB, gleiche Trennung wie im Innenraum:
 * **lackiertes Blech ist ein Dielektrikum** (metalness ~0), blankes Stahlzeug
 * bleibt metallisch. Metalle haben keinen diffusen Anteil — ihr Aussehen kommt
 * allein aus der Reflexion, und ohne Reflexionsquelle werden sie schwarz.
 */
const MATERIAL_LOOK: Record<string, { color: number; metalness: number; roughness: number }> = {
  Hull_Paint: { color: 0x8d8471, metalness: 0.04, roughness: 0.64 },
  Hull_Panel: { color: 0x7b7566, metalness: 0.05, roughness: 0.72 },
  Hull_Olive: { color: 0x4b5140, metalness: 0.05, roughness: 0.68 },
  Metal_Bare: { color: 0x8b8f95, metalness: 0.9, roughness: 0.42 },
  Metal_Dark: { color: 0x2f3236, metalness: 0.85, roughness: 0.55 },
  // Rost ist Oxid, also kein Metall.
  Metal_Rust: { color: 0x6d3a20, metalness: 0.1, roughness: 0.9 },
  Rubber_Black: { color: 0x131313, metalness: 0.0, roughness: 0.92 },
  Hazard: { color: 0xbe8a14, metalness: 0.0, roughness: 0.62 },
  Marking: { color: 0xbdb8a9, metalness: 0.0, roughness: 0.7 },
};

/** Oberflaechenart je GLB-Material (prozedurale Bleche und Gebrauchsspuren). */
const SURFACES: Record<string, SurfaceKind> = {
  Hull_Paint: 'panel',
  Hull_Panel: 'panel',
  Hull_Olive: 'panel',
  Metal_Bare: 'worn',
  Metal_Dark: 'panel',
  Metal_Rust: 'worn',
  Hazard: 'worn',
  Marking: 'worn',
};

/** Staerke der prozeduralen Normalen. Aussen kraeftiger als innen: der Rumpf
 *  wird aus Metern Entfernung gesehen, nicht aus Zentimetern. */
const NORMAL_SCALE = 0.8;

/** Versatz der Boxprojektion, damit keine Blechnaht auf die Symmetrieebene faellt. */
const UV_OFFSET: [number, number] = [0.211, 0.043];

/** Reflexionsstaerke fuer Blech und fuer die Kanzel. */
const ENV_INTENSITY = 0.85;
const ENV_INTENSITY_GLASS = 1.6;

// -------------------------------------------------------------- Triebwerke

/**
 * Quelle des Schubsignals. `FlightModel` erfuellt sie, aber die reine Funktion
 * {@link thrustLevel} soll ohne ein ganzes Flugmodell testbar bleiben.
 */
export interface ThrustSource {
  /** True, wenn der Modus die Geschwindigkeit regelt (Arcade/Assist). */
  assistEnabled: boolean;
  /** Sollgeschwindigkeit in m/s. */
  setSpeed: number;
  /** Obergrenze der Sollgeschwindigkeit in m/s. */
  maxSetSpeed: number;
  /** Laengsschub-Eingabe -1..1 (nur im freien Newton-Modus massgeblich). */
  main: number;
  afterburner: boolean;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
 * Wie weit die Duesen brennen, 0..1.
 *
 * In den geregelten Modi gibt es keinen Gashebel — dort ist die
 * Sollgeschwindigkeit das, was der Pilot einstellt, und genau die gehoert an
 * die Flamme. Nur im freien Newton-Modus ist die Schubeingabe selbst gemeint.
 */
export function thrustLevel(source: ThrustSource): number {
  if (source.assistEnabled) {
    return source.maxSetSpeed > 0 ? clamp01(source.setSpeed / source.maxSetSpeed) : 0;
  }
  return clamp01(Math.max(source.main, 0));
}

/** Laenge der Flamme in Vielfachen des Duesenradius. */
export function plumeLength(level: number, afterburner: boolean): number {
  const base = 0.9 + level * 3.6;
  return afterburner ? base + 5.4 : base;
}

/**
 * Blitzmuster der Positionslichter. Ein Doppelblitz je Periode — ein
 * gleichmaessiges An/Aus liest sich als Fehler, der Doppelblitz als Absicht.
 */
export function beaconLevel(time: number, period: number, phase = 0): number {
  const t = (((time + phase) % period) + period) % period;
  const flash = (start: number): number => Math.max(0, 1 - Math.abs(t - start) / 0.06);
  return Math.min(1, flash(0.0) + flash(0.2));
}

/** Duesenmuendungen im GLB: Markername -> Glutradius kommt aus der Skalierung. */
const THRUSTER_MARKERS = ['Thruster_0', 'Thruster_1', 'Thruster_2', 'Thruster_3'];

interface LampSpec {
  /** Marker im GLB (traegt Position und, ueber die Skalierung, die Groesse). */
  marker: string;
  /** Leuchtflaeche im GLB; bekommt eine eigene Materialkopie. */
  mesh: string;
  color: number;
  kind: 'steady' | 'strobe';
  phase: number;
}

const LAMPS: LampSpec[] = [
  { marker: 'Nav_Port', mesh: 'SM_Lamp_NavPort', color: 0xff2418, kind: 'steady', phase: 0 },
  { marker: 'Nav_Star', mesh: 'SM_Lamp_NavStar', color: 0x2bff5a, kind: 'steady', phase: 0 },
  { marker: 'Beacon_Top', mesh: 'SM_Lamp_BeaconTop', color: 0xffffff, kind: 'strobe', phase: 0 },
  { marker: 'Beacon_Belly', mesh: 'SM_Lamp_BeaconBelly', color: 0xffffff, kind: 'strobe', phase: 0.9 },
  { marker: 'Beacon_Tail', mesh: 'SM_Lamp_BeaconTail', color: 0xfff0d0, kind: 'strobe', phase: 1.4 },
];

/** Periode des Blinkers in Sekunden. */
const STROBE_PERIOD = 1.7;

interface Thruster {
  plume: Mesh;
  core: Mesh;
  radius: number;
  /** Phasenversatz, damit die vier Duesen nicht im Gleichtakt flackern. */
  phase: number;
}

interface Lamp {
  material: MeshStandardMaterial;
  halo: Sprite;
  spec: LampSpec;
  baseIntensity: number;
}

/**
 * Der Aussenrumpf als Szenenknoten. Wird an das Schiffs-Rig gehaengt und ist
 * nur in der Aussenansicht sichtbar.
 */
export class Exterior extends Object3D {
  private readonly thrusters: Thruster[] = [];
  private readonly lamps: Lamp[] = [];
  private time = 0;

  constructor(root: Object3D) {
    super();
    this.name = 'ShipExterior';
    this.visible = false;
    this.add(root);
    this.collectThrusters(root);
    this.collectLamps(root);
  }

  /** Aussenansicht an oder aus. Im Cockpit muss der Rumpf weg sein. */
  setVisible(visible: boolean): void {
    this.visible = visible;
  }

  /**
   * Flammen und Blinker weiterrechnen. Laeuft nur, wenn der Rumpf sichtbar ist —
   * unsichtbar gibt es nichts zu sehen und nichts zu rechnen.
   */
  update(dt: number, flight: FlightModel): void {
    if (!this.visible) return;
    this.time += dt;

    const params = flight.getParams();
    const level = thrustLevel({
      assistEnabled: flight.assistEnabled,
      setSpeed: flight.setSpeed,
      maxSetSpeed: params.maxSetSpeed,
      main: flight.inputs.main,
      afterburner: flight.inputs.afterburner,
    });
    const afterburner = flight.inputs.afterburner;
    const length = plumeLength(level, afterburner);
    const active = level > 0.01 || afterburner;

    for (const thruster of this.thrusters) {
      thruster.plume.visible = active;
      thruster.core.visible = active;
      if (!active) continue;

      // Flackern: zwei unharmonische Schwingungen, je Duese phasenversetzt.
      const flicker =
        1 +
        0.07 * Math.sin(this.time * 37 + thruster.phase) +
        0.04 * Math.sin(this.time * 61.7 + thruster.phase * 2.3);
      thruster.plume.scale.set(flicker, flicker, length * flicker);

      const glow = clamp01(0.35 + level * 0.65 + (afterburner ? 0.6 : 0));
      const core = thruster.core.material as MeshBasicMaterial;
      core.opacity = glow;
      thruster.core.scale.setScalar(0.85 + glow * 0.35);
      const plume = thruster.plume.material as MeshBasicMaterial;
      plume.opacity = clamp01(0.55 + level * 0.45);
      // Der Nachbrenner brennt heisser, also blauer im Kern.
      plume.color.setRGB(1, afterburner ? 0.82 : 0.66, afterburner ? 0.72 : 0.38);
    }

    for (const lamp of this.lamps) {
      const value =
        lamp.spec.kind === 'steady'
          ? 0.75 + 0.25 * Math.sin(this.time * 2.1)
          : beaconLevel(this.time, STROBE_PERIOD, lamp.spec.phase);
      lamp.material.emissiveIntensity = lamp.baseIntensity * (0.12 + value * 1.6);
      lamp.halo.material.opacity = 0.12 + value * 0.88;
      lamp.halo.scale.setScalar(lamp.halo.userData.size * (0.7 + value * 0.6));
    }
  }

  private collectThrusters(root: Object3D): void {
    root.updateMatrix();
    for (const [index, name] of THRUSTER_MARKERS.entries()) {
      const marker = root.getObjectByName(name);
      if (!marker) continue;

      // Der Marker haengt direkt am gedrehten Root; seine Position im
      // Schiffssystem ist damit `root.matrix * marker.position`. Der Radius der
      // Glut steckt in der Skalierung des Markers (siehe build_exterior.py).
      const position = marker.position.clone().applyMatrix4(root.matrix);
      const radius = Math.abs(marker.scale.x) || 0.5;

      const plume = new Mesh(createPlumeGeometry(radius), createPlumeMaterial());
      plume.position.copy(position);
      plume.frustumCulled = false;
      plume.layers.set(0);

      const core = new Mesh(
        new CircleGeometry(radius * 0.92, 20),
        new MeshBasicMaterial({
          color: 0xfff0d8,
          transparent: true,
          blending: AdditiveBlending,
          depthWrite: false,
          toneMapped: false,
        }),
      );
      // Die Scheibe schaut nach achtern (+Z im Schiffssystem).
      core.position.copy(position).add(new Vector3(0, 0, 0.02));
      core.layers.set(0);

      this.add(plume, core);
      this.thrusters.push({ plume, core, radius, phase: index * 1.7 });
    }
  }

  private collectLamps(root: Object3D): void {
    root.updateMatrix();
    for (const spec of LAMPS) {
      const mesh = root.getObjectByName(spec.mesh);
      const marker = root.getObjectByName(spec.marker);
      if (!(mesh instanceof Mesh) || !marker) continue;

      // Eigene Materialkopie je Lampe: alle weissen Blitzer teilen sich sonst
      // ein Material und blinken zwangslaeufig im Gleichtakt.
      const source = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
      if (!(source instanceof MeshStandardMaterial)) continue;
      const material = source.clone();
      material.name = `${source.name}_${spec.mesh}`;
      material.emissive = new Color(spec.color);
      material.toneMapped = false;
      mesh.material = material;

      const size = (Math.abs(marker.scale.x) || 0.15) * 6;
      const halo = new Sprite(
        new SpriteMaterial({
          map: haloTexture(),
          color: new Color(spec.color),
          transparent: true,
          blending: AdditiveBlending,
          depthWrite: false,
          toneMapped: false,
        }),
      );
      halo.position.copy(marker.position).applyMatrix4(root.matrix);
      halo.userData.size = size;
      halo.scale.setScalar(size);
      halo.layers.set(0);
      this.add(halo);

      this.lamps.push({ material, halo, spec, baseIntensity: 1.4 });
    }
  }
}

// ------------------------------------------------------------------ Effekte

/**
 * Flammenkegel entlang **+Z** (achtern). Vier Ringe mit Vertexfarben: innen
 * weissglut, aussen rotorange, zur Spitze hin durchsichtig. Der Farbverlauf
 * steckt in der Geometrie, damit kein Shader und keine Textur noetig ist.
 *
 * Die Laenge ist auf 1 normiert; die Flamme wird zur Laufzeit in z skaliert.
 */
function createPlumeGeometry(radius: number, segments = 16): BufferGeometry {
  const rings: Array<[number, number, [number, number, number, number]]> = [
    // [z, Radiusfaktor, RGBA]
    [0.0, 1.0, [1.0, 0.95, 0.8, 0.95]],
    [0.3, 0.86, [1.0, 0.62, 0.24, 0.8]],
    [0.65, 0.52, [1.0, 0.36, 0.1, 0.4]],
    [1.0, 0.06, [0.85, 0.2, 0.05, 0.0]],
  ];

  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  for (const [z, factor, rgba] of rings) {
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      positions.push(
        Math.cos(angle) * radius * factor,
        Math.sin(angle) * radius * factor,
        z,
      );
      colors.push(...rgba);
    }
  }

  for (let r = 0; r < rings.length - 1; r++) {
    for (let i = 0; i < segments; i++) {
      const a = r * segments + i;
      const b = r * segments + ((i + 1) % segments);
      const c = a + segments;
      const d = b + segments;
      indices.push(a, b, d, a, d, c);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 4));
  geometry.setIndex(indices);
  return geometry;
}

function createPlumeMaterial(): MeshBasicMaterial {
  return new MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    side: DoubleSide,
    // Nicht tonemappen: die Flamme soll ueber die Bloom-Schwelle kommen.
    toneMapped: false,
  });
}

let haloCache: Texture | null = null;

/** Weicher runder Fleck fuer die Positionslichter. */
function haloTexture(): Texture {
  if (haloCache) return haloCache;
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d')!;
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  haloCache = new CanvasTexture(canvas);
  return haloCache;
}

// -------------------------------------------------------------- Reflexionen

/**
 * Reflexionsumgebung fuer draussen: schwarzer Raum, eine harte Sonne, ein
 * schwacher Aufheller von unten.
 *
 * Die Innenraumaufnahme aus `main.ts` waere hier falsch — sie zeigt eine
 * beleuchtete Kammer. Ohne *irgendeine* Umgebung bleiben die metallischen
 * Materialien im Schatten dagegen vollstaendig schwarz, und der Rumpf zerfaellt
 * in eine helle und eine tote Haelfte.
 */
export function createSpaceEnvironment(sunDirection: Vector3): Scene {
  const scene = new Scene();

  const sky = new Mesh(
    new SphereGeometry(50, 16, 12),
    new MeshBasicMaterial({ color: 0x0a0d14, side: BackSide }),
  );
  scene.add(sky);

  const sun = new Mesh(
    new SphereGeometry(6, 16, 12),
    new MeshBasicMaterial({ color: 0xfff4e2 }),
  );
  sun.position.copy(sunDirection).normalize().multiplyScalar(40);
  scene.add(sun);

  // Schwacher, kuehler Aufheller gegenueber der Sonne — sonst ist die
  // Schattenseite eine schwarze Silhouette ohne jede Zeichnung.
  const fill = new Mesh(
    new SphereGeometry(20, 12, 10),
    new MeshBasicMaterial({ color: 0x11202e }),
  );
  fill.position.copy(sunDirection).normalize().multiplyScalar(-40);
  scene.add(fill);

  return scene;
}

// ----------------------------------------------------------------- Aufbau

const _point = new Vector3();
const _normal = new Vector3();

/**
 * Boxprojizierte UVs in Modellkoordinaten — dieselbe Idee wie im Innenraum:
 * pro Vertex entscheidet die Normale, welche Achse wegfaellt. Weil projiziert
 * wird, passen benachbarte Bleche ohne Naht zueinander, und eine UV-Einheit
 * entspricht ueberall {@link TILE_METERS} Metern.
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

function fixMaterials(root: Object3D, environment: Texture | null): void {
  const cache = new Map<SurfaceKind, SurfaceMaps>();
  const maps = (kind: SurfaceKind): SurfaceMaps => {
    let entry = cache.get(kind);
    if (!entry) cache.set(kind, (entry = createSurfaceMaps(kind)));
    return entry;
  };

  const done = new Set<Material>();
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    object.layers.set(0);
    // Der Rumpf steht im Schattenwurf der Innenraumlampen; Schatten sind hier
    // weder noetig noch bezahlbar (die Schattenkarte wird genau einmal
    // gezeichnet, lange bevor der Rumpf geladen ist).
    object.castShadow = false;
    object.receiveShadow = false;
    boxProjectUv(object);

    const materials: Material[] = Array.isArray(object.material)
      ? object.material
      : [object.material];
    for (const material of materials) {
      if (!material || done.has(material) || !(material instanceof MeshStandardMaterial)) continue;
      done.add(material);

      const look = MATERIAL_LOOK[material.name];
      if (look) {
        material.color.setHex(look.color);
        material.metalness = look.metalness;
        material.roughness = look.roughness;
      }

      const kind = SURFACES[material.name];
      if (kind !== undefined) {
        const surface = maps(kind);
        material.map = surface.map;
        material.roughnessMap = surface.roughnessMap;
        material.normalMap = surface.normalMap;
        material.normalScale.set(NORMAL_SCALE, NORMAL_SCALE);
      }

      if (material.name === GLASS_MATERIAL) {
        material.transparent = true;
        material.opacity = 0.24;
        material.side = DoubleSide;
        material.metalness = 0.0;
        material.roughness = 0.04;
        material.color.setHex(0x2c3a42);
      } else {
        material.side = FrontSide;
      }

      if (environment) {
        material.envMap = environment;
        material.envMapIntensity =
          material.name === GLASS_MATERIAL ? ENV_INTENSITY_GLASS : ENV_INTENSITY;
      }
      material.needsUpdate = true;
    }
  });
}

/**
 * Laedt den Aussenrumpf. Der zurueckgegebene Knoten kann direkt an das
 * Schiffs-Rig gehaengt werden und ist zunaechst unsichtbar.
 *
 * `renderer` wird nur gebraucht, um die Reflexionsumgebung vorzuberechnen.
 */
export async function loadShipExterior(
  url: string,
  renderer: WebGLRenderer,
  sunDirection = new Vector3(0.8, 0.3, -0.1),
): Promise<Exterior> {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(url);

  const root = gltf.scene.getObjectByName(EXTERIOR_ROOT) ?? gltf.scene;
  root.name = EXTERIOR_ROOT;
  root.removeFromParent();

  // Nase des GLB zeigt auf +Z -> auf die Projektkonvention -Z drehen.
  root.rotation.y = Math.PI;
  root.updateMatrix();

  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(createSpaceEnvironment(sunDirection), 0.04).texture;
  pmrem.dispose();

  fixMaterials(root, environment);

  return new Exterior(root);
}
