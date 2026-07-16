import { describe, it, expect } from 'vitest';
import { volumeBeton, dosageBeton, DENSITE_BETON_KG_PAR_M3, FRACTION_SABLE } from './beton-math';

describe('volumeBeton', () => {
  it('computes L × l × épaisseur(cm→m)', () => {
    // dalle 4 m × 5 m × 12 cm = 2,4 m³
    expect(volumeBeton(4, 5, 12)).toBeCloseTo(2.4, 6);
  });
  it('returns 0 on non-positive or non-finite inputs', () => {
    expect(volumeBeton(0, 5, 12)).toBe(0);
    expect(volumeBeton(4, -1, 12)).toBe(0);
    expect(volumeBeton(4, 5, Number.NaN)).toBe(0);
  });
});

describe('dosageBeton', () => {
  it('ciment = volume × dosage, sacs arrondis au supérieur', () => {
    const r = dosageBeton(2, 350);
    expect(r.cimentKg).toBe(700);
    expect(r.sacs35).toBe(20); // 700 / 35
    expect(r.sacs25).toBe(28); // 700 / 25
    expect(r.eauL).toBe(350); // 700 × 0,5
    // granulat = 2×2400 − 700 − 350 = 3750, réparti sable/gravier
    const granulat = 2 * DENSITE_BETON_KG_PAR_M3 - 700 - 350;
    expect(r.sableKg).toBeCloseTo(granulat * FRACTION_SABLE, 6);
    expect(r.gravierKg).toBeCloseTo(granulat * (1 - FRACTION_SABLE), 6);
  });

  it('le granulat diminue quand le dosage ciment augmente', () => {
    const bas = dosageBeton(1, 250);
    const haut = dosageBeton(1, 400);
    expect(bas.sableKg).toBeGreaterThan(haut.sableKg);
    expect(bas.gravierKg).toBeGreaterThan(haut.gravierKg);
    // à 350 : granulat = 2400 − 350 − 175 = 1875 ; sable ≈ 825, gravier ≈ 1050
    const std = dosageBeton(1, 350);
    expect(std.sableKg).toBeCloseTo(1875 * FRACTION_SABLE, 6);
    expect(std.gravierKg).toBeCloseTo(1875 * (1 - FRACTION_SABLE), 6);
  });
  it('rounds bags up (ceil)', () => {
    const r = dosageBeton(1, 350);
    expect(r.sacs35).toBe(10); // 350/35 = 10 exactly
    expect(dosageBeton(1, 300).sacs35).toBe(Math.ceil(300 / 35)); // 9
  });
  it('returns zeros for empty volume', () => {
    const r = dosageBeton(0, 350);
    expect(r.cimentKg).toBe(0);
    expect(r.sacs35).toBe(0);
    expect(r.eauL).toBe(0);
  });
});
