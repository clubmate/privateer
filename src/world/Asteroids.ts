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
import {
  MINERALS,
  MINERAL_IDS,
  SIZE_CLASSES,
  SIZE_IDS,
  yieldTons,
  type AsteroidField,
  type AsteroidSize,
  type MineralId,
  type SurfaceSample,
} from './AsteroidTypes';

export interface AsteroidOptions {
  count: number;
  /** Innerer und aeusserer Radius der Verteilung in Metern. */
  innerRadius: number;
  outerRadius: number;
  /** Radius der kleinsten/groessten Brocken (=> 5–100 m Durchmesser). */
  minRadius: number;
  maxRadius: number;
  seed: number;
  /** Sekunden, bis ein zerstoerter Brocken andernorts nachwaechst. */
  respawnDelay: number;
  /** Hoechste Eigengeschwindigkeit eines Brockens in m/s. */
  maxDrift: number;
}

/** Treffer eines Segmenttests gegen das Feld. */
export interface AsteroidHit {
  /** Instanzindex des getroffenen Brockens. */
  index: number;
  /** Trefferpunkt in Weltkoordinaten. */
  point: Vector3;
  /** Strecke vom Segmentanfang bis zum Treffer, in Metern. */
  distance: number;
  /** Radius des Brockens in Metern (fuer Effekte). */
  radius: number;
}

const DEFAULTS: AsteroidOptions = {
  count: 420,
  innerRadius: 220,
  outerRadius: 4500,
  minRadius: 2.5,
  maxRadius: 50,
  seed: 4711,
  respawnDelay: 25,
  maxDrift: 6,
};

/**
 * Ab diesem Vielfachen des Aussenradius kehrt ein driftender Brocken um.
 * Ohne diese Grenze wandert das Feld auf Dauer auseinander.
 */
const DRIFT_BOUNDS = 1.15;

/**
 * Bounding-Radius der Brockengeometrie relativ zur Instanzskalierung. Die
 * Deformation in {@link chunkGeometry} laesst den Einheitsbrocken zwischen
 * 0,7 und ~1,4 schwanken; fuer den Trefferradius zaehlt der grobe Umriss.
 */
const HIT_RADIUS_FACTOR = 1.15;

/** Trefferpunkte, ab denen ein Brocken zerbricht: 1 + Radius / diesem Wert. */
const HITPOINTS_PER_METER = 14;

/** Trefferpunkte nach Groesse: kleine Brocken platzen sofort, grosse halten. */
function hitpointsFor(radius: number): number {
  return 1 + Math.floor(radius / HITPOINTS_PER_METER);
}

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
/** Groessenklasse zu einem Umriss-Radius. */
function sizeClassFor(radius: number): AsteroidSize {
  for (const id of SIZE_IDS) {
    if (radius <= SIZE_CLASSES[id].maxRadius) return id;
  }
  return 'huge';
}

/** Mineral nach Haeufigkeit ziehen. */
function pickMineral(roll: number): MineralId {
  let total = 0;
  for (const id of MINERAL_IDS) total += MINERALS[id].frequency;
  let cursor = roll * total;
  for (const id of MINERAL_IDS) {
    cursor -= MINERALS[id].frequency;
    if (cursor <= 0) return id;
  }
  return 'rock';
}

