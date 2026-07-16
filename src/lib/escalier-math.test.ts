import { describe, it, expect } from 'vitest';
import { calculeEscalier } from './escalier-math';

describe('calculeEscalier', () => {
  it('dimensionne un escalier standard 2,80 m', () => {
    // 280 / 17,5 = 16 marches exactement
    const r = calculeEscalier(280, 17.5);
    expect(r.nombreMarches).toBe(16);
    expect(r.hauteurMarcheCm).toBeCloseTo(17.5, 6);
    // giron Blondel = 63 - 2×17,5 = 28
    expect(r.gironCm).toBeCloseTo(28, 6);
    // blondel = 2×17,5 + 28 = 63
    expect(r.blondelCm).toBeCloseTo(63, 6);
    expect(r.confortable).toBe(true);
    // reculement total = giron × (16-1)
    expect(r.reculementTotalCm).toBeCloseTo(28 * 15, 6);
  });

  it('déduit le giron du reculement disponible quand il est fourni', () => {
    const r = calculeEscalier(280, 17.5, 420); // 420 / 15 girons = 28
    expect(r.gironCm).toBeCloseTo(28, 6);
    expect(r.reculementTotalCm).toBeCloseTo(420, 6);
  });

  it('arrondit le nombre de marches au plus proche', () => {
    expect(calculeEscalier(275, 17.5).nombreMarches).toBe(16); // 275/17.5 = 15.7 → 16
  });

  it('signale un escalier trop raide comme non confortable', () => {
    const r = calculeEscalier(300, 25); // marches ~25 cm, blondel hors plage
    expect(r.confortable).toBe(false);
  });

  it('retourne des zéros pour une hauteur invalide', () => {
    expect(calculeEscalier(0).nombreMarches).toBe(0);
    expect(calculeEscalier(Number.NaN).confortable).toBe(false);
  });
});
