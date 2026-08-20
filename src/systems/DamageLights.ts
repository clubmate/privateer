import { Mesh, MeshStandardMaterial, PointLight, Vector3 } from 'three';
import type { Material, Object3D } from 'three';

/**
 * Beleuchtung unter Schaden.
 *
 * Der Innenraum bringt seine Lampen selbst mit (`InteriorLoader`): emissive
 * Leuchtflaechen `SM_Lamp*_Diffuser` und dazu passende Punktlichter `Light_*`.
 * Hier werden beide zur Laufzeit gedimmt und zum Flackern gebracht — ohne den
 * Loader anzufassen, der von der Spielmechanik nichts wissen soll.
 *
 * Damit einzelne Lampen unabhaengig zucken koennen, bekommt jede Leuchtflaeche
 * eine eigene Materialkopie: im GLB teilen sich alle `Lamp_Warm`.
 */

/** Leuchtflaechen der Deckenlampen. */
const DIFFUSER_PATTERN = /^SM_Lamp\d+_Diffuser$/;
/** Von `InteriorLoader` erzeugte Innenlampen. */
const LIGHT_PREFIX = 'Light_';
/** Material der roten Notbeleuchtung (Bodenstreifen, Warnlampen). */
const EMERGENCY_MATERIAL = 'Lamp_Red';
/**
 * Gemeinsames Material der warmen Kleinlampen (Konsolenknoepfe, Kojenlicht).
 * Die Deckenlampen bekommen eine eigene Kopie, dieses hier bleibt fuer den
 * Rest — ohne es mitzudimmen glimmt bei totem Bordnetz die Konsole weiter.
 */
const WARM_MATERIAL = 'Lamp_Warm';
/**
 * Lichtkegel unter den Deckenlampen (`ship/LightShafts.ts`). Sie haengen an
 * keiner Lampe und blieben deshalb in voller Staerke im dunklen Schiff stehen:
 * ein strahlender Kegel unter einer toten Lampe.
 */
const SHAFT_NAME = 'LightShaft';
/** Groesster Abstand, in dem eine Leuchtflaeche zu einer Lampe gehoert. */
const PAIR_RADIUS = 1.4;
/** Faktor auf die rote Notbeleuchtung, wenn das Deckenlicht weg ist. */
const EMERGENCY_BOOST = 3.2;

/**
 * Restlicher Anteil der Umgebungsreflexion bei komplett totem Licht.
 *
 * Die Reflexionsumgebung ist eine Aufnahme des *beleuchteten* Raums (siehe
 * `InteriorEnvironment`) und traegt einen guten Teil der Grundhelligkeit. Ohne
 * sie mitzudimmen bleibt der Frachtraum auch mit ausgeschalteten Lampen
 * gemuetlich hell — die Lampe geht aus, der Raum aber nicht.
 */
const ENV_FLOOR = 0.3;

interface Dimmable {
  material: MeshStandardMaterial;
  base: number;
}

/** Uniforms, die ein Lichtkegel zum Dimmen anbietet. */
interface ShaftMaterial {
  uniforms: { uStrength: { value: number } };
}

interface Shaft {
  uniform: { value: number };
  base: number;
  position: Vector3;
  /** Lampe, an der der Kegel haengt; `null` = nur Grundhelligkeit. */
  lamp: Lamp | null;
}

/** Groesster Abstand, in dem ein Lichtkegel zu einer Lampe gehoert. */
const SHAFT_RADIUS = 2.0;

interface Lamp {
  material: MeshStandardMaterial;
  baseEmissive: number;
  light: PointLight | null;
  baseIntensity: number;
  /** Eigener Phasenversatz, damit nicht alle Lampen im Gleichtakt zucken. */
  seed: number;
  /** Restzeit eines Aussetzers in Sekunden. */
  outage: number;
  /** Helligkeit im letzten Bild, 0..1 — der Lichtkegel haengt sich daran. */
  value: number;
  /** Weltposition der Leuchtflaeche, fuer die Zuordnung der Lichtkegel. */
  position: Vector3;
}

