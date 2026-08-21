import { BufferAttribute, BufferGeometry } from 'three';
import { fbm3, makeRng, noise3, ridgedFbm3 } from './noise';

/**
 * Formerzeugung fuer Asteroiden.
 *
 * **Warum sternfoermig:** jede Form steht hier als Radius ueber der Richtung,
 * `r = f(d)` mit `d` als Einheitsvektor. Das kostet Ausdruckskraft — echte
 * Ueberhaenge und Hoehlen gibt es nicht —, bringt aber die beiden Dinge, an
 * denen drei Arbeitspakete haengen: der Mesh ist nur eine Abtastung derselben
 * Funktion, und Kollision wie Landung koennen die Oberflaeche direkt
 * ausrechnen, statt zehntausende Dreiecke zu durchsuchen. Ein Planetoid mit
 * 20.000 Dreiecken braucht so weder BVH noch Raster.
 *
 * Aus der Kugel wird trotzdem keine Kartoffel: die Grundform ist ein
 * Ellipsoid (oder die Vereinigung zweier Massen), darueber liegen Beulen,
 * Grate, ebene Bruchflaechen und Krater.
 */

/** Die Formfamilien. Jede zieht ihre Parameter aus dem Seed. */
export type ArchetypeId = 'cratered' | 'splinter' | 'slab' | 'binary' | 'shard';

export const ARCHETYPES: readonly ArchetypeId[] = [
  'cratered', // kraterzernarbter Rundling
  'splinter', // langgestreckter Splitter
  'slab', // abgeplattete Scheibe
  'binary', // zwei verwachsene Massen mit Hals
  'shard', // kantiges Bruchstueck aus ebenen Flaechen
];

/** Richtungen und Dreiecke einer Icosphere, nach Detailstufe zwischengelagert. */
interface Sphere {
  /** Einheitsrichtungen, 3 Werte je Punkt. */
  readonly dirs: Float32Array;
  readonly index: Uint32Array;
}

const SPHERES = new Map<number, Sphere>();

/**
 * Icosphere mit Index. Eigene Erzeugung statt `IcosahedronGeometry`, weil wir
 * geteilte Vertices brauchen: die Deformation soll die Flaechen nicht
 * aufreissen, und geglaettete Normalen entstehen nur ueber den Index.
 *
 * **Jede Stufe ist ein Praefix der naechsten.** Die Unterteilung haengt neue
 * Mittelpunkte hinten an und laesst die vorhandenen Richtungen unberuehrt —
 * `icosphere(5).dirs` steht also Zahl fuer Zahl am Anfang von
 * `icosphere(6).dirs`. Darauf beruht der Zwischenspeicher in
 * {@link RockShape.samples}: eine Form, die fuer die grobe Stufe schon
 * ausgewertet wurde, muss fuer die feine nur noch die *neuen* Richtungen
 * rechnen. Deshalb wird Stufe `n` auch aus der gespeicherten Stufe `n-1`
 * weiterunterteilt statt jedes Mal vom Ikosaeder an.
 */
export function icosphere(detail: number): Sphere {
  const cached = SPHERES.get(detail);
  if (cached) return cached;
  const sphere = detail <= 0 ? baseIcosahedron() : subdivide(icosphere(detail - 1));
  SPHERES.set(detail, sphere);
  return sphere;
}

/** Das Ikosaeder, auf die Einheitskugel normiert. */
function baseIcosahedron(): Sphere {
  const t = (1 + Math.sqrt(5)) / 2;
  const raw = [
    -1, t, 0, 1, t, 0, -1, -t, 0, 1, -t, 0,
    0, -1, t, 0, 1, t, 0, -1, -t, 0, 1, -t,
    t, 0, -1, t, 0, 1, -t, 0, -1, -t, 0, 1,
  ];
  const dirs = new Float32Array(raw.length);
  for (let i = 0; i < raw.length; i += 3) {
    const l = Math.hypot(raw[i]!, raw[i + 1]!, raw[i + 2]!);
    dirs[i] = raw[i]! / l;
    dirs[i + 1] = raw[i + 1]! / l;
    dirs[i + 2] = raw[i + 2]! / l;
  }
  const index = Uint32Array.from([
    0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11,
    1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8,
    3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9,
    4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1,
  ]);
  return { dirs, index };
}

