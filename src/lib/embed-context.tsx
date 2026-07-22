import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { parsePrefillParam, type PrefillBounds } from './embed-prefill';

/**
 * Contexte d'embed : porte le slug de l'outil quand un calculateur est rendu
 * dans le shell /embed/<slug> (iframe utilisée par l'app Batup dans une
 * modale), `null` sinon. En mode embed on masque l'opt-in email et la barre
 * mobile fixe pour que l'outil se fonde dans l'app hôte.
 */
const EmbedContext = createContext<string | null>(null);

export function EmbedProvider({ slug, children }: { slug: string; children: ReactNode }) {
  return <EmbedContext.Provider value={slug}>{children}</EmbedContext.Provider>;
}

/** Slug de l'outil embarqué, ou `null` hors mode embed. */
export function useEmbedSlug(): string | null {
  return useContext(EmbedContext);
}

export function useEmbedded(): boolean {
  return useEmbedSlug() !== null;
}

export interface EmbedPrefill {
  /** Nombre lu depuis les query params de l'URL d'embed, ou `undefined`. */
  num(name: string, opts?: PrefillBounds): number | undefined;
}

/**
 * Pré-remplissage app → outil (v1) : lit `window.location.search` une seule
 * fois et expose les paramètres numériques (`?surface=34&tva=10…`). Ne
 * retourne des valeurs QU'EN mode embed — sur les pages publiques, `num()`
 * retourne toujours `undefined`, même si l'URL porte les mêmes paramètres.
 * Params invalides ou hors bornes = ignorés silencieusement (defaults
 * conservés). Voir docs/embed.md, section « Pré-remplissage ».
 */
export function useEmbedPrefill(): EmbedPrefill {
  const embedded = useEmbedded();
  return useMemo(() => {
    const search = embedded && typeof window !== 'undefined' ? window.location.search : '';
    return {
      num: (name: string, opts?: PrefillBounds) =>
        embedded ? parsePrefillParam(search, name, opts) : undefined,
    };
  }, [embedded]);
}
