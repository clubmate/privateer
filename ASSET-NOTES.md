# ship-interior.glb — Integrationsnotizen

GLB: `public/models/ship-interior.glb` (1,1 MB, 38 400 Dreiecke, 16 Materialien,
keine Bildtexturen). Root-Empty: `ShipInterior` (einziger Scene-Root).

**Das Modell wird nicht von Hand gepflegt, sondern erzeugt:**
[`tools/build_interior.py`](tools/build_interior.py) baut es vollstaendig
parametrisch auf und exportiert es. Ausfuehren aus Blender heraus:

```python
exec(open('/Users/code/Documents/privateer/tools/build_interior.py').read())
```

Eine `.blend`-Quelle gibt es bewusst nicht: das Modell wird staendig in seinen
Massen umgestellt, und ein Skript ist dabei lesbar, versionierbar und
reproduzierbar — eine Binaerdatei waere keins davon.

## Stilrichtung

„Used Future" (Nostromo/Serenity): abgenutzter Frachter, beige lackiertes Blech
ueber sichtbarer Struktur, warme und ungleichmaessige Beleuchtung (zwei
Deckenleuchten sind absichtlich defekt), Bernstein-Monitore, Riffelblech.

## Aufbau

Grundriss, glTF-Koordinaten (Nase **+Z**, oben +Y, Boden y=0):

| Sektion    | z             | halbe Breite | Decke  |
| ---------- | ------------- | ------------ | ------ |
| Frachtraum | −5,20 … −1,20 | 1,60         | 2,30   |
| Gang       | −1,20 … +1,40 | 0,70         | 2,10   |
| Cockpit    | +1,40 … +5,05 | 1,55         | 2,30   |

Die Kanzel beginnt bei z = 2,95 und laeuft als gelofteter Glaskoerper ueber
fuenf Stationen zur Nase aus.

**Querschnitt:** Bodenwanne mit eingelegtem Riffelblech und erhabenen
Randleisten, Sockelschraege, Blechhaut, Hohlkehle zur Decke. Die beiden
Schraegen sind der halbe Grund fuer den Aufwand — eine Roehre aus lauter rechten
Winkeln liest sich immer als Kiste, egal wie fein sie beleuchtet ist.

**Struktur:** Spanten als I-Profil (Steg senkrecht zur Wand, davor ein Flansch),
umlaufend ueber Wand und Decke. Ein aufgeklebter Streifen wuerde nur wie Farbe
aussehen; erst das Profil sieht gebaut aus.

**Nischen:** Koje (backbord) und Spindbank (steuerbord) sitzen in echten
Ruecksprüngen der Bordwand, nicht als Moebel davor. Die Wand wird dafuer in
Segmente zerlegt, die die Nische aussparen.

## Fuer die Integration wichtig

- **Achsen:** Der Blender-Export liefert die Nase entlang **+Z**, das Projekt
  erwartet **−Z**. `InteriorLoader` dreht den Root deshalb um 180° um Y und die
  Marker `Seat_Pilot`/`Stand_Pilot` gleich mit.
- **`Seat_Pilot`**: `(0, 1.38, 3.05)` — Augenpunkt im Sitzen.
- **`Stand_Pilot`**: `(0, 0, 2.05)` — **Fusspunkt**, Augenhoehe 1,7 m kommt dazu.
- **Sichtbare Meshes** tragen `SM_`, **Kollisionsboxen** `COL_` (26 Stueck) mit
  dem Material `Collision`; der Loader schaltet sie unsichtbar.
- **Alle Meshes haben Identitaets-Transform**, ihre Vertices liegen also direkt
  in Innenraumkoordinaten. Darauf bauen im Spiel die Boxprojektion der UVs und
  die Ebenen-Trennung auf — neue Teile im Generator brauchen deshalb
  eingebackene Transforms.
- **Kanten sind gefast** (0,6–8 mm, an das kleinste Mass des Teils gekoppelt),
  weich schattiert ab 35°. Fase und Schattierung laufen ueber `bmesh`, nicht
  ueber Modifier: `modifier_apply` haengt am UI-Kontext und scheitert im Skript.
