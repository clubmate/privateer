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

/**
 * Aufloesung der Schattenkarte des Sonnenlichts. Sie deckt immer nur *einen*
 * Grossbrocken ab (siehe {@link Sun.focusShadow}); bei einem 400-m-Planetoiden
 * liegt ein Texel damit bei gut einem halben Meter.
 */
const SHADOW_MAP_SIZE = 2048;

/** Abstand der Schattenkamera vom Brocken, als Vielfaches seines Radius. */
const SHADOW_STANDOFF = 4;

/** Ueberstand der Schattenkamera ueber den Umriss hinaus. */
const SHADOW_MARGIN = 1.35;

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

const _focus = new Vector3();

/**
 * Sonne als Billboard (Kern + weiter Halo) plus das Szenenlicht.
 * Die Gruppe folgt der Kamera in der Translation — die Sonne ist quasi
 * unendlich weit entfernt, ihre Richtung bleibt konstant.
 */
export class Sun extends Group {
  /** Normierte Richtung von der Szene zur Sonne. */
  readonly direction: Vector3;
  readonly light: DirectionalLight;

  /**
   * Zielpunkt des Sonnenlichts. Er liegt normalerweise im Gruppenursprung;
   * fuer eine Schattenkarte wandern Licht *und* Ziel gemeinsam an den
   * Brocken. Weil beide um denselben Betrag verschoben werden, bleibt die
   * Lichtrichtung dabei unveraendert — nur die Schattenkamera zielt neu.
   */
  private readonly lightTarget: Object3D;

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
    this.lightTarget = target;

    this.light = new DirectionalLight(color, 3.2);
    this.light.name = 'SunLight';
    this.light.position.copy(this.direction).multiplyScalar(1000);
    this.light.target = target;
    // Ausgeschaltet, bis ein Brocken nah genug ist: eine Schattenkarte ohne
    // Gegenstand kostet nur.
    this.light.castShadow = false;
    this.light.shadow.mapSize.set(SHADOW_MAP_SIZE, SHADOW_MAP_SIZE);
    this.light.shadow.bias = -0.0006;
    this.add(this.light);

    // Sehr schwaches Fuellicht fuer den Planeten. Es bleibt in der
    // Tiefenschicht und erreicht die Brocken nicht — deren Fuelllicht kommt
    // seit dem Umbau aus der Reflexionsumgebung, siehe SpaceEnvironment.
    const fill = new HemisphereLight(0x18324f, 0x080604, 0.18);
    fill.name = 'SpaceFill';
    this.add(fill);
  }

  update(cameraWorldPosition: Vector3): void {
    this.position.copy(cameraWorldPosition);
  }

  /**
   * Die Schattenkamera auf einen Brocken richten. `center` sind
   * Weltkoordinaten, `radius` sein Umriss in Metern.
   *
   * Aufzurufen *nach* {@link update} — die Gruppe steht dann an der Kamera,
   * und die Umrechnung in ihren lokalen Raum ist eine reine Verschiebung.
   */
  focusShadow(center: Vector3, radius: number): void {
    _focus.copy(center).sub(this.position);
    this.lightTarget.position.copy(_focus);
    this.light.position.copy(_focus).addScaledVector(this.direction, radius * SHADOW_STANDOFF);

    const span = radius * SHADOW_MARGIN;
    const camera = this.light.shadow.camera;
    camera.left = -span;
    camera.right = span;
    camera.top = span;
    camera.bottom = -span;
    camera.near = radius * 0.5;
    camera.far = radius * (SHADOW_STANDOFF + SHADOW_MARGIN + 1);
    camera.updateProjectionMatrix();
    // Der Normal-Bias haengt an der Texelgroesse, und die haengt am Brocken:
    // ein fester Wert wuerde auf dem Planetoiden Streifen ziehen und am
    // Grossfelsen den Schatten von der Kante loesen.
    this.light.shadow.normalBias = Math.max(0.05, (span * 2) / SHADOW_MAP_SIZE * 2.5);
    this.light.castShadow = true;
  }

  /** Schattenwurf abschalten, wenn kein Brocken in Reichweite ist. */
  clearShadow(): void {
    if (!this.light.castShadow) return;
    this.light.castShadow = false;
    this.lightTarget.position.set(0, 0, 0);
    this.light.position.copy(this.direction).multiplyScalar(1000);
  }
}
