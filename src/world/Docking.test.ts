import { describe, expect, it } from 'vitest';
import { Quaternion, Vector3 } from 'three';
import {
  createDockPath,
  createUndockPath,
  DEFAULT_DOCKING_PARAMS as P,
  DockingMachine,
  easeWithEntry,
  evaluateClearance,
  quaternionLookingAlong,
  sampleDockPath,
  shiftDockPath,
  smoothstep,
  type DockingSample,
} from './Docking';

/** Anflug, der alle Kriterien erfuellt. Einzelne Werte je Test ueberschreiben. */
function sample(overrides: Partial<DockingSample> = {}): DockingSample {
  return { distance: 900, speed: 40, noseAngle: 0.1, corridorAngle: 0.2, ...overrides };
}

const RAD = Math.PI / 180;

describe('Freigabepruefung', () => {
  it('erteilt die Freigabe im Anflugkorridor', () => {
    const result = evaluateClearance(sample());
    expect(result.granted).toBe(true);
  });

  it('lehnt ausserhalb der Reichweite ab', () => {
    const result = evaluateClearance(sample({ distance: P.clearanceRange + 1 }));
    expect(result.granted).toBe(false);
    if (!result.granted) expect(result.reason).toBe('range');
  });

  it('lehnt zu hohe Geschwindigkeit ab und nennt den Wert', () => {
    const result = evaluateClearance(sample({ speed: 214 }));
    expect(result.granted).toBe(false);
    if (!result.granted) {
      expect(result.reason).toBe('speed');
      expect(result.message).toContain('ZU SCHNELL');
      expect(result.message).toContain('214');
    }
  });

  it('lehnt einen schraegen Anflugwinkel ab', () => {
    const result = evaluateClearance(sample({ noseAngle: 50 * RAD }));
    expect(result.granted).toBe(false);
    if (!result.granted) expect(result.reason).toBe('angle');
  });

  it('lehnt ab, wenn das Schiff seitlich der Bucht steht', () => {
    const result = evaluateClearance(sample({ corridorAngle: 80 * RAD }));
    expect(result.granted).toBe(false);
    if (!result.granted) expect(result.reason).toBe('corridor');
  });

  it('meldet den zuerst zu behebenden Fehler, nicht alle auf einmal', () => {
    const result = evaluateClearance(sample({ distance: 5000, speed: 400, noseAngle: 3 }));
    expect(result.granted).toBe(false);
    if (!result.granted) expect(result.reason).toBe('range');
  });

  it('laesst die Grenzwerte selbst noch durch', () => {
    const edge = sample({
      distance: P.clearanceRange,
      speed: P.clearanceSpeed,
      noseAngle: P.maxNoseAngle,
      corridorAngle: P.maxCorridorAngle,
    });
    expect(evaluateClearance(edge).granted).toBe(true);
  });

  it('meldet ohne Umlaute — das HUD kennt nur Grossbuchstaben', () => {
    const cases: DockingSample[] = [
      sample({ distance: 9000 }),
      sample({ corridorAngle: 2 }),
      sample({ noseAngle: 1 }),
      sample({ speed: 300 }),
      sample(),
    ];
    for (const c of cases) {
      const message = evaluateClearance(c).message;
      expect(message).toBe(message.toUpperCase());
      // Erlaubt sind ASCII plus die im HUD ueblichen Trennzeichen.
      expect(message).toMatch(/^[\x20-\x7E—·]+$/);
    }
  });
});