- **Der Export braucht einen Kontext-Override** (`window`, `active_object`) —
  der glTF-Exporter greift sonst auf `bpy.context.active_object` zu, das es im
  Skriptkontext nicht gibt.

## Materialien (16)

| Name | Verwendung |
| --- | --- |
| `Paint_Beige` | Bordwand Frachtraum |
| `Paint_Olive` | Gangwand, Spindtueren, Konsolenblende |
| `Paint_Worn` | Decken, Cockpitwand, Pult |
| `Metal_Bare` | Spanten, Rahmen, Handlauf, Werkzeug |
| `Metal_Dark` | Bodenwanne, Gehaeuse, Blenden |
| `Metal_Rust` | Rostakzente, Leitungen |
| `Floor_Tread` | Riffelblech |
| `Rubber_Black` | Griffe, Kanten, Zurrgurte |
| `Fabric_Seat` | Sitzpolster, Matratze |
| `Hazard` | Schwellen, Warnmarkierungen |
| `Glass` | Kanzel (Alpha 0,18) |
| `Screen_Amber` / `Screen_Green` | Monitore (emissiv) |
| `Lamp_Warm` / `Lamp_Red` | Leuchtflaechen, Notbeleuchtung (emissiv) |
| `Collision` | nur `COL_`-Meshes |

Der Loader korrigiert Farbe, Metallic und Rauheit zur Laufzeit noch einmal
(`MATERIAL_LOOK` in `InteriorLoader.ts`) und legt prozedurale Blech-,
Verschleiss- und Gitterkacheln darueber.

## Displays

| Mesh | Inhalt |
| --- | --- |
| `SM_Screen_MFD0` | Balkenanzeige (Systemzustaende) |
| `SM_Screen_MFD1` | **Radar** — quadratisch angelegt, damit der Kreis rund bleibt |
| `SM_Screen_MFD2` | Textausgabe (Navigation) |
| `SM_Screen_Overhead` | Anstellwinkel-Leiter |
| `SM_Screen_Corridor` | Textausgabe im Gang |
| `SM_Screen_Bench` | Balkenanzeige an der Werkbank |

---

# ship-exterior.glb — Integrationsnotizen

GLB: `public/models/ship-exterior.glb` (2,2 MB, 85 022 Dreiecke, 238 Objekte, 14 Materialien,
keine Bildtexturen). Root-Empty: `ShipExterior`.

Wie der Innenraum wird das Modell **nicht von Hand gepflegt, sondern erzeugt**:
[`tools/build_exterior.py`](tools/build_exterior.py) baut es parametrisch auf.
Im Hintergrund ausfuehren:

```sh
blender --background --python tools/build_exterior.py
```

Das Skript schreibt nach `/Users/code/Documents/privateer/public/models/`;
ueber die Umgebungsvariable `PRIVATEER_EXTERIOR_OUT` laesst sich das Ziel
umbiegen (Worktrees).

## Stilrichtung

Dieselbe wie innen — „Used Future" (Nostromo/Serenity): ein kleiner, abgenutzter
Frachter, kein Jaeger. Was die Form traegt:

- **gegliederte Silhouette** statt eines Quaders: dicker Frachtrumpf hinten,
  eingezogene Taille ueber dem Gang, breiter Cockpitkopf vorn. Von oben eine
  Wespentaille, von der Seite ein Treppenverlauf.
- **kein rechter Winkel ohne Fase.** Jeder Querschnitt ist ein Achteck.
- zwei **Triebwerksgondeln auf Auslegern** und zwei schraege **Kuehlerfluegel**
  achtern — die Fluegel sind das einzige Bauteil ausserhalb des Achsenrasters
  und tragen deshalb die Silhouette.
- **Massstab**: eine mannshohe Einstiegsluke an der Steuerbordflanke. Ohne so
  ein Element liest niemand ab, ob das Schiff 4 oder 40 Meter lang ist.
