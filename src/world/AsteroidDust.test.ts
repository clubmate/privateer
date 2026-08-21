import { describe, expect, it } from 'vitest';
import { BufferAttribute, ShaderMaterial, Vector3 } from 'three';
import { AsteroidDust } from './AsteroidDust';

function positions(dust: AsteroidDust): BufferAttribute {
  return dust.geometry.getAttribute('position') as BufferAttribute;
}

const _p = new Vector3();

/**
 * Groesster Abstand eines Korns zur Mitte, achsenweise. Gerechnet ueber
 * {@link AsteroidDust.wrapped} — das Lagefeld selbst steht still, den Umschlag
 * macht der Shader.
 */
function maxOffset(dust: AsteroidDust, center: Vector3): number {
  const count = positions(dust).count;
  let worst = 0;
  for (let i = 0; i < count; i++) {
    dust.wrapped(i, _p);
    worst = Math.max(
      worst,
      Math.abs(_p.x - center.x),
      Math.abs(_p.y - center.y),
      Math.abs(_p.z - center.z),
    );
  }
  return worst;
}

describe('Feldstaub', () => {
  const EXTENT = 320;
  const HALF = EXTENT / 2;

  it('legt die Koerner in den Wuerfel um den Ursprung', () => {
    const dust = new AsteroidDust({ count: 500, extent: EXTENT });
    expect(positions(dust).count).toBe(500);
    expect(maxOffset(dust, new Vector3())).toBeLessThanOrEqual(HALF);
  });

  it('holt sie beim Wegfliegen wieder ein', () => {
    const dust = new AsteroidDust({ count: 500, extent: EXTENT });
    const camera = new Vector3(1400, -900, 260);
    dust.update(camera);
    expect(maxOffset(dust, camera)).toBeLessThanOrEqual(HALF + 1e-3);
    expect(positions(dust).count).toBe(500);
  });

  it('uebersteht den Sprung des Floating Origin in einem Schritt', () => {
    const dust = new AsteroidDust({ count: 500, extent: EXTENT });
    // Zehn Kilometer auf einmal — das ist die Groessenordnung, in der der
    // Ursprung zurueckgeschoben wird. Eine Schleife statt Modulo braeuchte
    // hier dreissig Durchlaeufe je Korn und Achse.
    const camera = new Vector3(10_000, 10_000, -10_000);
    dust.update(camera);
    expect(maxOffset(dust, camera)).toBeLessThanOrEqual(HALF + 1e-3);
  });

  it('laesst die Koerner im Raum stehen, statt sie mitzuziehen', () => {
    const dust = new AsteroidDust({ count: 500, extent: EXTENT });
    const before: Vector3[] = [];
    for (let i = 0; i < 500; i++) before.push(dust.wrapped(i, new Vector3()));
    // Ein Schritt, der kleiner ist als der halbe Wuerfel: dabei darf kein Korn
    // umgeschlagen werden, sonst waere die Parallaxe dahin — genau sie ist der
    // Grund fuer den ganzen Staub.
    dust.update(new Vector3(10, 0, 0));
    let moved = 0;
    for (let i = 0; i < 500; i++) {
      if (dust.wrapped(i, _p).distanceToSquared(before[i]!) > 1e-9) moved++;
    }
    // Nur die Koerner am hinteren Rand wechseln die Seite.
    expect(moved).toBeLessThan(500 * 0.15);
  });

  it('laedt das Lagefeld nicht mehr je Bild hoch', () => {
    const dust = new AsteroidDust({ count: 500, extent: EXTENT });
    const attribute = positions(dust);
    // `needsUpdate` ist in Three ein reiner Setter — gelesen wird `version`,
    // die er hochzaehlt.
    const before = attribute.version;
    dust.update(new Vector3(4000, -1200, 900));
    dust.update(new Vector3(-9000, 500, 12000));
    // Der Umschlag steht im Shader; das Attribut ist statisch. Waere das
    // anders, gingen 84 Kilobyte je Bild zur GPU, von denen sich ein
    // Promille aendert.
    expect(attribute.version).toBe(before);
  });

  it('haelt die Korngroesse in Metern, nicht in Bildpunkten', () => {
    const dust = new AsteroidDust({ count: 10 });
    const uniforms = (dust.material as ShaderMaterial).uniforms as Record<string, { value: number }>;
    dust.setViewportHeight(1080, 65);
    const small = uniforms['uScale']!.value;
    dust.setViewportHeight(2160, 65);
    // Doppelte Bildhoehe, doppelt so viele Bildpunkte je Meter.
    expect(uniforms['uScale']!.value).toBeCloseTo(small * 2, 6);
  });
});
