import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { Asteroids } from '../world/Asteroids';
import { computeLeadPoint, Targeting } from './Targeting';

describe('computeLeadPoint', () => {
  const shooter = new Vector3(0, 0, 0);
  const still = new Vector3(0, 0, 0);

  it('haelt direkt auf ein stehendes Ziel', () => {
    const target = new Vector3(0, 0, -1000);
    const lead = computeLeadPoint(target, still, shooter, still, 1000, new Vector3());
    expect(lead.distanceTo(target)).toBeLessThan(1e-6);
  });

  it('haelt vor ein querendes Ziel — und trifft es damit wirklich', () => {
    const target = new Vector3(0, 0, -1000);
    const velocity = new Vector3(60, 0, 0);
    const speed = 1000;
    const lead = computeLeadPoint(target, velocity, shooter, still, speed, new Vector3());

    expect(lead.x).toBeGreaterThan(0); // in Bewegungsrichtung versetzt

    // Gegenprobe: Geschoss auf den Vorhaltepunkt abfeuern und mitrechnen.
    const time = lead.distanceTo(shooter) / speed;
    const targetAt = target.clone().addScaledVector(velocity, time);
    expect(targetAt.distanceTo(lead)).toBeLessThan(1e-6);
  });

  it('rechnet die Eigenbewegung des Schuetzen heraus', () => {
    const target = new Vector3(0, 0, -1000);
    const velocity = new Vector3(60, 0, 0);
    // Schuetze fliegt mit derselben Quergeschwindigkeit: relativ steht das Ziel,
    // es muss also direkt gehalten werden.
    const lead = computeLeadPoint(target, velocity, shooter, velocity.clone(), 1000, new Vector3());
    expect(lead.distanceTo(target)).toBeLessThan(1e-6);
  });

  it('haelt bei bewegtem Schuetzen auf den relativen Treffpunkt', () => {
    const target = new Vector3(0, 0, -1000);
    const targetVelocity = new Vector3(60, 0, 0);
    const shooterVelocity = new Vector3(-40, 0, 0);
    const speed = 1000;
    const lead = computeLeadPoint(target, targetVelocity, shooter, shooterVelocity, speed, new Vector3());

    // Gegenprobe im mitbewegten System des Schiffs: dort fliegt das Geschoss
    // gerade mit `speed`, und das Ziel bewegt sich mit der Differenz.
    const time = lead.distanceTo(shooter) / speed;
    const relative = targetVelocity.clone().sub(shooterVelocity);
    const targetAt = target.clone().addScaledVector(relative, time);
    expect(targetAt.distanceTo(lead)).toBeLessThan(1e-6);
  });

  it('faellt auf die Zielposition zurueck, wenn das Ziel nicht einholbar ist', () => {
    const target = new Vector3(0, 0, -1000);
    const velocity = new Vector3(0, 0, -5000); // schneller als das Geschoss, flieht
    const lead = computeLeadPoint(target, velocity, shooter, still, 1000, new Vector3());
    expect(lead.distanceTo(target)).toBeLessThan(1e-6);
  });

  it('trifft auch ein frontal anfliegendes Ziel', () => {
    const target = new Vector3(0, 0, -1000);
    const velocity = new Vector3(0, 0, 200); // kommt entgegen
    const speed = 1000;
    const lead = computeLeadPoint(target, velocity, shooter, still, speed, new Vector3());

    const time = lead.distanceTo(shooter) / speed;
    const targetAt = target.clone().addScaledVector(velocity, time);
    expect(targetAt.distanceTo(lead)).toBeLessThan(1e-6);
    expect(lead.z).toBeGreaterThan(target.z); // naeher dran als das Ziel jetzt
  });
});

describe('Targeting', () => {
  const field = (): Asteroids =>
    new Asteroids({
      count: 30,
      innerRadius: 200,
      outerRadius: 1500,
      minRadius: 5,
      maxRadius: 30,
      seed: 7,
    });

  /** Richtung vom Ursprung zu einem Brocken. */
  function directionTo(asteroids: Asteroids, index: number): Vector3 {
    const center = new Vector3();
    asteroids.getCenter(index, center);
    return center.normalize();
  }

  it('erfasst nichts, wenn nichts im Kegel liegt', () => {
    const asteroids = field();
    const targeting = new Targeting({ range: 10 }); // alles ausser Reichweite
    expect(targeting.cycle(asteroids, new Vector3(), new Vector3(0, 0, -1))).toBe(-1);
    expect(targeting.getIndex()).toBe(-1);
  });

  it('erfasst den Brocken, auf den die Nase zeigt', () => {
    const asteroids = field();
    const targeting = new Targeting();
    const wanted = 3;
    const index = targeting.cycle(asteroids, new Vector3(), directionTo(asteroids, wanted));
    expect(index).toBe(wanted);
  });

  it('schaltet bei erneutem Druecken weiter', () => {
    const asteroids = field();
    const targeting = new Targeting({ cone: Math.PI }); // ganzes Feld als Kandidaten
    const origin = new Vector3();
    const forward = new Vector3(0, 0, -1);

    const first = targeting.cycle(asteroids, origin, forward);
    const second = targeting.cycle(asteroids, origin, forward);
    expect(second).not.toBe(first);
  });

  it('liefert Entfernung, Zustand und Vorhaltepunkt', () => {
    const asteroids = field();
    const targeting = new Targeting();
    const index = targeting.cycle(asteroids, new Vector3(), directionTo(asteroids, 3));

    const info = targeting.update(asteroids, new Vector3(), new Vector3(), 1100);
    expect(info).not.toBeNull();
    expect(info!.index).toBe(index);
    expect(info!.integrity).toBe(1);

    const center = new Vector3();
    asteroids.getCenter(index, center);
    expect(info!.distance).toBeCloseTo(center.length(), 3);
    // Brocken driften, also liegt der Vorhaltepunkt nicht auf dem Ziel.
    expect(info!.lead.distanceTo(center)).toBeGreaterThan(0);
  });

  it('verliert die Erfassung, wenn das Ziel zerstoert wird', () => {
    const asteroids = field();
    const targeting = new Targeting();
    const index = targeting.cycle(asteroids, new Vector3(), directionTo(asteroids, 3));
    while (asteroids.isAlive(index)) asteroids.damage(index, 1);

    expect(targeting.update(asteroids, new Vector3(), new Vector3(), 1100)).toBeNull();
    expect(targeting.getIndex()).toBe(-1);
  });

  it('verliert die Erfassung ausserhalb der Abbruchreichweite', () => {
    const asteroids = field();
    const targeting = new Targeting({ dropRange: 50 });
    targeting.cycle(asteroids, new Vector3(), directionTo(asteroids, 3));

    expect(targeting.update(asteroids, new Vector3(), new Vector3(), 1100)).toBeNull();
    expect(targeting.getIndex()).toBe(-1);
  });
});
