import type { Object3D, Vector3 } from 'three';
import type { Impact } from '../combat/HullCollision';
import type { Targeting } from '../combat/Targeting';
import type { Weapons } from '../combat/Weapons';
import type { FlightModel } from '../ship/FlightModel';
import type { Interactables } from '../player/Interactables';
import { Annunciator } from './Annunciator';
import { DamageLights } from './DamageLights';
import { RepairController } from './Repair';
import { RepairPanels } from './RepairPanels';
import { ShipSystems, SYSTEM_DEFINITIONS, type SystemId, type SystemStatus } from './Systems';

/**
 * Bordschaden als Ganzes: Subsysteme, ihre Auswirkungen, die Reparaturstellen
 * an Bord und die Warnanzeige im Cockpit.
 *
 * Diese Klasse existiert, damit `main.ts` genau einen Block braucht. Sie
 * verdrahtet nur — jede Regel steht in ihrem eigenen Modul.
 */

export interface DamageModelDeps {
  flight: FlightModel;
  weapons: Weapons;
  targeting: Targeting;
  interactables: Interactables;
  /** Injizierbar fuer reproduzierbare Laeufe. */
  random?: () => number;
}

/** Momentaufnahme fuer eine spaetere HUD-Anbindung (siehe README/Bericht). */
export interface DamageHudState {
  systems: Array<{
    id: SystemId;
    code: string;
    name: string;
    health: number;
    status: SystemStatus;
  }>;
  /** Luftvorrat 0..1. */
  oxygen: number;
  /** Restliche Luft in Sekunden; `Infinity`, solange die Anlage laeuft. */
  oxygenSeconds: number;
  anyImpaired: boolean;
  anyFailed: boolean;
  /** Gerade in Reparatur, oder `null`. */
  repairing: SystemId | null;
  /** Fortschritt der laufenden Reparatur, 0..1. */
  repairProgress: number;
}

export class DamageModel {
  readonly systems: ShipSystems;
  readonly repair: RepairController;
  readonly panels: RepairPanels;
  readonly lights: DamageLights;
  readonly annunciator = new Annunciator();

  private readonly deps: DamageModelDeps;

  constructor(deps: DamageModelDeps) {
    this.deps = deps;
    const random = deps.random ?? Math.random;
    this.systems = new ShipSystems({ random });
    this.repair = new RepairController(this.systems);
    this.panels = new RepairPanels(this.systems, this.repair, deps.interactables, random);
    this.lights = new DamageLights(random);
    this.pushFactors();
  }

  /** Nach `ship.setInterior()` aufrufen: Klappen, Lampen und Tafel einhaengen. */
  attachInterior(interior: Object3D): void {
    this.panels.attach(interior);
    this.lights.attach(interior);
    this.annunciator.attach(interior);
  }

  /**
   * Physikschritt. `impact` ist das Ergebnis von `HullCollision.update()` —
   * jeder Rumpftreffer verteilt Schaden auf die Subsysteme.
   */
  fixedUpdate(dt: number, impact: Impact | null): void {
    if (impact) {
      this.systems.applyImpact(impact.damage, impact.direction);
      this.pushFactors();
    }
    this.systems.update(dt);
  }

  /**
   * Einmal pro Frame. `playerFeet` ist der Fusspunkt im Schiffslokalraum,
   * `null` wenn der Spieler sitzt (bricht eine laufende Reparatur ab).
   */
  update(dt: number, playerFeet: Vector3 | null): void {
    this.pushFactors();
    // Ohne Sensorik faellt die Erfassung weg — und zwar sofort, nicht erst,
    // wenn das Ziel von selbst aus der Reichweite laeuft.
    if (!this.systems.sensorsOnline) this.deps.targeting.clear();

    this.panels.update(dt, playerFeet);
    this.lights.update(
      dt,
      this.systems.getLightLevel(),
      this.systems.getFlicker(),
      this.systems.emergencyLighting,
    );
    this.annunciator.update(dt, this.systems);
  }

  /** Alles heil und Reparatur abbrechen (Debugkonsole). */
  reset(): void {
    this.repair.cancel();
    this.systems.repairAll();
    this.pushFactors();
  }

  /** Zustand fuer eine spaetere HUD-Anzeige. */
  getHudState(): DamageHudState {
    return {
      systems: SYSTEM_DEFINITIONS.map((def) => ({
        id: def.id,
        code: def.code,
        name: def.name,
        health: this.systems.getHealth(def.id),
        status: this.systems.getStatus(def.id),
      })),
      oxygen: this.systems.oxygen,
      oxygenSeconds: this.systems.getOxygenSeconds(),
      anyImpaired: this.systems.anyImpaired,
      anyFailed: this.systems.anyFailed,
      repairing: this.repair.getJob(),
      repairProgress: this.repair.getProgress(),
    };
  }

  private pushFactors(): void {
    this.deps.flight.setDamage(this.systems.getFlightDamage());
    this.deps.weapons.setDamage(this.systems.getWeaponDamage());
  }
}
