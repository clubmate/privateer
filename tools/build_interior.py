"""
Generator fuer `public/models/ship-interior.glb` — den begehbaren Innenraum.

Ausfuehren aus Blender heraus:

    exec(open('/Users/code/Documents/privateer/tools/build_interior.py').read())

Warum ein Skript und keine .blend-Datei: das Modell ist durchweg parametrisch
und wird beim Iterieren staendig umgestellt. Als Skript ist es lesbar,
versionierbar und reproduzierbar — eine Binaerdatei waere keins davon.

**Stilrichtung "Used Future"** (Nostromo/Serenity): abgenutzter Frachter,
beige lackiertes Blech ueber sichtbarer Struktur, warme und ungleichmaessige
Beleuchtung, Bernstein-Monitore, Riffelblech, Rost an den Kanten.

**Koordinaten:** Das Skript rechnet durchgehend in *glTF-Innenraumkoordinaten*
wie die Projektdokumentation: X nach steuerbord, **Y nach oben**, **Z zur
Nase**, Boden bei y=0. `to_blender()` setzt das auf Blenders Z-up um.

**Konventionen fuer die Laufzeit** (siehe ASSET-NOTES.md):
  * Root-Empty `ShipInterior`, alles haengt darunter
  * sichtbare Meshes `SM_*`, Kollisionsboxen `COL_*`
  * Marker `Seat_Pilot` (Augenpunkt sitzend) und `Stand_Pilot` (Fusspunkt)
"""

import bpy
import bmesh
from math import radians, cos, sin, pi

OUTPUT = "/Users/code/Documents/privateer/public/models/ship-interior.glb"

# --------------------------------------------------------------------- Masse
# Grundriss. Die Aussenmasse bleiben wie gehabt, damit Kollision, Marker und
# Spielgefuehl erhalten bleiben; die Formen dazwischen sind neu.

BAY_BACK, BAY_FRONT = -5.20, -1.20      # Frachtraum
BAY_HALF, BAY_CEIL = 1.60, 2.30

COR_BACK, COR_FRONT = -1.20, 1.40       # Gang
COR_HALF, COR_CEIL = 0.70, 2.10

CK_BACK, CK_FRONT = 1.40, 5.05          # Cockpit
CK_HALF, CK_CEIL = 1.55, 2.30
CANOPY_START = 2.95                     # ab hier Verglasung statt Wand

DOOR_HALF, DOOR_HEIGHT = 0.70, 2.00     # Durchgaenge

# Aufbau der Wand: Blech, davor Spanten, darunter Sockelschraege.
WALL_SKIN = 0.06        # Dicke der Blechhaut
COVE = 0.26             # Schraege Wand -> Decke
KICK = 0.14             # Schraege Wand -> Boden
FRAME_DEPTH = 0.09      # wie weit ein Spant in den Raum ragt
FRAME_WIDTH = 0.14      # Breite des Flansches
FLOOR_RECESS = 0.04     # Riffelblech liegt in einer Wanne

# ---------------------------------------------------------------- Materialien
# Werte sind Startpunkte; der Loader korrigiert sie zur Laufzeit noch einmal
# (siehe MATERIAL_LOOK in InteriorLoader.ts).

MATERIALS = {
    # name:            (basisfarbe,            metallisch, rauheit, emissiv)
    'Paint_Beige':     ((0.52, 0.47, 0.38, 1), 0.05, 0.62, None),
    'Paint_Olive':     ((0.31, 0.33, 0.24, 1), 0.05, 0.68, None),
    'Paint_Worn':      ((0.44, 0.40, 0.33, 1), 0.08, 0.78, None),
    'Metal_Bare':      ((0.42, 0.42, 0.44, 1), 0.90, 0.42, None),
    'Metal_Dark':      ((0.16, 0.16, 0.17, 1), 0.85, 0.55, None),
    'Metal_Rust':      ((0.34, 0.17, 0.09, 1), 0.15, 0.88, None),
    'Floor_Tread':     ((0.26, 0.25, 0.23, 1), 0.75, 0.60, None),
    'Rubber_Black':    ((0.05, 0.05, 0.05, 1), 0.00, 0.92, None),
    'Fabric_Seat':     ((0.18, 0.16, 0.13, 1), 0.00, 0.95, None),
    'Hazard':          ((0.55, 0.42, 0.06, 1), 0.00, 0.65, None),
    'Glass':           ((0.30, 0.38, 0.42, 1), 0.00, 0.05, None),
    'Screen_Amber':    ((0.03, 0.02, 0.00, 1), 0.00, 0.30, (1.00, 0.60, 0.16)),
    'Screen_Green':    ((0.00, 0.02, 0.01, 1), 0.00, 0.30, (0.30, 1.00, 0.45)),
    'Lamp_Warm':       ((0.55, 0.52, 0.46, 1), 0.00, 0.40, (1.00, 0.82, 0.58)),
    'Lamp_Red':        ((0.20, 0.02, 0.02, 1), 0.00, 0.40, (1.00, 0.12, 0.10)),
    'Collision':       ((0.90, 0.00, 0.45, 1), 0.00, 1.00, None),
}


def build_materials():
    """Materialien anlegen (Principled BSDF, ohne Texturen — die kommen zur Laufzeit)."""
    made = {}
    for name, (color, metallic, roughness, emissive) in MATERIALS.items():
        material = bpy.data.materials.new(name=name)
        material.use_nodes = True
        bsdf = material.node_tree.nodes['Principled BSDF']
        bsdf.inputs['Base Color'].default_value = color
        bsdf.inputs['Metallic'].default_value = metallic
        bsdf.inputs['Roughness'].default_value = roughness
        if emissive:
            bsdf.inputs['Emission Color'].default_value = (*emissive, 1.0)
            bsdf.inputs['Emission Strength'].default_value = 1.6
        if name == 'Glass':
            material.blend_method = 'BLEND'
            bsdf.inputs['Alpha'].default_value = 0.18
        made[name] = material
    return made


# ------------------------------------------------------------------- Helfer

def to_blender(point):
    """glTF-Innenraumkoordinaten (x, y=oben, z=Nase) -> Blender (x, y, z=oben)."""
    x, y, z = point
    return (x, -z, y)