/**
 * Eine Stufe unterteilen: jedes Dreieck in vier, jede Kante genau einen neuen
 * Mittelpunkt.
 *
 * Gerechnet wird durchgehend auf typisierten Feldern. Die frueher benutzten
 * verschachtelten Zahlenfelder erzeugten fuer Stufe 6 rund 150.000
 * kurzlebige Dreielement-Felder — die Zeit steckte weniger im Rechnen als im
 * anschliessenden Aufraeumen.
 */
function subdivide(base: Sphere): Sphere {
  const faceCount = base.index.length / 3;
  const oldPoints = base.dirs.length / 3;
  // Euler: jede Kante liefert genau einen neuen Punkt, und ein geschlossenes
  // Dreiecksnetz hat 3F/2 Kanten. Damit steht die Groesse vorab fest.
  const newPoints = oldPoints + (faceCount * 3) / 2;
  const dirs = new Float32Array(newPoints * 3);
  dirs.set(base.dirs);
  const index = new Uint32Array(faceCount * 4 * 3);

  const midpoints = new Map<number, number>();
  let next = oldPoints;

  const mid = (a: number, b: number): number => {
    const key = a < b ? a * 0x100000 + b : b * 0x100000 + a;
    const hit = midpoints.get(key);
    if (hit !== undefined) return hit;
    const x = dirs[a * 3]! + dirs[b * 3]!;
    const y = dirs[a * 3 + 1]! + dirs[b * 3 + 1]!;
    const z = dirs[a * 3 + 2]! + dirs[b * 3 + 2]!;
    const l = Math.hypot(x, y, z);
    const at = next++;
    dirs[at * 3] = x / l;
    dirs[at * 3 + 1] = y / l;
    dirs[at * 3 + 2] = z / l;
    midpoints.set(key, at);
    return at;
  };

  let out = 0;
  for (let f = 0; f < faceCount; f++) {
    const v0 = base.index[f * 3]!;
    const v1 = base.index[f * 3 + 1]!;
    const v2 = base.index[f * 3 + 2]!;
    const a = mid(v0, v1);
    const b = mid(v1, v2);
    const c = mid(v2, v0);
    index[out++] = v0; index[out++] = a; index[out++] = c;
    index[out++] = a; index[out++] = v1; index[out++] = b;
    index[out++] = c; index[out++] = b; index[out++] = v2;
    index[out++] = a; index[out++] = b; index[out++] = c;
  }

  return { dirs, index };
}

/**
 * Wie weit die Auswurfdecke ueber den Kraterrand hinausreicht, als Vielfaches
 * der Kraterweite. Ein echter Einschlag wirft Material ringfoermig aus; es
 * liegt am Rand am dichtesten und duennt nach aussen aus. Ohne diesen Hof
 * bleibt ein Krater eine Delle — mit ihm liest er sich als Einschlag.
 */
const EJECTA_REACH = 1.85;

/** Weiche Vereinigung zweier Radien — laesst am Hals eine Kehle stehen. */
function smoothMax(a: number, b: number, k: number): number {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.max(a, b) + h * h * k * 0.25;
}

/**
 * Eine Brockenform. Unveraenderlich, teuer in der Herstellung (die
 * Normierung tastet die Kugel ab) und deshalb geteilt: viele Instanzen
 * benutzen dieselbe Form in unterschiedlicher Groesse und Lage.
 */
export class RockShape {
  readonly id: ArchetypeId;
  /**
   * Flach schattieren? Ein frisch abgesprengter Splitter darf scharfe Kanten
   * haben, ein verwitterter Rundling nicht.
   */
  readonly sharp: boolean;

  /** Halbachsen der Grundform. */
  private readonly ax: number;
  private readonly ay: number;
  private readonly az: number;

  /** Zwei Massen (nur beim Doppelbrocken), je Mittelpunkt und Radius. */
  private readonly lobes: Float64Array;
  private readonly lobeCount: number;

  /** Ebene Bruchflaechen: Normale und Abstand vom Mittelpunkt. */
  private readonly cutN: Float64Array;
  private readonly cutD: Float64Array;
  private readonly cutCount: number;

  /** Krater: Richtung, Kosinus des Oeffnungswinkels, Tiefe, Wallhoehe. */
  private readonly craterDir: Float64Array;
  private readonly craterCos: Float64Array;
  private readonly craterDepth: Float64Array;
  private readonly craterRim: Float64Array;
  private readonly craterCount: number;
  /** Ab diesem Index stehen die kleinen Krater der Grossbrocken. */
  private readonly fineFrom: number;

  /** Mittlere Oktave — nur bei Grossbrocken, sonst 0. */
  private readonly midAmp: number;
  private readonly midFreq: number;

