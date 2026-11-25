import { useEffect, useState } from 'react';
import { MARKETING_BASE } from '@/lib/urls';
import {
  EVENEMENT_OUVRIR_PREFERENCES,
  enregistrerConsentement,
  lireConsentement,
  type ChoixConsentement,
} from '@/lib/consent';
import { isEmbedded } from '@/lib/analytics';

/**
 * Bandeau de consentement : affiché tant qu'aucun choix valide n'est enregistré,
 * et réaffiché par le lien « Gérer les cookies » du pied de page.
 * Pas de bandeau dans les pages intégrées (iframe, /embed) : GA n'y est jamais chargé.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isEmbedded()) return;
    if (lireConsentement() === null) setVisible(true);
    const ouvrir = () => setVisible(true);
    window.addEventListener(EVENEMENT_OUVRIR_PREFERENCES, ouvrir);
    return () => window.removeEventListener(EVENEMENT_OUVRIR_PREFERENCES, ouvrir);
  }, []);

  if (!visible) return null;

  function choisir(choix: ChoixConsentement) {
    enregistrerConsentement(choix);
    setVisible(false);
  }

  const bouton =
    'flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700';

  return (
    <section
      role="region"
      aria-labelledby="cookie-consent-titre"
      className="fixed inset-x-3 bottom-3 z-[900] mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:bottom-4 sm:p-5"
    >
      <h2 id="cookie-consent-titre" className="text-sm font-bold text-gray-900">
        Cookies de mesure d&apos;audience
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-gray-600">
        Avec votre accord, nous utilisons Google Analytics pour mesurer l&apos;audience des outils
        (pages vues, sources de trafic). Sans réponse, rien n&apos;est déposé. Vous pouvez changer
        d&apos;avis à tout moment via « Gérer les cookies » en bas de page.{' '}
        <a href={`${MARKETING_BASE}/politique-cookies`} className="font-medium text-brand-500 underline">
          En savoir plus
        </a>
      </p>
      {/* Refuser aussi visible et aussi simple qu'Accepter (exigence CNIL). */}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => choisir('refuse')}
          className={`${bouton} border border-gray-900 bg-white text-gray-900 hover:bg-gray-50`}
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => choisir('accepte')}
          className={`${bouton} border border-gray-900 bg-white text-gray-900 hover:bg-gray-50`}
        >
          Accepter
        </button>
      </div>
    </section>
  );
}