class Builder:
    """Sammelt die erzeugten Objekte und haengt sie an den Root."""

    def __init__(self, materials):
        self.materials = materials
        self.root = None
        self.objects = []

    def setup(self):
        bpy.ops.object.select_all(action='DESELECT')
        empty = bpy.data.objects.new('ShipInterior', None)
        bpy.context.scene.collection.objects.link(empty)
        self.root = empty
        return empty

    def register(self, obj, name, material):
        obj.name = name
        obj.data.materials.clear()
        obj.data.materials.append(self.materials[material])
        obj.parent = self.root
        self.objects.append(obj)
        return obj

    # -- Grundkoerper ------------------------------------------------------

    def box(self, name, material, center, size):
        """Quader; `center` und `size` in glTF-Koordinaten."""
        mesh = bpy.data.meshes.new(name)
        bm = bmesh.new()
        bmesh.ops.create_cube(bm, size=1.0)
        bmesh.ops.scale(bm, vec=(size[0], size[2], size[1]), verts=bm.verts)
        bmesh.ops.translate(bm, vec=to_blender(center), verts=bm.verts)
        bm.to_mesh(mesh)
        bm.free()
        obj = bpy.data.objects.new(name, mesh)
        bpy.context.scene.collection.objects.link(obj)
        return self.register(obj, name, material)

    def wedge(self, name, material, center, size, axis, flip=False):
        """
        Schraege Leiste mit Dreiecksprofil — fuer Hohlkehlen, Sockel und
        abfallende Pulte.

        `axis` ist die **Laengsachse**, entlang der das Profil gezogen wird.
        `size` ist immer `(Profilbreite, Profilhoehe, Laenge)`, wobei die
        Profilbreite bei `axis='z'` in x liegt und bei `axis='x'` in z. Diese
        Vertauschung ist die haeufigste Fehlerquelle beim Aufruf.
        """
        mesh = bpy.data.meshes.new(name)
        bm = bmesh.new()
        w, h, d = size  # Breite (quer), Hoehe, Laenge
        sy = -1.0 if flip else 1.0
        profile = [(0.0, 0.0), (w, 0.0), (0.0, h * sy)]
        verts_a, verts_b = [], []
        for px, py in profile:
            if axis == 'z':
                a = (px, py, -d / 2)
                b = (px, py, d / 2)
            else:
                a = (-d / 2, py, px)
                b = (d / 2, py, px)
            verts_a.append(bm.verts.new(to_blender((a[0] + center[0], a[1] + center[1], a[2] + center[2]))))
            verts_b.append(bm.verts.new(to_blender((b[0] + center[0], b[1] + center[1], b[2] + center[2]))))
        bm.faces.new(verts_a)
        bm.faces.new(reversed(verts_b))
        for i in range(3):
            j = (i + 1) % 3
            bm.faces.new((verts_a[i], verts_a[j], verts_b[j], verts_b[i]))
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        bm.to_mesh(mesh)
        bm.free()
        obj = bpy.data.objects.new(name, mesh)
        bpy.context.scene.collection.objects.link(obj)
        return self.register(obj, name, material)

    def cylinder(self, name, material, center, radius, length, axis='z', segments=12):
        mesh = bpy.data.meshes.new(name)
        bm = bmesh.new()
        bmesh.ops.create_cone(
            bm, cap_ends=True, cap_tris=False, segments=segments,
            radius1=radius, radius2=radius, depth=length,
        )
        # create_cone liegt entlang Blender-Z; auf die gewuenschte Achse drehen.
        if axis == 'z':      # glTF-Z == Blender -Y
            bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0),
                             matrix=_rot_x(radians(90)))
        elif axis == 'x':
            bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0),
                             matrix=_rot_y(radians(90)))
        bmesh.ops.translate(bm, vec=to_blender(center), verts=bm.verts)
        bm.to_mesh(mesh)
        bm.free()
        obj = bpy.data.objects.new(name, mesh)
        bpy.context.scene.collection.objects.link(obj)
        return self.register(obj, name, material)

    def collider(self, name, center, size):
        return self.box(name, 'Collision', center, size)

    def marker(self, name, position):
        empty = bpy.data.objects.new(name, None)
        bpy.context.scene.collection.objects.link(empty)
        empty.location = to_blender(position)
        empty.parent = self.root
        return empty


def _rot_x(angle):
    from mathutils import Matrix
    return Matrix.Rotation(angle, 4, 'X')


def _rot_y(angle):
    from mathutils import Matrix
    return Matrix.Rotation(angle, 4, 'Y')


# ------------------------------------------------------------------- Schale

def room_shell(b, prefix, back, front, half, ceil, wall_mat, floor_border=True):
    """
    Eine Sektion als Roehre aufbauen: Bodenwanne mit eingelegtem Riffelblech,
    Wandbleche, Sockelschraege, Hohlkehle zur Decke, Decke.

    Die Schraegen sind der halbe Grund fuer den Aufwand: eine Roehre aus lauter
    rechten Winkeln liest sich immer als Kiste, egal wie fein sie beleuchtet
    ist. Erst Sockel und Kehle geben dem Querschnitt eine Silhouette.
    """
    length = front - back
    mid = (back + front) / 2

    # --- Boden: Wanne, darin Riffelblech, an den Raendern erhabene Leisten.
    b.box(f'SM_{prefix}_FloorPan', 'Metal_Dark',
          (0, -0.07 - FLOOR_RECESS / 2, mid), (half * 2, 0.14, length))
    b.box(f'SM_{prefix}_FloorTread', 'Floor_Tread',
          (0, -FLOOR_RECESS / 2, mid), (half * 2 - 0.30, FLOOR_RECESS, length))
    if floor_border:
        for side, sx in (('L', -1), ('R', 1)):
            b.box(f'SM_{prefix}_FloorRail{side}', 'Metal_Bare',
                  (sx * (half - 0.075), 0.01, mid), (0.15, 0.06, length))

    # --- Waende: Blechhaut zwischen Sockel und Kehle.
    wall_bottom = KICK
    wall_top = ceil - COVE
    for side, sx in (('L', -1), ('R', 1)):
        b.box(f'SM_{prefix}_Wall{side}', wall_mat,
              (sx * (half + WALL_SKIN / 2), (wall_bottom + wall_top) / 2, mid),
              (WALL_SKIN, wall_top - wall_bottom, length))
        # Sockelschraege: unten breiter, faengt Streiflicht vom Boden.
        b.wedge(f'SM_{prefix}_Kick{side}', 'Metal_Dark',
                (sx * half, 0.0, mid), (-sx * KICK, KICK, length), axis='z')
        # Hohlkehle zur Decke.
        b.wedge(f'SM_{prefix}_Cove{side}', wall_mat,
                (sx * half, wall_top, mid), (-sx * COVE, COVE, length), axis='z')

    # --- Decke, zwischen den Kehlen.
    b.box(f'SM_{prefix}_Ceiling', 'Paint_Worn',
          (0, ceil + 0.04, mid), ((half - COVE) * 2, 0.08, length))