  private readonly bumpAmp: number;
  private readonly bumpFreq: number;
  private readonly ridgeAmp: number;
  private readonly ridgeFreq: number;
  private readonly grainAmp: number;
  private readonly mottleFreq: number;
  /** Oktaven der Grundstoerung — bei Grossbrocken eine weniger. */
  private octaves = 3;
  /** Rauheit der Bruchflaechen (wirkt erst nach dem Schnitt). */
  private chipAmp = 0.055;
  private readonly chipFreq: number;
  private readonly seed: number;

  /** Faktor, der den groessten Radius auf 1 zieht. */
  private norm = 1;
  /** Kleinster Radius nach Normierung — Vorfilter fuer Strahltests. */
  private smallest = 1;

  /**
   * @param fine Zusaetzliche Mittelstruktur (kleine Krater, eine Oktave mehr).
   *   Nur fuer Grossbrocken sinnvoll: ein Geroellbrocken mit 320 Dreiecken
   *   kann sie nicht darstellen und wuerde davon nur unruhig.
   */
  constructor(archetype: ArchetypeId, seed: number, fine = false) {
    this.id = archetype;
    this.seed = (seed % 97) * 13.37 + 4.2;
    const rng = makeRng(seed * 7919 + 13);
    const range = (a: number, b: number): number => a + (b - a) * rng();
    const count = (a: number, b: number): number => Math.floor(range(a, b + 0.999));

    this.sharp = archetype === 'shard' || archetype === 'splinter';

    let cuts = 0;
    let craters = 0;
    let craterSize: [number, number] = [0.18, 0.5];
    let lobes = 0;
    this.bumpFreq = range(1.4, 2.2);
    this.ridgeFreq = range(3.4, 5.6);
    this.bumpAmp = 0.14;
    this.ridgeAmp = 0.1;
    this.grainAmp = 0.03;

    switch (archetype) {
      case 'splinter':
        // Lang und duenn, mit ein paar Laengsbruechen — ein abgesprengter Span.
        this.ax = 1;
        this.ay = range(0.3, 0.44);
        this.az = range(0.26, 0.4);
        this.bumpAmp = 0.17;
        this.ridgeAmp = 0.16;
        cuts = count(3, 5);
        craters = count(1, 3);
        craterSize = [0.14, 0.3];
        break;
      case 'slab':
        // Scheibe: eine Achse deutlich flacher, Raender angefressen. Nicht
        // duenner als ein Drittel — sonst wird aus dem Felsbrocken ein Plaetzchen.
        this.ax = 1;
        this.ay = range(0.34, 0.46);
        this.az = range(0.72, 0.95);
        this.bumpAmp = 0.19;
        cuts = count(1, 3);
        craters = count(4, 8);
        craterSize = [0.16, 0.42];
        break;
      case 'binary':
        // Zwei Massen, die am Hals zusammengewachsen sind.
        this.ax = 1;
        this.ay = range(0.8, 0.95);
        this.az = range(0.8, 0.95);
        this.bumpAmp = 0.12;
        lobes = 2;
        craters = count(4, 8);
        craterSize = [0.14, 0.36];
        break;
      case 'shard':
        // Fast nur ebene Flaechen: ein Bruchstueck von etwas Groesserem. Die
        // Beulen bleiben klein, sonst wellen sich die Bruchflaechen und die
        // Kanten verschwinden.
        this.ax = 1;
        this.ay = range(0.72, 0.95);
        this.az = range(0.66, 0.9);
        this.bumpAmp = 0.05;
        this.ridgeAmp = 0.04;
        cuts = count(7, 10);
        craters = count(1, 3);
        craterSize = [0.12, 0.28];
        break;
      default:
        // Rundling — der einzige, der einer Kugel nahekommt, dafuer voller
        // Krater und Grate.
        this.ax = 1;
        this.ay = range(0.82, 0.98);
        this.az = range(0.78, 0.96);
        this.bumpAmp = 0.16;
        this.ridgeAmp = 0.14;
        craters = count(9, 15);
        craterSize = [0.14, 0.55];
        cuts = count(0, 1);
        break;
    }

    this.lobeCount = lobes;
    this.lobes = new Float64Array(lobes * 4);
    if (lobes === 2) {
      const dx = range(-1, 1);
      const dy = range(-1, 1);
      const dz = range(-1, 1);
      const l = Math.hypot(dx, dy, dz) || 1;
      const off1 = range(0.4, 0.52);
      const off2 = range(0.36, 0.5);
      const r1 = range(0.6, 0.7);
      const r2 = range(0.5, 0.64);
      this.lobes.set([(dx / l) * off1, (dy / l) * off1, (dz / l) * off1, r1], 0);
      this.lobes.set([(-dx / l) * off2, (-dy / l) * off2, (-dz / l) * off2, r2], 4);
    }

    this.cutCount = cuts;
    this.cutN = new Float64Array(cuts * 3);
    this.cutD = new Float64Array(cuts);
    for (let i = 0; i < cuts; i++) {
      const x = range(-1, 1);
      const y = range(-1, 1);
      const z = range(-1, 1);
      const l = Math.hypot(x, y, z) || 1;
      this.cutN.set([x / l, y / l, z / l], i * 3);
      this.cutD[i] = archetype === 'shard' ? range(0.55, 0.8) : range(0.52, 0.86);
    }

    // Grossbrocken bekommen eine zweite, kleinere Kraterlage. Sie traegt die
    // mittlere Entfernung: von 500 m sieht man weder Griess noch Umriss,
    // sondern genau diese Narben.
    const fineCraters = fine ? count(9, 16) : 0;
    this.fineFrom = craters;
    craters += fineCraters;

    this.craterCount = craters;
    this.craterDir = new Float64Array(craters * 3);
    this.craterCos = new Float64Array(craters);
    this.craterDepth = new Float64Array(craters);
    this.craterRim = new Float64Array(craters);
    for (let i = 0; i < craters; i++) {
      const x = range(-1, 1);
      const y = range(-1, 1);
      const z = range(-1, 1);
      const l = Math.hypot(x, y, z) || 1;
      this.craterDir.set([x / l, y / l, z / l], i * 3);
      const angle = i < this.fineFrom ? range(craterSize[0], craterSize[1]) : range(0.09, 0.17);
      this.craterCos[i] = Math.cos(angle);
      // Deutliche Schuessel, flacher Wall. Umgekehrt — viele hohe Waelle bei
      // flachen Schuesseln — ueberlagern sich die Raender zu einem Geflecht,
      // und der Brocken sieht aus wie eine Hirnkoralle statt wie Fels.
      this.craterDepth[i] = angle * range(0.24, 0.42);
      this.craterRim[i] = angle * range(0.03, 0.09);
    }

    this.midAmp = fine ? range(0.025, 0.045) : 0;
    this.midFreq = range(6, 9.5);
    if (fine) {
      // Der Griess ist als *kleine* Rauheit gedacht. Auf einem Planetoiden
      // waeren dieselben drei Prozent zwoelf Meter Ausschlag auf zwanzig Meter
      // Wellenlaenge: das kann kein Mesh mehr abbilden, und Landung wie
      // Kollision liefen der gezeichneten Oberflaeche hinterher.
      this.grainAmp *= 0.28;
      // Und eine Oktave weniger, aus demselben Grund: die dritte liegt bei
      // einem Planetoiden schon unterhalb der Dreiecksgroesse.
      this.octaves = 2;
      this.chipAmp = 0.03;
      // Grate wirken auf einem Grossbrocken wie Stofffalten: hundert Meter
      // lange, scharfe Ruecken gibt es an keinem Fels. Auf dem Splitter, wo
      // sie zentimeterbreit sind, bleiben sie.
      this.ridgeAmp *= 0.35;
    }

    this.mottleFreq = range(1.6, 2.6);
    this.chipFreq = range(6, 9);

    this.measure();
  }

