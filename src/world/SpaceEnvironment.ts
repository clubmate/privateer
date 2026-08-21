import {
  Color,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PMREMGenerator,
  Scene,
  SphereGeometry,
  Vector3,
} from 'three';
import type { Texture, WebGLRenderer } from 'three';

/**
 * Reflexionsumgebung fuer alles, was draussen im Raum steht.
 *
 * **Warum ueberhaupt eine:** ein metallisches Fragment hat in einem
 * physikalisch basierten Modell keinen diffusen Anteil — seine ganze
 * Erscheinung ist Spiegelung. Ohne Umgebung bleibt einem Metall nur das
 * direkte Glanzlicht, und bei einer Grundrauheit von 0,95 ist das ein breiter,
 * matter Fleck. Die Erzadern wurden dadurch von ihrer eigenen Metalness
 * *dunkler* statt edler. Dieselbe Textur liefert nebenbei das Fuelllicht der
 * Schattenseiten: statt eines richtungslosen Zuschlags faellt jetzt der
 * beleuchtete Planet als Erdschein auf die sonnenabgewandte Seite.
 *
 * **Warum aus einer Szene und nicht aus einer Zeichenflaeche:**
 * {@link PMREMGenerator.fromScene} zeichnet in ein Halbfliesskomma-Ziel. Nur
 * so kann die Sonne heller als 1,0 sein — und genau das braucht ein
 * Glanzlicht, um wie eine Sonne auszusehen und nicht wie eine graue Scheibe.
 * Der Planet ist dabei eine echte Kugel unter einem echten Licht, hat also
 * einen Terminator statt eines gemalten Verlaufs.
 *
 * Die Aufnahme entsteht einmal beim Start. Der Planet steht 850 km entfernt;
 * auf den zehn Kilometern, nach denen der Ursprung zurueckgeschoben wird,
 * wandert er um weniger als ein Grad.
 */

export interface SpaceEnvironmentOptions {
  /** Richtung zur Sonne (normiert). */
  sunDirection: Vector3;
  sunColor?: Color;
  /**
   * Wie hell die Sonnenscheibe in der Aufnahme steht. Deutlich ueber 1 — sie
   * ist die Lichtquelle, nicht eine helle Flaeche.
   */
  sunRadiance?: number;
  /** Richtung zum Planeten (normiert). */
  planetDirection: Vector3;
  /** Scheinbarer Halbmesser des Planeten in Grad. */
  planetAngularRadius?: number;
  planetColor?: Color;
  /** Grundhelligkeit des Sternenhimmels — sehr dunkel, aber nicht schwarz. */
  skyColor?: Color;
}

/** Scheinbarer Halbmesser der Sonne in Grad. Klein halten! Siehe unten. */
const SUN_ANGULAR_RADIUS = 2.2;

/** Abstand, in dem die Koerper der Hilfsszene stehen. Nur Richtungen zaehlen. */
const SHELL = 100;

function discRadius(angularRadiusDeg: number): number {
  return Math.tan((angularRadiusDeg * Math.PI) / 180) * SHELL;
}

/**
 * Die Hilfsszene aufbauen. Oeffentlich, damit ein Test sie ohne
 * WebGL-Kontext pruefen kann.
 */
export function buildSpaceEnvironmentScene(options: SpaceEnvironmentOptions): Scene {
  const sunColor = options.sunColor ?? new Color(0xfff3e0);
  const sunRadiance = options.sunRadiance ?? 26;
  const planetColor = options.planetColor ?? new Color(0x4d6b8f);
  const planetAngle = options.planetAngularRadius ?? 15;

  const scene = new Scene();
  // Kein reines Schwarz: der Sternenhimmel traegt einen Rest Streulicht, und
  // ein Brocken, dessen Schattenseite exakt null ist, hat keine Silhouette
  // mehr, sondern ein Loch.
  scene.background = options.skyColor ?? new Color(0x05070d);

  // Sonne. Klein und sehr hell: der Raumwinkel geht linear in die diffuse
  // Beleuchtung ein, die Glanzlichtstaerke aber nicht. Eine kleine, grelle
  // Scheibe gibt also einen scharfen Reflex, ohne das Richtungslicht der
  // Szene ein zweites Mal mitzuzaehlen.
  const sun = new Mesh(
    new SphereGeometry(discRadius(SUN_ANGULAR_RADIUS), 16, 12),
    new MeshBasicMaterial({
      color: new Color(
        sunColor.r * sunRadiance,
        sunColor.g * sunRadiance,
        sunColor.b * sunRadiance,
      ),
      toneMapped: false,
    }),
  );
  sun.name = 'EnvSun';
  sun.position.copy(options.sunDirection).normalize().multiplyScalar(SHELL);
  scene.add(sun);

  // Planet als echte Kugel unter echtem Licht — der Terminator entsteht von
  // selbst, und die Sichel zeigt in dieselbe Richtung wie draussen.
  const planet = new Mesh(
    new SphereGeometry(discRadius(planetAngle), 32, 24),
    new MeshStandardMaterial({ color: planetColor, roughness: 1, metalness: 0 }),
  );
  planet.name = 'EnvPlanet';
  planet.position.copy(options.planetDirection).normalize().multiplyScalar(SHELL);
  scene.add(planet);

  const light = new DirectionalLight(sunColor, 3.2);
  light.name = 'EnvSunLight';
  light.position.copy(options.sunDirection).normalize().multiplyScalar(SHELL * 4);
  light.target = planet;
  scene.add(light);

  return scene;
}

/** Alles wieder freigeben, was die Hilfsszene belegt hat. */
function disposeScene(scene: Scene): void {
  scene.traverse((child) => {
    const mesh = child as Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const material = mesh.material as MeshBasicMaterial | undefined;
    if (material && !Array.isArray(material)) material.dispose();
  });
}

/**
 * Die Umgebung einmal aufnehmen. Der Aufrufer haelt die Textur und gibt sie
 * frei, wenn die Szene endet.
 */
export function createSpaceEnvironment(
  renderer: WebGLRenderer,
  options: SpaceEnvironmentOptions,
): Texture {
  const scene = buildSpaceEnvironmentScene(options);
  const pmrem = new PMREMGenerator(renderer);
  // Leichte Weichzeichnung: die Hilfskugeln haben Facetten, die Umgebung
  // soll sie nicht als Kanten im Glanzlicht weitergeben.
  const texture = pmrem.fromScene(scene, 0.015).texture;
  pmrem.dispose();
  disposeScene(scene);
  return texture;
}
