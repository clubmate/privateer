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
 * bekommt. Die Geometrie liefert deshalb nur, was zur *Form* gehoert (Mulden
 * und Fleckigkeit), die Instanz liefert die Farben des Inhalts, und das
 * Adernmuster entsteht je Bildpunkt. So teilen sich hunderte Brocken ein
 * Material und einen Zeichenaufruf, und trotzdem ist ein Eisbrocken von einer
 * Kupferader zu unterscheiden.
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
  { scale: 0.33, near: 110, far: 320, strength: 0.3 }, // 3 m: Buckel und Rinnen
  { scale: 1.3, near: 30, far: 95, strength: 0.3 }, // 0,8 m: Koernung
];

/**
 * Helligkeitsflecken aus derselben Rauschquelle, aber ohne Normale: Staub,
 * Schutt und ausgebleichte Stellen. Fels ist fleckig — waere alles nur
 * gebeult, saehe die Oberflaeche aus wie gehaemmertes Blech.
 */
const DUST_SCALE = 0.55;
const DUST_NEAR = 160;
const DUST_FAR = 480;
const DUST_STRENGTH = 0.42;

/**
 * Adern: wieviele Baender ueber den Brocken laufen und wie duenn sie sind.
 * Duenn ist wichtig — breite Baender lesen sich als Anstrich, nicht als Erz,
 * und dann braucht niemand mehr einen Scanner.
 */
const VEIN_FREQ = 4.5;
const VEIN_SHARP = 13.0;

/** Wellenlaenge, mit der die Adern ausgefranst werden (in Metern). */
const VEIN_GRIT = 0.8;

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

/**
 * Wie deutlich die Adern durchschlagen. Bewusst weit unter 1: bei voller
 * Maske ersetzt die Aderfarbe das Gestein, und dann sieht ein Brocken
 * angemalt aus statt mineralisch. Taubes Gestein bleibt langweilig — der
 * Scanner soll etwas zu tun behalten.
 */
const VEIN_POWER: Record<MineralId, number> = {
  rock: 0.22,
  iron: 0.68,
  ice: 0.8,
  copper: 0.64,
  silicon: 0.6,
  platinum: 0.58,
  crystal: 0.72,
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
        attribute vec2 aRockDetail;   // x: Mulde, y: Flecken
        attribute vec3 aRock;
        attribute vec3 aVein;
        attribute vec4 aRockMod;      // Aderstaerke, Leuchten, Rauheit, Metall
        varying vec3 vRockBase;
        varying vec3 vRockVein;
        varying vec4 vRockMod;
        varying vec3 vRockPos;
        varying vec3 vRockDir;
        varying float vRockSeed;`,
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        float cavity = aRockDetail.x;
        // Grossflaeckige Helligkeitsflecken — Fels ist nie einfarbig.
        float mottle = 0.70 + aRockDetail.y * 0.42;
        // In den Mulden liegt Schutt: dunkler, und er deckt die Adern zu.
        vRockBase = aRock * mottle * (1.0 - cavity * 0.38);
        vRockVein = aVein;
        vRockMod = vec4(aRockMod.x * (1.0 - cavity * 0.7), aRockMod.yzw);
        float rockScale = length(modelMatrix[0].xyz);
        #ifdef USE_INSTANCING
          rockScale *= length(instanceMatrix[0].xyz);
        #endif
        // Ortsfest am Brocken und in Metern: die Koernung dreht sich mit und
        // ist auf dem Geroell so gross wie auf dem Planetoiden.
        vRockPos = transformed * rockScale;
        // Richtung im Brockensystem: darauf sitzt das Adernmuster, damit es
        // unabhaengig von der Brockengroesse gleich viele Baender hat.
        vRockDir = normalize(transformed);
        // Jede Instanz bekommt ihr eigenes Muster. Der Versatz kommt aus der
        // Instanzlage — die ist feldlokal und wandert nicht mit dem
        // verschobenen Ursprung, das Muster bleibt also stehen.
        vRockSeed = 0.0;
        #ifdef USE_INSTANCING
          vRockSeed = dot(instanceMatrix[3].xyz, vec3(0.317, 0.113, 0.271));
        #endif`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        varying vec3 vRockBase;
        varying vec3 vRockVein;
        varying vec4 vRockMod;
        varying vec3 vRockPos;
        varying vec3 vRockDir;
        varying float vRockSeed;

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

        /**
         * Adernmaske: duenne Baender dort, wo das Rauschen seine Mitte
         * kreuzt. Im Fragment gerechnet, nicht je Vertex — auf einem Brocken
         * mit 320 Dreiecken wuerden aus Adern sonst Polygonflecken.
         */
        float rockVeinMask(vec3 dir, float seed) {
          vec3 p = dir * ${VEIN_FREQ.toFixed(2)} + seed;
          // Gestaucht in eine Richtung: Adern ziehen sich, statt zu tupfen.
          p.y *= 0.4;
          float n = rockNoise(p) * 0.62 + rockNoise(p * 2.3) * 0.38;
          float band = 1.0 - min(abs(n - 0.5) * ${VEIN_SHARP.toFixed(1)}, 1.0);
          return band * band;
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
        float veinMask = clamp(rockVeinMask(vRockDir, vRockSeed) * vRockMod.x, 0.0, 1.0);
        // Ausgefranst: eine glatte Maske liest sich als Anstrich. Erz sitzt in
        // Spalten und Koernern, also frisst feines Rauschen die Raender an.
        veinMask *= 0.45 + 1.0 * rockNoise(vRockPos * ${VEIN_GRIT.toFixed(2)});
        vec3 rockColor = mix(vRockBase, vRockVein, veinMask);
        diffuseColor.rgb *= rockColor;
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
        roughnessFactor = mix(vRockMod.z, vRockMod.z * 0.6, veinMask);`,
      )
      .replace(
        '#include <metalnessmap_fragment>',
        `#include <metalnessmap_fragment>
        metalnessFactor = vRockMod.w * veinMask;`,
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
        totalEmissiveRadiance += vRockVein * (veinMask * vRockMod.y)
          + rockColor * ${STARLIGHT.toFixed(3)};`,
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
      info.veinEmissive ? 0.5 : 0,
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
