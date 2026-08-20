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
import type { HudState } from './hud/HudState';
import { Effects } from './combat/Effects';
import { Weapons } from './combat/Weapons';
import { Targeting } from './combat/Targeting';
import { HullCollision } from './combat/HullCollision';
import { CameraShake } from './player/CameraShake';
import { RadarScreen } from './ship/RadarScreen';
// --- Cockpitanzeigen ---
import { CockpitDisplays } from './ship/CockpitDisplays';
import { GlassHud } from './hud/GlassHud';
// --- Cockpitanzeigen Ende ---
import { createPostprocessing, DEEP_LAYER, WORLD_LAYER } from './render/Postprocessing';
import { Interactables } from './player/Interactables';
// --- Raumstation ---
import { Station } from './world/Station';
import { DockingController } from './world/DockingController';
import { createCargoStationTrade } from './world/CargoStationTrade';
// --- Raumstation Ende ---
// --- Schadensmodell ---
import { DamageModel } from './systems/DamageModel';
// --- Schadensmodell Ende ---

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

// --- Asteroidenfeld ---
const asteroids = new Asteroids();
// Das Feld setzt seine Renderschicht selbst: die Detailstufen der
// Grossbrocken haengen als eigene Kinder darin, und das traverse() weiter
// unten laeuft nur einmal beim Start.
asteroids.setLayer(WORLD_LAYER);
// --- Asteroidenfeld Ende ---

const ship = new Ship();

// Waffen: Geschosse und Effekte leben in Weltkoordinaten, nicht am Schiff.
const effects = new Effects();
const weapons = new Weapons(asteroids, effects);
const targeting = new Targeting();
const hull = new HullCollision(asteroids, effects);
const shake = new CameraShake();
const radar = new RadarScreen();
// --- Cockpitanzeigen ---
// Instrumente im Raum: lebende Schirme auf der Konsole und die Projektion
// vor der Kanzel. Beide haengen am Schiff, nicht am Bild.
const displays = new CockpitDisplays();
const glass = new GlassHud();
ship.add(glass.group);
// --- Cockpitanzeigen Ende ---

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

// Ein gemeinsames Register fuer alles, was man an Bord anfassen kann:
// Frachtkisten, Reparaturklappen, Werkzeug. PlayerState kennt genau eines —
// zwei Register hiessen, dass die Haelfte der Prompts nie erscheint.
const interactables = new Interactables();

// --- Fracht ---
// Gekaufte Ware liegt als echte Kiste im begehbaren Laderaum: voll beladen
// quetscht man sich nach achtern durch, und das Schiff fliegt traeger. Der
// Aufbau steht komplett in setupCargo(), hier haengt er nur ein.
import { setupCargo } from './cargo/setupCargo';
const cargo = setupCargo({ ship, walk, flight, renderer, interactables });
// --- /Fracht ---

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
// Das Menue handelt mit dem echten Laderaum: gekaufte Ware steht hinterher
// als Kiste im Frachtraum, verkaufte verschwindet. Die Reparatur greift auf
// die echte Huelle durch.
const trade = createCargoStationTrade({
  hold: cargo.hold,
  getHull: () => hull.integrity,
  setHull: (value) => {
    hull.integrity = value;
  },
});
const docking = new DockingController({ ship, flight, station, input, trade });
// --- Raumstation Ende ---

// --- Aussenansicht ---
// Der Rumpf haengt am Schiffs-Rig und ist nur in der Aussenansicht sichtbar —
// im Cockpit saesse der Pilot sonst in einem geschlossenen Blechkasten. Die
// Kamera bleibt am Sitzmarker haengen und bekommt dort nur eine andere lokale
// Pose, damit PlayerState seine Hierarchie behaelt.
import { loadShipExterior, type Exterior } from './ship/Exterior';
import { CHASE_KEY, ChaseCamera } from './player/ChaseCamera';

const chase = new ChaseCamera(ship, camera);
let exterior: Exterior | null = null;

loadShipExterior(`${import.meta.env.BASE_URL}models/ship-exterior.glb`, renderer, sun.direction)
  .then((loaded) => {
    exterior = loaded;
    ship.add(loaded);
    console.info('Aussenrumpf geladen — C schaltet die Aussenansicht um');
  })
  .catch((error) => {
    console.warn('Aussenrumpf-GLB nicht geladen, Aussenansicht bleibt aus:', error);
  });

/** Steht die Kamera gerade hinter dem Schiff? Die Anzeigen richten sich danach. */
let externalView = false;

/** Laeuft im Renderpfad direkt nach `player.updateCamera()`. */
function updateExteriorView(dt: number): void {
  const mode = chase.update(dt, {
    walking: player.isWalking,
    speed: flight.getSpeed(),
    toggle: input.wasPressed(CHASE_KEY),
  });
  externalView = mode === 'chase';
  exterior?.setVisible(externalView);
  exterior?.update(dt, flight);
}
// --- Ende Aussenansicht ---
// --- Schadensmodell ---
// Subsysteme, Reparaturklappen an Bord und die Warntafel im Cockpit. Der
// Innenraum wird in `loadShipInterior().then()` nachgereicht, die Hooks liegen
// in `fixedUpdate` (Treffer) und in der Spielschleife (Darstellung).
const damage = new DamageModel({ flight, weapons, targeting, interactables });
// --- /Schadensmodell ---


const player = new PlayerState({
  input, ship, camera, seated, walk, hud, interactables,
});

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
    // --- Cockpitanzeigen ---
    displays.attachTo(interior);
    // --- Cockpitanzeigen Ende ---
    // Schadensmodell: Reparaturklappen, Lampensteuerung, Warntafel.
    damage.attachInterior(interior);
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
  // Schadensmodell: Treffer auf die Subsysteme verteilen, Luft mitfuehren.
  damage.fixedUpdate(dt, impact);
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
  updateExteriorView(dt); // --- Aussenansicht ---
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

  // --- Cockpitanzeigen ---
  // Ein Zustand je Frame fuer alle drei Anzeigen: Schirme, Scheibe, DOM.
  const hudState: HudState = {
    camera,
    position: ship.position,
    orientation: ship.quaternion,
    velocity: flight.velocity,
    speed: flight.getSpeed(),
    setSpeed: flight.setSpeed,
    maxSetSpeed: flight.getParams().maxSetSpeed,
    mode: flight.mode,
    fullStop: flight.fullStop,
    afterburner: flight.inputs.afterburner,
    walking: player.isWalking,
    external: externalView,
    pointerLocked: input.pointerLocked,
    mouseOffset: seated.getMouseOffset(),
    kills: weapons.kills,
    sinceHit: weapons.getTimeSinceHit(),
    target,
    hull: hull.integrity,
    sinceImpact: hull.sinceImpact,
  };
  displays.update(dt, hudState);
  glass.update(hudState);
  // --- Cockpitanzeigen Ende ---

  post.render();
  if (pendingCapture) captureReflections();

  hud.update(hudState);
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
  // Schadensmodell: Faktoren fuer Flug/Waffen setzen, Panels und Warntafel
  // darstellen. Vor dem Physikschritt, damit die Faktoren im selben Frame
  // wirken; beim Sitzen bricht `null` eine laufende Reparatur ab.
  damage.update(time.frameDelta, player.isWalking ? walk.position : null);
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
    post, renderer, displays, glass, cargo,
    station, docking, trade, damage, interactables,
  },
});