  /** Kleinster Radius relativ zum groessten. */
  get minRadius(): number {
    return this.smallest;
  }

  /**
   * Radius in Richtung `(x, y, z)` (muss normiert sein). Groesster Wert ueber
   * alle Richtungen ist 1, der Aufrufer skaliert mit dem Brockenradius.
   */
  radius(x: number, y: number, z: number): number {
    return this.raw(x, y, z) * this.norm;
  }

  /**
   * Grossflaeckige Helligkeitsflecken 0..1. Ohne sie sieht ein Brocken aus
   * wie ein einfarbig lackiertes Modell — Fels ist nirgends gleichmaessig.
   */
  mottle(x: number, y: number, z: number): number {
    const f = this.mottleFreq;
    const s = this.seed;
    return fbm3(x * f - s * 1.3, y * f + s, z * f - s * 0.4, 3);
  }

  /**
   * Wie tief liegt die Stelle in einer Mulde (0..1)? Dort sammelt sich
   * Schutt: dunkler, stumpfer, ohne freiliegende Adern.
   */
  cavity(x: number, y: number, z: number): number {
    this.craterPair(x, y, z);
    return this.lastCavity;
  }

  /**
   * Dichte der Auswurfdecke (0..1) rund um einen Einschlag. Beginnt am
   * Kraterrand und duennt nach aussen aus; innerhalb der Schuessel ist sie
   * null — dort liegt der Auswurf ja gerade nicht mehr.
   *
   * Bewusst nur eine Helligkeitsgroesse und keine Verformung: Auswurf ist
   * eine duenne Staubdecke, keine Gelaendestufe. Als Form waere sie auf einem
   * 400-m-Brocken feiner als ein Dreieck.
   */
  ejecta(x: number, y: number, z: number): number {
    this.craterPair(x, y, z);
    return this.lastEjecta;
  }

