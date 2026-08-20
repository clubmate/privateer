"""
Generator fuer `public/models/ship-exterior.glb` — den Schiffsrumpf von aussen.

Ausfuehren aus Blender heraus:

    exec(open('/Users/code/Documents/privateer/tools/build_exterior.py').read())

oder im Hintergrund:

    blender --background --python tools/build_exterior.py

Warum ein Skript und keine .blend-Datei: wie beim Innenraum ist das Modell
durchweg parametrisch und wird beim Iterieren staendig umgestellt. Als Skript
ist es lesbar, versionierbar und reproduzierbar — eine Binaerdatei waere keins
davon.

**Stilrichtung "Used Future"** (Nostromo/Serenity): ein kleiner, abgenutzter
Frachter. Kein Jaeger, keine Symmetrie um jeden Preis. Was die Form traegt:

  * eine **gegliederte Silhouette** statt eines Quaders — dicker Frachtrumpf
    hinten, eingezogene Taille, breiter Cockpitkopf vorn. Der Umriss ist aus
    jeder Richtung wiedererkennbar, auch als schwarze Flaeche gegen die Sonne.
  * **kein rechter Winkel ohne Fase.** Jeder Querschnitt ist ein Achteck; die
    Fasen fangen Streiflicht und sind der Unterschied zwischen "gebaut" und
    "Platzhalter".
  * **Plattenstoesse**: die Haut ist in leicht erhabene Bleche geteilt, mit
    Spantringen an den Sektionsfugen.
  * **Massstab**: eine mannshohe Einstiegsluke an der Steuerbordflanke. Ohne so
    ein Element liest niemand ab, ob das Schiff 4 oder 40 Meter lang ist.
  * **Asymmetrie**: Sensorpod backbord, Suchscheinwerfer steuerbord, Antennen
    schief, Rostspuren nur auf einer Seite.

**Koordinaten:** Wie `build_interior.py` rechnet das Skript in
*glTF-Innenraumkoordinaten*: **Z zur Nase**, **Y nach oben**, X quer, Boden des
Innenraums bei y=0. `to_blender()` setzt das auf Blenders Z-up um, der Export
mit `export_yup=True` ergibt daraus die Three-Konvention (Nase -Z).

**Achtung Backbord/Steuerbord:** Der Loader dreht den Root um 180 Grad um Y.
Modell-**+X** wird damit in Three zu **-X**, also **Backbord**; Modell-**-X**
ist **Steuerbord**. Rotes Positionslicht gehoert deshalb auf +X, gruenes auf
-X. Siehe {@link PORT} / {@link STAR}.

**Passung zum Innenraum** (`tools/build_interior.py`, Nase +Z, Boden y=0):

| Sektion    | z             | halbe Breite | Decke |
| ---------- | ------------- | ------------ | ----- |
| Frachtraum | -5,20 … -1,20 | 1,60         | 2,30  |
| Gang       | -1,20 … +1,40 | 0,70         | 2,10  |
| Cockpit    | +1,40 … +5,05 | 1,55         | 2,30  |
| Kanzel     | ab +2,95      | gelofted     |       |

Jede Rumpfsektion ist deshalb ein **Rohr mit Wandstaerke** ({@link tube}), kein
Vollkoerper: der Hohlraum nimmt den Innenraum auf. Vor der Kanzel oeffnet sich
der Rumpf zu einem Deck, aus dem die Verglasung herauswaechst — die Aussenhaube
umschliesst die Innenkanzel mit Luft dazwischen, damit der Blick nach draussen
unveraendert bleibt.

**Konventionen fuer die Laufzeit** (siehe ASSET-NOTES.md):
  * Root-Empty `ShipExterior`, alles haengt darunter
  * sichtbare Meshes `SM_*`
  * Marker `Thruster_*` (Duesenmuendungen, Skalierung = Glutradius),
    `Nav_Port` / `Nav_Star` / `Beacon_*` (Positionslichter)
"""

import os
import random
import bpy
import bmesh
from math import radians, cos, sin, pi

# Zielpfad. Im Worktree wird ueber die Umgebungsvariable umgebogen, damit das
# Hauptrepo unangetastet bleibt.
OUTPUT = os.environ.get(
    'PRIVATEER_EXTERIOR_OUT',
    '/Users/code/Documents/privateer/public/models/ship-exterior.glb',
)

# Vorzeichen in x. Nach der 180-Grad-Drehung im Loader ist Modell-+X backbord.
PORT, STAR = 1, -1
SIDES = (('Port', PORT), ('Star', STAR))

# --------------------------------------------------------------------- Masse
# Laengsgliederung. Die Fugen liegen bewusst auf den Schotten des Innenraums
# (z = -1,20 und z = +1,40): so faellt der Spantring aussen mit dem Schott
# innen zusammen, und das Schiff ist von aussen abzaehlbar.

TAIL_BACK, TAIL_FRONT = -7.60, -6.80    # Maschinenraum, Heckplatte
BODY_BACK, BODY_FRONT = -6.80, -1.20    # Frachtrumpf
NECK_BACK, NECK_FRONT = -1.20, 1.40     # Taille ueber dem Gang
HEAD_BACK, HEAD_FRONT = 1.40, 2.92      # Cockpitkasten
FORE_BACK, FORE_FRONT = 2.88, 5.20      # Kanzeldeck
NOSE_FRONT = 5.80                       # Nasenkeil

# Querschnitte: halbe Breite, Oberkante, Unterkante, Fase.
TAIL_W, TAIL_TOP, TAIL_BOT, TAIL_CH = 1.74, 2.62, -0.74, 0.42
# Die Breite des Frachtrumpfs ist nicht frei: die Spindbank des Innenraums
# reicht bis x = 2,11, und die Haut muss darueber hinweg.
BODY_W, BODY_TOP, BODY_BOT, BODY_CH = 2.22, 2.88, -0.88, 0.55
NECK_W, NECK_TOP, NECK_BOT, NECK_CH = 1.32, 2.46, -0.70, 0.40
HEAD_W, HEAD_TOP, HEAD_BOT, HEAD_CH = 1.98, 2.66, -0.72, 0.48

# Wandstaerke der Rohre. Nur die Stirnraender an den Fugen sind sichtbar, die
# Zahl bestimmt also vor allem, wie massiv das Schiff an den Bruechen wirkt.
WALL = 0.26

# Deck vor dem Cockpitdach, aus dem die Kanzel waechst. Liegt ueber der
# Bruestung des Innenraums (dort 0,95 … 0,80) und unter deren Glaskante.
DECK_Y = 1.06
# Oberkante des Bugbodens: knapp unter der Bodenwanne des Innenraums (-0,16).
FORE_FLOOR = -0.05

# Triebwerksgondeln. Weit genug aussen, dass der Ausleger als eigenes Bauteil
# lesbar bleibt — kleben die Gondeln am Rumpf, wirken sie angewachsen.
NAC_X = 3.66            # Mittenabstand von der Laengsachse
NAC_Y = 1.34
NAC_BACK, NAC_FRONT = -6.90, -3.05

# Kanonen: Muendungen exakt auf den Waffenports aus `combat/Weapons.ts`
# (dort [+-1.28, -0.15, -4.3] in Three-Koordinaten, x und z gespiegelt).
GUN_X, GUN_Y, GUN_TIP = 1.28, -0.15, 4.30


# ---------------------------------------------------------------- Materialien
# Aufbau wie im Innenraum: Startwerte hier, Feinabstimmung zur Laufzeit
# (MATERIAL_LOOK in `src/ship/Exterior.ts`).

