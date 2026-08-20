import { describe, expect, it } from 'vitest';
import { Matrix4, Quaternion, Vector3 } from 'three';
import type { AsteroidField, AsteroidSize, MineralId, SurfaceSample } from './AsteroidTypes';
import {
  computeTouchdownPose,
  createAscentPath,
  createDescentPath,
  createLandingSample,
  DEFAULT_LANDING_PARAMS,
  evaluateLandingClearance,
  LandingMachine,
  readAsteroidOrientation,
  sampleLandingPath,
  SurfaceAnchor,
  type LandingSample,
} from './Landing';

/**
 * Ein Brocken, sonst nichts: Kugel mit Mittelpunkt, Radius und Eigendrehung.
 * Genau das, was {@link AsteroidField} verspricht — die Landung darf nichts
 * darueber hinaus voraussetzen, weil das echte Feld gerade umgebaut wird.
 */
class FakeField implements AsteroidField {
  readonly count = 1;
  readonly center = new Vector3(0, 0, -900);
  readonly orientation = new Quaternion();
  radius = 300;
  alive = true;
  landable = true;
  generation = 0;
  /** Meldet dieses Feld seine Eigendrehung? */
  reportsOrientation = true;

  isAlive(): boolean {
    return this.alive;
  }

  getCenter(_index: number, out: Vector3): Vector3 {
    return out.copy(this.center);
  }

  getRadius(): number {
    return this.radius;
  }

  getMineral(): MineralId {
    return 'iron';
  }

  getSizeClass(): AsteroidSize {
    return this.landable ? 'huge' : 'medium';
  }

  isLandable(): boolean {
    return this.landable;
  }

  getGeneration(): number {
    return this.generation;
  }

  getRemainingTons(): number {
    return 1000;
  }

  getTotalTons(): number {
    return 1000;
  }

  mine(_index: number, tons: number): number {
    return tons;
  }

  sampleSurface(_index: number, from: Vector3, out: SurfaceSample): boolean {
    if (!this.alive) return false;
    out.normal.copy(from).sub(this.center);
    const distance = out.normal.length();
    if (distance < 1e-4) return false;
    out.normal.divideScalar(distance);
    out.point.copy(this.center).addScaledVector(out.normal, this.radius);
    return true;
  }

  getOrientation(_index: number, out: Quaternion): Quaternion {
    if (!this.reportsOrientation) throw new Error('nicht gemeldet');
    return out.copy(this.orientation);
  }
}

function sampleFor(overrides: Partial<LandingSample> = {}): LandingSample {
  return {
    ...createLandingSample(),
    hasTarget: true,
    landable: true,
    hasSurface: true,
    altitude: 300,
    speed: 20,
    sizeName: 'Planetoid',
    ...overrides,
  };
}

describe('evaluateLandingClearance', () => {
  it('gibt frei, wenn alles stimmt', () => {
    const result = evaluateLandingClearance(sampleFor());
    expect(result.granted).toBe(true);
  });

  it('nennt fehlendes Ziel zuerst', () => {
    const result = evaluateLandingClearance(sampleFor({ hasTarget: false, altitude: 5000 }));
    expect(result.granted).toBe(false);
    if (result.granted) return;
    expect(result.reason).toBe('target');
    expect(result.message).toContain('KEIN ZIEL');
  });

  it('lehnt zu kleine Brocken mit ihrer Groessenklasse ab', () => {
    const result = evaluateLandingClearance(sampleFor({ landable: false, sizeName: 'Felsen' }));
    expect(result.granted).toBe(false);
    if (result.granted) return;
    expect(result.reason).toBe('landable');
    expect(result.message).toContain('KEIN LANDEPLATZ');
    expect(result.message).toContain('FELSEN');
  });

  it('lehnt zu grosse Entfernung ab und nennt die Hoehe', () => {
    const result = evaluateLandingClearance(sampleFor({ altitude: 2000 }));
    expect(result.granted).toBe(false);
    if (result.granted) return;
    expect(result.reason).toBe('range');
    expect(result.message).toContain('ZU WEIT');
    expect(result.message).toContain('2000');
  });

  it('lehnt zu hohe Geschwindigkeit ab und nennt sie', () => {
    const result = evaluateLandingClearance(sampleFor({ speed: 210 }));
    expect(result.granted).toBe(false);
    if (result.granted) return;
    expect(result.reason).toBe('speed');
    expect(result.message).toContain('ZU SCHNELL');
    expect(result.message).toContain('210');
  });

  it('prueft die Entfernung vor der Geschwindigkeit', () => {
    // Wer zu weit weg *und* zu schnell ist, soll erst herkommen.
    const result = evaluateLandingClearance(sampleFor({ altitude: 2000, speed: 400 }));
    expect(result.granted).toBe(false);
    if (result.granted) return;
    expect(result.reason).toBe('range');
  });
});

