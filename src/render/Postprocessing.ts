import { HalfFloatType, Vector2, WebGLRenderTarget } from 'three';
import type { Camera, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { Pass } from 'three/addons/postprocessing/Pass.js';
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
 * Reihenfolge: Tiefe -> Schattenfreigabe -> Welt -> GTAO(Welt) -> Innenraum ->
 * GTAO(Nah) -> Bloom ->
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
 * Umgebungsverdeckung im Innenraum. Der Radius ist in Metern gedacht: 0,45 m
 * fasst Kantenuebergaenge und Ecken, ohne ganze Waende abzudunkeln.
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

/**
 * Umgebungsverdeckung draussen.
 *
 * **Warum hier der Radius im Schirmraum liegt und drinnen nicht:** ein
 * Innenraum hat eine Groesse. Draussen reicht die Spanne vom Zwei-Meter-Kiesel
 * bis zum 420-m-Planetoiden — Faktor zweihundert. Jeder feste Radius ist fuer
 * das eine Ende zu gross und fuer das andere zu klein: mit einem halben Meter
 * (dem Innenraumwert) findet der Durchgang an einer zwanzig Meter weiten
 * Kraterwand ueberhaupt nichts, mit zwanzig Metern verschluckt er einen
 * Kiesel ganz. Im Schirmraum haengt der Radius dagegen daran, wie gross der
 * Gegenstand *im Bild* ist, und das ist genau das richtige Mass.
 *
 * `radius` ist damit ein Vielfaches dessen, was hundert Bildpunkte an der
 * jeweiligen Tiefe in Metern bedeuten.
 *
 * **Und trotzdem standardmaessig aus.** Nachgemessen: der Durchgang kostet
 * zusammen mit dem Innenraum-AO gut zwei Millisekunden je Bild und liefert
 * auf einem Grossbrocken *nichts* — der AO-Puffer ist ueber die ganze
 * Oberflaeche weiss. Das ist kein Fehler in der Einstellung, sondern die
 * richtige Antwort: die Oberflaeche eines Planetoiden ist im Tiefenpuffer
 * konvex, ihre Struktur steckt in der Normale (siehe `RELIEF` in
 * AsteroidBatch) und nicht in der Geometrie. Verdeckung findet dort statt, wo
 * Gestein sich selbst umschliesst — in Kratermulden —, und die traegt die
 * Muldentiefe analytisch und umsonst (siehe `aomap_fragment` ebenda).
 *
 * Der Durchgang bleibt eingebaut und ueber
 * {@link Postprocessing.setWorldAmbientOcclusion} zuschaltbar: bei
 * verwachsenen Doppelbrocken und dicht beieinander liegendem Geroell hat er
 * etwas zu tun. Nur eben nicht oft genug, um ihn allen aufzudraengen.
 *
 * Weniger Abtastungen als drinnen — der Durchgang laeuft zusaetzlich zum
 * Innenraumdurchgang, und im Weltraum fehlt die dichte Kantenlage, fuer die
 * sich sechzehn lohnen.
 */
const WORLD_AO_PARAMETERS = {
  radius: 0.5,
  distanceExponent: 1.4,
  thickness: 12.0,
  scale: 1.0,
  samples: 8,
  distanceFallOff: 1.0,
  screenSpaceRadius: true,
};

/** Staerke der Verdeckung draussen. Zurueckhaltender als drinnen. */
const WORLD_AO_BLEND = 0.6;

/**
 * GTAO ohne die Vollbild-Kopie.
 *
 * **Was der Standarddurchgang tut:** er kopiert erst das ganze Bild vom Lese-
 * in den Schreibpuffer und legt die Verdeckung dann obendrauf. Die Kopie ist
 * aber ueberfluessig, denn der Mischer ist eine reine Multiplikation
 * (`blendSrc = DstColor`, `blendDst = Zero`) — er *braucht* das Bild, auf das
 * er trifft, und veraendert nichts anderes daran. Multipliziert man direkt auf
 * den Lesepuffer, kommt Bit fuer Bit dasselbe heraus.
 *
 * Gespart wird damit je Bild: ein Vollbild-Durchgang auf ein multisampeltes
 * Ziel, der zugehoerige Aufloesungs-Blit und der Puffertausch. Der Tausch ist
 * der eigentliche Gewinn — er war der einzige in der ganzen Kette, und weil
 * die Puffer dadurch von Bild zu Bild pendelten, musste *beiden* der volle
 * Multisample- und Tiefenspeicher spendiert werden.
 *
 * `Off` laesst die Elternklasse alles rechnen (Normalen, Verdeckung,
 * Entrauschung) und nur die Ausgabe weg — genau die uebernehmen wir hier.
 */
class DirectGtaoPass extends GTAOPass {
  constructor(scene: Scene, camera: Camera, width: number, height: number) {
    super(scene, camera, width, height);
    // Wir schreiben in den Lesepuffer; der Composer darf nicht tauschen.
    this.needsSwap = false;
  }

  override render(
    renderer: WebGLRenderer,
    writeBuffer: WebGLRenderTarget,
    readBuffer: WebGLRenderTarget,
    deltaTime = 0,
    maskActive = false,
  ): void {
    const self = this as unknown as {
      output: number;
      blendIntensity: number;
      blendMaterial: { uniforms: Record<string, { value: unknown }> };
      pdRenderTarget: WebGLRenderTarget;
      _renderPass(r: WebGLRenderer, m: unknown, t: WebGLRenderTarget | null): void;
    };

    // Zum letzten Durchgang der Kette gehoert der Bildschirm, und auf den kann
    // man nicht multiplizieren — dann eben auf dem regulaeren Weg. Tritt in
    // dieser Kette nicht auf (Bloom und OutputPass folgen noch), aber wer den
    // Durchgang umhaengt, soll kein schwarzes Bild bekommen.
    if (this.renderToScreen || typeof self._renderPass !== 'function' || !self.blendMaterial) {
      self.output = GTAOPass.OUTPUT.Default;
      super.render(renderer, writeBuffer, readBuffer, deltaTime, maskActive);
      return;
    }

    self.output = GTAOPass.OUTPUT.Off;
    super.render(renderer, writeBuffer, readBuffer, deltaTime, maskActive);
    self.blendMaterial.uniforms['intensity']!.value = self.blendIntensity;
    self.blendMaterial.uniforms['tDiffuse']!.value = self.pdRenderTarget.texture;
    self._renderPass(renderer, self.blendMaterial, readBuffer);
  }
}

/**
 * Ein Durchgang, der nichts zeichnet: er gibt nur die Schattenkarte frei.
 *
 * **Warum das noetig ist:** Three zeichnet Schattenkarten am Anfang von
 * `renderer.render()`, und es nimmt dabei nur Objekte mit, die die Layer der
 * *gerade gezeichneten* Kamera teilen. Der erste Durchgang eines Bildes
 * gehoert aber der Tiefenkamera — mit ihr im Ruecken waeren die Asteroiden
 * (Weltschicht) nicht dabei, und die Karte des Sonnenlichts bliebe leer,
 * waehrend das Freigabe-Flag trotzdem verbraucht ist. Also wird genau hier
 * freigegeben: unmittelbar vor dem Weltdurchgang.
 */
class ShadowReleasePass extends Pass {
  private armed = false;

  constructor() {
    super();
    this.needsSwap = false;
  }

  /** Fuer das naechste Bild eine neue Schattenkarte anfordern. */
  arm(): void {
    this.armed = true;
  }

  override render(renderer: WebGLRenderer): void {
    if (!this.armed) return;
    this.armed = false;
    renderer.shadowMap.needsUpdate = true;
  }
}

export interface Postprocessing {
  render(): void;
  setSize(width: number, height: number): void;
  /**
   * Umgebungsverdeckung an- oder abschalten. Sie ist der teuerste Teil der
   * Kette (voller Aufloesung, 16 Abtastungen je Pixel); auf schwacher Hardware
   * ist das der erste Schalter, den man umlegt.
   */
  setAmbientOcclusion(enabled: boolean): void;
  /**
   * Umgebungsverdeckung draussen. Standardmaessig **aus**, und warum, steht
   * bei {@link WORLD_AO_PARAMETERS}.
   */
  setWorldAmbientOcclusion(enabled: boolean): void;
  /**
   * Die Schattenkarten im naechsten Bild neu zeichnen lassen. Nur so herum:
   * `renderer.shadowMap.needsUpdate` direkt zu setzen faellt in den falschen
   * Durchgang, siehe {@link ShadowReleasePass}.
   */
  requestShadowUpdate(): void;
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
  // Mitgefuehrt, weil der Welt-GTAO erst spaeter entstehen kann und dann seine
  // Groesse braucht.
  const currentSize = size.clone();

  composer.addPass(new RenderPass(scene, deepCamera));

  // Schattenkarten freigeben — direkt vor dem Weltdurchgang, damit sie mit
  // dessen Kamera und damit mit den Asteroiden gezeichnet werden.
  const shadowRelease = new ShadowReleasePass();
  composer.addPass(shadowRelease);

  // Folgedurchgang: Farbe stehen lassen, nur die Tiefe zuruecksetzen.
  const worldPass = new RenderPass(scene, worldCamera);
  worldPass.clear = false;
  worldPass.clearDepth = true;
  composer.addPass(worldPass);

  // Platz fuer die Verdeckung draussen — *vor* dem Innenraum. Die Reihenfolge
  // ist keine Geschmacksfrage: dieser Durchgang kennt nur die Tiefe der
  // Weltkamera. Liefe er nach dem Innenraum, verdunkelte er Kanzelstreben
  // anhand der Kraterwand, die dahinter liegt.
  //
  // Erzeugt wird er erst, wenn ihn jemand einschaltet: ein GTAOPass legt im
  // Konstruktor drei Render-Targets in voller Bildgroesse an und zieht sie bei
  // jedem Resize mit. Fuer einen Durchgang, der standardmaessig aus ist und
  // nachweislich nichts findet (siehe {@link WORLD_AO_PARAMETERS}), sind das
  // gut hundert Megabyte fuer nichts.
  const worldGtaoIndex = composer.passes.length;
  let worldGtao: DirectGtaoPass | null = null;

  const nearPass = new RenderPass(scene, nearCamera);
  nearPass.clear = false;
  nearPass.clearDepth = true;
  composer.addPass(nearPass);

  // GTAO rechnet mit der Nahkamera und sieht damit nur den Innenraum; fuer den
  // Hintergrund liefert seine Tiefe "unendlich", also keine Verdeckung.
  const gtao = new DirectGtaoPass(scene, nearCamera, size.x, size.y);
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
    setWorldAmbientOcclusion: (enabled: boolean) => {
      if (!worldGtao) {
        if (!enabled) return;
        worldGtao = new DirectGtaoPass(scene, worldCamera, size.x, size.y);
        worldGtao.blendIntensity = WORLD_AO_BLEND;
        worldGtao.updateGtaoMaterial(WORLD_AO_PARAMETERS);
        worldGtao.setSize(currentSize.x, currentSize.y);
        composer.insertPass(worldGtao, worldGtaoIndex);
      }
      worldGtao.enabled = enabled;
    },
    requestShadowUpdate: () => shadowRelease.arm(),
    setSize: (width, height) => {
      composer.setPixelRatio(renderer.getPixelRatio());
      composer.setSize(width, height);
      currentSize.set(width, height).multiplyScalar(renderer.getPixelRatio());
    },
    dispose: () => {
      composer.dispose();
      target.dispose();
    },
  };
}
