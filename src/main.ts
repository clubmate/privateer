import {
  ACESFilmicToneMapping,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { Input } from './core/Input';
import { Time } from './core/Time';
import { Asteroids } from './world/Asteroids';
import { Planet } from './world/Planet';
import { Starfield } from './world/Starfield';
import { Sun } from './world/Sun';
import { Ship } from './ship/Ship';
import { FlightModel } from './ship/FlightModel';
import { loadShipInterior } from './ship/InteriorLoader';
import { createInteriorEnvironment } from './ship/InteriorEnvironment';
import { SeatedController } from './player/SeatedController';
import { WalkController } from './player/WalkController';
import { PlayerState } from './player/PlayerState';
import { Hud } from './hud/Hud';
import { Effects } from './combat/Effects';
import { Weapons } from './combat/Weapons';
import { Targeting } from './combat/Targeting';
import { HullCollision } from './combat/HullCollision';
import { CameraShake } from './player/CameraShake';
import { RadarScreen } from './ship/RadarScreen';
import { createPostprocessing } from './render/Postprocessing';

const container = document.getElementById('app');
if (!container) throw new Error('#app fehlt in index.html');

const renderer = new WebGLRenderer({
  antialias: true,
  logarithmicDepthBuffer: true,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
container.appendChild(renderer.domElement);

const scene = new Scene();

// near 0.05 / far 1e7: Cockpit bei 0,1 m und Planet bei 850 km im selben
// Frustum — moeglich durch logarithmicDepthBuffer.
const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.05, 1e7);
camera.rotation.order = 'YXZ';

// Bloom laeuft ueber einen EffectComposer; das Canvas selbst braucht dann kein
// Antialiasing mehr, das uebernimmt das multisampelte Zwischenziel.
const post = createPostprocessing(renderer, scene, camera);

// --------------------------------------------------------------------- Welt
const sun = new Sun(new Vector3(0.8, 0.3, -0.1).normalize());
const starfield = new Starfield(6500);
starfield.setPixelRatio(renderer.getPixelRatio());

const planet = new Planet({
  radius: 220_000,
  position: new Vector3(-0.34, -0.13, -0.93).normalize().multiplyScalar(850_000),
  seed: 12,
  sunDirection: sun.direction,
});

const asteroids = new Asteroids();

const ship = new Ship();

// Waffen: Geschosse und Effekte leben in Weltkoordinaten, nicht am Schiff.
const effects = new Effects();
const weapons = new Weapons(asteroids, effects);
const targeting = new Targeting();
const hull = new HullCollision(asteroids, effects);
const shake = new CameraShake();
const radar = new RadarScreen();

scene.add(starfield, sun, planet, asteroids, ship, weapons.mesh, effects);

// Kamera sitzt starr auf dem Pilotenmarker und erbt damit dessen Position und
// Blickrichtung (-Z). Ueber den Marker haengt sie am Schiffs-Rig.
ship.getSeatPilot().add(camera);

// ------------------------------------------------------- Input / Steuerung
const input = new Input(renderer.domElement);
renderer.domElement.addEventListener('mousedown', () => input.requestPointerLock());

const flight = new FlightModel(ship);
// AP4 (Walk-Mode) schaltet den Controller beim Aufstehen per disable() ab und
// beim Hinsetzen per enable() wieder an; das Schiff fliegt derweil weiter.
const seated = new SeatedController(input, flight);

const hud = new Hud();

// Walk-Mode: der Spieler laeuft im Schiffslokalraum, die Kamera wechselt dabei
// vom Sitzmarker ans Schiffs-Rig.
const walk = new WalkController(input, ship);
const player = new PlayerState({ input, ship, camera, seated, walk, hud });

// ------------------------------------------------------- Innenraum aus Blender
// Die Innenraummaterialien sind stark metallisch und brauchen eine
// Reflexionsquelle, sonst bleiben sie schwarz. Nur der Innenraum bekommt diese
// Textur — im Weltraum draussen waere sie falsch.
const pmrem = new PMREMGenerator(renderer);
const interiorEnvironment = pmrem.fromScene(createInteriorEnvironment(), 0.02).texture;
pmrem.dispose();

// Bis das GLB da ist (oder falls es fehlschlaegt) bleibt der Placeholder stehen.
loadShipInterior(`${import.meta.env.BASE_URL}models/ship-interior.glb`, interiorEnvironment)
  .then((interior) => {
    ship.setInterior(interior);
    // Das MFD zeigt ab jetzt echte Kontakte statt eines gemalten Standbilds.
    radar.attachTo(interior);
    // Kamera haengt noch am alten Sitzmarker und muss neu angebunden werden;
    // ausserdem brauchen die Kollisionsboxen die neuen COL_-Meshes.
    player.refreshInterior();
    console.info(`Innenraum geladen: ${ship.getCollisionMeshes().length} COL_-Meshes`);
  })
  .catch((error) => {
    console.warn('Innenraum-GLB nicht geladen, Placeholder bleibt aktiv:', error);
  });

// ------------------------------------------------------------ Floating Origin
/** Ab dieser Entfernung vom Ursprung wird die Welt zurueckgeschoben. */
const ORIGIN_LIMIT = 10_000;
const originOffset = new Vector3();

function applyFloatingOrigin(): void {
  if (ship.position.lengthSq() < ORIGIN_LIMIT * ORIGIN_LIMIT) return;
  originOffset.copy(ship.position);
  ship.position.set(0, 0, 0);
  planet.position.sub(originOffset);
  asteroids.position.sub(originOffset);
  weapons.shift(originOffset);
  effects.shift(originOffset);
  hull.shift(originOffset);
  // Starfield und Sonne folgen der Kamera und brauchen keine Verschiebung.
}

// ---------------------------------------------------------------- Game-Loop
const time = new Time();
const cameraWorldPos = new Vector3();
const forward = new Vector3();

/** Physik-Hook, fester Timestep (120 Hz). */
function fixedUpdate(dt: number): void {
  flight.update(dt);
  // Laufphysik im Schiffslokalraum — unabhaengig davon, wohin das Schiff fliegt.
  player.fixedUpdate(dt);
  weapons.update(dt, ship, flight.velocity);
  // Erst fliegen, dann anecken: die Kollision korrigiert die Position dieses
  // Schrittes und wirft die Geschwindigkeit zurueck.
  const impact = hull.update(dt, ship, flight.velocity);
  if (impact) shake.add(0.25 + impact.damage * 3);
  effects.update(dt);
  applyFloatingOrigin();
}

function render(dt: number): void {
  asteroids.update(dt);
  planet.update(dt);

  const target = targeting.update(
    asteroids,
    ship.position,
    flight.velocity,
    weapons.getParams().boltSpeed,
  );
  radar.update(dt, {
    origin: ship.position,
    orientation: ship.quaternion,
    asteroids,
    targetIndex: targeting.getIndex(),
  });

  // Kamerapose (Sitz oder Gehen inkl. Blend) vor der Matrixaktualisierung.
  player.updateCamera();
  // Wackler kommt nach der Pose — die wird jeden Frame neu gesetzt.
  shake.update(dt);
  shake.applyTo(camera);
  scene.updateMatrixWorld();
  camera.getWorldPosition(cameraWorldPos);
  starfield.update(cameraWorldPos);
  sun.update(cameraWorldPos);

  post.render();

  hud.update({
    camera,
    velocity: flight.velocity,
    speed: flight.getSpeed(),
    setSpeed: flight.setSpeed,
    mode: flight.mode,
    fullStop: flight.fullStop,
    afterburner: flight.inputs.afterburner,
    pointerLocked: input.pointerLocked,
    mouseOffset: seated.getMouseOffset(),
    maxSetSpeed: flight.getParams().maxSetSpeed,
    kills: weapons.kills,
    sinceHit: weapons.getTimeSinceHit(),
    target,
    hull: hull.integrity,
    sinceImpact: hull.sinceImpact,
  });
}

renderer.setAnimationLoop(() => {
  // Eingaben werden einmal pro Frame abgetastet (Tastenflanken gelten pro
  // Frame, und ein Frame kann null Physikschritte enthalten). Das Ergebnis
  // sind Pegelsignale, die das FlightModel danach mit 120 Hz auswertet.
  seated.update(time.frameDelta);
  // Modewechsel (KeyF) und Umsehen beim Gehen: ebenfalls einmal pro Frame.
  player.update(time.frameDelta);
  // Zielerfassung weiterschalten (nur sitzend).
  if (!player.isWalking && input.wasPressed('KeyT')) {
    forward.set(0, 0, -1).applyQuaternion(ship.quaternion);
    targeting.cycle(asteroids, ship.position, forward);
  }
  // Gefeuert wird nur sitzend und mit gefangenem Zeiger.
  weapons.setTrigger(
    !player.isWalking &&
      input.pointerLocked &&
      (input.isMouseDown(0) || input.isDown('Space')),
  );
  const dt = time.tick(fixedUpdate);
  render(dt);
  input.endFrame();
});

// ------------------------------------------------------------------- Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  post.setSize(window.innerWidth, window.innerHeight);
  starfield.setPixelRatio(renderer.getPixelRatio());
});

// Debug-Zugriff fuer Tests und die folgenden Arbeitspakete.
Object.assign(window as unknown as Record<string, unknown>, {
  __privateer: {
    ship, flight, seated, walk, player, hud, camera, input, scene,
    weapons, effects, asteroids, targeting, hull, shake, radar,
  },
});
