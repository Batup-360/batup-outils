import { lazy, Suspense, useEffect, useRef } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { EmailGateProvider } from '@/lib/email-gate-context';
import { EmailGate } from '@/components/EmailGate';
import { disableAnalytics, initAnalytics, trackPageView } from '@/lib/analytics';
import { EVENEMENT_CONSENTEMENT, type ChoixConsentement } from '@/lib/consent';
import { CookieConsent } from '@/components/CookieConsent';
import { METIERS } from '@/lib/salaires-metiers-btp';
import { htmlPrerendu } from '@/lib/page-prerendue';

const Home = lazy(() => import('./pages/home'));
const NotFound = lazy(() => import('./pages/not-found'));
const Embed = lazy(() => import('./pages/embed'));

// Pricing & marge
const CalculateurTauxHoraire = lazy(() => import('./pages/calculateur-taux-horaire'));
const CalculateurPrixChantier = lazy(() => import('./pages/calculateur-prix-chantier'));
const CalculateurMargeNette = lazy(() => import('./pages/calculateur-marge-nette'));
const CalculateurRevisionPrixBT = lazy(
  () => import('./pages/calculateur-revision-prix-index-bt')
);

// Paie & RH
const CalculateurHeuresSup = lazy(() => import('./pages/calculateur-heures-sup'));
const CalculateurCoutSalarie = lazy(() => import('./pages/calculateur-cout-salarie'));
const CalculateurIntemperies = lazy(() => import('./pages/calculateur-intemperies-cibtp'));
const CalculateurPrimeAnciennete = lazy(
  () => import('./pages/calculateur-prime-anciennete')
);

// Fiscal & légal
const CalculateurTvaAutoliquidation = lazy(
  () => import('./pages/calculateur-tva-autoliquidation')
);
const GenerateurMentionTva = lazy(() => import('./pages/generateur-mention-tva'));
const CalculateurChargesSociales = lazy(() => import('./pages/calculateur-charges-sociales'));
const ComparateurStatutJuridique = lazy(
  () => import('./pages/comparateur-statut-juridique')
);
const VerificateurMentions = lazy(
  () => import('./pages/verificateur-mentions-obligatoires')
);

// Cash, marchés & assurances
const CalculateurSituation = lazy(() => import('./pages/calculateur-situation-travaux'));
const CalculateurDGD = lazy(() => import('./pages/calculateur-dgd'));
const CalculateurRetenueGarantie = lazy(
  () => import('./pages/calculateur-retenue-garantie')
);
const SimulateurDecennale = lazy(() => import('./pages/simulateur-decennale'));
const SimulateurRcPro = lazy(() => import('./pages/simulateur-rc-pro'));
const CalculateurRoiRge = lazy(() => import('./pages/calculateur-roi-rge'));

// Métré & quantités
const CalculateurBeton = lazy(() => import('./pages/calculateur-beton'));
const CalculateurTva = lazy(() => import('./pages/calculateur-tva'));
const CalculateurSurface = lazy(() => import('./pages/calculateur-surface'));
const CalculateurVolume = lazy(() => import('./pages/calculateur-volume'));
const CalculateurEscalier = lazy(() => import('./pages/calculateur-escalier'));
const CalculateurMortier = lazy(() => import('./pages/calculateur-mortier'));
const CalculateurChape = lazy(() => import('./pages/calculateur-chape'));
const CalculateurPenteToiture = lazy(() => import('./pages/calculateur-pente-toiture'));
const CalculateurPapierPeint = lazy(() => import('./pages/calculateur-papier-peint'));
const GenerateurAttestationTva = lazy(() => import('./pages/generateur-attestation-tva'));
const CalculateurParpaings = lazy(() => import('./pages/calculateur-parpaings'));
const CalculateurBriques = lazy(() => import('./pages/calculateur-briques'));
const CalculateurPlaco = lazy(() => import('./pages/calculateur-placo'));
const CalculateurCarrelage = lazy(() => import('./pages/calculateur-carrelage'));
const CalculateurParquet = lazy(() => import('./pages/calculateur-parquet'));
const CalculateurTerrasse = lazy(() => import('./pages/calculateur-terrasse'));
const CalculateurIsolant = lazy(() => import('./pages/calculateur-isolant'));
const CalculateurPeinture = lazy(() => import('./pages/calculateur-peinture'));
const CalculateurConsommation = lazy(() => import('./pages/calculateur-consommation-materiaux'));
const CalculateurTuiles = lazy(() => import('./pages/calculateur-tuiles'));
const CalculateurGravierSable = lazy(() => import('./pages/calculateur-gravier-sable'));
const CalculateurEnduitFacade = lazy(() => import('./pages/calculateur-enduit-facade'));
const GrilleSalaires = lazy(() => import('./pages/grille-salaires-minima-batiment'));
const SalairesMetiersHub = lazy(() => import('./pages/salaires-metiers-btp'));
const SalaireMetier = lazy(() => import('./pages/salaire-metier'));

