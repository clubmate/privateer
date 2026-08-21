import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  ShaderMaterial,
  Vector3,
} from 'three';
import { makeRng } from './noise';

/**
 * Feiner Staub zwischen den Brocken.
 *
 * **Wozu:** ein Asteroidenfeld aus lauter Einzelkoerpern gibt dem Auge nichts,
 * woran es Eigenbewegung ablesen kann. Zwischen zwei Brocken im Abstand von
 * dreihundert Metern sieht 400 km/h genauso aus wie Stillstand. Ein paar
 * tausend Staubkoerner im Nahbereich liefern die Parallaxe, die dafuer fehlt —
 * und nebenbei die Tiefenstaffelung, die im Vakuum kein Dunst uebernimmt.
 *
 * **Warum mitgefuehrt statt gestreut:** die Koerner liegen in einem Wuerfel um
 * die Kamera und werden modulo seiner Kantenlaenge umgeschlagen, sobald sie
 * hinten herausfallen. Dadurch stehen sie im Weltraum still — was zaehlt, ist
 * ja gerade, dass sie *nicht* mitfliegen —, und trotzdem ist ihre Zahl
 * konstant, unabhaengig davon, wie weit man geflogen ist. Der Sprung des
 * Floating Origin faellt in dieselbe Rechnung und braucht keine Sonderbehandlung.
 */

export interface AsteroidDustOptions {
  count?: number;
  /** Kantenlaenge des mitgefuehrten Wuerfels in Metern. */
  extent?: number;
  /** Groesse eines Korns in Metern. */
  size?: number;
  seed?: number;
}

/**
 * Zahl und Groesse folgen der Sichtbarkeit, nicht der Sparsamkeit: bei 2600
 * Koernern in einem 320-m-Wuerfel liegt der mittlere Abstand bei 23 m, und im
 * Sichtkegel stehen dann rund hundert Punkte — zu wenige, um Bewegung zu
 * zeigen. Mit dieser Dichte sind es knapp dreihundert, und bei 0,15 m ist ein
 * Korn in dreissig Metern gut drei Bildpunkte gross statt anderthalb.
 */
const DEFAULTS = {
  count: 7000,
  extent: 260,
  size: 0.15,
  seed: 90210,
};

/**
 * Ausblendung: nah, damit einem kein Korn im Auge klebt, und fern, bevor der
 * Umschlagrand sichtbar wird. Anteile der halben Kantenlaenge.
 */
const FADE_NEAR = 0.06;
const FADE_FULL = 0.2;
const FADE_OUT = 0.92;

const VERTEX = /* glsl */ `
  uniform float uSize;
  uniform float uHalf;
  uniform float uScale;
  uniform vec3 uCenter;
  varying float vFade;

  void main() {
    // Der Umschlag steht hier und nicht auf der CPU. Dieselbe Formel — GLSL
    // rechnet mod() ebenfalls als x - y*floor(x/y) —, aber das Lagefeld bleibt
    // dadurch unveraendert: statt 84 Kilobyte je Bild geht ein einziger
    // Vektor zur GPU. Die Genauigkeit aendert sich nicht, das Attribut war
    // ohnehin schon float32.
    float span = uHalf * 2.0;
    vec3 world = uCenter - uHalf + mod(position - uCenter + uHalf, span);
    vec4 view = viewMatrix * vec4(world, 1.0);
    float dist = length(view.xyz);
    // Innen aufblenden, aussen ausblenden: der Umschlagrand liegt im
    // ausgeblendeten Bereich und ist damit unsichtbar.
    vFade = smoothstep(uHalf * ${FADE_NEAR}, uHalf * ${FADE_FULL}, dist)
          * (1.0 - smoothstep(uHalf * ${FADE_FULL}, uHalf * ${FADE_OUT}, dist));
    gl_Position = projectionMatrix * view;
    // Groessenabnahme mit der Entfernung, aber nie unter einen Bildpunkt:
    // Koerner unterhalb der Pixelgroesse flimmern nur noch.
    gl_PointSize = max(uScale * uSize / max(dist, 0.001), 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;

  void main() {
    // Rundes Korn mit weichem Rand — ein Quadrat verraet sofort, dass hier
    // Punkte gezeichnet werden.
    vec2 d = gl_PointCoord - vec2(0.5);
    float r = dot(d, d);
    if (r > 0.25) discard;
    float soft = 1.0 - smoothstep(0.06, 0.25, r);
    gl_FragColor = vec4(uColor, uOpacity * vFade * soft);
    #include <colorspace_fragment>
  }
`;

