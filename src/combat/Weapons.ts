import {
  AdditiveBlending,
  BoxGeometry,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  Quaternion,
  Vector3,
} from 'three';
import type { Object3D } from 'three';
import type { Asteroids } from '../world/Asteroids';
import type { ImpactSink } from './Effects';

/**
 * Bordkanonen: zwei Muendungen an den Flanken, die abwechselnd feuern.
 *
 * Die Geschosse leben in **Weltkoordinaten** (nicht am Schiff), damit sie nach
 * dem Abfeuern stehen bleiben, wo sie hingehoeren, wenn das Schiff wegdreht.
 * Bei einer Floating-Origin-Verschiebung muessen sie deshalb mitwandern —
 * siehe {@link Weapons.shift}.
 */

export interface WeaponParams {
  /** Muendungsgeschwindigkeit relativ zum Schiff in m/s. */
  boltSpeed: number;
  /** Sekunden zwischen zwei Schuessen (ueber beide Kanonen). */
  fireInterval: number;
  /** Reichweite in Metern; danach verlischt das Geschoss. */
  range: number;
  /** Schaden je Treffer in Trefferpunkten. */
  damage: number;
  /**
   * Entfernung, in der sich die Schuesse beider Kanonen kreuzen. Ohne
   * Konvergenz laege der Einschlag immer neben dem Fadenkreuz.
   */
  convergence: number;
  /** Muendungen im Schiffssystem (Nase = -Z). */
  ports: Array<[number, number, number]>;
}

export const DEFAULT_WEAPON_PARAMS: WeaponParams = {
  boltSpeed: 1100,
  fireInterval: 0.14,
  range: 2600,
  damage: 1,
  convergence: 900,
  ports: [
    [-1.28, -0.15, -4.3],
    [1.28, -0.15, -4.3],
  ],
};

/**
 * Auswirkung von Bordschaden auf die Kanonen. Wie beim Flugmodell reine
 * Faktoren von aussen (siehe `systems/Systems.ts`), damit die Waffenlogik
 * nichts ueber Subsysteme wissen muss.
 */
export interface WeaponDamage {
  /** Faktor auf die Nachladezeit; 1 = heil. */
  reload: number;
  /** Wie viele Muendungen noch feuern; 0 = Totalausfall. */
  activeGuns: number;
}

/** Alles heil. */
export const NO_WEAPON_DAMAGE: WeaponDamage = { reload: 1, activeGuns: Infinity };

/** Maximal gleichzeitig fliegende Geschosse. */
const POOL_SIZE = 64;

/**
 * Laenge und Dicke eines Geschosses in Metern. Grosszuegig: die Schuesse
 * fliegen fast genau von der Kamera weg und werden dadurch stark verkuerzt —
 * ein duenner Strahl waere nach 100 m nur noch ein Pixel.
 */
const BOLT_LENGTH = 26;
const BOLT_WIDTH = 1.1;

interface Bolt {
  position: Vector3;
  velocity: Vector3;
  /** Restliche Flugstrecke in Metern; <= 0 = frei. */
  remaining: number;
}

const _matrix = new Matrix4();
const _quat = new Quaternion();
const _scale = new Vector3(1, 1, 1);
const _dir = new Vector3();
const _muzzle = new Vector3();
const _aim = new Vector3();
const _forward = new Vector3();
const _hidden = new Matrix4().makeScale(0, 0, 0);
const _up = new Vector3(0, 1, 0);

export class Weapons {
  readonly mesh: InstancedMesh<BoxGeometry, MeshBasicMaterial>;

  /** Zaehler fuer das HUD. */
  kills = 0;
  /** Zeit seit dem letzten Treffer in Sekunden (Trefferanzeige im HUD). */
  private sinceHit = Infinity;

  private readonly bolts: Bolt[] = [];
  private readonly params: WeaponParams;
  private damage: WeaponDamage = { ...NO_WEAPON_DAMAGE };
  private cooldown = 0;
  private nextPort = 0;
  private triggerHeld = false;

