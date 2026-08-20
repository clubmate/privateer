import { describe, expect, it } from 'vitest';
import { Euler, Quaternion, Vector3 } from 'three';
import {
  ChaseCameraState,
  DEFAULT_CHASE_PARAMS,
  chaseDistance,
  chaseLookTarget,
  chaseTargetPosition,
  lookRotation,
  nextViewMode,
  smoothingFactor,
} from './ChaseCamera';

/** Blickrichtung (-Z) einer Drehung. */
function forwardOf(rotation: Quaternion): Vector3 {
  return new Vector3(0, 0, -1).applyQuaternion(rotation);
}

describe('smoothingFactor', () => {
  it('liefert 0 bei dt = 0 und naehert sich 1 bei grossem dt', () => {
    expect(smoothingFactor(0.3, 0)).toBe(0);
    expect(smoothingFactor(0.3, 5)).toBeGreaterThan(0.99);
    expect(smoothingFactor(0.3, 5)).toBeLessThanOrEqual(1);
  });

  it('bleibt fuer jedes dt im Bereich 0..1', () => {
    for (const dt of [0.001, 1 / 240, 1 / 60, 1 / 12, 0.5, 2]) {
      const factor = smoothingFactor(0.25, dt);
      expect(factor).toBeGreaterThan(0);
      expect(factor).toBeLessThanOrEqual(1);
    }
  });

  it('ist bildratenunabhaengig: zwei halbe Schritte ~ ein ganzer', () => {
    const tau = 0.3;
    const single = smoothingFactor(tau, 1 / 30);
    const half = smoothingFactor(tau, 1 / 60);
    // Zwei Teilschritte muessen denselben Restanteil uebriglassen.
    expect((1 - half) * (1 - half)).toBeCloseTo(1 - single, 12);
  });

  it('faellt fuer tau <= 0 auf "sofort" zurueck', () => {
    expect(smoothingFactor(0, 0.016)).toBe(1);
    expect(smoothingFactor(-1, 0.016)).toBe(1);
  });
});

describe('chaseDistance', () => {
  it('zieht die Kamera mit steigender Geschwindigkeit zurueck', () => {
    const still = chaseDistance(DEFAULT_CHASE_PARAMS, 0);
    const fast = chaseDistance(DEFAULT_CHASE_PARAMS, DEFAULT_CHASE_PARAMS.speedReference);
    expect(still).toBe(DEFAULT_CHASE_PARAMS.offset[2]);
    expect(fast).toBeCloseTo(still + DEFAULT_CHASE_PARAMS.speedPull, 10);
  });

  it('begrenzt den Zuschlag oberhalb der Referenzgeschwindigkeit', () => {
    const fast = chaseDistance(DEFAULT_CHASE_PARAMS, DEFAULT_CHASE_PARAMS.speedReference);
    expect(chaseDistance(DEFAULT_CHASE_PARAMS, 5000)).toBeCloseTo(fast, 10);
  });
});

describe('chaseTargetPosition', () => {
  it('setzt die Kamera hinter das Schiff (Nase = -Z)', () => {
    const out = chaseTargetPosition(
      new Vector3(),
      new Quaternion(),
      DEFAULT_CHASE_PARAMS,
      0,
      new Vector3(),
    );
    expect(out.z).toBeGreaterThan(0);
    expect(out.y).toBeCloseTo(DEFAULT_CHASE_PARAMS.offset[1], 10);
    expect(out.x).toBeCloseTo(0, 10);
  });

  it('dreht mit der Schiffslage mit', () => {
    // 90 Grad um Y: die Nase zeigt nach -X, die Kamera gehoert nach +X.
    const rotation = new Quaternion().setFromEuler(new Euler(0, Math.PI / 2, 0));
    const out = chaseTargetPosition(
      new Vector3(),
      rotation,
      DEFAULT_CHASE_PARAMS,
      0,
      new Vector3(),
    );
    expect(out.x).toBeCloseTo(DEFAULT_CHASE_PARAMS.offset[2], 6);
    expect(out.z).toBeCloseTo(0, 6);
  });

  it('folgt der Schiffsposition', () => {
    const out = chaseTargetPosition(
      new Vector3(100, -20, 7),
      new Quaternion(),
      DEFAULT_CHASE_PARAMS,
      0,
      new Vector3(),
    );
    expect(out.x).toBeCloseTo(100, 10);
    expect(out.y).toBeCloseTo(-20 + DEFAULT_CHASE_PARAMS.offset[1], 10);
  });
});

describe('chaseLookTarget', () => {
  it('liegt vor der Nase', () => {
    const out = chaseLookTarget(
      new Vector3(),
      new Quaternion(),
      DEFAULT_CHASE_PARAMS,
      new Vector3(),
    );
    expect(out.z).toBeCloseTo(-DEFAULT_CHASE_PARAMS.lookAhead, 10);
  });
});

describe('lookRotation', () => {
  it('richtet -Z auf das Ziel aus', () => {
    const eye = new Vector3(0, 0, 10);
    const target = new Vector3(0, 0, -5);
    const rotation = lookRotation(eye, target, new Vector3(0, 1, 0), new Quaternion());
    const forward = forwardOf(rotation);
    expect(forward.x).toBeCloseTo(0, 6);
    expect(forward.y).toBeCloseTo(0, 6);
    expect(forward.z).toBeCloseTo(-1, 6);
  });
});

