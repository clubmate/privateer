import { Euler, Quaternion, Vector3 } from 'three';
import type { Input } from '../core/Input';
import type { Ship } from '../ship/Ship';
import { ShipCollider, pushOutSphere } from './ShipCollider';

/** Augenhoehe ueber dem Fusspunkt (PLAN.md). */
export const EYE_HEIGHT = 1.7;
/** Radius des Kapsel-Colliders. */
export const CAPSULE_RADIUS = 0.3;

/** Tastenbelegung stehend (physische Codes, siehe PLAN.md). */
const KEYS = {
  forward: 'KeyW',
  back: 'KeyS',
  left: 'KeyA',
  right: 'KeyD',
} as const;

const WALK_SPEED = 2.5;
const ACCELERATION = 16;
const DECELERATION = 22;
const GRAVITY = 9.81;
const TERMINAL_SPEED = 20;
const MOUSE_SENSITIVITY = 0.0022; // rad pro Pixel
const PITCH_LIMIT = (89 * Math.PI) / 180;

/** Stuetzkugeln der Kapsel zwischen Fuss- und Kopfende. */
const SPHERE_COUNT = 5;
/** Iterationen der Penetrationsaufloesung pro Tick und Achsengruppe. */
const RESOLVE_ITERATIONS = 4;
/** Kleiner Zuschlag, damit man nicht an Flaechen kleben bleibt. */
const SKIN = 1e-4;

const _euler = new Euler(0, 0, 0, 'YXZ');

/**
 * First-Person-Controller **im Schiffslokalraum**: `position` ist der Fusspunkt
 * als lokale Koordinate unter dem Schiffs-Rig, Schwerkraft zeigt lokal nach -Y,
 * Boden ist `COL_Floor` bei y=0. Die Kamera haengt beim Gehen als Kind am Schiff
 * und macht damit alle Schiffsbewegungen ohne Nachziehen mit.
 *
 * Kollision: Kapsel (r=0,3 m, Fusspunkt bis 1,7 m) gegen die vorberechneten
 * OBBs der `COL_`-Meshes. Die Kapsel wird durch {@link SPHERE_COUNT} Kugeln
 * angenaehert; horizontale und vertikale Kontakte werden getrennt aufgeloest,
 * damit man an Waenden entlanggleitet und trotzdem sauber auf dem Boden steht.
 */
export class WalkController {
  /** Fusspunkt des Spielers im Schiffslokalraum. */
  readonly position = new Vector3();
  /** Geschwindigkeit im Schiffslokalraum (m/s). */
  readonly velocity = new Vector3();

  yaw = 0;
  pitch = 0;
  /** Steht der Spieler auf einer Flaeche? */
  grounded = false;

  private readonly collider = new ShipCollider();
  private readonly mouseDelta = { x: 0, y: 0 };
  private readonly push = new Vector3();
  private readonly sphere = new Vector3();
  private readonly sphereHeights: number[] = [];

  constructor(
    private readonly input: Input,
    private readonly ship: Ship,
  ) {
    const top = EYE_HEIGHT - CAPSULE_RADIUS;
    for (let i = 0; i < SPHERE_COUNT; i++) {
      const t = i / (SPHERE_COUNT - 1);
      this.sphereHeights.push(CAPSULE_RADIUS + t * (top - CAPSULE_RADIUS));
    }
  }

  /** OBBs aus `ship.getCollisionMeshes()` neu berechnen (nach Interiorwechsel). */
  rebuildCollision(): void {
    this.collider.rebuild(this.ship.getCollisionMeshes(), this.ship);
  }

  /** Anzahl der aktiven Kollisionsboxen (Diagnose/Tests). */
  get colliderCount(): number {
    return this.collider.obbs.length;
  }

  /** Spieler an einen Fusspunkt setzen und Blickrichtung uebernehmen. */
  reset(footPosition: Vector3, yaw: number, pitch = 0): void {
    this.position.copy(footPosition);
    this.velocity.set(0, 0, 0);
    this.yaw = yaw;
    this.pitch = pitch;
    this.grounded = false;
  }

  /**
   * Umsehen. Muss **einmal pro Frame** laufen: die Mausdeltas werden pro Frame
   * eingesammelt und hier konsumiert.
   */
  updateLook(): void {
    this.input.consumeMouseDelta(this.mouseDelta);
    if (!this.input.pointerLocked) return;
    this.yaw -= this.mouseDelta.x * MOUSE_SENSITIVITY;
    this.pitch -= this.mouseDelta.y * MOUSE_SENSITIVITY;
    this.pitch = Math.min(Math.max(this.pitch, -PITCH_LIMIT), PITCH_LIMIT);
  }

  /** Bewegung + Kollision, laeuft im festen Physikschritt. */
  update(dt: number): void {
    this.integrateVelocity(dt);

    // Horizontal und vertikal getrennt bewegen und aufloesen: so gleitet man an
    // Waenden entlang, statt beim Kontakt komplett stehen zu bleiben.
    this.position.x += this.velocity.x * dt;
    this.position.z += this.velocity.z * dt;
    this.resolve(true);

    this.position.y += this.velocity.y * dt;
    this.grounded = false;
    this.resolve(false);
  }

