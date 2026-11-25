import { describe, it, expect, afterEach, vi } from 'vitest';
import { capturerUtm, lireUtm, signupUrl } from './urls';

/** Faux `window` minimal (les tests tournent sous node, sans DOM). */
function visiter(search: string, storage: Map<string, string> = new Map()) {
  vi.stubGlobal('window', {
    location: { search },
    sessionStorage: {
      getItem: (cle: string) => storage.get(cle) ?? null,
      setItem: (cle: string, valeur: string) => void storage.set(cle, valeur),
    },
  });
  return storage;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('signupUrl (CTA d’inscription + UTM d’arrivée)', () => {
  it('sans UTM, l’URL reste identique à avant', () => {
    visiter('');
    expect(signupUrl()).toBe('https://app.batup.fr/signup');
    expect(signupUrl({ source: 'calculateur-taux-horaire' })).toBe(
      'https://app.batup.fr/signup?source=calculateur-taux-horaire',
    );
    const params = new URLSearchParams({ source: 'calculateur-taux-horaire' });
    params.set('hourly_rate', '52.50');
    params.set('margin', '20.00');
    expect(signupUrl(params)).toBe(`https://app.batup.fr/signup?${params.toString()}`);
  });

  it('arrivée avec UTM : le CTA contient source puis les UTM', () => {
    visiter('?utm_source=facebook&utm_campaign=x');
    capturerUtm();
    const params = new URLSearchParams({ source: 'calculateur-taux-horaire', hourly_rate: '52.50' });
    expect(signupUrl(params)).toBe(
      'https://app.batup.fr/signup?source=calculateur-taux-horaire&utm_source=facebook&utm_campaign=x&hourly_rate=52.50',
    );
  });

  it('garde les UTM après navigation dans le site (sessionStorage)', () => {
    const storage = visiter('?utm_source=facebook&utm_medium=cpc&utm_campaign=artisans-du-batiment');
    capturerUtm();
    visiter('', storage); // page suivante, sans UTM dans l’URL
    expect(signupUrl({ source: 'calculateur-tva' })).toBe(
      'https://app.batup.fr/signup?source=calculateur-tva&utm_source=facebook&utm_medium=cpc&utm_campaign=artisans-du-batiment',
    );
  });

  it('une arrivée sans UTM n’efface pas ceux déjà gardés', () => {
    const storage = visiter('?utm_source=facebook');
    capturerUtm();
    visiter('?surface=34', storage);
    capturerUtm();
    expect(lireUtm()).toEqual({ utm_source: 'facebook' });
  });

  it('ne transmet que les utm_* de la liste blanche', () => {
    visiter('?utm_source=facebook&email=a%40b.fr&gclid=123&utm_id=9&redirect=https%3A%2F%2Fevil.example');
    capturerUtm();
    expect(signupUrl({ source: 'calculateur-tva' })).toBe(
      'https://app.batup.fr/signup?source=calculateur-tva&utm_source=facebook',
    );
  });

  it('encode les valeurs et garde l’hôte fixe', () => {
    visiter('?utm_campaign=' + encodeURIComponent('été & co/@evil.example?x=1#y'));
    const url = new URL(signupUrl({ source: 'calculateur-tva' }));
    expect(url.origin).toBe('https://app.batup.fr');
    expect(url.pathname).toBe('/signup');
    expect(url.hash).toBe('');
    expect([...url.searchParams.keys()]).toEqual(['source', 'utm_campaign']);
    expect(url.searchParams.get('utm_campaign')).toBe('été & co/@evil.example?x=1#y');
  });

  it('un UTM ne peut pas écraser source', () => {
    visiter('?utm_source=facebook&source=pirate');
    expect(signupUrl({ source: 'calculateur-tva' })).toBe(
      'https://app.batup.fr/signup?source=calculateur-tva&utm_source=facebook',
    );
  });

  it('ignore un sessionStorage corrompu ou des clés inattendues', () => {
    visiter('', new Map([['batup_utm', '{pas du json']]));
    expect(signupUrl({ source: 'calculateur-tva' })).toBe('https://app.batup.fr/signup?source=calculateur-tva');
    visiter('', new Map([['batup_utm', JSON.stringify({ utm_source: 'x', email: 'a@b.fr', utm_medium: 3 })]]));
    expect(lireUtm()).toEqual({ utm_source: 'x' });
  });

  it('sans window (prerender), pas d’erreur et pas d’UTM', () => {
    expect(() => capturerUtm()).not.toThrow();
    expect(signupUrl({ source: 'calculateur-tva' })).toBe('https://app.batup.fr/signup?source=calculateur-tva');
  });

  it('sessionStorage indisponible : les UTM de l’URL courante passent quand même', () => {
    vi.stubGlobal('window', {
      location: { search: '?utm_source=facebook' },
      get sessionStorage(): Storage {
        throw new Error('SecurityError');
      },
    });
    expect(() => capturerUtm()).not.toThrow();
    expect(signupUrl()).toBe('https://app.batup.fr/signup?utm_source=facebook');
  });
});
