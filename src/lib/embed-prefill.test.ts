import { describe, it, expect } from 'vitest';
import { parsePrefillParam } from './embed-prefill';

describe('parsePrefillParam (pré-remplissage embed v1)', () => {
  it('lit un nombre simple', () => {
    expect(parsePrefillParam('?surface=34', 'surface')).toBe(34);
    expect(parsePrefillParam('?surface=34&tva=10', 'tva')).toBe(10);
  });

  it('accepte les décimales point et virgule', () => {
    expect(parsePrefillParam('?surface=12.5', 'surface')).toBe(12.5);
    expect(parsePrefillParam('?surface=12,5', 'surface')).toBe(12.5);
    expect(parsePrefillParam('?tva=5.5', 'tva')).toBe(5.5);
  });

  it('retourne undefined si le paramètre est absent ou vide', () => {
    expect(parsePrefillParam('', 'surface')).toBeUndefined();
    expect(parsePrefillParam('?tva=10', 'surface')).toBeUndefined();
    expect(parsePrefillParam('?surface=', 'surface')).toBeUndefined();
    expect(parsePrefillParam('?surface=%20', 'surface')).toBeUndefined();
  });

  it('rejette NaN et Infinity', () => {
    expect(parsePrefillParam('?surface=abc', 'surface')).toBeUndefined();
    expect(parsePrefillParam('?surface=NaN', 'surface')).toBeUndefined();
    expect(parsePrefillParam('?surface=Infinity', 'surface')).toBeUndefined();
    expect(parsePrefillParam('?surface=-Infinity', 'surface')).toBeUndefined();
  });

  it('applique les bornes min/max (inclusives)', () => {
    const opts = { min: 0.1, max: 100000 };
    expect(parsePrefillParam('?surface=0.1', 'surface', opts)).toBe(0.1);
    expect(parsePrefillParam('?surface=100000', 'surface', opts)).toBe(100000);
    expect(parsePrefillParam('?surface=0.05', 'surface', opts)).toBeUndefined();
    expect(parsePrefillParam('?surface=0', 'surface', opts)).toBeUndefined();
    expect(parsePrefillParam('?surface=-5', 'surface', opts)).toBeUndefined();
    expect(parsePrefillParam('?surface=100001', 'surface', opts)).toBeUndefined();
  });

  it('bornes marge (0-99) et taux (1-500)', () => {
    expect(parsePrefillParam('?marge=25', 'marge', { min: 0, max: 99 })).toBe(25);
    expect(parsePrefillParam('?marge=0', 'marge', { min: 0, max: 99 })).toBe(0);
    expect(parsePrefillParam('?marge=100', 'marge', { min: 0, max: 99 })).toBeUndefined();
    expect(parsePrefillParam('?taux=45', 'taux', { min: 1, max: 500 })).toBe(45);
    expect(parsePrefillParam('?taux=0.5', 'taux', { min: 1, max: 500 })).toBeUndefined();
    expect(parsePrefillParam('?taux=501', 'taux', { min: 1, max: 500 })).toBeUndefined();
  });

  it('fonctionne avec ou sans « ? » en tête', () => {
    expect(parsePrefillParam('surface=34', 'surface')).toBe(34);
  });
});
