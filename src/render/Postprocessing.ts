import { HalfFloatType, Vector2, WebGLRenderTarget } from 'three';
import type { Camera, Scene, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

/**
 * Bloom-Pipeline. Der Innenraum lebt von Leuchtstreifen, Displays und der
 * Sonne; ohne Bloom brennen die Flaechen einfach nur weiss aus, statt zu
 * strahlen.
 *
 * Reihenfolge: Szene -> Bloom -> {@link OutputPass}. Der OutputPass uebernimmt
 * Tonemapping und Farbraum — Three schaltet beides ab, solange in ein
 * Render-Target gezeichnet wird.
 */

/** Ab dieser Helligkeit blueht eine Flaeche. */
const THRESHOLD = 0.75;
const STRENGTH = 0.42;
const RADIUS = 0.5;

/** Multisampling des Zwischenpuffers — ersetzt das `antialias` des Canvas. */
const SAMPLES = 4;

export interface Postprocessing {
  render(): void;
  setSize(width: number, height: number): void;
  dispose(): void;
}

export function createPostprocessing(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
): Postprocessing {
  const size = renderer.getDrawingBufferSize(new Vector2());
  const target = new WebGLRenderTarget(size.x, size.y, {
    type: HalfFloatType,
    samples: SAMPLES,
  });

  const composer = new EffectComposer(renderer, target);
  composer.setPixelRatio(renderer.getPixelRatio());
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new Vector2(size.x, size.y), STRENGTH, RADIUS, THRESHOLD));
  composer.addPass(new OutputPass());

  return {
    render: () => composer.render(),
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