- **Asymmetrie**: Sensorpod backbord, Suchscheinwerfer steuerbord, Ausbuchtung
  ueber der Koje nur steuerbord, Rostspuren einseitig.

## Aufbau

Laengsgliederung, glTF-Koordinaten (Nase **+Z**, oben +Y, Innenraumboden y=0).
Die Fugen liegen auf den Schotten des Innenraums (z = −1,20 und z = +1,40): der
Spantring aussen faellt mit dem Schott innen zusammen.

| Sektion       | z             | halbe Breite | oben  | unten |
| ------------- | ------------- | ------------ | ----- | ----- |
| Heck          | −7,60 … −6,80 | 1,74         | 2,62  | −0,74 |
| Frachtrumpf   | −6,80 … −1,20 | 2,22         | 2,88  | −0,88 |
| Taille        | −1,20 … +1,40 | 1,32         | 2,46  | −0,70 |
| Cockpitkasten | +1,40 … +2,92 | 1,98         | 2,66  | −0,72 |
| Bugwanne      | +2,88 … +5,20 | 1,98 … 0,96  | Deck 1,06 | −0,72 … −0,34 |
| Nasenkeil     | +5,20 … +5,80 | 0,96 … 0,30  | 1,26 … 0,62 | |

Gesamt rund 13,4 m lang (mit Duesenglocken 13,9 m), 8,4 m breit ueber die
Gondeln, 5,4 m hoch ueber die Kufen.

**Jede Rumpfsektion ist ein Rohr mit Wandstaerke** (`tube()`), kein
Vollkoerper: der Hohlraum nimmt den Innenraum auf, und an den Fugen sieht man
die Blechstaerke. Breitensprünge zwischen den Sektionen schliessen Ringplatten
(`step_plate()`) — ohne sie sieht man an jeder Fuge in den hohlen Rumpf.

**Der Bug ist bewusst kein Rohr**, sondern eine offene Wanne: flacher Boden,
links und rechts ein Decksholm bis y = 1,06, dazwischen die Verglasung. Nur so
bleibt Platz fuer die Innenkanzel.

## Passung zum Innenraum

Das ist die harte Nebenbedingung des ganzen Modells:

- **Die Kanzel sitzt an derselben Stelle.** Die Aussenhaube benutzt dieselbe
  Bogenformel wie innen (`canopy_section`), nur eine Nummer groesser, und
  umschliesst die Innenkanzel (z 2,95 … 5,05) an jeder Station mit Luft dazwischen.
- **Der Rumpf ist so breit, wie der Innenraum es erzwingt.** Die Spindbank
  reicht innen bis x = 2,11 — daher halbe Breite 2,22. Die Koje reicht bis
  x = 2,28, weiter als die Haut; darueber sitzt deshalb eine **Ausbuchtung**
  (`SM_Blister`), was ohnehin plausibler aussieht als ein durchgehend fetter
  Kasten.
- Geprueft wird das nicht per Augenmass: ein Skript laedt beide GLBs in eine
  Szene und meldet jedes sichtbare Innenteil, das aus der Aussenhaut ragt.
  Zuletzt: null Durchstoesse.
- **Die Kanonenrohre liegen auf den Waffenports** aus `combat/Weapons.ts`
  (dort `[±1.28, −0.15, −4.3]` in Three-Koordinaten, x und z gespiegelt).

## Fuer die Integration wichtig

- **Achsen:** Der Export liefert die Nase entlang **+Z**, das Projekt erwartet
  **−Z**. `Exterior.ts` dreht den Root um 180° um Y.
- **Backbord/Steuerbord:** Durch diese Drehung wird Modell-**+X** in Three zu
  **−X**, also **Backbord**. Das rote Positionslicht sitzt deshalb im Generator
  auf +X, das gruene auf −X (`PORT` / `STAR` im Skript). Der Kommentar in
  `build_interior.py`, X zeige nach steuerbord, stimmt nicht.