describe('LandingMachine', () => {
  it('laeuft von far bis landed und wieder zurueck', () => {
    const machine = new LandingMachine();
    expect(machine.state).toBe('far');

    machine.update(1 / 60, sampleFor({ altitude: 5000 }));
    expect(machine.state).toBe('far');

    machine.update(1 / 60, sampleFor({ altitude: 900 }));
    expect(machine.state).toBe('in-range');

    expect(machine.requestLanding(sampleFor({ altitude: 400 })).granted).toBe(true);
    expect(machine.state).toBe('cleared');
    expect(machine.controlsShip).toBe(false);

    // Wartezeit bis der Autopilot uebernimmt.
    for (let i = 0; i < 200 && machine.state === 'cleared'; i++) {
      machine.update(1 / 60, sampleFor({ altitude: 400 }));
    }
    expect(machine.state).toBe('descending');
    expect(machine.controlsShip).toBe(true);
    expect(machine.holdsSite).toBe(true);

    for (let i = 0; i < 3000 && machine.state === 'descending'; i++) {
      machine.update(1 / 60, sampleFor({ altitude: 100 }));
    }
    expect(machine.state).toBe('landed');
    expect(machine.isLanded).toBe(true);

    expect(machine.requestLiftoff()).toBe(true);
    expect(machine.state).toBe('ascending');
    for (let i = 0; i < 3000 && machine.state === 'ascending'; i++) {
      machine.update(1 / 60, sampleFor({ altitude: 200 }));
    }
    expect(machine.state).toBe('far');
    expect(machine.controlsShip).toBe(false);
    expect(machine.isLanded).toBe(false);
  });

  it('gilt ein kleiner Brocken nie als in Reichweite', () => {
    const machine = new LandingMachine();
    machine.update(1 / 60, sampleFor({ altitude: 100, landable: false }));
    expect(machine.state).toBe('far');
  });

  it('laesst die Freigabe verfallen, wenn das Schiff wieder wegfliegt', () => {
    const machine = new LandingMachine();
    machine.update(1 / 60, sampleFor({ altitude: 900 }));
    machine.requestLanding(sampleFor({ altitude: 400 }));
    machine.update(1 / 60, sampleFor({ altitude: 5000 }));
    expect(machine.state).toBe('in-range');
    expect(machine.message).toContain('VERFALLEN');
  });

  it('bricht auf zweiten Tastendruck ab, statt den Piloten festzuhalten', () => {
    const machine = new LandingMachine();
    machine.update(1 / 60, sampleFor({ altitude: 900 }));
    machine.requestLanding(sampleFor({ altitude: 400 }));
    const second = machine.requestLanding(sampleFor({ altitude: 400 }));
    expect(second.granted).toBe(false);
    expect(machine.state).toBe('in-range');
  });

  it('haelt den Sinkflug gegen einen zweiten Tastendruck', () => {
    const machine = new LandingMachine();
    machine.update(1 / 60, sampleFor({ altitude: 900 }));
    machine.requestLanding(sampleFor({ altitude: 400 }));
    for (let i = 0; i < 200 && machine.state === 'cleared'; i++) {
      machine.update(1 / 60, sampleFor({ altitude: 400 }));
    }
    expect(machine.state).toBe('descending');
    expect(machine.requestLanding(sampleFor()).granted).toBe(false);
    expect(machine.state).toBe('descending');
  });

  it('gibt das Schiff frei, wenn der Landeplatz verschwindet', () => {
    const machine = new LandingMachine();
    machine.update(1 / 60, sampleFor({ altitude: 900 }));
    machine.requestLanding(sampleFor({ altitude: 400 }));
    for (let i = 0; i < 200 && machine.state === 'cleared'; i++) {
      machine.update(1 / 60, sampleFor({ altitude: 400 }));
    }
    machine.abort();
    expect(machine.state).toBe('far');
    expect(machine.controlsShip).toBe(false);
    expect(machine.holdsSite).toBe(false);
  });
});

