import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Quaternion,
  Sprite,
  SpriteMaterial,
  Vector3,
} from 'three';
import { MINERALS } from '../world/AsteroidTypes';
import type { ImpactSink } from '../combat/Effects';
import type { MiningStatus } from './MiningSystem';

/**
 * Der sichtbare Foerderstrahl.
 *
 * Alles hier ist Darstellung — was gefoerdert wird, entscheidet
 * {@link MiningSystem}. Der Strahl liest nur dessen Zustand.
 *
 * Er soll sich nach *Arbeit* anfuehlen und nicht nach einem Laserpointer:
 * ein pulsierender Kern in einem weicheren Mantel, gluehendes Gestein am
 * Auftreffpunkt, Staub und abgesprengte Brocken, die zum Schiff wandern, und
 * ein heller Schlag am Bug, sobald ein Klumpen im Laderaum ankommt. Der Kern
 * flackert mit zwei ungeraden Frequenzen (wie die Schirme), damit kein Takt
 * hoerbar wird.
 *
 * Wie Geschosse und Effekte lebt der Strahl in **Weltkoordinaten** — bei einer
 * Floating-Origin-Verschiebung muessen die Partikel deshalb mitwandern, siehe
 * {@link MiningBeam.shift}.
 */

/**
 * Muendung des Foerderstrahls im Schiffssystem (Nase = -Z, unter dem Bug).
 * Weit genug vor dem Augenpunkt: sitzt sie naeher, deckt der Strahl aus der
 * Sitzposition das halbe Bild ab, egal wie duenn er ist.
 */
const MUZZLE: [number, number, number] = [0, -0.85, -4.6];

/** Farbe des schneidenden Kerns — warm, deutlich anders als die Kanonen. */
const BEAM_HOT = new Color(2.2, 1.05, 0.38);
const BEAM_HALO = new Color(1.4, 0.45, 0.12);
/** Der Scanstrahl ist kalt und duenn: er arbeitet nicht, er sieht nur nach. */
const SCAN_COLOR = new Color(0.5, 1.6, 2.4);

/** Halbmesser von Kern und Mantel in Metern. */
const CORE_RADIUS = 0.16;
const HALO_RADIUS = 0.5;

/**
 * Verjuengung zur Muendung hin. Ein gleich dicker Zylinder ist zwar richtig,
 * sieht aus der Kanzel aber falsch aus: das nahe Ende steht perspektivisch
 * riesig im Bild. Gebuendelt an der Muendung, aufgehend im Gestein — so liest
 * man auch, in welche Richtung er arbeitet.
 */
const MUZZLE_TAPER = 0.28;

/** Groesse des Partikelvorrats. Reicht fuer Dauerbetrieb plus Klumpenschlag. */
const POOL_SIZE = 64;

/** Abstaende zwischen zwei Staubwolken bzw. zwei Splittern, in Sekunden. */
const DUST_INTERVAL = 0.06;
const CHUNK_INTERVAL = 0.16;

/** Wie lange ein Splitter zum Schiff braucht. */
const CHUNK_FLIGHT = 0.75;

type PuffMode = 'dust' | 'chunk';

interface Puff {
  sprite: Sprite;
  mode: PuffMode;
  /** Restlebensdauer in Sekunden; <= 0 = frei. */
  life: number;
  duration: number;
  /** Startpunkt (Splitter fliegen von dort zur Muendung). */
  start: Vector3;
  velocity: Vector3;
  startSize: number;
  endSize: number;
  /** Seitlicher Bogen des Splitters, klingt ueber die Flugzeit aus. */
  swing: Vector3;
}

