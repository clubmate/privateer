import {
  Color,
  Euler,
  IcosahedronGeometry,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from 'three';
import { makeRng, noise3 } from './noise';

export interface AsteroidOptions {
  count: number;
  /** Innerer und aeusserer Radius der Verteilung in Metern. */
  innerRadius: number;
  outerRadius: number;
  /** Radius der kleinsten/groessten Brocken (=> 5–100 m Durchmesser). */
  minRadius: number;
  maxRadius: number;
  seed: number;
}

const DEFAULTS: AsteroidOptions = {
  count: 420,
  innerRadius: 220,
  outerRadius: 4500,
  minRadius: 2.5,
  maxRadius: 50,
  seed: 4711,
};

/**
 * Unregelmaessig deformierter Brocken. Die Deformation haengt nur von der
 * Vertex-Richtung ab, damit die duplizierten Vertices der nicht-indizierten
 * Icosaeder-Geometrie nicht aufreissen.
 */
function chunkGeometry(seed: number): IcosahedronGeometry {
  const geo = new IcosahedronGeometry(1, 3);
  const pos = geo.attributes['position']!;
  const v = new Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    const n1 = noise3(v.x * 1.7 + seed, v.y * 1.7 + seed, v.z * 1.7 + seed);
    const n2 = noise3(v.x * 4.3 - seed, v.y * 4.3 + seed, v.z * 4.3 - seed);
    const n3 = noise3(v.x * 9.1 + seed, v.y * 9.1 - seed, v.z * 9.1 + seed);
    const r = 0.72 + n1 * 0.46 + n2 * 0.16 + n3 * 0.07;
    pos.setXYZ(i, v.x * r, v.y * r, v.z * r);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  return geo;
}

/**
 * Asteroidenfeld als InstancedMesh rund um die Startposition.
 * Fuer Floating Origin einfach `field.position` mitverschieben.
 */
export class Asteroids extends InstancedMesh<IcosahedronGeometry, MeshStandardMaterial> {
  private readonly positions: Vector3[] = [];
  private readonly rotations: Quaternion[] = [];
  private readonly axes: Vector3[] = [];
  private readonly speeds: number[] = [];
  private readonly scales: number[] = [];

  private readonly tmpMatrix = new Matrix4();
  private readonly tmpQuat = new Quaternion();
  private readonly tmpScale = new Vector3();

  constructor(options: Partial<AsteroidOptions> = {}) {
    const o: AsteroidOptions = { ...DEFAULTS, ...options };
    super(
      chunkGeometry(o.seed),
      new MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, metalness: 0.08 }),
      o.count,
    );
    this.name = 'AsteroidField';
    // Das Feld umgibt die Startposition — Culling der Gesamtmenge bringt nichts.
    this.frustumCulled = false;

    const rng = makeRng(o.seed);
    const color = new Color();
    const euler = new Euler();

    for (let i = 0; i < o.count; i++) {
      // Abgeflachte Kugelschale: wirkt wie ein Feld, nicht wie eine Wolke.
      const u = rng() * 2 - 1;
      const phi = rng() * Math.PI * 2;
      const ring = Math.sqrt(Math.max(0, 1 - u * u));
      const dist = o.innerRadius + (o.outerRadius - o.innerRadius) * Math.cbrt(rng());
      this.positions.push(
        new Vector3(Math.cos(phi) * ring, u * 0.45, Math.sin(phi) * ring).multiplyScalar(dist),
      );

      // Kleine Brocken sind deutlich haeufiger als grosse.
      const t = Math.pow(rng(), 2.6);
      this.scales.push(o.minRadius + (o.maxRadius - o.minRadius) * t);

      euler.set(rng() * Math.PI * 2, rng() * Math.PI * 2, rng() * Math.PI * 2);
      this.rotations.push(new Quaternion().setFromEuler(euler));
      this.axes.push(new Vector3(rng() * 2 - 1, rng() * 2 - 1, rng() * 2 - 1).normalize());
      this.speeds.push((rng() * 2 - 1) * 0.25);

      const shade = 0.3 + rng() * 0.5;
      const warm = rng() * 0.12;
      color.setRGB(shade * (1 + warm), shade * (1 + warm * 0.5), shade * (1 - warm * 0.35));
      this.setColorAt(i, color);
    }

    this.writeMatrices();
    if (this.instanceColor) this.instanceColor.needsUpdate = true;
  }

  /** Langsame Eigenrotation. */
  update(dt: number): void {
    for (let i = 0; i < this.count; i++) {
      this.tmpQuat.setFromAxisAngle(this.axes[i]!, this.speeds[i]! * dt);
      this.rotations[i]!.premultiply(this.tmpQuat).normalize();
    }
    this.writeMatrices();
  }

  private writeMatrices(): void {
    for (let i = 0; i < this.count; i++) {
      const s = this.scales[i]!;
      this.tmpScale.set(s, s, s);
      this.tmpMatrix.compose(this.positions[i]!, this.rotations[i]!, this.tmpScale);
      this.setMatrixAt(i, this.tmpMatrix);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}