def frame_ring(b, name, z, half, ceil, material='Metal_Bare'):
    """
    Spant als I-Profil: Steg senkrecht zur Wand, davor ein Flansch. Genau
    dieses Profil unterscheidet ein gebautes Schiff von einer Box — ein
    aufgeklebter Streifen wuerde nur wie Farbe aussehen.
    """
    top = ceil - COVE
    parts = []
    for side, sx in (('L', -1), ('R', 1)):
        inner = sx * (half - FRAME_DEPTH)
        # Steg
        parts.append(b.box(f'{name}_Web{side}', material,
                           (sx * (half - FRAME_DEPTH / 2), (KICK + top) / 2, z),
                           (FRAME_DEPTH, top - KICK, 0.05)))
        # Flansch, zum Raum hin
        parts.append(b.box(f'{name}_Flange{side}', material,
                           (inner, (KICK + top) / 2, z),
                           (0.035, top - KICK, FRAME_WIDTH)))
    # Deckenlauf
    span = (half - COVE) * 2
    parts.append(b.box(f'{name}_WebTop', material,
                       (0, ceil - FRAME_DEPTH / 2, z), (span, FRAME_DEPTH, 0.05)))
    parts.append(b.box(f'{name}_FlangeTop', material,
                       (0, ceil - FRAME_DEPTH, z), (span, 0.035, FRAME_WIDTH)))
    return parts


def bulkhead(b, name, z, half, ceil, door_half=DOOR_HALF, door_height=DOOR_HEIGHT,
             wall_mat='Paint_Olive'):
    """Schott mit Durchgang: Seitenwangen, Sturz, gestufter Rahmen, Schwelle."""
    thickness = 0.16
    side_width = half - door_half
    for side, sx in (('L', -1), ('R', 1)):
        b.box(f'{name}_Side{side}', wall_mat,
              (sx * (door_half + side_width / 2), ceil / 2, z),
              (side_width, ceil, thickness))
    b.box(f'{name}_Header', wall_mat,
          (0, (door_height + ceil) / 2, z),
          (door_half * 2, ceil - door_height, thickness))

    # Gestufter Rahmen um die Oeffnung: aussen breit, innen schmal.
    for side, sx in (('L', -1), ('R', 1)):
        b.box(f'{name}_Jamb{side}', 'Metal_Bare',
              (sx * (door_half + 0.05), door_height / 2, z),
              (0.10, door_height, thickness + 0.06))
    b.box(f'{name}_Lintel', 'Metal_Bare',
          (0, door_height + 0.05, z), (door_half * 2 + 0.20, 0.10, thickness + 0.06))
    # Schwelle mit Warnanstrich — der Tritt, den man beim Durchgehen sieht.
    b.box(f'{name}_Threshold', 'Hazard',
          (0, 0.015, z), (door_half * 2, 0.03, thickness + 0.04))


def loft(b, name, material, sections, inside, close=False):
    """
    Querschnitte zu einer Flaeche verbinden. `sections` ist eine Liste von
    Punktlisten gleicher Laenge (glTF-Koordinaten), die von hinten nach vorn
    aufgereiht werden. Damit entstehen die gewoelbten Teile — Kanzel, Nase —,
    die sich aus Quadern nicht bauen lassen.

    `inside` ist ein Punkt im Rauminneren. Offene Flaechen haben keine
    schluessige Innen-/Aussenseite, `recalc_face_normals` kann also nicht
    raten; ohne diesen Bezugspunkt zeigt die halbe Kanzel nach aussen und ist
    von innen unsichtbar, weil die Materialien front-side gecullt werden.
    """
    from mathutils import Vector

    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    rings = [[bm.verts.new(to_blender(p)) for p in section] for section in sections]
    for a, c in zip(rings, rings[1:]):
        count = len(a)
        last = count if close else count - 1
        for i in range(last):
            j = (i + 1) % count
            bm.faces.new((a[i], a[j], c[j], c[i]))

    bm.normal_update()
    reference = Vector(to_blender(inside))
    for face in bm.faces:
        if face.normal.dot(reference - face.calc_center_median()) < 0:
            face.normal_flip()

    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    return b.register(obj, name, material)


def canopy_section(z, half, top, sill):
    """
    Ein Kanzel-Querschnitt: von der linken Bruestung ueber das Dach zur
    rechten. Der Bogen ist bewusst kantig (sieben Punkte) — facettiertes Glas
    passt zum gebauten Charakter besser als eine glatte Kuppel.
    """
    points = []
    for i in range(7):
        t = i / 6.0
        angle = pi * t                      # 0 = links, pi = rechts
        x = -cos(angle) * half
        y = sill + (top - sill) * sin(angle) ** 0.75
        points.append((x, y, z))
    return points


