import { Matrix4, Quaternion, Vector3 } from 'three';
import type { Asteroids } from './Asteroids';
import type { SurfaceSample } from './AsteroidTypes';

/**
 * **Hilfsmittel, kein Spielinhalt.**
 *
 * Das heutige Asteroidenfeld erzeugt Brocken bis 50 m Radius — die
 * Groessenklasse `huge` (ab 150 m), die als einzige `isLandable` meldet, kommt
 * darin gar nicht vor. Damit die Landung entwickelt, getestet und abgenommen
 * werden kann, setzt diese Funktion einzelne Plaetze des Feldes von Hand auf
 * Planetoidengroesse um.
 *
 * Sobald das neue Feld echte Grossbrocken liefert, faellt die Datei ersatzlos
 * weg — sie wird nur aus dem Landungs-Block in `main.ts` aufgerufen.
 *
 * Zugegriffen wird auf die internen Reihen von {@link Asteroids}, so wie es
 * auch die Tests der Rumpfkollision tun: das ist der einzige Weg, einen
 * reproduzierbaren Aufbau zu erzwingen, ohne fremde Dateien zu aendern.
 */

export interface PlanetoidSpec {
  /** Mittelpunkt in Weltkoordinaten. */
  position: Vector3;
  /** Umrissradius in Metern — ab 150 m gilt der Brocken als Planetoid. */
  radius: number;
  /** Eigendrehung in rad/s. Ein 300-m-Fels dreht sich langsam. */
  spin?: number;
  /** Drehachse; ohne Angabe schraeg gestellt. */
  axis?: Vector3;
}

/** Muss zu `HIT_RADIUS_FACTOR` in Asteroids.ts passen. */
const HIT_RADIUS_FACTOR = 1.15;
/** Muss zu `HITPOINTS_PER_METER` in Asteroids.ts passen. */
const HITPOINTS_PER_METER = 14;

interface AsteroidInternals {
  positions: Vector3[];
  velocities: Vector3[];
  scales: number[];
  speeds: number[];
  axes: Vector3[];
  hitpoints: number[];
  maxHitpoints: number[];
  mined: number[];
}

/**
 * Setzt die letzten Plaetze des Feldes auf Planetoiden um und liefert deren
 * Indizes. Die letzten, weil dort am wenigsten stoert, dass ein kleiner
 * Brocken verschwindet.
 */
export function addDebugPlanetoids(asteroids: Asteroids, specs: readonly PlanetoidSpec[]): number[] {
  const internals = asteroids as unknown as AsteroidInternals;
  const indices: number[] = [];

  specs.forEach((spec, n) => {
    const index = asteroids.count - 1 - n;
    if (index < 0) return;

    const scale = spec.radius / HIT_RADIUS_FACTOR;
    internals.positions[index]!.copy(spec.position).sub(asteroids.position);
    // Planetoiden treiben nicht durchs Feld — sonst laesst sich ein Landeplatz
    // nicht zweimal anfliegen.
    internals.velocities[index]!.set(0, 0, 0);
    internals.scales[index] = scale;
    internals.speeds[index] = spec.spin ?? 0.05;
    internals.axes[index]!.copy(spec.axis ?? new Vector3(0.22, 1, 0.16)).normalize();
    internals.hitpoints[index] = 1 + Math.floor(scale / HITPOINTS_PER_METER);
    internals.maxHitpoints[index] = internals.hitpoints[index]!;
    internals.mined[index] = 0;
    indices.push(index);
  });

  clearIntruders(asteroids, indices);
  patchSurfaceSampling(asteroids, indices);
  // Schreibt die Instanzmatrizen neu, ohne etwas weiterzudrehen.
  asteroids.update(0);
  return indices;
}

/**
 * `sampleSurface` fuer die Planetoiden ehrlich machen.
 *
 * Das heutige Feld antwortet mit einer Kugel vom Umrissradius (Scale mal
 * 1,15). Die gezeichnete Geometrie schwankt aber zwischen dem 0,72- und dem
 * 1,41-fachen der Skalierung — an einer gemessenen Stelle lagen 56 m
 * zwischen Kugel und Fels. Ein Schiff, das auf dieser Kugel aufsetzt, schwebt
 * sichtbar ueber dem Brocken.
 *
 * Deshalb wird hier fuer die Debug-Planetoiden nachgetastet: ein Strahl vom
 * Mittelpunkt nach aussen gegen die echten Dreiecke, Trefferpunkt und
 * Flaechennormale zurueck. Genau das, was das neue Feld selbst liefern soll —
 * bis dahin steht es hier, und faellt mit dieser Datei wieder weg.
 *
 * Der Kommentar dazu im Bericht: sollte `sampleSurface` nach dem Umbau
 * weiterhin die Kugel liefern, schwebt die Landung wieder.
 */