export class DamageLights {
  private readonly lamps: Lamp[] = [];
  /** Lampen ohne Leuchtflaeche (Akzentlicht an Werkbank, Koje, Konsole). */
  private readonly accents: Array<{ light: PointLight; base: number }> = [];
  private emergency: { material: MeshStandardMaterial; base: number } | null = null;
  /** Gemeinsames Warmlicht-Material der Kleinlampen (siehe {@link WARM_MATERIAL}). */
  private warm: Dimmable | null = null;
  /** Lichtkegel unter den Deckenlampen (siehe {@link SHAFT_NAME}). */
  private readonly shafts: Shaft[] = [];
  /** Alle Materialien mit Umgebungsreflexion (siehe {@link ENV_FLOOR}). */
  private readonly reflective: Dimmable[] = [];
  private time = 0;

  constructor(private readonly random: () => number = Math.random) {}

  /** Lampen im geladenen Innenraum einsammeln. */
  attach(interior: Object3D): void {
    this.lamps.length = 0;
    this.accents.length = 0;
    this.reflective.length = 0;
    this.shafts.length = 0;
    this.emergency = null;
    this.warm = null;

    const lights: PointLight[] = [];
    interior.traverse((object) => {
      if (object instanceof PointLight && object.name.startsWith(LIGHT_PREFIX)) {
        lights.push(object);
      }
    });
    const taken = new Set<PointLight>();
    const seen = new Set<MeshStandardMaterial>();

    interior.traverse((object) => {
      if (!(object instanceof Mesh)) return;

      if (object.name === SHAFT_NAME) {
        const uniform = shaftStrength(object);
        // Der Kegel wird nach dem Durchlauf einer Lampe zugeordnet; bis dahin
        // haengt er nur an der Grundhelligkeit.
        if (uniform) {
          this.shafts.push({
            uniform,
            base: uniform.value,
            position: object.getWorldPosition(new Vector3()),
            lamp: null,
          });
        }
        return;
      }

      const material = firstStandardMaterial(object);
      if (material && !seen.has(material)) {
        seen.add(material);
        if (material.name === EMERGENCY_MATERIAL && !this.emergency) {
          this.emergency = { material, base: material.emissiveIntensity };
        }
        if (material.name === WARM_MATERIAL && !this.warm) {
          this.warm = { material, base: material.emissiveIntensity };
        }
        if (material.envMapIntensity > 0) {
          this.reflective.push({ material, base: material.envMapIntensity });
        }
      }
      if (!DIFFUSER_PATTERN.test(object.name) || !material) return;

      // Eigene Kopie: sonst haengen alle Deckenlampen am selben Material und
      // koennen nur gemeinsam flackern.
      const own = material.clone();
      own.name = `${material.name}_${object.name}`;
      object.material = own;

      const light = nearestLight(object, lights, taken);
      if (light) taken.add(light);
      this.lamps.push({
        material: own,
        baseEmissive: own.emissiveIntensity,
        light,
        baseIntensity: light ? light.intensity : 0,
        seed: this.random() * Math.PI * 2,
        outage: 0,
        value: 1,
        position: object.getWorldPosition(new Vector3()),
      });
    });

    for (const light of lights) {
      if (taken.has(light)) continue;
      this.accents.push({ light, base: light.intensity });
    }

    // Jeder Lichtkegel bekommt die Lampe, unter der er haengt: so zuckt der
    // Kegel mit seiner Lampe mit, statt gleichmaessig ueber allen zu liegen.
    for (const shaft of this.shafts) {
      let best: Lamp | null = null;
      let bestDistance = SHAFT_RADIUS;
      for (const lamp of this.lamps) {
        const distance = shaft.position.distanceTo(lamp.position);
        if (distance >= bestDistance) continue;
        best = lamp;
        bestDistance = distance;
      }
      shaft.lamp = best;
    }
  }

