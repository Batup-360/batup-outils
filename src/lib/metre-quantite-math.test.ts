import { describe, it, expect } from 'vitest';
import {
  surfaceAvecPerte,
  unitesParSurface,
  paquetsNecessaires,
  quantiteParSurface,
  peintureLitres,
  unitesParM2DepuisCm,
} from './metre-quantite-math';

describe('surfaceAvecPerte', () => {
  it('ajoute la perte en %', () => {
    expect(surfaceAvecPerte(100, 10)).toBeCloseTo(110, 6);
    expect(surfaceAvecPerte(100, 0)).toBe(100);
  });
  it('retourne 0 sur surface invalide', () => {
    expect(surfaceAvecPerte(0, 10)).toBe(0);
  });
});

describe('unitesParSurface', () => {
  it('arrondit au supérieur', () => {
    // 10 m² × 10 blocs/m² × +5 % = 105 → 105
    expect(unitesParSurface(10, 10, 5)).toBe(105);
    // 3,1 m² × 1 → ceil(3,1) = 4
    expect(unitesParSurface(3.1, 1, 0)).toBe(4);
  });
  it('retourne 0 si taux nul', () => {
    expect(unitesParSurface(10, 0)).toBe(0);
  });
});

describe('paquetsNecessaires', () => {
  it('couvre la surface + perte', () => {
    // 20 m² +10 % = 22 ; paquet 2,2 m² → 10 paquets
    expect(paquetsNecessaires(20, 2.2, 10)).toBe(10);
    // 22 m² +0, paquet 3 m² → ceil(7,33) = 8
    expect(paquetsNecessaires(22, 3, 0)).toBe(8);
  });
});

describe('quantiteParSurface', () => {
  it('multiplie surface + perte par le taux', () => {
    expect(quantiteParSurface(50, 0.3, 0)).toBeCloseTo(15, 6);
    expect(quantiteParSurface(50, 0.3, 10)).toBeCloseTo(16.5, 6);
  });
});

describe('peintureLitres', () => {
  it('surface × couches / rendement', () => {
    // 40 m², 2 couches, rendement 10 m²/L = 8 L
    expect(peintureLitres(40, 2, 10, 0)).toBeCloseTo(8, 6);
  });
  it('retourne 0 si rendement nul', () => {
    expect(peintureLitres(40, 2, 0)).toBe(0);
  });
});

describe('unitesParM2DepuisCm', () => {
  it('carreau 20×20 cm → 25 par m²', () => {
    expect(unitesParM2DepuisCm(20, 20)).toBeCloseTo(25, 6);
  });
  it('carreau 60×60 cm → ~2,78 par m²', () => {
    expect(unitesParM2DepuisCm(60, 60)).toBeCloseTo(1 / 0.36, 6);
  });
});