describe('computeTouchdownPose', () => {
  const params = DEFAULT_LANDING_PARAMS;

  it('stellt das Schiff auf den Fels, nicht hinein', () => {
    const surface: SurfaceSample = {
      point: new Vector3(0, 300, 0),
      normal: new Vector3(0, 1, 0),
    };
    const pose = { position: new Vector3(), quaternion: new Quaternion() };
    computeTouchdownPose(surface, new Quaternion(), params.hullHeight, pose);

    expect(pose.position.y).toBeCloseTo(300 + params.hullHeight, 6);
    // Hochachse des Schiffs faellt mit der Normalen zusammen.
    const up = new Vector3(0, 1, 0).applyQuaternion(pose.quaternion);
    expect(up.dot(surface.normal)).toBeCloseTo(1, 6);
  });

  it('richtet sich auch auf einer schraegen Flanke nach der Normalen aus', () => {
    const normal = new Vector3(0.5, 0.7, -0.3).normalize();
    const surface: SurfaceSample = {
      point: normal.clone().multiplyScalar(300),
      normal: normal.clone(),
    };
    const ship = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), 0.6);
    const pose = { position: new Vector3(), quaternion: new Quaternion() };
    computeTouchdownPose(surface, ship, params.hullHeight, pose);

    const up = new Vector3(0, 1, 0).applyQuaternion(pose.quaternion);
    expect(up.dot(normal)).toBeCloseTo(1, 6);
    // Die Nase liegt in der Tangentialebene — sonst bohrte sie sich in den Fels.
    const nose = new Vector3(0, 0, -1).applyQuaternion(pose.quaternion);
    expect(Math.abs(nose.dot(normal))).toBeLessThan(1e-6);
    // Und die Mitte steht genau eine Rumpfhoehe ueber dem Aufsetzpunkt.
    expect(pose.position.distanceTo(surface.point)).toBeCloseTo(params.hullHeight, 6);
  });

  it('faellt nicht um, wenn die Nase senkrecht auf den Fels zeigt', () => {
    const surface: SurfaceSample = {
      point: new Vector3(0, 300, 0),
      normal: new Vector3(0, 1, 0),
    };
    // Nase (-Z) zeigt gerade nach unten, also entgegen der Normalen.
    const ship = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
    const pose = { position: new Vector3(), quaternion: new Quaternion() };
    computeTouchdownPose(surface, ship, params.hullHeight, pose);

    const up = new Vector3(0, 1, 0).applyQuaternion(pose.quaternion);
    expect(up.dot(surface.normal)).toBeCloseTo(1, 6);
    expect(Number.isNaN(pose.quaternion.x)).toBe(false);
  });
});

