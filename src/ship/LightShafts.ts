import {
  AdditiveBlending,
  BackSide,
  Color,
  ConeGeometry,
  Mesh,
  Object3D,
  ShaderMaterial,
} from 'three';

/**
 * Weiche Lichtkegel unter den Deckenleuchten.
 *
 * Kein echtes Volumenrendering, sondern ein Kegelmantel mit einem Shader, der
 * ihn zum Boden hin und zur Silhouette hin ausblendet. Genau die Silhouette
 * ist der Punkt: ohne diese Ausblendung sieht man die Kegelkante als harte
 * Geometrie, und die Illusion von Staub in der Luft ist sofort dahin.
 *
 * Additiv gemischt und ohne Tiefenschreiben, damit sich mehrere Kegel
 * ueberlagern koennen und nichts dahinter verdeckt wird.
 */

/** Kegel je Leuchte: [Position der Lampe, Radius am Boden, Hoehe, Farbe, Staerke]. */
const SHAFTS: Array<[[number, number, number], number, number, number, number]> = [
  // Frachtraum: zwei Kegel von der Decke bis kurz ueber den Boden.
  [[0, 2.28, -2.3], 1.1, 2.2, 0xcfe0ff, 0.05],
  [[0, 2.28, -4.05], 1.0, 2.2, 0xffcf9a, 0.045],
  // Gang: schmal, sonst steht man staendig mittendrin.
  [[0, 2.08, 0.1], 0.45, 2.0, 0xffd2a0, 0.04],
  // Cockpit: hinter dem Sitz, faellt auf die Konsole zu.
  [[0, 2.28, 2.05], 0.9, 2.2, 0xa9c8ff, 0.04],
];

/**
 * Abstand, unter dem ein Kegel ausgeblendet wird. Ohne das legt sich der
 * Kegel, durch den man gerade laeuft, als flaechiger Schleier ueber das ganze
 * Bild — additive Huellen aus der Naehe sind gnadenlos.
 */
const NEAR_FADE = 2.2;

const VERTEX_SHADER = /* glsl */ `
  varying vec3 vNormalView;
  varying vec3 vPositionView;
  varying float vHeight;

  void main() {
    // uv.y laeuft am Kegelmantel von unten (0) nach oben (1).
    vHeight = uv.y;
    vNormalView = normalize(normalMatrix * normal);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vPositionView = viewPosition.xyz;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  uniform float uStrength;
  uniform float uNearFade;

  varying vec3 vNormalView;
  varying vec3 vPositionView;
  varying float vHeight;

  void main() {
    // Nach unten hin duenner werdender Strahl.
    float fade = pow(clamp(vHeight, 0.0, 1.0), 1.6);

    // Silhouette weich machen: flach getroffene Mantelflaechen bleiben hell,
    // die Kante zum Betrachter hin verschwindet.
    vec3 viewDirection = normalize(-vPositionView);
    float facing = abs(dot(normalize(vNormalView), viewDirection));
    float edge = smoothstep(0.0, 0.55, facing);

    // Nah an der Kamera ausblenden (siehe NEAR_FADE).
    float depth = smoothstep(0.0, uNearFade, -vPositionView.z);

    gl_FragColor = vec4(uColor, fade * edge * depth * uStrength);
  }
`;

/**
 * Erzeugt die Kegel als Kinder des uebergebenen Innenraums. Koordinaten sind
 * GLB-Innenraumkoordinaten (Nase +Z, Boden y=0), wie im InteriorLoader.
 */
export function addLightShafts(root: Object3D): void {
  for (const [position, radius, height, color, strength] of SHAFTS) {
    // Offener Kegel, Spitze oben an der Lampe.
    const geometry = new ConeGeometry(radius, height, 24, 1, true);
    const material = new ShaderMaterial({
      uniforms: {
        uColor: { value: new Color(color) },
        uStrength: { value: strength },
        uNearFade: { value: NEAR_FADE },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      // Nur die abgewandte Mantelseite: das halbiert die Ueberlagerung und
      // laesst den Kegel weniger nach fester Geometrie aussehen.
      side: BackSide,
    });

    const shaft = new Mesh(geometry, material);
    shaft.name = 'LightShaft';
    // ConeGeometry hat die Spitze bei +y; die Lampe sitzt oben, also den
    // Mittelpunkt um die halbe Hoehe nach unten setzen.
    shaft.position.set(position[0], position[1] - height / 2, position[2]);
    shaft.castShadow = false;
    shaft.receiveShadow = false;
    root.add(shaft);
  }
}
