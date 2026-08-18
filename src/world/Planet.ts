import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  ShaderMaterial,
  SRGBColorSpace,
  SphereGeometry,
  Uniform,
  Vector3,
} from 'three';
import { fbm3 } from './noise';

const TEX_W = 1024;
const TEX_H = 512;

interface PlanetOptions {
  radius: number;
  position: Vector3;
  seed: number;
  sunDirection: Vector3;
}

function mixColor(out: Color, a: Color, b: Color, t: number): Color {
  return out.copy(a).lerp(b, Math.min(1, Math.max(0, t)));
}

/** Erzeugt eine equirektangulare Oberflaechentextur aus 3D-Rauschen (nahtlos). */
function surfaceTexture(seed: number): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext('2d')!;
  const image = ctx.createImageData(TEX_W, TEX_H);
  const data = image.data;

  const deepSea = new Color(0x05204a);
  const sea = new Color(0x0d4a7a);
  const shallow = new Color(0x1d7fa3);
  const sand = new Color(0xb8a271);
  const grass = new Color(0x2f6b34);
  const dryland = new Color(0x6d5a32);
  const rock = new Color(0x5c5750);
  const snow = new Color(0xe8eef2);
  const tmp = new Color();
  const out = new Color();

  const off = seed * 13.37;

  for (let y = 0; y < TEX_H; y++) {
    const lat = (0.5 - (y + 0.5) / TEX_H) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    for (let x = 0; x < TEX_W; x++) {
      const lon = ((x + 0.5) / TEX_W) * Math.PI * 2;
      const dx = cosLat * Math.cos(lon);
      const dy = sinLat;
      const dz = cosLat * Math.sin(lon);

      const h = fbm3(dx * 2.1 + off, dy * 2.1 + off, dz * 2.1 + off, 6, 0.52);
      const moist = fbm3(dx * 3.4 - off, dy * 3.4 + off, dz * 3.4 - off, 3, 0.5);

      if (h < 0.47) {
        mixColor(out, deepSea, sea, (h - 0.36) / 0.11);
      } else if (h < 0.5) {
        mixColor(out, sea, shallow, (h - 0.47) / 0.03);
      } else if (h < 0.52) {
        mixColor(out, shallow, sand, (h - 0.5) / 0.02);
      } else if (h < 0.62) {
        mixColor(tmp, dryland, grass, moist * 1.4 - 0.2);
        mixColor(out, sand, tmp, (h - 0.52) / 0.06);
      } else if (h < 0.72) {
        mixColor(tmp, dryland, grass, moist * 1.4 - 0.2);
        mixColor(out, tmp, rock, (h - 0.62) / 0.1);
      } else {
        mixColor(out, rock, snow, (h - 0.72) / 0.08);
      }

      // Polkappen mit unruhiger Kante
      const polar = (Math.abs(lat) - 1.02) / 0.32 + (moist - 0.5) * 0.55;
      if (polar > 0) {
        tmp.copy(out);
        mixColor(out, tmp, snow, polar);
      }

      const i = (y * TEX_W + x) * 4;
      data[i] = Math.round(out.r * 255);
      data[i + 1] = Math.round(out.g * 255);
      data[i + 2] = Math.round(out.b * 255);
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Wolkenschicht als Alpha-Textur. */
function cloudTexture(seed: number): CanvasTexture {
  const w = 768;
  const h = 384;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const image = ctx.createImageData(w, h);
  const data = image.data;
  const off = seed * 7.77 + 51.3;

  for (let y = 0; y < h; y++) {
    const lat = (0.5 - (y + 0.5) / h) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    for (let x = 0; x < w; x++) {
      const lon = ((x + 0.5) / w) * Math.PI * 2;
      const dx = cosLat * Math.cos(lon);
      const dz = cosLat * Math.sin(lon);
      // In Breitengradbaendern gestreckt -> Wolkenbaender
      const c = fbm3(dx * 3.0 + off, sinLat * 7.0 + off, dz * 3.0 + off, 5, 0.55);
      const a = Math.max(0, Math.min(1, (c - 0.5) / 0.22)) ** 1.4;
      const i = (y * w + x) * 4;
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = Math.round(a * 235);
    }
  }

  ctx.putImageData(image, 0, 0);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Planet als Landmarke: Oberflaeche + Wolken + Atmosphaeren-Rim.
 * Fuer Floating Origin einfach `planet.position` mitverschieben.
 */
export class Planet extends Group {
  readonly radius: number;
  private readonly clouds: Mesh;

  constructor(opts: PlanetOptions) {
    super();
    this.name = 'Planet';
    this.radius = opts.radius;
    this.position.copy(opts.position);

    const surface = new Mesh(
      new SphereGeometry(opts.radius, 128, 64),
      new MeshStandardMaterial({
        map: surfaceTexture(opts.seed),
        roughness: 0.92,
        metalness: 0.0,
      }),
    );
    surface.name = 'PlanetSurface';
    this.add(surface);

    this.clouds = new Mesh(
      new SphereGeometry(opts.radius * 1.012, 96, 48),
      new MeshStandardMaterial({
        map: cloudTexture(opts.seed),
        transparent: true,
        depthWrite: false,
        roughness: 1.0,
        metalness: 0.0,
      }),
    );
    this.clouds.name = 'PlanetClouds';
    this.add(this.clouds);

    // Atmosphaeren-Rim: Fresnel-Schale, additiv, von der Sonnenseite betont.
    const atmosphere = new Mesh(
      new SphereGeometry(opts.radius * 1.045, 96, 48),
      new ShaderMaterial({
        uniforms: {
          uColor: new Uniform(new Color(0x6fb4ff)),
          uSunDir: new Uniform(opts.sunDirection.clone().normalize()),
        },
        vertexShader: /* glsl */ `
          #include <common>
          #include <logdepthbuf_pars_vertex>
          varying vec3 vNormalW;
          varying vec3 vPosW;
          void main() {
            vNormalW = normalize(mat3(modelMatrix) * normal);
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vPosW = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
            #include <logdepthbuf_vertex>
          }
        `,
        fragmentShader: /* glsl */ `
          #include <common>
          #include <logdepthbuf_pars_fragment>
          uniform vec3 uColor;
          uniform vec3 uSunDir;
          varying vec3 vNormalW;
          varying vec3 vPosW;
          void main() {
            #include <logdepthbuf_fragment>
            vec3 v = normalize(cameraPosition - vPosW);
            vec3 n = normalize(vNormalW);
            float rim = pow(clamp(1.0 - abs(dot(v, n)), 0.0, 1.0), 3.0);
            float lit = clamp(dot(n, uSunDir) * 0.75 + 0.35, 0.0, 1.0);
            float a = rim * lit;
            gl_FragColor = vec4(uColor * a * 1.6, a);
          }
        `,
        transparent: true,
        blending: AdditiveBlending,
        side: BackSide,
        depthWrite: false,
      }),
    );
    atmosphere.name = 'PlanetAtmosphere';
    this.add(atmosphere);
  }

  update(dt: number): void {
    this.rotation.y += dt * 0.0025;
    this.clouds.rotation.y += dt * 0.0011;
  }
}
