import {
  AdditiveBlending,
  CanvasTexture,
  Group,
  Sprite,
  SpriteMaterial,
  Vector3,
} from 'three';

/**
 * Kurzlebige Leuchtpunkte fuer Treffer und Explosionen.
 *
 * Bewusst Sprites aus einem Pool statt eines Partikelsystems: jeder Sprite hat
 * sein eigenes Material und damit eine eigene Deckkraft — fuer ein
 * InstancedMesh muesste dafuer ein eigener Shader her. Additiv gemischt und
 * ohne Tiefenschreiben, damit sie zusammen mit dem Bloom gluehen.
 */

/** Groesse des Pools. Reicht fuer eine Explosion plus laufende Treffer. */
const POOL_SIZE = 48;

interface Puff {
  sprite: Sprite;
  /** Restlebensdauer in Sekunden; <= 0 = frei. */
  life: number;
  duration: number;
  velocity: Vector3;
  startSize: number;
  endSize: number;
}

/** Weicher runder Fleck als Textur — ein Bild fuer alle Sprites. */
function createPuffTexture(): CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D-Context fuer Effekt-Textur nicht verfuegbar');

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.25, 'rgba(255,255,255,0.75)');
  gradient.addColorStop(0.6, 'rgba(255,255,255,0.18)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new CanvasTexture(canvas);
}

const _zero = new Vector3();
const _spark = new Vector3();

export class Effects extends Group {
  private readonly puffs: Puff[] = [];
  private next = 0;

  constructor() {
    super();
    this.name = 'Effects';
    this.frustumCulled = false;

    const map = createPuffTexture();
    for (let i = 0; i < POOL_SIZE; i++) {
      const sprite = new Sprite(
        new SpriteMaterial({
          map,
          blending: AdditiveBlending,
          depthWrite: false,
          transparent: true,
          opacity: 0,
        }),
      );
      sprite.visible = false;
      this.add(sprite);
      this.puffs.push({
        sprite,
        life: 0,
        duration: 1,
        velocity: new Vector3(),
        startSize: 1,
        endSize: 1,
      });
    }
  }

  /** Kleiner Blitz am Einschlagpunkt. */
  spawnImpact(position: Vector3, radius: number): void {
    this.spawn(position, null, 0.16, radius * 0.5, radius * 1.8, 0xbff4ff);
  }

  /**
   * Explosion: greller Kern plus Funken, die nach aussen treiben. `radius` ist
   * der Radius des zerstoerten Brockens, `drift` dessen Restbewegung.
   */
  spawnExplosion(position: Vector3, radius: number, drift: Vector3): void {
    // Greller kurzer Kern, darunter eine langsamer aufgehende warme Wolke.
    this.spawn(position, drift, 0.22, radius * 2.2, radius * 4.5, 0xffffff);
    this.spawn(position, drift, 0.9, radius * 1.2, radius * 7.0, 0xffc070);

    // Feste Richtungen statt Zufall: im Renderpfad soll nichts den RNG-Zustand
    // der Welt verschieben, und gleichmaessig verteilt sieht ohnehin ruhiger aus.
    const sparks = 9;
    for (let i = 0; i < sparks; i++) {
      const angle = (i / sparks) * Math.PI * 2;
      const tilt = ((i % 3) - 1) * 0.7;
      _spark
        .set(Math.cos(angle), tilt, Math.sin(angle))
        .normalize()
        .multiplyScalar(radius * (3.5 + (i % 3)))
        .add(drift);
      this.spawn(position, _spark, 0.7 + (i % 3) * 0.15, radius * 0.6, radius * 0.15, 0xffa050);
    }
  }

  update(dt: number): void {
    for (const puff of this.puffs) {
      if (puff.life <= 0) continue;
      puff.life -= dt;
      if (puff.life <= 0) {
        puff.sprite.visible = false;
        puff.sprite.material.opacity = 0;
        continue;
      }

      const t = 1 - puff.life / puff.duration;
      puff.sprite.position.addScaledVector(puff.velocity, dt);
      const size = puff.startSize + (puff.endSize - puff.startSize) * t;
      puff.sprite.scale.set(size, size, 1);
      // Schnell hell, dann ausklingen.
      puff.sprite.material.opacity = Math.pow(1 - t, 1.8);
    }
  }

  /** Alle laufenden Effekte um `offset` verschieben (Floating Origin). */
  shift(offset: Vector3): void {
    for (const puff of this.puffs) {
      if (puff.life > 0) puff.sprite.position.sub(offset);
    }
  }

  private spawn(
    position: Vector3,
    velocity: Vector3 | null,
    duration: number,
    startSize: number,
    endSize: number,
    color: number,
  ): void {
    const puff = this.puffs[this.next]!;
    this.next = (this.next + 1) % this.puffs.length;

    puff.sprite.position.copy(position);
    puff.sprite.visible = true;
    puff.sprite.material.color.setHex(color);
    puff.sprite.material.opacity = 1;
    puff.sprite.scale.set(startSize, startSize, 1);
    puff.velocity.copy(velocity ?? _zero);
    puff.duration = duration;
    puff.life = duration;
    puff.startSize = startSize;
    puff.endSize = endSize;
  }
}
