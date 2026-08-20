import {
  CONTAINER_HEIGHT,
  GOODS,
  UNIT_DEPTH,
  UNIT_WIDTH,
  unitCount,
  type GoodId,
} from './CargoGoods';

/**
 * Stauplan des Frachtraums: welche Stellplaetze belegt eine Ladung, wie hoch
 * wird gestapelt, wo steht am Ende welches Gebinde.
 *
 * Reine Rechnung ohne Three.js — {@link CargoVisuals} setzt nur noch Meshes
 * auf die hier berechneten Punkte. So laesst sich die Enge im Laderaum testen,
 * ohne einen Browser zu starten.
 *
 * **Koordinaten:** GLB-Innenraumkoordinaten (Nase +Z, Boden y=0), also
 * dieselbe Basis wie die Meshes im geladenen `ShipInterior`. Der Frachtraum
 * liegt darin bei z -5,20 .. -1,20, x +-1,60, Decke 2,30. Achtung: das
 * Schiffs-Rig ist dazu um 180 Grad um Y gedreht (siehe InteriorLoader) — wer
 * Schiffslokalkoordinaten braucht, spiegelt x und z.
 */

export interface StowSlot {
  readonly id: string;
  /** Mittelpunkt der Grundflaeche. */
  readonly x: number;
  readonly z: number;
  /** Nutzbare Stapelhoehe in Metern. */
  readonly headroom: number;
  /**
   * Steht der Stellplatz im Gehweg? Diese Plaetze stehen hinten in der
   * Fuellreihenfolge — erst bei voller Ladung wird der Gang zum Slalom.
   */
  readonly aisle: boolean;
}

/**
 * Stellplaetze in **Fuellreihenfolge**.
 *
 * Zuerst die beiden Wandreihen und das Heck: dort stoert Ladung niemanden.
 * Danach die Plaetze im Gang, versetzt links/rechts — jeder einzelne laesst
 * noch knapp 0,65 m frei (Spielerkapsel: 0,60 m), zusammen ergeben sie einen
 * Slalom. Genau das ist der Punkt: volle Ladung soll man beim Gehen merken.
 *
 * Ausgespart bleiben die Werkbank (x -1,60..-0,90, z -2,40..-1,30) und die
 * Anschlagbreite der Spanten (x bis +-1,49).
 */
export const STOW_SLOTS: readonly StowSlot[] = [
  { id: 'S0', x: 1.08, z: -4.76, headroom: 2.0, aisle: false },
  { id: 'P0', x: -1.08, z: -4.76, headroom: 2.0, aisle: false },
  // Heckmitte ist eine Sackgasse — dort darf hoch gestapelt werden.
  { id: 'C0', x: 0.0, z: -4.76, headroom: 2.0, aisle: false },
  { id: 'S1', x: 1.08, z: -3.9, headroom: 2.0, aisle: false },
  { id: 'P1', x: -1.08, z: -3.9, headroom: 2.0, aisle: false },
  { id: 'S2', x: 1.08, z: -3.04, headroom: 2.0, aisle: false },
  // Vor der Koje und vor den Spindtueren bleibt es niedrig, sonst kommt man
  // an Bett und Schrank gar nicht mehr heran.
  { id: 'P2', x: -1.08, z: -3.04, headroom: 1.4, aisle: false },
  { id: 'S3', x: 1.08, z: -2.18, headroom: 1.4, aisle: false },
  // Der Gang. Alle drei Plaetze liegen auf **derselben** Seite, und das ist
  // kein Schoenheitsfehler: die Reihen stehen nur 0,08 m auseinander, ein
  // Slalom von Reihe zu Reihe waere fuer eine 0,60 m breite Kapsel schlicht
  // nicht passierbar. So bleibt eine durchgehende Gasse von 0,84 m — eng
  // genug, dass man sich vorbeischiebt, breit genug, dass man durchkommt.
  { id: 'A0', x: -0.4, z: -3.9, headroom: 1.4, aisle: true },
  { id: 'A1', x: -0.4, z: -3.04, headroom: 1.4, aisle: true },
  { id: 'A2', x: -0.4, z: -2.18, headroom: 1.4, aisle: true },
];

