import { describe, expect, it, vi } from 'vitest';
import { CargoError, CargoHold, EMPTY_SHIP_MASS } from './CargoHold';
import { GOODS, GOOD_IDS, isGoodId, tonsPerUnit, unitCount } from './CargoGoods';
import { applyCargoMass, trackCargoMass } from './CargoMass';

describe('Warenkatalog', () => {
  it('kennt die zehn Warenarten und erkennt Fremdes', () => {
    expect(GOOD_IDS).toHaveLength(10);
    expect(isGoodId('ore')).toBe(true);
    // Aus dem Bergbau, siehe world/AsteroidTypes.ts.
    expect(isGoodId('platinum')).toBe(true);
    expect(isGoodId('plutonium')).toBe(false);
  });

  it('gibt jeder Ware ein eigenes Kuerzel', () => {
    const codes = GOOD_IDS.map((id) => GOODS[id].code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('staut Erz dichter als Elektronik', () => {
    expect(tonsPerUnit(GOODS.ore)).toBeGreaterThan(tonsPerUnit(GOODS.electronics));
  });

  it('zaehlt angebrochene Gebinde voll, aber nicht wegen Fliesskommaresten', () => {
    const perUnit = tonsPerUnit(GOODS.food);
    expect(unitCount(GOODS.food, 0)).toBe(0);
    expect(unitCount(GOODS.food, perUnit)).toBe(1);
    expect(unitCount(GOODS.food, perUnit + 0.0001)).toBe(2);
    expect(unitCount(GOODS.food, perUnit * 3)).toBe(3);
  });
});

describe('CargoHold — Manifest', () => {
  it('startet leer und voll verfuegbar', () => {
    const hold = new CargoHold();
    expect(hold.getManifest()).toEqual([]);
    expect(hold.getUsedCapacity()).toBe(0);
    expect(hold.getFreeCapacity()).toBe(hold.getCapacity());
    expect(hold.getLoadFactor()).toBe(0);
  });

  it('fasst Nachladungen derselben Ware zu einem Posten zusammen', () => {
    const hold = new CargoHold();
    hold.add('ore', 4, 20);
    hold.add('ore', 6, 30);
    const manifest = hold.getManifest();
    expect(manifest).toHaveLength(1);
    expect(manifest[0].tons).toBeCloseTo(10);
    // Mengengewichtet: (4*20 + 6*30) / 10
    expect(manifest[0].avgPrice).toBeCloseTo(26);
  });

  it('behaelt die Ladereihenfolge', () => {
    const hold = new CargoHold();
    hold.add('water', 2);
    hold.add('ore', 2);
    hold.add('food', 2);
    expect(hold.getManifest().map((lot) => lot.good)).toEqual(['water', 'ore', 'food']);
  });

  it('laesst den Durchschnittspreis beim Teilverkauf unveraendert', () => {
    const hold = new CargoHold();
    hold.add('parts', 10, 50);
    hold.remove('parts', 4);
    expect(hold.getAveragePrice('parts')).toBeCloseTo(50);
    expect(hold.getTons('parts')).toBeCloseTo(6);
  });

  it('loescht leergeraeumte Posten aus dem Manifest', () => {
    const hold = new CargoHold();
    hold.add('food', 3);
    hold.remove('food', 3);
    expect(hold.getManifest()).toEqual([]);
    expect(hold.getTons('food')).toBe(0);
  });
});

describe('CargoHold — Kapazitaet', () => {
  it('nennt beim Ueberladen freie und angeforderte Menge', () => {
    const hold = new CargoHold({ capacity: 40 });
    hold.add('ore', 36);
    const problem = hold.checkAdd('ore', 8);
    expect(problem).toContain('4');
    expect(problem).toContain('8');
    expect(hold.canAdd('ore', 8)).toBe(false);
    expect(hold.canAdd('ore', 4)).toBe(true);
    expect(() => hold.add('ore', 8)).toThrow(CargoError);
    // Der gescheiterte Versuch darf nichts veraendert haben.
    expect(hold.getUsedCapacity()).toBeCloseTo(36);
  });

  it('weist Mengen kleiner gleich null zurueck', () => {
    const hold = new CargoHold();
    expect(hold.canAdd('ore', 0)).toBe(false);
    expect(hold.canAdd('ore', -2)).toBe(false);
    expect(() => hold.remove('ore', 0)).toThrow(CargoError);
  });

  it('nennt beim Abladen die vorhandene Menge', () => {
    const hold = new CargoHold();
    hold.add('water', 3);
    expect(hold.checkRemove('water', 5)).toContain('Wasser');
    expect(() => hold.remove('water', 5)).toThrow(CargoError);
    expect(hold.getTons('water')).toBeCloseTo(3);
  });

  it('laesst sich exakt bis an die Kapazitaetsgrenze fuellen', () => {
    const hold = new CargoHold({ capacity: 40 });
    hold.add('ore', 25);
    hold.add('electronics', 15);
    expect(hold.getFreeCapacity()).toBeCloseTo(0);
    expect(hold.getLoadFactor()).toBeCloseTo(1);
    expect(hold.canAdd('food', 0.5)).toBe(false);
  });

  it('sammelt keine Fliesskommareste aus Teilverkaeufen an', () => {
    const hold = new CargoHold();
    hold.add('food', 10);
    for (let i = 0; i < 30; i++) hold.remove('food', 1 / 3);
    expect(hold.getTons('food')).toBeCloseTo(0, 3);
  });
});

describe('CargoHold — Handel', () => {
  it('bucht Credits beim Kaufen und Verkaufen', () => {
    const hold = new CargoHold({ credits: 1000 });
    const cost = hold.buy('ore', 10, 20);
    expect(cost).toBe(200);
    expect(hold.getCredits()).toBe(800);

    const proceeds = hold.sell('ore', 10, 35);
    expect(proceeds).toBe(350);
    expect(hold.getCredits()).toBe(1150);
    expect(hold.getTons('ore')).toBe(0);
  });

  it('verweigert den Kauf bei zu wenig Guthaben, ohne etwas zu buchen', () => {
    const hold = new CargoHold({ credits: 100 });
    expect(() => hold.buy('electronics', 5, 118)).toThrow(/Guthaben/);
    expect(hold.getCredits()).toBe(100);
    expect(hold.getTons('electronics')).toBe(0);
  });

  it('prueft beim Kauf zuerst die Kapazitaet', () => {
    const hold = new CargoHold({ capacity: 5, credits: 1_000_000 });
    expect(() => hold.buy('ore', 10, 1)).toThrow(/Laderaum voll/);
    expect(hold.getCredits()).toBe(1_000_000);
  });

  it('nimmt ohne Preisangabe den Richtpreis der Ware', () => {
    const hold = new CargoHold({ credits: 10_000 });
    hold.buy('food', 2);
    expect(hold.getCredits()).toBe(10_000 - 2 * GOODS.food.basePrice);
    expect(hold.getAveragePrice('food')).toBeCloseTo(GOODS.food.basePrice);
  });
});

describe('CargoHold — Masse', () => {
  it('rechnet Tonnage in Schiffsmasse um', () => {
    const hold = new CargoHold();
    expect(hold.getShipMass()).toBe(EMPTY_SHIP_MASS);
    hold.add('ore', 12);
    expect(hold.getCargoMass()).toBeCloseTo(12_000);
    expect(hold.getShipMass()).toBeCloseTo(EMPTY_SHIP_MASS + 12_000);
    expect(hold.getShipMass(20_000)).toBeCloseTo(32_000);
  });

  it('macht volle Ladung deutlich schwerer als leere', () => {
    const empty = new CargoHold();
    const full = new CargoHold();
    full.add('ore', full.getCapacity());
    expect(full.getShipMass() / empty.getShipMass()).toBeGreaterThan(2);
  });
});

describe('CargoHold — Ereignis', () => {
  it('meldet jede Aenderung und laesst sich abmelden', () => {
    const hold = new CargoHold();
    const listener = vi.fn();
    const off = hold.onChange(listener);

    hold.add('ore', 1);
    hold.remove('ore', 1);
    hold.setCredits(5);
    expect(listener).toHaveBeenCalledTimes(3);

    off();
    hold.add('ore', 1);
    expect(listener).toHaveBeenCalledTimes(3);
  });

  it('meldet nichts, wenn eine Operation scheitert', () => {
    const hold = new CargoHold({ capacity: 2 });
    const listener = vi.fn();
    hold.onChange(listener);
    expect(() => hold.add('ore', 10)).toThrow();
    expect(listener).not.toHaveBeenCalled();
  });

  it('meldet nichts beim Leeren eines leeren Laderaums', () => {
    const hold = new CargoHold();
    const listener = vi.fn();
    hold.onChange(listener);
    hold.clear();
    expect(listener).not.toHaveBeenCalled();
  });
});

describe('Masseneinfluss aufs Flugmodell', () => {
  /** Genauso fuehrt das FlightModel seine Kennwerte: ein Objekt, live gelesen. */
  function fakeFlightModel(mass = EMPTY_SHIP_MASS) {
    const params = { mass, mainThrust: 120_000 };
    return { params, getParams: () => params };
  }

  it('setzt die Masse auf Leermasse plus Ladung', () => {
    const hold = new CargoHold();
    const flight = fakeFlightModel();
    hold.add('ore', 20);

    expect(applyCargoMass(flight, hold)).toBe(35_000);
    expect(flight.params.mass).toBe(35_000);
  });

  it('fuehrt die Masse bei jeder Manifestaenderung nach', () => {
    const hold = new CargoHold();
    const flight = fakeFlightModel();
    const stop = trackCargoMass(flight, hold);

    expect(flight.params.mass).toBe(EMPTY_SHIP_MASS);
    hold.add('food', 10);
    expect(flight.params.mass).toBe(25_000);
    hold.remove('food', 10);
    expect(flight.params.mass).toBe(EMPTY_SHIP_MASS);

    stop();
    hold.add('food', 10);
    expect(flight.params.mass).toBe(EMPTY_SHIP_MASS);
  });

  it('macht die Laengsbeschleunigung bei voller Ladung deutlich kleiner', () => {
    const hold = new CargoHold();
    const flight = fakeFlightModel();
    const empty = flight.params.mainThrust / flight.getParams().mass;

    hold.add('ore', hold.getCapacity());
    applyCargoMass(flight, hold);
    const laden = flight.params.mainThrust / flight.getParams().mass;

    expect(laden).toBeLessThan(empty * 0.5);
  });
});
