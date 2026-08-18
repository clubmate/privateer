import { Mesh, Object3D } from 'three';
import { createPlaceholderInterior } from './PlaceholderInterior';

/** Namenskonventionen aus PLAN.md — gelten fuer Placeholder und GLB. */
const SEAT_NAME = 'Seat_Pilot';
const STAND_NAME = 'Stand_Pilot';
const COLLIDER_PREFIX = 'COL_';

/**
 * Schiffs-Rig. Alles, was zum Schiff gehoert (Innenraum, spaeter Kamera und
 * Spieler), haengt hier drunter; das Rig selbst traegt Position und Lage des
 * Schiffs in der Welt.
 */
export class Ship extends Object3D {
  private interior: Object3D;
  private seat: Object3D;
  private stand: Object3D;
  private colliders: Mesh[] = [];

  constructor(interior: Object3D = createPlaceholderInterior()) {
    super();
    this.name = 'Ship';
    // Von setInterior gesetzt; die Zuweisungen hier halten nur den Compiler ruhig.
    this.interior = interior;
    this.seat = interior;
    this.stand = interior;
    this.setInterior(interior);
  }

  /** Innenraum austauschen (AP4: GLB statt Placeholder). Kamera/Spieler muessen
   *  danach neu an `getSeatPilot()` gehaengt werden. */
  setInterior(interior: Object3D): void {
    if (this.interior.parent === this) this.remove(this.interior);
    this.interior = interior;
    this.add(interior);

    const seat = interior.getObjectByName(SEAT_NAME);
    const stand = interior.getObjectByName(STAND_NAME);
    if (!seat) throw new Error(`ShipInterior: Marker "${SEAT_NAME}" fehlt`);
    if (!stand) throw new Error(`ShipInterior: Marker "${STAND_NAME}" fehlt`);
    this.seat = seat;
    this.stand = stand;

    this.colliders = [];
    interior.traverse((obj) => {
      if (obj instanceof Mesh && obj.name.startsWith(COLLIDER_PREFIX)) {
        obj.visible = false;
        this.colliders.push(obj);
      }
    });
  }

  getInterior(): Object3D {
    return this.interior;
  }

  /** Augenpunkt im Sitzen; -Z ist die Blickrichtung. */
  getSeatPilot(): Object3D {
    return this.seat;
  }

  /** Fusspunkt nach dem Aufstehen. */
  getStandPilot(): Object3D {
    return this.stand;
  }

  /** Unsichtbar geschaltete `COL_`-Meshes fuer die Laufkollision. */
  getCollisionMeshes(): Mesh[] {
    return this.colliders;
  }
}