describe('Zustandsmaschine', () => {
  it('faengt weit draussen an', () => {
    expect(new DockingMachine().state).toBe('far');
  });

  it('schaltet bei Annaeherung auf in-range und wieder zurueck', () => {
    const m = new DockingMachine();
    m.update(0.1, sample({ distance: P.rangeIn - 1 }));
    expect(m.state).toBe('in-range');
    m.update(0.1, sample({ distance: P.rangeOut + 1 }));
    expect(m.state).toBe('far');
  });

  it('haelt die Hysterese zwischen rangeIn und rangeOut', () => {
    const m = new DockingMachine();
    m.update(0.1, sample({ distance: P.rangeIn - 1 }));
    m.update(0.1, sample({ distance: (P.rangeIn + P.rangeOut) / 2 }));
    expect(m.state).toBe('in-range');
  });

  it('geht nach der Freigabe erst nach kurzer Pause in den Anflug', () => {
    const m = new DockingMachine();
    m.update(0.1, sample());
    expect(m.requestClearance(sample()).granted).toBe(true);
    expect(m.state).toBe('cleared');

    m.update(P.clearanceHold * 0.5, sample());
    expect(m.state).toBe('cleared');
    m.update(P.clearanceHold, sample());
    expect(m.state).toBe('docking');
    expect(m.duration).toBeGreaterThanOrEqual(P.minDockDuration);
    expect(m.duration).toBeLessThanOrEqual(P.maxDockDuration);
  });

  it('bricht den Anflug bei erneutem Tastendruck ab', () => {
    const m = new DockingMachine();
    m.update(0.1, sample());
    m.requestClearance(sample());
    const second = m.requestClearance(sample());
    expect(second.granted).toBe(false);
    expect(m.state).toBe('in-range');
  });

  it('laesst die Freigabe verfallen, wenn das Schiff wegfliegt', () => {
    const m = new DockingMachine();
    m.update(0.1, sample());
    m.requestClearance(sample());
    m.update(0.1, sample({ distance: P.clearanceExpire + 10 }));
    expect(m.state).toBe('in-range');
    expect(m.message).toContain('VERFALLEN');
  });

  it('laeuft von docking nach docked und bleibt dort', () => {
    const m = docked();
    expect(m.progress).toBe(1);
    for (let i = 0; i < 100; i++) m.update(0.1, sample({ distance: 10, speed: 0 }));
    expect(m.state).toBe('docked');
  });

  it('verweigert eine Freigabe, solange angedockt', () => {
    const m = docked();
    const result = m.requestClearance(sample({ distance: 5, speed: 0 }));
    expect(result.granted).toBe(false);
    if (!result.granted) expect(result.reason).toBe('state');
  });

  it('legt ab und gibt die Steuerung frei', () => {
    const m = docked();
    expect(m.requestUndock()).toBe(true);
    expect(m.state).toBe('undocking');
    expect(m.controlsShip).toBe(true);

    // Der Schritt, in dem der Autopilot loslaesst, endet in `far`.
    const outside = sample({ distance: P.undockDistance, speed: 0 });
    let released = '';
    for (let t = 0; t < P.undockDuration + 1; t += 1 / 60) {
      const state = m.update(1 / 60, outside);
      if (!m.controlsShip) {
        released = state;
        break;
      }
    }
    expect(released).toBe('far');

    // Direkt danach ist die Station wieder schlicht in Reichweite.
    m.update(1 / 60, outside);
    expect(m.state).toBe('in-range');
    expect(m.controlsShip).toBe(false);
  });

  it('legt nur aus dem angedockten Zustand ab', () => {
    const m = new DockingMachine();
    expect(m.requestUndock()).toBe(false);
    m.update(0.1, sample());
    expect(m.requestUndock()).toBe(false);
  });

  it('uebergibt die Steuerung genau in docking/docked/undocking', () => {
    const m = new DockingMachine();
    expect(m.controlsShip).toBe(false);
    m.update(0.1, sample());
    expect(m.controlsShip).toBe(false);
    m.requestClearance(sample());
    expect(m.controlsShip).toBe(false); // cleared: der Pilot fliegt noch selbst
    m.update(P.clearanceHold, sample());
    expect(m.controlsShip).toBe(true);
  });

  it('dockt aus kurzer Entfernung schneller an als aus grosser', () => {
    expect(durationFrom(200)).toBeLessThan(durationFrom(1500));
  });
});

/** Maschine bis in den Zustand `docked` fahren. */
function docked(): DockingMachine {
  const m = new DockingMachine();
  const close = sample({ distance: 400, speed: 30 });
  m.update(0.1, close);
  m.requestClearance(close);
  step(m, P.clearanceHold + P.maxDockDuration + 0.5, close);
  if (m.state !== 'docked') throw new Error(`erwartet docked, ist ${m.state}`);
  return m;
}

/** `seconds` in 1/60-Schritten simulieren. */
function step(m: DockingMachine, seconds: number, s: DockingSample): void {
  const dt = 1 / 60;
  for (let t = 0; t < seconds; t += dt) m.update(dt, s);
}