  /**
   * Mulde und Auswurf in *einem* Durchlauf ueber die Kraterliste.
   *
   * Beide Groessen brauchen dasselbe Skalarprodukt je Krater und dieselbe
   * Fallunterscheidung; getrennt gerechnet lief die Liste zweimal. Auf einem
   * Planetoiden mit 22 Kratern und 40.962 Richtungen waren das 900.000
   * ueberfluessige Skalarprodukte je Aufbau. Die Ergebnisse sind Zahl fuer
   * Zahl dieselben wie aus {@link cavity} und {@link ejecta}.
   */
  private craterPair(x: number, y: number, z: number): void {
    let cavity = 0;
    let ejecta = 0;
    for (let i = 0; i < this.craterCount; i++) {
      const c = x * this.craterDir[i * 3]! + y * this.craterDir[i * 3 + 1]! + z * this.craterDir[i * 3 + 2]!;
      const cos = this.craterCos[i]!;
      const outer = 1 - (1 - cos) * EJECTA_REACH;
      if (c <= outer) continue;
      const t = (1 - c) / (1 - cos);
      if (t < 1) {
        if (c > cos) cavity += (1 - t * t) * (this.craterDepth[i]! / 0.12);
        continue;
      }
      const u = (t - 1) / (EJECTA_REACH - 1);
      const falloff = 1 - u;
      // Nenner deutlich groesser als bei {@link cavity}: der Hof ist eine
      // Andeutung. Bei 0,12 sattelt schon ein einzelner grosser Krater bei 1,
      // die Hoefe der Nachbarn ueberlagern sich zu einer geschlossenen Decke,
      // und der Brocken sieht aus, als haette jemand Nebel darauf gemalt.
      ejecta += falloff * falloff * (this.craterDepth[i]! / 0.30);
    }
    this.lastCavity = Math.min(cavity, 1);
    this.lastEjecta = Math.min(ejecta, 1);
  }

  private lastCavity = 0;
  private lastEjecta = 0;

  /**
   * Zwischengespeicherte Auswertungen je Richtungsindex der Icosphere:
   * Radius, Mulde, Fleckigkeit, Auswurf.
   *
   * **Warum das traegt:** jede Detailstufe ist ein Praefix der naechsten
   * (siehe {@link icosphere}). Ein Planetoid wird nacheinander in Stufe 5,
   * 3 und 6 gebaut, dazu kommt die Vermessung auf Stufe 4 — dieselbe Form
   * also an 2.562 + 10.242 + 642 + 40.962 Richtungen, von denen nur 40.962
   * verschieden sind. Ein Viertel der Arbeit war schlicht doppelt.
   */
  private samples: Float32Array | null = null;
  private sampleCount = 0;

  /**
   * Die ersten `count` Richtungen auswerten, hoechstens `budget` neue je
   * Aufruf. Liefert, wie viele fertig sind — der Aufrufer kann den Aufbau
   * damit ueber mehrere Bilder strecken.
   */
  sampleUpTo(dirs: Float32Array, count: number, budget: number): number {
    if (this.sampleCount >= count) return count;
    if (!this.samples || this.samples.length < count * 4) {
      const grown = new Float32Array(count * 4);
      if (this.samples) grown.set(this.samples.subarray(0, this.sampleCount * 4));
      this.samples = grown;
    }
    const samples = this.samples;
    const end = Math.min(count, this.sampleCount + budget);
    for (let i = this.sampleCount; i < end; i++) {
      const x = dirs[i * 3]!;
      const y = dirs[i * 3 + 1]!;
      const z = dirs[i * 3 + 2]!;
      this.craterPair(x, y, z);
      samples[i * 4] = this.radius(x, y, z);
      samples[i * 4 + 1] = this.lastCavity;
      samples[i * 4 + 2] = this.mottle(x, y, z);
      samples[i * 4 + 3] = this.lastEjecta;
    }
    this.sampleCount = end;
    return end;
  }

