import {
  BoxGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  PointLight,
  SphereGeometry,
  TorusGeometry,
  type Material,
} from 'three';

/**
 * Prozeduraler Placeholder-Innenraum nach den glTF-Konventionen aus PLAN.md:
 * Root `ShipInterior`, Kollisionsmeshes mit Praefix `COL_`, Marker `Seat_Pilot`
 * und `Stand_Pilot`, Meter-Massstab, Boden bei y=0, Nase entlang -Z.
 *
 * Grundriss (z waechst nach hinten):
 *   Cockpit  z -4.60 .. -0.40, Breite 2.90 m, Kanzel darueber
 *   Gang     z -0.40 ..  2.60, Breite 1.50 m, Hoehe 2.10 m
 *   Kabine   z  2.60 ..  5.80, Breite 3.40 m, Hoehe 2.30 m
 */

const COCKPIT_FRONT = -4.6;
const COCKPIT_BACK = -0.4;
const COCKPIT_HALF_W = 1.45;
const COCKPIT_CEIL = 1.95;

const CORRIDOR_BACK = 2.6;
const CORRIDOR_HALF_W = 0.75;
const CORRIDOR_CEIL = 2.1;

const CABIN_BACK = 5.8;
const CABIN_HALF_W = 1.7;
const CABIN_CEIL = 2.3;

const DOOR_W = 1.0;
const DOOR_H = 2.0;
const T = 0.08; // Wandstaerke

const boxGeo = new BoxGeometry(1, 1, 1);

function box(
  name: string,
  material: Material,
  size: [number, number, number],
  pos: [number, number, number],
): Mesh {
  const mesh = new Mesh(boxGeo, material);
  mesh.name = name;
  mesh.scale.set(size[0], size[1], size[2]);
  mesh.position.set(pos[0], pos[1], pos[2]);
  return mesh;
}

