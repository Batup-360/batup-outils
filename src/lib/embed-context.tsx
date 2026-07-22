import { createContext, useContext, type ReactNode } from 'react';

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
