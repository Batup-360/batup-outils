import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';

const Home = lazy(() => import('./pages/home'));
const NotFound = lazy(() => import('./pages/not-found'));

const CalculateurTauxHoraire = lazy(() => import('./pages/calculateur-taux-horaire'));
const CalculateurPrixChantier = lazy(() => import('./pages/calculateur-prix-chantier'));
const CalculateurHeuresSup = lazy(() => import('./pages/calculateur-heures-sup'));
const CalculateurCoutSalarie = lazy(() => import('./pages/calculateur-cout-salarie'));
const CalculateurMargeNette = lazy(() => import('./pages/calculateur-marge-nette'));
const CalculateurRetenueGarantie = lazy(
  () => import('./pages/calculateur-retenue-garantie')
);
const CalculateurTvaAutoliquidation = lazy(
  () => import('./pages/calculateur-tva-autoliquidation')
);
const CalculateurChargesSociales = lazy(() => import('./pages/calculateur-charges-sociales'));
const ComparateurStatutJuridique = lazy(
  () => import('./pages/comparateur-statut-juridique')
);
const SimulateurDecennale = lazy(() => import('./pages/simulateur-decennale'));

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-brand-500" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />

        {/* Pricing & marge */}
        <Route path="/calculateur-taux-horaire-btp" component={CalculateurTauxHoraire} />
        <Route path="/calculateur-prix-chantier-btp" component={CalculateurPrixChantier} />
        <Route
          path="/calculateur-marge-nette-coefficient-btp"
          component={CalculateurMargeNette}
        />

        {/* Paie & RH */}
        <Route
          path="/calculateur-heures-supplementaires-btp"
          component={CalculateurHeuresSup}
        />
        <Route path="/calculateur-cout-salarie-btp" component={CalculateurCoutSalarie} />

        {/* Fiscal & légal */}
        <Route
          path="/calculateur-tva-autoliquidation-btp"
          component={CalculateurTvaAutoliquidation}
        />
        <Route
          path="/calculateur-charges-sociales-artisan-btp"
          component={CalculateurChargesSociales}
        />
        <Route
          path="/comparateur-statut-juridique-artisan-btp"
          component={ComparateurStatutJuridique}
        />

        {/* Cash & assurances */}
        <Route path="/calculateur-retenue-de-garantie" component={CalculateurRetenueGarantie} />
        <Route path="/simulateur-decennale-btp" component={SimulateurDecennale} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
