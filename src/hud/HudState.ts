import type { PerspectiveCamera, Quaternion, Vector3 } from 'three';
import type { FlightMode } from '../ship/FlightModel';
import type { TargetInfo } from '../combat/Targeting';

/**
 * Der Zustand, den alle Anzeigen eines Frames sehen — die diegetischen
 * Cockpitschirme, die Projektion auf der Scheibe und die verbliebene
 * DOM-Schicht.
 *
 * Ein gemeinsamer Typ statt dreier Signaturen: die drei Anzeigen zeigen
 * dieselben Werte in verschiedener Form, und `main.ts` soll das Objekt nur
 * einmal je Frame bauen.
 */
export interface HudState {
  /** Nahkamera (Augenpunkt) — Grundlage jeder Projektion. */
  camera: PerspectiveCamera;
  /** Schiffsposition in Weltkoordinaten (Sektorangabe). */
  position: Vector3;
  /** Schiffslage (Kurs, Lage, Rollwinkel). */
  orientation: Quaternion;
  /** Bahngeschwindigkeit in Weltkoordinaten (Prograde/Retrograde). */
  velocity: Vector3;
  speed: number;
  setSpeed: number;
  /** Obergrenze der Sollgeschwindigkeit fuer die Balken. */
  maxSetSpeed: number;
  mode: FlightMode;
  fullStop: boolean;
  afterburner: boolean;
  /** Der Spieler steht auf und geht: kein Flug-HUD auf der Scheibe. */
  walking: boolean;
  pointerLocked: boolean;
  /** Virtueller Mausoffset, -1..1 (y positiv = unten). */
  mouseOffset: { x: number; y: number };
  /** Zahl der zerstoerten Brocken. */
  kills: number;
  /** Sekunden seit dem letzten Treffer (Fadenkreuz blitzt auf). */
  sinceHit: number;
  /** Erfasstes Ziel, oder `null`. */
  target: TargetInfo | null;
  /** Huellenintegritaet 0..1. */
  hull: number;
  /** Sekunden seit dem letzten Zusammenstoss. */
  sinceImpact: number;
}

/** Beschriftung des Flugmodus, lang (DOM) und kurz (Schirme). */
export const MODE_LABEL: Record<FlightMode, string> = {
  arcade: 'ARCADE',
  assist: 'NEWTON · ASSIST',
  newton: 'NEWTON · FREI',
};

export const MODE_SHORT: Record<FlightMode, string> = {
  arcade: 'ARCADE',
  assist: 'ASSIST',
  newton: 'NEWTON',
};

/** Ab diesem Zustand gilt die Huelle als kritisch (Warnung auf den Schirmen). */
export const HULL_WARN = 0.35;
