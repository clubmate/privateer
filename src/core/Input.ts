/**
 * Tastatur-/Maus-State. Tasten werden ueber `event.code` (physische Position)
 * abgefragt, damit QWERTZ und QWERTY identisch funktionieren.
 */
export class Input {
  private readonly held = new Set<string>();
  private readonly pressed = new Set<string>();
  private readonly released = new Set<string>();

  /** Aufsummierte Mausbewegung seit dem letzten `consumeMouseDelta()`. */
  private mouseDX = 0;
  private mouseDY = 0;

  private readonly buttons = new Set<number>();
  /** Maustasten, die in diesem Bild heruntergedrueckt wurden. */
  private readonly buttonsPressed = new Set<number>();
  private locked = false;

  constructor(private readonly target: HTMLElement) {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('contextmenu', this.onContextMenu);
    document.addEventListener('pointerlockchange', this.onPointerLockChange);
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('contextmenu', this.onContextMenu);
    document.removeEventListener('pointerlockchange', this.onPointerLockChange);
  }

  /** Taste ist aktuell gedrueckt. */
  isDown(code: string): boolean {
    return this.held.has(code);
  }

  /** Taste wurde in diesem Frame heruntergedrueckt (bis `endFrame()`). */
  wasPressed(code: string): boolean {
    return this.pressed.has(code);
  }

  /** Taste wurde in diesem Frame losgelassen (bis `endFrame()`). */
  wasReleased(code: string): boolean {
    return this.released.has(code);
  }

  isMouseDown(button = 0): boolean {
    return this.buttons.has(button);
  }

  /**
   * Maustaste wurde in diesem Bild heruntergedrueckt (bis `endFrame()`).
   * Flanke, kein Pegel — zum Erfassen eines Ziels taugt nur der Moment des
   * Druckes, sonst wuerde bei gehaltener Taste je Bild neu erfasst.
   */
  wasMousePressed(button = 0): boolean {
    return this.buttonsPressed.has(button);
  }

  get pointerLocked(): boolean {
    return this.locked;
  }

  /** Liefert die aufsummierte Mausbewegung und setzt sie zurueck. */
  consumeMouseDelta(out: { x: number; y: number }): { x: number; y: number } {
    out.x = this.mouseDX;
    out.y = this.mouseDY;
    this.mouseDX = 0;
    this.mouseDY = 0;
    return out;
  }

  requestPointerLock(): void {
    if (this.locked) return;
    // Gibt in aktuellen Browsern ein Promise zurueck, das z. B. ohne
    // Nutzergeste oder in Headless-Umgebungen rejected — nicht weiterwerfen.
    const pending = this.target.requestPointerLock() as unknown as Promise<void> | undefined;
    if (pending && typeof pending.catch === 'function') pending.catch(() => {});
  }

  exitPointerLock(): void {
    if (this.locked) document.exitPointerLock();
  }

  /** Am Ende jedes Frames aufrufen: Flanken zuruecksetzen. */
  endFrame(): void {
    this.pressed.clear();
    this.released.clear();
    this.buttonsPressed.clear();
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    if (!e.repeat) {
      this.held.add(e.code);
      this.pressed.add(e.code);
    }
    // Tab wird als Afterburner gebraucht, nicht zum Fokuswechsel.
    if (e.code === 'Tab') e.preventDefault();
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    this.held.delete(e.code);
    this.released.add(e.code);
  };

  private onBlur = (): void => {
    this.held.clear();
    this.buttons.clear();
    this.buttonsPressed.clear();
    this.mouseDX = 0;
    this.mouseDY = 0;
  };

  private onMouseMove = (e: MouseEvent): void => {
    if (!this.locked) return;
    this.mouseDX += e.movementX;
    this.mouseDY += e.movementY;
  };

  private onMouseDown = (e: MouseEvent): void => {
    if (!this.buttons.has(e.button)) this.buttonsPressed.add(e.button);
    this.buttons.add(e.button);
  };

  /**
   * Kein Kontextmenue: die rechte Maustaste erfasst Ziele. Bei gefangenem
   * Zeiger unterdrueckt der Browser es ohnehin — ohne diese Zeile poppte es
   * aber auf, sobald der Zeiger frei ist (Stationsmenue, Pause).
   */
  private onContextMenu = (e: MouseEvent): void => {
    e.preventDefault();
  };

  private onMouseUp = (e: MouseEvent): void => {
    this.buttons.delete(e.button);
  };

  private onPointerLockChange = (): void => {
    this.locked = document.pointerLockElement === this.target;
    if (!this.locked) {
      this.mouseDX = 0;
      this.mouseDY = 0;
    }
  };
}