  /** Die zwischengespeicherten Werte. Nur bis `sampleUpTo` gefuellt. */
  get sampleData(): Float32Array {
    return this.samples ?? new Float32Array(0);
  }

  /**
   * Zwischenspeicher freigeben. Aufzurufen, wenn fuer diese Form keine
   * Geometrie mehr entsteht — bei einem Planetoiden sind das gut 600 kB.
   */
  releaseSamples(): void {
    this.samples = null;
    this.sampleCount = 0;
  }

  /** Unnormierter Radius. */
  private raw(x: number, y: number, z: number): number {
    let r: number;
    if (this.lobeCount > 0) {
      r = 0;
      for (let i = 0; i < this.lobeCount; i++) {
        r = smoothMax(r, this.lobe(i, x, y, z), 0.12);
      }
    } else {
      const qx = x / this.ax;
      const qy = y / this.ay;
      const qz = z / this.az;
      r = 1 / Math.sqrt(qx * qx + qy * qy + qz * qz);
    }

    const s = this.seed;
    const bf = this.bumpFreq;
    const oct = this.octaves;
    r *= 1 + (fbm3(x * bf + s, y * bf + s * 1.7, z * bf - s, oct) - 0.5) * 2 * this.bumpAmp;
    if (this.ridgeAmp > 0) {
      const rf = this.ridgeFreq;
      r *= 1 + (ridgedFbm3(x * rf - s, y * rf + s, z * rf + s * 0.5, oct) - 0.55) * this.ridgeAmp;
    }
    if (this.midAmp > 0) {
      const mf = this.midFreq;
      r *= 1 + (fbm3(x * mf + s * 0.7, y * mf - s, z * mf + s, 2) - 0.5) * 2 * this.midAmp;
    }

    // Bruchflaechen: die Ebene schneidet den Koerper, wo sie naeher liegt als
    // die bisherige Oberflaeche.
    for (let i = 0; i < this.cutCount; i++) {
      const d = x * this.cutN[i * 3]! + y * this.cutN[i * 3 + 1]! + z * this.cutN[i * 3 + 2]!;
      if (d <= 1e-3) continue;
      const limit = this.cutD[i]! / d;
      if (limit < r) r = limit;
    }

    // Eine Bruchflaeche ist nicht poliert. Ohne diese Stoerung *nach* dem
    // Schnitt bleibt die Ebene mathematisch eben — und eine mathematisch
    // ebene Flaeche mit Farbmaserung darauf sieht aus wie bemalte Pappe.
    if (this.cutCount > 0) {
      const cf = this.chipFreq;
      r *= 1 + (fbm3(x * cf + s * 0.3, y * cf - s * 1.1, z * cf + s * 0.9, 2) - 0.5) * this.chipAmp;
    }

    // Krater: Schuessel innen, Wall aussen. Die Wirkung ist relativ, damit ein
    // Krater auf dem Splitter nicht dieselbe absolute Tiefe hat wie auf dem
    // Planetoiden.
    let dent = 0;
    for (let i = 0; i < this.craterCount; i++) {
      const c = x * this.craterDir[i * 3]! + y * this.craterDir[i * 3 + 1]! + z * this.craterDir[i * 3 + 2]!;
      const cos = this.craterCos[i]!;
      // Der Wall reicht ueber den Kraterrand hinaus, deshalb 1,4-fache Weite.
      const outer = 1 - (1 - cos) * 1.4;
      if (c <= outer) continue;
      const t = (1 - c) / (1 - cos);
      if (t < 1) {
        // Schuessel, die am Rand waagerecht auslaeuft. Ein Profil mit Knick
        // (schlicht 1 - t²) erzeugt dort eine Kante, die feiner ist als jedes
        // Dreieck des Meshes — und damit weichen gezeichnete und gerechnete
        // Oberflaeche genau am Kraterrand um Meter voneinander ab.
        const bowl = 1 - t * t;
        dent -= this.craterDepth[i]! * bowl * Math.sqrt(bowl);
      }
      const e = (t - 1) * 2.6;
      dent += this.craterRim[i]! * Math.exp(-e * e);
    }
    r *= 1 + dent;

    // Feiner Griess. Verschwindet auf Entfernung, gibt aus der Naehe Halt.
    r *= 1 + (noise3(x * 21 + s, y * 21 - s, z * 21 + s * 2) - 0.5) * this.grainAmp;
    return r;
  }

