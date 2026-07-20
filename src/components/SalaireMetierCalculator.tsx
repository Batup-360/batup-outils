import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { GatedReveal } from './GatedReveal';
import { useEmailGate } from '@/lib/email-gate-context';
import {
  getMetier,
  METIERS,
  METIER_SOURCE,
  NET_TO_BRUT,
  CONFIRME_FACTEUR,
  type MetierSalaire,
} from '@/lib/salaires-metiers-btp';

const EURO = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const fmtEuro = (n: number) => (Number.isFinite(n) && n > 0 ? `${EURO.format(Math.round(n))} €` : '— €');

type Exp = 'debutant' | 'confirme';

export function SalaireMetierCalculator({ metierSlug }: { metierSlug?: string }) {
  const metier = getMetier(metierSlug);
  if (!metier) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-gray-600">
          Métier inconnu. <Link href="/salaires-metiers-btp" className="text-brand-600 underline">Voir tous les salaires par métier</Link>.
        </CardContent>
      </Card>
    );
  }
  return <MetierView metier={metier} />;
}

function MetierView({ metier }: { metier: MetierSalaire }) {
  const { unlocked } = useEmailGate();
  const [exp, setExp] = useState<Exp>('debutant');

  const net = exp === 'debutant' ? metier.debutantNet : Math.round((metier.debutantNet * CONFIRME_FACTEUR) / 10) * 10;
  const brut = net * NET_TO_BRUT;
  const brutAnnuel = brut * 12;

  const TOOL_SLUG = `salaire-${metier.slug}`;
  const ctaSignupHref = `${APP_BASE}/signup?source=${TOOL_SLUG}`;

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Niveau d'expérience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="inline-flex w-full rounded-full border border-gray-200 bg-gray-50 p-1">
              <button
                type="button"
                onClick={() => setExp('debutant')}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  exp === 'debutant' ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Débutant
              </button>
              <button
                type="button"
                onClick={() => setExp('confirme')}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  exp === 'confirme' ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Confirmé (5-10 ans)
              </button>
            </div>
            <p className="text-sm text-gray-600">
              <strong>{metier.label}</strong> — {metier.famille}. {metier.facteurs}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Classification conventionnelle typique :</strong> {metier.niveauConventionnel}. Le minimum
              légal exact dépend de la région :{' '}
              <Link href="/grille-salaires-minima-batiment" className="text-brand-600 underline">
                voir la grille des salaires BTP
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          <strong>Salaire de début de carrière {fmtEuro(metier.debutantNet)} net/mois</strong> — source :{' '}
          <a href={METIER_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline">
            {METIER_SOURCE.label}
          </a>{' '}
          ({METIER_SOURCE.annee}). Le salaire « confirmé », le brut et l'annuel sont des <strong>estimations</strong>{' '}
          (brut ≈ net / 0,78 ; profil confirmé ≈ +30 %). Le salaire réel dépend de la région, des primes (paniers,
          trajets), des heures supplémentaires et de l'entreprise.
        </div>

        <div className="rounded-lg border border-gray-100 bg-white px-4 py-4 text-sm">
          <p className="mb-2 font-semibold text-gray-900">Autres métiers du BTP</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {METIERS.filter((m) => m.slug !== metier.slug && m.famille === metier.famille)
              .slice(0, 6)
              .map((m) => (
                <Link key={m.slug} href={`/salaire-${m.slug}`} className="text-sm text-gray-600 hover:text-brand-600 hover:underline">
                  Salaire {m.label.toLowerCase()}
                </Link>
              ))}
          </div>
          <p className="mt-3 border-t border-gray-100 pt-3 text-xs text-gray-500">
            Voir aussi :{' '}
            <Link href="/salaires-metiers-btp" className="text-brand-600 underline">tous les métiers</Link>{' · '}
            <Link href="/grille-salaires-minima-batiment" className="text-brand-600 underline">grille des salaires BTP</Link>{' · '}
            <Link href="/calculateur-cout-salarie-btp" className="text-brand-600 underline">coût salarié employeur</Link>
          </p>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <GatedReveal
            toolSlug={TOOL_SLUG}
            toolLabel={`Salaire ${metier.label}`}
            resultPreview={`Salaire ${metier.label.toLowerCase()} (${exp}) ≈ ${fmtEuro(net)} net/mois`}
          >
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Salaire {metier.label.toLowerCase()}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    {exp === 'debutant' ? 'Net mensuel — début de carrière' : 'Net mensuel estimé — confirmé'}
                  </p>
                  <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{fmtEuro(net)}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {exp === 'debutant' ? 'Source datée' : 'Estimation (+30 % vs débutant)'}
                  </p>
                </div>
                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                  <Row label="Brut mensuel estimé" value={`≈ ${fmtEuro(brut)}`} />
                  <Row label="Brut annuel estimé" value={`≈ ${fmtEuro(brutAnnuel)}`} />
                  <Row label="Niveau conventionnel" value={metier.niveauConventionnel} />
                </div>
                <div className="space-y-2 pt-2">
                  <a href={ctaSignupHref}>
                    <Button className="h-11 w-full rounded-full">
                      Essayer Batup gratuitement
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <p className="text-center text-xs text-gray-500">
                    Gérez paie, pointages et primes de chantier dans un seul outil BTP.
                  </p>
                </div>
              </CardContent>
            </Card>
          </GatedReveal>
        </div>
      </div>

      {unlocked && <StickyResultBar label={`Salaire ${metier.label.toLowerCase()}`} value={`${fmtEuro(net)} net`} ctaHref={ctaSignupHref} />}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-gray-600">{label}</span>
      <span className="whitespace-nowrap text-right font-semibold text-gray-900">{value}</span>
    </div>
  );
}