function durationFrom(distance: number): number {
  const m = new DockingMachine();
  const s = sample({ distance, speed: 20 });
  m.update(0.1, s);
  m.requestClearance(s);
  m.update(P.clearanceHold, s);
  return m.duration;
}

describe('Zeitkennlinie', () => {
  it('faengt bei 0 an und endet bei 1', () => {
    for (const rate of [0, 0.4, 1.2]) {
      expect(easeWithEntry(0, rate)).toBeCloseTo(0);
      expect(easeWithEntry(1, rate)).toBeCloseTo(1);
    }
  });

  it('steigt monoton', () => {
    for (const rate of [0, 0.5, 1.2]) {
      let last = -1;
      for (let t = 0; t <= 1.0001; t += 0.01) {
        const v = easeWithEntry(t, rate);
        expect(v).toBeGreaterThanOrEqual(last);
        last = v;
      }
    }
  });

  it('startet mit der uebergebenen Anfangsgeschwindigkeit', () => {
    const h = 1e-4;
    expect(easeWithEntry(h, 1) / h).toBeCloseTo(1, 2);
    // Ohne Anfangsgeschwindigkeit steht die Bewegung am Anfang still.
    expect(easeWithEntry(h, 0) / h).toBeCloseTo(0, 2);
  });

  it('laeuft am Ende immer aus', () => {
    const h = 1e-4;
    for (const rate of [0, 1.2]) {
      const slope = (easeWithEntry(1, rate) - easeWithEntry(1 - h, rate)) / h;
      expect(Math.abs(slope)).toBeLessThan(0.01);
    }
  });

  it('klemmt ausserhalb von 0..1', () => {
    expect(easeWithEntry(-5, 0.5)).toBe(0);
    expect(easeWithEntry(5, 0.5)).toBe(1);
    expect(smoothstep(-1)).toBe(0);
    expect(smoothstep(2)).toBe(1);
  });
});

describe('Lage aus Flugrichtung', () => {
  it('legt die Nase (-Z) auf die Flugrichtung', () => {
    const forward = new Vector3(0.3, -0.6, 0.74).normalize();
    const q = quaternionLookingAlong(forward, new Vector3(0, 1, 0), new Quaternion());
    const nose = new Vector3(0, 0, -1).applyQuaternion(q);
    expect(nose.distanceTo(forward)).toBeLessThan(1e-6);
  });

  it('kommt auch zurecht, wenn die Referenz parallel liegt', () => {
    const forward = new Vector3(0, 1, 0);
    const q = quaternionLookingAlong(forward, new Vector3(0, 1, 0), new Quaternion());
    const nose = new Vector3(0, 0, -1).applyQuaternion(q);
    expect(nose.distanceTo(forward)).toBeLessThan(1e-6);
    expect(Number.isNaN(q.x)).toBe(false);
  });
});

// Bucht bei z = -1000, Einflugachse zeigt nach +Z heraus.
const AXIS_OUT = new Vector3(0, 0, 1);
const DOCK = {
  position: new Vector3(0, 0, -1000),
  quaternion: new Quaternion(),
};

