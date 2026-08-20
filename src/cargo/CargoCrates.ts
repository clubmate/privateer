import {
  BoxGeometry,
  BufferAttribute,
  CanvasTexture,
  Color,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  SRGBColorSpace,
} from 'three';
import type { BufferGeometry, Material, Texture } from 'three';
import { createSurfaceMaps, TILE_METERS, type SurfaceMaps } from '../ship/InteriorSurfaces';
import { CONTAINER_HEIGHT, UNIT_DEPTH, UNIT_WIDTH, type ContainerKind, type Good } from './CargoGoods';

/**
 * Gebinde fuer den Frachtraum, im Stil des Innenraums: lackiertes Blech ueber
 * sichtbarer Struktur, blanke Metallecken, Zurrgurt, Gefahrgut-Markierung.
 *
 * Gebaut wird prozedural und **nicht** im GLB — das Modell entsteht aus
 * `tools/build_interior.py` und weiss nichts von der Ladung. Die fertig
 * gebauten Kisten im GLB bleiben trotzdem stehen; {@link CargoVisuals}
 * blendet sie aus und stellt diese hier an ihre Stelle.
 *
 * Geometrien und Materialien werden je Warenart **einmal** angelegt und von
 * allen Gebinden geteilt. Ein voller Laderaum sind zwei Dutzend Stapel; jedes
 * mit eigenem Material waere unnoetiger Ballast im Renderer.
 */

/** Blanker Stahl — dieselbe Kennung wie `Metal_Bare` im Innenraum. */
const STEEL = { color: 0x8b8f95, metalness: 0.9, roughness: 0.42 };
/** Dunkles Blech fuer Deckel, Paletten und Beschlaege (`Metal_Dark`). */
const DARK = { color: 0x33363a, metalness: 0.85, roughness: 0.55 };
/** Gummi fuer Zurrgurte (`Rubber_Black`). */
const RUBBER = { color: 0x1a1a1a, metalness: 0.0, roughness: 0.94 };

/** Kantenlaenge der blanken Eckwinkel. */
const CORNER = 0.05;
/** Hoehe des Beschriftungsbandes. */
const LABEL_HEIGHT = 0.17;
/** Wie weit Aufkleber und Gurte von der Lackflaeche abstehen. */
const RELIEF = 0.004;

/**
 * Boxprojizierte UVs in **lokalen** Koordinaten des Gebindes. Damit greift
 * dieselbe prozedurale Blechtextur wie an den Waenden, und alle Kisten sehen
 * gleich aus statt jede mit eigenem Zufallsausschnitt.
 */
function boxProjectUv(geometry: BufferGeometry): void {
  const position = geometry.getAttribute('position') as BufferAttribute | undefined;
  const normals = geometry.getAttribute('normal') as BufferAttribute | undefined;
  if (!position || !normals) return;

  const uv = new Float32Array(position.count * 2);
  for (let i = 0; i < position.count; i++) {
    const px = position.getX(i);
    const py = position.getY(i);
    const pz = position.getZ(i);
    const ax = Math.abs(normals.getX(i));
    const ay = Math.abs(normals.getY(i));
    const az = Math.abs(normals.getZ(i));

    let u: number;
    let v: number;
    if (ax >= ay && ax >= az) {
      u = pz;
      v = py;
    } else if (ay >= az) {
      u = px;
      v = pz;
    } else {
      u = px;
      v = py;
    }
    uv[i * 2] = u / TILE_METERS;
    uv[i * 2 + 1] = v / TILE_METERS;
  }
  geometry.setAttribute('uv', new BufferAttribute(uv, 2));
}

/**
 * Beschriftung des Gebindes als Textur.
 *
 * Der Wuerfel bildet jede Seitenflaeche auf die volle Textur ab — ein einziges
 * flaches Band um die Kiste traegt das Kuerzel deshalb auf allen vier Seiten,
 * egal aus welcher Richtung man kommt. Das ist der ganze Grund fuer die
 * Bandform: sechs einzelne Aufkleber waeren sechsmal so viel Geometrie.
 */
