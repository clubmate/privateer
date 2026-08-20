import {
  BoxGeometry,
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PointLight,
  Quaternion,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from 'three';
import type { BufferGeometry, Material } from 'three';
import { makeRng } from './noise';
import { ApproachMarker } from './ApproachMarker';

/**
 * Prozeduraler Handelsposten, rund 400 m gross.
 *
 * Stilrichtung wie der Innenraum: benutzter Frachtposten, nicht Hochglanz —
 * verwitterte Bleche in drei Grautoenen, Rostflecken, angeflanschte Container,
 * sichtbare Streben. Fuer die Lesbarkeit auf Entfernung sorgen drei Dinge:
 * blinkende Positionslichter (rot backbord, gruen steuerbord), ein von innen
 * beleuchtetes Andockmaul und viel Kleinkram — Streben, Antennen, Fenster —,
 * an dem das Auge die Groesse abschaetzen kann.
 *
 * Aufbau im Lokalsystem: der Kern steht entlang **+Y**, das Andockmaul oeffnet
 * nach **+Z**. {@link placeAt} dreht die Station so, dass das Maul grob zum
 * Startpunkt zeigt.
 */

/** Umlaufdauer des Wohnrings in Sekunden (~4 Minuten). */
const RING_PERIOD = 240;

/** Halber Durchmesser fuer Sichtbarkeitsrechnungen, in m. */
const STATION_RADIUS = 200;

/** Bucht: Maul bei z = 102, Rueckwand bei z = 22, Boden bei y = 40. */
const BAY_CENTER_Y = 62;
const BAY_MOUTH_Z = 102;
const BAY_BACK_Z = 22;
const BAY_HALF_W = 32;
const BAY_FLOOR_Y = 40;

/** Liegeplatz des Schiffs in der Bucht. */
const DOCK_LOCAL = new Vector3(0, 46, 70);

export interface StationInfo {
  name: string;
  sector: string;
  bay: string;
}

const DEFAULT_INFO: StationInfo = {
  name: 'MERIDIAN-7',
  sector: 'TRIDENT-RAND',
  bay: 'C-3',
};

// Einheitsgeometrien, ueber die Skalierung der Meshes wiederverwendet — die
// Station besteht aus gut 150 Teilen, eigene Geometrien waeren Verschwendung.
const UNIT_BOX = new BoxGeometry(1, 1, 1);
const UNIT_CYL = new CylinderGeometry(1, 1, 1, 16);
const UNIT_ROD = new CylinderGeometry(1, 1, 1, 6);
const UNIT_SPHERE = new SphereGeometry(1, 12, 8);

function material(color: number, roughness: number, metalness: number): MeshStandardMaterial {
  return new MeshStandardMaterial({ color, roughness, metalness });
}

/** Leuchtflaechen umgehen das Tonemapping, damit sie sicher ins Bloom laufen. */
function lamp(color: number, opacity = 1): MeshBasicMaterial {
  return new MeshBasicMaterial({
    color,
    toneMapped: false,
    transparent: opacity < 1,
    opacity,
  });
}

const MAT = {
  plate: material(0x6d675c, 0.85, 0.35),
  plateDark: material(0x3c3934, 0.9, 0.3),
  plateLight: material(0x8d8677, 0.78, 0.4),
  rust: material(0x77492e, 0.95, 0.15),
  steel: material(0x9a968c, 0.45, 0.9),
  solar: material(0x16213c, 0.3, 0.7),
  glowAmber: lamp(0xffa64d),
  glowAmberSoft: lamp(0xd9822b, 0.55),
  glowGreen: lamp(0x35ff86),
  glowRed: lamp(0xff2f22),
  glowWhite: lamp(0xfff3dd),
  window: lamp(0xffca7a, 0.9),
};

interface Beacon {
  object: Object3D;
  period: number;
  phase: number;
  /** Anteil der Periode, in dem das Licht an ist. */
  duty: number;
}

interface GuideLight {
  object: Object3D;
  /** Position in der Lauflichtkette, 0 = am Maul. */
  index: number;
}

function add(
  parent: Object3D,
  geometry: BufferGeometry,
  mat: Material,
  size: readonly [number, number, number],
  pos: readonly [number, number, number],
  rot?: readonly [number, number, number],
): Mesh {
  const mesh = new Mesh(geometry, mat);
  mesh.scale.set(size[0], size[1], size[2]);
  mesh.position.set(pos[0], pos[1], pos[2]);
  if (rot) mesh.rotation.set(rot[0], rot[1], rot[2]);
  parent.add(mesh);
  return mesh;
}

/** Kasten mit Kantenlaengen w/h/d. */
function box(
  parent: Object3D,
  mat: Material,
  size: readonly [number, number, number],
  pos: readonly [number, number, number],
  rot?: readonly [number, number, number],
): Mesh {
  return add(parent, UNIT_BOX, mat, size, pos, rot);
}

/** Zylinder entlang Y, Radius r, Hoehe h. */
function cyl(
  parent: Object3D,
  mat: Material,
  r: number,
  h: number,
  pos: readonly [number, number, number],
  rot?: readonly [number, number, number],
): Mesh {
  return add(parent, UNIT_CYL, mat, [r, h, r], pos, rot);
}

/** Duenne Strebe zwischen zwei Punkten — der Groessenmassstab der Station. */
function strut(parent: Object3D, mat: Material, a: Vector3, b: Vector3, radius: number): Mesh {
  const mesh = new Mesh(UNIT_ROD, mat);
  const length = a.distanceTo(b);
  mesh.scale.set(radius, length, radius);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  // Der Stab steht entlang +Y; ihn auf die Verbindungsachse drehen.
  mesh.quaternion.setFromUnitVectors(
    _up,
    _tmp.copy(b).sub(a).divideScalar(length || 1),
  );
  parent.add(mesh);
  return mesh;
}

const _up = new Vector3(0, 1, 0);
const _tmp = new Vector3();

export class Station extends Object3D {
  readonly info: StationInfo;
  /** Liegeplatz: -Z zeigt in die Bucht hinein, +Z ist die Einflugachse. */
  readonly dockPoint: Object3D;
  /** Klammer im Raum, die die Station im Anflug markiert. */
  readonly marker: ApproachMarker;
  readonly radius = STATION_RADIUS;

  private readonly ring = new Object3D();
  private readonly beacons: Beacon[] = [];
  private readonly guides: GuideLight[] = [];
  private readonly bayLight: PointLight;
  private time = 0;

  constructor(info: Partial<StationInfo> = {}, seed = 8231) {
    super();
    this.name = 'Station';
    this.info = { ...DEFAULT_INFO, ...info };
    const rng = makeRng(seed);

    this.buildCore(rng);
    this.buildRing(rng);
    this.buildArms(rng);
    this.buildSolar();
    this.buildMast();
    this.bayLight = this.buildBay();
    this.add(this.ring);

    // Der Liegeplatz uebernimmt die Lage der Station: seine Nase (-Z) zeigt
    // damit zur Rueckwand der Bucht, seine +Z-Achse zum Maul hinaus. Genau so
    // liest {@link getDockAxis} die Einflugachse.
    this.dockPoint = new Object3D();
    this.dockPoint.name = 'DockPoint';
    this.dockPoint.position.copy(DOCK_LOCAL);
    this.add(this.dockPoint);

    this.marker = new ApproachMarker();
    this.marker.position.set(0, BAY_CENTER_Y * 0.35, 0);
    this.add(this.marker);
  }

  /**
   * Station absetzen und so drehen, dass das Andockmaul (+Z) grob zum Ursprung
   * zeigt — der Pilot startet dort. `yawOffsetDeg` dreht sie davon weg, damit
   * der Anflug nicht wie auf Schienen gerade aus dem Stand gelingt.
   */
  placeAt(position: Vector3, yawOffsetDeg = 0): this {
    this.position.copy(position);
    _tmp.copy(position).negate();
    _tmp.y = 0;
    if (_tmp.lengthSq() < 1e-6) _tmp.set(0, 0, 1);
    _tmp.normalize();
    const yaw = Math.atan2(_tmp.x, _tmp.z) + (yawOffsetDeg * Math.PI) / 180;
    // Leichte Schraeglage: exakt achsparallel sieht nach Editor aus.
    this.rotation.set(0.07, yaw, -0.05);
    this.updateMatrixWorld(true);
    return this;
  }

  /**
   * Alle Teile auf einen Renderlayer legen. Das Buchtlicht ist die Ausnahme —
   * ein Licht beleuchtet in Three nur, was seine Layer teilt, und es soll auch
   * durch die Kanzel in den Innenraum fallen (Layer 0).
   */
  setLayer(layer: number): void {
    this.traverse((child) => child.layers.set(layer));
    this.bayLight.layers.enableAll();
  }

  /** Ringrotation, Blinklichter, Lauflicht in der Bucht. */
  update(dt: number): void {
    this.time += dt;
    this.ring.rotation.y = ((this.time / RING_PERIOD) % 1) * Math.PI * 2;

    for (const beacon of this.beacons) {
      const t = ((this.time + beacon.phase) % beacon.period) / beacon.period;
      beacon.object.visible = t < beacon.duty;
    }

    // Lauflicht laeuft ins Maul hinein — es zeigt die Einflugrichtung an.
    const steps = 8;
    const head = (this.time * 3.4) % (steps + 2.5);
    for (const guide of this.guides) {
      guide.object.visible = Math.abs(head - guide.index) < 1.1;
    }
  }

  /** Floating Origin. */
  shift(offset: Vector3): void {
    this.position.sub(offset);
  }

  /**
   * Liegeplatz in Weltkoordinaten. Die Matrixkette wird selbst nachgezogen —
   * die Abfrage laeuft vor `scene.updateMatrixWorld()`, und nach einem
   * Floating-Origin-Sprung waere der alte Wert um Kilometer daneben.
   */
  getDockPosition(out: Vector3): Vector3 {
    this.dockPoint.updateWorldMatrix(true, false);
    return out.setFromMatrixPosition(this.dockPoint.matrixWorld);
  }

  /** Lage, die das Schiff im Liegeplatz einnimmt. */
  getDockQuaternion(out: Quaternion): Quaternion {
    return this.dockPoint.getWorldQuaternion(out);
  }

  /** Einflugachse in Weltkoordinaten: zeigt aus der Bucht heraus. */
  getDockAxis(out: Vector3): Vector3 {
    return out.set(0, 0, 1).applyQuaternion(this.dockPoint.getWorldQuaternion(_quat)).normalize();
  }

  /** Hochachse der Bucht — Rollreferenz fuer den Autopiloten. */
  getDockUp(out: Vector3): Vector3 {
    return out.set(0, 1, 0).applyQuaternion(this.dockPoint.getWorldQuaternion(_quat)).normalize();
  }

  // ------------------------------------------------------------------ Bau

  /** Kern: drei gestapelte Trommeln mit Kraegen, Rippen und Fensterreihen. */
  private buildCore(rng: () => number): void {
    const core = new Object3D();
    core.name = 'Core';
    this.add(core);

    cyl(core, MAT.plate, 24, 92, [0, -74, 0]);
    cyl(core, MAT.plateDark, 28, 68, [0, 0, 0]);
    cyl(core, MAT.plate, 22, 92, [0, 74, 0]);

    // Kraege an den Stossstellen — verstecken die Naht und geben Massstab.
    for (const [y, r] of [
      [-120, 25],
      [-28, 26],
      [28, 29],
      [120, 23],
    ] as const) {
      const collar = new Mesh(new TorusGeometry(r, 2.6, 6, 24), MAT.steel);
      collar.position.set(0, y, 0);
      collar.rotation.x = Math.PI / 2;
      core.add(collar);
    }

    // Laengsrippen aussen auf der mittleren Trommel.
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      box(core, MAT.steel, [2.5, 66, 5], [Math.sin(a) * 29, 0, Math.cos(a) * 29], [0, a, 0]);
    }

    // Verwitterung: einzelne Platten in abweichendem Ton, rostige Streifen.
    for (let i = 0; i < 16; i++) {
      const a = rng() * Math.PI * 2;
      const y = (rng() * 2 - 1) * 110;
      const r = Math.abs(y) < 34 ? 28.4 : 24.4;
      const mat = rng() < 0.35 ? MAT.rust : rng() < 0.5 ? MAT.plateLight : MAT.plateDark;
      box(
        core,
        mat,
        [6 + rng() * 12, 5 + rng() * 16, 1],
        [Math.sin(a) * r, y, Math.cos(a) * r],
        [0, a, 0],
      );
    }

    // Fensterreihen: der wichtigste Massstabsgeber. Ein Fenster ist ~1,4 m.
    for (let row = 0; row < 3; row++) {
      const y = -96 + row * 18;
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 2 + row * 0.08;
        if (rng() < 0.25) continue; // dunkle Kabinen
        box(
          core,
          MAT.window,
          [1.4, 2.4, 0.6],
          [Math.sin(a) * 24.3, y, Math.cos(a) * 24.3],
          [0, a, 0],
        );
      }
    }

    // Frachtcontainer an den Kern geklammert.
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + 0.4;
      const y = -40 + rng() * 40;
      const mat = rng() < 0.4 ? MAT.plateLight : rng() < 0.5 ? MAT.rust : MAT.plate;
      const depth = 16 + rng() * 14;
      box(core, mat, [11, 11, depth], [Math.sin(a) * 36, y, Math.cos(a) * 36], [0, a, 0]);
      box(core, MAT.steel, [1.6, 13, 1.6], [Math.sin(a) * 31, y, Math.cos(a) * 31], [0, a, 0]);
    }
  }

  /** Wohnring auf vier Speichen, dreht sich langsam um den Kern. */
  private buildRing(rng: () => number): void {
    this.ring.name = 'HabitatRing';
    this.ring.position.y = -34;

    const torus = new Mesh(new TorusGeometry(150, 11, 8, 64), MAT.plate);
    torus.rotation.x = Math.PI / 2;
    this.ring.add(torus);

    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const dir = new Vector3(Math.sin(a), 0, Math.cos(a));
      // Speiche als Kasten plus zwei Zugstreben — sieht nach Fachwerk aus.
      box(
        this.ring,
        MAT.plateDark,
        [7, 7, 120],
        [dir.x * 90, 0, dir.z * 90],
        [0, a, 0],
      );
      for (const side of [-1, 1]) {
        strut(
          this.ring,
          MAT.steel,
          new Vector3(dir.x * 30, side * 9, dir.z * 30),
          new Vector3(dir.x * 142, 0, dir.z * 142),
          1.3,
        );
      }
    }

    // Wohnmodule auf dem Ring, jedes mit Fensterband.
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + 0.15;
      const dir = new Vector3(Math.sin(a), 0, Math.cos(a));
      const outward = 150;
      box(
        this.ring,
        i % 3 === 0 ? MAT.plateLight : MAT.plate,
        [26, 15, 15],
        [dir.x * outward, 9, dir.z * outward],
        [0, a, 0],
      );
      for (let w = -1; w <= 1; w++) {
        if (rng() < 0.2) continue;
        box(
          this.ring,
          MAT.window,
          [5, 2, 0.6],
          [dir.x * (outward + 7.8) + Math.cos(a) * w * 7, 9, dir.z * (outward + 7.8) - Math.sin(a) * w * 7],
          [0, a, 0],
        );
      }
    }
  }

  /** Andockarme quer zum Kern, mit Klammern, Containern und Navlichtern. */
  private buildArms(rng: () => number): void {
    const arms = new Object3D();
    arms.name = 'DockingArms';
    arms.position.y = 24;
    this.add(arms);

    for (const side of [-1, 1] as const) {
      const tip = side * 168;
      box(arms, MAT.plateDark, [148, 8, 10], [side * 96, 0, 0]);
      // Fachwerk unter dem Ausleger.
      for (let i = 0; i < 5; i++) {
        const x0 = side * (30 + i * 28);
        const x1 = side * (30 + (i + 1) * 28);
        strut(arms, MAT.steel, new Vector3(x0, -4, 0), new Vector3(x1, -16, 0), 1.1);
        strut(arms, MAT.steel, new Vector3(x1, -4, 0), new Vector3(x0, -16, 0), 1.1);
      }
      box(arms, MAT.steel, [8, 26, 8], [side * 100, -14, 0]);

      // Klammer am Ende: zwei Backen, dazwischen liegt ein Frachter.
      for (const z of [-15, 15]) {
        box(arms, MAT.plate, [26, 6, 7], [tip, 0, z]);
        box(arms, MAT.steel, [6, 14, 5], [tip, 8, z]);
      }
      // Angeklammerte Container.
      for (let i = 0; i < 3; i++) {
        const mat = rng() < 0.4 ? MAT.rust : rng() < 0.5 ? MAT.plateLight : MAT.plateDark;
        box(arms, mat, [12, 12, 24], [side * (60 + i * 30), 13, rng() * 10 - 5]);
      }

      // Positionslichter: rot backbord (-X), gruen steuerbord (+X).
      const lampMat = side < 0 ? MAT.glowRed : MAT.glowGreen;
      const light = new Object3D();
      light.position.set(tip + side * 8, 0, 0);
      arms.add(light);
      add(light, UNIT_SPHERE, lampMat, [3, 3, 3], [0, 0, 0]);
      add(light, UNIT_SPHERE, side < 0 ? lamp(0xff2f22, 0.18) : lamp(0x35ff86, 0.18), [9, 9, 9], [0, 0, 0]);
      this.beacons.push({
        object: light,
        period: side < 0 ? 2.4 : 1.9,
        phase: side < 0 ? 0 : 0.6,
        duty: 0.3,
      });
    }
  }

  /** Solarfluegel unten am Kern — grosse ruhige Flaechen gegen den Kleinkram. */
  private buildSolar(): void {
    const wings = new Object3D();
    wings.name = 'SolarWings';
    wings.position.y = -118;
    this.add(wings);

    for (const side of [-1, 1] as const) {
      box(wings, MAT.steel, [110, 3, 3], [side * 78, 0, 0]);
      for (const z of [-30, 30] as const) {
        const panel = new Object3D();
        panel.position.set(side * 104, 0, z);
        panel.rotation.z = side * 0.22;
        wings.add(panel);
        box(panel, MAT.solar, [88, 0.8, 44], [0, 0, 0]);
        box(panel, MAT.steel, [90, 1.6, 2], [0, 0, 22]);
        box(panel, MAT.steel, [90, 1.6, 2], [0, 0, -22]);
        // Zellenteilung: drei Fugen laengs, damit die Flaeche nicht tot wirkt.
        for (const x of [-22, 0, 22]) box(panel, MAT.plateDark, [1.5, 1.2, 44], [x, 0, 0]);
        strut(
          wings,
          MAT.steel,
          new Vector3(side * 62, 0, 0),
          new Vector3(side * 96, 0, z * 0.9),
          1.2,
        );
      }
    }
  }

  /** Mast mit Antennen, Schuessel und Blitzlicht ganz oben. */
  private buildMast(): void {
    const mast = new Object3D();
    mast.name = 'Mast';
    mast.position.y = 120;
    this.add(mast);

    cyl(mast, MAT.steel, 2.5, 46, [0, 23, 0]);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      strut(
        mast,
        MAT.steel,
        new Vector3(Math.sin(a) * 12, 0, Math.cos(a) * 12),
        new Vector3(0, 34, 0),
        0.7,
      );
      box(mast, MAT.steel, [0.8, 14, 0.8], [Math.sin(a) * 6, 40, Math.cos(a) * 6], [0.3, a, 0]);
    }

    // Parabolschuessel, leicht angestellt.
    const dish = new Mesh(new SphereGeometry(15, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.32), MAT.plateLight);
    dish.position.set(26, 6, 0);
    dish.rotation.set(0.9, 0, -0.6);
    mast.add(dish);
    cyl(mast, MAT.steel, 1.2, 20, [17, 2, 0], [0, 0, -0.7]);

    // Doppelblitz oben: zwei Lampen am selben Ort, leicht versetzt getaktet.
    for (const phase of [0, 0.16]) {
      const strobe = new Object3D();
      strobe.position.set(0, 48, 0);
      mast.add(strobe);
      add(strobe, UNIT_SPHERE, MAT.glowWhite, [2.4, 2.4, 2.4], [0, 0, 0]);
      add(strobe, UNIT_SPHERE, lamp(0xfff3dd, 0.16), [8, 8, 8], [0, 0, 0]);
      this.beacons.push({ object: strobe, period: 2.8, phase, duty: 0.03 });
    }
  }

  /**
   * Das Andockmaul: von innen beleuchtete Bucht mit Lauflicht, Randbefeuerung
   * und einer Liegeplatte. Die Leuchtflaeche an der Rueckwand ist das, was man
   * kilometerweit sieht — sie macht aus dem grauen Kasten ein Ziel.
   */
  private buildBay(): PointLight {
    const bay = new Object3D();
    bay.name = 'DockingBay';
    this.add(bay);

    const z = (BAY_MOUTH_Z + BAY_BACK_Z) / 2;
    const depth = BAY_MOUTH_Z - BAY_BACK_Z;
    const roofY = BAY_FLOOR_Y + 44;

    box(bay, MAT.plate, [72, 5, depth], [0, BAY_FLOOR_Y - 2.5, z]);
    box(bay, MAT.plate, [72, 5, depth], [0, roofY + 2.5, z]);
    box(bay, MAT.plateDark, [5, 49, depth], [-BAY_HALF_W - 2.5, BAY_CENTER_Y, z]);
    box(bay, MAT.plateDark, [5, 49, depth], [BAY_HALF_W + 2.5, BAY_CENTER_Y, z]);
    box(bay, MAT.plate, [72, 49, 5], [0, BAY_CENTER_Y, BAY_BACK_Z - 2.5]);

    // Leuchtende Rueckwand plus zwei Streifen an den Seitenwaenden.
    box(bay, MAT.glowAmber, [54, 32, 0.8], [0, BAY_CENTER_Y, BAY_BACK_Z + 0.6]);
    box(bay, MAT.plateDark, [58, 4, 1.2], [0, BAY_CENTER_Y + 18, BAY_BACK_Z + 1.2]);
    for (const side of [-1, 1] as const) {
      box(bay, MAT.glowAmberSoft, [0.8, 26, depth - 12], [side * (BAY_HALF_W - 0.6), BAY_CENTER_Y + 4, z]);
    }

    // Aufgestellte Lippen am Maul — fangen das Licht und weisen den Weg hinein.
    box(bay, MAT.plateLight, [76, 4, 26], [0, roofY + 8, BAY_MOUTH_Z + 10], [-0.34, 0, 0]);
    box(bay, MAT.plateLight, [76, 4, 26], [0, BAY_FLOOR_Y - 8, BAY_MOUTH_Z + 10], [0.34, 0, 0]);
    for (const side of [-1, 1] as const) {
      box(
        bay,
        MAT.plateLight,
        [4, 52, 26],
        [side * (BAY_HALF_W + 9), BAY_CENTER_Y, BAY_MOUTH_Z + 10],
        [0, -side * 0.34, 0],
      );
    }

    // Randbefeuerung: gruen an den Seiten, rot ueber dem Maul.
    for (let i = 0; i < 5; i++) {
      const t = -1 + (i / 4) * 2;
      for (const side of [-1, 1] as const) {
        const rim = new Object3D();
        rim.position.set(side * (BAY_HALF_W + 4), BAY_CENTER_Y + t * 22, BAY_MOUTH_Z + 2);
        bay.add(rim);
        add(rim, UNIT_SPHERE, MAT.glowGreen, [1.5, 1.5, 1.5], [0, 0, 0]);
        this.beacons.push({ object: rim, period: 1.6, phase: i * 0.05, duty: 0.55 });
      }
      const top = new Object3D();
      top.position.set(t * 26, roofY + 4, BAY_MOUTH_Z + 2);
      bay.add(top);
      add(top, UNIT_SPHERE, MAT.glowRed, [1.5, 1.5, 1.5], [0, 0, 0]);
      this.beacons.push({ object: top, period: 1.6, phase: 0.8 + i * 0.05, duty: 0.55 });
    }

    // Lauflicht am Boden, laeuft vom Maul zur Rueckwand.
    const steps = 8;
    for (let i = 0; i < steps; i++) {
      const gz = BAY_MOUTH_Z - 6 - (i / (steps - 1)) * (depth - 16);
      for (const side of [-1, 1] as const) {
        const guide = new Object3D();
        guide.position.set(side * (BAY_HALF_W - 5), BAY_FLOOR_Y + 0.6, gz);
        bay.add(guide);
        add(guide, UNIT_BOX, MAT.glowGreen, [4, 0.5, 2], [0, 0, 0]);
        this.guides.push({ object: guide, index: i });
      }
    }

    // Liegeplatte mit Klammern — hier steht das Schiff.
    box(bay, MAT.plateDark, [34, 3, 46], [0, BAY_FLOOR_Y + 1.5, DOCK_LOCAL.z - 4]);
    for (const side of [-1, 1] as const) {
      for (const dz of [-16, 16]) {
        box(bay, MAT.steel, [4, 7, 6], [side * 15, BAY_FLOOR_Y + 6, DOCK_LOCAL.z - 4 + dz]);
      }
      // Versorgungsarm, der von der Wand zur Liegeplatte greift.
      strut(
        bay,
        MAT.steel,
        new Vector3(side * (BAY_HALF_W - 1), BAY_CENTER_Y + 10, DOCK_LOCAL.z),
        new Vector3(side * 18, BAY_FLOOR_Y + 8, DOCK_LOCAL.z),
        1.4,
      );
    }

    // Buchtnummer als Balkenmuster ueber dem Maul — Massstab und Wiedererkennung.
    for (let i = 0; i < 3; i++) {
      box(bay, MAT.plateLight, [3, 12, 1], [-8 + i * 8, roofY + 12, BAY_MOUTH_Z - 1]);
    }

    // Ein Licht in der Bucht: es faellt beim Andocken durch die Kanzel und
    // taucht das Cockpit in warmes Licht.
    const light = new PointLight(0xffb069, 2600, 320, 2);
    light.position.set(0, BAY_CENTER_Y + 12, z);
    bay.add(light);
    return light;
  }
}

const _quat = new Quaternion();