describe('Sinkkurve', () => {
  const params = DEFAULT_LANDING_PARAMS;
  const center = new Vector3(0, 0, 0);
  const radius = 300;

  function pathFromAltitude(altitude: number, entrySpeed: number) {
    const shipPosition = new Vector3(0, radius + altitude, 0);
    const surface: SurfaceSample = {
      point: new Vector3(0, radius, 0),
      normal: new Vector3(0, 1, 0),
    };
    const touchdown = { position: new Vector3(), quaternion: new Quaternion() };
    computeTouchdownPose(surface, new Quaternion(), params.hullHeight, touchdown);
    return createDescentPath(
      { position: shipPosition, quaternion: new Quaternion() },
      touchdown,
      surface.normal,
      9,
      entrySpeed,
      params,
    );
  }

  it('beginnt am Schiff und endet auf dem Aufsetzpunkt', () => {
    const path = pathFromAltitude(400, 40);
    const position = new Vector3();
    const quaternion = new Quaternion();

    sampleLandingPath(path, 0, position, quaternion);
    expect(position.distanceTo(path.start.position)).toBeLessThan(1e-6);

    sampleLandingPath(path, 1, position, quaternion);
    expect(position.distanceTo(path.end.position)).toBeLessThan(1e-6);
    expect(position.distanceTo(center)).toBeCloseTo(radius + params.hullHeight, 4);
  });

  it('sinkt weich statt linear: langsam am Ende, kein Ruck am Anfang', () => {
    const path = pathFromAltitude(400, 60);
    const position = new Vector3();
    const quaternion = new Quaternion();
    const step = 1 / 240;

    let previous = new Vector3().copy(path.start.position);
    let first = 0;
    let last = 0;
    for (let t = step; t <= 1 + 1e-9; t += step) {
      sampleLandingPath(path, t, position, quaternion);
      const speed = position.distanceTo(previous) / (step * path.duration);
      if (t <= step + 1e-9) first = speed;
      last = speed;
      previous = position.clone();
    }
    // Anfangsgeschwindigkeit passt zur Anflugfahrt — der Autopilot uebernimmt
    // ohne sichtbares Stehenbleiben.
    expect(first).toBeGreaterThan(30);
    // Und setzt am Ende praktisch im Stand auf.
    expect(last).toBeLessThan(first * 0.2);
  });

  it('bleibt ueber der Oberflaeche, statt durch den Fels abzukuerzen', () => {
    const path = pathFromAltitude(600, 50);
    const position = new Vector3();
    const quaternion = new Quaternion();
    for (let t = 0; t <= 1; t += 0.01) {
      sampleLandingPath(path, t, position, quaternion);
      expect(position.distanceTo(center)).toBeGreaterThanOrEqual(radius + params.hullHeight - 1e-6);
    }
  });

  it('hebt senkrecht von der Flaeche ab und behaelt die Lage', () => {
    const from = {
      position: new Vector3(0, radius + params.hullHeight, 0),
      quaternion: new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), 1.1),
    };
    const path = createAscentPath(from, new Vector3(0, 1, 0), params);
    const position = new Vector3();
    const quaternion = new Quaternion();

    let previous = -Infinity;
    for (let t = 0; t <= 1; t += 0.05) {
      sampleLandingPath(path, t, position, quaternion);
      expect(position.x).toBeCloseTo(0, 6);
      expect(position.z).toBeCloseTo(0, 6);
      expect(position.y).toBeGreaterThanOrEqual(previous);
      previous = position.y;
      expect(quaternion.angleTo(from.quaternion)).toBeCloseTo(0, 6);
    }
    sampleLandingPath(path, 1, position, quaternion);
    expect(position.y).toBeCloseTo(radius + params.hullHeight + params.liftoffHeight, 4);
  });
});

describe('readAsteroidOrientation', () => {
  it('nimmt die gemeldete Eigendrehung, wenn das Feld sie kennt', () => {
    const field = new FakeField();
    field.orientation.setFromAxisAngle(new Vector3(0, 1, 0), 0.8);
    const out = new Quaternion();
    readAsteroidOrientation(field, 0, out);
    expect(out.angleTo(field.orientation)).toBeCloseTo(0, 6);
  });

  it('liest sonst die Instanzmatrix — jedes InstancedMesh kann das', () => {
    const expected = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), 0.45);
    const matrix = new Matrix4().compose(
      new Vector3(10, 0, -20),
      expected,
      new Vector3(300, 300, 300),
    );
    // Ein Feld, das nur ein InstancedMesh ist — kein `getOrientation`.
    const field = {
      getMatrixAt(_index: number, out: Matrix4): void {
        out.copy(matrix);
      },
    } as unknown as AsteroidField;

    const out = new Quaternion();
    readAsteroidOrientation(field, 0, out);
    expect(out.angleTo(expected)).toBeCloseTo(0, 5);
  });

  it('bleibt bei der Einheitsdrehung, wenn das Feld nichts davon weiss', () => {
    const field = {} as unknown as AsteroidField;
    const out = new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), 1);
    readAsteroidOrientation(field, 0, out);
    expect(out.angleTo(new Quaternion())).toBeCloseTo(0, 6);
  });
});

