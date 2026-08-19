import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Alle Tests laufen kopflos in Node: getestet wird Logik (Flugmodell,
    // Trefferaufloesung, Zielrechnung), nicht das Zeichnen. Module, die ein
    // Canvas oder WebGL brauchen, bleiben deshalb bewusst aussen vor.
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