- **Marker** (Empties; die **Skalierung transportiert eine Groesse**):
  `Thruster_0..3` — Duesenmuendungen, Skalierung = Radius der Glut;
  `Nav_Port`, `Nav_Star`, `Beacon_Top`, `Beacon_Belly`, `Beacon_Tail`.
- **Alle Meshes haben Identitaets-Transform**, ihre Vertices liegen direkt in
  Modellkoordinaten — darauf baut die Boxprojektion der UVs auf.
- **Zusammengefasste Meshes:** Plattenfelder, Nietenreihen und die
  Registriernummer entstehen ueber `Builder.boxes()` als **ein** Mesh. Der
  Innenraum legt fuer jeden Kasten ein eigenes Objekt an; aussen waeren das
  hunderte Zeichenaufrufe. Weil `finish_geometry()` die Fasenbreite sonst aus
  der Huellbox des ganzen Feldes ableiten wuerde, tragen diese Objekte ihre
  Fasenbreite in `Builder.bevel` selbst ein.
- **Der Export braucht kein Fenster:** im Hintergrundmodus fehlt
  `window_manager.windows[0]`; `export()` setzt dann nur ein aktives Objekt.

## Materialien (14)

| Name | Verwendung |
| --- | --- |
| `Hull_Paint` | Hauptbeplankung, lackiertes Blech |
| `Hull_Panel` | abgesetzte Bleche, Gondeln, Kuehlerfluegel |
| `Hull_Olive` | Taille, Ausleger, Klappen, Farbband |
| `Metal_Bare` | Spantringe, Streben, Rippen, Beschlaege |
| `Metal_Dark` | Duesenglocken, Fugenplatten, Gitter |
| `Metal_Rust` | Rostspuren, Leitungen |
| `Rubber_Black` | Rammleiste, Fenderpads |
| `Hazard` | Warnanstrich an Duesen, Luke und Rampe |
| `Marking` | Registriernummer „PV-114" |
| `Glass` | Kanzel, Bullaugen |
| `Nozzle_Glow` | Glutscheiben in den Duesen (emissiv, **von der Laufzeit geregelt**) |
| `Lamp_Red` / `Lamp_Green` / `Lamp_White` | Positionslichter (emissiv) |

`Exterior.ts` korrigiert Farbe, Metallic und Rauheit zur Laufzeit noch einmal
(`MATERIAL_LOOK`) und legt dieselben prozeduralen Blech- und Verschleisskacheln
darueber wie der Innenraum (`InteriorSurfaces`), nur mit staerkeren Normalen —
der Rumpf wird aus Metern gesehen, nicht aus Zentimetern.

## Laufzeit

- **Sichtbarkeit:** Der Rumpf liegt auf **Layer 0** (wie der Innenraum), damit
  beide korrekt gegeneinander sortieren, und ist **standardmaessig unsichtbar**.
  Nur die Verfolgerkamera schaltet ihn ein — im Cockpit saesse der Pilot sonst
  in einem geschlossenen Blechkasten.
- **Duesenglut:** Die Glutscheiben aus dem GLB wuerden sonst auch bei stehendem
  Triebwerk mit voller Staerke leuchten; ihre Emission regelt die Laufzeit ueber
  den Schub. Dazu kommt je Duese ein Flammenkegel aus zwei ineinanderliegenden
  Schalen (rotoranger Mantel, weissglueender Kern) mit Vertexfarben — mit
  Nachbrenner deutlich laenger und blaeulicher.
- **Positionslichter:** rot backbord, gruen steuerbord (stetig, leicht pulsend),
  drei weisse Blitzer mit Doppelblitz und eigener Phase. Jede Lampe bekommt eine
  eigene Materialkopie, sonst blinken alle im Gleichtakt.
- **Reflexionen:** eigene Umgebung fuer draussen (schwarzer Raum, harte Sonne,
  schwacher Aufheller). Die Innenraumaufnahme waere hier falsch, ganz ohne
  Umgebung zerfaellt der Rumpf in eine helle und eine tote Haelfte.
