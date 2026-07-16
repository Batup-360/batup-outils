import { describe, it, expect } from 'vitest';
import { volumeMortier, dosageMortier, SABLE_KG_PAR_M3_MORTIER } from './mortier-math';
import {
  pentePourcent,
  angleDegres,
  longueurRampant,
  pourcentVersDegres,
  degresVersPourcent,
} from './pente-math';
import { calculePapierPeint } from './papier-peint-math';

describe('mortier-math', () => {
  it('volume = surface × épaisseur(cm→m)', () => {
    // enduit 20 m² sur 2 cm = 0,4 m³
    expect(volumeMortier(20, 2)).toBeCloseTo(0.4, 6);
  });
  it('dosage : ciment = volume × dosage, sacs au supérieur', () => {
    const r = dosageMortier(1, 350);
    expect(r.cimentKg).toBe(350);
    expect(r.sacs35).toBe(10);
    expect(r.sacs25).toBe(14);
    expect(r.sableKg).toBe(SABLE_KG_PAR_M3_MORTIER);
    expect(r.eauL).toBe(175);
  });
  it('retourne 0 pour un volume nul', () => {
    expect(dosageMortier(0, 350).cimentKg).toBe(0);
    expect(volumeMortier(0, 2)).toBe(0);
  });
});

describe('pente-math', () => {
  it('pente 50 % pour dénivelé = moitié de la base', () => {
    expect(pentePourcent(2, 4)).toBeCloseTo(50, 6);
  });
  it('angle 45° quand hauteur = base', () => {
    expect(angleDegres(3, 3)).toBeCloseTo(45, 6);
  });
  it('rampant = hypoténuse (3-4-5)', () => {
    expect(longueurRampant(3, 4)).toBeCloseTo(5, 6);
  });
  it('conversions %/° cohérentes', () => {
    expect(pourcentVersDegres(100)).toBeCloseTo(45, 6);
    expect(degresVersPourcent(45)).toBeCloseTo(100, 6);
    expect(degresVersPourcent(pourcentVersDegres(30))).toBeCloseTo(30, 6);
  });
  it('garde les cas limites à 0', () => {
    expect(pentePourcent(2, 0)).toBe(0);
    expect(degresVersPourcent(90)).toBe(0);
  });
});

describe('papier-peint-math', () => {
  it('calcule les rouleaux d’une pièce standard', () => {
    // pièce 4×3 → périmètre 14 m, h 2,5 m, rouleau 0,53×10, sans raccord
    const r = calculePapierPeint(14, 2.5);
    expect(r.lesNecessaires).toBe(Math.ceil(14 / 0.53)); // 27
    // hauteur 2,5 + marge de coupe 0,10 = 2,60 ; rouleau 10,05 m → 3 lés/rouleau
    expect(r.lesParRouleau).toBe(Math.floor(10.05 / 2.6)); // 3
    expect(r.rouleaux).toBe(Math.ceil(27 / 3)); // 9
    expect(r.surfaceM2).toBeCloseTo(35, 6);
  });
  it('prend en compte le raccord de motif', () => {
    const sans = calculePapierPeint(14, 2.5, 0.53, 10.05, 0);
    const avec = calculePapierPeint(14, 2.5, 0.53, 10.05, 90); // +90 cm de raccord
    expect(avec.lesParRouleau).toBeLessThan(sans.lesParRouleau);
    expect(avec.rouleaux).toBeGreaterThanOrEqual(sans.rouleaux);
  });
  it('retourne 0 sur entrées invalides', () => {
    expect(calculePapierPeint(0, 2.5).rouleaux).toBe(0);
    expect(calculePapierPeint(14, 0).rouleaux).toBe(0);
  });
});
