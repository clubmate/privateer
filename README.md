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
| Linke Maustaste / `Leertaste` | **Feuern** — beide Bordkanonen, Konvergenz bei 900 m |
| `T` | Ziel erfassen bzw. weiterschalten (naechstes im Fadenkreuz) |
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
- **Renderpfad:** Drei Entfernungsbereiche, von hinten nach vorn gezeichnet,
  dazwischen wird nur die Tiefe geloescht — Sterne/Sonne/Planet (5 km bis
  5000 km), Asteroiden/Geschosse (1 m bis 30 km), Innenraum (5 cm bis 3 km).
  Vorher hielt ein logarithmischer Tiefenpuffer die ganze Spanne zusammen; der
  schreibt aber `gl_FragDepth` pro Fragment und macht damit jedes
  Schirmraum-Verfahren unmoeglich. Die Aufteilung laeuft ueber Layer. Lichter
  sind davon ausgenommen: das Sonnenlicht steht auf allen Layern, sonst
  bekaemen die Asteroiden kein Licht.
- **Bild:** Umgebungsverdeckung (GTAO), Bloom und Tonemapping ueber einen
  `EffectComposer`; das Antialiasing macht das multisampelte Zwischenziel. Die
  Verdeckung ist der teuerste Teil — `post.setAmbientOcclusion(false)` schaltet
  sie ab.
- **Materialien:** Im GLB ist praktisch alles Metall (metalness 0,70–0,92) bei
  sehr dunkler Grundfarbe; Metalle haben keinen diffusen Anteil, ihr Aussehen
  kommt vollstaendig aus der Reflexion, und die wird mit der Grundfarbe
  eingefaerbt — bei 0,10 bleibt davon nichts. Der Loader trennt deshalb nach
  Bauart: **lackierte Bleche sind Dielektrika**, blankes Stahlzeug bleibt
  metallisch und wird heller. Dazu bekommt jede Sektion einen eigenen Farbton
  (kuehles Cockpit, neutraler Gang, warmer Frachtraum).
- **Reflexionen:** Einmal wird an Bord eine Cubemap gerendert und daraus die
  PMREM-Textur gefiltert — die Verkleidung spiegelt die echten Leuchten und
  Waende statt einer nachgebauten Kammer.
- **Schatten:** Drei Raumleuchten werfen Schatten. Weil im Innenraum nichts
  wandert, wird die Schattenkarte genau **einmal** gezeichnet
  (`shadowMap.autoUpdate = false`).
- **Lichtkegel:** Kegelmantel mit Shader statt echtem Volumen, ausgeblendet zur
  Silhouette und nahe der Kamera — ohne diese beiden Ausblendungen sieht man
  entweder die harte Kegelkante oder man steht im Nebel.
- **Zielerfassung:** `T` erfasst den Brocken, der dem Fadenkreuz am naechsten
  liegt; das HUD klammert ihn ein und zeigt Entfernung und Zustand. Aus
  Zielbewegung und Geschossgeschwindigkeit ergibt sich der **Vorhaltepunkt** —
  gerechnet wird mit der *Relativ*geschwindigkeit, weil das Geschoss die Bahn
  des eigenen Schiffs erbt.
- **Radar:** Der rechte Konsolenscreen im Cockpit zeigt die echten Kontakte in
  der Draufsicht (Nase oben, Strich nach oben/unten fuer den Hoehenunterschied,
  erfasstes Ziel hervorgehoben) — kein gemaltes Standbild, sondern ein
  Canvas, das 15-mal je Sekunde neu gezeichnet wird.
- **Rumpfkollision:** Getestet wird als *Sweep* ueber den Schrittweg statt als
  Ueberlappung an der neuen Position — bei 500 m/s legt das Schiff je
  Physikschritt gut vier Meter zurueck und wuerde kleine Brocken sonst
  ueberspringen. Ein Treffer schiebt das Schiff auf die Beruehrungsstelle
  zurueck, wirft die Geschwindigkeit zurueck, kostet Huelle und laesst die
  Kamera wackeln; kleine Brocken zerbrechen dabei. Die Huelle repariert sich
  langsam selbst, solange es keine Station zum Andocken gibt.
