# Privateer-Style Space Game — Ausbauschritt 1

Ziel: Im Weltraum fliegen (Cockpit-Ansicht wie Privateer), aufstehen und in
First-Person durchs eigene Schiff laufen können. Three.js + TypeScript + Vite.

## Kernentscheidungen

- **Flugmodell:** Zwei Modi im selben Modell, `KeyV` schaltet durch.
  **Arcade** (default): Nase = Flugrichtung, Eingabe ist eine Soll-Drehrate,
  der Geschwindigkeitsvektor folgt der Nase mit kurzer Zeitkonstante — kein
  Nachdrehen, kein Drift. **Newton:** echte Trägheit (Position, Velocity,
  Orientierung, Angular Velocity, Thruster-Kräfte), wahlweise mit Flight-Assist
  (dämpft Rotation, regelt auf die Sollgeschwindigkeit entlang der Nase,
  Privateer-Feeling) oder ganz frei.
- **Nahtloser Innenraum:** Das Cockpit ist Teil des begehbaren Schiffsinneren.
  Eine Szene, keine Szenenwechsel. Kamera ist Kind des Schiffs-Rigs.
- **Assets:** Schiffsinneres/Cockpit als glTF aus Blender (via MCP). Bis das
  GLB fertig ist, dient ein prozeduraler Placeholder-Innenraum mit identischen
  Konventionen.
- **Einheiten:** 1 Unit = 1 Meter. Schiffsgeschwindigkeiten bis ~500 m/s.
- **Renderer:** WebGLRenderer mit `logarithmicDepthBuffer: true` (Cockpit bei
  0,1 m und Planet bei 100 km im selben Frustum). Kamera near 0.05, far 1e7.
- **Floating Origin:** Wenn |Schiffsposition| > 10 000 m: Welt um die
  Schiffsposition zurückverschieben (Schiff, Asteroiden; Starfield/Sonne/Planet
  sind quasi-unendlich weit und werden nur mitgeführt bzw. sind kamerafixiert).

## Koordinaten & Konventionen

- Three.js-Standard: Schiffsnase zeigt entlang **-Z** (lokal), oben ist **+Y**.
- In Blender wird das Schiff mit Nase entlang **-Y**, oben **+Z** gebaut; der
  glTF-Export (Standard, +Y up) ergibt dann automatisch Nase = -Z in Three.js.
- Der Innenraumboden liegt bei lokal y=0; Augenhöhe beim Laufen: 1,7 m.

### glTF-/Szenengraph-Konventionen (gelten auch für den Placeholder!)

- Root-Objekt des Innenraums: `ShipInterior`.
- Kollisionsgeometrie: separate, einfache Meshes mit Namenspräfix **`COL_`**
  (werden zur Laufzeit unsichtbar geschaltet und nur für Kollision benutzt).
- Pilotensitz-Marker: Empty/Object namens **`Seat_Pilot`** — Position =
  Augenpunkt im Sitzen, -Z = Blickrichtung.
- Aufsteh-Punkt: Empty namens **`Stand_Pilot`** — wo der Spieler nach dem
  Aufstehen steht.
- Alles in Metern, realistische Maße (Türhöhe ~2 m, Gänge ≥ 1,2 m breit).

## Steuerung (physische Keys via `event.code`, QWERTZ-sicher)

**Sitzend (Flug), Pointer Lock:**
- Maus: Pitch/Yaw (Torque Richtung Maus-Offset vom Zentrum, wie Privateer)
- `KeyW`/`KeyS`: Sollgeschwindigkeit +/- (Arcade/Assist); bei Newton frei: Schub vor/zurück
- `KeyQ`/`KeyE`: Rollen
- `KeyA`/`KeyD`: Lateralschub links/rechts
- `ShiftLeft`/`ControlLeft`: Schub hoch/runter
- `KeyX`: Full Stop (bremst auf 0)
- `KeyV`: Flugmodus weiterschalten (Arcade -> Newton+Assist -> Newton frei)
- `Tab`: Afterburner (Schubfaktor 4, solange gehalten)
- `KeyF`: Aufstehen

**Stehend (Gehen), Pointer Lock:**
- Maus: Umsehen; `KeyW/A/S/D`: Gehen; Schwerkraft lokal zum Schiff (-Y),
  Capsule-Collider (r=0,3 m, h=1,7 m) gegen `COL_`-Meshes
- `KeyF` in Sitznähe (< 1,5 m, mit Prompt im HUD): Hinsetzen
- Während des Gehens fliegt das Schiff mit Flight-Assist auf Kurs weiter.

## Modulstruktur

```
src/
  main.ts                   Bootstrap, Resize, Game-Loop (fixed timestep 120 Hz Physik, Render variabel)
  core/Input.ts             Tastatur-/Maus-State, Pointer Lock
  world/Starfield.ts        Prozeduraler Sternenhimmel (Points/Cubemap), kamerafixiert
  world/Sun.ts              Sonne + Licht (DirectionalLight) + Glow
  world/Planet.ts           Ein Planet als Landmarke
  world/Asteroids.ts        Asteroidenfeld (InstancedMesh) nahe Startposition
  ship/Ship.ts              Schiffs-Rig (Object3D), lädt GLB oder Placeholder, stellt Seat_Pilot/COL_-Meshes bereit
  ship/PlaceholderInterior.ts  Prozeduraler Innenraum nach obigen Konventionen
  ship/FlightModel.ts       Arcade- und Newton-Flugmodell + Sollgeschwindigkeit
  player/PlayerState.ts     State-Machine: SEATED <-> WALKING
  player/SeatedController.ts  Maussteuerung -> FlightModel-Inputs
  player/WalkController.ts  First-Person-Controller im Schiffslokalraum
  hud/Hud.ts                DOM-Overlay: Fadenkreuz, Speed/SetSpeed, Prograde-/Retrograde-Marker, Flugmodus, Interaktions-Prompt
```

## Arbeitspakete (je ein Opus-Agent)

1. **Scaffold + Weltraum-Szene:** Projektgerüst (Dateien direkt schreiben,
   kein interaktives `npm create`), Loop, Starfield, Sonne, Planet, Asteroiden,
   Placeholder-Innenraum, statische Cockpitkamera auf `Seat_Pilot`.
2. **Blender-Interior (parallel zu 1):** Cockpit + begehbarer Innenraum in
   Blender (neue Szene!, nie speichern, nur Export), GLB nach
   `public/models/ship-interior.glb`.
3. **Flugphysik + HUD** (nach 1): FlightModel, SeatedController, Hud.
4. **Walk-Mode + GLB-Integration** (nach 2+3): PlayerState, WalkController,
   Sitz-Interaktion, GLB statt Placeholder laden.
