import { describe, expect, it } from 'vitest';
import { Color, DirectionalLight, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { buildSpaceEnvironmentScene } from './SpaceEnvironment';

const SUN = new Vector3(0.8, 0.3, -0.1).normalize();
const PLANET = new Vector3(-0.34, -0.13, -0.93).normalize();

function scene() {
  return buildSpaceEnvironmentScene({ sunDirection: SUN, planetDirection: PLANET });
}

describe('Weltraum-Umgebung', () => {
  it('stellt Sonne und Planet in ihre Richtungen', () => {
    const env = scene();
    const sun = env.getObjectByName('EnvSun')!;
    const planet = env.getObjectByName('EnvPlanet')!;
    expect(sun.position.clone().normalize().dot(SUN)).toBeCloseTo(1, 6);
    expect(planet.position.clone().normalize().dot(PLANET)).toBeCloseTo(1, 6);
  });

  it('macht die Sonne heller als Weiss', () => {
    const env = scene();
    const sun = env.getObjectByName('EnvSun') as Mesh;
    const material = sun.material as MeshBasicMaterial;
    // Der Sinn der Aufnahme aus einer Szene statt aus einer Zeichenflaeche:
    // das Ziel ist Halbfliesskomma, die Sonne darf ueber 1,0 hinaus. Ein auf
    // 1,0 gekapptes Glanzlicht sieht aus wie eine graue Scheibe.
    expect(material.color.r).toBeGreaterThan(10);
    expect(material.toneMapped).toBe(false);
  });

  it('haelt die Sonnenscheibe klein gegen den Planeten', () => {
    const env = scene();
    const sun = env.getObjectByName('EnvSun') as Mesh;
    const planet = env.getObjectByName('EnvPlanet') as Mesh;
    sun.geometry.computeBoundingSphere();
    planet.geometry.computeBoundingSphere();
    // Der Raumwinkel geht linear in die diffuse Beleuchtung ein. Waere die
    // Sonne gross, zaehlte sie das Richtungslicht der Szene ein zweites Mal;
    // klein und grell gibt sie einen Reflex und sonst nichts.
    expect(sun.geometry.boundingSphere!.radius).toBeLessThan(
      planet.geometry.boundingSphere!.radius * 0.3,
    );
  });

  it('beleuchtet den Planeten aus der Sonnenrichtung', () => {
    const env = scene();
    const light = env.getObjectByName('EnvSunLight') as DirectionalLight;
    expect(light.position.clone().normalize().dot(SUN)).toBeCloseTo(1, 6);
    // Ohne Ziel am Planeten laege der Terminator irgendwo — und der Erdschein
    // faele aus der falschen Richtung auf die Brocken.
    expect(light.target.name).toBe('EnvPlanet');
  });

  it('laesst den Himmel dunkel, aber nicht schwarz', () => {
    const env = scene();
    const sky = env.background as Color;
    const luminance = sky.r * 0.299 + sky.g * 0.587 + sky.b * 0.114;
    expect(luminance).toBeGreaterThan(0);
    expect(luminance).toBeLessThan(0.02);
  });
});
