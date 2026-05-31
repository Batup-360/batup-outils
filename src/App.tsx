import { Route, Switch } from 'wouter';
import CalculateurTauxHoraire from './pages/calculateur-taux-horaire';
import CalculateurPrixChantier from './pages/calculateur-prix-chantier';
import Home from './pages/home';
import NotFound from './pages/not-found';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/calculateur-taux-horaire-btp" component={CalculateurTauxHoraire} />
      <Route path="/calculateur-prix-chantier-btp" component={CalculateurPrixChantier} />
      <Route component={NotFound} />
    </Switch>
  );
}
