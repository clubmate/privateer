import { Mesh, MeshStandardMaterial, PointLight } from 'three';
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
/** Groesster Abstand, in dem eine Leuchtflaeche zu einer Lampe gehoert. */
const PAIR_RADIUS = 1.4;
/** Faktor auf die rote Notbeleuchtung, wenn das Deckenlicht weg ist. */
const EMERGENCY_BOOST = 3.2;

interface Lamp {
  material: MeshStandardMaterial;
  baseEmissive: number;
  light: PointLight | null;
  baseIntensity: number;
  /** Eigener Phasenversatz, damit nicht alle Lampen im Gleichtakt zucken. */
  seed: number;
  /** Restzeit eines Aussetzers in Sekunden. */
  outage: number;
}

export class DamageLights {
  private readonly lamps: Lamp[] = [];
  /** Lampen ohne Leuchtflaeche (Akzentlicht an Werkbank, Koje, Konsole). */
  private readonly accents: Array<{ light: PointLight; base: number }> = [];
  private emergency: { material: MeshStandardMaterial; base: number } | null = null;
  private time = 0;

  constructor(private readonly random: () => number = Math.random) {}

  /** Lampen im geladenen Innenraum einsammeln. */
  attach(interior: Object3D): void {
    this.lamps.length = 0;
    this.accents.length = 0;
    this.emergency = null;

    const lights: PointLight[] = [];
    interior.traverse((object) => {
      if (object instanceof PointLight && object.name.startsWith(LIGHT_PREFIX)) {
        lights.push(object);
      }
    });
    const taken = new Set<PointLight>();

    interior.traverse((object) => {
      if (!(object instanceof Mesh)) return;

      const material = firstStandardMaterial(object);
      if (material && material.name === EMERGENCY_MATERIAL && !this.emergency) {
        this.emergency = { material, base: material.emissiveIntensity };
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
      });
    });

    for (const light of lights) {
      if (taken.has(light)) continue;
      this.accents.push({ light, base: light.intensity });
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
        if (this.random() < flicker * dt * 2.5) lamp.outage = 0.04 + this.random() * 0.22;
      }

      lamp.material.emissiveIntensity = lamp.baseEmissive * value;
      if (lamp.light) lamp.light.intensity = lamp.baseIntensity * value;
    }

    for (const accent of this.accents) accent.light.intensity = accent.base * level;

    if (this.emergency) {
      this.emergency.material.emissiveIntensity =
        this.emergency.base * (emergency ? EMERGENCY_BOOST : 1);
    }
  }
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
