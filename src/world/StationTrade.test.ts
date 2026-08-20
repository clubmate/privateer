import { describe, expect, it } from 'vitest';
import { createStationTradeStub } from './StationTrade';

describe('StationTrade — Attrappe', () => {
  it('faengt mit Credits, Laderaum und etwas Fracht an', () => {
    const trade = createStationTradeStub();
    expect(trade.getCredits()).toBeGreaterThan(0);
    const capacity = trade.getCapacity();
    expect(capacity.total).toBeGreaterThan(capacity.used);
    expect(trade.getManifest().length).toBeGreaterThan(0);
  });

  it('bucht einen Kauf auf Credits, Bestand und Laderaum', () => {
    const trade = createStationTradeStub({ credits: 10_000, capacity: 40 });
    const good = trade.getGoods().find((g) => g.id === 'ore')!;
    const before = { credits: trade.getCredits(), used: trade.getCapacity().used };

    const result = trade.buy('ore', 5);
    expect(result.ok).toBe(true);
    expect(trade.getCredits()).toBe(before.credits - good.buyPrice * 5);
    expect(trade.getCapacity().used).toBe(before.used + 5);
    expect(trade.getManifest().find((e) => e.id === 'ore')?.tons).toBe(5);
  });

  it('verkauft zurueck und weist den Verlust der Spanne aus', () => {
    const trade = createStationTradeStub({ credits: 10_000 });
    trade.buy('ore', 4);
    const afterBuy = trade.getCredits();

    const result = trade.sell('ore', 4);
    expect(result.ok).toBe(true);
    expect(trade.getCredits()).toBeGreaterThan(afterBuy);
    // Die Station kauft billiger ein, als sie verkauft — unterm Strich Verlust.
    expect(trade.getCredits()).toBeLessThan(10_000);
    expect(trade.getManifest().find((e) => e.id === 'ore')).toBeUndefined();
  });

  it('laesst den Laderaum nicht ueberlaufen', () => {
    const trade = createStationTradeStub({ credits: 1_000_000, capacity: 10 });
    const result = trade.buy('water', 50);
    expect(result.ok).toBe(false);
    expect(result.message).toContain('LADERAUM');
    expect(trade.getCapacity().used).toBeLessThanOrEqual(10);
  });

  it('kauft nicht auf Pump', () => {
    const trade = createStationTradeStub({ credits: 10, capacity: 40 });
    const result = trade.buy('lux', 1);
    expect(result.ok).toBe(false);
    expect(result.message).toContain('CREDITS');
    expect(trade.getCredits()).toBe(10);
  });

  it('verkauft nichts, was nicht an Bord ist', () => {
    const trade = createStationTradeStub({ credits: 500 });
    const result = trade.sell('meds', 3);
    expect(result.ok).toBe(false);
    expect(trade.getCredits()).toBe(500);
  });

  it('nimmt der Station nur, was sie vorraetig hat', () => {
    const trade = createStationTradeStub({ credits: 1_000_000, capacity: 10_000 });
    const stock = trade.getGoods().find((g) => g.id === 'lux')!.stock;
    expect(trade.buy('lux', stock + 1).ok).toBe(false);
    expect(trade.buy('lux', stock).ok).toBe(true);
    expect(trade.getGoods().find((g) => g.id === 'lux')!.stock).toBe(0);
  });

  it('mittelt den Einkaufspreis ueber mehrere Kaeufe', () => {
    const trade = createStationTradeStub({ credits: 1_000_000, capacity: 100 });
    trade.buy('ore', 2);
    trade.buy('ore', 3);
    const entry = trade.getManifest().find((e) => e.id === 'ore')!;
    expect(entry.tons).toBe(5);
    expect(entry.averagePrice).toBe(trade.getGoods().find((g) => g.id === 'ore')!.buyPrice);
  });

  it('weist unsinnige Mengen ab', () => {
    const trade = createStationTradeStub({ credits: 10_000 });
    expect(trade.buy('ore', 0).ok).toBe(false);
    expect(trade.buy('ore', -5).ok).toBe(false);
    expect(trade.buy('gibtsnicht', 1).ok).toBe(false);
  });
});

describe('StationTrade — Dienste', () => {
  it('bietet Huelle, Treibstoff und Munition an', () => {
    const ids = createStationTradeStub()
      .getServices()
      .map((s) => s.id);
    expect(ids).toEqual(['hull', 'fuel', 'ammo']);
  });

  it('repariert die echte Huelle ueber die Haken', () => {
    let hull = 0.4;
    const trade = createStationTradeStub({
      credits: 10_000,
      getHull: () => hull,
      setHull: (value) => {
        hull = value;
      },
    });

    const quote = trade.getServices().find((s) => s.id === 'hull')!;
    expect(quote.price).toBeGreaterThan(0);

    const result = trade.useService('hull');
    expect(result.ok).toBe(true);
    expect(hull).toBe(1);
    expect(trade.getCredits()).toBe(10_000 - quote.price);
  });

  it('kostet nichts, was schon voll ist', () => {
    const trade = createStationTradeStub({ credits: 10_000 });
    trade.useService('fuel');
    const before = trade.getCredits();
    const again = trade.useService('fuel');
    expect(again.ok).toBe(false);
    expect(trade.getCredits()).toBe(before);
  });

  it('repariert nicht ohne Geld', () => {
    let hull = 0.2;
    const trade = createStationTradeStub({
      credits: 5,
      getHull: () => hull,
      setHull: (value) => {
        hull = value;
      },
    });
    expect(trade.useService('hull').ok).toBe(false);
    expect(hull).toBe(0.2);
  });

  it('kennt keinen erfundenen Dienst', () => {
    expect(createStationTradeStub().useService('kaffee').ok).toBe(false);
  });
});