export class Asteroids
  extends InstancedMesh<IcosahedronGeometry, MeshStandardMaterial>
  implements AsteroidField
{
  /** Inhalt je Brocken. */
  private readonly minerals: MineralId[] = [];
  /** Bereits gefoerderte Tonnen je Brocken. */
  private readonly mined: number[] = [];
  /** Zaehlt hoch, sobald ein Platz neu gesetzt wird (siehe AsteroidField). */
  private readonly generations: number[] = [];
  private readonly positions: Vector3[] = [];
  private readonly rotations: Quaternion[] = [];
  private readonly axes: Vector3[] = [];
  private readonly speeds: number[] = [];
  /** Eigenbewegung je Brocken in m/s (Feldkoordinaten). */
  private readonly velocities: Vector3[] = [];
  private readonly scales: number[] = [];
  /** Verbleibende Trefferpunkte; 0 = zerstoert und unsichtbar. */
  private readonly hitpoints: number[] = [];
  /** Trefferpunkte im unbeschaedigten Zustand (fuer die Zielanzeige). */
  private readonly maxHitpoints: number[] = [];
  /** Restzeit bis zum Nachwachsen in Sekunden (nur fuer zerstoerte Brocken). */
  private readonly respawn: number[] = [];

  private readonly options: AsteroidOptions;
  private readonly rng: () => number;
  private readonly color = new Color();

  private readonly tmpMatrix = new Matrix4();
  private readonly tmpQuat = new Quaternion();
  private readonly tmpScale = new Vector3();
  private readonly tmpVec = new Vector3();
  private readonly hit: AsteroidHit = { index: -1, point: new Vector3(), distance: 0, radius: 0 };

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

    this.options = o;
    this.rng = makeRng(o.seed);
    const rng = this.rng;
    const color = this.color;
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

      this.minerals.push(pickMineral(rng()));
      this.mined.push(0);
      this.generations.push(0);

      const hp = hitpointsFor(this.scales[i]!);
      this.hitpoints.push(hp);
      this.maxHitpoints.push(hp);
      this.respawn.push(0);
      this.velocities.push(
        new Vector3(rng() * 2 - 1, (rng() * 2 - 1) * 0.4, rng() * 2 - 1)
          .normalize()
          .multiplyScalar(o.maxDrift * Math.pow(rng(), 1.5)),
      );
    }

    this.writeMatrices();
    if (this.instanceColor) this.instanceColor.needsUpdate = true;
  }

  /** Langsame Eigenrotation, plus Nachwachsen zerstoerter Brocken. */
  update(dt: number): void {
    for (let i = 0; i < this.count; i++) {
      if (this.hitpoints[i]! <= 0) {
        this.respawn[i]! -= dt;
        if (this.respawn[i]! <= 0) this.reseed(i);
        continue;
      }
      this.tmpQuat.setFromAxisAngle(this.axes[i]!, this.speeds[i]! * dt);
      this.rotations[i]!.premultiply(this.tmpQuat).normalize();
      this.drift(i, dt);
    }
    this.writeMatrices();
  }

  /** Lebt der Brocken noch? */
  isAlive(index: number): boolean {
    return this.hitpoints[index]! > 0;
  }

  /** Zustand 0..1 fuer die Zielanzeige. */
  getIntegrity(index: number): number {
    return Math.max(this.hitpoints[index]! / this.maxHitpoints[index]!, 0);
  }

  /** Eigenbewegung eines Brockens in m/s (Welt- = Feldrichtung). */
  getVelocity(index: number, out: Vector3): Vector3 {
    return out.copy(this.velocities[index]!);
  }

  /** Trefferradius eines Brockens in Metern. */
  getRadius(index: number): number {
    return this.scales[index]! * HIT_RADIUS_FACTOR;
  }

  /** Mittelpunkt eines Brockens in Weltkoordinaten. */
  getCenter(index: number, out: Vector3): Vector3 {
    return out.copy(this.positions[index]!).add(this.position);
  }

  /**
   * Erster Brocken, den die Strecke `from` -> `from + direction * length`
   * trifft (Kugeltest gegen den Umriss). `null`, wenn nichts im Weg liegt.
   * Koordinaten in Weltkoordinaten; das Ergebnisobjekt wird wiederverwendet.
   *
   * `padding` vergroessert jeden Brocken — damit wird aus dem Strahlentest der
   * Sweep einer Kugel, wie ihn die Rumpfkollision braucht.
   */
  hitSegment(from: Vector3, direction: Vector3, length: number, padding = 0): AsteroidHit | null {
    let bestDistance = length;
    let bestIndex = -1;

    for (let i = 0; i < this.count; i++) {
      if (this.hitpoints[i]! <= 0) continue;

      // Strecke im Feldsystem betrachten (das Feld ist nur verschoben).
      this.tmpVec.copy(this.positions[i]!).add(this.position).sub(from);
      const along = this.tmpVec.dot(direction);
      const radius = this.getRadius(i) + padding;
      if (along < -radius || along > bestDistance + radius) continue;

      const perpSq = this.tmpVec.lengthSq() - along * along;
      const radiusSq = radius * radius;
      if (perpSq > radiusSq) continue;

      const half = Math.sqrt(radiusSq - perpSq);
      const entry = along - half;
      const distance = entry < 0 ? 0 : entry; // Startpunkt schon im Brocken
      if (distance > bestDistance) continue;

      bestDistance = distance;
      bestIndex = i;
    }

    if (bestIndex < 0) return null;
    this.hit.index = bestIndex;
    this.hit.distance = bestDistance;
    this.hit.radius = this.getRadius(bestIndex);
    this.hit.point.copy(direction).multiplyScalar(bestDistance).add(from);
    return this.hit;
  }

  /**
   * Schaden anrichten. Liefert `true`, wenn der Brocken dadurch zerbricht; er
   * verschwindet dann und wird nach {@link AsteroidOptions.respawnDelay}
   * anderswo im Feld neu gesetzt.
   */
  damage(index: number, amount: number): boolean {
    if (this.hitpoints[index]! <= 0) return false;
    this.hitpoints[index]! -= amount;
    if (this.hitpoints[index]! > 0) return false;

    this.hitpoints[index] = 0;
    this.respawn[index] = this.options.respawnDelay;
    // Skalierung 0: die Instanz bleibt im Puffer, ist aber unsichtbar.
    this.tmpMatrix.makeScale(0, 0, 0);
    this.setMatrixAt(index, this.tmpMatrix);
    this.instanceMatrix.needsUpdate = true;
    return true;
  }

  /**
   * Eigenbewegung eines Brockens fortschreiben. An der Feldgrenze kehrt die
   * radiale Komponente um, damit das Feld nicht langsam ausduennt.
   */
  private drift(index: number, dt: number): void {
    const position = this.positions[index]!;
    const velocity = this.velocities[index]!;
    position.addScaledVector(velocity, dt);

    const limit = this.options.outerRadius * DRIFT_BOUNDS;
    const distance = position.length();
    if (distance <= limit || distance === 0) return;

    this.tmpVec.copy(position).divideScalar(distance); // Aussennormale
    const radial = velocity.dot(this.tmpVec);
    if (radial > 0) velocity.addScaledVector(this.tmpVec, -2 * radial);
  }

  /** Zerstoerten Brocken an neuer Stelle wiederbeleben. */
  private reseed(index: number): void {
    const o = this.options;
    const rng = this.rng;
    const u = rng() * 2 - 1;
    const phi = rng() * Math.PI * 2;
    const ring = Math.sqrt(Math.max(0, 1 - u * u));
    const dist = o.innerRadius + (o.outerRadius - o.innerRadius) * Math.cbrt(rng());
    this.positions[index]!
      .set(Math.cos(phi) * ring, u * 0.45, Math.sin(phi) * ring)
      .multiplyScalar(dist);

    const t = Math.pow(rng(), 2.6);
    this.scales[index] = o.minRadius + (o.maxRadius - o.minRadius) * t;
    this.hitpoints[index] = hitpointsFor(this.scales[index]!);
    this.maxHitpoints[index] = this.hitpoints[index]!;
    this.respawn[index] = 0;
    // Neuer Brocken, neuer Inhalt — und ein Zaehler hoch, damit ein alter
    // Scan nicht faelschlich weitergilt.
    this.minerals[index] = pickMineral(rng());
    this.mined[index] = 0;
    this.generations[index] = this.generations[index]! + 1;
    this.velocities[index]!
      .set(rng() * 2 - 1, (rng() * 2 - 1) * 0.4, rng() * 2 - 1)
      .normalize()
      .multiplyScalar(o.maxDrift * Math.pow(rng(), 1.5));

    const shade = 0.3 + rng() * 0.5;
    const warm = rng() * 0.12;
    this.color.setRGB(shade * (1 + warm), shade * (1 + warm * 0.5), shade * (1 - warm * 0.35));
    this.setColorAt(index, this.color);
    if (this.instanceColor) this.instanceColor.needsUpdate = true;
  }

  // ------------------------------------------------------ AsteroidField

  getMineral(index: number): MineralId {
    return this.minerals[index] ?? 'rock';
  }

  getSizeClass(index: number): AsteroidSize {
    return sizeClassFor(this.getRadius(index));
  }

  isLandable(index: number): boolean {
    return SIZE_CLASSES[this.getSizeClass(index)].landable;
  }

  getGeneration(index: number): number {
    return this.generations[index] ?? 0;
  }

  getTotalTons(index: number): number {
    return yieldTons(this.getRadius(index), this.getMineral(index));
  }

  getRemainingTons(index: number): number {
    if (!this.isAlive(index)) return 0;
    return Math.max(this.getTotalTons(index) - (this.mined[index] ?? 0), 0);
  }

  mine(index: number, tons: number): number {
    const available = this.getRemainingTons(index);
    const taken = Math.min(Math.max(tons, 0), available);
    this.mined[index] = (this.mined[index] ?? 0) + taken;
    return taken;
  }

  /**
   * Vorlaeufig als Kugeltest: der Umriss ist rund, also liegt der Punkt auf
   * der Verbindungslinie. Sobald die Brocken echte unregelmaessige Geometrie
   * haben, tastet diese Stelle die Oberflaeche ab.
   */
  sampleSurface(index: number, from: Vector3, out: SurfaceSample): boolean {
    if (!this.isAlive(index)) return false;
    this.getCenter(index, this.tmpVec);
    out.normal.copy(from).sub(this.tmpVec);
    const distance = out.normal.length();
    if (distance < 1e-4) return false;
    out.normal.divideScalar(distance);
    out.point.copy(this.tmpVec).addScaledVector(out.normal, this.getRadius(index));
    return true;
  }

  private writeMatrices(): void {
    for (let i = 0; i < this.count; i++) {
      if (this.hitpoints[i]! <= 0) continue;
      const s = this.scales[i]!;
      this.tmpScale.set(s, s, s);
      this.tmpMatrix.compose(this.positions[i]!, this.rotations[i]!, this.tmpScale);
      this.setMatrixAt(i, this.tmpMatrix);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}
