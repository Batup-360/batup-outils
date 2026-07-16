import { describe, it, expect } from 'vitest';
import { tvaFromHT, htToTtc, ttcToHt } from './tva-math';

describe('tva-math', () => {
  it('HT → TTC à 20 %', () => {
    expect(htToTtc(1000, 20)).toBeCloseTo(1200, 6);
    expect(tvaFromHT(1000, 20)).toBeCloseTo(200, 6);
  });
  it('TTC → HT à 20 %', () => {
    expect(ttcToHt(1200, 20)).toBeCloseTo(1000, 6);
  });
  it('HT → TTC à 10 % et 5,5 %', () => {
    expect(htToTtc(1000, 10)).toBeCloseTo(1100, 6);
    expect(htToTtc(1000, 5.5)).toBeCloseTo(1055, 6);
  });
  it('aller-retour HT → TTC → HT est stable', () => {
    const ht = 2537.42;
    expect(ttcToHt(htToTtc(ht, 20), 20)).toBeCloseTo(ht, 6);
  });
  it('retourne 0 pour des montants non positifs', () => {
    expect(htToTtc(0, 20)).toBe(0);
    expect(ttcToHt(-5, 20)).toBe(0);
    expect(tvaFromHT(Number.NaN, 20)).toBe(0);
  });
});