export function createPlaceholderInterior(): Object3D {
  const root = new Object3D();
  root.name = 'ShipInterior';

  const hull = new MeshStandardMaterial({ color: 0x6a7076, roughness: 0.62, metalness: 0.38 });
  const floorMat = new MeshStandardMaterial({ color: 0x2b3035, roughness: 0.88, metalness: 0.12 });
  const ceilMat = new MeshStandardMaterial({ color: 0x474e55, roughness: 0.75, metalness: 0.25 });
  const trim = new MeshStandardMaterial({ color: 0x1c2024, roughness: 0.5, metalness: 0.5 });
  const seatMat = new MeshStandardMaterial({ color: 0x3a3f47, roughness: 0.85, metalness: 0.05 });
  const padMat = new MeshStandardMaterial({ color: 0x23282e, roughness: 0.95, metalness: 0.0 });
  const panelCyan = new MeshStandardMaterial({
    color: 0x08131a,
    emissive: 0x39c8ff,
    emissiveIntensity: 1.2,
    roughness: 0.4,
  });
  const panelAmber = new MeshStandardMaterial({
    color: 0x1a1206,
    emissive: 0xffa42e,
    emissiveIntensity: 1.0,
    roughness: 0.4,
  });
  const stripDim = new MeshStandardMaterial({
    color: 0x06131a,
    emissive: 0x2a9ad6,
    emissiveIntensity: 1.2,
    roughness: 0.6,
  });

  // Kanzel: dicke, klare Verglasung. Kein depthWrite, damit der Weltraum
  // dahinter sauber durchscheint.
  const glass = new MeshPhysicalMaterial({
    color: 0xaad4ff,
    transparent: true,
    opacity: 0.09,
    roughness: 0.03,
    metalness: 0.0,
    ior: 1.45,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    depthWrite: false,
    side: DoubleSide,
  });

  const colliderMat = new MeshBasicMaterial({ color: 0xff00ff, wireframe: true });

  const collider = (name: string, size: [number, number, number], pos: [number, number, number]): Mesh =>
    box(name, colliderMat, size, pos);

  const cockpitLen = COCKPIT_BACK - COCKPIT_FRONT; // 4.20
  const cockpitMidZ = (COCKPIT_FRONT + COCKPIT_BACK) / 2;
  const corridorLen = CORRIDOR_BACK - COCKPIT_BACK; // 3.00
  const corridorMidZ = (COCKPIT_BACK + CORRIDOR_BACK) / 2;
  const cabinLen = CABIN_BACK - CORRIDOR_BACK; // 3.20
  const cabinMidZ = (CORRIDOR_BACK + CABIN_BACK) / 2;

  // ---------------------------------------------------------------- Cockpit
  root.add(box('CockpitFloor', floorMat, [COCKPIT_HALF_W * 2, T, cockpitLen], [0, -T / 2, cockpitMidZ]));
  root.add(box('CockpitSillL', hull, [0.1, 0.62, cockpitLen], [-COCKPIT_HALF_W - 0.05, 0.31, cockpitMidZ]));
  root.add(box('CockpitSillR', hull, [0.1, 0.62, cockpitLen], [COCKPIT_HALF_W + 0.05, 0.31, cockpitMidZ]));
  root.add(box('CockpitNosePanel', hull, [COCKPIT_HALF_W * 2 + 0.2, 0.62, 0.1], [0, 0.31, COCKPIT_FRONT - 0.05]));

  // Kanzel als obere Halbkugel, in Laengsrichtung gestreckt.
  const canopy = new Mesh(
    new SphereGeometry(1, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2),
    glass,
  );
  canopy.name = 'Canopy';
  canopy.scale.set(COCKPIT_HALF_W + 0.07, 1.34, cockpitLen / 2 + 0.02);
  canopy.position.set(0, 0.6, cockpitMidZ);
  canopy.renderOrder = 2;
  root.add(canopy);

  // Zwei Spanten als Rahmen (Torus liegt in der XY-Ebene, obere Haelfte).
  const ribGeo = new TorusGeometry(1, 0.022, 8, 40, Math.PI);
  [-1.15, -3.3].forEach((z, i) => {
    const rib = new Mesh(ribGeo, trim);
    rib.name = `CanopyRib${i}`;
    rib.scale.set(COCKPIT_HALF_W + 0.09, 1.36, 1);
    rib.position.set(0, 0.6, z);
    root.add(rib);
  });

  // Rueckwand des Cockpits mit Durchgang (Hoehe wie der Gang, damit oben
  // kein Spalt bleibt).
  const rearSegW = (COCKPIT_HALF_W * 2 - DOOR_W) / 2;
  root.add(
    box('CockpitRearWallL', hull, [rearSegW, CORRIDOR_CEIL, T], [-(DOOR_W + rearSegW) / 2, CORRIDOR_CEIL / 2, COCKPIT_BACK]),
  );
  root.add(
    box('CockpitRearWallR', hull, [rearSegW, CORRIDOR_CEIL, T], [(DOOR_W + rearSegW) / 2, CORRIDOR_CEIL / 2, COCKPIT_BACK]),
  );
  root.add(
    box('CockpitRearLintel', hull, [DOOR_W, CORRIDOR_CEIL - DOOR_H, T], [0, (CORRIDOR_CEIL + DOOR_H) / 2, COCKPIT_BACK]),
  );

  // Sitz — Lehne liegt hinter dem Piloten (+Z), Armlehnen zeigen nach vorn (-Z).
  root.add(box('SeatBase', seatMat, [0.5, 0.42, 0.55], [0, 0.21, -0.95]));
  root.add(box('SeatPan', padMat, [0.62, 0.1, 0.62], [0, 0.47, -0.95]));
  const backrest = box('SeatBack', padMat, [0.62, 0.86, 0.12], [0, 0.95, -0.62]);
  backrest.rotation.x = 0.13;
  root.add(backrest);
  root.add(box('SeatHeadrest', padMat, [0.34, 0.24, 0.12], [0, 1.46, -0.55]));
  root.add(box('SeatArmL', seatMat, [0.09, 0.08, 0.45], [-0.37, 0.62, -0.92]));
  root.add(box('SeatArmR', seatMat, [0.09, 0.08, 0.45], [0.37, 0.62, -0.92]));

  // Hauptkonsole vor dem Sitz
  root.add(box('ConsoleBody', hull, [1.7, 0.52, 0.55], [0, 0.26, -2.05]));
  const consoleTop = box('ConsoleTop', trim, [1.66, 0.06, 0.62], [0, 0.58, -2.0]);
  consoleTop.rotation.x = 0.42;
  root.add(consoleTop);
  for (let i = -1; i <= 1; i++) {
    const panel = box(`ConsolePanel${i + 2}`, i === 0 ? panelCyan : panelAmber, [0.44, 0.02, 0.3], [i * 0.55, 0.62, -1.99]);
    panel.rotation.x = 0.42;
    root.add(panel);
  }

  // Seitenkonsolen
  for (const sx of [-1, 1]) {
    const side = box(sx < 0 ? 'ConsoleSideL' : 'ConsoleSideR', hull, [0.5, 0.55, 1.3], [sx * 1.15, 0.275, -1.7]);
    root.add(side);
    root.add(
      box(sx < 0 ? 'ConsoleSideLampL' : 'ConsoleSideLampR', stripDim, [0.36, 0.02, 1.0], [sx * 1.15, 0.56, -1.7]),
    );
  }

  // ------------------------------------------------------------------ Gang
  root.add(box('CorridorFloor', floorMat, [CORRIDOR_HALF_W * 2 + 0.2, T, corridorLen], [0, -T / 2, corridorMidZ]));
  root.add(box('CorridorCeiling', ceilMat, [CORRIDOR_HALF_W * 2 + 0.2, T, corridorLen], [0, CORRIDOR_CEIL + T / 2, corridorMidZ]));
  root.add(box('CorridorWallL', hull, [T, CORRIDOR_CEIL, corridorLen], [-CORRIDOR_HALF_W, CORRIDOR_CEIL / 2, corridorMidZ]));
  root.add(box('CorridorWallR', hull, [T, CORRIDOR_CEIL, corridorLen], [CORRIDOR_HALF_W, CORRIDOR_CEIL / 2, corridorMidZ]));
  root.add(box('CorridorStripL', stripDim, [0.05, 0.02, corridorLen - 0.4], [-CORRIDOR_HALF_W + 0.06, 0.02, corridorMidZ]));
  root.add(box('CorridorStripR', stripDim, [0.05, 0.02, corridorLen - 0.4], [CORRIDOR_HALF_W - 0.06, 0.02, corridorMidZ]));

  // ---------------------------------------------------------------- Kabine
  const cabinFrontSegW = (CABIN_HALF_W * 2 - DOOR_W) / 2;
  root.add(box('CabinFloor', floorMat, [CABIN_HALF_W * 2, T, cabinLen], [0, -T / 2, cabinMidZ]));
  root.add(box('CabinCeiling', ceilMat, [CABIN_HALF_W * 2, T, cabinLen], [0, CABIN_CEIL + T / 2, cabinMidZ]));
  root.add(box('CabinWallL', hull, [T, CABIN_CEIL, cabinLen], [-CABIN_HALF_W, CABIN_CEIL / 2, cabinMidZ]));
  root.add(box('CabinWallR', hull, [T, CABIN_CEIL, cabinLen], [CABIN_HALF_W, CABIN_CEIL / 2, cabinMidZ]));
  root.add(box('CabinWallRear', hull, [CABIN_HALF_W * 2, CABIN_CEIL, T], [0, CABIN_CEIL / 2, CABIN_BACK]));
  root.add(
    box('CabinFrontWallL', hull, [cabinFrontSegW, CABIN_CEIL, T], [-(DOOR_W + cabinFrontSegW) / 2, CABIN_CEIL / 2, CORRIDOR_BACK]),
  );
  root.add(
    box('CabinFrontWallR', hull, [cabinFrontSegW, CABIN_CEIL, T], [(DOOR_W + cabinFrontSegW) / 2, CABIN_CEIL / 2, CORRIDOR_BACK]),
  );
  root.add(box('CabinFrontLintel', hull, [DOOR_W, CABIN_CEIL - DOOR_H, T], [0, (CABIN_CEIL + DOOR_H) / 2, CORRIDOR_BACK]));

  // Einrichtung
  root.add(box('Bunk', padMat, [0.78, 0.42, 1.95], [-1.2, 0.21, 4.35]));
  root.add(box('BunkLamp', stripDim, [0.06, 0.02, 1.6], [-0.79, 0.44, 4.35]));
  root.add(box('Locker', hull, [0.6, 1.8, 0.5], [1.3, 0.9, 3.2]));
  root.add(box('LockerPanel', panelCyan, [0.02, 0.24, 0.3], [0.99, 1.3, 3.2]));
  root.add(box('Crate', trim, [0.6, 0.6, 0.6], [1.25, 0.3, 5.3]));

  // ------------------------------------------------------------- Innenlicht
  const lights: Array<[string, number, number, [number, number, number], number]> = [
    ['LightCockpit', 0x9ec4ff, 3.0, [0, 1.6, -2.3], 9],
    ['LightConsole', 0x5fc8ff, 1.4, [0, 0.95, -1.75], 3],
    ['LightCorridor', 0xffd6a0, 2.2, [0, 1.8, 1.1], 7],
    ['LightCabin', 0xcfe4ff, 4.0, [0, 2.0, 4.2], 9],
  ];
  for (const [name, color, intensity, pos, distance] of lights) {
    const light = new PointLight(color, intensity, distance, 2);
    light.name = name;
    light.position.set(pos[0], pos[1], pos[2]);
    root.add(light);
  }

  // ----------------------------------------------------------------- Marker
  const seat = new Object3D();
  seat.name = 'Seat_Pilot';
  seat.position.set(0, 1.22, -0.95); // Augenpunkt im Sitzen, Blick entlang -Z
  root.add(seat);

  const stand = new Object3D();
  stand.name = 'Stand_Pilot';
  // Fusspunkt im Durchgang hinter dem Sitz: 2,1 m Kopffreiheit, 1,46 m
  // Abstand zum Sitzmarker (unter der 1,5-m-Interaktionsschwelle).
  stand.position.set(0, 0, -0.15);
  root.add(stand);

  // ------------------------------------------------------------- Kollision
  // Einfaches Boxen-Modell: Boeden, Decken, Aussenwaende, Moebel.
  root.add(collider('COL_Floor_Cockpit', [COCKPIT_HALF_W * 2 + 0.2, 0.1, cockpitLen], [0, -0.05, cockpitMidZ]));
  root.add(collider('COL_Floor_Corridor', [CORRIDOR_HALF_W * 2, 0.1, corridorLen], [0, -0.05, corridorMidZ]));
  root.add(collider('COL_Floor_Cabin', [CABIN_HALF_W * 2, 0.1, cabinLen], [0, -0.05, cabinMidZ]));

  root.add(collider('COL_Ceiling_Cockpit', [COCKPIT_HALF_W * 2 + 0.2, 0.1, cockpitLen], [0, COCKPIT_CEIL + 0.05, cockpitMidZ]));
  root.add(collider('COL_Ceiling_Corridor', [CORRIDOR_HALF_W * 2, 0.1, corridorLen], [0, CORRIDOR_CEIL + 0.05, corridorMidZ]));
  root.add(collider('COL_Ceiling_Cabin', [CABIN_HALF_W * 2, 0.1, cabinLen], [0, CABIN_CEIL + 0.05, cabinMidZ]));

  root.add(collider('COL_Wall_Cockpit_L', [0.1, COCKPIT_CEIL, cockpitLen], [-COCKPIT_HALF_W - 0.05, COCKPIT_CEIL / 2, cockpitMidZ]));
  root.add(collider('COL_Wall_Cockpit_R', [0.1, COCKPIT_CEIL, cockpitLen], [COCKPIT_HALF_W + 0.05, COCKPIT_CEIL / 2, cockpitMidZ]));
  root.add(collider('COL_Wall_Cockpit_Front', [COCKPIT_HALF_W * 2 + 0.2, COCKPIT_CEIL, 0.1], [0, COCKPIT_CEIL / 2, COCKPIT_FRONT - 0.05]));
  root.add(collider('COL_Wall_CockpitRear_L', [rearSegW, COCKPIT_CEIL, 0.1], [-(DOOR_W + rearSegW) / 2, COCKPIT_CEIL / 2, COCKPIT_BACK]));
  root.add(collider('COL_Wall_CockpitRear_R', [rearSegW, COCKPIT_CEIL, 0.1], [(DOOR_W + rearSegW) / 2, COCKPIT_CEIL / 2, COCKPIT_BACK]));

  root.add(collider('COL_Wall_Corridor_L', [0.1, CORRIDOR_CEIL, corridorLen], [-CORRIDOR_HALF_W, CORRIDOR_CEIL / 2, corridorMidZ]));
  root.add(collider('COL_Wall_Corridor_R', [0.1, CORRIDOR_CEIL, corridorLen], [CORRIDOR_HALF_W, CORRIDOR_CEIL / 2, corridorMidZ]));

  root.add(collider('COL_Wall_CabinFront_L', [cabinFrontSegW, CABIN_CEIL, 0.1], [-(DOOR_W + cabinFrontSegW) / 2, CABIN_CEIL / 2, CORRIDOR_BACK]));
  root.add(collider('COL_Wall_CabinFront_R', [cabinFrontSegW, CABIN_CEIL, 0.1], [(DOOR_W + cabinFrontSegW) / 2, CABIN_CEIL / 2, CORRIDOR_BACK]));
  root.add(collider('COL_Wall_Cabin_L', [0.1, CABIN_CEIL, cabinLen], [-CABIN_HALF_W, CABIN_CEIL / 2, cabinMidZ]));
  root.add(collider('COL_Wall_Cabin_R', [0.1, CABIN_CEIL, cabinLen], [CABIN_HALF_W, CABIN_CEIL / 2, cabinMidZ]));
  root.add(collider('COL_Wall_Cabin_Rear', [CABIN_HALF_W * 2, CABIN_CEIL, 0.1], [0, CABIN_CEIL / 2, CABIN_BACK]));

  root.add(collider('COL_Seat', [0.66, 1.6, 0.8], [0, 0.8, -0.9]));
  root.add(collider('COL_Console', [1.7, 0.66, 0.62], [0, 0.33, -2.03]));
  root.add(collider('COL_Console_L', [0.5, 0.58, 1.3], [-1.15, 0.29, -1.7]));
  root.add(collider('COL_Console_R', [0.5, 0.58, 1.3], [1.15, 0.29, -1.7]));
  root.add(collider('COL_Bunk', [0.78, 0.44, 1.95], [-1.2, 0.22, 4.35]));
  root.add(collider('COL_Locker', [0.6, 1.8, 0.5], [1.3, 0.9, 3.2]));
  root.add(collider('COL_Crate', [0.62, 0.62, 0.62], [1.25, 0.31, 5.3]));

  return root;
}
