import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Points,
  PointsMaterial,
  Quaternion,
  RingGeometry,
  Vector3,
} from 'three';

/**
 * Was man von der Landung sieht, ausserhalb des Cockpits: der Landemarker auf
 * der anvisierten Stelle und der Staub, den das Aufsetzen aufwirbelt.
 *
 * Beides gehoert in die Weltschicht (WORLD_LAYER) — es liegt draussen auf dem
 * Fels und wird von Kanzelstreben und Rumpf verdeckt wie alles andere.
 */

const UP = new Vector3(0, 0, 1);

const COLORS = {
  'in-range': new Color(0x66eaff),
  cleared: new Color(0xffb347),
  descending: new Color(0xffb347),
} as const;

export type LandingMarkerMode = 'hidden' | 'in-range' | 'cleared' | 'descending';

/** Kleinster Ringdurchmesser in m — das Schiff ist rund 14 m lang. */
const MIN_RADIUS = 16;
/** Anteil der Entfernung, den der Ring aufspannt (~1,7 Grad). */
const ANGULAR = 0.03;
/** Hoehe der Peilnadel ueber dem Aufsetzpunkt in m. */
const BEACON = 70;

/**
 * Zielkreis auf der Oberflaeche, mit einer Nadel entlang der Flaechennormalen.
 *
 * Der Ring liegt flach auf dem Fels und zeigt, *wo* aufgesetzt wird; die Nadel
 * zeigt, *wie steil* — ohne sie ist aus der Ferne nicht zu sehen, auf welcher
 * Flanke des Brockens der Punkt liegt.
 */
export class LandingMarker extends Object3D {
  private readonly ring: Mesh<RingGeometry, MeshBasicMaterial>;
  private readonly needle: LineSegments<BufferGeometry, LineBasicMaterial>;
  private readonly orientation = new Quaternion();
  private pulse = 0;

  constructor() {
    super();
    this.name = 'LandingMarker';
    this.frustumCulled = false;

    this.ring = new Mesh(
      new RingGeometry(0.82, 1, 56),
      new MeshBasicMaterial({ transparent: true, depthWrite: false, toneMapped: false }),
    );
    this.ring.frustumCulled = false;
    this.ring.renderOrder = 4;

    // Nadel als eigenes Segment, damit sie nicht mit dem Ring skaliert: der
    // Ring waechst mit der Entfernung, die Nadel bleibt eine feste Hoehe.
    const geometry = new BufferGeometry();
    geometry.setAttribute(
      'position',
      new BufferAttribute(new Float32Array([0, 0, 0, 0, 0, BEACON]), 3),
    );
    this.needle = new LineSegments(
      geometry,
      new LineBasicMaterial({ transparent: true, depthWrite: false, toneMapped: false }),
    );
    this.needle.frustumCulled = false;
    this.needle.renderOrder = 4;

    this.add(this.ring, this.needle);
    this.visible = false;
  }

  /**
   * Marker setzen. `point` ist der Aufsetzpunkt, `normal` die Flaechennormale,
   * `distance` die Entfernung zum Schiff (bestimmt die Groesse).
   */
  update(
    dt: number,
    mode: LandingMarkerMode,
    point: Vector3,
    normal: Vector3,
    distance: number,
  ): void {
    if (mode === 'hidden') {
      this.visible = false;
      return;
    }
    this.visible = true;

    this.pulse += dt;
    const color = COLORS[mode];
    // Der Ring liegt in der XY-Ebene, seine Normale ist +Z.
    this.orientation.setFromUnitVectors(UP, normal);
    this.quaternion.copy(this.orientation);
    // Eine Handbreit ueber dem Fels, sonst kaempft er mit dessen Oberflaeche
    // um dieselben Tiefenwerte und flimmert.
    this.position.copy(point).addScaledVector(normal, 0.6);

    const radius = Math.max(MIN_RADIUS, distance * ANGULAR);
    this.ring.scale.set(radius, radius, 1);

    // Im Sinkflug schlaegt der Puls schneller — der Marker zaehlt herunter.
    const rate = mode === 'descending' ? 5 : 2.2;
    const beat = 0.55 + 0.45 * Math.sin(this.pulse * rate);
    this.ring.material.color.copy(color);
    this.ring.material.opacity = mode === 'in-range' ? 0.45 * beat + 0.2 : 0.55 * beat + 0.35;
    this.needle.material.color.copy(color);
    this.needle.material.opacity = this.ring.material.opacity * 0.6;
  }

