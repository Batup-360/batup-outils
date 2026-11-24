/**
 * Consentement à la mesure d'audience (Google Analytics), lignes directrices CNIL :
 * - pas de choix enregistré, choix illisible ou expiré ⇒ refus (rien n'est chargé) ;
 * - « Refuser » aussi simple qu'« Accepter » (bandeau à deux boutons) ;
 * - choix révocable à tout moment (lien « Gérer les cookies » du pied de page) ;
 * - choix conservé 6 mois (recommandation CNIL), puis on redemande.
 *
 * Stocké dans le localStorage de outils.batup.fr : le choix fait sur www.batup.fr
 * (autre origine) n'est pas lisible ici, d'où un bandeau propre à ce site.
 */

export type ChoixConsentement = 'accepte' | 'refuse';

export const CLE_CONSENTEMENT = 'batup_outils_consent';
export const EVENEMENT_CONSENTEMENT = 'batup:consent-updated';
export const EVENEMENT_OUVRIR_PREFERENCES = 'batup:open-cookie-prefs';
/** 6 mois — au-delà, le choix n'est plus valable et on redemande. */
export const DUREE_CONSENTEMENT_MS = 182 * 24 * 60 * 60 * 1000;

export function lireConsentement(): ChoixConsentement | null {
  try {
    const brut = localStorage.getItem(CLE_CONSENTEMENT);
    if (!brut) return null;
    const { choix, le } = JSON.parse(brut) as { choix?: unknown; le?: unknown };
    if (choix !== 'accepte' && choix !== 'refuse') return null;
    if (typeof le !== 'number' || Date.now() - le > DUREE_CONSENTEMENT_MS) return null;
    return choix;
  } catch {
    return null;
  }
}

export function enregistrerConsentement(choix: ChoixConsentement): void {
  try {
    localStorage.setItem(CLE_CONSENTEMENT, JSON.stringify({ choix, le: Date.now() }));
  } catch {
    /* localStorage indisponible : le choix vaut pour cette page seulement */
  }
  window.dispatchEvent(new CustomEvent(EVENEMENT_CONSENTEMENT, { detail: choix }));
}

/** Réaffiche le bandeau (lien « Gérer les cookies »). */
export function ouvrirPreferencesCookies(): void {
  window.dispatchEvent(new Event(EVENEMENT_OUVRIR_PREFERENCES));
}