describe('SurfaceAnchor', () => {
  const params = DEFAULT_LANDING_PARAMS;

  it('nimmt das Schiff mit, wenn sich der Brocken dreht', () => {
    const field = new FakeField();
    const surface: SurfaceSample = { point: new Vector3(), normal: new Vector3() };
    const ship = new Vector3(0, 400, -900); // ueber dem Nordpol des Brockens
    field.sampleSurface(0, ship, surface);

    const pose = { position: new Vector3(), quaternion: new Quaternion() };
    computeTouchdownPose(surface, new Quaternion(), params.hullHeight, pose);

    const anchor = new SurfaceAnchor();
    anchor.capture(field.center, field.orientation, pose.position, pose.quaternion);

    // Brocken um eine Vierteldrehung weiterdrehen.
    field.orientation.setFromAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
    const position = new Vector3();
    const quaternion = new Quaternion();
    anchor.apply(field.center, field.orientation, position, quaternion);

    // Der Aufsetzpunkt ist mitgewandert — aus dem Pol wird die Flanke.
    const expected = new Vector3(-(field.radius + params.hullHeight), 0, 0).add(field.center);
    expect(position.distanceTo(expected)).toBeLessThan(1e-4);
    // Und das Schiff steht immer noch genau eine Rumpfhoehe ueber dem Fels.
    expect(position.distanceTo(field.center)).toBeCloseTo(field.radius + params.hullHeight, 4);
    // Die Hochachse zeigt weiterhin vom Mittelpunkt weg.
    const up = new Vector3(0, 1, 0).applyQuaternion(quaternion);
    const outward = position.clone().sub(field.center).normalize();
    expect(up.dot(outward)).toBeCloseTo(1, 5);
  });

  it('haelt das Schiff eine Minute lang auf dem drehenden, driftenden Fels', () => {
    const field = new FakeField();
    const surface: SurfaceSample = { point: new Vector3(), normal: new Vector3() };
    const ship = new Vector3(200, 300, -700);
    field.sampleSurface(0, ship, surface);

    const pose = { position: new Vector3(), quaternion: new Quaternion() };
    computeTouchdownPose(surface, new Quaternion(), params.hullHeight, pose);

    const anchor = new SurfaceAnchor();
    anchor.capture(field.center, field.orientation, pose.position, pose.quaternion);

    const spin = new Quaternion();
    const axis = new Vector3(0.2, 1, 0.3).normalize();
    const drift = new Vector3(4, -1, 2);
    const position = new Vector3();
    const quaternion = new Quaternion();
    const dt = 1 / 60;

    for (let step = 0; step < 60 * 60; step++) {
      // So wie Asteroids.update: weiterdrehen und driften.
      spin.setFromAxisAngle(axis, 0.09 * dt);
      field.orientation.premultiply(spin).normalize();
      field.center.addScaledVector(drift, dt);

      anchor.apply(field.center, field.orientation, position, quaternion);
      // Weder eingesunken noch abgehoben — und zwar in jedem einzelnen Frame.
      expect(position.distanceTo(field.center)).toBeCloseTo(field.radius + params.hullHeight, 3);
    }

    const up = new Vector3(0, 1, 0).applyQuaternion(quaternion);
    const outward = position.clone().sub(field.center).normalize();
    expect(up.dot(outward)).toBeCloseTo(1, 4);
  });
});