  /** Austrittsradius einer der beiden Massen entlang der Richtung. */
  private lobe(i: number, x: number, y: number, z: number): number {
    const cx = this.lobes[i * 4]!;
    const cy = this.lobes[i * 4 + 1]!;
    const cz = this.lobes[i * 4 + 2]!;
    const rr = this.lobes[i * 4 + 3]!;
    const b = x * cx + y * cy + z * cz;
    const disc = b * b - (cx * cx + cy * cy + cz * cz) + rr * rr;
    if (disc <= 0) return 0;
    return b + Math.sqrt(disc);
  }

  /**
   * Groessten und kleinsten Radius abtasten. Ohne das waere weder der
   * Umrissradius bekannt noch der Vorfilter der Strahltests dicht.
   */
  private measure(): void {
    const { dirs } = icosphere(4);
    let max = 0;
    let min = Infinity;
    for (let i = 0; i < dirs.length; i += 3) {
      const r = this.raw(dirs[i]!, dirs[i + 1]!, dirs[i + 2]!);
      if (r > max) max = r;
      if (r < min) min = r;
    }
    // 1,5 Prozent Luft: zwischen den abgetasteten Richtungen liegt die
    // Oberflaeche etwas hoeher, und der Umrissradius muss sie umschliessen.
    this.norm = max > 0 ? 1 / (max * 1.015) : 1;
    this.smallest = min * this.norm;
  }
}

/**
 * Mesh zu einer Form. `detail` ist die Zahl der Unterteilungen (2 = 320
 * Dreiecke, 3 = 1280, 4 = 5120, 5 = 20480, 6 = 81920).
 *
 * Neben Position und Normale traegt die Geometrie `aRockDetail`: Muldentiefe,
 * Fleckigkeit und Auswurfdecke. Alle drei gehoeren zur *Form* und wechseln
 * nicht mit dem Inhalt. Die Adern dagegen rechnet der Shader je Bildpunkt —
 * auf einem Brocken mit 320 Dreiecken waeren sie sonst Polygonflecken.
 */
export function buildRockGeometry(shape: RockShape, detail: number): BufferGeometry {
  const build = new RockGeometryBuild(shape, detail);
  build.advance(Infinity);
  return build.finish();
}

/**
 * Derselbe Aufbau, aber in Portionen.
 *
 * **Wozu:** die feinste Stufe eines Planetoiden hat 40.962 Punkte und 81.920
 * Dreiecke. In einem Stueck gerechnet sind das gut vierzig Millisekunden —
 * zweieinhalb ausgelassene Bilder, genau in dem Moment, in dem man auf den
 * Brocken zufliegt. Der Aufbau beginnt aber beim 3,2-fachen Radius, gezeigt
 * wird die Stufe erst beim 1,7-fachen: dazwischen liegen mehrere hundert
 * Meter Anflug, also reichlich Bilder, um die Arbeit zu verteilen.
 *
 * Das Ergebnis ist Zahl fuer Zahl dasselbe wie beim Bau am Stueck — die
 * Portionierung aendert nur, wann gerechnet wird.
 */
export class RockGeometryBuild {
  private readonly sphere: Sphere;
  private readonly points: number;
  private readonly position: Float32Array;
  private readonly rockDetail: Float32Array;
  private readonly normal: Float32Array;
  /** 0 = abtasten, 1 = Normalen haeufen, 2 = normieren, 3 = fertig. */
  private phase = 0;
  private cursor = 0;

  constructor(
    private readonly shape: RockShape,
    private readonly detail: number,
  ) {
    this.sphere = icosphere(detail);
    this.points = this.sphere.dirs.length / 3;
    this.position = new Float32Array(this.points * 3);
    this.rockDetail = new Float32Array(this.points * 3);
    this.normal = new Float32Array(this.points * 3);
  }

  get done(): boolean {
    return this.phase === 3;
  }

  /**
   * Ein Stueck Arbeit erledigen. `budget` zaehlt Punkte bzw. Dreiecke —
   * `Infinity` baut in einem Zug.
   */
  advance(budget: number): void {
    let left = budget;
    while (left > 0 && this.phase < 3) {
      if (this.phase === 0) left -= this.sample(left);
      else if (this.phase === 1) left -= this.accumulate(left);
      else left -= this.normalize(left);
    }
  }

  /** Fertige Geometrie. Erst aufrufen, wenn {@link done}. */
  finish(): BufferGeometry {
    if (!this.done) this.advance(Infinity);
    let geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(this.position, 3));
    geometry.setAttribute('aRockDetail', new BufferAttribute(this.rockDetail, 3));
    geometry.setAttribute('normal', new BufferAttribute(this.normal, 3));
    geometry.setIndex(new BufferAttribute(this.sphere.index, 1));