function AnalyticsTracker() {
  const [location] = useLocation();
  useEffect(() => {
    // GA n'est chargé qu'avec un consentement valide (sinon initAnalytics ne fait rien).
    initAnalytics();
    const surChoix = (e: Event) => {
      if ((e as CustomEvent<ChoixConsentement>).detail === 'accepte') {
        initAnalytics();
        trackPageView(window.location.pathname);
      } else {
        disableAnalytics();
      }
    };
    window.addEventListener(EVENEMENT_CONSENTEMENT, surChoix);
    return () => window.removeEventListener(EVENEMENT_CONSENTEMENT, surChoix);
  }, []);
  useEffect(() => {
    trackPageView(location);
  }, [location]);
  return null;
}

/**
 * Navigation interne (liens wouter) : remonte en haut de la nouvelle page et place
 * le focus sur son titre <h1>, pour que clavier et lecteurs d'écran suivent le
 * changement de page. Rien au premier affichage. Le <h1> peut arriver après le
 * chargement du code de la page (React.lazy) : on l'attend quelques secondes.
 */
function RouteChangeFocus() {
  const [location] = useLocation();
  const premier = useRef(true);
  useEffect(() => {
    if (premier.current) {
      premier.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo(0, 0);
    const focusTitre = () => {
      // L'ancienne page peut rester dans le DOM, masquée, le temps du chargement :
      // on ne retient que le <h1> visible.
      const h1 = [...document.querySelectorAll<HTMLElement>('#root h1')].find(
        (el) => el.getClientRects().length > 0,
      );
      if (!h1) return false;
      if (!h1.hasAttribute('tabindex')) h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: true });
      return document.activeElement === h1;
    };
    if (focusTitre()) return;
    const observer = new MutationObserver(() => {
      if (focusTitre()) observer.disconnect();
    });
    observer.observe(document.getElementById('root')!, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style'],
    });
    const t = window.setTimeout(() => observer.disconnect(), 5000);
    return () => {
      observer.disconnect();
      window.clearTimeout(t);
    };
  }, [location]);
  return null;
}

function LoadingFallback() {
  const [location] = useLocation();
  // Page d'arrivée : on garde le contenu prérendu (HTML généré au build par nous)
  // visible pendant le chargement du code de la page, au lieu d'un spinner.
  const prerendu = htmlPrerendu(location);
  if (prerendu) return <div dangerouslySetInnerHTML={{ __html: prerendu }} />;
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-brand-500" />
    </div>
  );
}

