import { describe, expect, it } from 'vitest';
import { PerspectiveCamera, Vector3 } from 'three';
import { CameraShake, DEFAULT_SHAKE_PARAMS } from './CameraShake';

function camera(): PerspectiveCamera {
  return new PerspectiveCamera(65, 16 / 9, 0.05, 1e7);
}

describe('CameraShake', () => {
  it('faengt in Ruhe an und laesst die Kamera unangetastet', () => {
    const shake = new CameraShake();
    const cam = camera();
    shake.update(0.016);
    shake.applyTo(cam);

    expect(shake.getTrauma()).toBe(0);
    expect(cam.position.equals(new Vector3())).toBe(true);
  });

  it('versetzt die Kamera nach einem Stoss', () => {
    const shake = new CameraShake();
    const cam = camera();
    shake.add(1);
    shake.update(0.016);
    shake.applyTo(cam);

    expect(cam.position.length()).toBeGreaterThan(0);
    // Nie mehr als der Vollausschlag auf beiden Achsen zusammen.
    expect(cam.position.length()).toBeLessThanOrEqual(DEFAULT_SHAKE_PARAMS.maxOffset * Math.SQRT2);
  });

  it('klingt ab und kommt zur Ruhe', () => {
    const shake = new CameraShake();
    shake.add(1);
    for (let i = 0; i < 200; i++) shake.update(1 / 60);
    expect(shake.getTrauma()).toBe(0);

    const cam = camera();
    shake.applyTo(cam);
    expect(cam.position.length()).toBe(0);
  });

  it('bleibt bei 1 gedeckelt, egal wie viele Stoesse kommen', () => {
    const shake = new CameraShake();
    for (let i = 0; i < 10; i++) shake.add(0.5);
    expect(shake.getTrauma()).toBe(1);
  });

  it('wackelt bei starkem Stoss deutlicher als bei schwachem', () => {
    const strong = new CameraShake();
    const weak = new CameraShake();
    const camStrong = camera();
    const camWeak = camera();

    strong.add(1);
    weak.add(0.25);
    strong.update(0.02);
    weak.update(0.02);
    strong.applyTo(camStrong);
    weak.applyTo(camWeak);

    expect(camStrong.position.length()).toBeGreaterThan(camWeak.position.length() * 3);
  });

  it('laeuft deterministisch', () => {
    const run = (): number[] => {
      const shake = new CameraShake();
      const cam = camera();
      shake.add(0.8);
      const samples: number[] = [];
      for (let i = 0; i < 20; i++) {
        shake.update(1 / 60);
        cam.position.set(0, 0, 0);
        cam.quaternion.identity();
        shake.applyTo(cam);
        samples.push(cam.position.x);
      }
      return samples;
    };
    expect(run()).toEqual(run());
  });
});
