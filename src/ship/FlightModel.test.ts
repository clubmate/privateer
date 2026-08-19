import { describe, expect, it } from 'vitest';
import { Object3D, Vector3 } from 'three';
import { FlightModel } from './FlightModel';

/** Schiff plus Modell, wie es die Spielschleife benutzt. */
function setup(): { ship: Object3D; flight: FlightModel } {
  const ship = new Object3D();
  return { ship, flight: new FlightModel(ship) };
}

/** `seconds` Sekunden mit dem festen Timestep der Spielschleife simulieren. */
function run(flight: FlightModel, seconds: number, dt = 1 / 120): void {
  for (let i = 0; i < Math.round(seconds / dt); i++) flight.update(dt);
}

/** Nasenrichtung des Schiffs in Weltkoordinaten. */
function nose(ship: Object3D): Vector3 {
  return new Vector3(0, 0, -1).applyQuaternion(ship.quaternion);
}

describe('FlightModel — Arcade', () => {
  it('startet im Arcade-Modus', () => {
    const { flight } = setup();
    expect(flight.mode).toBe('arcade');
    expect(flight.isArcade).toBe(true);
  });

  it('regelt auf die Sollgeschwindigkeit', () => {
    const { flight } = setup();
    flight.setSpeed = 200;
    run(flight, 6);
    expect(flight.getSpeed()).toBeCloseTo(200, 0);
  });

  it('deckelt die Drehrate bei Vollausschlag', () => {
    const { flight } = setup();
    const max = flight.getParams().arcade.turnRate;
    flight.inputs.yaw = 1;
    run(flight, 2);
    expect(Math.abs(flight.angularVelocity.y)).toBeCloseTo(max, 2);
  });

  it('stoppt die Drehung, sobald die Eingabe wegfaellt', () => {
    const { flight } = setup();
    flight.inputs.yaw = 1;
    run(flight, 1);
    flight.inputs.yaw = 0;
    run(flight, 0.5);
    expect(flight.angularVelocity.length()).toBeLessThan(0.01);
  });

  it('haelt die Flugrichtung an der Nase — kein Dauerdrift', () => {
    const { ship, flight } = setup();
    flight.setSpeed = 200;
    run(flight, 4);

    // Eine Viertelumdrehung fliegen, danach ausrichten lassen.
    flight.inputs.yaw = 1;
    run(flight, 1.5);
    flight.inputs.yaw = 0;
    run(flight, 1.5);

    const drift = nose(ship).angleTo(flight.velocity.clone().normalize());
    expect(drift).toBeLessThan(0.05); // < 3 Grad
  });

  it('laesst den Geschwindigkeitsvektor waehrend der Kurve nachziehen', () => {
    const { ship, flight } = setup();
    flight.setSpeed = 200;
    run(flight, 4);
    flight.inputs.yaw = 1;
    run(flight, 2);

    // Waehrend der Drehung hinkt die Bahn der Nase hinterher — das ist das
    // gewollte Gewicht in der Kurve, aber es bleibt beherrschbar.
    const drift = nose(ship).angleTo(flight.velocity.clone().normalize());
    expect(drift).toBeGreaterThan(0.05);
    expect(drift).toBeLessThan(0.7); // < 40 Grad
  });

  it('bremst bei Full Stop bis zum Stillstand', () => {
    const { flight } = setup();
    flight.setSpeed = 300;
    run(flight, 6);
    flight.requestFullStop();
    run(flight, 8);
    expect(flight.getSpeed()).toBeLessThan(0.5);
    expect(flight.fullStop).toBe(false); // meldet sich selbst ab
  });

  it('beschleunigt mit Nachbrenner ueber die Sollgeschwindigkeit hinaus', () => {
    const { flight } = setup();
    flight.setSpeed = 100;
    run(flight, 4);
    flight.inputs.afterburner = true;
    run(flight, 6);
    expect(flight.getSpeed()).toBeGreaterThan(400);
  });

  it('bleibt unter der harten Hoechstgeschwindigkeit', () => {
    const { flight } = setup();
    flight.inputs.afterburner = true;
    run(flight, 30);
    expect(flight.getSpeed()).toBeLessThanOrEqual(flight.getParams().maxSpeed + 1e-6);
  });
});

describe('FlightModel — Newton', () => {
  it('daempft die Drehung mit Assist aus, ohne Assist nicht', () => {
    const { flight } = setup();
    flight.setMode('assist');
    flight.inputs.pitch = 1;
    run(flight, 1);
    flight.inputs.pitch = 0;
    run(flight, 2);
    expect(flight.angularVelocity.length()).toBeLessThan(0.01);

    flight.setMode('newton');
    flight.inputs.pitch = 1;
    run(flight, 1);
    flight.inputs.pitch = 0;
    run(flight, 2);
    expect(flight.angularVelocity.length()).toBeGreaterThan(0.5);
  });

  it('driftet ohne Assist weiter, wenn die Nase wegdreht', () => {
    const { ship, flight } = setup();
    flight.setMode('newton');
    flight.inputs.main = 1;
    run(flight, 5);
    flight.inputs.main = 0;

    const before = flight.velocity.clone();
    flight.inputs.yaw = 1;
    run(flight, 1.5);
    flight.inputs.yaw = 0;
    run(flight, 1);

    // Bahn unveraendert, Nase woanders: genau das ist newtonsches Verhalten.
    expect(flight.velocity.distanceTo(before)).toBeLessThan(1);
    expect(nose(ship).angleTo(before.clone().normalize())).toBeGreaterThan(0.5);
  });

  it('regelt mit Assist auf die Sollgeschwindigkeit entlang der Nase', () => {
    const { ship, flight } = setup();
    flight.setMode('assist');
    flight.setSpeed = 150;
    run(flight, 30);
    expect(flight.getForwardSpeed()).toBeCloseTo(150, 0);
    expect(nose(ship).angleTo(flight.velocity.clone().normalize())).toBeLessThan(0.02);
  });
});

describe('FlightModel — Moduswechsel', () => {
  it('schaltet zyklisch durch alle Modi', () => {
    const { flight } = setup();
    expect(flight.cycleMode()).toBe('assist');
    expect(flight.cycleMode()).toBe('newton');
    expect(flight.cycleMode()).toBe('arcade');
  });

  it('uebernimmt beim Wechsel nach Arcade die vorhandene Geschwindigkeit', () => {
    const { flight } = setup();
    flight.setMode('assist');
    flight.setSpeed = 180;
    run(flight, 30);

    flight.setMode('arcade');
    const jump = Math.abs(flight.getSpeed() - 180);
    expect(jump).toBeLessThan(1);
    expect(flight.setSpeed).toBeCloseTo(180, 0);
  });

  it('meldet assistEnabled nur ausserhalb des freien Newton-Modus', () => {
    const { flight } = setup();
    expect(flight.assistEnabled).toBe(true);
    flight.setMode('assist');
    expect(flight.assistEnabled).toBe(true);
    flight.setMode('newton');
    expect(flight.assistEnabled).toBe(false);
  });
});