function patchSurfaceSampling(asteroids: Asteroids, indices: readonly number[]): void {
  const sphere = asteroids.sampleSurface.bind(asteroids);
  asteroids.sampleSurface = (index: number, from: Vector3, out: SurfaceSample): boolean => {
    if (!sphere(index, from, out)) return false;
    if (!indices.includes(index)) return true;
    refineAgainstGeometry(asteroids, index, out);
    return true;
  };
}

const _matrix = new Matrix4();
const _instancePos = new Vector3();
const _instanceQuat = new Quaternion();
const _invQuat = new Quaternion();
const _instanceScale = new Vector3();
const _localDir = new Vector3();
const _center = new Vector3();
const _a = new Vector3();
const _b = new Vector3();
const _c = new Vector3();
const _edge1 = new Vector3();
const _edge2 = new Vector3();
const _pvec = new Vector3();
const _tvec = new Vector3();
const _qvec = new Vector3();
const _face = new Vector3();

/**
 * Kugelpunkt in `out` durch den echten Oberflaechenpunkt ersetzen. Der Strahl
 * startet im Mittelpunkt und laeuft nach aussen; von allen Treffern zaehlt der
 * aeusserste, damit eine Delle im Fels nicht als Oberflaeche durchgeht.
 */
function refineAgainstGeometry(asteroids: Asteroids, index: number, out: SurfaceSample): void {
  asteroids.getMatrixAt(index, _matrix);
  _matrix.decompose(_instancePos, _instanceQuat, _instanceScale);
  const scale = _instanceScale.x;
  if (scale <= 0) return;

  // Der Strahl wird in den Einheitsraum der Geometrie gedreht statt jeden
  // Vertex in die Welt — 1280 Dreiecke gegen einen Vektor.
  _invQuat.copy(_instanceQuat).invert();
  _localDir.copy(out.normal).applyQuaternion(_invQuat);

  const position = asteroids.geometry.getAttribute('position');
  const indexAttribute = asteroids.geometry.getIndex();
  const triangles = (indexAttribute ? indexAttribute.count : position.count) / 3;

  let bestT = -1;
  for (let t = 0; t < triangles; t++) {
    const i0 = indexAttribute ? indexAttribute.getX(t * 3) : t * 3;
    const i1 = indexAttribute ? indexAttribute.getX(t * 3 + 1) : t * 3 + 1;
    const i2 = indexAttribute ? indexAttribute.getX(t * 3 + 2) : t * 3 + 2;
    _a.fromBufferAttribute(position, i0);
    _b.fromBufferAttribute(position, i1);
    _c.fromBufferAttribute(position, i2);

    // Moeller-Trumbore, Strahlursprung im Nullpunkt, ohne Rueckseitentest.
    _edge1.subVectors(_b, _a);
    _edge2.subVectors(_c, _a);
    _pvec.crossVectors(_localDir, _edge2);
    const det = _edge1.dot(_pvec);
    if (Math.abs(det) < 1e-12) continue;
    const inv = 1 / det;
    _tvec.copy(_a).negate();
    const u = _tvec.dot(_pvec) * inv;
    if (u < 0 || u > 1) continue;
    _qvec.crossVectors(_tvec, _edge1);
    const v = _localDir.dot(_qvec) * inv;
    if (v < 0 || u + v > 1) continue;
    const hit = _edge2.dot(_qvec) * inv;
    if (hit > bestT) {
      bestT = hit;
      _face.crossVectors(_edge1, _edge2).normalize();
    }
  }
  if (bestT <= 0) return;

  asteroids.getCenter(index, _center);
  out.point.copy(_center).addScaledVector(out.normal, bestT * scale);
  // Flaechennormale des getroffenen Dreiecks, in die Welt gedreht — darauf
  // stellt sich das Schiff. Auf einem Facettenbrocken ist das die Wahrheit.
  _face.applyQuaternion(_instanceQuat);
  if (_face.dot(out.normal) < 0) _face.negate();
  out.normal.copy(_face);
}

/**
 * Kleinbrocken aus dem Inneren der neuen Planetoiden raeumen.
 *
 * Sie stecken sonst im Fels und ragen aus ihm heraus — und weil die Landung
 * nur die Kollision mit *ihrem* Brocken aussetzt, schlaegt das Schiff beim
 * Sinkflug in einen von ihnen ein. Sie wachsen nach der ueblichen Frist
 * anderswo im Feld nach.
 */
function clearIntruders(asteroids: Asteroids, planetoids: readonly number[]): void {
  const center = new Vector3();
  const other = new Vector3();

  for (const index of planetoids) {
    asteroids.getCenter(index, center);
    const reach = asteroids.getRadius(index) * 1.5;
    for (let i = 0; i < asteroids.count; i++) {
      if (i === index || !asteroids.isAlive(i) || planetoids.includes(i)) continue;
      asteroids.getCenter(i, other);
      if (other.distanceTo(center) < reach + asteroids.getRadius(i)) {
        asteroids.damage(i, Number.MAX_SAFE_INTEGER);
      }
    }
  }
}
