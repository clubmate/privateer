import { describe, it } from 'vitest';
import { Vector3 } from 'three';
import { Asteroids } from './Asteroids';
import { AsteroidDust } from './AsteroidDust';
import { RockGeometryBuild, RockShape, buildRockGeometry } from './AsteroidShapes';

/**
 * Zeitmessung, kein Test. Laeuft nur, wenn `BENCH=1` gesetzt ist — sonst
 * haengt sie an jedem regulaeren Durchlauf drei Sekunden dran:
 *
 *     BENCH=1 npx vitest run src/world/__bench.test.ts
 *
 * Warum in Node und nicht im Browser: `requestAnimationFrame` laeuft in einem
 * ferngesteuerten Tab nicht, und GPU-Timer liefern auf ANGLE/Metal
 * widerspruechliche Werte. Was hier steht, ist reine Rechenzeit ohne GPU —
 * und die ist reproduzierbar.
 */
const node = globalThis as unknown as {
  process?: { env: Record<string, string | undefined>; hrtime: { bigint(): bigint } };
};
const run = node.process?.env['BENCH'] === '1';
const clock = (): bigint => node.process!.hrtime.bigint();

function bench(label: string, iterations: number, fn: () => void): void {
  fn();
  fn();
  const t = clock();
  for (let i = 0; i < iterations; i++) fn();
  const ns = Number(clock() - t) / iterations;
  const perFrame = ns / 1e6;
  console.log(
    `${label.padEnd(46)} ${perFrame.toFixed(3).padStart(9)} ms/Aufruf` +
      `   (${(perFrame * 60).toFixed(1)} ms/s bei 60 Hz)`,
  );
}

describe.skipIf(!run)('Messung', () => {
  it('Asteroidenfeld', () => {
    const field = new Asteroids();
    const origin = new Vector3(0, 0, 0);
    const dir = new Vector3(0, 0, -1);

    bench('Asteroids.update(dt) — 420 Plaetze', 400, () => field.update(1 / 60));

    const out = { point: new Vector3(), normal: new Vector3() };
    bench('sampleSurface (ein Brocken)', 20000, () => field.sampleSurface(0, origin, out));
    bench('hitSegment 3000 m durchs Feld', 2000, () =>
      field.hitSegment(origin, dir, 3000),
    );
    // Ein Geschoss legt bei 1100 m/s und 120 Hz genau so weit zurueck.
    bench('hitSegment 9 m (ein Geschossschritt)', 20000, () =>
      field.hitSegment(origin, dir, 9.2),
    );
    bench('getCenter', 200000, () => field.getCenter(7, out.point));

    const shape = new RockShape('cratered', 5, true);
    bench('RockShape.radius (Planetoid, fein)', 100000, () => shape.radius(0.3, 0.5, 0.81));
    bench('RockShape.cavity', 200000, () => shape.cavity(0.3, 0.5, 0.81));
    bench('RockShape.ejecta', 200000, () => shape.ejecta(0.3, 0.5, 0.81));
  });

  it('Aufbaukosten', () => {
    bench('new RockShape(fein) inkl. measure()', 40, () => {
      new RockShape('cratered', 5, true);
    });
    // Je frische Form: so misst es den *Erstaufbau*, nicht den
    // Zwischenspeicher. Sonst kaeme heraus, wie schnell ein zweites Mal geht.
    let seed = 0;
    bench('Erstaufbau detail 5 (20.480 Dreiecke)', 12, () => {
      buildRockGeometry(new RockShape('cratered', ++seed, true), 5).dispose();
    });
    bench('Erstaufbau detail 6 (81.920 Dreiecke)', 6, () => {
      buildRockGeometry(new RockShape('cratered', ++seed, true), 6).dispose();
    });
    // Der echte Ablauf eines Planetoiden: Stufe 5 beim Bau, spaeter Stufe 6.
    bench('Planetoid: erst Stufe 5, dann Stufe 6', 6, () => {
      const shape = new RockShape('cratered', ++seed, true);
      buildRockGeometry(shape, 5).dispose();
      buildRockGeometry(shape, 6).dispose();
    });
    // Und dasselbe portioniert — was je Bild anfaellt, wenn man es streckt.
    bench('Stufe 6 portioniert: groesste Portion', 6, () => {
      const shape = new RockShape('cratered', ++seed, true);
      buildRockGeometry(shape, 5).dispose();
      const build = new RockGeometryBuild(shape, 6);
      while (!build.done) build.advance(6000);
      build.finish().dispose();
    });
  });

  it('Startaufwand', () => {
    bench('new Asteroids() — komplettes Feld', 6, () => {
      new Asteroids();
    });
  });

  it('Feldstaub', () => {
    const dust = new AsteroidDust();
    let x = 0;
    bench('AsteroidDust.update — 7000 Koerner', 2000, () => {
      x += 0.7;
      dust.update(new Vector3(x, 0, 0));
    });
  });
});