MATERIALS = {
    # name:            (basisfarbe,            metallisch, rauheit, emissiv)
    'Hull_Paint':      ((0.46, 0.42, 0.34, 1), 0.05, 0.68, None),
    'Hull_Panel':      ((0.38, 0.36, 0.30, 1), 0.05, 0.74, None),
    'Hull_Olive':      ((0.26, 0.28, 0.21, 1), 0.05, 0.70, None),
    'Metal_Bare':      ((0.42, 0.42, 0.44, 1), 0.90, 0.42, None),
    'Metal_Dark':      ((0.14, 0.14, 0.15, 1), 0.85, 0.55, None),
    'Metal_Rust':      ((0.34, 0.17, 0.09, 1), 0.15, 0.88, None),
    'Rubber_Black':    ((0.05, 0.05, 0.05, 1), 0.00, 0.92, None),
    'Hazard':          ((0.55, 0.42, 0.06, 1), 0.00, 0.65, None),
    'Marking':         ((0.62, 0.60, 0.55, 1), 0.00, 0.72, None),
    'Glass':           ((0.26, 0.32, 0.36, 1), 0.00, 0.05, None),
    # Basisfarbe fast schwarz: die Duesenglut kommt aus dem emissiven Anteil und
    # wird zur Laufzeit ueber den Schub geregelt. Eine helle Basis leuchtet auch
    # bei abgestelltem Triebwerk und sieht dann nach rosa Kunststoff aus.
    'Nozzle_Glow':     ((0.04, 0.02, 0.01, 1), 0.00, 0.40, (1.00, 0.42, 0.12)),
    'Lamp_Red':        ((0.24, 0.02, 0.02, 1), 0.00, 0.35, (1.00, 0.10, 0.08)),
    'Lamp_Green':      ((0.02, 0.22, 0.06, 1), 0.00, 0.35, (0.16, 1.00, 0.30)),
    'Lamp_White':      ((0.30, 0.30, 0.32, 1), 0.00, 0.35, (1.00, 0.96, 0.88)),
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
            bsdf.inputs['Emission Strength'].default_value = 1.8
        if name == 'Glass':
            # `blend_method` ist zwischen den Blender-Versionen gewandert; die
            # Transparenz setzt der Loader zur Laufzeit ohnehin noch einmal.
            if hasattr(material, 'blend_method'):
                material.blend_method = 'BLEND'
            bsdf.inputs['Alpha'].default_value = 0.16
        made[name] = material
    return made


# ------------------------------------------------------------------- Helfer

def to_blender(point):
    """glTF-Koordinaten (x, y=oben, z=Nase) -> Blender (x, y, z=oben)."""
    x, y, z = point
    return (x, -z, y)


def _rot_x(angle):
    from mathutils import Matrix
    return Matrix.Rotation(angle, 4, 'X')


def _rot_y(angle):
    from mathutils import Matrix
    return Matrix.Rotation(angle, 4, 'Y')


class Builder:
    """Sammelt die erzeugten Objekte und haengt sie an den Root."""

    def __init__(self, materials):
        self.materials = materials
        self.root = None
        self.objects = []
        # Fasenbreite je Objekt. Ohne Eintrag leitet finish_geometry() sie aus
        # den Abmessungen ab — was bei zusammengefassten Meshes (siehe
        # `boxes`) falsch waere, weil dort die Huellbox zaehlt.
        self.bevel = {}

    def setup(self):
        bpy.ops.object.select_all(action='DESELECT')
        empty = bpy.data.objects.new('ShipExterior', None)
        bpy.context.scene.collection.objects.link(empty)
        self.root = empty
        return empty

    def register(self, obj, name, material, bevel=None):
        obj.name = name
        obj.data.materials.clear()
        obj.data.materials.append(self.materials[material])
        obj.parent = self.root
        self.objects.append(obj)
        if bevel is not None:
            self.bevel[obj.name] = bevel
        return obj

    def _emit(self, name, bm, material, bevel=None):
        mesh = bpy.data.meshes.new(name)
        bm.to_mesh(mesh)
        bm.free()
        obj = bpy.data.objects.new(name, mesh)
        bpy.context.scene.collection.objects.link(obj)
        return self.register(obj, name, material, bevel)

    # -- Grundkoerper ------------------------------------------------------

    def box(self, name, material, center, size, bevel=None):
        """Quader; `center` und `size` in glTF-Koordinaten."""
        bm = bmesh.new()
        _add_box(bm, center, size)
        return self._emit(name, bm, material, bevel)

    def boxes(self, name, material, items, bevel=None):
        """
        Viele Quader in **einem** Mesh. Der Innenraum legt fuer jeden Kasten ein
        eigenes Objekt an; aussen gibt es Plattenfelder, Nietenreihen und
        Beschriftungen mit hunderten Kaesten, und jedes Objekt kostet im Spiel
        einen eigenen Zeichenaufruf. `items` ist eine Liste `(center, size)`.
        """
        bm = bmesh.new()
        for center, size in items:
            _add_box(bm, center, size)
        return self._emit(name, bm, material, bevel)

    def wedge(self, name, material, center, size, axis, flip=False, bevel=None):
        """
        Schraege Leiste mit Dreiecksprofil — fuer Kehlen, Sockel und Keile.

        `axis` ist die **Laengsachse**, entlang der das Profil gezogen wird.
        `size` ist `(Profilbreite, Profilhoehe, Laenge)`, wobei die Profilbreite
        bei `axis='z'` in x liegt und bei `axis='x'` in z.
        """
        bm = bmesh.new()
        w, h, d = size
        sy = -1.0 if flip else 1.0
        profile = [(0.0, 0.0), (w, 0.0), (0.0, h * sy)]
        verts_a, verts_b = [], []
        for px, py in profile:
            if axis == 'z':
                a = (px, py, -d / 2)
                c = (px, py, d / 2)
            else:
                a = (-d / 2, py, px)
                c = (d / 2, py, px)
            verts_a.append(bm.verts.new(to_blender((a[0] + center[0], a[1] + center[1], a[2] + center[2]))))
            verts_b.append(bm.verts.new(to_blender((c[0] + center[0], c[1] + center[1], c[2] + center[2]))))
        bm.faces.new(verts_a)
        bm.faces.new(reversed(verts_b))
        for i in range(3):
            j = (i + 1) % 3
            bm.faces.new((verts_a[i], verts_a[j], verts_b[j], verts_b[i]))
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        return self._emit(name, bm, material, bevel)

    def cylinder(self, name, material, center, radius, length, axis='z', segments=12,
                 bevel=None):
        bm = bmesh.new()
        bmesh.ops.create_cone(
            bm, cap_ends=True, cap_tris=False, segments=segments,
            radius1=radius, radius2=radius, depth=length,
        )
        # create_cone liegt entlang Blender-Z; auf die gewuenschte Achse drehen.
        if axis == 'z':      # glTF-Z == Blender -Y
            bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=_rot_x(radians(90)))
        elif axis == 'x':
            bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=_rot_y(radians(90)))
        bmesh.ops.translate(bm, vec=to_blender(center), verts=bm.verts)
        return self._emit(name, bm, material, bevel)

    def marker(self, name, position, scale=1.0):
        """
        Empty fuer die Laufzeit. Die Skalierung transportiert eine Groesse —
        bei `Thruster_*` den Radius der Duesenglut.
        """
        empty = bpy.data.objects.new(name, None)
        bpy.context.scene.collection.objects.link(empty)
        empty.location = to_blender(position)
        empty.scale = (scale, scale, scale)
        empty.parent = self.root
        return empty


def _add_box(bm, center, size):
    """Einen Quader in ein bestehendes bmesh legen (glTF-Koordinaten)."""
    verts = []
    for sx in (-0.5, 0.5):
        for sy in (-0.5, 0.5):
            for sz in (-0.5, 0.5):
                verts.append(bm.verts.new(to_blender((
                    center[0] + sx * size[0],
                    center[1] + sy * size[1],
                    center[2] + sz * size[2],
                ))))
    # Reihenfolge der Schleife: Index = 4*x + 2*y + z
    faces = [
        (0, 1, 3, 2), (4, 6, 7, 5),      # -x, +x
        (0, 4, 5, 1), (2, 3, 7, 6),      # -y, +y
        (0, 2, 6, 4), (1, 5, 7, 3),      # -z, +z
    ]
    new = [bm.faces.new(tuple(verts[i] for i in face)) for face in faces]
    bmesh.ops.recalc_face_normals(bm, faces=new)


# --------------------------------------------------------- Querschnitte

def ring(z, x0, x1, bot, top, ch):
    """
    Achteckiger Querschnitt zwischen x0..x1 und bot..top, gegen den
    Uhrzeigersinn ab der linken Unterkante. `ch` sind die vier Fasen in der
    Reihenfolge (unten-x0, unten-x1, oben-x1, oben-x0).

    Acht Punkte statt vier sind der wichtigste Griff am ganzen Modell: ein
    Querschnitt aus lauter rechten Winkeln liest sich immer als Kiste, egal wie
    fein er beleuchtet ist.
    """
    a, b, c, d = (max(v, 0.01) for v in ch)
    return [
        (x0, bot + a, z), (x0 + a, bot, z),
        (x1 - b, bot, z), (x1, bot + b, z),
        (x1, top - c, z), (x1 - c, top, z),
        (x0 + d, top, z), (x0, top - d, z),
    ]


def section(z, w, top, bot, ch, cx=0.0):
    """Symmetrischer Querschnitt um `cx` mit halber Breite `w`."""
    return ring(z, cx - w, cx + w, bot, top, (ch, ch, ch, ch))


def slab(z, p0, p1, thickness):
    """
    Duenner, **beliebig geneigter** Querschnitt zwischen zwei Punkten der
    xy-Ebene. `ring` kann nur achsparallel; fuer die schraegen Kuehlerfluegel
    braucht es einen Querschnitt, der sich nicht am Raster orientiert.
    """
    dx, dy = p1[0] - p0[0], p1[1] - p0[1]
    length = max((dx * dx + dy * dy) ** 0.5, 1e-6)
    nx, ny = -dy / length * thickness / 2, dx / length * thickness / 2
    return [
        (p0[0] - nx, p0[1] - ny, z), (p1[0] - nx, p1[1] - ny, z),
        (p1[0] + nx, p1[1] + ny, z), (p0[0] + nx, p0[1] + ny, z),
    ]


def inset(points, d):
    """
    Querschnitt nach innen versetzen — das ergibt die Innenhaut eines Rohrs.
    Rechnet auf der Huellbox statt punktweise: die Fasen bleiben dabei
    proportional erhalten, und genau das will man an einer Blechhaut.
    """
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    z = points[0][2]
    x0, x1 = min(xs) + d, max(xs) - d
    bot, top = min(ys) + d, max(ys) - d
    # Fasen aus dem Original zurueckrechnen (Abstand Eckpunkt <-> Huellbox).
    ch = (points[1][0] - min(xs), max(xs) - points[2][0],
          max(xs) - points[5][0], points[6][0] - min(xs))
    ch = tuple(max(v - 0.4 * d, 0.04) for v in ch)
    return ring(z, x0, x1, bot, top, ch)


def circle(z, cx, cy, r, n=14):
    """Runder Querschnitt — fuer Duesenglocken und Rohre."""
    return [(cx + cos(2 * pi * i / n) * r, cy + sin(2 * pi * i / n) * r, z) for i in range(n)]


def tube(b, name, material, stations, wall=None, inner_stations=None,
         cap_back=True, cap_front=True, bevel=None):
    """
    Querschnitte zu einem Koerper verbinden.

    Ohne `wall`/`inner_stations` entsteht ein Vollkoerper mit Deckeln, sonst ein
    **Rohr** mit Wandstaerke: Aussenhaut, Innenhaut und ein Stirnrand an jedem
    Ende. Genau das brauchen die Rumpfsektionen — der Hohlraum nimmt den
    Innenraum auf, und an den Fugen sieht man die Blechstaerke.

    `wall` leitet die Innenhaut ueber {@link inset} aus der Huellbox ab, was nur
    fuer achteckige Querschnitte stimmt; runde Profile (Duesenglocken) geben ihre
    Innenhaut ueber `inner_stations` direkt vor.

    `cap_*` schliesst ein Ende mit einer Platte (beim Rohr die Innenflaeche,
    der Stirnrand bleibt). Offene Enden sind gewollt, wo die naechste Sektion
    anschliesst.
    """
    bm = bmesh.new()
    outer = [[bm.verts.new(to_blender(p)) for p in s] for s in stations]
    n = len(stations[0])

    def skin(rings, flip):
        for a, c in zip(rings, rings[1:]):
            for i in range(n):
                j = (i + 1) % n
                quad = (a[i], a[j], c[j], c[i])
                bm.faces.new(tuple(reversed(quad)) if flip else quad)

    skin(outer, False)

    if wall is None and inner_stations is None:
        bm.faces.new(outer[0])
        bm.faces.new(outer[-1])
    else:
        if inner_stations is None:
            inner_stations = [inset(s, wall) for s in stations]
        inner = [[bm.verts.new(to_blender(p)) for p in s] for s in inner_stations]
        skin(inner, True)
        for ring_o, ring_i, cap in ((outer[0], inner[0], cap_back),
                                    (outer[-1], inner[-1], cap_front)):
            for i in range(n):
                j = (i + 1) % n
                bm.faces.new((ring_o[i], ring_o[j], ring_i[j], ring_i[i]))
            if cap:
                bm.faces.new(ring_i)

    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return b._emit(name, bm, material, bevel)


