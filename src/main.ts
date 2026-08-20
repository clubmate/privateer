import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
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
import { loadShipInterior, setInteriorEnvironment } from './ship/InteriorLoader';
import { captureInteriorEnvironment, createInteriorEnvironment } from './ship/InteriorEnvironment';
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
import { createPostprocessing, DEEP_LAYER, WORLD_LAYER } from './render/Postprocessing';
// --- Raumstation ---
import { Station } from './world/Station';
import { DockingController } from './world/DockingController';
import { createStationTradeStub } from './world/StationTrade';
// --- Raumstation Ende ---

const container = document.getElementById('app');
if (!container) throw new Error('#app fehlt in index.html');

const renderer = new WebGLRenderer({
  // Kein logarithmicDepthBuffer mehr: der schreibt gl_FragDepth pro Fragment
  // und macht damit jede Tiefenrekonstruktion im Schirmraum unmoeglich (GTAO).
  // Die Tiefenspanne loest stattdessen der zweigeteilte Renderpfad, siehe
  // render/Postprocessing.ts.
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
// Schatten im Innenraum: Lampen und Einrichtung stehen fest zueinander, also
// wird die Schattenkarte genau einmal gezeichnet statt in jedem Frame.
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
container.appendChild(renderer.domElement);

const scene = new Scene();

// Nahkamera: Innenraum, 5 cm bis 3 km. Das reicht bis weit hinter die Kanzel
// und laesst dem Tiefenpuffer im Cockpit Millimeter-Aufloesung.
const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.05, 3000);
camera.rotation.order = 'YXZ';
camera.layers.set(0);

// Weltkamera: Asteroiden, Geschosse, Effekte. `near` bleibt klein genug, dass
// ein Brocken direkt vor der Nase nicht abgeschnitten wird.
const worldCamera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 30_000);
worldCamera.layers.set(WORLD_LAYER);
scene.add(worldCamera);

// Tiefenkamera: Sterne (2000 km), Sonne (1500 km), Planet (850 km). Das nahe
// Ende liegt weit draussen — nur so bleibt die Wolkenschale des Planeten
// sauber von seiner Oberflaeche getrennt.
const deepCamera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 5_000, 5e6);
deepCamera.layers.set(DEEP_LAYER);
scene.add(deepCamera);

// Bloom und Umgebungsverdeckung laufen ueber einen EffectComposer; das Canvas
// selbst braucht dann kein Antialiasing mehr, das uebernimmt das
// multisampelte Zwischenziel.
const post = createPostprocessing(renderer, scene, camera, worldCamera, deepCamera);

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

// Jedes Objekt in seinen Entfernungsbereich legen. Geschosse und Effekte
// gehoeren zur Welt: sie fliegen zwischen den Brocken, und im Nah-Durchgang
// (Tiefe geloescht) laegen sie faelschlich immer davor.
for (const object of [asteroids, weapons.mesh, effects]) {
  object.traverse((child) => child.layers.set(WORLD_LAYER));
}
for (const object of [starfield, sun, planet]) {
  object.traverse((child) => child.layers.set(DEEP_LAYER));
}
// Das Sonnenlicht ist die Ausnahme: In Three beleuchtet ein Licht nur, was
// seine Layer teilt. Nur die Sonnenscheibe gehoert in die Tiefe — ihr Licht
// muss Asteroiden und Innenraum gleichermassen erreichen.
sun.light.layers.enableAll();

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

// --- Raumstation ---
// Handelsposten gut 13 km voraus, seitlich am Asteroidenfeld vorbei. Das Maul
// zeigt grob zum Startpunkt, aber um 24 Grad versetzt — der erste Anflug soll
// eine Kurve verlangen, keine gerade Linie.
const station = new Station();
station.placeAt(new Vector3(0.36, 0.1, -0.93).normalize().multiplyScalar(13_400), 24);
scene.add(station);
// Wie bei der Sonne: die Station gehoert in die Weltschicht, ihr Buchtlicht
// muss aber auch den Innenraum erreichen (siehe Station.setLayer).
station.setLayer(WORLD_LAYER);
// Reparatur greift schon jetzt auf die echte Huelle durch; Laderaum und
// Credits haelt bis auf Weiteres die Attrappe (siehe world/StationTrade.ts).
const trade = createStationTradeStub({
  getHull: () => hull.integrity,
  setHull: (value) => {
    hull.integrity = value;
  },
});
const docking = new DockingController({ ship, flight, station, input, trade });
// --- Raumstation Ende ---

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
    // Die echte Reflexionsaufnahme braucht den fertig aufgebauten Raum; sie
    // laeuft deshalb erst im naechsten Frame (siehe `pendingCapture`).
    pendingCapture = true;
    console.info(`Innenraum geladen: ${ship.getCollisionMeshes().length} COL_-Meshes`);
  })
  .catch((error) => {
    console.warn('Innenraum-GLB nicht geladen, Placeholder bleibt aktiv:', error);
  });

/**
 * Sobald der Innenraum steht, wird einmal eine Cubemap an Bord aufgenommen und
 * als Reflexionsumgebung eingesetzt. Erst im Frame danach, damit Materialien,
 * Displays und Lampen bereits gesetzt sind.
 */
let pendingCapture = false;
const captureOrigin = new Vector3();

function captureReflections(): void {
  pendingCapture = false;
  // Einmalige Schattenkarte, sobald der Innenraum steht.
  renderer.shadowMap.needsUpdate = true;
  const interior = ship.getInterior();
  // Mitte des Gangs: von dort sieht die Cubemap in alle drei Sektionen.
  captureOrigin.set(0, 1.5, 0).applyMatrix4(ship.matrixWorld);
  setInteriorEnvironment(interior, captureInteriorEnvironment(renderer, scene, captureOrigin));
}

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
  docking.shift(originOffset); // --- Raumstation ---
  // Starfield und Sonne folgen der Kamera und brauchen keine Verschiebung.
}

// ---------------------------------------------------------------- Game-Loop
const time = new Time();
const cameraWorldPos = new Vector3();
const farCameraScale = new Vector3();
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
  // --- Raumstation --- Ringrotation, Anflug, Andockautopilot. Muss vor
  // `player.updateCamera()` laufen: der Autopilot setzt die Schiffspose.
  docking.update(dt);

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

  // Beide Aussenkameras auf dieselbe Pose setzen; sie haengen am
  // Szenenwurzelknoten, die Nahkamera dagegen am Schiff.
  camera.matrixWorld.decompose(worldCamera.position, worldCamera.quaternion, farCameraScale);
  worldCamera.updateMatrixWorld();
  deepCamera.position.copy(worldCamera.position);
  deepCamera.quaternion.copy(worldCamera.quaternion);
  deepCamera.updateMatrixWorld();

  camera.getWorldPosition(cameraWorldPos);
  starfield.update(cameraWorldPos);
  sun.update(cameraWorldPos);

  post.render();
  if (pendingCapture) captureReflections();

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
  worldCamera.aspect = camera.aspect;
  worldCamera.updateProjectionMatrix();
  deepCamera.aspect = camera.aspect;
  deepCamera.updateProjectionMatrix();
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
    post, renderer,
    station, docking, trade, // --- Raumstation ---
  },
});
