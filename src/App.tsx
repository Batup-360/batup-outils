import { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { EmailGateProvider } from '@/lib/email-gate-context';
import { EmailGate } from '@/components/EmailGate';
import { initAnalytics, trackPageView } from '@/lib/analytics';

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

function AnalyticsTracker() {
  const [location] = useLocation();
  useEffect(() => {
    initAnalytics();
  }, []);
  useEffect(() => {
    trackPageView(location);
  }, [location]);
  return null;
}

function LoadingFallback() {
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

          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <EmailGate />
    </EmailGateProvider>
  );
}