/** Ein abgestelltes Gebinde. */
export interface StowedUnit {
  readonly good: GoodId;
  readonly slot: string;
  /** Lage im Stapel, 0 = unten. */
  readonly level: number;
  /** Mittelpunkt der Grundflaeche. */
  readonly x: number;
  readonly z: number;
  /** Unterkante ueber dem Boden. */
  readonly y: number;
  /** Drehung um Y in rad (kleiner Versatz, damit nichts wie im Regal steht). */
  readonly yaw: number;
  readonly width: number;
  readonly depth: number;
  readonly height: number;
}

export interface StowagePlan {
  readonly units: readonly StowedUnit[];
  /** Gebinde, fuer die kein Stellplatz mehr da war. Sollte 0 bleiben. */
  readonly overflow: number;
  /** Belegte Stellplaetze. */
  readonly slotsUsed: number;
  /** Belegte Stellplaetze, die im Gehweg stehen. */
  readonly aisleSlotsUsed: number;
}

/** Was der Stauplan als Eingabe braucht — passt auf `CargoHold.getManifest()`. */
export interface StowageLot {
  readonly good: GoodId;
  readonly tons: number;
}

/** Streuung der Stellung, damit der Stapel nicht wie ein Regal wirkt. */
const YAW_JITTER = 0.03;
const POSITION_JITTER = 0.015;

/**
 * Deterministische Streuung: derselbe Stellplatz sieht nach jedem Umstauen
 * gleich aus. Ein `Math.random()` liesse die Kisten bei jeder Manifest-
 * aenderung neu zappeln.
 */
function jitter(seed: number): number {
  const value = Math.sin(seed * 127.1) * 43758.5453;
  return (value - Math.floor(value)) * 2 - 1;
}

/**
 * Stauplan fuer ein Manifest.
 *
 * Jede Warenart beginnt auf einem **frischen** Stellplatz und stapelt sich
 * dort so hoch, wie die Deckenfreiheit hergibt. Das kostet ein paar
 * Zentimeter Platz, macht aber den Frachtraum lesbar: ein Stapel ist eine
 * Ware, und wer wissen will, was er geladen hat, schaut hin statt ins Menue.
 */
export function planStowage(
  lots: readonly StowageLot[],
  slots: readonly StowSlot[] = STOW_SLOTS,
): StowagePlan {
  const units: StowedUnit[] = [];
  const used = new Set<string>();
  let overflow = 0;
  let slotIndex = 0;
  let fill = 0;
  let level = 0;

  for (const lot of lots) {
    const good = GOODS[lot.good];
    if (!good || lot.tons <= 0) continue;
    const height = CONTAINER_HEIGHT[good.container];
    const total = unitCount(good, lot.tons);

    // Frischer Stellplatz je Warenart (siehe Kopfkommentar).
    if (fill > 0) {
      slotIndex++;
      fill = 0;
      level = 0;
    }

    for (let i = 0; i < total; i++) {
      // Passt das Gebinde nicht mehr unter die Decke: naechster Stellplatz.
      while (slotIndex < slots.length && fill + height > slots[slotIndex].headroom + 1e-6) {
        slotIndex++;
        fill = 0;
        level = 0;
      }
      if (slotIndex >= slots.length) {
        overflow += total - i;
        break;
      }

      const slot = slots[slotIndex];
      const seed = slotIndex * 17 + level * 3 + 1;
      used.add(slot.id);
      units.push({
        good: lot.good,
        slot: slot.id,
        level,
        x: slot.x + jitter(seed) * POSITION_JITTER,
        z: slot.z + jitter(seed + 0.5) * POSITION_JITTER,
        y: fill,
        yaw: jitter(seed + 1.5) * YAW_JITTER,
        width: UNIT_WIDTH,
        depth: UNIT_DEPTH,
        height,
      });

      fill += height;
      level++;
    }
  }

  let aisleSlotsUsed = 0;
  for (const slot of slots) if (slot.aisle && used.has(slot.id)) aisleSlotsUsed++;

  return { units, overflow, slotsUsed: used.size, aisleSlotsUsed };
}