    // Flach schattiert wird nur das Kleinzeug. Bei einem Grossbrocken mit
    // 20.000 Dreiecken ist ein Dreieck 14 m breit — jede Facette bekaeme ihre
    // eigene Helligkeit, und der Planetoid saehe aus wie zerknuelltes Papier.
    // Seine Kanten kommen dort von den Bruchflaechen, nicht von der Aufloesung.
    if (this.shape.sharp && this.detail <= 3) {
      const flat = geometry.toNonIndexed();
      geometry.dispose();
      geometry = flat;
      // Nach dem Aufloesen des Index gehoert zu jeder Facette ihre eigene
      // Normale — die geglaetteten von oben waeren dort falsch.
      geometry.computeVertexNormals();
    }
    geometry.computeBoundingSphere();
    return geometry;
  }

  /** Punkte auf die Oberflaeche setzen. */
  private sample(budget: number): number {
    const before = this.shape.sampleUpTo(this.sphere.dirs, this.points, budget);
    const dirs = this.sphere.dirs;
    const data = this.shape.sampleData;
    for (let i = this.cursor; i < before; i++) {
      const r = data[i * 4]!;
      this.position[i * 3] = dirs[i * 3]! * r;
      this.position[i * 3 + 1] = dirs[i * 3 + 1]! * r;
      this.position[i * 3 + 2] = dirs[i * 3 + 2]! * r;
      this.rockDetail[i * 3] = data[i * 4 + 1]!;
      this.rockDetail[i * 3 + 1] = data[i * 4 + 2]!;
      this.rockDetail[i * 3 + 2] = data[i * 4 + 3]!;
    }
    const did = before - this.cursor;
    this.cursor = before;
    if (this.cursor >= this.points) {
      this.phase = 1;
      this.cursor = 0;
    }
    // Auch ein Durchlauf ohne neue Abtastung (alles im Zwischenspeicher) darf
    // die Schleife nicht anhalten.
    return Math.max(did, 1);
  }

  /**
   * Flaechennormalen auf die Ecken haeufen — dieselbe Rechnung wie
   * `BufferGeometry.computeVertexNormals`, aber direkt auf den typisierten
   * Feldern und in derselben Reihenfolge.
   */
  private accumulate(budget: number): number {
    const index = this.sphere.index;
    const faces = index.length / 3;
    const end = Math.min(faces, this.cursor + budget);
    const pos = this.position;
    const nrm = this.normal;
    for (let f = this.cursor; f < end; f++) {
      const a = index[f * 3]! * 3;
      const b = index[f * 3 + 1]! * 3;
      const c = index[f * 3 + 2]! * 3;
      const abx = pos[b]! - pos[a]!;
      const aby = pos[b + 1]! - pos[a + 1]!;
      const abz = pos[b + 2]! - pos[a + 2]!;
      const acx = pos[c]! - pos[a]!;
      const acy = pos[c + 1]! - pos[a + 1]!;
      const acz = pos[c + 2]! - pos[a + 2]!;
      const nx = aby * acz - abz * acy;
      const ny = abz * acx - abx * acz;
      const nz = abx * acy - aby * acx;
      nrm[a] += nx; nrm[a + 1] += ny; nrm[a + 2] += nz;
      nrm[b] += nx; nrm[b + 1] += ny; nrm[b + 2] += nz;
      nrm[c] += nx; nrm[c + 1] += ny; nrm[c + 2] += nz;
    }
    const did = end - this.cursor;
    this.cursor = end;
    if (this.cursor >= faces) {
      this.phase = 2;
      this.cursor = 0;
    }
    return Math.max(did, 1);
  }

  private normalize(budget: number): number {
    const end = Math.min(this.points, this.cursor + budget);
    const nrm = this.normal;
    for (let i = this.cursor; i < end; i++) {
      const x = nrm[i * 3]!;
      const y = nrm[i * 3 + 1]!;
      const z = nrm[i * 3 + 2]!;
      const l = Math.sqrt(x * x + y * y + z * z) || 1;
      nrm[i * 3] = x / l;
      nrm[i * 3 + 1] = y / l;
      nrm[i * 3 + 2] = z / l;
    }
    const did = end - this.cursor;
    this.cursor = end;
    if (this.cursor >= this.points) this.phase = 3;
    return Math.max(did, 1);
  }
}
