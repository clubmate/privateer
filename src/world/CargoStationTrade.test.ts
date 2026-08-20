import { beforeEach, describe, expect, it } from 'vitest';
import { CargoHold } from '../cargo/CargoHold';
import { buyPriceOf, createCargoStationTrade, sellPriceOf } from './CargoStationTrade';
import type { StationTrade } from './StationTrade';

describe('CargoStationTrade', () => {
  let hold: CargoHold;
  let hull: number;
  let trade: StationTrade;

  beforeEach(() => {
    hold = new CargoHold({ capacity: 40, credits: 5000 });
    hull = 1;
    trade = createCargoStationTrade({
      hold,
      getHull: () => hull,
      setHull: (value) => {
        hull = value;
      },
    });
  });

  it('zeigt Laderaum und Guthaben des echten Laderaums', () => {
    hold.add('ore', 6);
    expect(trade.getCapacity()).toEqual({ used: 6, total: 40 });
    expect(trade.getCredits()).toBe(5000);
  });

  it('handelt nur Waren, die als Kiste im Frachtraum stehen koennen', () => {
    const ids = trade.getGoods().map((g) => g.id);
    expect(ids).toContain('electronics');
    // Die Attrappe handelte Waren, die der Laderaum nicht kennt.
    expect(ids).not.toContain('meds');
    expect(ids).not.toContain('lux');
  });

  it('verlangt beim Kauf mehr, als es beim Verkauf zahlt', () => {
    expect(buyPriceOf('parts')).toBeGreaterThan(sellPriceOf('parts'));
  });

  it('legt gekaufte Ware in den Laderaum und bucht Credits ab', () => {
    const result = trade.buy('ore', 5);
    expect(result.ok).toBe(true);
    expect(hold.getTons('ore')).toBe(5);
    expect(hold.getCredits()).toBe(5000 - buyPriceOf('ore') * 5);
  });

  it('zieht gekaufte Ware vom Vorrat der Station ab', () => {
    const before = trade.getGoods().find((g) => g.id === 'ore')!.stock;
    trade.buy('ore', 5);
    expect(trade.getGoods().find((g) => g.id === 'ore')!.stock).toBe(before - 5);
  });

  it('verweigert mehr, als die Station vorraetig hat', () => {
    const stock = trade.getGoods().find((g) => g.id === 'contraband')!.stock;
    const result = trade.buy('contraband', stock + 1);
    expect(result.ok).toBe(false);
    expect(result.message).toContain('VORRAETIG');
    expect(hold.getTons('contraband')).toBe(0);
  });

  it('verweigert, was nicht in den Laderaum passt, und aendert nichts', () => {
    hold.add('ore', 38);
    const credits = hold.getCredits();
    const result = trade.buy('ore', 5);
    expect(result.ok).toBe(false);
    expect(hold.getTons('ore')).toBe(38);
    expect(hold.getCredits()).toBe(credits);
  });

  it('verweigert Kauf ohne Guthaben, ohne Ware zu bewegen', () => {
    hold.setCredits(10);
    const result = trade.buy('parts', 5);
    expect(result.ok).toBe(false);
    expect(hold.getTons('parts')).toBe(0);
    expect(hold.getCredits()).toBe(10);
  });

  it('nimmt verkaufte Ware aus dem Laderaum und schreibt gut', () => {
    hold.add('water', 8);
    const credits = hold.getCredits();
    const result = trade.sell('water', 3);
    expect(result.ok).toBe(true);
    expect(hold.getTons('water')).toBe(5);
    expect(hold.getCredits()).toBe(credits + sellPriceOf('water') * 3);
  });

  it('verweigert den Verkauf von Ware, die nicht an Bord ist', () => {
    const result = trade.sell('food', 2);
    expect(result.ok).toBe(false);
    expect(hold.getCredits()).toBe(5000);
  });

  it('weist unbekannte Waren und unsinnige Mengen ab', () => {
    expect(trade.buy('unobtainium', 1).ok).toBe(false);
    expect(trade.buy('ore', 0).ok).toBe(false);
    expect(trade.buy('ore', -3).ok).toBe(false);
  });

  it('meldet das Manifest mit Anzeigenamen der geladenen Ware', () => {
    hold.add('ore', 4, 30);
    const entry = trade.getManifest().find((e) => e.id === 'ore');
    expect(entry).toMatchObject({ tons: 4, averagePrice: 30 });
    expect(entry!.name).toBe(entry!.name.toUpperCase());
  });

  it('repariert die echte Huelle und kostet nach Schadenshoehe', () => {
    hull = 0.5;
    const price = trade.getServices().find((s) => s.id === 'hull')!.price;
    expect(price).toBeGreaterThan(0);

    const result = trade.useService('hull');
    expect(result.ok).toBe(true);
    expect(hull).toBe(1);
    expect(hold.getCredits()).toBe(5000 - price);
  });

  it('repariert nicht auf Pump', () => {
    hull = 0.2;
    hold.setCredits(5);
    expect(trade.useService('hull').ok).toBe(false);
    expect(hull).toBe(0.2);
  });

  it('meldet Vollzug statt Rechnung, wenn nichts zu tun ist', () => {
    const result = trade.useService('hull');
    expect(result.ok).toBe(false);
    expect(hold.getCredits()).toBe(5000);
  });

  it('kennt Treibstoff und Munition als Dienste', () => {
    expect(trade.getServices().map((s) => s.id)).toEqual(['hull', 'fuel', 'ammo']);
    expect(trade.useService('fuel').ok).toBe(true);
    expect(trade.getServices().find((s) => s.id === 'fuel')!.level).toBe(1);
  });

  it('weist unbekannte Dienste ab', () => {
    expect(trade.useService('warp').ok).toBe(false);
  });
});