/**
 * Wie viele Gebinde dieser Ware insgesamt auf die Stellplaetze passen. Nur
 * fuer Tests und Diagnose — die Kapazitaet des Laderaums haengt an der
 * Tonnage, nicht hieran (siehe {@link CargoHold}).
 */
export function stowageCapacity(
  good: GoodId,
  slots: readonly StowSlot[] = STOW_SLOTS,
): number {
  const height = CONTAINER_HEIGHT[GOODS[good].container];
  let count = 0;
  for (const slot of slots) count += Math.floor(slot.headroom / height + 1e-6);
  return count;
}

/** Grenzen der begehbaren Flaeche im Frachtraum (GLB-Koordinaten). */
const BAY_MIN_X = -1.45;
const BAY_MAX_X = 1.45;
const BAY_MIN_Z = -5.2;
const BAY_MAX_Z = -1.2;

/** Werkbank backbord — steht fest im Weg und gehoert in die Ausweichrechnung. */
const BENCH = { maxX: -0.9, minZ: -2.4, maxZ: -1.3 };

/** Schrittweite und Reichweite der Ausweichsuche in Metern. */
const EVADE_STEP = 0.05;
const EVADE_LIMIT = 1.6;

/** Liegt der Punkt mit Radius `r` frei? */
function isClear(x: number, z: number, r: number, units: readonly StowedUnit[]): boolean {
  if (x < BAY_MIN_X + r || x > BAY_MAX_X - r) return false;
  if (z < BAY_MIN_Z + r || z > BAY_MAX_Z - r) return false;
  if (x < BENCH.maxX + r && z > BENCH.minZ - r && z < BENCH.maxZ + r) return false;
  for (const unit of units) {
    const hw = unit.width / 2 + r;
    const hd = unit.depth / 2 + r;
    if (Math.abs(x - unit.x) < hw && Math.abs(z - unit.z) < hd) return false;
  }
  return true;
}

/**
 * Naechster freier Standpunkt, wenn eine Kiste genau dort erscheint, wo der
 * Spieler steht.
 *
 * **Warum eine eigene Rechnung und nicht die Penetrationsaufloesung des
 * WalkControllers:** die schiebt entlang des kuerzesten Fluchtwegs, und der
 * zeigt bei einer Kiste auf Kniehoehe nach unten. Wer in einem dreifachen
 * Stapel steht, wird so Lage um Lage nach unten gedrueckt und faellt am Ende
 * durch den Boden aus dem Schiff. Seitlich ausweichen ist hier die einzig
 * richtige Richtung — man wird zur Seite geschoben, nicht versenkt.
 *
 * Gibt `null` zurueck, wenn der Punkt schon frei ist oder sich in Reichweite
 * kein freier finden laesst. Koordinaten sind GLB-Innenraumkoordinaten.
 */
export function evadeStowage(
  x: number,
  z: number,
  radius: number,
  units: readonly StowedUnit[],
): { x: number; z: number } | null {
  if (isClear(x, z, radius, units)) return null;

  for (let distance = EVADE_STEP; distance <= EVADE_LIMIT; distance += EVADE_STEP) {
    // Ringweise nach aussen; der erste freie Punkt gewinnt, also der naechste.
    const steps = Math.max(8, Math.round((2 * Math.PI * distance) / EVADE_STEP));
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const cx = x + Math.cos(angle) * distance;
      const cz = z + Math.sin(angle) * distance;
      if (isClear(cx, cz, radius, units)) return { x: cx, z: cz };
    }
  }
  return null;
}