def build_cockpit(b):
    """Cockpit: Wanne, Seitenwaende, Kanzel, Konsole, Sitz."""
    # Boden und Seitenwaende bis zum Kanzelansatz.
    room_shell(b, 'Ck', CK_BACK, CANOPY_START, CK_HALF, CK_CEIL, 'Paint_Worn')
    # Boden weiter nach vorn unter die Kanzel.
    b.box('SM_Ck_FloorFore', 'Floor_Tread',
          (0, -0.02, (CANOPY_START + 4.20) / 2), (2.4, 0.04, 4.20 - CANOPY_START))

    frame_ring(b, 'SM_Ck_Frame0', CK_BACK + 0.55, CK_HALF, CK_CEIL)
    frame_ring(b, 'SM_Ck_Frame1', CANOPY_START - 0.25, CK_HALF, CK_CEIL)

    # --- Kanzel: gelofteter Glaskoerper mit Bruestung darunter.
    stations = [
        (CANOPY_START, CK_HALF, CK_CEIL, 0.95),
        (3.55, 1.48, 2.16, 0.92),
        (4.15, 1.30, 1.88, 0.88),
        (4.65, 1.00, 1.48, 0.84),
        (5.05, 0.42, 1.02, 0.80),
    ]
    glass_sections = [canopy_section(z, half, top, sill) for z, half, top, sill in stations]
    inside = (0, 1.0, 3.9)
    loft(b, 'SM_Canopy_Glass', 'Glass', glass_sections, inside)

    # Bruestung: geschlossenes Blech unter der Glaskante, bis auf den Boden.
    left = [[(-half, sill, z), (-half, 0.0, z)] for z, half, _, sill in stations]
    right = [[(half, 0.0, z), (half, sill, z)] for z, half, _, sill in stations]
    loft(b, 'SM_Canopy_SkirtL', 'Paint_Worn', left, inside)
    loft(b, 'SM_Canopy_SkirtR', 'Paint_Worn', right, inside)
    # Nasenabschluss unter der Scheibe.
    b.box('SM_Canopy_NoseCap', 'Metal_Bare', (0, 0.4, 5.03), (0.9, 0.8, 0.06))

    # Bruestungsleiste: die einzige Strebe auf Augenhoehe — bewusst nur eine,
    # und zwar unterhalb der Sichtlinie.
    for side, sx in (('L', -1), ('R', 1)):
        rail = [[(sx * half, sill, z), (sx * (half - 0.10), sill - 0.06, z)]
                for z, half, _, sill in stations]
        loft(b, f'SM_Canopy_Rail{side}', 'Metal_Bare', rail, inside)

    # Aufliegender Spant am Kanzelansatz — rahmt die Scheibe hinten ein.
    arch = canopy_section(CANOPY_START, CK_HALF, CK_CEIL, 0.95)
    arch_inner = canopy_section(CANOPY_START, CK_HALF - 0.08, CK_CEIL - 0.08, 0.95)
    loft(b, 'SM_Canopy_Arch', 'Metal_Bare',
         [[(p[0], p[1], p[2] - 0.06) for p in arch],
          [(p[0], p[1], p[2] - 0.06) for p in arch_inner],
          [(p[0], p[1], p[2] + 0.06) for p in arch_inner],
          [(p[0], p[1], p[2] + 0.06) for p in arch]],
         (0, 1.4, CANOPY_START))

    build_console(b)
    build_seat(b, (0, 0, 3.02))