export class AsteroidDust extends Points {
  private readonly half: number;
  private readonly array: Float32Array;

  constructor(options: AsteroidDustOptions = {}) {
    const o = { ...DEFAULTS, ...options };
    const rng = makeRng(o.seed);
    const array = new Float32Array(o.count * 3);
    for (let i = 0; i < array.length; i++) array[i] = (rng() - 0.5) * o.extent;

    const geometry = new BufferGeometry();
    // Statisch: die Koerner stehen fuer immer da, wo sie erzeugt wurden. Was
    // sich bewegt, ist der Wuerfel um sie herum, und der ist ein Uniform.
    geometry.setAttribute('position', new BufferAttribute(array, 3));
    // Der Wuerfel wandert je Bild mit der Kamera; eine Sichtkegelpruefung
    // gegen eine veraltete Huellkugel wuerde ihn gelegentlich wegwerfen.
    geometry.boundingSphere = null;

    super(
      geometry,
      new ShaderMaterial({
        uniforms: {
          uSize: { value: o.size },
          uHalf: { value: o.extent * 0.5 },
          uCenter: { value: new Vector3() },
          uScale: { value: 300 },
          uColor: { value: new Color(0.62, 0.6, 0.56) },
          uOpacity: { value: 0.5 },
        },
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    );

    this.name = 'AsteroidDust';
    this.frustumCulled = false;
    this.half = o.extent * 0.5;
    this.array = array;
  }

  /**
   * Bildaufloesung anmelden. Die Punktgroesse ist in Metern gedacht; ohne die
   * Bildhoehe waere sie auf einem 4K-Schirm ein Viertel so gross wie auf einem
   * kleinen.
   */
  setViewportHeight(pixels: number, fovDegrees: number): void {
    const scale = pixels / (2 * Math.tan((fovDegrees * Math.PI) / 360));
    (this.material as ShaderMaterial).uniforms['uScale']!.value = scale;
  }

  /**
   * Den Wuerfel der Kamera nachfuehren. Koerner, die hinten herausfallen,
   * kommen vorne wieder herein — der Umschlag findet im ausgeblendeten
   * Bereich statt und ist deshalb nicht zu sehen.
   *
   * Die Arbeit selbst macht der Vertex-Shader; hier wandert nur der Mittelpunkt
   * mit. Vorher lief je Bild eine Schleife ueber 21.000 Zahlen, von denen sich
   * bei 100 m/s ganze 45 aenderten — und trotzdem gingen alle 84 Kilobyte
   * erneut zur GPU.
   */
  update(cameraWorldPosition: Vector3): void {
    (this.material as ShaderMaterial).uniforms['uCenter']!.value.copy(cameraWorldPosition);
  }

  /**
   * Wo der Wuerfel gerade steht. Nur fuer Tests — die Koerner selbst stehen
   * unveraendert im Attribut, ihre Lage ergibt sich erst im Shader.
   */
  wrapped(index: number, out: Vector3): Vector3 {
    const center = (this.material as ShaderMaterial).uniforms['uCenter']!.value as Vector3;
    const half = this.half;
    const span = half * 2;
    const a = this.array;
    return out.set(
      wrap(a[index * 3]!, center.x, half, span),
      wrap(a[index * 3 + 1]!, center.y, half, span),
      wrap(a[index * 3 + 2]!, center.z, half, span),
    );
  }

  dispose(): void {
    this.geometry.dispose();
    (this.material as ShaderMaterial).dispose();
  }
}

/**
 * Eine Achse in das Fenster `[center - half, center + half)` zurueckholen.
 * Als Modulo statt als Schleife, damit auch der Sprung des Floating Origin
 * (zehn Kilometer auf einmal) in einem Schritt erledigt ist.
 */
function wrap(value: number, center: number, half: number, span: number): number {
  const offset = value - center + half;
  return center - half + offset - Math.floor(offset / span) * span;
}
