# Privateer — Weltraumflug mit begehbarem Schiff

Ein Three.js-Prototyp im Geist von *Wing Commander: Privateer*: Du sitzt im
Cockpit eines kleinen Frachters, fliegst mit newtonscher Physik und
Flight-Assist durch ein Asteroidenfeld vor einem Planeten — und kannst
jederzeit **aufstehen und durch dein Schiff laufen**. Cockpit, Gang und
Wohn-/Frachtraum sind eine einzige Szene, es gibt keine Ladebildschirme und
keinen Szenenwechsel: die Kamera haengt am selben Schiffs-Rig, ob du steuerst
oder hinten bei den Kisten stehst. Waehrend du laeufst, fliegt das Schiff mit
Flight-Assist auf Kurs weiter.

## Starten

```bash
npm install
npm run dev      # http://localhost:5173
```

Weitere Skripte:

```bash
npm run build      # tsc --noEmit + vite build
npm run preview    # gebauten Stand ausliefern
npm run typecheck  # nur tsc --noEmit
```

Ins Bild klicken aktiviert den **Pointer Lock** — ohne ihn reagiert weder die
Flug- noch die Blicksteuerung. `Esc` gibt den Zeiger wieder frei.

## Steuerung

Alle Tasten werden ueber `event.code` (physische Position) abgefragt, QWERTZ und
QWERTY sind also identisch.

### Sitzend — Flug

| Eingabe | Wirkung |
| --- | --- |
| Maus | Pitch/Yaw — der Offset vom Bildzentrum wirkt als Steuerkreuz (Privateer-Stil) |
| `W` / `S` | Sollgeschwindigkeit hoch/runter (bei Assist AUS: Haupt-/Retroschub) |
| `Q` / `E` | Rollen links/rechts |
| `A` / `D` | Lateralschub links/rechts |
| `Shift` / `Strg` (links) | Schub hoch/runter |
| `X` | Full Stop — der Assist bremst auf 0 |
| `V` | Flight-Assist an/aus (aus = voller Drift) |
| `Tab` (halten) | Nachbrenner, Schubfaktor 4 |
| `F` | **Aufstehen** |

### Stehend — Gehen

| Eingabe | Wirkung |
| --- | --- |
| Maus | Umsehen (Pitch auf ±89° begrenzt) |
| `W` / `A` / `S` / `D` | Gehen, ca. 2,5 m/s, mit sanfter Beschleunigung |
| `F` (in Sitznaehe, < 1,5 m) | **Hinsetzen** — das HUD blendet den Prompt ein |

Beim Gehen verschwinden Fadenkreuz, Steuerkreuz-Cursor und die
Prograde-/Retrograde-Marker; die Geschwindigkeitsanzeige bleibt, weil das Schiff
weiterfliegt.

## Wie es funktioniert

- **Flugmodell:** Newtonisch (Kraefte, Traegheit, Drehimpuls) mit Flight-Assist,
  der Rotation daempft und die Bahngeschwindigkeit auf die Sollgeschwindigkeit
  entlang der Schiffsnase regelt. Fester Physik-Timestep mit 120 Hz, Rendern mit
  variabler Framerate.
- **Walk-Mode:** Der Spieler lebt im **Schiffslokalraum** — die Kamera wird beim
  Aufstehen vom Sitzmarker ans Schiffs-Rig umgehaengt und macht dadurch jede
  Schiffsbewegung ohne Nachziehen mit. Kollision: Kapsel (r = 0,3 m, Augenhoehe
  1,7 m) gegen vorberechnete Boxen der `COL_`-Meshes, horizontale und vertikale
  Kontakte getrennt aufgeloest. Keine Physik-Library.
- **Innenraum:** `public/models/ship-interior.glb` (aus Blender). Bis das Modell
  geladen ist — oder falls das Laden fehlschlaegt — steht ein prozeduraler
  Placeholder-Innenraum mit denselben Konventionen.
- **Massstab:** 1 Unit = 1 Meter, Kamera `near` 0,05 / `far` 1e7 mit
  logarithmischem Tiefenpuffer, damit Cockpitkonsole und Planet in 850 km im
  selben Frustum sauber bleiben. Ab 10 km Abstand vom Ursprung wird die Welt
  zurueckgeschoben (Floating Origin).

## Projektstruktur

```
src/
  main.ts                      Bootstrap, Game-Loop, Verdrahtung
  core/Input.ts                Tastatur/Maus, Pointer Lock
  core/Time.ts                 Fixed-Timestep-Akkumulator
  world/                       Starfield, Sonne, Planet, Asteroiden
  ship/Ship.ts                 Schiffs-Rig, Marker, COL_-Meshes
  ship/InteriorLoader.ts       GLB laden, Achsen/Material/Licht korrigieren
  ship/InteriorEnvironment.ts  Dunkles PMREM-Environment fuer die Metalle
  ship/PlaceholderInterior.ts  Prozeduraler Ersatz-Innenraum
  ship/FlightModel.ts          Newtonsche Physik + Flight-Assist
  player/SeatedController.ts   Flugsteuerung
  player/PlayerState.ts        State-Machine SEATED <-> WALKING
  player/WalkController.ts     First-Person-Controller im Schiffslokalraum
  player/ShipCollider.ts       Boxen aus den COL_-Meshes, Kugel-gegen-Box
  hud/                         DOM-Overlay
```

## Weiterlesen

- [`PLAN.md`](PLAN.md) — Kernentscheidungen, Koordinaten- und
  Szenengraph-Konventionen, Arbeitspakete.
- [`ASSET-NOTES.md`](ASSET-NOTES.md) — Aufbau des Innenraum-GLB, Marker,
  Materialien, Liste der `COL_`-Meshes.

> Hinweis zum GLB: Der Blender-Export liefert die Nase entlang **+Z**, das
> Projekt erwartet **-Z**. `InteriorLoader` dreht den Innenraum-Root deshalb um
> 180° um Y und die Marker `Seat_Pilot`/`Stand_Pilot` gleich mit.
