import type { Ship } from '../ship/Ship';
import type { WalkController } from '../player/WalkController';
import { Interactables } from '../player/Interactables';
import { CargoHold, formatTons, type CargoHoldOptions } from './CargoHold';
import { CargoPanel } from './CargoPanel';
import { CargoVisuals } from './CargoVisuals';
import { trackCargoMass, type MassCarrier } from './CargoMass';
import { GOODS, type GoodId } from './CargoGoods';

/**
 * Haengt den Laderaum ans Spiel: Zustand, Kisten, Kollision, Masse, Manifest.
 *
 * Der ganze Aufbau steht hier und nicht in `main.ts`, damit dort ein einziger
 * Aufruf genuegt — an derselben Datei arbeiten mehrere Zweige gleichzeitig.
 */

/** Reichweite des Manifest-Prompts am Stapel. */
const ANCHOR_RANGE = 1.7;

/**
 * Durchgaenge der Entklemmung, nachdem neue Kisten erschienen sind. Ein
 * einzelner reicht nicht: die Kapsel wird aus der Kiste gedrueckt, landet
 * dabei womoeglich in der Bordwand und muss von dort noch einmal heraus.
 */
const UNSTICK_PASSES = 4;

/** Startladung, damit der Frachtraum nicht bei jedem Spielstart leer ist. */
const INITIAL_LOAD: ReadonlyArray<[GoodId, number]> = [
  ['ore', 6],
  ['parts', 4],
];

/** Nur die eine Eigenschaft des Renderers, die hier gebraucht wird. */
interface ShadowMapOwner {
  shadowMap: { needsUpdate: boolean };
}

export interface SetupCargoOptions extends CargoHoldOptions {
  ship: Ship;
  walk: WalkController;
  /** Das FlightModel — siehe {@link MassCarrier}. */
  flight: MassCarrier;
  /** Der Renderer; die Schattenkarte muss nach dem Umstauen neu gezeichnet werden. */
  renderer: ShadowMapOwner;
  /** Startladung; leeres Array startet mit leerem Laderaum. */
  initialLoad?: ReadonlyArray<[GoodId, number]>;
}

export interface CargoSystem {
  hold: CargoHold;
  visuals: CargoVisuals;
  panel: CargoPanel;
  /** Muss an `PlayerState` uebergeben werden, sonst reagiert `F` nicht. */
  interactables: Interactables;
  /** Debug-Kuerzel fuer die Konsole. */
  load(good: GoodId, tons: number): void;
  unload(good: GoodId, tons: number): void;
  fill(good?: GoodId): void;
  clear(): void;
  dispose(): void;
}

export function setupCargo(options: SetupCargoOptions): CargoSystem {
  const { ship, walk, flight, renderer } = options;
  const hold = new CargoHold(options);
  const interactables = new Interactables();

  const visuals = new CargoVisuals({
    hold,
    onCollidersChanged: () => {
      ship.refreshColliders();
      walk.rebuildCollision();
      // Eine Kiste kann genau dort erscheinen, wo der Spieler steht. Ein
      // Schritt mit dt=0 bewegt nichts, loest aber die Durchdringung auf —
      // man wird zur Seite geschoben, statt in der Kiste festzustecken.
      for (let i = 0; i < UNSTICK_PASSES; i++) walk.update(0);
    },
    onGeometryChanged: () => {
      renderer.shadowMap.needsUpdate = true;
    },
  });

  // Der Innenraum kommt erst spaeter aus dem GLB; `onInteriorChange` ruft
  // sofort mit dem aktuellen und danach bei jedem Wechsel.
  const detachInterior = ship.onInteriorChange((interior) => visuals.attach(interior));

  const stopMass = trackCargoMass(flight, hold);

  const panel = new CargoPanel(hold);

  // Zwei Anker, vorn und achtern im Laderaum. Die Vektoren gehoeren
  // CargoVisuals und werden dort fortgeschrieben — angemeldet wird genau
  // einmal, nicht bei jeder Manifestaenderung neu.
  const removeAnchors = visuals.anchors.map((position) =>
    interactables.add({
      position,
      range: ANCHOR_RANGE,
      label: () => {
        if (panel.isOpen) return 'F — MANIFEST SCHLIESSEN';
        const used = hold.getUsedCapacity();
        return used > 0
          ? `F — FRACHTMANIFEST · ${formatTons(used)} T`
          : 'F — FRACHTMANIFEST · LEER';
      },
      activate: () => panel.toggle(),
    }),
  );

  for (const [good, tons] of options.initialLoad ?? INITIAL_LOAD) hold.add(good, tons);

  return {
    hold,
    visuals,
    panel,
    interactables,
    load: (good, tons) => hold.add(good, tons),
    unload: (good, tons) => hold.remove(good, tons),
    /** Bis an die Kapazitaetsgrenze fuellen — fuer den Blick in den vollen Raum. */
    fill: (good?: GoodId) => {
      if (good) {
        hold.add(good, hold.getFreeCapacity());
        return;
      }
      // Ohne Angabe eine gemischte Vollladung, damit man die Warenarten sieht.
      const ids = Object.keys(GOODS) as GoodId[];
      for (const id of ids) {
        const free = hold.getFreeCapacity();
        if (free <= 0.001) break;
        hold.add(id, Math.min(free, hold.getCapacity() / ids.length));
      }
    },
    clear: () => hold.clear(),
    dispose: () => {
      for (const remove of removeAnchors) remove();
      detachInterior();
      stopMass();
      panel.dispose();
      visuals.dispose();
    },
  };
}
