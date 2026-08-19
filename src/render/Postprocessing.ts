import { HalfFloatType, Vector2, WebGLRenderTarget } from 'three';
import type { Camera, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

/**
 * Renderpfad in zwei Tiefenbereichen plus Bloom und Umgebungsverdeckung.
 *
 * **Warum mehrere Durchgaenge:** Cockpit bei 0,1 m und Sterne bei 2000 km
 * passen nicht in einen linearen Tiefenpuffer. Bisher loeste das ein
 * logarithmischer Tiefenpuffer — der schreibt aber `gl_FragDepth` pro
 * Fragment und macht damit jede Tiefenrekonstruktion im Schirmraum unmoeglich
 * (GTAO). Stattdessen zeichnet jeder Entfernungsbereich mit eigenem Frustum,
 * von hinten nach vorn, und loescht dazwischen nur die Tiefe:
 *
 * | Layer | Inhalt                        | Frustum        |
 * |-------|-------------------------------|----------------|
 * | 2     | Sterne, Sonne, Planet         | 5 km .. 5000 km|
 * | 1     | Asteroiden, Geschosse, Effekte| 1 m .. 30 km   |
 * | 0     | Innenraum des Schiffs         | 5 cm .. 3 km   |
 *
 * Zwei Bereiche reichten nicht: mit `near = 1` fuer den Planeten bei 850 km
 * liegt der Tiefenfehler bei ueber 40 km — die Wolkenschale 2,6 km ueber der
 * Oberflaeche verschwand fleckenweise im Boden.
 *
 * Reihenfolge: Tiefe -> Welt -> Innenraum -> GTAO -> Bloom ->
 * {@link OutputPass}. Der OutputPass uebernimmt Tonemapping und Farbraum —
 * Three schaltet beides ab, solange in ein Render-Target gezeichnet wird.
 */

/** Layer fuer Asteroiden, Geschosse und Effekte. */
export const WORLD_LAYER = 1;

/** Layer fuer Sterne, Sonne und Planet. */
export const DEEP_LAYER = 2;

/** Ab dieser Helligkeit blueht eine Flaeche. */
const THRESHOLD = 0.75;
const STRENGTH = 0.42;
const RADIUS = 0.5;

/** Multisampling des Zwischenpuffers — ersetzt das `antialias` des Canvas. */
const SAMPLES = 4;

/**
 * Umgebungsverdeckung. Der Radius ist in Metern gedacht: 0,45 m fasst
 * Kantenuebergaenge und Ecken, ohne ganze Waende abzudunkeln.
 */
const AO_PARAMETERS = {
  radius: 0.45,
  distanceExponent: 1.6,
  thickness: 0.6,
  scale: 1.0,
  samples: 16,
  distanceFallOff: 1.0,
  screenSpaceRadius: false,
};

/** Staerke, mit der die Verdeckung ins Bild gemischt wird. */
const AO_BLEND = 0.85;

export interface Postprocessing {
  render(): void;
  setSize(width: number, height: number): void;
  /**
   * Umgebungsverdeckung an- oder abschalten. Sie ist der teuerste Teil der
   * Kette (voller Aufloesung, 16 Abtastungen je Pixel); auf schwacher Hardware
   * ist das der erste Schalter, den man umlegt.
   */
  setAmbientOcclusion(enabled: boolean): void;
  dispose(): void;
}

export function createPostprocessing(
  renderer: WebGLRenderer,
  scene: Scene,
  nearCamera: PerspectiveCamera,
  worldCamera: Camera,
  deepCamera: Camera,
): Postprocessing {
  const size = renderer.getDrawingBufferSize(new Vector2());
  const target = new WebGLRenderTarget(size.x, size.y, {
    type: HalfFloatType,
    samples: SAMPLES,
  });

  const composer = new EffectComposer(renderer, target);
  composer.setPixelRatio(renderer.getPixelRatio());

  composer.addPass(new RenderPass(scene, deepCamera));

  // Folgedurchgaenge: Farbe stehen lassen, nur die Tiefe zuruecksetzen.
  for (const camera of [worldCamera, nearCamera]) {
    const pass = new RenderPass(scene, camera);
    pass.clear = false;
    pass.clearDepth = true;
    composer.addPass(pass);
  }

  // GTAO rechnet mit der Nahkamera und sieht damit nur den Innenraum; fuer den
  // Hintergrund liefert seine Tiefe "unendlich", also keine Verdeckung.
  const gtao = new GTAOPass(scene, nearCamera, size.x, size.y);
  gtao.output = GTAOPass.OUTPUT.Default;
  gtao.blendIntensity = AO_BLEND;
  gtao.updateGtaoMaterial(AO_PARAMETERS);
  composer.addPass(gtao);

  composer.addPass(new UnrealBloomPass(new Vector2(size.x, size.y), STRENGTH, RADIUS, THRESHOLD));
  composer.addPass(new OutputPass());

  return {
    render: () => composer.render(),
    setAmbientOcclusion: (enabled: boolean) => {
      gtao.enabled = enabled;
    },
    setSize: (width, height) => {
      composer.setPixelRatio(renderer.getPixelRatio());
      composer.setSize(width, height);
    },
    dispose: () => {
      composer.dispose();
      target.dispose();
    },
  };
}
