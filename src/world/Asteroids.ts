import { Euler, Group, LOD, MeshStandardMaterial, Object3D, Quaternion, Vector3 } from 'three';
import type { Camera } from 'three';
import { makeRng } from './noise';
import { buildRockGeometry, RockShape, type ArchetypeId } from './AsteroidShapes';
import { createRockMaterial, RockBatch } from './AsteroidBatch';
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
  /** Grenzen fuer den Brockenradius. Schneidet die Groessenklassen zurecht. */
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
  /** Index des getroffenen Brockens. */
  index: number;
  /** Trefferpunkt in Weltkoordinaten. */
  point: Vector3;
  /** Strecke vom Segmentanfang bis zum Treffer, in Metern. */
  distance: number;
  /**
   * Abstand des Trefferpunktes vom Mittelpunkt, in Metern — bewusst *nicht*
   * der Umrissradius. Bei einem unfoermigen Brocken sind das zwei
   * verschiedene Dinge: die Rumpfkollision setzt das Schiff auf
   * `Mittelpunkt + Normale * (radius + Rumpfradius)` zurueck, und das muss
   * die oertliche Oberflaeche sein, sonst springt es bei einem Streifschuss
   * ins Leere.
   */
  radius: number;
}

const DEFAULTS: AsteroidOptions = {
  count: 420,
  innerRadius: 260,
  outerRadius: 4500,
  minRadius: 2,
  maxRadius: 420,
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
 * Sicherheitszuschlag auf den Umrissradius im Vorfilter. Die Normierung der
 * Form tastet nur endlich viele Richtungen ab; dazwischen darf die
 * Oberflaeche nicht aus der Pruefkugel ragen.
 */
const BOUND_SAFETY = 1.03;

/** Ab diesem Radius bekommt ein Brocken eigene Geometrie statt einer Instanz. */
const SOLO_RADIUS = SIZE_CLASSES.large.minRadius;

/** Trefferpunkte: quadratisch mit dem Radius, damit ein Planetoid steht. */
const HITPOINTS_PER_METER = 14;

function hitpointsFor(radius: number): number {
  const t = radius / HITPOINTS_PER_METER;
  return 1 + Math.floor(t * t);
}

/**
 * Die drei Instanzklassen: je Formvariante ein Stapel und ein Zeichenaufruf.
 *
 * `detail` sind Unterteilungen der Icosphere (1 = 80 Dreiecke, 2 = 320,
 * 3 = 1280, 4 = 5120). Die Aufloesung folgt dem, wie nah man einer Klasse
 * ueblicherweise kommt: an einem Felsen von 50 m schwebt man beim Foerdern,
 * ein Geroellbrocken von drei Metern huscht vorbei. `variants` steuert die
 * Wiederholung — mehr Formen heissen mehr Zeichenaufrufe, weniger heisst
 * sichtbares Muster; Lage, Groesse und Inhalt streuen zusaetzlich.
 */
const TIERS: readonly { size: AsteroidSize; variants: number; detail: number }[] = [
  { size: 'pebble', variants: 5, detail: 1 },
  { size: 'small', variants: 8, detail: 3 },
  { size: 'medium', variants: 6, detail: 4 },
];

/** Detailstufen der Grossbrocken, fein nach grob. */
const DETAIL_LARGE = [4, 2];
const DETAIL_HUGE = [5, 3];

/** Ab dem Wievielfachen des Radius die grobe Detailstufe genuegt. */
const LOD_SWITCH = 8;

/**
 * Nahstufe der Planetoiden: 81.920 Dreiecke, gut drei Meter je Kante bei
 * einem 400-m-Brocken. Sie wird erst gebaut, wenn jemand hinfliegt — 70 ms
 * Rechenzeit und anderthalb Megabyte je Brocken lohnen sich nur fuer den
 * einen, vor dem man gerade steht.
 */
const DETAIL_FINE = 6;
/** Ab diesem Vielfachen des Radius wird die Nahstufe gebaut ... */
const FINE_BUILD = 3.2;
/** ... und ab diesem gezeigt. */
const FINE_SWITCH = 1.7;

const _camPos = new Vector3();
const _nodePos = new Vector3();

/**
 * Knoten eines Grossbrockens. Erweitert {@link LOD} um genau eine Sache: kurz
 * bevor die feinste Stufe gebraucht wird, laesst er sie bauen. Der Renderer
 * ruft `update` je Bild fuer die Weltkamera auf — das ist die einzige Stelle
 * im Feld, die ueberhaupt weiss, wo die Kamera steht.
 */
class SoloNode extends LOD {
  private grow: (() => void) | null = null;
  private trigger = 0;

  /** Nachbau anmelden. Wird genau einmal ausgefuehrt. */
  whenClose(distance: number, grow: () => void): void {
    this.trigger = distance;
    this.grow = grow;
  }

  override update(camera: Camera): void {
    if (this.grow) {
      _camPos.setFromMatrixPosition(camera.matrixWorld);
      _nodePos.setFromMatrixPosition(this.matrixWorld);
      if (_camPos.distanceTo(_nodePos) < this.trigger) {
        const grow = this.grow;
        this.grow = null;
        grow();
      }
    }
    super.update(camera);
  }
}

/**
 * Formfamilie nach Groesse. Kleines Geroell sind frische Bruchstuecke —
 * kantig, splittrig, mit ebenen Bruchflaechen. Ein Planetoid ist seit
 * Jahrmillionen unterwegs: verwittert, zernarbt, manchmal aus zwei Massen
 * zusammengewachsen. Ein 400-m-Brocken mit scharfen Schnittflaechen sieht aus
 * wie ein Betonklotz, ein scharfkantiger Zwei-Meter-Splitter richtig.
 */
function archetypeFor(size: AsteroidSize, roll: number): ArchetypeId {
  const pool: readonly ArchetypeId[] =
    size === 'huge' || size === 'large'
      ? ['cratered', 'binary', 'cratered', 'slab']
      : size === 'medium'
        ? ['cratered', 'slab', 'splinter', 'binary', 'shard']
        : ['shard', 'splinter', 'slab', 'shard', 'splinter', 'cratered'];
  return pool[Math.min(Math.floor(roll * pool.length), pool.length - 1)]!;
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

const _dir = new Vector3();
const _local = new Vector3();
const _probe = new Vector3();
const _point = new Vector3();
const _tangent1 = new Vector3();
const _tangent2 = new Vector3();
const _a = new Vector3();
const _b = new Vector3();
const _c = new Vector3();
const _d = new Vector3();
const _quat = new Quaternion();
const _euler = new Euler();

/**
 * Asteroidenfeld rund um die Startposition.
 *
 * **Aufbau:** eine Gruppe mit zwei Sorten Kindern. Geroell, Brocken und Felsen
 * (bis 60 m) liegen in Instanzstapeln — ein Stapel je Formvariante, ein
 * Zeichenaufruf, hunderte Steine. Grossfelsen und Planetoiden bekommen jeder
 * einen eigenen Knoten mit zwei Detailstufen: dort wird gelandet und
 * gefoerdert, und so ein Brocken kann das ganze Bild fuellen.
 *
 * Das Feld bleibt *ein* Objekt mit eigener Position — Floating Origin
 * verschiebt weiterhin nur `field.position`.
 */
export class Asteroids extends Group implements AsteroidField {
  /**
   * Anzahl der Plaetze im Feld (auch zerstoerte zaehlen mit).
   *
   * `override`, weil `Object3D` seit r18x selbst ein `count` fuehrt (Instanzen
   * fuer den WebGPU-Pfad). Eine Gruppe wird nie gezeichnet, die Bedeutung
   * hier ist die der Konsumenten-API.
   */
  override readonly count: number;

  private readonly options: AsteroidOptions;
  private readonly rng: () => number;
  private readonly material: MeshStandardMaterial;

  // ------------------------------------------------------- Daten je Platz
  private readonly positions: Vector3[] = [];
  private readonly rotations: Quaternion[] = [];
  private readonly axes: Vector3[] = [];
  private readonly spins: number[] = [];
  private readonly velocities: Vector3[] = [];
  /** Umrissradius in Metern — zugleich die Skalierung der Einheitsform. */
  private readonly radii: number[] = [];
  private readonly sizes: AsteroidSize[] = [];
  private readonly shapes: RockShape[] = [];
  private readonly minerals: MineralId[] = [];
  private readonly mined: number[] = [];
  private readonly generations: number[] = [];
  private readonly hitpoints: number[] = [];
  private readonly maxHitpoints: number[] = [];
  private readonly respawn: number[] = [];

  /** Stapel je Platz; bei Grossbrocken einer je Detailstufe. */
  private readonly parts: RockBatch[][] = [];
  /** Platz innerhalb des Stapels. */
  private readonly slots: number[] = [];
  /** Eigener Knoten der Grossbrocken (traegt Lage und Detailstufen). */
  private readonly nodes: (SoloNode | null)[] = [];
  /** Streuung der Grundhelligkeit je Platz. */
  private readonly shades: number[] = [];
  /** Renderschicht, damit nachgebaute Stufen sie erben. */
  private layer = 0;

  /** Alle Instanzstapel, deren Matrizen je Bild hochgeladen werden. */
  private readonly moving: RockBatch[] = [];

  private readonly hit: AsteroidHit = { index: -1, point: new Vector3(), distance: 0, radius: 0 };
  /** Oberflaechenradius der letzten Auswertung in {@link depth}. */
  private lastSurface = 0;
  /** Oertlicher Radius am zuletzt gefundenen Treffer, in Metern. */
  private lastLocalRadius = 0;

  constructor(options: Partial<AsteroidOptions> = {}) {
    super();
    const o: AsteroidOptions = { ...DEFAULTS, ...options };
    this.options = o;
    this.count = o.count;
    this.name = 'AsteroidField';
    this.rng = makeRng(o.seed);
    this.material = createRockMaterial();

    this.drawSizes();
    this.placeAll();
    this.buildMeshes();
    this.writeAll();
  }

  // -------------------------------------------------------------- Aufbau

  /**
   * Groessenklasse und Radius je Platz ziehen. Die Klassen kommen aus
   * {@link SIZE_CLASSES}; `minRadius`/`maxRadius` schneiden sie zurecht,
   * damit ein kleines Testfeld keine Planetoiden enthaelt.
   */
  private drawSizes(): void {
    const o = this.options;
    // Grenzen einschliesslich: `minRadius === maxRadius` (Testfelder mit genau
    // einer Groesse) darf nicht alle Klassen ausschliessen.
    const allowed = SIZE_IDS.filter(
      (id) => SIZE_CLASSES[id].maxRadius >= o.minRadius && SIZE_CLASSES[id].minRadius <= o.maxRadius,
    );
    const total = allowed.reduce((sum, id) => sum + SIZE_CLASSES[id].frequency, 0);

    for (let i = 0; i < this.count; i++) {
      this.sizes.push(this.drawSize(allowed, total));
      this.radii.push(this.drawRadius(this.sizes[i]!));
      this.minerals.push(pickMineral(this.rng()));
      this.mined.push(0);
      this.generations.push(0);
      const hp = hitpointsFor(this.radii[i]!);
      this.hitpoints.push(hp);
      this.maxHitpoints.push(hp);
      this.respawn.push(0);
      this.positions.push(new Vector3());
      this.rotations.push(new Quaternion());
      this.axes.push(new Vector3());
      this.spins.push(0);
      this.velocities.push(new Vector3());
      this.parts.push([]);
      this.slots.push(0);
      this.nodes.push(null);
      this.spinAndDrift(i);
    }
  }

  private drawSize(allowed: readonly AsteroidSize[], total: number): AsteroidSize {
    let cursor = this.rng() * total;
    for (const id of allowed) {
      cursor -= SIZE_CLASSES[id].frequency;
      if (cursor <= 0) return id;
    }
    return allowed[allowed.length - 1] ?? 'pebble';
  }

  /** Radius in der Klasse — auch innerhalb einer Klasse sind Kleine haeufiger. */
  private drawRadius(size: AsteroidSize): number {
    const o = this.options;
    const cls = SIZE_CLASSES[size];
    const low = Math.max(cls.minRadius, o.minRadius);
    const high = Math.min(cls.maxRadius, o.maxRadius);
    const t = 0.04 + 0.96 * Math.pow(this.rng(), 1.35);
    return Math.max(low, Math.min(high, low + (high - low) * t));
  }

  /** Eigenrotation und Drift. Grosse Massen drehen und wandern traeger. */
  private spinAndDrift(index: number): void {
    const rng = this.rng;
    const o = this.options;
    const slow = 1 / (1 + this.radii[index]! / 40);
    this.axes[index]!.set(rng() * 2 - 1, rng() * 2 - 1, rng() * 2 - 1).normalize();
    this.spins[index] = (rng() * 2 - 1) * 0.28 * slow;
    _euler.set(rng() * Math.PI * 2, rng() * Math.PI * 2, rng() * Math.PI * 2);
    this.rotations[index]!.setFromEuler(_euler);
    this.velocities[index]!
      .set(rng() * 2 - 1, (rng() * 2 - 1) * 0.4, rng() * 2 - 1)
      .normalize()
      .multiplyScalar(o.maxDrift * Math.pow(rng(), 1.5) * slow);
  }

  /**
   * Plaetze verteilen — die groessten zuerst. Zwei Bedingungen: Brocken
   * duerfen einander nicht durchdringen, und ein Planetoid darf nicht so nah
   * am Ursprung stehen, dass das Schiff im Fels startet.
   */
  private placeAll(): void {
    const order = [...Array(this.count).keys()].sort((a, b) => this.radii[b]! - this.radii[a]!);
    const placed: number[] = [];
    for (const i of order) {
      const attempts = this.radii[i]! >= SOLO_RADIUS ? 60 : 12;
      for (let a = 0; a < attempts; a++) {
        this.samplePosition(i);
        if (this.isClear(i, placed)) break;
      }
      placed.push(i);
    }
  }

  private samplePosition(index: number): void {
    const o = this.options;
    const rng = this.rng;
    const radius = this.radii[index]!;
    const big = radius >= SOLO_RADIUS;
    // Abstand nach innen: ein 400-m-Brocken bei 300 m verschluckt den Start.
    const near = Math.min(
      Math.max(o.innerRadius, radius * 1.7 + 140),
      Math.max(o.outerRadius * 0.85, o.innerRadius),
    );
    // Und nach aussen: ein Planetoid am Feldrand wird nie gefunden.
    const far = big ? Math.max(near, o.outerRadius * 0.78) : Math.max(near, o.outerRadius);

    const u = rng() * 2 - 1;
    const phi = rng() * Math.PI * 2;
    const ring = Math.sqrt(Math.max(0, 1 - u * u));
    // Erst die Richtung (abgeflacht wie eine Scheibe), dann der Abstand: so
    // liegt der Abstand genau in [near, far], egal wie flach die Scheibe ist.
    _dir.set(Math.cos(phi) * ring, u * 0.42, Math.sin(phi) * ring).normalize();
    // Grossbrocken ziehen nach innen, der Rest fuellt gleichmaessig das Volumen.
    const t = big ? Math.pow(rng(), 0.6) : Math.cbrt(rng());
    this.positions[index]!.copy(_dir).multiplyScalar(near + (far - near) * t);
  }

  /** Steht der Brocken frei? Etwas Luft, damit nichts ineinandersteckt. */
  private isClear(index: number, placed: readonly number[]): boolean {
    const position = this.positions[index]!;
    const radius = this.radii[index]!;
    for (const other of placed) {
      const sum = radius + this.radii[other]!;
      const gap = sum + Math.max(8, sum * 0.12);
      if (position.distanceToSquared(this.positions[other]!) < gap * gap) return false;
    }
    return true;
  }

  /**
   * Geometrie und Stapel anlegen. Formen werden geteilt, wo es geht: die
   * kleinen Brocken laufen ueber wenige Varianten, jeder Grossbrocken bekommt
   * seine eigene.
   */
  private buildMeshes(): void {
    const seed = this.options.seed;
    // Formvorrat je Instanzklasse. Varianten gleichmaessig ueber die Familien
    // der Klasse verteilen, nicht zufaellig: bei acht Formen faellt jede
    // Wiederholung auf.
    const pools: RockShape[][] = TIERS.map((tier, t) => {
      const shapes: RockShape[] = [];
      for (let v = 0; v < tier.variants; v++) {
        shapes.push(
          new RockShape(archetypeFor(tier.size, v / tier.variants), seed * (31 + t * 16) + v * 17 + 3),
        );
      }
      return shapes;
    });

    // Erst zuordnen, dann zaehlen: ein Stapel braucht seine Groesse vorab.
    const variantOf: number[] = [];
    const capacity = new Map<number, number>();
    for (let i = 0; i < this.count; i++) {
      if (this.radii[i]! >= SOLO_RADIUS) {
        variantOf.push(-1);
        continue;
      }
      const kind = Math.max(
        TIERS.findIndex((tier) => tier.size === this.sizes[i]),
        0,
      );
      const pool = pools[kind]!;
      const variant = Math.min(Math.floor(this.rng() * pool.length), pool.length - 1);
      const id = kind * 100 + variant;
      variantOf.push(id);
      capacity.set(id, (capacity.get(id) ?? 0) + 1);
      this.shapes[i] = pool[variant]!;
    }

    const batches = new Map<number, RockBatch>();
    const used = new Map<number, number>();
    for (const [id, size] of capacity) {
      const kind = Math.floor(id / 100);
      const shape = pools[kind]![id % 100]!;
      const batch = new RockBatch(
        buildRockGeometry(shape, TIERS[kind]!.detail),
        this.material,
        size,
      );
      // Die Stapel decken das ganze Feld ab — als Ganzes liegt da nie etwas
      // ausserhalb des Sichtkegels, die Pruefung waere verschenkte Zeit.
      batch.mesh.frustumCulled = false;
      batches.set(id, batch);
      this.moving.push(batch);
      this.add(batch.mesh);
    }

    for (let i = 0; i < this.count; i++) {
      const id = variantOf[i]!;
      if (id < 0) {
        this.buildSolo(i);
        continue;
      }
      const slot = used.get(id) ?? 0;
      used.set(id, slot + 1);
      this.parts[i] = [batches.get(id)!];
      this.slots[i] = slot;
    }
  }

  /**
   * Ein Grossbrocken: eigene Form, eigene Geometrie, zwei Detailstufen. Die
   * feine Stufe traegt die Landeflaeche, die grobe haelt das Feld bezahlbar,
   * wenn ein Dutzend davon gleichzeitig im Bild steht.
   */
  private buildSolo(index: number): void {
    const huge = this.sizes[index] === 'huge';
    const shape = new RockShape(
      archetypeFor(this.sizes[index]!, this.rng()),
      this.options.seed * 131 + index * 7 + 61,
      true, // Mittelstruktur: Grossbrocken werden aus jeder Entfernung gesehen
    );
    this.shapes[index] = shape;

    const node = new SoloNode();
    node.name = 'Asteroid';
    const levels = huge ? DETAIL_HUGE : DETAIL_LARGE;
    const parts: RockBatch[] = [];
    for (let l = 0; l < levels.length; l++) {
      const batch = new RockBatch(buildRockGeometry(shape, levels[l]!), this.material, 1);
      // Lage traegt der Knoten, nicht die Instanz: nur so misst die
      // Detailstufe die Entfernung zum richtigen Punkt.
      batch.setTransform(0, _point.set(0, 0, 0), _quat.identity(), 1);
      batch.flush();
      parts.push(batch);
      node.addLevel(batch.mesh, l === 0 ? 0 : this.radii[index]! * LOD_SWITCH);
    }
    this.parts[index] = parts;
    this.slots[index] = 0;
    this.nodes[index] = node;
    this.add(node);

    // Nur Planetoiden bekommen die Nahstufe: auf ihnen wird gelandet, und nur
    // sie fuellen aus der Naehe das ganze Bild.
    if (huge) {
      const radius = this.radii[index]!;
      node.whenClose(radius * FINE_BUILD, () => this.growFine(index));
    }
  }

  /**
   * Feinste Stufe eines Planetoiden nachbauen und vorn einhaengen. Laeuft im
   * Bild, in dem der Spieler nah genug herankommt — einmalig, danach steht
   * sie.
   */
  private growFine(index: number): void {
    const node = this.nodes[index];
    if (!node) return;
    const batch = new RockBatch(
      buildRockGeometry(this.shapes[index]!, DETAIL_FINE),
      this.material,
      1,
    );
    batch.setTransform(0, _point.set(0, 0, 0), _quat.identity(), 1);
    batch.flush();
    batch.setMineral(0, this.minerals[index]!, this.shades[index]!);
    // Nachtraeglich erzeugte Kinder stehen nicht mehr im einmaligen traverse
    // von main.ts — die Schicht muss das Feld selbst setzen, sonst zeichnet
    // die Stufe in der falschen Tiefenschicht oder gar nicht.
    batch.mesh.layers.set(this.layer);
    this.parts[index]!.push(batch);

    // Die bisher feinste Stufe rueckt nach hinten, die neue kommt davor.
    const first = node.levels[0];
    if (first) first.distance = this.radii[index]! * FINE_SWITCH;
    node.addLevel(batch.mesh, 0);
  }

  /** Alle Plaetze in ihre Stapel schreiben (Lage und Aussehen). */
  private writeAll(): void {
    for (let i = 0; i < this.count; i++) {
      this.writeAppearance(i);
      this.writeTransform(i);
    }
    for (const batch of this.moving) batch.flush();
  }

  private writeAppearance(index: number): void {
    // Etwas Streuung in der Grundhelligkeit, sonst wirkt das Feld gegossen.
    const shade = 0.55 + this.rng() * 0.45;
    this.shades[index] = shade;
    for (const batch of this.parts[index]!) {
      batch.setMineral(this.slots[index]!, this.minerals[index]!, shade);
    }
  }

  private writeTransform(index: number): void {
    const node = this.nodes[index];
    const alive = this.hitpoints[index]! > 0;
    if (node) {
      node.visible = alive;
      node.position.copy(this.positions[index]!);
      node.quaternion.copy(this.rotations[index]!);
      node.scale.setScalar(this.radii[index]!);
      return;
    }
    const batch = this.parts[index]![0];
    if (!batch) return;
    if (!alive) {
      batch.hide(this.slots[index]!);
      return;
    }
    batch.setTransform(
      this.slots[index]!,
      this.positions[index]!,
      this.rotations[index]!,
      this.radii[index]!,
    );
  }

  /**
   * Renderschicht setzen. Muss das Feld selbst koennen: `main.ts` legt die
   * Schichten einmalig beim Start fest, und die Detailstufen der
   * Grossbrocken sind Kinder, die es dabei mitnehmen muss.
   */
  setLayer(layer: number): void {
    this.layer = layer;
    this.traverse((child: Object3D) => child.layers.set(layer));
  }

  // -------------------------------------------------------------- Ablauf

  /** Eigenrotation, Drift und Nachwachsen zerstoerter Brocken. */
  update(dt: number): void {
    for (let i = 0; i < this.count; i++) {
      if (this.hitpoints[i]! <= 0) {
        this.respawn[i]! -= dt;
        if (this.respawn[i]! <= 0) this.reseed(i);
        continue;
      }
      _quat.setFromAxisAngle(this.axes[i]!, this.spins[i]! * dt);
      this.rotations[i]!.premultiply(_quat).normalize();
      this.drift(i, dt);
      this.writeTransform(i);
    }
    for (const batch of this.moving) batch.flush();
  }

  /**
   * Eigenbewegung fortschreiben. An der Feldgrenze kehrt die radiale
   * Komponente um, damit das Feld nicht langsam ausduennt.
   */
  private drift(index: number, dt: number): void {
    const position = this.positions[index]!;
    const velocity = this.velocities[index]!;
    position.addScaledVector(velocity, dt);

    const limit = this.options.outerRadius * DRIFT_BOUNDS;
    const distance = position.length();
    if (distance <= limit || distance === 0) return;

    _dir.copy(position).divideScalar(distance);
    const radial = velocity.dot(_dir);
    if (radial > 0) velocity.addScaledVector(_dir, -2 * radial);
  }

  /**
   * Zerstoerten Platz neu besetzen. Groessenklasse und Form bleiben: der
   * Stapel, in dem der Platz steckt, haelt genau diese Geometrie. Neu sind
   * Ort, Groesse innerhalb der Klasse, Inhalt und Lage — und die Generation,
   * damit ein alter Scan nicht faelschlich weitergilt.
   */
  private reseed(index: number): void {
    this.radii[index] = this.drawRadius(this.sizes[index]!);
    this.samplePosition(index);
    this.spinAndDrift(index);
    this.hitpoints[index] = hitpointsFor(this.radii[index]!);
    this.maxHitpoints[index] = this.hitpoints[index]!;
    this.respawn[index] = 0;
    this.minerals[index] = pickMineral(this.rng());
    this.mined[index] = 0;
    this.generations[index] = this.generations[index]! + 1;
    this.retuneLevels(index);
    this.writeAppearance(index);
    this.writeTransform(index);
  }

  /**
   * Umschaltweiten der Detailstufen an den neuen Radius anpassen. Die Weiten
   * sind Vielfache des Radius; nach dem Nachwachsen ist der ein anderer, und
   * ein geschrumpfter Brocken zeigte sonst seine feinste Stufe noch aus
   * kilometerweiter Entfernung.
   */
  private retuneLevels(index: number): void {
    const node = this.nodes[index];
    if (!node) return;
    const radius = this.radii[index]!;
    const levels = node.levels;
    const last = levels.length - 1;
    for (let l = 0; l < levels.length; l++) {
      if (l === 0) levels[l]!.distance = 0;
      else if (l === last) levels[l]!.distance = radius * LOD_SWITCH;
      else levels[l]!.distance = radius * FINE_SWITCH;
    }
  }

  // ------------------------------------------------------------ Abfragen

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

  /** Grober Umriss in Metern — Radar, Reichweiten, Zielanzeige. */
  getRadius(index: number): number {
    return this.radii[index]!;
  }

  getCenter(index: number, out: Vector3): Vector3 {
    return out.copy(this.positions[index]!).add(this.position);
  }

  /**
   * Lage des Brockens in Weltkoordinaten. Das Feld selbst wird nur
   * verschoben, nie gedreht — die Eigendrehung des Brockens ist damit auch
   * seine Weltlage. Wer aufsetzt, muss sie kennen, sonst dreht der Fels unter
   * dem Schiff weg.
   */
  getOrientation(index: number, out: Quaternion): Quaternion {
    return out.copy(this.rotations[index]!);
  }

  getMineral(index: number): MineralId {
    return this.minerals[index] ?? 'rock';
  }

  getSizeClass(index: number): AsteroidSize {
    return this.sizes[index] ?? 'pebble';
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

  /** Schaden anrichten. Liefert `true`, wenn der Brocken dadurch zerbricht. */
  damage(index: number, amount: number): boolean {
    if (this.hitpoints[index]! <= 0) return false;
    this.hitpoints[index]! -= amount;
    if (this.hitpoints[index]! > 0) return false;

    this.hitpoints[index] = 0;
    this.respawn[index] = this.options.respawnDelay;
    this.writeTransform(index);
    for (const batch of this.parts[index]!) batch.flush();
    return true;
  }

  // ------------------------------------------------- Oberflaechenabfragen

  /**
   * Oberflaeche in Richtung `from` abtasten.
   *
   * Weil jede Form ein Sternkoerper ist (Radius ueber der Richtung), ist das
   * kein Suchproblem: die Richtung steht fest, der Radius ist eine
   * Auswertung derselben Funktion, aus der auch der Mesh entstanden ist. Die
   * Normale kommt aus vier Nachbarabtastungen — die echte Flaechenneigung,
   * nicht die Kugelnaeherung, sonst steht ein gelandetes Schiff schief in der
   * Kraterwand.
   */
  sampleSurface(index: number, from: Vector3, out: SurfaceSample): boolean {
    if (!this.isAlive(index)) return false;
    this.getCenter(index, _point);
    _dir.copy(from).sub(_point);
    const distance = _dir.length();
    if (distance < 1e-4) return false;
    _dir.divideScalar(distance);

    const shape = this.shapes[index]!;
    const scale = this.radii[index]!;
    _quat.copy(this.rotations[index]!).invert();
    _local.copy(_dir).applyQuaternion(_quat);

    out.point.copy(_point).addScaledVector(_dir, shape.radius(_local.x, _local.y, _local.z) * scale);

    // Tangentenbasis um die Blickrichtung, dann vier Punkte der Oberflaeche.
    _tangent1.set(0, 0, 1);
    if (Math.abs(_local.z) > 0.9) _tangent1.set(1, 0, 0);
    _tangent1.crossVectors(_tangent1, _local).normalize();
    _tangent2.crossVectors(_local, _tangent1).normalize();
    const eps = 0.03;
    this.surfacePoint(shape, _local, _tangent1, eps, _a);
    this.surfacePoint(shape, _local, _tangent1, -eps, _b);
    this.surfacePoint(shape, _local, _tangent2, eps, _c);
    this.surfacePoint(shape, _local, _tangent2, -eps, _d);
    out.normal.crossVectors(_a.sub(_b), _c.sub(_d));
    if (out.normal.lengthSq() < 1e-14) out.normal.copy(_local);
    out.normal.normalize();
    if (out.normal.dot(_local) < 0) out.normal.negate();
    out.normal.applyQuaternion(this.rotations[index]!);
    return true;
  }

  /** Oberflaechenpunkt in leicht gekippter Richtung (Formkoordinaten). */
  private surfacePoint(
    shape: RockShape,
    dir: Vector3,
    tangent: Vector3,
    amount: number,
    out: Vector3,
  ): Vector3 {
    out.copy(dir).addScaledVector(tangent, amount).normalize();
    return out.multiplyScalar(shape.radius(out.x, out.y, out.z));
  }

  /**
   * Erster Brocken, den die Strecke `from` -> `from + direction * length`
   * trifft. Zweistufig: die Umrisskugel filtert vor, danach laeuft ein
   * Strahlmarsch gegen die echte Form. Ohne die zweite Stufe knallt man bei
   * einem Splitter hundert Meter neben dem Fels gegen eine unsichtbare Wand.
   *
   * `padding` blaeht jeden Brocken auf — damit wird aus dem Strahlentest der
   * Sweep einer Kugel, wie ihn die Rumpfkollision braucht.
   */
  hitSegment(from: Vector3, direction: Vector3, length: number, padding = 0): AsteroidHit | null {
    let best = length;
    let bestIndex = -1;
    let bestRadius = 0;

    for (let i = 0; i < this.count; i++) {
      if (this.hitpoints[i]! <= 0) continue;

      _dir.copy(this.positions[i]!).add(this.position).sub(from);
      const along = _dir.dot(direction);
      const bound = this.radii[i]! * BOUND_SAFETY + padding;
      if (along < -bound || along > best + bound) continue;

      const perpSq = _dir.lengthSq() - along * along;
      if (perpSq > bound * bound) continue;

      const half = Math.sqrt(bound * bound - perpSq);
      const exit = Math.min(along + half, best);
      if (exit <= 0) continue;
      const enter = Math.max(along - half, 0);
      if (enter > exit) continue;

      const t = this.march(i, from, direction, enter, exit, padding);
      if (t < 0) continue;

      best = t;
      bestIndex = i;
      bestRadius = this.lastLocalRadius;
    }

    if (bestIndex < 0) return null;
    this.hit.index = bestIndex;
    this.hit.distance = best;
    this.hit.radius = bestRadius;
    this.hit.point.copy(direction).multiplyScalar(best).add(from);
    return this.hit;
  }

  /**
   * Strahlmarsch gegen einen Sternkoerper. Liefert die Entfernung des
   * Eintritts oder -1. Gerechnet wird in Formkoordinaten (Brocken auf
   * Einheitsgroesse), damit die Schrittweite bei jeder Brockengroesse
   * dieselbe relative Genauigkeit hat: 28 Schritte ueber die Sehne, danach
   * zwoelf Halbierungen — beim Planetoiden bleiben so wenige Zentimeter
   * Fehler.
   */
  private march(
    index: number,
    from: Vector3,
    direction: Vector3,
    enter: number,
    exit: number,
    padding: number,
  ): number {
    const shape = this.shapes[index]!;
    const scale = this.radii[index]!;
    _quat.copy(this.rotations[index]!).invert();
    _local
      .copy(from)
      .sub(this.position)
      .sub(this.positions[index]!)
      .applyQuaternion(_quat)
      .divideScalar(scale);
    _probe.copy(direction).applyQuaternion(_quat);

    const pad = padding / scale;
    const t0 = enter / scale;
    const t1 = exit / scale;

    if (this.depth(shape, t0, pad) <= 0) {
      // Startpunkt steckt schon im Brocken.
      this.lastLocalRadius = this.lastSurface * scale;
      return enter;
    }

    const steps = 28;
    const step = (t1 - t0) / steps;
    if (step <= 0) return -1;

    for (let k = 1; k <= steps; k++) {
      if (this.depth(shape, t0 + step * k, pad) > 0) continue;
      let low = t0 + step * (k - 1);
      let high = t0 + step * k;
      for (let b = 0; b < 12; b++) {
        const mid = (low + high) * 0.5;
        if (this.depth(shape, mid, pad) > 0) low = mid;
        else high = mid;
      }
      this.depth(shape, high, pad);
      this.lastLocalRadius = this.lastSurface * scale;
      return high * scale;
    }
    return -1;
  }

  /**
   * Abstand zur Oberflaeche entlang des Strahls: positiv ausserhalb, negativ
   * innerhalb. `_local` ist der Ursprung, `_probe` die Richtung.
   */
  private depth(shape: RockShape, t: number, pad: number): number {
    const x = _local.x + _probe.x * t;
    const y = _local.y + _probe.y * t;
    const z = _local.z + _probe.z * t;
    const length = Math.sqrt(x * x + y * y + z * z);
    if (length < 1e-6) {
      // Genau im Mittelpunkt: als Oberflaeche gilt, was voraus liegt — sonst
      // meldete der Treffer Radius null und die Rumpfkollision liesse das
      // Schiff im Kern stecken.
      this.lastSurface = shape.radius(_probe.x, _probe.y, _probe.z);
      return -1;
    }
    this.lastSurface = shape.radius(x / length, y / length, z / length);
    return length - (this.lastSurface + pad);
  }

  dispose(): void {
    const seen = new Set<RockBatch>();
    for (const parts of this.parts) {
      for (const batch of parts) {
        if (seen.has(batch)) continue;
        seen.add(batch);
        batch.dispose();
      }
    }
    this.material.dispose();
  }
}
