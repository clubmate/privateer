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