  dispose(): void {
    this.ring.geometry.dispose();
    this.ring.material.dispose();
    this.needle.geometry.dispose();
    this.needle.material.dispose();
  }
}

/** Wie viele Staubkoerner der Aufsetzstoss hochwirbelt. */
const DUST_COUNT = 220;
/** Lebensdauer eines Korns in s. */
const DUST_LIFE = 3.2;

/**
 * Staubfahne beim Aufsetzen.
 *
 * Die Koerner leben im **lokalen System des Aufsetzpunktes**: die Gruppe wird
 * jeden Frame auf die verankerte Pose gesetzt, die Koerner rechnen darin. Ohne
 * das zieht der driftende Brocken unter der Wolke weg und der Staub bleibt als
 * Fleck im Raum stehen.
 *
 * Ohne Luft faellt nichts zurueck — die Koerner steigen flach nach aussen und
 * verlieren nur an Helligkeit. Genau das sieht nach Vakuum aus.
 */
export class LandingDust extends Object3D {
  private readonly points: Points<BufferGeometry, PointsMaterial>;
  private readonly positions: Float32Array;
  private readonly velocities: Float32Array;
  private readonly ages: Float32Array;
  private alive = 0;

  constructor() {
    super();
    this.name = 'LandingDust';
    this.frustumCulled = false;

    this.positions = new Float32Array(DUST_COUNT * 3);
    this.velocities = new Float32Array(DUST_COUNT * 3);
    this.ages = new Float32Array(DUST_COUNT);

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(this.positions, 3));
    this.points = new Points(
      geometry,
      new PointsMaterial({
        color: 0xbfae94,
        size: 0.9,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: AdditiveBlending,
        toneMapped: false,
      }),
    );
    this.points.frustumCulled = false;
    this.add(this.points);
    this.visible = false;
  }

  /**
   * Stoss ausloesen. `strength` 0..1 skaliert Menge und Geschwindigkeit — ein
   * weiches Aufsetzen staubt weniger als ein hartes.
   */
  burst(strength = 1): void {
    const s = Math.min(Math.max(strength, 0.2), 1);
    this.alive = Math.round(DUST_COUNT * s);
    for (let i = 0; i < this.alive; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 3.5;
      // Start knapp unter der Rumpfunterkante, ringfoermig um den Aufsetzpunkt.
      this.positions[i * 3] = Math.cos(angle) * radius;
      this.positions[i * 3 + 1] = -0.4;
      this.positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Flach nach aussen, mit einem leichten Aufwaertsanteil.
      const speed = (1.5 + Math.random() * 5.5) * s;
      this.velocities[i * 3] = Math.cos(angle) * speed;
      this.velocities[i * 3 + 1] = (0.4 + Math.random() * 1.6) * s;
      this.velocities[i * 3 + 2] = Math.sin(angle) * speed;

      this.ages[i] = Math.random() * 0.25;
    }
    this.visible = this.alive > 0;
    this.points.material.opacity = 0.85;
  }

  update(dt: number): void {
    if (this.alive === 0) return;

    let oldest = 0;
    for (let i = 0; i < this.alive; i++) {
      this.ages[i]! += dt;
      oldest = Math.max(oldest, this.ages[i]!);
      // Leichte Bremsung: die groberen Koerner sacken zurueck auf die Flaeche.
      const drag = 1 - 0.45 * dt;
      for (let a = 0; a < 3; a++) {
        this.velocities[i * 3 + a]! *= drag;
        this.positions[i * 3 + a]! += this.velocities[i * 3 + a]! * dt;
      }
    }

    const life = Math.min(oldest / DUST_LIFE, 1);
    this.points.material.opacity = 0.85 * (1 - life) * (1 - life);
    this.points.geometry.attributes['position']!.needsUpdate = true;

    if (life >= 1) {
      this.alive = 0;
      this.visible = false;
    }
  }

  dispose(): void {
    this.points.geometry.dispose();
    this.points.material.dispose();
  }
}
