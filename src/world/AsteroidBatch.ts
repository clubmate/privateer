import {
  Color,
  InstancedBufferAttribute,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from 'three';
import type { BufferGeometry } from 'three';
import { MINERALS, type MineralId } from './AsteroidTypes';

/**
 * Gestein, Adern und Instanzen.
 *
 * **Warum ein eigener Shader:** der Inhalt eines Brockens soll sichtbar sein,
 * ohne dass jeder Brocken eine eigene Textur oder ein eigenes Material
 * bekommt. Die Geometrie liefert deshalb nur, *wo* Adern und Mulden liegen
 * (`aRockDetail`), die Instanz liefert, *welche Farbe* sie haben. So teilen
 * sich hunderte Brocken ein Material und einen Zeichenaufruf, und trotzdem
 * ist ein Eisbrocken von einer Kupferader zu unterscheiden.
 *
 * Dazu kommt feines Rauschen im Fragment: Geometrie kann die Koernung eines
 * 400-m-Planetoiden nicht tragen (ein Dreieck ist dort 14 m breit), aus der
 * Naehe braucht die Oberflaeche aber Struktur. Das Rauschen blendet mit der
 * Entfernung aus — weiter weg zahlt niemand dafuer.
 */

/**
 * Drei Reliefstufen in der Normale, je Wellenlaenge eine, mit eigener
 * Ausblendung.
 *
 * **Warum gestaffelt:** prozedurales Rauschen hat keine Mipmaps. Sobald eine
 * Zelle unter Pixelgroesse faellt, wird aus Koernung Griess und der Brocken
 * flimmert wie ein schlechtes Fernsehbild. Also blendet jede Stufe aus, bevor
 * es soweit ist; uebrig bleibt genau die Struktur, die auf der jeweiligen
 * Entfernung darstellbar ist. Zusammen sind sie eine Oktavkette — aus der
 * Naehe liegen alle drei uebereinander, von weitem traegt nur die groebste.
 *
 * `scale` ist der Kehrwert der Wellenlaenge in Metern, `near`/`far` der
 * Ausblendbereich in Metern.
 */
const RELIEF = [
  { scale: 0.09, near: 400, far: 1100, strength: 0.26 }, // gut 10 m: Mittelform
  { scale: 0.33, near: 110, far: 320, strength: 0.2 }, // 3 m: Buckel und Rinnen
  { scale: 1.3, near: 30, far: 95, strength: 0.22 }, // 0,8 m: Koernung
];

/**
 * Helligkeitsflecken aus derselben Rauschquelle, aber ohne Normale: Staub,
 * Schutt und ausgebleichte Stellen. Fels ist fleckig — waere alles nur
 * gebeult, saehe die Oberflaeche aus wie gehaemmertes Blech.
 */
const DUST_SCALE = 0.55;
const DUST_NEAR = 160;
const DUST_FAR = 480;
const DUST_STRENGTH = 0.5;

/**
 * Sternen- und Planetenlicht. Die Fuelllampe der Szene liegt in der
 * Tiefenschicht und erreicht die Brocken nicht; ohne diesen Rest waere jede
 * Schattenseite ein schwarzes Loch mit Silhouette. Bewusst winzig — es soll
 * Form andeuten, nicht den Weltraum aufhellen.
 */
const STARLIGHT = 0.035;

/** Wieviel Metall die Adern zeigen (Erz glaenzt, Eis und Kristall nicht). */
const METAL: Partial<Record<MineralId, number>> = {
  iron: 0.55,
  copper: 0.5,
  platinum: 0.75,
  silicon: 0.2,
};

/** Wie deutlich die Adern durchschlagen. Taubes Gestein bleibt langweilig. */
const VEIN_POWER: Record<MineralId, number> = {
  rock: 0.35,
  iron: 1.0,
  ice: 1.15,
  copper: 0.95,
  silicon: 0.9,
  platinum: 0.85,
  crystal: 1.2,
};

/** Grundrauheit je Mineral — Eis ist glatt, Gestein stumpf. */
const ROUGHNESS: Partial<Record<MineralId, number>> = {
  ice: 0.42,
  crystal: 0.55,
  platinum: 0.8,
};

const _rock = new Color();
const _vein = new Color();

/**
 * Das gemeinsame Material aller Brocken. Ein einziges Programm, damit der
 * Renderer die Stapel hintereinander wegzeichnen kann.
 */
export function createRockMaterial(): MeshStandardMaterial {
  const material = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.95,
    metalness: 0.0,
  });

  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        attribute vec3 aRockDetail;   // x: Adern, y: Mulde, z: Flecken
        attribute vec3 aRock;
        attribute vec3 aVein;
        attribute vec4 aRockMod;      // Aderstaerke, Leuchten, Rauheit, Metall
        varying vec3 vRockColor;
        varying vec3 vRockGlow;
        varying vec2 vRockSurf;
        varying vec3 vRockPos;`,
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        float veinMask = clamp(aRockDetail.x * aRockMod.x, 0.0, 1.0);
        float cavity = aRockDetail.y;
        // In den Mulden liegt Schutt: er deckt die Adern zu und schluckt Licht.
        veinMask *= 1.0 - cavity * 0.7;
        // Grossflaeckige Helligkeitsflecken — Fels ist nie einfarbig.
        float mottle = 0.70 + aRockDetail.z * 0.42;
        vRockColor = mix(aRock * mottle, aVein, veinMask) * (1.0 - cavity * 0.38);
        vRockGlow = aVein * (veinMask * aRockMod.y);
        vRockSurf = vec2(mix(aRockMod.z, aRockMod.z * 0.6, veinMask), aRockMod.w * veinMask);
        float rockScale = length(modelMatrix[0].xyz);
        #ifdef USE_INSTANCING
          rockScale *= length(instanceMatrix[0].xyz);
        #endif
        // Ortsfest am Brocken und in Metern: die Koernung dreht sich mit und
        // ist auf dem Geroell so gross wie auf dem Planetoiden.
        vRockPos = transformed * rockScale;`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        varying vec3 vRockColor;
        varying vec3 vRockGlow;
        varying vec2 vRockSurf;
        varying vec3 vRockPos;

        float rockHash(vec3 p) {
          p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float rockNoise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(rockHash(i), rockHash(i + vec3(1,0,0)), f.x),
                mix(rockHash(i + vec3(0,1,0)), rockHash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(rockHash(i + vec3(0,0,1)), rockHash(i + vec3(1,0,1)), f.x),
                mix(rockHash(i + vec3(0,1,1)), rockHash(i + vec3(1,1,1)), f.x), f.y), f.z);
        }

        /** Anstieg des Rauschens, normiert auf die Schrittweite. */
        vec3 rockGradient(vec3 p) {
          const float e = 0.5;
          float n0 = rockNoise(p);
          return (1.0 / e) * vec3(
            rockNoise(p + vec3(e, 0.0, 0.0)) - n0,
            rockNoise(p + vec3(0.0, e, 0.0)) - n0,
            rockNoise(p + vec3(0.0, 0.0, e)) - n0);
        }`,
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        diffuseColor.rgb *= vRockColor;
        float rockDist = length(vViewPosition);
        float rockDust = 1.0 - smoothstep(${DUST_NEAR.toFixed(1)}, ${DUST_FAR.toFixed(1)}, rockDist);
        if (rockDust > 0.01) {
          diffuseColor.rgb *= 1.0 + rockDust * ${DUST_STRENGTH.toFixed(2)}
            * (rockNoise(vRockPos * ${DUST_SCALE.toFixed(2)}) - 0.5);
        }`,
      )
      .replace(
        '#include <roughnessmap_fragment>',
        `#include <roughnessmap_fragment>
        roughnessFactor = vRockSurf.x;`,
      )
      .replace(
        '#include <metalnessmap_fragment>',
        `#include <metalnessmap_fragment>
        metalnessFactor = vRockSurf.y;`,
      )
      .replace(
        '#include <normal_fragment_maps>',
        `#include <normal_fragment_maps>
        // Relief in der Normale — die Geometrie bleibt unberuehrt. Nur der
        // Anteil tangential zur Flaeche kippt die Normale; der radiale wuerde
        // sie bloss verkuerzen.
        vec3 rockGrad = vec3(0.0);
${RELIEF.map(
  (r) => `        {
          float fade = 1.0 - smoothstep(${r.near.toFixed(1)}, ${r.far.toFixed(1)}, rockDist);
          if (fade > 0.01) rockGrad += (fade * ${r.strength.toFixed(2)}) * rockGradient(vRockPos * ${r.scale.toFixed(3)});
        }`,
).join('\n')}
        rockGrad -= dot(rockGrad, normal) * normal;
        normal = normalize(normal - rockGrad);`,
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        totalEmissiveRadiance += vRockGlow + vRockColor * ${STARLIGHT.toFixed(3)};`,
      );
  };

  // Ein Schluessel fuer alle Brocken: sonst kompiliert Three je Stapel neu.
  material.customProgramCacheKey = () => 'privateer-rock';
  return material;
}

/**
 * Ein Stapel gleicher Form. Jeder Stapel ist genau ein Zeichenaufruf; die
 * Grossbrocken bekommen einen Stapel mit einem einzigen Platz, damit
 * Instanzen und Einzelstuecke denselben Shader benutzen.
 */
export class RockBatch {
  readonly mesh: InstancedMesh<BufferGeometry, MeshStandardMaterial>;
  private readonly rock: InstancedBufferAttribute;
  private readonly vein: InstancedBufferAttribute;
  private readonly mod: InstancedBufferAttribute;
  private readonly matrix = new Matrix4();
  private readonly scaleVector = new Vector3();

  constructor(geometry: BufferGeometry, material: MeshStandardMaterial, capacity: number) {
    this.rock = new InstancedBufferAttribute(new Float32Array(capacity * 3), 3);
    this.vein = new InstancedBufferAttribute(new Float32Array(capacity * 3), 3);
    this.mod = new InstancedBufferAttribute(new Float32Array(capacity * 4), 4);
    geometry.setAttribute('aRock', this.rock);
    geometry.setAttribute('aVein', this.vein);
    geometry.setAttribute('aRockMod', this.mod);

    this.mesh = new InstancedMesh(geometry, material, capacity);
    this.mesh.name = 'RockBatch';
  }

  /** Lage einer Instanz setzen. */
  setTransform(slot: number, position: Vector3, rotation: Quaternion, scale: number): void {
    this.scaleVector.set(scale, scale, scale);
    this.matrix.compose(position, rotation, this.scaleVector);
    this.mesh.setMatrixAt(slot, this.matrix);
  }

  /** Instanz unsichtbar machen (Skalierung null, Platz bleibt belegt). */
  hide(slot: number): void {
    this.matrix.makeScale(0, 0, 0);
    this.mesh.setMatrixAt(slot, this.matrix);
  }

  /**
   * Aussehen nach Inhalt. `shade` streut die Grundhelligkeit, sonst sieht das
   * Feld aus wie aus einer Form gegossen.
   */
  setMineral(slot: number, mineral: MineralId, shade: number): void {
    const info = MINERALS[mineral];
    _rock.setHex(info.rock).multiplyScalar(shade);
    _vein.setHex(info.vein);
    this.rock.setXYZ(slot, _rock.r, _rock.g, _rock.b);
    this.vein.setXYZ(slot, _vein.r, _vein.g, _vein.b);
    this.mod.setXYZW(
      slot,
      VEIN_POWER[mineral],
      info.veinEmissive ? 0.85 : 0,
      ROUGHNESS[mineral] ?? 0.95,
      METAL[mineral] ?? 0,
    );
    this.rock.needsUpdate = true;
    this.vein.needsUpdate = true;
    this.mod.needsUpdate = true;
  }

  flush(): void {
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  dispose(): void {
    this.mesh.geometry.dispose();
    this.mesh.dispose();
  }
}
