# ship-interior.glb — Integrationsnotizen

GLB: `public/models/ship-interior.glb` (355 KB, 4 157 Dreiecke, 14 Materialien, keine Bildtexturen).
Gesamtmaße: 10,51 m lang × 3,56 m breit × 2,90 m hoch. Root-Empty: `ShipInterior` (einziger Scene-Root).

Aufbau: Cockpit (Sitz, Konsole, Throttle/Stick, Pedale, Overhead-Panel, 5-teilige
Glaskanzel mit Streben) → Gang (1,40 m breit, 2,10 m hoch) → Wohn-/Frachtraum
(3,20 × 4,00 m, 2,30 m hoch; Koje, Spind, Werkbank, 6 Kisten). Türen 1,40 × 2,00 m.

## Für die Integration wichtig

- **Achsen-Korrektur (AP4):** Der Blender-Export liefert die Nase entlang **+Z**
  (Cockpit bei z ≈ +1,4 … +5,05, Frachtraum bei z ≈ −5,2 … −1,2), nicht entlang
  −Z wie in PLAN.md gefordert. `src/ship/InteriorLoader.ts` dreht den Root
  deshalb um 180° um Y und die Marker `Seat_Pilot`/`Stand_Pilot` gleich mit
  (sonst zeigt deren lokales −Z nach achtern). Alle z-Angaben unten sind
  **GLB-Koordinaten vor dieser Drehung**.
- **Glasmaterial heißt exakt `Glass`** — bereits `alphaMode: BLEND`, Alpha 0,18,
  doubleSided, roughness 0,05. In Three.js zusätzlich `depthWrite = false` setzen.
- **Sichtbare Meshes:** Präfix `SM_`. **Kollisionsmeshes:** Präfix `COL_` (41 Stück),
  tragen alle das Material `Collision` (magenta) — zur Laufzeit unsichtbar schalten.
- **`Seat_Pilot`**: Translation `(0, 1.22, 3.20)`, Rotation Identität; y=1,22 m
  ist der Augenpunkt im Sitzen. Zur Nase zeigt im GLB **+Z** (siehe
  Achsen-Korrektur oben), nach der Root-Drehung ist es wie üblich −Z.
- **`Stand_Pilot`**: Translation `(0, 0, 2.05)`, Rotation Identität.
  **Fußposition auf dem Boden (y=0)** — Augenhöhe 1,7 m selbst addieren.
  Abstand stehender Augenpunkt → Seat_Pilot = 1,25 m (innerhalb des 1,5-m-Prompts).
- **Emissive Materialien** (für evtl. Bloom-Selektion): `Screen_Emissive` (cyan),
  `Screen_Emissive_Amber`, `Light_Strip` (warmweiß, Decke), `Light_Strip_Red`
  (Bodenmarkierung). Nutzen `KHR_materials_emissive_strength` 1,3–2,5.
- **Begehbarkeit verifiziert** (Flood-Fill, Kapsel r=0,3 m): keine Löcher nach
  außen; Cockpit↔Gang↔Frachtraum durchgehend passierbar. Engstelle: zwischen den
  achtern Kisten bei y≈4,6 nur ~0,92 m Lücke, nicht mittig auf x=0.

## COL_-Meshes (41)

COL_Floor · COL_Nose · COL_Canopy_L0…L3 · COL_Canopy_R0…R3 ·
COL_Canopy_Roof0…Roof3 · COL_Wall_Ck_L/R · COL_Ceil_Ck · COL_Bulk_Ck_L/R/Head ·
COL_Wall_Cr_L/R · COL_Ceil_Cr · COL_Bulk_Bay_L/R/Head · COL_Wall_Bay_L/R ·
COL_Wall_Bay_Rear · COL_Ceil_Bay · COL_Console · COL_Throttle · COL_Stick ·
COL_Seat · COL_Bunk · COL_Locker · COL_Bench · COL_Crates_Port/Mid/Stbd ·
COL_Crate_Loose