/** Weicher runder Fleck — ein Bild fuer alle Sprites. */
function puffTexture(): CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D-Context fuer den Foerderstrahl nicht verfuegbar');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)');
  gradient.addColorStop(0.65, 'rgba(255,255,255,0.15)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

/**
 * Helligkeitsverlauf entlang des Strahls: an der Muendung kraeftig, in der
 * Mitte duenner, am Auftreffpunkt wieder hell. Ohne ihn ist der Strahl eine
 * gleichmaessige Roehre — und sieht aus wie ein Rohr, nicht wie Energie.
 */
function beamTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D-Context fuer den Foerderstrahl nicht verfuegbar');
  const gradient = ctx.createLinearGradient(0, 0, 0, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  gradient.addColorStop(0.55, 'rgba(255,255,255,0.42)');
  gradient.addColorStop(1, 'rgba(255,255,255,1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 4, 64);
  return new CanvasTexture(canvas);
}

/** Zylinder um +Y, offen, Einheitsmass — Laenge und Dicke kommen aus der Skalierung. */
function beamMesh(map: CanvasTexture, color: Color, opacity: number): Mesh {
  const geometry = new CylinderGeometry(1, MUZZLE_TAPER, 1, 12, 1, true);
  // Ursprung an das untere Ende legen: dann ist die Skalierung in Y direkt die
  // Laenge und die Position die Muendung.
  geometry.translate(0, 0.5, 0);
  const material = new MeshBasicMaterial({
    map,
    color,
    transparent: true,
    opacity,
    blending: AdditiveBlending,
    depthWrite: false,
    // Der Strahl liegt zwischen den Brocken und darf von ihnen verdeckt werden.
    depthTest: true,
  });
  const mesh = new Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.visible = false;
  return mesh;
}

function sprite(map: CanvasTexture, color: Color | number, size: number): Sprite {
  const s = new Sprite(
    new SpriteMaterial({
      map,
      color,
      blending: AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0,
    }),
  );
  s.scale.setScalar(size);
  s.visible = false;
  return s;
}

const _muzzle = new Vector3();
const _dir = new Vector3();
const _quat = new Quaternion();
const _up = new Vector3(0, 1, 0);
const _point = new Vector3();
const _tangent = new Vector3();
const _bitangent = new Vector3();
const _tmp = new Vector3();
const _color = new Color();

/** Zwei ungerade Frequenzen: sichtbares Flackern ohne hoerbaren Takt. */
function flicker(t: number): number {
  return 1 + Math.sin(t * 37.1) * 0.10 + Math.sin(t * 91.7) * 0.06;
}

export class MiningBeam extends Group {
  private readonly core: Mesh;
  private readonly halo: Mesh;
  private readonly muzzleGlow: Sprite;
  private readonly impactGlow: Sprite;
  private readonly impactHeat: Sprite;
  private readonly puffs: Puff[] = [];

  private time = 0;
  private dustTimer = 0;
  private chunkTimer = 0;
  private next = 0;
  private lastDeliveries = 0;
  /** Nachleuchten der Muendung nach einem angekommenen Klumpen. */
  private thump = 0;

  constructor(private readonly impacts: ImpactSink | null = null) {
    super();
    this.name = 'MiningBeam';
    this.frustumCulled = false;

    const map = beamTexture();
    this.halo = beamMesh(map, BEAM_HALO, 0.34);
    this.core = beamMesh(map, BEAM_HOT, 0.95);
    this.add(this.halo, this.core);

    const puff = puffTexture();
    this.muzzleGlow = sprite(puff, BEAM_HOT, 1.6);
    this.impactGlow = sprite(puff, BEAM_HOT, 6);
    this.impactHeat = sprite(puff, 0xffffff, 12);
    this.add(this.muzzleGlow, this.impactGlow, this.impactHeat);

    for (let i = 0; i < POOL_SIZE; i++) {
      const s = sprite(puff, 0xffffff, 1);
      this.add(s);
      this.puffs.push({
        sprite: s,
        mode: 'dust',
        life: 0,
        duration: 1,
        start: new Vector3(),
        velocity: new Vector3(),
        startSize: 1,
        endSize: 1,
        swing: new Vector3(),
      });
    }
  }

  /**
   * Darstellung fortschreiben. `ship` liefert die Muendung; der Rest steht im
   * Zustand des Bergbausystems.
   */
  update(dt: number, status: MiningStatus, ship: Object3D): void {
    this.time += dt;
    this.thump = Math.max(0, this.thump - dt * 3.2);

    _muzzle.set(MUZZLE[0], MUZZLE[1], MUZZLE[2]).applyMatrix4(ship.matrixWorld);

    const scanning = status.phase === 'scan' && status.scanProgress > 0;
    const active = (status.beamActive || scanning) && status.hasHit;

    if (status.deliveries !== this.lastDeliveries) {
      this.lastDeliveries = status.deliveries;
      this.onDelivery(status, _muzzle);
    }

    if (active) this.drawBeam(dt, status, _muzzle);
    else this.hideBeam();

    this.updatePuffs(dt, _muzzle);
  }

  /** Alle laufenden Partikel um `offset` verschieben (Floating Origin). */
  shift(offset: Vector3): void {
    for (const puff of this.puffs) {
      if (puff.life <= 0) continue;
      puff.sprite.position.sub(offset);
      puff.start.sub(offset);
    }
  }

  // ----------------------------------------------------------------- intern

  /** Farbe des geloesten Materials — der sichtbare Hinweis auf den Inhalt. */
  private mineralColor(status: MiningStatus): Color {
    if (!status.mineral) return _color.setHex(0xd8c7a8);
    return _color.setHex(MINERALS[status.mineral].vein);
  }

  private drawBeam(dt: number, status: MiningStatus, muzzle: Vector3): void {
    const mining = status.beamActive;
    const strength = mining ? Math.max(status.charge, 0.15) : 0.5;

    // Der Auftreffpunkt zittert leicht in der Flaeche: der Strahl frisst sich
    // ins Gestein, er zielt nicht auf einen Punkt.
    _point.copy(status.hitPoint);
    if (mining) {
      this.surfaceAxes(status.hitNormal);
      const wobble = 0.9 * strength;
      _point
        .addScaledVector(_tangent, Math.sin(this.time * 11.3) * wobble)
        .addScaledVector(_bitangent, Math.sin(this.time * 7.9 + 1.7) * wobble);
      // Ein Stueck in den Brocken hinein: der Strahl frisst ein Loch, er
      // endet nicht davor. Solange {@link AsteroidField.sampleSurface} nur
      // den Umriss abtastet, schliesst das ausserdem die sichtbare Luecke
      // zwischen Kugel und der tatsaechlich schmaleren Geometrie.
      _point.addScaledVector(status.hitNormal, -Math.min(2.5, status.targetRadius * 0.12));
    }

    _dir.subVectors(_point, muzzle);
    const length = _dir.length();
    if (length < 1e-3) {
      this.hideBeam();
      return;
    }
    _dir.divideScalar(length);
    _quat.setFromUnitVectors(_up, _dir);

    const pulse = mining ? flicker(this.time) : 0.8 + Math.sin(this.time * 5) * 0.2;
    const core = mining ? CORE_RADIUS : CORE_RADIUS * 0.45;
    const halo = mining ? HALO_RADIUS : HALO_RADIUS * 0.3;
    const color = mining ? BEAM_HOT : SCAN_COLOR;

    for (const [mesh, radius, base] of [
      [this.core, core, 0.95] as const,
      [this.halo, halo, 0.34] as const,
    ]) {
      mesh.visible = true;
      mesh.position.copy(muzzle);
      mesh.quaternion.copy(_quat);
      // Der Strahl wird mit der Entfernung duenner dargestellt, sonst steht er
      // auf 500 m als Balken im Bild.
      const width = radius * strength * pulse * (1 + length / 900);
      mesh.scale.set(width, length, width);
      const material = mesh.material as MeshBasicMaterial;
      material.color.copy(color);
      material.opacity = base * strength * (mining ? pulse : 0.7);
    }

    // Muendung: heller Fleck, der beim ankommenden Klumpen aufblitzt.
    this.muzzleGlow.visible = true;
    this.muzzleGlow.position.copy(muzzle).addScaledVector(_dir, 0.6);
    this.muzzleGlow.material.color.copy(color);
    this.muzzleGlow.material.opacity = (0.5 + this.thump) * strength;
    this.muzzleGlow.scale.setScalar(1.4 + this.thump * 2.6);

    // Auftreffpunkt: greller Kern plus ein breiterer Schein in der Farbe des
    // Materials — das ist das gluehende Gestein.
    const heatSize = Math.max(3, length * 0.02) * strength;
    this.impactGlow.visible = true;
    this.impactGlow.position.copy(_point);
    this.impactGlow.material.color.copy(color);
    this.impactGlow.material.opacity = (mining ? 0.85 : 0.35) * strength * pulse;
    this.impactGlow.scale.setScalar(heatSize * (mining ? 1.1 : 0.5));

    this.impactHeat.visible = mining;
    if (mining) {
      this.impactHeat.position.copy(_point);
      this.impactHeat.material.color.copy(this.mineralColor(status));
      this.impactHeat.material.opacity = 0.5 * strength * (0.8 + Math.sin(this.time * 9) * 0.2);
      this.impactHeat.scale.setScalar(heatSize * 2.4);
    }

    if (!mining) return;

    // Abraum: Staub loest sich laufend, Splitter deutlich seltener.
    this.dustTimer -= dt;
    if (this.dustTimer <= 0) {
      this.dustTimer = DUST_INTERVAL;
      this.spawnDust(_point, status);
    }
    this.chunkTimer -= dt;
    if (this.chunkTimer <= 0) {
      this.chunkTimer = CHUNK_INTERVAL;
      this.spawnChunk(_point, status, 1);
    }
  }

  private hideBeam(): void {
    this.core.visible = false;
    this.halo.visible = false;
    this.muzzleGlow.visible = false;
    this.impactGlow.visible = false;
    this.impactHeat.visible = false;
  }

  /** Ein Klumpen ist im Laderaum angekommen: Schwarm zum Bug und Schlag. */
  private onDelivery(status: MiningStatus, muzzle: Vector3): void {
    this.thump = 1;
    if (!status.hasHit) return;
    for (let i = 0; i < 5; i++) this.spawnChunk(status.hitPoint, status, 1.4);
    this.impacts?.spawnImpact(muzzle, 1.2);
  }

  /** Zwei Richtungen in der Tangentialebene der Oberflaeche. */
  private surfaceAxes(normal: Vector3): void {
    _tangent.set(normal.z, normal.x, -normal.y).normalize();
    _bitangent.crossVectors(normal, _tangent).normalize();
  }

  private spawnDust(point: Vector3, status: MiningStatus): void {
    const puff = this.take();
    puff.mode = 'dust';
    puff.duration = 0.8 + (this.next % 3) * 0.15;
    puff.life = puff.duration;
    puff.startSize = 0.8;
    puff.endSize = 5.5;
    puff.start.copy(point);
    puff.sprite.position.copy(point);
    // Feste Richtungen statt Zufall: im Renderpfad soll nichts den RNG-Zustand
    // der Welt verschieben (siehe Effects).
    this.surfaceAxes(status.hitNormal);
    const angle = this.time * 5.1;
    puff.velocity
      .copy(status.hitNormal)
      .multiplyScalar(3.5)
      .addScaledVector(_tangent, Math.cos(angle) * 2.2)
      .addScaledVector(_bitangent, Math.sin(angle) * 2.2);
    puff.sprite.material.color.copy(this.mineralColor(status)).multiplyScalar(0.7);
    puff.sprite.material.opacity = 0.5;
    puff.sprite.visible = true;
  }

  private spawnChunk(point: Vector3, status: MiningStatus, scale: number): void {
    const puff = this.take();
    puff.mode = 'chunk';
    puff.duration = CHUNK_FLIGHT;
    puff.life = puff.duration;
    puff.startSize = 1.5 * scale;
    puff.endSize = 0.4 * scale;
    puff.start.copy(point);
    puff.sprite.position.copy(point);
    this.surfaceAxes(status.hitNormal);
    const angle = this.time * 8.7 + this.next;
    // Der Splitter wird seitlich weggesprengt und zieht dann zum Schiff: der
    // Bogen ist der Unterschied zwischen "Foerderung" und "Magnet".
    puff.swing
      .copy(_tangent)
      .multiplyScalar(Math.cos(angle) * 14 * scale)
      .addScaledVector(_bitangent, Math.sin(angle) * 14 * scale)
      .addScaledVector(status.hitNormal, 6);
    puff.sprite.material.color.copy(this.mineralColor(status));
    puff.sprite.material.opacity = 0.95;
    puff.sprite.visible = true;
  }

  private take(): Puff {
    const puff = this.puffs[this.next]!;
    this.next = (this.next + 1) % this.puffs.length;
    return puff;
  }

  private updatePuffs(dt: number, muzzle: Vector3): void {
    for (const puff of this.puffs) {
      if (puff.life <= 0) continue;
      puff.life -= dt;
      if (puff.life <= 0) {
        puff.sprite.visible = false;
        puff.sprite.material.opacity = 0;
        continue;
      }

      const t = 1 - puff.life / puff.duration;
      if (puff.mode === 'dust') {
        puff.sprite.position.addScaledVector(puff.velocity, dt);
        puff.sprite.material.opacity = 0.5 * Math.pow(1 - t, 1.6);
      } else {
        // Sanft anfahren, schnell ankommen — und der Bogen klingt aus.
        const ease = t * t * (3 - 2 * t);
        _tmp.copy(puff.start).lerp(muzzle, ease);
        _tmp.addScaledVector(puff.swing, Math.sin(t * Math.PI) * (1 - ease * 0.5));
        puff.sprite.position.copy(_tmp);
        puff.sprite.material.opacity = 0.95 * Math.min(1, (1 - t) * 3);
      }
      const size = puff.startSize + (puff.endSize - puff.startSize) * t;
      puff.sprite.scale.setScalar(size);
    }
  }
}