function createLabelTexture(good: Good): CanvasTexture {
  const width = 256;
  const height = 64;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('CargoCrates: 2D-Kontext nicht verfuegbar');

  const accent = `#${new Color(good.accent).getHexString()}`;
  ctx.clearRect(0, 0, width, height);

  if (good.hazard) {
    // Gefahrgut: Schraffur ueber die ganze Breite, laeuft um die Kiste herum.
    ctx.fillStyle = accent;
    ctx.fillRect(0, 10, width, height - 20);
    ctx.fillStyle = 'rgba(12,10,9,0.92)';
    for (let x = -height; x < width; x += 34) {
      ctx.beginPath();
      ctx.moveTo(x, height - 10);
      ctx.lineTo(x + 17, height - 10);
      ctx.lineTo(x + 17 + 22, 10);
      ctx.lineTo(x + 22, 10);
      ctx.closePath();
      ctx.fill();
    }
  } else {
    // Aufkleber: dunkle Platte mit Schablonenschrift, mittig auf jeder Seite.
    ctx.fillStyle = 'rgba(16,16,15,0.9)';
    ctx.fillRect(76, 8, 104, height - 16);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(76, 8, 104, height - 16);

    ctx.fillStyle = accent;
    ctx.font = 'bold 30px ui-monospace, Menlo, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(good.code, 128, height / 2 + 1);

    // Zwei Strichmarken links und rechts — Frachtnummer, nicht zu entziffern.
    ctx.fillStyle = 'rgba(190,185,175,0.55)';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(20 + i * 8, 26, 3, 12);
      ctx.fillRect(196 + i * 8, 26, 3, 12);
    }
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Ein Satz Materialien je Warenart. */
interface GoodMaterials {
  paint: MeshStandardMaterial;
  trim: MeshStandardMaterial;
  accent: MeshStandardMaterial;
  label: MeshStandardMaterial;
}

/**
 * Legt Geometrien, Materialien und Prototypen an und gibt fertige Gebinde
 * heraus. Ein Prototyp je Warenart, danach nur noch geklont — das teilt
 * Geometrie und Material automatisch mit.
 */
export class CrateFactory {
  private readonly geometries = new Map<string, BufferGeometry>();
  private readonly goodMaterials = new Map<string, GoodMaterials>();
  private readonly prototypes = new Map<string, Object3D>();
  private readonly shared: {
    steel: MeshStandardMaterial;
    dark: MeshStandardMaterial;
    rubber: MeshStandardMaterial;
  };
  private readonly disposables: Array<{ dispose(): void }> = [];
  /** Prozedurale Blech- und Verschleisskacheln, geteilt mit dem Innenraum. */
  private readonly panel: SurfaceMaps;
  private readonly worn: SurfaceMaps;
  private environment: Texture | null = null;

  constructor() {
    this.panel = createSurfaceMaps('panel');
    this.worn = createSurfaceMaps('worn');
    for (const surface of [this.panel, this.worn]) {
      this.disposables.push(surface.map, surface.roughnessMap, surface.normalMap);
    }

    this.shared = {
      steel: this.metal('Cargo_Steel', STEEL, this.worn),
      dark: this.metal('Cargo_Dark', DARK, this.panel),
      rubber: this.metal('Cargo_Rubber', RUBBER, null),
    };
  }

  /**
   * Reflexionsumgebung setzen.
   *
   * Der Innenraum nimmt seine Umgebungstextur einmal nach dem Laden auf
   * (`captureInteriorEnvironment`). Wer erst danach eine neue Warenart kauft,
   * bekaeme sonst ein Material ohne envMap — und ein Metall ohne Reflexion ist
   * schwarz. Deshalb merkt sich die Factory die Textur und legt sie sowohl auf
   * die vorhandenen als auch auf alle spaeteren Materialien.
   */
  setEnvironment(environment: Texture | null): void {
    if (!environment || environment === this.environment) return;
    this.environment = environment;
    for (const material of this.allMaterials()) {
      material.envMap = environment;
      material.needsUpdate = true;
    }
  }

  /** Fertiges Gebinde einer Warenart; Aufrufer setzt Position und Drehung. */
  create(good: Good): Object3D {
    let prototype = this.prototypes.get(good.id);
    if (!prototype) {
      prototype = this.build(good);
      this.prototypes.set(good.id, prototype);
    }
    return prototype.clone(true);
  }

  /** Alles freigeben — Materialien und Texturen ueberleben den Laderaum nicht. */
  dispose(): void {
    for (const geometry of this.geometries.values()) geometry.dispose();
    for (const materials of this.goodMaterials.values()) {
      for (const material of Object.values(materials)) material.dispose();
    }
    for (const material of Object.values(this.shared)) material.dispose();
    for (const item of this.disposables) item.dispose();
    this.geometries.clear();
    this.goodMaterials.clear();
    this.prototypes.clear();
  }

  // ------------------------------------------------------------- Bausteine

  /** Geteilte Boxgeometrie mit boxprojizierten UVs (Blechtextur). */
  private box(x: number, y: number, z: number): BufferGeometry {
    return this.cachedBox(`b:${x}:${y}:${z}`, x, y, z, true);
  }

  /**
   * Geteilte Boxgeometrie mit den **Standard-UVs** des Wuerfels: jede
   * Seitenflaeche bildet die volle Textur ab. Genau darauf beruht das
   * Beschriftungsband — mit boxprojizierten UVs landet der Aufkleber ausserhalb
   * des Bildes und verschwindet hinter dem alphaTest.
   */
  private plainBox(x: number, y: number, z: number): BufferGeometry {
    return this.cachedBox(`p:${x}:${y}:${z}`, x, y, z, false);
  }

  private cachedBox(
    key: string,
    x: number,
    y: number,
    z: number,
    project: boolean,
  ): BufferGeometry {
    let geometry = this.geometries.get(key);
    if (!geometry) {
      geometry = new BoxGeometry(x, y, z);
      if (project) boxProjectUv(geometry);
      this.geometries.set(key, geometry);
    }
    return geometry;
  }

  /** Geteilte Zylindergeometrie; UVs bleiben die zylindrischen aus Three. */
  private cylinder(radius: number, height: number, segments = 16): BufferGeometry {
    const key = `c:${radius.toFixed(4)}:${height.toFixed(4)}:${segments}`;
    let geometry = this.geometries.get(key);
    if (!geometry) {
      geometry = new CylinderGeometry(radius, radius, height, segments);
      this.geometries.set(key, geometry);
    }
    return geometry;
  }

  private metal(
    name: string,
    look: { color: number; metalness: number; roughness: number },
    surface: SurfaceMaps | null,
  ): MeshStandardMaterial {
    const material = new MeshStandardMaterial({
      name,
      color: look.color,
      metalness: look.metalness,
      roughness: look.roughness,
      envMap: this.environment,
    });
    if (surface) {
      material.map = surface.map;
      material.roughnessMap = surface.roughnessMap;
      material.normalMap = surface.normalMap;
      material.normalScale.set(0.55, 0.55);
    }
    return material;
  }

  private materialsFor(good: Good): GoodMaterials {
    let materials = this.goodMaterials.get(good.id);
    if (materials) return materials;

    // Lackiertes Blech ist ein Dielektrikum — dieselbe Korrektur wie im
    // Innenraum, sonst sind die Kisten dunkle Metallklumpen.
    const paint = this.metal(
      `Cargo_Paint_${good.id}`,
      { color: good.color, metalness: 0.05, roughness: 0.66 },
      this.panel,
    );
    const trim = this.metal(
      `Cargo_Trim_${good.id}`,
      { color: new Color(good.color).multiplyScalar(0.55).getHex(), metalness: 0.35, roughness: 0.58 },
      this.worn,
    );
    const accent = this.metal(
      `Cargo_Accent_${good.id}`,
      { color: good.accent, metalness: 0.0, roughness: 0.55 },
      null,
    );

    const texture = createLabelTexture(good);
    this.disposables.push(texture);
    const label = new MeshStandardMaterial({
      name: `Cargo_Label_${good.id}`,
      map: texture,
      transparent: true,
      // Ohne alphaTest schreibt das Band keine Tiefe und flimmert gegen die
      // Kistenwand, auf der es klebt.
      alphaTest: 0.5,
      metalness: 0.0,
      roughness: 0.72,
      envMap: this.environment,
    });

    materials = { paint, trim, accent, label };
    this.goodMaterials.set(good.id, materials);
    return materials;
  }

  /** Alle bisher angelegten Materialien. */
  private *allMaterials(): Generator<MeshStandardMaterial> {
    yield* Object.values(this.shared);
    for (const materials of this.goodMaterials.values()) yield* Object.values(materials);
  }

  private mesh(geometry: BufferGeometry, material: Material, x = 0, y = 0, z = 0): Mesh {
    const mesh = new Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  /** Vier blanke Eckwinkel, wie an jedem Transportbehaelter. */
  private addCorners(group: Group, w: number, h: number, d: number, inset = 0): void {
    const geometry = this.box(CORNER, h, CORNER);
    const x = w / 2 - CORNER / 2 - inset;
    const z = d / 2 - CORNER / 2 - inset;
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        group.add(this.mesh(geometry, this.shared.steel, sx * x, h / 2, sz * z));
      }
    }
  }

  /** Beschriftungsband rund um die Kiste (siehe {@link createLabelTexture}). */
  private addLabel(group: Group, good: Good, w: number, d: number, y: number): void {
    const materials = this.materialsFor(good);
    const geometry = this.plainBox(w + RELIEF * 2, LABEL_HEIGHT, d + RELIEF * 2);
    group.add(this.mesh(geometry, materials.label, 0, y, 0));
  }

  // -------------------------------------------------------------- Gebinde

  private build(good: Good): Object3D {
    const height = CONTAINER_HEIGHT[good.container];
    const group = new Group();
    group.name = `Cargo_${good.id}`;

    const builders: Record<ContainerKind, () => void> = {
      bin: () => this.buildBin(group, good, height),
      crate: () => this.buildCrate(group, good, height),
      barrels: () => this.buildBarrels(group, good, height),
      case: () => this.buildCase(group, good, height),
    };
    builders[good.container]();
    return group;
  }

  /** Schuettgut-Container: hoch, gerippt, mit Gefahrgutband — fuer Erz. */
  private buildBin(group: Group, good: Good, height: number): void {
    const materials = this.materialsFor(good);
    const w = UNIT_WIDTH;
    const d = UNIT_DEPTH;
    const bodyH = height - 0.11;

    group.add(this.mesh(this.box(w - 0.1, 0.05, d - 0.1), this.shared.dark, 0, 0.025, 0));
    group.add(this.mesh(this.box(w - 0.06, bodyH, d - 0.06), materials.paint, 0, 0.05 + bodyH / 2, 0));

    // Zwei umlaufende Rippen: ohne sie liest sich der Koerper als glatter Klotz.
    for (const t of [0.34, 0.68]) {
      const y = 0.05 + bodyH * t;
      group.add(
        this.mesh(this.box(w - 0.04, 0.035, d - 0.04), materials.trim, 0, y, 0),
      );
    }

    group.add(this.mesh(this.box(w, 0.06, d), this.shared.dark, 0, height - 0.03, 0));
    this.addCorners(group, w, height - 0.06, d);
    this.addLabel(group, good, w - 0.06, d - 0.06, 0.05 + bodyH * 0.88);
  }

  /** Lackierte Transportkiste mit Deckel und Zurrgurt. */
  private buildCrate(group: Group, good: Good, height: number): void {
    const materials = this.materialsFor(good);
    const w = UNIT_WIDTH;
    const d = UNIT_DEPTH;
    const bodyH = height - 0.05;

    group.add(this.mesh(this.box(w - 0.05, bodyH, d - 0.05), materials.paint, 0, bodyH / 2, 0));
    group.add(this.mesh(this.box(w, 0.05, d), materials.trim, 0, height - 0.025, 0));

    // Zurrgurt quer ueber Deckel und Flanken — haelt den Deckel, sagt das Bild.
    const strap = this.box(0.09, bodyH + 0.06, d + RELIEF * 2);
    group.add(this.mesh(strap, this.shared.rubber, 0, (bodyH + 0.06) / 2, 0));

    this.addCorners(group, w, bodyH, d);
    this.addLabel(group, good, w - 0.05, d - 0.05, bodyH * 0.42);
  }

  /** Vier Faesser auf einer Palette — fuer alles Fluessige. */
  private buildBarrels(group: Group, good: Good, height: number): void {
    const materials = this.materialsFor(good);
    const palletH = 0.09;
    const barrelH = height - palletH;
    const radius = 0.145;

    group.add(
      this.mesh(this.box(UNIT_WIDTH, palletH, UNIT_DEPTH), this.shared.dark, 0, palletH / 2, 0),
    );

    const body = this.cylinder(radius, barrelH);
    const ring = this.cylinder(radius + 0.008, 0.035);
    const lid = this.cylinder(radius * 0.72, 0.02);
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const x = sx * 0.16;
        const z = sz * 0.19;
        group.add(this.mesh(body, materials.paint, x, palletH + barrelH / 2, z));
        // Zwei Spannringe in Warenfarbe: das ist die Erkennungsmarke am Fass.
        for (const t of [0.28, 0.72]) {
          group.add(this.mesh(ring, materials.accent, x, palletH + barrelH * t, z));
        }
        group.add(this.mesh(lid, this.shared.steel, x, palletH + barrelH - 0.01, z));
      }
    }

    // Schild an der Palette statt Band um die Faesser — auf runden Flaechen
    // sieht ein umlaufender Aufkleber immer wie eine Fehlprojektion aus.
    this.addLabel(group, good, UNIT_WIDTH - 0.08, UNIT_DEPTH - 0.08, palletH * 0.55);
  }

  /** Flacher Transportkoffer mit Beschlaegen — fuer empfindliche Ware. */
  private buildCase(group: Group, good: Good, height: number): void {
    const materials = this.materialsFor(good);
    const w = UNIT_WIDTH;
    const d = UNIT_DEPTH;
    const bodyH = height - 0.06;

    group.add(this.mesh(this.box(w - 0.04, bodyH, d - 0.04), materials.paint, 0, bodyH / 2, 0));
    group.add(this.mesh(this.box(w, 0.06, d), this.shared.dark, 0, height - 0.03, 0));

    // Umlaufende Kantenschiene: der Koffer soll gepanzert wirken, nicht weich.
    group.add(this.mesh(this.box(w - 0.02, 0.04, d - 0.02), this.shared.steel, 0, bodyH - 0.02, 0));

    // Zwei Verschluesse vorn und hinten.
    const latch = this.box(0.1, 0.05, d + RELIEF * 2);
    for (const sx of [-1, 1]) {
      group.add(this.mesh(latch, materials.accent, sx * 0.17, bodyH - 0.09, 0));
    }

    this.addCorners(group, w, bodyH, d, 0.01);
    this.addLabel(group, good, w - 0.04, d - 0.04, bodyH * 0.42);
  }
}