  /**
   * `level` ist die Sollhelligkeit 0..1, `flicker` die Unruhe 0..1. Bei
   * `emergency` bleibt das Deckenlicht aus und die roten Bodenstreifen
   * uebernehmen — dunkel, aber begehbar.
   */
  update(dt: number, level: number, flicker: number, emergency: boolean): void {
    this.time += dt;

    for (const lamp of this.lamps) {
      let value = level;

      if (lamp.outage > 0) {
        lamp.outage -= dt;
        value = 0;
      } else if (flicker > 0) {
        // Zwei ungleiche Frequenzen: eine Schwebung liest sich als defekte
        // Drossel, ein reiner Sinus als Effekt.
        const wobble =
          0.5 + 0.5 * Math.sin(this.time * 11.3 + lamp.seed) * Math.sin(this.time * 3.7 + lamp.seed);
        value = level * (1 - flicker * 0.55 * wobble);
        // Die Wahrscheinlichkeit haengt am Zeitschritt und wird bei einem
        // langen Bild sonst groesser als 1 — dann setzt jede Lampe in jedem
        // Bild aus, und aus dem Flackern wird ein Dauerausfall. Deshalb
        // gedeckelt: bei Rucklern flackert es traeger, nicht kaputt.
        const chance = Math.min(flicker * Math.min(dt, 0.1) * 2.5, 0.3);
        if (this.random() < chance) lamp.outage = 0.04 + this.random() * 0.22;
      }

      lamp.value = value;
      lamp.material.emissiveIntensity = lamp.baseEmissive * value;
      if (lamp.light) lamp.light.intensity = lamp.baseIntensity * value;
    }

    for (const accent of this.accents) accent.light.intensity = accent.base * level;

    // Der Lichtkegel gehoert zu seiner Lampe: geht sie aus, verschwindet er.
    for (const shaft of this.shafts) {
      shaft.uniform.value = shaft.base * (shaft.lamp ? shaft.lamp.value : level);
    }

    // Kleinlampen an Konsole und Koje haengen am selben Bordnetz.
    if (this.warm) this.warm.material.emissiveIntensity = this.warm.base * level;

    const ambient = ENV_FLOOR + (1 - ENV_FLOOR) * level;
    for (const entry of this.reflective) entry.material.envMapIntensity = entry.base * ambient;

    if (this.emergency) {
      this.emergency.material.emissiveIntensity =
        this.emergency.base * (emergency ? EMERGENCY_BOOST : 1);
    }
  }
}

/**
 * `uStrength`-Uniform eines Lichtkegels, oder `null`, wenn das Mesh keinen
 * passenden Shader traegt. Bewusst defensiv: die Kegel gehoeren `LightShafts`,
 * und deren Aufbau soll sich aendern duerfen, ohne dass hier etwas kracht.
 */
function shaftStrength(mesh: Mesh): { value: number } | null {
  const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  const uniforms = (material as Partial<ShaftMaterial> | undefined)?.uniforms;
  const strength = uniforms?.uStrength;
  return strength && typeof strength.value === 'number' ? strength : null;
}

function firstStandardMaterial(mesh: Mesh): MeshStandardMaterial | null {
  const materials: Material[] = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  for (const material of materials) {
    if (material instanceof MeshStandardMaterial) return material;
  }
  return null;
}

/** Punktlicht, das zu einer Leuchtflaeche gehoert (naechstes freies in Reichweite). */
function nearestLight(mesh: Mesh, lights: PointLight[], taken: Set<PointLight>): PointLight | null {
  mesh.geometry.computeBoundingBox();
  const box = mesh.geometry.boundingBox;
  if (!box) return null;

  let best: PointLight | null = null;
  let bestDistance = PAIR_RADIUS;
  for (const light of lights) {
    if (taken.has(light)) continue;
    const distance = box.distanceToPoint(light.position);
    if (distance >= bestDistance) continue;
    best = light;
    bestDistance = distance;
  }
  return best;
}