def collar(b, name, material, z, length, outer_station, inner_station, bevel=None):
    """
    Spantring an einer Sektionsfuge: ein kurzes Rohr, dessen Aussenhaut ueber
    die Rumpfhaut hinausragt. Die Fugen zwischen den Sektionen sind sonst nur
    Kanten; erst der aufgesetzte Ring liest sich als Spant.
    """
    z0, z1 = z - length / 2, z + length / 2
    stations = [[(p[0], p[1], zz) for p in outer_station] for zz in (z0, z1)]
    inner = [[(p[0], p[1], zz) for p in inner_station] for zz in (z0, z1)]
    bm = bmesh.new()
    ov = [[bm.verts.new(to_blender(p)) for p in s] for s in stations]
    iv = [[bm.verts.new(to_blender(p)) for p in s] for s in inner]
    n = len(stations[0])
    for a, c in zip(ov, ov[1:]):
        for i in range(n):
            j = (i + 1) % n
            bm.faces.new((a[i], a[j], c[j], c[i]))
    for a, c in zip(iv, iv[1:]):
        for i in range(n):
            j = (i + 1) % n
            bm.faces.new((c[i], c[j], a[j], a[i]))
    for ring_o, ring_i in ((ov[0], iv[0]), (ov[-1], iv[-1])):
        for i in range(n):
            j = (i + 1) % n
            bm.faces.new((ring_o[i], ring_o[j], ring_i[j], ring_i[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return b._emit(name, bm, material, bevel)


def loft(b, name, material, sections, inside, bevel=None):
    """
    Offene Flaeche aus Querschnitten — fuer die Kanzel.

    `inside` ist ein Punkt im Rauminneren. Offene Flaechen haben keine
    schluessige Innen-/Aussenseite, `recalc_face_normals` kann also nicht
    raten; ohne diesen Bezugspunkt zeigt die halbe Haube nach innen und ist von
    aussen unsichtbar.
    """
    from mathutils import Vector

    bm = bmesh.new()
    rings = [[bm.verts.new(to_blender(p)) for p in s] for s in sections]
    for a, c in zip(rings, rings[1:]):
        for i in range(len(a) - 1):
            bm.faces.new((a[i], a[i + 1], c[i + 1], c[i]))

    bm.normal_update()
    reference = Vector(to_blender(inside))
    for face in bm.faces:
        if face.normal.dot(reference - face.calc_center_median()) > 0:
            face.normal_flip()

    return b._emit(name, bm, material, bevel)


# ------------------------------------------------------------------- Rumpf

def hull_stations():
    """Die Querschnitte der Hauptsektionen, einmal zentral."""
    return {
        'tail': (TAIL_W, TAIL_TOP, TAIL_BOT, TAIL_CH),
        'body': (BODY_W, BODY_TOP, BODY_BOT, BODY_CH),
        'neck': (NECK_W, NECK_TOP, NECK_BOT, NECK_CH),
        'head': (HEAD_W, HEAD_TOP, HEAD_BOT, HEAD_CH),
    }


def build_hull(b):
    """
    Die fuenf Rumpfsektionen als Rohre, dazu die Platten an den Spruengen.

    Der Gedanke hinter der Gliederung: der Frachtrumpf ist der dickste Teil,
    die Taille darueber dem Gang zieht sich ein, und der Cockpitkopf setzt
    wieder breiter an. Von oben ergibt das eine Wespentaille, von der Seite
    einen Treppenverlauf — beides zusammen macht den Umriss unverwechselbar.
    """
    s = hull_stations()

    # --- Heck: Maschinenraum, leicht nach hinten eingezogen.
    tail = [
        section(TAIL_BACK, TAIL_W - 0.16, TAIL_TOP - 0.10, TAIL_BOT + 0.10, TAIL_CH),
        section(TAIL_BACK + 0.30, *s['tail']),
        section(TAIL_FRONT, *s['tail']),
    ]
    tube(b, 'SM_Hull_Tail', 'Hull_Panel', tail, WALL, cap_back=True, cap_front=False)

    # --- Frachtrumpf: der Koerper des Schiffs. Vorn zieht er sich ueber einen
    # halben Meter zur Taille hin ein. Ein senkrechter Absatz an der Fuge sieht
    # von der Seite aus wie eine Wand; der schraege Einzug liest sich als Form.
    body_front_cut = (1.74, 2.66, -0.80, 0.50)
    body = [
        section(BODY_BACK, BODY_W - 0.10, BODY_TOP - 0.06, BODY_BOT + 0.06, BODY_CH),
        section(BODY_BACK + 0.45, *s['body']),
        section(-3.60, *s['body']),
        section(BODY_FRONT - 0.70, *s['body']),
        section(BODY_FRONT, *body_front_cut),
    ]
    tube(b, 'SM_Hull_Body', 'Hull_Paint', body, WALL, cap_back=False, cap_front=False)

    # --- Taille ueber dem Gang. An beiden Enden aufgeweitet, in der Mitte am
    # schmalsten — das ist die Wespentaille, an der man das Schiff von oben
    # sofort erkennt.
    neck = [
        section(NECK_BACK, 1.66, 2.62, -0.80, 0.46),
        section(NECK_BACK + 0.50, *s['neck']),
        section(NECK_FRONT - 0.55, *s['neck']),
        section(NECK_FRONT, 1.64, 2.58, -0.76, 0.46),
    ]
    tube(b, 'SM_Hull_Neck', 'Hull_Olive', neck, WALL - 0.06, cap_back=False, cap_front=False)

    # --- Cockpitkasten.
    head = [
        section(HEAD_BACK, *s['head']),
        section(HEAD_FRONT, *s['head']),
    ]
    tube(b, 'SM_Hull_Head', 'Hull_Paint', head, WALL - 0.04, cap_back=False, cap_front=False)

    # --- Uebergaenge: ringfoermige Platten schliessen die Spruenge. Ohne sie
    # sieht man an jeder Fuge in den hohlen Rumpf hinein.
    step_plate(b, 'SM_Hull_StepTail', 'Metal_Dark', BODY_BACK,
               section(0, BODY_W - 0.10, BODY_TOP - 0.06, BODY_BOT + 0.06, BODY_CH),
               section(0, TAIL_W, TAIL_TOP, TAIL_BOT, TAIL_CH))
    step_plate(b, 'SM_Hull_StepBody', 'Metal_Dark', BODY_FRONT,
               section(0, *body_front_cut), section(0, 1.66, 2.62, -0.80, 0.46))
    step_plate(b, 'SM_Hull_StepHead', 'Metal_Dark', NECK_FRONT,
               section(0, *s['head']), section(0, 1.64, 2.58, -0.76, 0.46))

    # --- Spantringe auf den Fugen. Innen sitzen dort die Schotte.
    collar(b, 'SM_Hull_CollarBody', 'Metal_Bare', BODY_FRONT - 0.70, 0.16,
           section(0, BODY_W + 0.06, BODY_TOP + 0.06, BODY_BOT - 0.06, BODY_CH),
           section(0, BODY_W - 0.12, BODY_TOP - 0.10, BODY_BOT + 0.10, BODY_CH))
    collar(b, 'SM_Hull_CollarHead', 'Metal_Bare', NECK_FRONT, 0.16,
           section(0, HEAD_W + 0.06, HEAD_TOP + 0.06, HEAD_BOT - 0.06, HEAD_CH),
           section(0, HEAD_W - 0.12, HEAD_TOP - 0.10, HEAD_BOT + 0.10, HEAD_CH))
    collar(b, 'SM_Hull_CollarTail', 'Metal_Bare', TAIL_FRONT, 0.14,
           section(0, TAIL_W + 0.07, TAIL_TOP + 0.07, TAIL_BOT - 0.07, TAIL_CH),
           section(0, TAIL_W - 0.10, TAIL_TOP - 0.08, TAIL_BOT + 0.08, TAIL_CH))
    for i, z in enumerate((-5.40, -3.90, -2.40)):
        collar(b, f'SM_Hull_Frame{i}', 'Hull_Panel', z, 0.13,
               section(0, BODY_W + 0.035, BODY_TOP + 0.035, BODY_BOT - 0.035, BODY_CH),
               section(0, BODY_W - 0.10, BODY_TOP - 0.08, BODY_BOT + 0.08, BODY_CH))


def step_plate(b, name, material, z, outer_station, inner_station, thickness=0.10):
    """Ringplatte, die einen Breitensprung zwischen zwei Sektionen schliesst."""
    return collar(b, name, material, z, thickness, outer_station, inner_station)


def build_stern(b):
    """
    Die Heckflaeche. Ohne Zutat ist sie eine drei mal drei Meter grosse Platte
    mit zwei Loechern darin — die groesste zusammenhaengende Flaeche am ganzen
    Schiff und damit die Stelle, an der ein Modell am schnellsten billig
    aussieht. Also: vertiefte Felder, Kuehlrippen, Rohre, Warnwinkel.
    """
    z = TAIL_BACK - 0.03

    # Vertieftes Mittelfeld zwischen den Duesen.
    b.box('SM_Stern_Recess', 'Metal_Dark', (0, 1.28, z - 0.03), (0.94, 1.70, 0.10))
    b.boxes('SM_Stern_Ribs', 'Metal_Bare',
            [((0, 0.60 + i * 0.26, z - 0.10), (0.86, 0.10, 0.10)) for i in range(6)],
            bevel=0.006)

    # Kuehlrippenblock oben, quer ueber die Platte.
    b.box('SM_Stern_Cooler', 'Metal_Dark', (0, 2.24, z - 0.06), (2.90, 0.44, 0.16))
    b.boxes('SM_Stern_CoolerFins', 'Metal_Bare',
            [((-1.35 + i * 0.30, 2.24, z - 0.14), (0.10, 0.50, 0.16)) for i in range(10)],
            bevel=0.006)

    # Rohrbuendel unten, dazu zwei Tanks.
    for i, (dx, r, material) in enumerate([
        (-0.62, 0.09, 'Metal_Rust'), (-0.40, 0.07, 'Metal_Bare'),
        (0.44, 0.08, 'Rubber_Black'), (0.66, 0.06, 'Metal_Bare'),
    ]):
        b.cylinder(f'SM_Stern_Pipe{i}', material, (dx, -0.20, z - 0.12), r, 1.30, axis='x')
    for tag, sx in SIDES:
        b.cylinder(f'SM_Stern_Tank{tag}', 'Hull_Panel', (sx * 1.18, 0.02, z - 0.28),
                   0.30, 0.44, segments=12)
        b.box(f'SM_Stern_Hatch{tag}', 'Hull_Olive', (sx * 1.30, 1.90, z - 0.05),
              (0.70, 0.70, 0.08))
        b.box(f'SM_Stern_Latch{tag}', 'Metal_Bare', (sx * 1.30, 1.90, z - 0.12),
              (0.16, 0.16, 0.08))

    # Schleppoese in der Mitte — die Sorte Detail, die ein Schiff benutzt
    # aussehen laesst.
    b.box('SM_Stern_TowBase', 'Metal_Bare', (0, 2.52, z - 0.02), (0.44, 0.24, 0.14))
    b.cylinder('SM_Stern_TowRing', 'Metal_Bare', (0, 2.66, z - 0.14), 0.16, 0.06, axis='z')


def build_radiators(b):
    """
    Zwei schraege Kuehlerfluegel achtern oben. Sie sind das einzige Bauteil, das
    nicht dem Achsenraster folgt — genau deshalb tragen sie die Silhouette: von
    der Seite und von oben bricht die Diagonale den waagerechten Verlauf.
    """
    for tag, sx in SIDES:
        stations = []
        for z, scale in ((-6.45, 0.86), (-5.85, 1.00), (-4.70, 0.96), (-4.30, 0.72)):
            root = (sx * 1.86, 2.32)
            tip = (sx * (1.86 + 1.34 * scale), 2.32 + 0.86 * scale)
            stations.append(slab(z, root, tip, 0.10))
        tube(b, f'SM_Rad_{tag}', 'Hull_Panel', stations, None, bevel=0.008)

        # Rippen quer ueber den Fluegel.
        fins = []
        for i in range(5):
            z = -6.30 + i * 0.48
            root = (sx * 2.10, 2.46)
            tip = (sx * 3.06, 3.08)
            fins.append(slab(z, root, tip, 0.06))
            fins.append(slab(z + 0.09, root, tip, 0.06))
        for i in range(0, len(fins), 2):
            tube(b, f'SM_Rad_{tag}_Fin{i // 2}', 'Metal_Dark', fins[i:i + 2], None,
                 bevel=0.005)

        # Strebe vom Rumpf zum Fluegel.
        b.box(f'SM_Rad_{tag}_Strut', 'Metal_Bare', (sx * 2.10, 2.36, -5.40),
              (0.70, 0.14, 0.16))


# ------------------------------------------------------- Bug und Kanzel

# Stationen des Bugs: z, halbe Aussenbreite, halbe Deckoeffnung, Unterkante.
FORE_STATIONS = [
    (FORE_BACK, 1.98, 1.72, -0.72),
    (3.55, 1.90, 1.65, -0.68),
    (4.15, 1.72, 1.47, -0.60),
    (4.65, 1.44, 1.17, -0.50),
    (FORE_FRONT, 0.96, 0.62, -0.34),
]


def build_fore(b):
    """
    Bug: Boden, zwei Decksholme und der Nasenkeil.

    Die Kanzel des Innenraums beginnt bei z = 2,95 und laeuft bis 5,05. Genau
    dort darf aussen kein Blech stehen — deshalb ist der Bug **kein Rohr**,
    sondern eine offene Wanne: ein flacher Boden, links und rechts ein Holm bis
    Deckhoehe, dazwischen die Verglasung. Die Innenkanzel liegt vollstaendig im
    Freiraum zwischen den Holmen.
    """
    # --- Boden ueber die volle Breite, bis knapp unter die Bodenwanne innen.
    # Oben nur minimal gefast, damit die Holme buendig darauf sitzen.
    floor = [ring(z, -w, w, bot, FORE_FLOOR, (0.30, 0.30, 0.02, 0.02))
             for z, w, _, bot in FORE_STATIONS]
    tube(b, 'SM_Fore_Floor', 'Hull_Paint', floor, None)

    # --- Decksholme links und rechts der Kanzeloeffnung.
    for tag, sx in SIDES:
        holm = []
        for z, w, wi, _ in FORE_STATIONS:
            x0, x1 = sorted((sx * wi, sx * w))
            # Grosse Fase an der Aussenkante des Decks, kleine innen.
            ch = (0.02, 0.02, 0.20, 0.05) if sx > 0 else (0.02, 0.02, 0.05, 0.20)
            holm.append(ring(z, x0, x1, FORE_FLOOR, DECK_Y, ch))
        tube(b, f'SM_Fore_Rail{tag}', 'Hull_Paint', holm, None)

        # Bruestungsleiste: schliesst den Spalt zwischen Holm und Innenkanzel
        # und rahmt die Scheibe. Ohne sie klafft unter der Haube eine Fuge.
        sill = []
        for z, _, wi, _ in FORE_STATIONS:
            x0, x1 = sorted((sx * (wi - 0.20), sx * (wi + 0.03)))
            sill.append(ring(z, x0, x1, DECK_Y - 0.13, DECK_Y + 0.02,
                             (0.02, 0.02, 0.04, 0.04)))
        tube(b, f'SM_Fore_Sill{tag}', 'Metal_Bare', sill, None)

    # --- Stirnwand hinter dem Nasenkeil, schliesst die Wanne nach vorn.
    b.box('SM_Fore_Bulkhead', 'Metal_Dark', (0, (FORE_FLOOR + DECK_Y) / 2, FORE_FRONT - 0.04),
          (1.24, DECK_Y - FORE_FLOOR, 0.08))

    # --- Nasenkeil.
    nose = [
        ring(FORE_FRONT, -0.96, 0.96, -0.34, 1.26, (0.28, 0.28, 0.30, 0.30)),
        ring(5.55, -0.72, 0.72, -0.22, 1.02, (0.22, 0.22, 0.26, 0.26)),
        ring(NOSE_FRONT, -0.30, 0.30, -0.04, 0.62, (0.10, 0.10, 0.12, 0.12)),
    ]
    tube(b, 'SM_Fore_Nose', 'Hull_Panel', nose, None)
    b.box('SM_Fore_NoseCap', 'Metal_Bare', (0, 0.30, NOSE_FRONT + 0.02), (0.46, 0.52, 0.06))
    # Rammleiste: der Bug ist die Stelle, an der ein Frachter anlegt.
    b.box('SM_Fore_Bumper', 'Rubber_Black', (0, 0.02, 5.62), (1.10, 0.10, 0.34))


# Stationen der Aussenkanzel: z, halbe Breite, Oberkante. Sie umschliesst die
# Innenkanzel (z 2,95 … 5,05, halb 1,55 … 0,42, Scheitel 2,30 … 1,02) mit
# Abstand — dieselbe Bogenformel, nur eine Nummer groesser.
CANOPY_STATIONS = [
    (2.80, 1.74, 2.44),
    (3.55, 1.65, 2.28),
    (4.15, 1.47, 2.00),
    (4.65, 1.17, 1.62),
    (FORE_FRONT, 0.62, 1.22),
]


def canopy_section(z, half, top, sill, points=9):
    """
    Ein Kanzel-Querschnitt: von der Backbordbruestung ueber das Dach zur
    Steuerbordbruestung. Der Bogen ist bewusst kantig — facettiertes Glas passt
    zum gebauten Charakter besser als eine glatte Kuppel.
    """
    out = []
    for i in range(points):
        t = i / (points - 1)
        angle = pi * t
        x = -cos(angle) * half
        y = sill + (top - sill) * sin(angle) ** 0.75
        out.append((x, y, z))
    return out


def rib_arch(b, name, material, z, width, size_inner, size_outer, sill, bevel=0.006):
    """
    Ein Spriegel ueber der Kanzel: rechteckiges Profil, entlang des Bogens
    gezogen. `size_*` sind (halbe Breite, Scheitelhoehe) der inneren und der
    aeusseren Bogenkante.
    """
    inner = canopy_section(z, size_inner[0], size_inner[1], sill)
    outer = canopy_section(z, size_outer[0], size_outer[1], sill)
    stations = [
        [(a[0], a[1], z - width), (c[0], c[1], z - width),
         (c[0], c[1], z + width), (a[0], a[1], z + width)]
        for a, c in zip(inner, outer)
    ]
    return tube(b, name, material, stations, None, bevel=bevel)


def build_canopy(b):
    """Verglasung, Rahmenspriegel und Blendschutz ueber der Scheibe."""
    inside = (0, 1.4, 4.0)
    glass = [canopy_section(z, half, top, DECK_Y) for z, half, top in CANOPY_STATIONS]
    loft(b, 'SM_Canopy_Glass', 'Glass', glass, inside, bevel=0.0)

    # Spriegel quer ueber die Haube. Sie sitzen von aussen auf und teilen die
    # Scheibe in Felder — eine ungeteilte Blase saehe nach Spielzeug aus.
    # Gebaut als Vollkoerper entlang des Bogens: das Profil ist die "Station",
    # der Bogen die Sweeprichtung.
    for i, (z, half, top) in enumerate(CANOPY_STATIONS[1:4], start=1):
        width = 0.055 if i != 2 else 0.075
        rib_arch(b, f'SM_Canopy_Rib{i}', 'Metal_Bare', z, width,
                 (half - 0.02, top - 0.02), (half + 0.05, top + 0.05), DECK_Y)

    # Rahmen am hinteren Kanzelansatz.
    rib_arch(b, 'SM_Canopy_Arch', 'Metal_Bare', 2.86, 0.10,
             (1.74, 2.44), (1.84, 2.54), DECK_Y - 0.04, bevel=0.008)

    # Blendschutz ueber der Scheibe, an der Stirn des Cockpitkastens.
    b.box('SM_Canopy_Brow', 'Hull_Olive', (0, 2.58, HEAD_FRONT + 0.10), (2.30, 0.16, 0.30))
    b.wedge('SM_Canopy_BrowLip', 'Metal_Dark', (0.0, 2.50, HEAD_FRONT + 0.26),
            (-0.46, 0.16, 2.10), axis='x')
    # Scheibenwischer haben Raumschiffe nicht, Ablaufkanten schon.
    for tag, sx in SIDES:
        b.box(f'SM_Canopy_Gutter{tag}', 'Metal_Dark',
              (sx * 1.80, 2.30, HEAD_FRONT - 0.02), (0.26, 0.10, 0.24))


# ------------------------------------------------------------- Triebwerke

def build_nacelles(b):
    """
    Zwei Gondeln auf Auslegern, dazu die kleinen Manoevrierduesen am Heck.

    Die Gondeln sind der zweite grosse Griff an der Silhouette: sie ziehen die
    Masse nach aussen und hinten und geben dem Schiff von vorn eine Breite, die
    der Rumpf allein nicht haette.
    """
    for tag, sx in SIDES:
        cx = sx * NAC_X

        # --- Gondelkoerper: vorn Einlauf, hinten zur Glocke aufgeweitet. Oben
        # flacher als unten — eine gleichmaessige Wurst haette keine Oberseite,
        # auf der Aufbauten sitzen koennten.
        body = [
            (NAC_FRONT, 0.58, 0.50, 0.52),
            (NAC_FRONT - 0.42, 0.74, 0.66, 0.70),
            (-4.60, 0.82, 0.74, 0.78),
            (-5.90, 0.84, 0.74, 0.80),
            (NAC_BACK, 0.88, 0.70, 0.84),
        ]
        stations = [ring(z, cx - w, cx + w, NAC_Y - lo, NAC_Y + hi,
                         (0.34, 0.34, 0.20, 0.20))
                    for z, w, hi, lo in body]
        tube(b, f'SM_Nac_{tag}', 'Hull_Panel', stations, 0.14)

        # Aufbauten auf der Gondel: Ruecken, Klappen, Lueftergitter.
        b.box(f'SM_Nac_{tag}_Spine', 'Hull_Olive', (cx, NAC_Y + 0.78, -5.10),
              (0.60, 0.16, 2.40))
        b.boxes(f'SM_Nac_{tag}_Panels', 'Metal_Bare', [
            ((cx, NAC_Y + 0.80, -3.90), (0.72, 0.06, 0.60)),
            ((cx, NAC_Y - 0.86, -4.40), (0.66, 0.06, 1.10)),
            ((cx + sx * 0.86, NAC_Y + 0.10, -5.60), (0.06, 0.70, 0.70)),
        ], bevel=0.006)
        b.boxes(f'SM_Nac_{tag}_Louvres', 'Metal_Dark',
                [((cx + sx * 0.89, NAC_Y + 0.10, -5.60 + (i - 2) * 0.14),
                  (0.05, 0.56, 0.07)) for i in range(5)], bevel=0.004)

        # Einlauf: dunkler Ring mit Gitterstaeben, vor der Stirnplatte.
        b.cylinder(f'SM_Nac_{tag}_Intake', 'Metal_Dark', (cx, NAC_Y, NAC_FRONT + 0.03),
                   0.47, 0.12, segments=14)
        b.cylinder(f'SM_Nac_{tag}_Throat', 'Rubber_Black', (cx, NAC_Y, NAC_FRONT + 0.05),
                   0.38, 0.10, segments=14)
        b.boxes(f'SM_Nac_{tag}_Grille', 'Metal_Bare',
                [((cx, NAC_Y - 0.30 + i * 0.15, NAC_FRONT + 0.10), (0.76, 0.035, 0.05))
                 for i in range(5)], bevel=0.004)

        # --- Duesenglocke. Rundes Profil, deshalb Innenhaut von Hand.
        radii = ((NAC_BACK - 0.02, 0.62), (-7.22, 0.74), (-7.52, 0.92))
        tube(b, f'SM_Nac_{tag}_Bell', 'Metal_Dark',
             [circle(z, cx, NAC_Y, r) for z, r in radii], None,
             inner_stations=[circle(z, cx, NAC_Y, r - 0.07) for z, r in radii],
             cap_back=False, cap_front=False)
        # Glutscheibe im Inneren der Glocke.
        b.cylinder(f'SM_Nac_{tag}_Glow', 'Nozzle_Glow', (cx, NAC_Y, -7.14), 0.56, 0.05,
                   segments=14)
        # Kuehlrippen aussen auf der Glocke.
        b.boxes(f'SM_Nac_{tag}_Fins', 'Metal_Bare',
                [((cx + cos(a) * 0.84, NAC_Y + sin(a) * 0.84, -7.30), (0.10, 0.10, 0.30))
                 for a in [i * pi / 4 + pi / 8 for i in range(8)]], bevel=0.006)

        # --- Ausleger zum Rumpf: Traeger plus zwei Rundstreben.
        px0, px1 = sorted((sx * (BODY_W - 0.20), sx * (NAC_X - 0.74)))
        pylon = [
            ring(-5.70, px0, px1, 0.86, 2.06, (0.16, 0.16, 0.16, 0.16)),
            ring(-4.60, px0, px1, 0.96, 1.98, (0.16, 0.16, 0.16, 0.16)),
            ring(-3.55, px0, px1, 1.06, 1.84, (0.16, 0.16, 0.16, 0.16)),
        ]
        tube(b, f'SM_Pylon_{tag}', 'Hull_Olive', pylon, None)
        # Zwei Rundstreben vor und hinter dem Traeger — die Gondel haengt
        # sichtbar an etwas, statt am Rumpf zu kleben.
        for i, (z, r) in enumerate(((-6.30, 0.09), (-3.30, 0.075))):
            b.cylinder(f'SM_Pylon_{tag}_Strut{i}', 'Metal_Bare',
                       (sx * 2.50, NAC_Y, z), r, 1.60, axis='x')
        # Rohrleitungen entlang des Auslegers, sichtbar von unten.
        b.boxes(f'SM_Pylon_{tag}_Clamps', 'Metal_Bare',
                [((sx * (NAC_X - 0.80 - i * 0.32), 0.86, -4.60), (0.10, 0.12, 0.44))
                 for i in range(4)], bevel=0.006)

    # --- Manoevrierduesen am Heck, links und rechts der Mitte.
    for tag, sx in SIDES:
        cx = sx * 0.82
        radii = ((TAIL_BACK + 0.10, 0.34), (TAIL_BACK - 0.18, 0.42), (TAIL_BACK - 0.34, 0.52))
        tube(b, f'SM_Tail_{tag}_Bell', 'Metal_Dark',
             [circle(z, cx, 1.28, r) for z, r in radii], None,
             inner_stations=[circle(z, cx, 1.28, r - 0.06) for z, r in radii],
             cap_back=False, cap_front=False)
        b.cylinder(f'SM_Tail_{tag}_Glow', 'Nozzle_Glow', (cx, 1.28, TAIL_BACK - 0.12),
                   0.30, 0.04, segments=12)
        b.cylinder(f'SM_Tail_{tag}_Collar', 'Metal_Bare', (cx, 1.28, TAIL_BACK + 0.16),
                   0.46, 0.10, segments=12)


# --------------------------------------------------------------- Aufbauten

def build_dorsal(b):
    """
    Ruecken: Versorgungskanal ueber der Taille, Antennen, Frachtluke.

    Der Kanal ist funktional gedacht — er verbindet den Maschinenraum hinten
    mit dem Cockpit vorn und ueberbrueckt die eingezogene Taille. Genau solche
    nachtraeglich wirkenden Wege machen den "Used Future"-Charakter aus.
    """
    z0, z1 = NECK_BACK - 0.10, NECK_FRONT + 0.10
    mid = (z0 + z1) / 2
    b.box('SM_Dorsal_Duct', 'Metal_Dark', (0, NECK_TOP + 0.16, mid), (0.66, 0.34, z1 - z0))
    b.boxes('SM_Dorsal_Clamps', 'Metal_Bare',
            [((0, NECK_TOP + 0.17, z), (0.78, 0.42, 0.07)) for z in (-0.85, 0.10, 1.05)],
            bevel=0.006)
    for i, (dx, r, material) in enumerate([
        (-0.22, 0.075, 'Metal_Bare'), (-0.06, 0.055, 'Metal_Rust'),
        (0.09, 0.05, 'Rubber_Black'), (0.22, 0.065, 'Metal_Bare'),
    ]):
        b.cylinder(f'SM_Dorsal_Pipe{i}', material,
                   (dx, NECK_TOP + 0.30, mid), r, z1 - z0 + 0.30)

    # Antennenmast und Peilantenne, bewusst leicht schief.
    b.box('SM_Ant_Base', 'Metal_Dark', (0.55, BODY_TOP + 0.05, -2.05), (0.30, 0.14, 0.30))
    b.cylinder('SM_Ant_Mast', 'Metal_Bare', (0.55, BODY_TOP + 0.50, -2.05), 0.035, 0.90,
               axis='y')
    b.box('SM_Ant_Tip', 'Lamp_Red', (0.55, BODY_TOP + 0.98, -2.05), (0.06, 0.10, 0.06))
    b.boxes('SM_Ant_Yagi', 'Metal_Bare',
            [((0.55, BODY_TOP + 0.62 + i * 0.13, -2.05), (0.46 - i * 0.06, 0.03, 0.03))
             for i in range(3)], bevel=0.004)
    # Schuesselantenne steuerbord, nach vorn geneigt.
    dish_y = BODY_TOP + 0.52
    b.cylinder('SM_Dish_Post', 'Metal_Bare', (-0.85, BODY_TOP + 0.24, -1.85), 0.05, 0.50,
               axis='y')
    tube(b, 'SM_Dish', 'Metal_Bare',
         [circle(z, -0.85, dish_y, r, n=12)
          for z, r in ((-2.00, 0.12), (-1.86, 0.32), (-1.74, 0.46))], None, bevel=0.004)

    # --- Frachtluke auf dem Ruecken, mit Sarg und Scharnieren.
    b.box('SM_Hatch_Coaming', 'Metal_Bare', (0, BODY_TOP + 0.05, -3.70), (2.30, 0.10, 2.30))
    b.box('SM_Hatch_Lid', 'Hull_Panel', (0, BODY_TOP + 0.09, -3.70), (2.10, 0.10, 2.10))
    b.box('SM_Hatch_Seam', 'Metal_Dark', (0, BODY_TOP + 0.15, -3.70), (2.12, 0.03, 0.05))
    b.boxes('SM_Hatch_Hinges', 'Metal_Dark',
            [((sx * 0.72, BODY_TOP + 0.14, -3.70 + sz * 1.02), (0.26, 0.08, 0.18))
             for sx in (-1, 1) for sz in (-1, 1)], bevel=0.008)
    b.boxes('SM_Hatch_Grips', 'Metal_Bare',
            [((sx * 0.95, BODY_TOP + 0.16, -3.70), (0.10, 0.08, 0.50)) for sx in (-1, 1)],
            bevel=0.006)

    # Aufstiegstritte zur Luke — Massstab und Gebrauchsspur in einem.
    b.boxes('SM_Dorsal_Steps', 'Metal_Bare',
            [((1.55, BODY_TOP - 0.02 - i * 0.0, -2.60 + i * 0.34), (0.44, 0.05, 0.16))
             for i in range(3)], bevel=0.006)


def build_belly(b):
    """Bauch: Laderampe, Kufen, Bugbein, Leitungen."""
    # --- Laderampe als vertiefte Flaeche mit Scharnier hinten.
    b.box('SM_Ramp_Frame', 'Metal_Bare', (0, BODY_BOT + 0.04, -3.40), (2.30, 0.10, 3.10))
    b.box('SM_Ramp_Leaf', 'Hull_Panel', (0, BODY_BOT + 0.07, -3.40), (2.06, 0.10, 2.86))
    b.box('SM_Ramp_Hinge', 'Metal_Dark', (0, BODY_BOT + 0.02, -4.92), (2.10, 0.14, 0.14))
    b.boxes('SM_Ramp_Latches', 'Metal_Bare',
            [((sx * 0.80, BODY_BOT + 0.01, -1.94), (0.24, 0.10, 0.16)) for sx in (-1, 1)],
            bevel=0.008)

    # --- Kufen: zwei Laengstraeger unter dem Frachtrumpf.
    for tag, sx in SIDES:
        x = sx * 1.42
        skid = [
            ring(-5.35, x - 0.17, x + 0.17, -1.42, -1.16, (0.09, 0.09, 0.05, 0.05)),
            ring(-5.05, x - 0.19, x + 0.19, -1.46, -1.14, (0.11, 0.11, 0.06, 0.06)),
            ring(-1.95, x - 0.19, x + 0.19, -1.46, -1.14, (0.11, 0.11, 0.06, 0.06)),
            ring(-1.60, x - 0.17, x + 0.17, -1.40, -1.14, (0.09, 0.09, 0.05, 0.05)),
        ]
        tube(b, f'SM_Skid_{tag}', 'Metal_Dark', skid, None)
        for i, z in enumerate((-4.80, -2.20)):
            b.box(f'SM_Skid_{tag}_Leg{i}', 'Metal_Bare', (x, -1.02, z), (0.20, 0.42, 0.24))
            b.cylinder(f'SM_Skid_{tag}_Damper{i}', 'Metal_Bare', (x, -1.10, z), 0.07, 0.34,
                       axis='y')
            b.box(f'SM_Skid_{tag}_Bay{i}', 'Metal_Dark', (x, BODY_BOT + 0.02, z),
                  (0.40, 0.10, 0.46))
        # Hochgezogene Spitze vorn und hinten, damit die Kufe nicht abgesaegt wirkt.
        b.wedge(f'SM_Skid_{tag}_Toe', 'Metal_Bare', (x - 0.17, -1.42, -5.50),
                (0.34, 0.26, 0.30), axis='z')

    # --- Bugbein unter dem Cockpit.
    b.box('SM_Gear_Nose_Bay', 'Metal_Dark', (0, -0.52, 3.75), (0.66, 0.16, 0.90))
    b.cylinder('SM_Gear_Nose_Strut', 'Metal_Bare', (0, -0.92, 3.75), 0.09, 0.82, axis='y')
    b.box('SM_Gear_Nose_Yoke', 'Metal_Dark', (0, -1.28, 3.75), (0.30, 0.16, 0.30))
    b.box('SM_Gear_Nose_Pad', 'Rubber_Black', (0, -1.42, 3.75), (0.46, 0.14, 0.62))

    # --- Leitungen unter der Taille, vom Rumpf zum Cockpit.
    for i, (dx, r, material) in enumerate([
        (-0.30, 0.07, 'Metal_Rust'), (-0.12, 0.05, 'Metal_Bare'),
        (0.14, 0.06, 'Rubber_Black'), (0.32, 0.05, 'Metal_Bare'),
    ]):
        b.cylinder(f'SM_Belly_Pipe{i}', material, (dx, NECK_BOT - 0.06, 0.10), r, 3.00)
    b.boxes('SM_Belly_Clamps', 'Metal_Bare',
            [((0, NECK_BOT - 0.05, z), (0.86, 0.16, 0.07)) for z in (-0.95, 0.15, 1.15)],
            bevel=0.006)

    # --- Kanonen: Rohre in Verkleidungen an den unteren Bugkanten.
    for tag, sx in SIDES:
        x = sx * GUN_X
        b.box(f'SM_Gun_{tag}_Fairing', 'Hull_Olive', (x, GUN_Y - 0.02, 3.95),
              (0.42, 0.40, 1.40))
        b.cylinder(f'SM_Gun_{tag}_Barrel', 'Metal_Dark', (x, GUN_Y, 4.02), 0.085, 0.60)
        b.cylinder(f'SM_Gun_{tag}_Muzzle', 'Metal_Bare', (x, GUN_Y, GUN_TIP - 0.10), 0.10, 0.22)
        b.boxes(f'SM_Gun_{tag}_Rings', 'Metal_Bare',
                [((x, GUN_Y, 3.55 + i * 0.22), (0.24, 0.24, 0.05)) for i in range(3)],
                bevel=0.006)


# ---------------------------------------------------------------- Beplankung

def build_plating(b):
    """
    Plattenstoesse auf Flanken, Ruecken und Bauch.

    Leicht erhabene Bleche mit schmalen Fugen dazwischen. Die Groessen sind
    deterministisch gewuerfelt (fester Seed), aber in einem Raster — echte
    Blechfelder sind unregelmaessig, aber nicht beliebig.
    """
    rng = random.Random(20260820)

    # --- Flanken des Frachtrumpfs.
    for tag, sx in SIDES:
        plates, panels, trim = [], [], []
        z = BODY_BACK + 0.35
        while z < BODY_FRONT - 0.45:
            length = rng.choice((0.55, 0.75, 0.95, 1.15))
            length = min(length, BODY_FRONT - 0.45 - z)
            if length < 0.30:
                break
            y = BODY_BOT + BODY_CH + 0.10
            while y < BODY_TOP - BODY_CH - 0.15:
                height = rng.choice((0.45, 0.62, 0.85))
                height = min(height, BODY_TOP - BODY_CH - 0.15 - y)
                if height < 0.22:
                    break
                item = ((sx * (BODY_W + 0.011), y + height / 2, z + length / 2),
                        (0.022, height - 0.05, length - 0.05))
                bucket = rng.random()
                (plates if bucket < 0.55 else panels if bucket < 0.85 else trim).append(item)
                y += height
            z += length
        b.boxes(f'SM_Plate_Body{tag}', 'Hull_Panel', plates, bevel=0.005)
        b.boxes(f'SM_Plate_Body{tag}_B', 'Hull_Paint', panels, bevel=0.005)
        b.boxes(f'SM_Plate_Body{tag}_C', 'Metal_Bare', trim, bevel=0.005)

        # Laengsstringer: zwei durchgehende Leisten geben der Flanke Richtung.
        b.boxes(f'SM_Stringer_{tag}', 'Metal_Bare', [
            ((sx * (BODY_W + 0.02), 2.05, -4.00), (0.05, 0.09, 5.30)),
            ((sx * (BODY_W + 0.02), 0.30, -4.00), (0.05, 0.12, 5.30)),
        ], bevel=0.006)

        # Lueftergitter mit Lamellen.
        b.box(f'SM_Vent_{tag}', 'Metal_Dark', (sx * (BODY_W + 0.01), 1.35, -5.65),
              (0.05, 0.86, 0.90))
        b.boxes(f'SM_Vent_{tag}_Slats', 'Metal_Bare',
                [((sx * (BODY_W + 0.035), 1.02 + i * 0.14, -5.65), (0.03, 0.06, 0.80))
                 for i in range(6)], bevel=0.004)

    # --- Ruecken und Bauch des Frachtrumpfs.
    top_plates, bottom_plates = [], []
    z = BODY_BACK + 0.40
    while z < BODY_FRONT - 0.40:
        length = rng.choice((0.70, 0.95, 1.25))
        length = min(length, BODY_FRONT - 0.40 - z)
        if length < 0.35:
            break
        for x in (-1.05, 0.0, 1.05):
            if not (-4.95 < z + length / 2 < -2.45 and abs(x) < 1.3):
                top_plates.append(((x, BODY_TOP + 0.008, z + length / 2),
                                   (0.98, 0.016, length - 0.05)))
            bottom_plates.append(((x, BODY_BOT - 0.008, z + length / 2),
                                  (0.98, 0.016, length - 0.05)))
        z += length
    b.boxes('SM_Plate_Top', 'Hull_Panel', top_plates, bevel=0.005)
    b.boxes('SM_Plate_Bottom', 'Hull_Panel', bottom_plates, bevel=0.005)

    # --- Ausbuchtung ueber der Koje. Die Koje sitzt innen in einer Nische, die
    # bis x = 2,28 reicht und damit weiter aussen als die Haut. Statt den ganzen
    # Rumpf dafuer zu verbreitern bekommt er an genau dieser Stelle eine Beule —
    # was ohnehin plausibler aussieht als ein durchgehend fetter Kasten.
    sx = STAR
    blister = [
        ring(-4.15, *sorted((sx * (BODY_W - 0.10), sx * 2.30)), 0.30, 1.60,
             (0.18, 0.18, 0.18, 0.18)),
        ring(-3.90, *sorted((sx * (BODY_W - 0.10), sx * 2.46)), 0.16, 1.76,
             (0.22, 0.22, 0.22, 0.22)),
        ring(-2.30, *sorted((sx * (BODY_W - 0.10), sx * 2.46)), 0.16, 1.76,
             (0.22, 0.22, 0.22, 0.22)),
        ring(-2.05, *sorted((sx * (BODY_W - 0.10), sx * 2.30)), 0.30, 1.60,
             (0.18, 0.18, 0.18, 0.18)),
    ]
    tube(b, 'SM_Blister', 'Hull_Paint', blister, None)
    b.boxes('SM_Blister_Ribs', 'Metal_Bare',
            [((sx * 2.40, 0.96, z), (0.16, 1.56, 0.07)) for z in (-3.80, -2.42)],
            bevel=0.006)
    b.box('SM_Blister_Vent', 'Metal_Dark', (sx * 2.48, 1.50, -3.10), (0.06, 0.26, 0.60))

    # --- Taille: die kuerzeste Sektion, aber von der Seite gut sichtbar. Ohne
    # Zutat ist sie eine olivgruene Tafel. Also Rohre laengs, ein Wartungsfeld
    # und ein kleines Bullauge auf Kopfhoehe des Gangs.
    for tag, sx in SIDES:
        x = sx * (NECK_W + 0.02)
        b.boxes(f'SM_Neck_{tag}_Ribs', 'Metal_Bare', [
            ((x, 1.96, 0.10), (0.05, 0.10, 2.30)),
            ((x, 0.42, 0.10), (0.05, 0.10, 2.30)),
            ((x, 1.20, -0.62), (0.05, 1.30, 0.09)),
            ((x, 1.20, 0.78), (0.05, 1.30, 0.09)),
        ], bevel=0.005)
        b.box(f'SM_Neck_{tag}_Panel', 'Hull_Panel', (x, 0.95, -0.10), (0.04, 0.90, 0.90))
        b.box(f'SM_Neck_{tag}_Port', 'Metal_Bare', (x + sx * 0.02, 1.62, 0.55),
              (0.06, 0.34, 0.34))
        b.box(f'SM_Neck_{tag}_Glass', 'Glass', (x + sx * 0.05, 1.62, 0.55),
              (0.03, 0.24, 0.24))
        b.cylinder(f'SM_Neck_{tag}_Pipe', 'Metal_Rust', (x + sx * 0.06, 0.20, 0.10),
                   0.06, 2.40)

    # --- Einstiegsluke steuerbord. Mannshoch — sie ist der Massstab, an dem
    # das Auge die Groesse des ganzen Schiffs abliest.
    sx = STAR
    x = sx * BODY_W
    b.box('SM_Door_Frame', 'Metal_Bare', (x + sx * 0.02, 1.15, -1.95), (0.06, 2.16, 1.10))
    b.box('SM_Door_Leaf', 'Hull_Olive', (x + sx * 0.05, 1.13, -1.95), (0.06, 1.96, 0.92))
    b.box('SM_Door_Window', 'Glass', (x + sx * 0.08, 1.72, -1.95), (0.03, 0.34, 0.44))
    b.box('SM_Door_Handle', 'Metal_Bare', (x + sx * 0.09, 1.05, -2.30), (0.05, 0.36, 0.08))
    b.box('SM_Door_Panel', 'Metal_Dark', (x + sx * 0.06, 1.30, -1.30), (0.05, 0.30, 0.22))
    b.boxes('SM_Door_Steps', 'Metal_Bare',
            [((x + sx * 0.14, 0.10 - i * 0.34, -1.95 - 0.10), (0.30, 0.06, 0.52))
             for i in range(2)], bevel=0.006)

    # --- Cockpitkasten und Bugholme. Beide sind von der Seite gross im Bild und
    # ohne Beplankung die kahlsten Flaechen des ganzen Schiffs.
    for tag, sx in SIDES:
        x = sx * (HEAD_W + 0.011)
        b.boxes(f'SM_Plate_Head{tag}', 'Hull_Panel', [
            ((x, 1.85, 1.95), (0.022, 0.86, 0.90)),
            ((x, 1.85, 2.62), (0.022, 0.86, 0.36)),
            ((x, 0.95, 2.28), (0.022, 0.80, 1.36)),
            ((x, 0.12, 1.95), (0.022, 0.60, 0.90)),
        ], bevel=0.005)
        b.boxes(f'SM_Plate_Head{tag}_Trim', 'Metal_Bare', [
            ((sx * (HEAD_W + 0.02), 1.40, 2.15), (0.05, 0.07, 1.40)),
            ((sx * (HEAD_W + 0.02), 2.30, 2.15), (0.05, 0.09, 1.40)),
        ], bevel=0.005)

        # Holme unter der Kanzel: Bleche, Griffleiste, Tankstutzen.
        xf = sx * 1.80
        b.boxes(f'SM_Plate_Fore{tag}', 'Hull_Panel', [
            ((xf, 0.52, 3.32), (0.022, 0.82, 0.76)),
            ((sx * 1.72, 0.48, 4.10), (0.022, 0.74, 0.64)),
        ], bevel=0.005)
        b.box(f'SM_Fore_Rub{tag}', 'Rubber_Black', (sx * 1.86, 0.86, 3.40),
              (0.06, 0.09, 1.00))
        b.cylinder(f'SM_Fore_Fill{tag}', 'Metal_Bare', (sx * 1.80, 0.30, 3.10), 0.10, 0.10,
                   axis='x')

        # Registriernummer klein auf dem Cockpitkasten — dort, wo sie im
        # Seitenriss frei steht und nicht hinter der Gondel verschwindet.
        cell = 0.055
        span = (4 * 6 - 1) * cell
        b.boxes(f'SM_RegHead_{tag}', 'Marking',
                glyph_boxes('PV-114', (sx * (HEAD_W + 0.024), 2.06, 2.16 + sx * span / 2),
                            cell, sx),
                bevel=0.003)

    # --- Sensorpod backbord, Suchscheinwerfer steuerbord: die Asymmetrie, die
    # ein gebautes Schiff von einem gespiegelten Modell unterscheidet.
    b.box('SM_Pod_Sensor', 'Metal_Dark', (PORT * 1.20, DECK_Y + 0.10, 3.30), (0.34, 0.26, 0.72))
    b.cylinder('SM_Pod_Sensor_Lens', 'Glass', (PORT * 1.20, DECK_Y + 0.12, 3.68), 0.10, 0.06)
    b.box('SM_Pod_Lamp_Arm', 'Metal_Bare', (STAR * 1.24, DECK_Y + 0.10, 3.55), (0.10, 0.22, 0.10))
    b.cylinder('SM_Pod_Lamp', 'Metal_Dark', (STAR * 1.24, DECK_Y + 0.26, 3.55), 0.16, 0.26)
    b.cylinder('SM_Pod_Lamp_Lens', 'Lamp_White', (STAR * 1.24, DECK_Y + 0.26, 3.69), 0.13, 0.04)

    # --- Rostspuren: duenne Bleche in Rostfarbe unter Luken und Duesen. Nur
    # steuerbord — Verschleiss ist nie symmetrisch.
    b.boxes('SM_Rust_Streaks', 'Metal_Rust', [
        ((STAR * (BODY_W + 0.006), 0.95, -5.20), (0.012, 1.20, 0.26)),
        ((STAR * (BODY_W + 0.006), 1.60, -2.85), (0.012, 0.80, 0.16)),
        ((0.62, BODY_TOP + 0.006, -5.10), (0.30, 0.012, 0.70)),
        ((PORT * (BODY_W + 0.006), 0.35, -3.30), (0.012, 0.70, 0.20)),
    ], bevel=0.004)

    # --- RCS-Cluster an den vier Ecken.
    for tag, sx in SIDES:
        for i, (z, y) in enumerate(((-6.10, 2.35), (4.55, 0.55))):
            w = BODY_W if z < 0 else 1.44
            b.box(f'SM_Rcs_{tag}{i}', 'Metal_Dark', (sx * (w + 0.01), y, z), (0.06, 0.30, 0.44))
            b.boxes(f'SM_Rcs_{tag}{i}_Jets', 'Metal_Bare',
                    [((sx * (w + 0.05), y, z + dz), (0.05, 0.16, 0.16)) for dz in (-0.11, 0.11)],
                    bevel=0.005)


# ---------------------------------------------------------------- Markierung

# 3x5-Pixelschrift. Mehr Zeichen braucht die Registriernummer nicht, und eine
# echte Schrift waere im Generator ein Fremdkoerper.
GLYPHS = {
    'P': ('111', '101', '111', '100', '100'),
    'V': ('101', '101', '101', '101', '010'),
    'C': ('111', '100', '100', '100', '111'),
    'K': ('101', '110', '100', '110', '101'),
    '-': ('000', '000', '111', '000', '000'),
    '0': ('111', '101', '101', '101', '111'),
    '1': ('010', '110', '010', '010', '111'),
    '4': ('101', '101', '111', '001', '001'),
    '7': ('111', '001', '010', '010', '010'),
}


def glyph_boxes(text, origin, cell, sx, thickness=0.014):
    """
    Beschriftung als Pixelkaesten auf einer x-Flanke.

    `origin` ist die obere, in Leserichtung erste Ecke; `sx` gibt die Flanke an.
    Die Laufrichtung haengt davon ab: von aussen betrachtet zeigt die Leserichtung
    auf der +X-Flanke nach -Z und auf der -X-Flanke nach +Z.
    """
    x0, y0, z0 = origin
    step = -sx * cell
    items = []
    column = 0
    for char in text:
        rows = GLYPHS.get(char)
        if rows is None:
            column += 2
            continue
        for r, row in enumerate(rows):
            for c, on in enumerate(row):
                if on != '1':
                    continue
                items.append((
                    (x0, y0 - (r + 0.5) * cell, z0 + step * (column + c + 0.5)),
                    (thickness, cell * 0.98, cell * 0.98),
                ))
        column += 4
    return items


def build_markings(b):
    """Warnanstriche, Registriernummer, Streifen."""
    # --- Registriernummer auf beiden Flanken, dazu ein aufgemaltes Feld.
    # Die Laufrichtung dreht sich mit der Flanke (siehe glyph_boxes), der
    # Startpunkt muss deshalb mitwandern, damit der Text beidseitig gleich sitzt.
    text, cell, center = 'PV-114', 0.09, -2.99
    span = (4 * len(text) - 1) * cell
    for tag, sx in SIDES:
        b.box(f'SM_Reg_{tag}_Patch', 'Hull_Olive',
              (sx * (BODY_W + 0.012), 1.75, center), (0.014, 0.66, span + 0.24))
        b.boxes(f'SM_Reg_{tag}', 'Marking',
                glyph_boxes(text, (sx * (BODY_W + 0.024), 1.98, center + sx * span / 2),
                            cell, sx),
                bevel=0.003)

    # --- Warnstreifen um die Duesen und an der Frachtluke.
    hazard = []
    for _, sx in SIDES:
        cx = sx * NAC_X
        for i in range(10):
            a = i * pi / 5 + pi / 10
            hazard.append(((cx + cos(a) * 0.86, NAC_Y + sin(a) * 0.86, -6.98),
                           (0.10, 0.10, 0.16)))
    for sz in (-1, 1):
        hazard.append(((0, BODY_TOP + 0.055, -3.70 + sz * 1.18), (2.24, 0.02, 0.12)))
    hazard.append(((0, BODY_BOT - 0.055, -1.92), (2.20, 0.02, 0.12)))
    for _, sx in SIDES:
        hazard.append(((sx * (BODY_W + 0.012), 2.32, -1.95), (0.014, 0.10, 1.14)))
        hazard.append(((sx * (BODY_W + 0.012), 0.02, -1.95), (0.014, 0.10, 1.14)))
    b.boxes('SM_Hazard', 'Hazard', hazard, bevel=0.005)

    # --- Bugstreifen: ein Farbband ueber Nase und Kanzelrahmen.
    b.boxes('SM_Stripe_Fore', 'Hull_Olive', [
        ((0, 1.14, 5.42), (1.30, 0.10, 0.60)),
        ((PORT * 1.62, DECK_Y + 0.04, 3.90), (0.30, 0.014, 1.90)),
        ((STAR * 1.62, DECK_Y + 0.04, 3.90), (0.30, 0.014, 1.90)),
    ], bevel=0.005)

    # --- Kleine Beschriftung auf der Backbordgondel.
    label, cell = 'CK7', 0.07
    span = (4 * len(label) - 1) * cell
    b.boxes('SM_Label_Nac', 'Marking',
            glyph_boxes(label, (PORT * (NAC_X + 0.83), 1.62, -4.30 + span / 2), cell, PORT),
            bevel=0.003)


# ---------------------------------------------------------- Positionslichter

def build_lights(b):
    """
    Positionslichter mit Gehaeuse: rot backbord, gruen steuerbord, weisse
    Blitzer oben, unten und am Heck. Das Blinken macht die Laufzeit; hier
    entstehen nur Gehaeuse, Linsen und die Marker dafuer.
    """
    lamps = [
        # (Name, Material, Position, Groesse, Markername, Glutradius)
        # Die Navigationslichter sitzen auf den Gondelflanken, dem breitesten
        # Punkt des Schiffs — dort erfuellen sie ihren Zweck und markieren
        # gleichzeitig die Spannweite.
        ('NavPort', 'Lamp_Red', (PORT * (NAC_X + 0.84), NAC_Y + 0.22, -3.90),
         (0.16, 0.14, 0.24), 'Nav_Port', 0.16),
        ('NavStar', 'Lamp_Green', (STAR * (NAC_X + 0.84), NAC_Y + 0.22, -3.90),
         (0.16, 0.14, 0.24), 'Nav_Star', 0.16),
        ('BeaconTop', 'Lamp_White', (0, BODY_TOP + 0.12, -1.62), (0.20, 0.14, 0.20),
         'Beacon_Top', 0.14),
        ('BeaconBelly', 'Lamp_White', (0, BODY_BOT - 0.12, -2.10), (0.20, 0.14, 0.20),
         'Beacon_Belly', 0.14),
        ('BeaconTail', 'Lamp_White', (0, TAIL_TOP + 0.10, -7.30), (0.18, 0.14, 0.18),
         'Beacon_Tail', 0.12),
    ]
    for name, material, position, size, marker, radius in lamps:
        housing = (position[0], position[1] - size[1] * 0.35, position[2])
        b.box(f'SM_Lamp_{name}_Housing', 'Metal_Dark', housing,
              (size[0] + 0.06, size[1], size[2] + 0.06))
        b.box(f'SM_Lamp_{name}', material, position, size)
        b.marker(marker, position, radius)

    # Formationslichter: schwache Streifen entlang der Gondeln.
    for tag, sx in SIDES:
        b.boxes(f'SM_Form_{tag}', 'Lamp_White',
                [((sx * (NAC_X + 0.85), NAC_Y + 0.40, z), (0.02, 0.05, 0.40))
                 for z in (-4.60, -5.90)], bevel=0.004)

    # Muendungsmarker der Triebwerke. Die Skalierung transportiert den Radius
    # der Glut; die Laufzeit haengt Flammen und Leuchtscheiben daran auf.
    b.marker('Thruster_0', (PORT * NAC_X, NAC_Y, -7.46), 0.62)
    b.marker('Thruster_1', (STAR * NAC_X, NAC_Y, -7.46), 0.62)
    b.marker('Thruster_2', (PORT * 0.82, 1.28, TAIL_BACK - 0.30), 0.34)
    b.marker('Thruster_3', (STAR * 0.82, 1.28, TAIL_BACK - 0.30), 0.34)


# ------------------------------------------------------------------- Aufbau

def finish_geometry(b):
    """
    Verschmelzen, fasen, weich schattieren — alles ueber bmesh statt ueber
    Operatoren: `modifier_apply` haengt am UI-Kontext und scheitert im Skript.

    Die Fasenbreite haengt an der kleinsten Abmessung des Teils, ausser das
    Objekt hat in `Builder.bevel` einen eigenen Wert (zusammengefasste Meshes
    kennen ihre Teilgroessen sonst nicht mehr).
    """
    for obj in list(bpy.data.objects):
        if obj.type != 'MESH' or not obj.name.startswith('SM_'):
            continue

        override = b.bevel.get(obj.name)
        if override is None:
            dims = tuple(obj.dimensions)
            width = min(0.020, max(min(dims) * 0.10, 0.001)) if min(dims) > 1e-4 else 0.0
        else:
            width = override

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


def export(path):
    """
    Export nach GLB. Der glTF-Exporter greift auf `bpy.context.active_object`
    zu; aus dem Skript heraus ist der Kontext eingeschraenkt. Im Hintergrund
    gibt es kein Fenster fuer einen vollen Override — dann reicht es, ein
    aktives Objekt zu setzen.
    """
    meshes = [o for o in bpy.data.objects if o.type == 'MESH']
    bpy.context.view_layer.objects.active = meshes[0]
    meshes[0].select_set(True)

    options = dict(
        filepath=path, export_format='GLB', use_selection=False, export_apply=True,
        export_cameras=False, export_lights=False, export_extras=False, export_yup=True,
    )
    windows = getattr(bpy.context.window_manager, 'windows', None)
    if windows:
        window = windows[0]
        with bpy.context.temp_override(window=window, screen=window.screen,
                                       active_object=meshes[0], object=meshes[0],
                                       selected_objects=[meshes[0]]):
            bpy.ops.export_scene.gltf(**options)
    else:
        bpy.ops.export_scene.gltf(**options)


def build():
    bpy.ops.wm.read_homefile(use_empty=True)
    materials = build_materials()
    b = Builder(materials)
    b.setup()

    build_hull(b)
    build_stern(b)
    build_radiators(b)
    build_fore(b)
    build_canopy(b)
    build_nacelles(b)
    build_dorsal(b)
    build_belly(b)
    build_plating(b)
    build_markings(b)
    build_lights(b)

    finish_geometry(b)
    export(OUTPUT)

    tris = 0
    for obj in bpy.data.objects:
        if obj.type == 'MESH':
            obj.data.calc_loop_triangles()
            tris += len(obj.data.loop_triangles)
    return {'objects': len(bpy.data.objects), 'triangles': tris, 'output': OUTPUT}


RESULT = build()
print('BUILD', RESULT)