def build_console(b):
    """
    Armaturenbrett: Pult mit versenkten Bernstein-Monitoren, Blendschutz
    darueber, und ein abfallendes Nasenblech, das bis an die Scheibe reicht.

    Das Nasenblech ist wichtiger, als es klingt: ohne es sieht der Pilot ueber
    das Pult hinweg auf nackten Boden, und der Blick nach vorn endet in einer
    leeren Flaeche statt an der Scheibe.

    Die Oberkante bleibt unter 1,15 m — der Augenpunkt liegt bei 1,33 m, und
    die Sicht nach vorn hat Vorrang vor jedem Instrument.
    """
    # Grundblock unter dem Pult.
    b.box('SM_Console_Body', 'Paint_Worn', (0, 0.48, 4.10), (2.05, 0.96, 0.66))
    b.box('SM_Console_Face', 'Paint_Olive', (0, 0.90, 3.78), (2.00, 0.26, 0.05))

    # Schraege Instrumententafel mit versenkten Monitoren. Der mittlere ist
    # bewusst quadratisch: dort laeuft im Spiel das Radar, und ein Kreis auf
    # einem Breitbandpanel waere eine Ellipse.
    b.wedge('SM_Console_Slant', 'Paint_Worn', (0.0, 0.96, 3.80), (0.58, 0.14, 2.02), axis='x')
    for i, (x, w, d) in enumerate([(-0.62, 0.46, 0.26), (0.0, 0.34, 0.31), (0.62, 0.46, 0.26)]):
        b.box(f'SM_Console_Bezel{i}', 'Metal_Dark', (x, 1.04, 4.00), (w + 0.07, 0.05, d + 0.06))
        material = 'Screen_Green' if i == 1 else 'Screen_Amber'
        b.box(f'SM_Screen_MFD{i}', material, (x, 1.068, 4.00), (w, 0.012, d))

    # Blendschutz: nur eine erhabene Kante an der Pilotenseite. Eine
    # durchgehende Haube darueber sieht zwar nach Cockpit aus, verdeckt vom
    # Augenpunkt aus aber genau die Monitore, die sie beschatten soll.
    b.box('SM_Console_HoodLip', 'Rubber_Black', (0, 1.06, 3.76), (2.02, 0.05, 0.06))

    # Nasenblech: faellt vom Pult zur Scheibe hin ab.
    b.wedge('SM_Console_NoseDeck', 'Paint_Worn', (0.0, 0.80, 4.98), (-0.90, 0.26, 1.80), axis='x')
    b.box('SM_Console_NoseEdge', 'Metal_Bare', (0, 1.06, 4.24), (1.80, 0.05, 0.10))

    # Schalterreihen unter der Tafel.
    for i in range(10):
        x = -0.90 + i * 0.20
        b.box(f'SM_Console_Switch{i:02d}', 'Metal_Bare', (x, 0.86, 3.76), (0.05, 0.05, 0.03))
    for i in range(6):
        x = -0.55 + i * 0.22
        b.box(f'SM_Console_Lamp{i:02d}', 'Lamp_Red' if i % 3 == 0 else 'Lamp_Warm',
              (x, 0.80, 3.76), (0.06, 0.03, 0.02))

    # Schubquadrant links, Steuergriff rechts — beide unterhalb der Sichtlinie.
    b.box('SM_Throttle_Base', 'Metal_Dark', (-0.78, 0.92, 3.35), (0.30, 0.10, 0.34))
    b.box('SM_Throttle_Lever', 'Metal_Bare', (-0.76, 1.03, 3.42), (0.05, 0.22, 0.05))
    b.box('SM_Throttle_Grip', 'Rubber_Black', (-0.76, 1.14, 3.44), (0.09, 0.08, 0.12))

    b.cylinder('SM_Stick_Base', 'Metal_Dark', (0.74, 0.90, 3.40), 0.11, 0.08, axis='y')
    b.cylinder('SM_Stick_Shaft', 'Metal_Bare', (0.74, 1.02, 3.40), 0.028, 0.24, axis='y')
    b.box('SM_Stick_Grip', 'Rubber_Black', (0.74, 1.18, 3.40), (0.10, 0.14, 0.11))

    for side, sx in (('L', -1), ('R', 1)):
        b.box(f'SM_Pedal_{side}', 'Metal_Bare', (sx * 0.20, 0.14, 3.72), (0.20, 0.05, 0.24))
        b.box(f'SM_PedalArm_{side}', 'Metal_Dark', (sx * 0.20, 0.07, 3.58), (0.06, 0.05, 0.30))

    # Overhead-Panel ueber dem Sitz.
    b.box('SM_Overhead_Panel', 'Paint_Olive', (0, 2.10, 2.55), (1.10, 0.10, 0.70))
    b.box('SM_Screen_Overhead', 'Screen_Amber', (0, 2.04, 2.40), (0.55, 0.012, 0.22))
    for i in range(8):
        x = -0.42 + (i % 4) * 0.28
        z = 2.62 + (i // 4) * 0.16
        b.box(f'SM_Overhead_Switch{i}', 'Metal_Bare', (x, 2.03, z), (0.06, 0.04, 0.05))


def build_seat(b, base):
    """Pilotensitz: Schale mit Wangen, Kopfstuetze, Gurtzeug, Saeule."""
    x0, _, z0 = base

    b.box('SM_Seat_Pedestal', 'Metal_Dark', (x0, 0.16, z0 + 0.10), (0.26, 0.32, 0.42))
    b.box('SM_Seat_Rail', 'Metal_Bare', (x0, 0.03, z0 + 0.10), (0.50, 0.06, 0.80))

    b.box('SM_Seat_Pan', 'Fabric_Seat', (x0, 0.40, z0 + 0.06), (0.56, 0.14, 0.56))
    b.box('SM_Seat_Back', 'Fabric_Seat', (x0, 0.86, z0 - 0.26), (0.54, 0.80, 0.16))
    b.box('SM_Seat_Shell', 'Paint_Olive', (x0, 0.84, z0 - 0.35), (0.62, 0.92, 0.08))
    for side, sx in (('L', -1), ('R', 1)):
        b.box(f'SM_Seat_Bolster{side}', 'Fabric_Seat',
              (x0 + sx * 0.28, 0.78, z0 - 0.18), (0.09, 0.52, 0.30))
        b.box(f'SM_Seat_Arm{side}', 'Rubber_Black',
              (x0 + sx * 0.36, 0.62, z0 + 0.16), (0.09, 0.07, 0.42))
        b.box(f'SM_Seat_ArmPost{side}', 'Metal_Bare',
              (x0 + sx * 0.36, 0.52, z0 + 0.02), (0.05, 0.16, 0.07))
        # Gurt ueber die Schulter.
        b.box(f'SM_Seat_Belt{side}', 'Hazard',
              (x0 + sx * 0.16, 0.72, z0 - 0.12), (0.07, 0.60, 0.03))

    b.box('SM_Seat_Headrest', 'Fabric_Seat', (x0, 1.34, z0 - 0.28), (0.30, 0.22, 0.12))
    b.box('SM_Seat_Buckle', 'Metal_Bare', (x0, 0.47, z0 + 0.02), (0.12, 0.05, 0.09))


def wall_run(b, name, sx, half, z0, z1, y0, y1, material):
    """Ein Stueck Wandblech zwischen zwei z-Werten."""
    b.box(name, material, (sx * (half + WALL_SKIN / 2), (y0 + y1) / 2, (z0 + z1) / 2),
          (WALL_SKIN, y1 - y0, z1 - z0))


def alcove(b, name, sx, half, z0, z1, y0, y1, depth, material='Paint_Worn'):
    """
    Nische in der Bordwand: Rueckwand weiter aussen, dazu Boden, Decke und
    Wangen. Erst so bekommt eine Wand Tiefe — aufgesetzte Moebel bleiben
    immer erkennbar aufgesetzt.
    """
    outer = half + depth
    b.box(f'{name}_Back', material,
          (sx * (outer + WALL_SKIN / 2), (y0 + y1) / 2, (z0 + z1) / 2),
          (WALL_SKIN, y1 - y0, z1 - z0))
    b.box(f'{name}_Top', material,
          (sx * (half + depth / 2), y1, (z0 + z1) / 2), (depth, 0.05, z1 - z0))
    b.box(f'{name}_Bottom', material,
          (sx * (half + depth / 2), y0, (z0 + z1) / 2), (depth, 0.05, z1 - z0))
    for tag, z in (('A', z0), ('B', z1)):
        b.box(f'{name}_Jamb{tag}', 'Metal_Bare',
              (sx * (half + depth / 2), (y0 + y1) / 2, z), (depth, y1 - y0, 0.05))


def build_corridor(b):
    """Gang: enge Roehre mit Versorgungskanal in der Decke und Handlauf."""
    room_shell(b, 'Cr', COR_BACK, COR_FRONT, COR_HALF, COR_CEIL, 'Paint_Olive')
    for i, z in enumerate((-0.75, 0.05, 0.85)):
        frame_ring(b, f'SM_Cr_Frame{i}', z, COR_HALF, COR_CEIL)

    # Versorgungskanal: offener Kasten unter der Decke mit Rohren und Kabeln.
    length = COR_FRONT - COR_BACK
    mid = (COR_BACK + COR_FRONT) / 2
    b.box('SM_Cr_DuctBack', 'Metal_Dark', (0, COR_CEIL - 0.03, mid), (0.62, 0.06, length))
    for side, sx in (('L', -1), ('R', 1)):
        b.box(f'SM_Cr_DuctSide{side}', 'Metal_Dark',
              (sx * 0.31, COR_CEIL - 0.12, mid), (0.05, 0.18, length))
    for i, (dx, r, material) in enumerate([
        (-0.20, 0.035, 'Metal_Bare'), (-0.09, 0.028, 'Metal_Rust'),
        (0.04, 0.022, 'Rubber_Black'), (0.13, 0.030, 'Rubber_Black'),
        (0.23, 0.026, 'Metal_Bare'),
    ]):
        b.cylinder(f'SM_Cr_Duct{i}', material, (dx, COR_CEIL - 0.11, mid), r, length)
    for i, z in enumerate((-0.9, -0.1, 0.7)):
        b.box(f'SM_Cr_DuctClamp{i}', 'Metal_Bare', (0, COR_CEIL - 0.11, z), (0.56, 0.14, 0.04))

    # Handlauf auf beiden Seiten.
    for side, sx in (('L', -1), ('R', 1)):
        b.cylinder(f'SM_Cr_Rail{side}', 'Metal_Bare',
                   (sx * (COR_HALF - 0.09), 0.98, mid), 0.022, length - 0.2)
        for i, z in enumerate((-0.9, 0.0, 0.9)):
            b.box(f'SM_Cr_RailMount{side}{i}', 'Metal_Bare',
                  (sx * (COR_HALF - 0.045), 0.98, z), (0.09, 0.04, 0.04))

    # Wandmonitor an Backbord, in einem vertieften Rahmen.
    b.box('SM_Cr_ScreenBezel', 'Metal_Dark', (-COR_HALF + 0.03, 1.35, 0.35), (0.06, 0.42, 0.56))
    b.box('SM_Screen_Corridor', 'Screen_Amber', (-COR_HALF + 0.065, 1.35, 0.35), (0.012, 0.32, 0.44))
    b.box('SM_Cr_ScreenShelf', 'Metal_Bare', (-COR_HALF + 0.09, 1.10, 0.35), (0.12, 0.04, 0.50))

    # Sicherungskasten an Steuerbord.
    b.box('SM_Cr_Box', 'Paint_Beige', (COR_HALF - 0.09, 1.42, -0.55), (0.18, 0.46, 0.34))
    b.box('SM_Cr_BoxLatch', 'Metal_Bare', (COR_HALF - 0.19, 1.42, -0.55), (0.03, 0.10, 0.06))
    b.box('SM_Cr_BoxLamp', 'Lamp_Red', (COR_HALF - 0.19, 1.60, -0.55), (0.02, 0.04, 0.06))


# Nischen in der Bordwand des Frachtraums: (Seite, z0, z1, y0, y1, Tiefe)
BUNK = (-1, -3.85, -2.35, 0.35, 1.55, 0.62)
LOCKERS = (1, -2.85, -1.70, 0.05, 1.95, 0.45)


def build_bay(b):
    """Wohn-/Frachtraum: Koje und Spinde in Nischen, Werkbank, verzurrte Kisten."""
    length = BAY_FRONT - BAY_BACK
    mid = (BAY_BACK + BAY_FRONT) / 2

    # Boden und Decke wie im Rest, Waende aber segmentweise um die Nischen herum.
    b.box('SM_Bay_FloorPan', 'Metal_Dark', (0, -0.07 - FLOOR_RECESS / 2, mid),
          (BAY_HALF * 2, 0.14, length))
    b.box('SM_Bay_FloorTread', 'Floor_Tread', (0, -FLOOR_RECESS / 2, mid),
          (BAY_HALF * 2 - 0.30, FLOOR_RECESS, length))
    for side, sx in (('L', -1), ('R', 1)):
        b.box(f'SM_Bay_FloorRail{side}', 'Metal_Bare',
              (sx * (BAY_HALF - 0.075), 0.01, mid), (0.15, 0.06, length))
        b.wedge(f'SM_Bay_Kick{side}', 'Metal_Dark', (sx * BAY_HALF, 0.0, mid),
                (-sx * KICK, KICK, length), axis='z')
        b.wedge(f'SM_Bay_Cove{side}', 'Paint_Beige', (sx * BAY_HALF, BAY_CEIL - COVE, mid),
                (-sx * COVE, COVE, length), axis='z')
    b.box('SM_Bay_Ceiling', 'Paint_Worn', (0, BAY_CEIL + 0.04, mid),
          ((BAY_HALF - COVE) * 2, 0.08, length))
    b.box('SM_Bay_WallRear', 'Paint_Beige', (0, BAY_CEIL / 2, BAY_BACK - WALL_SKIN / 2),
          (BAY_HALF * 2, BAY_CEIL, WALL_SKIN))

    # Wandsegmente, die Nischen aussparen.
    wall_top = BAY_CEIL - COVE
    for side, sx in (('L', -1), ('R', 1)):
        niche = BUNK if sx < 0 else LOCKERS
        _, nz0, nz1, ny0, ny1, _ = niche
        segments = [(BAY_BACK, nz0), (nz1, BAY_FRONT)]
        for i, (z0, z1) in enumerate(segments):
            wall_run(b, f'SM_Bay_Wall{side}{i}', sx, BAY_HALF, z0, z1, KICK, wall_top,
                     'Paint_Beige')
        # Blech ueber und unter der Nische.
        if ny1 < wall_top:
            wall_run(b, f'SM_Bay_Wall{side}Top', sx, BAY_HALF, nz0, nz1, ny1, wall_top,
                     'Paint_Beige')
        if ny0 > KICK:
            wall_run(b, f'SM_Bay_Wall{side}Bot', sx, BAY_HALF, nz0, nz1, KICK, ny0,
                     'Paint_Beige')

    for i, z in enumerate((-4.60, -3.60, -2.60, -1.60)):
        frame_ring(b, f'SM_Bay_Frame{i}', z, BAY_HALF, BAY_CEIL)

    # --- Koje in der Backbordnische.
    sx, z0, z1, y0, y1, depth = BUNK
    alcove(b, 'SM_Bunk_Niche', sx, BAY_HALF, z0, z1, y0, y1, depth)
    zc = (z0 + z1) / 2
    b.box('SM_Bunk_Frame', 'Metal_Bare', (sx * (BAY_HALF + depth / 2), y0 + 0.12, zc),
          (depth, 0.10, z1 - z0 - 0.06))
    b.box('SM_Bunk_Mattress', 'Fabric_Seat', (sx * (BAY_HALF + depth / 2), y0 + 0.24, zc),
          (depth - 0.06, 0.16, z1 - z0 - 0.12))
    b.box('SM_Bunk_Pillow', 'Fabric_Seat', (sx * (BAY_HALF + depth / 2), y0 + 0.36, z1 - 0.30),
          (depth - 0.14, 0.10, 0.34))
    b.box('SM_Bunk_Shelf', 'Metal_Bare', (sx * (BAY_HALF + depth / 2), y1 - 0.30, zc),
          (depth - 0.10, 0.04, z1 - z0 - 0.30))
    b.cylinder('SM_Bunk_CurtainRail', 'Metal_Bare', (sx * BAY_HALF, y1 - 0.05, zc), 0.015,
               z1 - z0)
    b.box('SM_Light_Bunk', 'Lamp_Warm', (sx * (BAY_HALF + 0.12), y1 - 0.16, z0 + 0.30),
          (0.10, 0.06, 0.20))

    # --- Spindbank in der Steuerbordnische.
    sx, z0, z1, y0, y1, depth = LOCKERS
    alcove(b, 'SM_Locker_Niche', sx, BAY_HALF, z0, z1, y0, y1, depth, 'Paint_Olive')
    for i in range(3):
        z = z0 + 0.19 + i * 0.39
        b.box(f'SM_Locker_Door{i}', 'Paint_Olive',
              (sx * (BAY_HALF + 0.06), (y0 + y1) / 2, z), (0.06, y1 - y0 - 0.10, 0.34))
        b.box(f'SM_Locker_Handle{i}', 'Metal_Bare',
              (sx * (BAY_HALF + 0.02), 1.05, z), (0.05, 0.22, 0.04))
        b.box(f'SM_Locker_Vent{i}', 'Metal_Dark',
              (sx * (BAY_HALF + 0.02), y1 - 0.22, z), (0.03, 0.10, 0.22))
        b.box(f'SM_Locker_Label{i}', 'Hazard',
              (sx * (BAY_HALF + 0.02), y1 - 0.42, z), (0.02, 0.07, 0.16))

    # --- Werkbank an der Backbordwand, vor der Koje.
    b.box('SM_Bench_Top', 'Metal_Bare', (-1.18, 0.92, -1.85), (0.72, 0.06, 1.10))
    b.box('SM_Bench_Body', 'Paint_Olive', (-1.22, 0.45, -1.85), (0.60, 0.88, 1.00))
    for i in range(3):
        b.box(f'SM_Bench_Drawer{i}', 'Paint_Worn', (-0.94, 0.30 + i * 0.24, -1.85),
              (0.04, 0.20, 0.90))
        b.box(f'SM_Bench_Pull{i}', 'Metal_Bare', (-0.90, 0.30 + i * 0.24, -1.85),
              (0.03, 0.05, 0.30))
    b.box('SM_Bench_Vise', 'Metal_Dark', (-1.30, 1.02, -1.45), (0.18, 0.16, 0.16))
    b.box('SM_Bench_ToolRack', 'Metal_Dark', (-1.48, 1.45, -1.85), (0.06, 0.36, 0.90))
    for i in range(5):
        b.cylinder(f'SM_Bench_Tool{i}', 'Metal_Bare',
                   (-1.42, 1.42, -2.20 + i * 0.18), 0.018, 0.26, axis='y')
    b.box('SM_Screen_Bench', 'Screen_Green', (-1.44, 1.62, -1.62), (0.012, 0.22, 0.30))

    # --- Fracht: gestapelte Kisten mit Zurrgurten.
    crates = [
        (0.95, 0.00, -4.60, 0.80, 0.72, 0.90),
        (0.95, 0.72, -4.60, 0.72, 0.56, 0.80),
        (1.05, 0.00, -3.55, 0.66, 0.60, 0.72),
        (-0.95, 0.00, -4.70, 0.74, 0.66, 0.84),
        (-0.20, 0.00, -4.85, 0.60, 0.52, 0.62),
    ]
    for i, (x, y, z, w, h, d) in enumerate(crates):
        b.box(f'SM_Crate{i}', 'Paint_Beige' if i % 2 else 'Paint_Olive',
              (x, y + h / 2, z), (w, h, d))
        b.box(f'SM_Crate{i}_Lid', 'Metal_Dark', (x, y + h - 0.02, z), (w + 0.03, 0.05, d + 0.03))
        for k, sxx in enumerate((-1, 1)):
            b.box(f'SM_Crate{i}_Corner{k}', 'Metal_Bare',
                  (x + sxx * (w / 2 - 0.03), y + h / 2, z - d / 2 + 0.03),
                  (0.06, h - 0.06, 0.06))
        b.box(f'SM_Crate{i}_Strap', 'Rubber_Black', (x, y + h * 0.55, z), (w + 0.02, 0.06, 0.05))
        b.box(f'SM_Crate{i}_Mark', 'Hazard', (x, y + h * 0.35, z - d / 2 - 0.005), (0.26, 0.12, 0.01))


# ------------------------------------------------------------------ Leuchten
# Gehaeuse aus dunklem Blech, darin eine warme Leuchtflaeche. Zwei Leuchten
# sind absichtlich tot — nichts sagt "gebrauchtes Schiff" so knapp wie eine
# Lampe, die es nicht mehr tut.

CEILING_LAMPS = [
    # (x, z, Laenge, Sektion, defekt)
    (0.0, -4.30, 0.90, 'Bay', False),
    (0.0, -3.20, 0.90, 'Bay', True),
    (0.0, -2.10, 0.90, 'Bay', False),
    (0.0, 0.10, 0.70, 'Cr', False),
    (0.0, -0.90, 0.70, 'Cr', True),
    (0.0, 2.05, 0.80, 'Ck', False),
]

SECTION_CEIL = {'Bay': BAY_CEIL, 'Cr': COR_CEIL, 'Ck': CK_CEIL}


def build_lights(b):
    for i, (x, z, length, section, dead) in enumerate(CEILING_LAMPS):
        ceil = SECTION_CEIL[section]
        b.box(f'SM_Lamp{i}_Housing', 'Metal_Dark', (x, ceil - 0.07, z), (0.34, 0.14, length + 0.10))
        b.box(f'SM_Lamp{i}_Bezel', 'Metal_Bare', (x, ceil - 0.13, z), (0.30, 0.04, length + 0.06))
        b.box(f'SM_Lamp{i}_Diffuser', 'Metal_Dark' if dead else 'Lamp_Warm',
              (x, ceil - 0.145, z), (0.24, 0.02, length))
        # Schutzbuegel quer ueber die Leuchte.
        for k in range(3):
            zz = z - length / 2 + (k + 0.5) * (length / 3)
            b.cylinder(f'SM_Lamp{i}_Cage{k}', 'Metal_Bare', (x, ceil - 0.16, zz), 0.008, 0.28,
                       axis='x')

    # Bodennahe Notbeleuchtung im Gang und an den Schwellen.
    for i, z in enumerate((-1.0, 0.0, 1.0)):
        for side, sx in (('L', -1), ('R', 1)):
            b.box(f'SM_Light_Floor{side}{i}', 'Lamp_Red',
                  (sx * (COR_HALF - 0.02), 0.10, z), (0.02, 0.05, 0.30))


# --------------------------------------------------------------- Kollision
# Grobe Boxen fuer die Laufkollision. Bewusst einfacher als die Optik: der
# Spieler soll an Waenden entlanggleiten, nicht an Zierleisten haengenbleiben.

def build_colliders(b):
    for prefix, back, front, half, ceil in (
        ('Bay', BAY_BACK, BAY_FRONT, BAY_HALF, BAY_CEIL),
        ('Cr', COR_BACK, COR_FRONT, COR_HALF, COR_CEIL),
        ('Ck', CK_BACK, CK_FRONT, CK_HALF, CK_CEIL),
    ):
        length = front - back
        mid = (back + front) / 2
        b.collider(f'COL_Floor_{prefix}', (0, -0.06, mid), (half * 2 + 0.2, 0.12, length))
        b.collider(f'COL_Ceil_{prefix}', (0, ceil + 0.06, mid), (half * 2 + 0.2, 0.12, length))
        for side, sx in (('L', -1), ('R', 1)):
            b.collider(f'COL_Wall_{prefix}_{side}', (sx * (half + 0.06), ceil / 2, mid),
                       (0.12, ceil, length))

    # Schotte: Wangen neben den Durchgaengen.
    for name, z, half, ceil in (('Bay', BAY_FRONT, BAY_HALF, BAY_CEIL),
                                ('Ck', CK_BACK, CK_HALF, CK_CEIL)):
        side_width = half - DOOR_HALF
        for side, sx in (('L', -1), ('R', 1)):
            b.collider(f'COL_Bulk_{name}_{side}',
                       (sx * (DOOR_HALF + side_width / 2), ceil / 2, z),
                       (side_width, ceil, 0.2))
        b.collider(f'COL_Bulk_{name}_Head', (0, (DOOR_HEIGHT + ceil) / 2, z),
                   (DOOR_HALF * 2, ceil - DOOR_HEIGHT, 0.2))

    # Nase und Kanzel begrenzen das Cockpit nach vorn.
    b.collider('COL_Nose', (0, 1.0, CK_FRONT + 0.1), (2.0, 2.0, 0.2))

    # Einrichtung.
    b.collider('COL_Console', (0, 0.6, 3.85), (2.1, 1.2, 0.8))
    b.collider('COL_Seat', (0, 0.8, 2.95), (0.8, 1.6, 0.9))
    b.collider('COL_Bench', (-1.25, 0.5, -1.85), (0.7, 1.0, 1.1))
    b.collider('COL_Crates_Aft', (0.95, 0.7, -4.60), (0.9, 1.4, 1.0))
    b.collider('COL_Crates_Port', (-0.95, 0.35, -4.70), (0.8, 0.7, 0.9))
    b.collider('COL_Crates_Mid', (1.05, 0.3, -3.55), (0.7, 0.6, 0.8))
    b.collider('COL_Crate_Loose', (-0.20, 0.26, -4.85), (0.7, 0.6, 0.7))


# ------------------------------------------------------------------- Aufbau

def finish_geometry():
    """
    Verschmelzen, fasen, weich schattieren — alles ueber bmesh statt ueber
    Operatoren: `modifier_apply` haengt am UI-Kontext und scheitert im Skript,
    und der Umweg ueber den Depsgraph waere nur langsamer.
    """
    for obj in list(bpy.data.objects):
        if obj.type != 'MESH' or not obj.name.startswith('SM_'):
            continue

        dims = tuple(obj.dimensions)
        width = min(0.008, max(min(dims) * 0.14, 0.0006)) if min(dims) > 1e-4 else 0.0

        bm = bmesh.new()
        bm.from_mesh(obj.data)
        bmesh.ops.remove_doubles(bm, verts=list(bm.verts), dist=1e-5)

        if width > 0:
            edges = [e for e in bm.edges
                     if len(e.link_faces) == 2 and e.calc_face_angle(0.0) > radians(30)]
            if edges:
                bmesh.ops.bevel(
                    bm, geom=edges, offset=width, offset_type='OFFSET',
                    segments=2, profile=0.5, affect='EDGES', clamp_overlap=True,
                )

        # Weich schattieren, harte Kanten ueber den Winkel zurueckholen — so
        # bekommen nur die Fasen ihre Glanzlinie, Flaechen bleiben flach.
        for face in bm.faces:
            face.smooth = True
        for edge in bm.edges:
            if len(edge.link_faces) == 2:
                edge.smooth = edge.calc_face_angle(0.0) <= radians(35)

        bm.to_mesh(obj.data)
        bm.free()
        obj.data.update()


def build():
    bpy.ops.wm.read_homefile(use_empty=True)
    materials = build_materials()
    b = Builder(materials)
    b.setup()

    build_bay(b)
    build_corridor(b)
    build_cockpit(b)

    bulkhead(b, 'SM_Bulk_Bay', BAY_FRONT, BAY_HALF, BAY_CEIL)
    bulkhead(b, 'SM_Bulk_Ck', CK_BACK, CK_HALF, CK_CEIL)

    build_lights(b)
    build_colliders(b)

    b.marker('Seat_Pilot', (0, 1.38, 3.05))
    b.marker('Stand_Pilot', (0, 0, 2.05))

    finish_geometry()

    # Der glTF-Exporter greift auf `bpy.context.active_object` zu. Aus einem
    # Skript heraus ist der Kontext eingeschraenkt und kennt das Attribut gar
    # nicht — deshalb ein expliziter Override.
    meshes = [o for o in bpy.data.objects if o.type == 'MESH']
    bpy.context.view_layer.objects.active = meshes[0]
    meshes[0].select_set(True)
    window = bpy.context.window_manager.windows[0]
    with bpy.context.temp_override(window=window, screen=window.screen,
                                   active_object=meshes[0], object=meshes[0],
                                   selected_objects=[meshes[0]]):
        bpy.ops.export_scene.gltf(
            filepath=OUTPUT, export_format='GLB', use_selection=False, export_apply=True,
            export_cameras=False, export_lights=False, export_extras=False, export_yup=True,
        )

    tris = 0
    for obj in bpy.data.objects:
        if obj.type == 'MESH':
            obj.data.calc_loop_triangles()
            tris += len(obj.data.loop_triangles)
    return {'objects': len(bpy.data.objects), 'triangles': tris}


RESULT = build()
print('BUILD', RESULT)
