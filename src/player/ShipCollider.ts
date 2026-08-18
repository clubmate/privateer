import { Matrix4, Quaternion, Vector3 } from 'three';
import type { Mesh, Object3D } from 'three';

/**
 * Orientierte Box (OBB) im Schiffslokalraum. Wird einmal aus Geometrie-
 * BoundingBox + Objekttransform vorberechnet und danach nur noch gelesen —
 * die COL_-Meshes bewegen sich relativ zum Schiff nicht.
 */
export interface Obb {
  /** Mittelpunkt im Bezugsraum (Schiffslokalraum). */
  readonly center: Vector3;
  /** Halbe Kantenlaengen entlang `axes`. */
  readonly half: Vector3;
  /** Orthonormale Achsen der Box. */
  readonly axes: readonly [Vector3, Vector3, Vector3];
  /** Achsenparallele Huelle fuer die Broadphase. */
  readonly min: Vector3;
  readonly max: Vector3;
}

const _inv = new Matrix4();
const _mat = new Matrix4();
const _pos = new Vector3();
const _quat = new Quaternion();
const _scale = new Vector3();
const _delta = new Vector3();

/**
 * Sammlung der Kollisionsboxen eines Schiffs.
 *
 * Bewusst ohne Physik-Library: die `COL_`-Meshes sind einfache Quader, und die
 * Laufkollision braucht nur Kapsel-gegen-Box mit Penetrationsaufloesung.
 */
export class ShipCollider {
  private readonly boxes: Obb[] = [];

  get obbs(): readonly Obb[] {
    return this.boxes;
  }

  /**
   * Baut die OBBs neu auf. `reference` ist der Bezugsraum (das Schiffs-Rig),
   * `meshes` sind die COL_-Meshes daraus.
   */
  rebuild(meshes: readonly Mesh[], reference: Object3D): void {
    this.boxes.length = 0;
    reference.updateMatrixWorld(true);
    _inv.copy(reference.matrixWorld).invert();

    for (const mesh of meshes) {
      const geometry = mesh.geometry;
      if (!geometry.boundingBox) geometry.computeBoundingBox();
      const bounds = geometry.boundingBox;
      if (!bounds) continue;

      _mat.multiplyMatrices(_inv, mesh.matrixWorld);
      _mat.decompose(_pos, _quat, _scale);

      const center = bounds.getCenter(new Vector3()).applyMatrix4(_mat);
      const size = bounds.getSize(new Vector3());
      const half = new Vector3(
        (size.x * 0.5) * Math.abs(_scale.x),
        (size.y * 0.5) * Math.abs(_scale.y),
        (size.z * 0.5) * Math.abs(_scale.z),
      );
      const axes: [Vector3, Vector3, Vector3] = [
        new Vector3(1, 0, 0).applyQuaternion(_quat),
        new Vector3(0, 1, 0).applyQuaternion(_quat),
        new Vector3(0, 0, 1).applyQuaternion(_quat),
      ];

      // Achsenparallele Huelle: Projektion der drei Halbachsen auf x/y/z.
      const extent = new Vector3(
        Math.abs(axes[0].x) * half.x + Math.abs(axes[1].x) * half.y + Math.abs(axes[2].x) * half.z,
        Math.abs(axes[0].y) * half.x + Math.abs(axes[1].y) * half.y + Math.abs(axes[2].y) * half.z,
        Math.abs(axes[0].z) * half.x + Math.abs(axes[1].z) * half.y + Math.abs(axes[2].z) * half.z,
      );

      this.boxes.push({
        center,
        half,
        axes,
        min: center.clone().sub(extent),
        max: center.clone().add(extent),
      });
    }
  }
}

/**
 * Kugel gegen OBB. Liefert `true`, wenn sie sich durchdringen, und schreibt in
 * `out` den kuerzesten Vektor, der die Kugel wieder freistellt (Richtung: weg
 * von der Box, Laenge = Eindringtiefe).
 */
export function pushOutSphere(obb: Obb, center: Vector3, radius: number, out: Vector3): boolean {
  _delta.subVectors(center, obb.center);
  const lx = _delta.dot(obb.axes[0]);
  const ly = _delta.dot(obb.axes[1]);
  const lz = _delta.dot(obb.axes[2]);

  const cx = Math.min(Math.max(lx, -obb.half.x), obb.half.x);
  const cy = Math.min(Math.max(ly, -obb.half.y), obb.half.y);
  const cz = Math.min(Math.max(lz, -obb.half.z), obb.half.z);

  const dx = lx - cx;
  const dy = ly - cy;
  const dz = lz - cz;
  const distSq = dx * dx + dy * dy + dz * dz;

  if (distSq > 1e-12) {
    // Mittelpunkt ausserhalb: Richtung zum naechsten Punkt auf der Box.
    if (distSq >= radius * radius) return false;
    const dist = Math.sqrt(distSq);
    const depth = radius - dist;
    out.set(0, 0, 0);
    out.addScaledVector(obb.axes[0], dx / dist);
    out.addScaledVector(obb.axes[1], dy / dist);
    out.addScaledVector(obb.axes[2], dz / dist);
    out.multiplyScalar(depth);
    return true;
  }

  // Mittelpunkt im Inneren: entlang der Achse mit dem kuerzesten Fluchtweg raus.
  let axis = 0;
  let escape = obb.half.x - Math.abs(lx);
  let sign = lx >= 0 ? 1 : -1;
  const escapeY = obb.half.y - Math.abs(ly);
  if (escapeY < escape) {
    axis = 1;
    escape = escapeY;
    sign = ly >= 0 ? 1 : -1;
  }
  const escapeZ = obb.half.z - Math.abs(lz);
  if (escapeZ < escape) {
    axis = 2;
    escape = escapeZ;
    sign = lz >= 0 ? 1 : -1;
  }
  out.copy(obb.axes[axis]).multiplyScalar(sign * (escape + radius));
  return true;
}
