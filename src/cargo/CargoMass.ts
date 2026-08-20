import { EMPTY_SHIP_MASS, type CargoHold } from './CargoHold';

/**
 * Ladung wiegt: die Masse im Flugmodell steigt mit der Tonnage, voll beladen
 * beschleunigt und dreht das Schiff traeger.
 *
 * **Warum ueber ein Struktur-Interface und nicht ueber `FlightModel`:** Das
 * Flugmodell fuehrt seine Kennwerte in einem Objekt, das `getParams()`
 * herausgibt — `Readonly<...>`, aber dasselbe Objekt, das die Integration
 * benutzt. Diese Datei haengt sich deshalb nur an die eine Eigenschaft, die
 * sie braucht, statt das Flugmodell zu importieren. Ein `setMass()` dort waere
 * sauberer (siehe Bericht); solange es das nicht gibt, ist das hier die
 * schmalste Kopplung, die es tut.
 */

/** Der Ausschnitt des Flugmodells, den die Ladung anfasst. */
export interface MassCarrier {
  getParams(): { mass: number };
}

/**
 * Schiffsmasse aus Leermasse plus Ladung setzen. Gibt die neue Masse in kg
 * zurueck. Bei jeder Manifestaenderung aufrufen.
 */
export function applyCargoMass(
  carrier: MassCarrier,
  hold: CargoHold,
  emptyMass: number = EMPTY_SHIP_MASS,
): number {
  const mass = hold.getShipMass(emptyMass);
  carrier.getParams().mass = mass;
  return mass;
}

/**
 * Masse laufend nachfuehren. Gibt die Abmeldefunktion zurueck; die Masse wird
 * sofort einmal gesetzt, damit ein bereits gefuellter Laderaum nicht bis zum
 * ersten Handel gewichtslos bleibt.
 */
export function trackCargoMass(
  carrier: MassCarrier,
  hold: CargoHold,
  emptyMass: number = EMPTY_SHIP_MASS,
): () => void {
  applyCargoMass(carrier, hold, emptyMass);
  return hold.onChange(() => applyCargoMass(carrier, hold, emptyMass));
}
