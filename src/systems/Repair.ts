import type { ShipSystems, SystemId } from './Systems';

/**
 * Ablauf einer Reparatur an Bord.
 *
 * Reparieren ist kein Tastendruck, sondern Anwesenheit: `F` startet, der
 * Fortschritt laeuft nur weiter, solange der Spieler an der Stelle steht, und
 * das Schiff fliegt derweil mit Flight-Assist weiter. Genau daraus entsteht die
 * Entscheidung, ob man sich das gerade leisten kann.
 *
 * Reine Logik ohne Three — die Stelle im Raum liefert der Aufrufer als Abstand.
 */

export interface RepairParams {
  /** Grundzeit jeder Reparatur in Sekunden. */
  base: number;
  /** Zusatzzeit fuer einen von Grund auf zerstoerten Zustand, in Sekunden. */
  perUnit: number;
  /** Ab diesem Abstand zur Stelle bricht die Reparatur ab, in Metern. */
  abortRange: number;
  /** Tempofaktor, solange kein Werkzeug in der Hand ist. */
  withoutTool: number;
}

export const DEFAULT_REPAIR_PARAMS: RepairParams = {
  base: 2.5,
  perUnit: 9,
  abortRange: 1.9,
  withoutTool: 0.5,
};

/** Warum eine Reparatur geendet hat — fuer Rueckmeldung im Prompt. */
export type RepairEnd = 'done' | 'aborted' | 'cancelled';

export class RepairController {
  /** Liegt das Werkzeug von der Werkbank in der Hand? */
  toolInHand = false;

  private job: SystemId | null = null;
  private progress = 0;
  /** Zustand beim Start — daraus ergibt sich die Dauer. */
  private startHealth = 1;
  private duration = 1;
  /** Letztes Ergebnis samt System, damit die Anzeige kurz nachklingen kann. */
  private lastEnd: { id: SystemId; reason: RepairEnd; age: number } | null = null;

  private readonly params: RepairParams;

  constructor(
    private readonly systems: ShipSystems,
    params: Partial<RepairParams> = {},
  ) {
    this.params = { ...DEFAULT_REPAIR_PARAMS, ...params };
  }

  getParams(): Readonly<RepairParams> {
    return this.params;
  }

  /** Laufendes System, oder `null`. */
  getJob(): SystemId | null {
    return this.job;
  }

  isActive(id?: SystemId): boolean {
    return id === undefined ? this.job !== null : this.job === id;
  }

  /** Fortschritt 0..1 der laufenden Reparatur. */
  getProgress(): number {
    return this.job ? this.progress : 0;
  }

  /** Zuletzt beendete Reparatur (mit Alter in Sekunden), oder `null`. */
  getLastEnd(): Readonly<{ id: SystemId; reason: RepairEnd; age: number }> | null {
    return this.lastEnd;
  }

  /**
   * Reparatur starten. Ein heiles System wird abgelehnt — sonst steht an jeder
   * intakten Klappe ein Prompt, der nichts tut.
   */
  start(id: SystemId): boolean {
    if (this.systems.getHealth(id) >= 1) return false;
    if (this.job === id) return false;

    this.job = id;
    this.progress = 0;
    this.startHealth = this.systems.getHealth(id);
    this.duration = this.params.base + (1 - this.startHealth) * this.params.perUnit;
    return true;
  }

  cancel(reason: RepairEnd = 'cancelled'): void {
    if (!this.job) return;
    this.lastEnd = { id: this.job, reason, age: 0 };
    this.job = null;
    this.progress = 0;
  }

  /**
   * Ein Frame Reparatur. `distance` ist der Abstand des Spielers zur Stelle in
   * Metern; `null` heisst "sitzt wieder im Sitz" und bricht ebenfalls ab.
   */
  update(dt: number, distance: number | null): void {
    if (this.lastEnd) this.lastEnd.age += dt;

    const id = this.job;
    if (!id) return;

    if (distance === null || distance > this.params.abortRange) {
      this.cancel('aborted');
      return;
    }

    // Tempo haengt am Generator (Werkzeug braucht Strom) und am Werkzeug
    // selbst; beides kann sich mitten in der Reparatur aendern.
    const speed = this.systems.getRepairSpeed() * (this.toolInHand ? 1 : this.params.withoutTool);
    const step = (dt * speed) / Math.max(this.duration, 1e-3);
    this.progress += step;

    // Additiv statt interpoliert: nimmt das System waehrend der Reparatur
    // einen weiteren Treffer, geht der nicht einfach verloren.
    this.systems.repair(id, (1 - this.startHealth) * step);

    if (this.progress >= 1) {
      this.systems.repair(id, 1);
      this.progress = 1;
      this.cancel('done');
    }
  }
}
