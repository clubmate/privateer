# Privateer — Weltraumflug mit begehbarem Schiff

Ein Three.js-Prototyp im Geist von *Wing Commander: Privateer*: Du sitzt im
Cockpit eines kleinen Frachters, fliegst — arcadig oder newtonsch — durch ein
Asteroidenfeld vor einem Planeten — und kannst
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
| Maus | Pitch/Yaw — im Arcade-Modus dreht das Schiff direkt mit der Maus, im Newton-Modus wirkt der Offset vom Bildzentrum als stehendes Steuerkreuz (Privateer-Stil) |
| `W` / `S` | Sollgeschwindigkeit hoch/runter (Newton frei: Haupt-/Retroschub) |
| `Q` / `E` | Rollen links/rechts |
| `A` / `D` | Lateralschub links/rechts |
| `Shift` / `Strg` (links) | Schub hoch/runter |
| `X` | Full Stop — bremst auf 0 |
| `V` | Flugmodus weiterschalten: **Arcade** → Newton + Assist → Newton frei |
| `Tab` (halten) | Nachbrenner |
| `F` | **Aufstehen** |

Der Modus steht im Chip rechts unten im HUD.

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

- **Flugmodell:** Zwei Charaktere im selben Modell. **Arcade** (Standard) fliegt
  wie ein Jaeger: die Nase bestimmt die Flugrichtung, die Drehrate folgt der
  Eingabe fast verzoegerungsfrei, der Geschwindigkeitsvektor zieht mit kurzer
  Zeitkonstante nach — kein Nachdrehen, kein Drift. **Newton** rechnet mit
  Kraeften, Traegheit und Drehimpuls, wahlweise mit Flight-Assist (daempft die
  Rotation und regelt auf die Sollgeschwindigkeit) oder voellig frei. Fester
  Physik-Timestep mit 120 Hz, Rendern mit variabler Framerate.
- **Bild:** Bloom ueber einen `EffectComposer` (Leuchtstreifen, Displays, Sonne);
  das Antialiasing macht das multisampelte Zwischenziel.
- **Walk-Mode:** Der Spieler lebt im **Schiffslokalraum** — die Kamera wird beim
  Aufstehen vom Sitzmarker ans Schiffs-Rig umgehaengt und macht dadurch jede
  Schiffsbewegung ohne Nachziehen mit. Kollision: Kapsel (r = 0,3 m, Augenhoehe
  1,7 m) gegen vorberechnete Boxen der `COL_`-Meshes, horizontale und vertikale
  Kontakte getrennt aufgeloest. Keine Physik-Library.
- **Innenraum:** `public/models/ship-interior.glb` (aus Blender). Bis das Modell
  geladen ist — oder falls das Laden fehlschlaegt — steht ein prozeduraler
  Placeholder-Innenraum mit denselben Konventionen.
- **Korrekturen beim Laden** (alle in `InteriorLoader`, das GLB bleibt
  unveraendert): Materialien auf `FrontSide` statt durchgehend `doubleSided`,
  buendig aufliegende Zierleisten und Aufkleber um 1,5 mm von ihrer
  Traegerflaeche weggerueckt — beides gegen das Flimmern an den Waenden;
  Kanzelstreben, die quer durchs Blickfeld laufen, entfernt; Augenpunkt im Sitz
  etwas hoeher und weiter hinten; Displays bekommen prozedurale Inhalte.
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
  ship/InteriorLoader.ts       GLB laden, Achsen/Material/Licht/Sicht korrigieren
  ship/InteriorEnvironment.ts  Dunkles PMREM-Environment fuer die Metalle
  ship/PlaceholderInterior.ts  Prozeduraler Ersatz-Innenraum
  ship/FlightModel.ts          Arcade- und Newton-Flugmodell
  ship/InteriorScreens.ts      Canvas-Texturen fuer die Cockpit-Displays
  render/Postprocessing.ts     Bloom-Pipeline
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
