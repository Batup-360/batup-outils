import { describe, it, expect } from 'vitest';
import { aireRectangle, aireTriangle, aireCercle, aireForme } from './surface-math';
import { volumePave, volumeCylindre, volumeForme, LITRES_PAR_M3 } from './volume-math';

describe('surface-math', () => {
  it('rectangle = L × l', () => {
    expect(aireRectangle(4, 3)).toBe(12);
  });
  it('triangle = base × hauteur / 2', () => {
    expect(aireTriangle(6, 4)).toBe(12);
  });
  it('cercle = π r²', () => {
    expect(aireCercle(2)).toBeCloseTo(Math.PI, 6); // r = 1
  });
  it('aireForme dispatche selon la forme', () => {
    expect(aireForme('rectangle', 4, 3)).toBe(12);
    expect(aireForme('triangle', 6, 4)).toBe(12);
    expect(aireForme('cercle', 2, 0)).toBeCloseTo(Math.PI, 6);
  });
  it('retourne 0 sur dimensions invalides', () => {
    expect(aireRectangle(0, 3)).toBe(0);
    expect(aireCercle(-1)).toBe(0);
  });
});

describe('volume-math', () => {
  it('pavé = L × l × h', () => {
    expect(volumePave(2, 3, 4)).toBe(24);
  });
  it('cylindre = π r² h', () => {
    expect(volumeCylindre(2, 5)).toBeCloseTo(Math.PI * 5, 6); // r = 1
  });
  it('volumeForme dispatche selon la forme', () => {
    expect(volumeForme('pave', 2, 3, 4)).toBe(24);
    expect(volumeForme('cylindre', 2, 5, 0)).toBeCloseTo(Math.PI * 5, 6);
  });
  it('1 m³ = 1000 L', () => {
    expect(volumePave(1, 1, 1) * LITRES_PAR_M3).toBe(1000);
  });
});
