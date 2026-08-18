import {
  BackSide,
  BoxGeometry,
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Scene,
} from 'three';

/**
 * Kleine Ersatzumgebung fuer die Reflexionen im Schiffsinneren.
 *
 * Die Innenraummaterialien sind stark metallisch (metalness 0,75–0,92). Metalle
 * haben keinen diffusen Anteil — ohne etwas zum Spiegeln bleiben sie schwarz.
 * Ein helles Studio-Environment (z. B. `RoomEnvironment`) macht sie dagegen
 * hellgrau wie Plastik. Deshalb hier eine dunkle Kammer mit ein paar warmen
 * Deckenstreifen und einem kalten Konsolenschimmer: Metall bleibt dunkel und
 * bekommt trotzdem Kanten und Glanzlichter.
 *
 * Wird einmal per `PMREMGenerator.fromScene()` gebacken; die Farben sind
 * lineare Werte und duerfen ueber 1 liegen (Lichtquellen).
 */
export function createInteriorEnvironment(): Scene {
  const scene = new Scene();

  const panel = (
    width: number,
    height: number,
    color: Color,
    position: [number, number, number],
    rotation: [number, number, number],
  ): Mesh => {
    const mesh = new Mesh(
      new PlaneGeometry(width, height),
      new MeshBasicMaterial({ color, side: DoubleSide }),
    );
    mesh.position.set(position[0], position[1], position[2]);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    return mesh;
  };

  // Dunkle Huelle — das Grundniveau der Reflexion.
  const shell = new Mesh(
    new BoxGeometry(8, 5, 11),
    new MeshBasicMaterial({ color: new Color(0.035, 0.04, 0.05), side: BackSide }),
  );
  scene.add(shell);

  // Boden: noch dunkler, damit Reflexionen nach unten hin abfallen.
  scene.add(panel(8, 11, new Color(0.015, 0.016, 0.02), [0, -2.45, 0], [-Math.PI / 2, 0, 0]));

  // Warme Deckenstreifen (die Leuchtbaender des Schiffs).
  for (const x of [-1.7, 1.7]) {
    scene.add(panel(0.7, 8, new Color(1.35, 1.15, 0.9), [x, 2.45, 0], [Math.PI / 2, 0, 0]));
  }

  // Kalter Schimmer der Cockpitkonsole nach vorn, matter Rueckwandanteil hinten.
  scene.add(panel(3.4, 1.4, new Color(0.22, 0.5, 0.85), [0, -0.2, -5.4], [0, 0, 0]));
  scene.add(panel(3.4, 1.6, new Color(0.09, 0.08, 0.07), [0, 0.4, 5.4], [0, 0, 0]));

  return scene;
}