  constructor(
    private readonly asteroids: Asteroids,
    private readonly effects: ImpactSink,
    params: Partial<WeaponParams> = {},
  ) {
    this.params = { ...DEFAULT_WEAPON_PARAMS, ...params };

    // Laenglicher Quader entlang -Z, additiv und ohne Beleuchtung: mit Bloom
    // wird daraus ein Leuchtstrahl.
    const geometry = new BoxGeometry(BOLT_WIDTH, BOLT_WIDTH, BOLT_LENGTH);
    const material = new MeshBasicMaterial({
      color: 0x9dfcff,
      blending: AdditiveBlending,
      depthWrite: false,
      transparent: true,
    });
    this.mesh = new InstancedMesh(geometry, material, POOL_SIZE);
    this.mesh.name = 'Bolts';
    this.mesh.frustumCulled = false;

    for (let i = 0; i < POOL_SIZE; i++) {
      this.bolts.push({ position: new Vector3(), velocity: new Vector3(), remaining: 0 });
      this.mesh.setMatrixAt(i, _hidden);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  getParams(): Readonly<WeaponParams> {
    return this.params;
  }

  /** Schadensfaktoren setzen (siehe {@link WeaponDamage}). */
  setDamage(damage: Partial<WeaponDamage>): void {
    this.damage = { ...NO_WEAPON_DAMAGE, ...damage };
  }

  getDamage(): Readonly<WeaponDamage> {
    return this.damage;
  }

  /** Wie viele Muendungen aktuell feuern. */
  getActiveGuns(): number {
    return Math.max(0, Math.min(this.damage.activeGuns, this.params.ports.length));
  }

  /** Abzug halten (einmal pro Frame gesetzt). */
  setTrigger(held: boolean): void {
    this.triggerHeld = held;
  }

  /** Sekunden seit dem letzten Treffer — das HUD blendet danach den Marker ein. */
  getTimeSinceHit(): number {
    return this.sinceHit;
  }

  /**
   * Ein Physikschritt: nachladen, ggf. feuern, Geschosse bewegen und Treffer
   * aufloesen. `ship` liefert Position und Lage der Muendungen, `shipVelocity`
   * die Bahngeschwindigkeit, die das Geschoss mitbekommt.
   */
  update(dt: number, ship: Object3D, shipVelocity: Vector3): void {
    this.sinceHit += dt;
    this.cooldown -= dt;
    if (this.triggerHeld && this.cooldown <= 0 && this.getActiveGuns() > 0) {
      this.fire(ship, shipVelocity);
      this.cooldown = this.params.fireInterval * this.damage.reload;
    }

    for (let i = 0; i < this.bolts.length; i++) {
      const bolt = this.bolts[i]!;
      if (bolt.remaining <= 0) continue;

      // Einmal die Wurzel, nicht zweimal: bei bis zu 17 fliegenden Geschossen
      // und 120 Schritten je Sekunde sind das 2000 gesparte Wurzeln je Sekunde.
      const speed = bolt.velocity.length();
      const step = speed * dt;
      _dir.copy(bolt.velocity).divideScalar(Math.max(speed, 1e-6));

      const hit = this.asteroids.hitSegment(bolt.position, _dir, step);
      if (hit) {
        const destroyed = this.asteroids.damage(hit.index, this.params.damage);
        if (destroyed) {
          this.effects.spawnExplosion(hit.point, hit.radius, _dir.clone().multiplyScalar(3));
          this.kills++;
        } else {
          this.effects.spawnImpact(hit.point, Math.min(hit.radius, 6));
        }
        this.sinceHit = 0;
        this.retire(i, bolt);
        continue;
      }

      bolt.position.addScaledVector(bolt.velocity, dt);
      bolt.remaining -= step;
      if (bolt.remaining <= 0) {
        this.retire(i, bolt);
        continue;
      }
      this.writeMatrix(i, bolt);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
  }

  /** Alle fliegenden Geschosse um `offset` verschieben (Floating Origin). */
  shift(offset: Vector3): void {
    for (const bolt of this.bolts) {
      if (bolt.remaining > 0) bolt.position.sub(offset);
    }
  }

  // ------------------------------------------------------------------ intern

  private fire(ship: Object3D, shipVelocity: Vector3): void {
    const index = this.bolts.findIndex((bolt) => bolt.remaining <= 0);
    if (index < 0) return; // Pool erschoepft — lieber nichts als flackern

    // Bei ausgefallener Kanone wird nur noch aus den verbliebenen Muendungen
    // geschossen; der Wechsel laeuft dann eben ueber eine einzige.
    const port = this.params.ports[this.nextPort % this.getActiveGuns()]!;
    this.nextPort++;

    // Kein `ship.updateMatrixWorld()`: Three rekursiert dabei ueber den
    // *ganzen* Teilbaum — Innenraum-GLB, Aussenrumpf, Kanzelanzeige,
    // Frachtkisten, Kamera —, und zwar unabhaengig davon, ob sich etwas
    // geaendert hat. Die Muendung haengt starr am Schiff, ihre Weltlage ergibt
    // sich also direkt aus Lage und Drehung des Rigs. Ergebnis identisch.
    _muzzle
      .set(port[0], port[1], port[2])
      .applyQuaternion(ship.quaternion)
      .add(ship.position);

    // Zielpunkt auf der Nase in Konvergenzentfernung; beide Kanonen zielen
    // dorthin, damit die Schuesse am Fadenkreuz zusammenlaufen.
    _forward.set(0, 0, -1).applyQuaternion(ship.quaternion);
    _aim.copy(ship.position).addScaledVector(_forward, this.params.convergence);
    _dir.subVectors(_aim, _muzzle).normalize();

    const bolt = this.bolts[index]!;
    bolt.position.copy(_muzzle);
    bolt.velocity.copy(_dir).multiplyScalar(this.params.boltSpeed).add(shipVelocity);
    bolt.remaining = this.params.range;
    this.writeMatrix(index, bolt);

    this.effects.spawnImpact(_muzzle, 1.6);
  }

  private writeMatrix(index: number, bolt: Bolt): void {
    _dir.copy(bolt.velocity).normalize();
    // Der Quader zeigt entlang -Z; Standardachse fuer setFromUnitVectors.
    _quat.setFromUnitVectors(_forward.set(0, 0, -1), _dir);
    if (!Number.isFinite(_quat.x)) _quat.setFromAxisAngle(_up, 0);
    _matrix.compose(bolt.position, _quat, _scale);
    this.mesh.setMatrixAt(index, _matrix);
  }

  private retire(index: number, bolt: Bolt): void {
    bolt.remaining = 0;
    this.mesh.setMatrixAt(index, _hidden);
  }
}