  /** Augenpunkt im Schiffslokalraum. */
  getEyePosition(out: Vector3): Vector3 {
    return out.set(this.position.x, this.position.y + EYE_HEIGHT, this.position.z);
  }

  /** Blickrichtung als Quaternion im Schiffslokalraum. */
  getQuaternion(out: Quaternion): Quaternion {
    _euler.set(this.pitch, this.yaw, 0, 'YXZ');
    return out.setFromEuler(_euler);
  }

  // ------------------------------------------------------------- Bewegung

  private integrateVelocity(dt: number): void {
    const forward = (this.input.isDown(KEYS.forward) ? 1 : 0) - (this.input.isDown(KEYS.back) ? 1 : 0);
    const strafe = (this.input.isDown(KEYS.right) ? 1 : 0) - (this.input.isDown(KEYS.left) ? 1 : 0);

    // Blickrichtung horizontal projiziert: vorwaerts = -Z, rechts = +X (yaw=0).
    const sin = Math.sin(this.yaw);
    const cos = Math.cos(this.yaw);
    let wishX = -sin * forward + cos * strafe;
    let wishZ = -cos * forward - sin * strafe;
    const wishLength = Math.hypot(wishX, wishZ);
    if (wishLength > 1) {
      wishX /= wishLength;
      wishZ /= wishLength;
    }

    const targetX = wishX * WALK_SPEED;
    const targetZ = wishZ * WALK_SPEED;
    const rate = (wishLength > 0 ? ACCELERATION : DECELERATION) * dt;

    const dx = targetX - this.velocity.x;
    const dz = targetZ - this.velocity.z;
    const distance = Math.hypot(dx, dz);
    if (distance <= rate || distance === 0) {
      this.velocity.x = targetX;
      this.velocity.z = targetZ;
    } else {
      this.velocity.x += (dx / distance) * rate;
      this.velocity.z += (dz / distance) * rate;
    }

    this.velocity.y = Math.max(this.velocity.y - GRAVITY * dt, -TERMINAL_SPEED);
  }

  // ------------------------------------------------------------ Kollision

  /**
   * Penetrationen aufloesen. `horizontal = true` behandelt nur Kontakte, deren
   * kuerzester Fluchtweg seitlich zeigt (Waende, Moebel), `false` nur die
   * senkrechten (Boden, Decke).
   */
  private resolve(horizontal: boolean): void {
    const obbs = this.collider.obbs;
    if (obbs.length === 0) return;

    for (let iteration = 0; iteration < RESOLVE_ITERATIONS; iteration++) {
      let hit = false;

      // Broadphase-Huelle der Kapsel (aendert sich mit jeder Korrektur).
      const minX = this.position.x - CAPSULE_RADIUS;
      const maxX = this.position.x + CAPSULE_RADIUS;
      const minY = this.position.y;
      const maxY = this.position.y + EYE_HEIGHT;
      const minZ = this.position.z - CAPSULE_RADIUS;
      const maxZ = this.position.z + CAPSULE_RADIUS;

      for (const obb of obbs) {
        if (obb.max.x < minX || obb.min.x > maxX) continue;
        if (obb.max.y < minY || obb.min.y > maxY) continue;
        if (obb.max.z < minZ || obb.min.z > maxZ) continue;

        for (const height of this.sphereHeights) {
          this.sphere.set(this.position.x, this.position.y + height, this.position.z);
          if (!pushOutSphere(obb, this.sphere, CAPSULE_RADIUS, this.push)) continue;

          const ax = Math.abs(this.push.x);
          const ay = Math.abs(this.push.y);
          const az = Math.abs(this.push.z);
          const isVertical = ay >= ax && ay >= az;
          if (isVertical === horizontal) continue;

          hit = true;
          if (horizontal) {
            this.slideOut();
          } else {
            this.stepOut();
          }
        }
      }

      if (!hit) break;
    }
  }

  /** Seitlicher Kontakt: herausschieben und die Geschwindigkeit in die Wand kappen. */
  private slideOut(): void {
    const length = Math.hypot(this.push.x, this.push.z);
    if (length < 1e-9) return;
    const nx = this.push.x / length;
    const nz = this.push.z / length;

    this.position.x += nx * (length + SKIN);
    this.position.z += nz * (length + SKIN);

    const into = this.velocity.x * nx + this.velocity.z * nz;
    if (into < 0) {
      this.velocity.x -= into * nx;
      this.velocity.z -= into * nz;
    }
  }

  /** Senkrechter Kontakt: auf den Boden stellen bzw. an der Decke stoppen. */
  private stepOut(): void {
    this.position.y += this.push.y;
    if (this.push.y > 0) {
      this.grounded = true;
      if (this.velocity.y < 0) this.velocity.y = 0;
    } else if (this.velocity.y > 0) {
      this.velocity.y = 0;
    }
  }
}
