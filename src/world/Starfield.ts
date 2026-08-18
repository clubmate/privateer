import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Points,
  ShaderMaterial,
  type Vector3,
} from 'three';

const RADIUS = 2_000_000;

/**
 * Prozeduraler Sternenhimmel. Folgt der Kamera nur in der Translation, damit
 * er unendlich weit entfernt wirkt. `renderOrder = -1000`, weil das Objekt
 * durch das Mitfuehren im Sortier-Abstand 0 hat und sonst zuletzt kaeme.
 */
export class Starfield extends Points<BufferGeometry, ShaderMaterial> {
  constructor(count = 6000, seed = 1337) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    let s = seed >>> 0;
    const rand = (): number => {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };

    for (let i = 0; i < count; i++) {
      // Gleichverteilt auf der Kugel
      const u = rand() * 2 - 1;
      const phi = rand() * Math.PI * 2;
      const r = Math.sqrt(Math.max(0, 1 - u * u));
      positions[i * 3 + 0] = Math.cos(phi) * r * RADIUS;
      positions[i * 3 + 1] = u * RADIUS;
      positions[i * 3 + 2] = Math.sin(phi) * r * RADIUS;

      // Helligkeit: viele schwache, wenige sehr helle Sterne
      const b = Math.pow(rand(), 2.2);
      const brightness = 0.25 + b * 1.35;

      // Farbtemperatur: blaeulich bis orange, meist nahe weiss
      const t = rand() * 2 - 1;
      const warm = Math.max(0, t);
      const cool = Math.max(0, -t);
      colors[i * 3 + 0] = brightness * (1 + warm * 0.25 - cool * 0.22);
      colors[i * 3 + 1] = brightness * (1 - Math.abs(t) * 0.06);
      colors[i * 3 + 2] = brightness * (1 - warm * 0.35 + cool * 0.2);

      sizes[i] = 1.0 + b * 2.6;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('aColor', new BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new BufferAttribute(sizes, 1));

    const material = new ShaderMaterial({
      uniforms: { uPixelRatio: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute vec3 aColor;
        attribute float aSize;
        uniform float uPixelRatio;
        varying vec3 vColor;
        void main() {
          vColor = aColor;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPixelRatio;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          float a = smoothstep(0.5, 0.08, d);
          if (a <= 0.001) discard;
          gl_FragColor = vec4(vColor, a);
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    super(geometry, material);
    this.name = 'Starfield';
    this.frustumCulled = false;
    this.renderOrder = -1000;
    this.matrixAutoUpdate = true;
  }

  setPixelRatio(ratio: number): void {
    this.material.uniforms['uPixelRatio']!.value = ratio;
  }

  /** Nur Translation: der Himmel bleibt relativ zur Kamera fixiert. */
  update(cameraWorldPosition: Vector3): void {
    this.position.copy(cameraWorldPosition);
  }
}
