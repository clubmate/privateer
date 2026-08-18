import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  DirectionalLight,
  Group,
  HemisphereLight,
  Object3D,
  SRGBColorSpace,
  Sprite,
  SpriteMaterial,
  Vector3,
} from 'three';

const DISTANCE = 1_500_000;

function glowTexture(size: number, stops: Array<[number, string]>): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const [offset, color] of stops) g.addColorStop(offset, color);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/**
 * Sonne als Billboard (Kern + weiter Halo) plus das Szenenlicht.
 * Die Gruppe folgt der Kamera in der Translation — die Sonne ist quasi
 * unendlich weit entfernt, ihre Richtung bleibt konstant.
 */
export class Sun extends Group {
  /** Normierte Richtung von der Szene zur Sonne. */
  readonly direction: Vector3;
  readonly light: DirectionalLight;

  constructor(direction = new Vector3(0.42, 0.24, -1).normalize(), color = new Color(0xfff3e0)) {
    super();
    this.name = 'Sun';
    this.direction = direction.clone().normalize();

    const pos = this.direction.clone().multiplyScalar(DISTANCE);

    const core = new Sprite(
      new SpriteMaterial({
        map: glowTexture(256, [
          [0.0, 'rgba(255,255,255,1)'],
          [0.28, 'rgba(255,247,220,1)'],
          [0.46, 'rgba(255,214,140,0.55)'],
          [1.0, 'rgba(255,180,90,0)'],
        ]),
        color: 0xffffff,
        blending: AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    );
    core.name = 'SunCore';
    core.position.copy(pos);
    core.scale.setScalar(DISTANCE * 0.055);
    this.add(core);

    const halo = new Sprite(
      new SpriteMaterial({
        map: glowTexture(256, [
          [0.0, 'rgba(255,242,215,0.9)'],
          [0.1, 'rgba(255,224,170,0.35)'],
          [0.3, 'rgba(255,194,115,0.09)'],
          [0.65, 'rgba(255,160,70,0.015)'],
          [1.0, 'rgba(255,150,60,0)'],
        ]),
        color: 0xffffff,
        blending: AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    );
    halo.name = 'SunHalo';
    halo.position.copy(pos);
    halo.scale.setScalar(DISTANCE * 0.28);
    this.add(halo);

    // Richtungslicht: Position und Target liegen beide in dieser Gruppe,
    // die Lichtrichtung bleibt daher konstant.
    const target = new Object3D();
    target.name = 'SunLightTarget';
    this.add(target);

    this.light = new DirectionalLight(color, 3.2);
    this.light.name = 'SunLight';
    this.light.position.copy(this.direction).multiplyScalar(1000);
    this.light.target = target;
    this.add(this.light);

    // Sehr schwaches Fuellicht, damit Schattenseiten nicht komplett schwarz sind.
    const fill = new HemisphereLight(0x18324f, 0x080604, 0.18);
    fill.name = 'SpaceFill';
    this.add(fill);
  }

  update(cameraWorldPosition: Vector3): void {
    this.position.copy(cameraWorldPosition);
  }
}