- **Bordkanonen:** Zwei Muendungen an den Flanken feuern abwechselnd. Die
  Geschosse leben in Weltkoordinaten (nicht am Schiff), damit sie stehen
  bleiben, wenn das Schiff wegdreht, und wandern beim Floating-Origin-Sprung
  mit. Treffer laufen als Kugeltest gegen die Instanzen des Asteroidenfeldes;
  grosse Brocken brauchen mehrere Treffer, zerstoerte wachsen nach 25 s an
  anderer Stelle nach. Die Brocken driften dabei mit wenigen m/s und kehren an
  der Feldgrenze um.
- **Innenraumoberflaechen:** Das GLB bringt keine einzige Textur mit. Blech-,
  Verschleiss- und Gitterrostkacheln entstehen zur Laufzeit als Hoehenfeld,
  aus dem Normal-, Rauheits- und Schmutzkanal abgeleitet werden; die UVs kommen
  aus einer Boxprojektion in Modellkoordinaten, damit benachbarte Teile
  nahtlos zueinander passen (1 UV-Einheit = 2 m).
- **Innenlicht:** Die Punktlampen laufen mit einem Abfallexponenten von 1,25
  statt physikalischen 2 — in einem 2,3 m hohen Raum brennt eine korrekte
  1/r²-Lampe alles in ihrer Naehe weiss. Die Grundhelligkeit kommt aus dem
  PMREM-Environment, die Lampen setzen nur Akzente.
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
  world/                       Starfield, Sonne, Planet, Asteroiden (mit Treffern)
  ship/Ship.ts                 Schiffs-Rig, Marker, COL_-Meshes
  ship/InteriorLoader.ts       GLB laden, Achsen/Material/Licht/Sicht korrigieren
  ship/InteriorEnvironment.ts  Dunkles PMREM-Environment fuer die Metalle
  ship/PlaceholderInterior.ts  Prozeduraler Ersatz-Innenraum
  ship/FlightModel.ts          Arcade- und Newton-Flugmodell
  ship/InteriorScreens.ts      Canvas-Texturen fuer die Cockpit-Displays
  ship/InteriorSurfaces.ts     Prozedurale Blech-/Gitterkacheln (Normal, Rauheit)
  combat/Weapons.ts            Bordkanonen, Geschosse, Trefferaufloesung
  combat/Targeting.ts          Zielerfassung und Vorhalterechnung
  combat/HullCollision.ts      Rumpfkollision (Sweep), Huellenschaden
  combat/Effects.ts            Einschlaege und Explosionen (Sprite-Pool)
  ship/RadarScreen.ts          Lebendes Radar auf dem Konsolendisplay
  ship/LightShafts.ts          Lichtkegel unter den Deckenleuchten
  player/CameraShake.ts        Kamerawackler nach Stoessen
  render/Postprocessing.ts     Drei Tiefenbereiche, GTAO, Bloom
  player/SeatedController.ts   Flugsteuerung
  player/PlayerState.ts        State-Machine SEATED <-> WALKING
  player/WalkController.ts     First-Person-Controller im Schiffslokalraum
  player/ShipCollider.ts       Boxen aus den COL_-Meshes, Kugel-gegen-Box
  hud/                         DOM-Overlay
```

## Tests

```bash
npm test          # einmal durchlaufen
npm run test:watch
```

Getestet wird die Logik, nicht das Bild: Flugmodell (Drehraten, Full Stop,
Moduswechsel, Drift), Asteroidenfeld (Drift, Segmenttreffer, Zerstoerung,
Nachwuchs), Waffen (Feuerrate, Treffer, Origin-Sprung), Rumpfkollision
(Durchschlaege, Rueckprall, Schaden), Vorhalterechnung und die Radarabbildung.
Module, die ein Canvas oder WebGL brauchen, bleiben bewusst aussen vor; die
Waffen haengen deshalb nur an der Schnittstelle `ImpactSink`, nicht am
Effekt-Pool. `npm run build` laeuft die Tests mit.

## Weiterlesen

- [`PLAN.md`](PLAN.md) — Kernentscheidungen, Koordinaten- und
  Szenengraph-Konventionen, Arbeitspakete.
- [`ASSET-NOTES.md`](ASSET-NOTES.md) — Aufbau des Innenraum-GLB, Marker,
  Materialien, Liste der `COL_`-Meshes.

> Hinweis zum GLB: Der Blender-Export liefert die Nase entlang **+Z**, das
> Projekt erwartet **-Z**. `InteriorLoader` dreht den Innenraum-Root deshalb um
> 180° um Y und die Marker `Seat_Pilot`/`Stand_Pilot` gleich mit.
