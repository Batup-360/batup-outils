import { describe, it, expect } from 'vitest';
import { EMBED_PARENT_ORIGINS, parentTargetOrigins } from './embed-result';

describe('parentTargetOrigins (destinataires postMessage de l’embed)', () => {
  it('envoie seulement au parent quand c’est un domaine Batup', () => {
    expect(parentTargetOrigins('https://app.batup.fr')).toEqual(['https://app.batup.fr']);
  });
  it('accepte un serveur local (développement de l’app)', () => {
    expect(parentTargetOrigins('http://localhost:5173')).toEqual(['http://localhost:5173']);
  });
  it('n’envoie rien à un site tiers', () => {
    expect(parentTargetOrigins('https://evil.example')).toEqual([]);
    expect(parentTargetOrigins('http://localhost.evil.example')).toEqual([]);
  });
  it('parent inconnu : chaque domaine Batup, jamais *', () => {
    expect(parentTargetOrigins(null)).toEqual(EMBED_PARENT_ORIGINS);
    expect(parentTargetOrigins(undefined)).not.toContain('*');
  });
});