export default function App() {
  return (
    <EmailGateProvider>
      <AnalyticsTracker />
      <RouteChangeFocus />
      <CookieConsent />
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
        <Route path="/" component={Home} />
        <Route path="/embed/:slug" component={Embed} />

        {/* Pricing & marge */}
        <Route path="/calculateur-taux-horaire-btp" component={CalculateurTauxHoraire} />
        <Route path="/calculateur-prix-chantier-btp" component={CalculateurPrixChantier} />
        <Route
          path="/calculateur-marge-nette-coefficient-btp"
          component={CalculateurMargeNette}
        />
        <Route
          path="/calculateur-revision-prix-index-bt"
          component={CalculateurRevisionPrixBT}
        />

        {/* Paie & RH */}
        <Route
          path="/calculateur-heures-supplementaires-btp"
          component={CalculateurHeuresSup}
        />
        <Route path="/calculateur-cout-salarie-btp" component={CalculateurCoutSalarie} />
        <Route path="/calculateur-jours-intemperies-cibtp" component={CalculateurIntemperies} />
        <Route
          path="/calculateur-prime-anciennete-ccn-batiment"
          component={CalculateurPrimeAnciennete}
        />

        {/* Fiscal & légal */}
        <Route
          path="/calculateur-tva-autoliquidation-btp"
          component={CalculateurTvaAutoliquidation}
        />
        <Route path="/generateur-mention-tva-facture-btp" component={GenerateurMentionTva} />
        <Route
          path="/calculateur-charges-sociales-artisan-btp"
          component={CalculateurChargesSociales}
        />
        <Route
          path="/comparateur-statut-juridique-artisan-btp"
          component={ComparateurStatutJuridique}
        />
        <Route
          path="/verificateur-mentions-obligatoires-facture-devis-btp"
          component={VerificateurMentions}
        />

        {/* Cash, marchés & assurances */}
        <Route path="/calculateur-situation-travaux" component={CalculateurSituation} />
        <Route
          path="/calculateur-dgd-decompte-general-definitif"
          component={CalculateurDGD}
        />
        <Route path="/calculateur-retenue-de-garantie" component={CalculateurRetenueGarantie} />
        <Route path="/simulateur-decennale-btp" component={SimulateurDecennale} />
        <Route path="/simulateur-rc-pro-btp" component={SimulateurRcPro} />
        <Route path="/calculateur-roi-certification-rge" component={CalculateurRoiRge} />

        {/* Métré & quantités */}
        <Route path="/calculateur-beton" component={CalculateurBeton} />
        <Route path="/calculateur-tva" component={CalculateurTva} />
        <Route path="/calculateur-surface" component={CalculateurSurface} />
        <Route path="/calculateur-volume" component={CalculateurVolume} />
        <Route path="/calculateur-escalier" component={CalculateurEscalier} />
        <Route path="/calculateur-mortier" component={CalculateurMortier} />
        <Route path="/calculateur-chape" component={CalculateurChape} />
        <Route path="/calculateur-pente-toiture" component={CalculateurPenteToiture} />
        <Route path="/calculateur-papier-peint" component={CalculateurPapierPeint} />
        <Route path="/generateur-attestation-tva" component={GenerateurAttestationTva} />
        <Route path="/calculateur-parpaings" component={CalculateurParpaings} />
        <Route path="/calculateur-briques" component={CalculateurBriques} />
        <Route path="/calculateur-placo" component={CalculateurPlaco} />
        <Route path="/calculateur-carrelage" component={CalculateurCarrelage} />
        <Route path="/calculateur-parquet" component={CalculateurParquet} />
        <Route path="/calculateur-terrasse" component={CalculateurTerrasse} />
        <Route path="/calculateur-isolant" component={CalculateurIsolant} />
        <Route path="/calculateur-peinture" component={CalculateurPeinture} />
        <Route path="/calculateur-consommation-materiaux" component={CalculateurConsommation} />
        <Route path="/calculateur-tuiles" component={CalculateurTuiles} />
        <Route path="/calculateur-gravier-sable" component={CalculateurGravierSable} />
        <Route path="/calculateur-enduit-facade" component={CalculateurEnduitFacade} />
        <Route path="/grille-salaires-minima-batiment" component={GrilleSalaires} />
        <Route path="/grille-salaires-minima-batiment/:region" component={GrilleSalaires} />
        <Route path="/salaires-metiers-btp" component={SalairesMetiersHub} />
        {METIERS.map((m) => (
          <Route key={m.slug} path={`/salaire-${m.slug}`}>
            {() => <SalaireMetier slug={m.slug} />}
          </Route>
        ))}

          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <EmailGate />
    </EmailGateProvider>
  );
}