describe('nextViewMode', () => {
  it('schaltet mit dem Tastendruck hin und her', () => {
    expect(nextViewMode('cockpit', true, false)).toBe('chase');
    expect(nextViewMode('chase', true, false)).toBe('cockpit');
  });

  it('bleibt ohne Tastendruck stehen', () => {
    expect(nextViewMode('cockpit', false, false)).toBe('cockpit');
    expect(nextViewMode('chase', false, false)).toBe('chase');
  });

  it('erzwingt beim Gehen die Cockpitansicht', () => {
    // Beim Gehen gehoert die Kamera dem WalkController; eine Aussenansicht
    // waere dort nicht nur sinnlos, sondern wuerde seine Pose ueberschreiben.
    expect(nextViewMode('chase', false, true)).toBe('cockpit');
    expect(nextViewMode('chase', true, true)).toBe('cockpit');
    expect(nextViewMode('cockpit', true, true)).toBe('cockpit');
  });
});

describe('ChaseCameraState', () => {
  const identity = new Quaternion();

  it('sitzt nach reset() genau auf der Sollpose', () => {
    const state = new ChaseCameraState();
    state.reset(new Vector3(), identity, 0);
    const target = chaseTargetPosition(
      new Vector3(),
      identity,
      state.params,
      0,
      new Vector3(),
    );
    expect(state.position.distanceTo(target)).toBeCloseTo(0, 10);
    expect(state.initialized).toBe(true);
  });

  it('initialisiert sich beim ersten step() selbst, ohne Sprung', () => {
    const state = new ChaseCameraState();
    state.step(1 / 60, new Vector3(0, 0, 0), identity, 0);
    expect(state.initialized).toBe(true);
    expect(state.position.length()).toBeGreaterThan(1);
  });

  it('naehert sich der Sollpose an, statt zu springen', () => {
    const state = new ChaseCameraState();
    state.reset(new Vector3(), identity, 0);

    const ship = new Vector3(0, 0, -50); // Schiff springt nach vorn
    const target = chaseTargetPosition(ship, identity, state.params, 0, new Vector3());
    const before = state.position.distanceTo(target);

    state.step(1 / 60, ship, identity, 0);
    const after = state.position.distanceTo(target);

    expect(after).toBeLessThan(before);
    expect(after).toBeGreaterThan(0.01); // kein harter Sprung
  });

  it('konvergiert bei ruhigem Flug auf die Sollpose', () => {
    const state = new ChaseCameraState();
    const ship = new Vector3(0, 0, -50);
    state.reset(new Vector3(), identity, 0);
    for (let i = 0; i < 600; i++) state.step(1 / 60, ship, identity, 0);

    const target = chaseTargetPosition(ship, identity, state.params, 0, new Vector3());
    expect(state.position.distanceTo(target)).toBeLessThan(0.01);
  });

  it('zieht die Lage nach: nach einer Drehung liegt sie zwischen alt und neu', () => {
    const state = new ChaseCameraState();
    state.reset(new Vector3(), identity, 0);

    const turned = new Quaternion().setFromEuler(new Euler(0, Math.PI / 2, 0));
    state.step(1 / 60, new Vector3(), turned, 0);

    const toStart = state.lag.angleTo(identity);
    const toTarget = state.lag.angleTo(turned);
    expect(toStart).toBeGreaterThan(0);
    expect(toTarget).toBeGreaterThan(0);
    expect(toStart + toTarget).toBeCloseTo(Math.PI / 2, 6);
  });

  it('holt die nachgezogene Lage nach genuegend Frames ein', () => {
    const state = new ChaseCameraState();
    state.reset(new Vector3(), identity, 0);
    const turned = new Quaternion().setFromEuler(new Euler(0, Math.PI / 2, 0));
    for (let i = 0; i < 600; i++) state.step(1 / 60, new Vector3(), turned, 0);
    expect(state.lag.angleTo(turned)).toBeLessThan(1e-3);
  });

  it('blickt immer in Richtung des Punktes vor dem Schiff', () => {
    const state = new ChaseCameraState();
    const ship = new Vector3(12, -3, 40);
    state.reset(ship, identity, 0);

    const look = chaseLookTarget(ship, identity, state.params, new Vector3());
    const expected = look.clone().sub(state.position).normalize();
    const actual = forwardOf(state.rotation);
    expect(actual.dot(expected)).toBeCloseTo(1, 6);
  });

  it('rollt mit dem Schiff mit', () => {
    const state = new ChaseCameraState();
    const rolled = new Quaternion().setFromEuler(new Euler(0, 0, Math.PI / 2));
    state.reset(new Vector3(), rolled, 0);

    const up = new Vector3(0, 1, 0).applyQuaternion(state.rotation);
    // Bei 90 Grad Rolle zeigt "oben" der Kamera zur Seite.
    expect(Math.abs(up.x)).toBeGreaterThan(0.9);
  });

  it('haelt bei hoher Geschwindigkeit mehr Abstand', () => {
    const slow = new ChaseCameraState();
    const fast = new ChaseCameraState();
    slow.reset(new Vector3(), identity, 0);
    fast.reset(new Vector3(), identity, 500);
    expect(fast.position.length()).toBeGreaterThan(slow.position.length());
  });
});