describe('Anflugbahn', () => {
  const ship = {
    position: new Vector3(300, 120, -100),
    quaternion: new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), 0.9),
  };

  it('faengt beim Schiff an und endet exakt am Andockpunkt', () => {
    const path = createDockPath(ship, DOCK, AXIS_OUT, 10, 60);
    const p = new Vector3();
    const q = new Quaternion();

    sampleDockPath(path, 0, p, q);
    expect(p.distanceTo(ship.position)).toBeLessThan(1e-6);
    expect(q.angleTo(ship.quaternion)).toBeLessThan(1e-6);

    sampleDockPath(path, 1, p, q);
    expect(p.distanceTo(DOCK.position)).toBeLessThan(1e-6);
    expect(q.angleTo(DOCK.quaternion)).toBeLessThan(1e-6);
  });

  it('faehrt am Ende auf der Einflugachse hinein', () => {
    const path = createDockPath(ship, DOCK, AXIS_OUT, 10, 60);
    const a = new Vector3();
    const b = new Vector3();
    const q = new Quaternion();
    sampleDockPath(path, 0.985, a, q);
    sampleDockPath(path, 1, b, q);

    // Restweg fast rein entlang -axisOut, also praktisch kein Querversatz.
    const rest = b.sub(a);
    const along = rest.dot(AXIS_OUT);
    expect(along).toBeLessThan(0);
    expect(rest.addScaledVector(AXIS_OUT, -along).length()).toBeLessThan(
      Math.abs(along) * 0.05,
    );
  });

  it('ist ausgerichtet, bevor es in die Bucht geht', () => {
    const path = createDockPath(ship, DOCK, AXIS_OUT, 10, 60);
    const p = new Vector3();
    const q = new Quaternion();
    sampleDockPath(path, path.alignEnd, p, q);
    expect(q.angleTo(DOCK.quaternion)).toBeLessThan(1e-6);
  });

  it('naehert sich monoton — kein Ausholen nach hinten', () => {
    const path = createDockPath(ship, DOCK, AXIS_OUT, 10, 60);
    const p = new Vector3();
    const q = new Quaternion();
    let last = Infinity;
    for (let t = 0; t <= 1.0001; t += 0.02) {
      sampleDockPath(path, t, p, q);
      const d = p.distanceTo(DOCK.position);
      expect(d).toBeLessThanOrEqual(last + 1e-6);
      last = d;
    }
  });

  it('bleibt auch aus kurzer Entfernung sinnvoll', () => {
    const near = {
      position: new Vector3(0, 20, -880),
      quaternion: new Quaternion(),
    };
    const path = createDockPath(near, DOCK, AXIS_OUT, 8, 10);
    // Stuetzpunkt darf nicht hinter dem Schiff liegen, sonst zieht die Bahn
    // erst wieder aus der Bucht heraus.
    expect(path.control.distanceTo(DOCK.position)).toBeLessThanOrEqual(
      near.position.distanceTo(DOCK.position) + 1e-6,
    );
  });

  it('uebernimmt die Anfangsgeschwindigkeit in die Kennlinie', () => {
    const fast = createDockPath(ship, DOCK, AXIS_OUT, 10, 100);
    const slow = createDockPath(ship, DOCK, AXIS_OUT, 10, 0);
    expect(fast.entryRate).toBeGreaterThan(slow.entryRate);
    expect(slow.entryRate).toBe(0);
    expect(fast.entryRate).toBeLessThanOrEqual(1.2);
  });

  it('wandert beim Floating-Origin-Sprung mit', () => {
    const path = createDockPath(ship, DOCK, AXIS_OUT, 10, 60);
    const before = new Vector3();
    const after = new Vector3();
    const q = new Quaternion();
    sampleDockPath(path, 0.5, before, q);

    const offset = new Vector3(10_000, -2000, 500);
    shiftDockPath(path, offset);
    sampleDockPath(path, 0.5, after, q);
    expect(after.distanceTo(before.sub(offset))).toBeLessThan(1e-6);
  });
});

describe('Ablegebahn', () => {
  const up = new Vector3(0, 1, 0);

  it('faehrt rueckwaerts aus der Bucht heraus', () => {
    const path = createUndockPath(DOCK, AXIS_OUT, up);
    const p = new Vector3();
    const q = new Quaternion();

    sampleDockPath(path, 0, p, q);
    expect(p.distanceTo(DOCK.position)).toBeLessThan(1e-6);

    sampleDockPath(path, 1, p, q);
    expect(p.distanceTo(DOCK.position)).toBeCloseTo(P.undockDistance, 3);
    expect(p.clone().sub(DOCK.position).normalize().dot(AXIS_OUT)).toBeCloseTo(1, 6);
  });

  it('haelt die Lage, bis das Schiff aus der Bucht ist', () => {
    const path = createUndockPath(DOCK, AXIS_OUT, up);
    const p = new Vector3();
    const q = new Quaternion();
    sampleDockPath(path, path.alignStart, p, q);
    expect(q.angleTo(DOCK.quaternion)).toBeLessThan(1e-6);
    // Zu diesem Zeitpunkt ist die Bucht (Tiefe ~40 m) schon verlassen.
    expect(p.distanceTo(DOCK.position)).toBeGreaterThan(100);
  });

  it('dreht am Ende von der Station weg', () => {
    const path = createUndockPath(DOCK, AXIS_OUT, up);
    const p = new Vector3();
    const q = new Quaternion();
    sampleDockPath(path, 1, p, q);
    const nose = new Vector3(0, 0, -1).applyQuaternion(q);
    expect(nose.dot(AXIS_OUT)).toBeCloseTo(1, 6);
  });
});
