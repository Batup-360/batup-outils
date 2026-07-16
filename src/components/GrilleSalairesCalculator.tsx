import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Label, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { GatedReveal } from './GatedReveal';
import { useEmailGate } from '@/lib/email-gate-context';
import {
  GRILLES,
  minimumApplicable,
  SMIC_MENSUEL_35H,
  SMIC_DATE,
  type CategorieKey,
} from '@/lib/grille-salaires-btp';

const TOOL_SLUG = 'grille-salaires-minima-batiment';
const TOOL_LABEL = 'Grille des salaires minima du bâtiment';

const EURO = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const EURO2 = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fmtEuro = (n: number) => (Number.isFinite(n) && n > 0 ? `${EURO.format(Math.round(n))} €` : '— €');
const fmtEuro2 = (n: number) => (Number.isFinite(n) && n > 0 ? `${EURO2.format(n)} €` : '— €');

const CATEGORIES: { key: CategorieKey; label: string; hint: string }[] = [
  { key: 'ouvriers', label: 'Ouvriers', hint: 'Niveaux I à IV (coeff. 150 à 270)' },
  { key: 'etam', label: 'ETAM', hint: 'Employés, techniciens, agents de maîtrise (A à H)' },
  { key: 'cadres', label: 'Cadres', hint: 'Grille nationale (coeff. 60 à 162)' },
];

// Estimation brut → net : charges salariales ~22 % (non-cadre), ~25 % (cadre).
const NET_RATIO: Record<CategorieKey, number> = { ouvriers: 0.78, etam: 0.78, cadres: 0.75 };

export function GrilleSalairesCalculator() {
  const { unlocked } = useEmailGate();
  const [categorie, setCategorie] = useState<CategorieKey>('ouvriers');
  const [ligneIndex, setLigneIndex] = useState(0);

  const grille = useMemo(() => GRILLES.find((g) => g.categorie === categorie)!, [categorie]);
  const ligne = grille.lignes[Math.min(ligneIndex, grille.lignes.length - 1)];
  const { montant, smicApplique } = minimumApplicable(grille, ligne);

  const brutAnnuel = montant * 12;
  const tauxHoraire = montant / grille.baseHeuresMois;
  const netEstime = montant * NET_RATIO[categorie];

  const changeCategorie = (key: CategorieKey) => {
    setCategorie(key);
    setLigneIndex(0);
  };

  const ctaSignupHref = `${APP_BASE}/signup?source=${TOOL_SLUG}`;

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre catégorie et votre poste</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2 sm:grid-cols-3">
              {CATEGORIES.map((c) => {
                const selected = categorie === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => changeCategorie(c.key)}
                    className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      selected
                        ? 'border-brand-500 bg-brand-50 text-gray-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="block font-semibold">{c.label}</span>
                    <span className="mt-0.5 block text-xs text-gray-500">{c.hint}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Région</Label>
                {categorie === 'cadres' ? (
                  <div className="flex h-10 w-full items-center rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600">
                    France entière (grille nationale)
                  </div>
                ) : (
                  <select
                    value="ile-de-france"
                    onChange={() => {}}
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="ile-de-france">Île-de-France</option>
                    <option value="" disabled>
                      Autres régions — bientôt
                    </option>
                  </select>
                )}
              </div>

              <div className="space-y-1.5">
                <Label>Poste / niveau</Label>
                <select
                  value={ligneIndex}
                  onChange={(e) => setLigneIndex(Number(e.target.value))}
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                >
                  {grille.lignes.map((l, i) => (
                    <option key={l.label} value={i}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Grille {grille.categorieLabel} — {grille.regionLabel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wider text-gray-500">
                    <th className="pb-2 pr-2">Poste</th>
                    {grille.lignes.some((l) => l.coefficient) && <th className="pb-2 pr-2">Coeff.</th>}
                    <th className="pb-2 text-right">Minimum brut/mois</th>
                  </tr>
                </thead>
                <tbody>
                  {grille.lignes.map((l, i) => {
                    const m = minimumApplicable(grille, l);
                    const active = i === ligneIndex;
                    return (
                      <tr
                        key={l.label}
                        className={`border-b border-gray-50 ${active ? 'bg-brand-50/60' : ''}`}
                      >
                        <td className="py-2 pr-2 text-gray-700">{l.label}</td>
                        {grille.lignes.some((x) => x.coefficient) && (
                          <td className="py-2 pr-2 text-gray-500">{l.coefficient ?? '—'}</td>
                        )}
                        <td className="py-2 text-right font-semibold text-gray-900">
                          {fmtEuro(m.montant)}
                          {m.smicApplique && <span className="ml-1 text-xs font-normal text-amber-600">(SMIC)</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Base {grille.baseLabel}. {grille.note}
            </p>
          </CardContent>
        </Card>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          <strong>Grille en vigueur au {grille.dateEffet}.</strong> {grille.accord}. Source :{' '}
          <a href={grille.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {grille.sourceLabel}
          </a>
          . Vérifiez toujours l'accord régional applicable au lieu d'exécution du chantier. Si un
          minimum conventionnel est inférieur au SMIC ({fmtEuro(SMIC_MENSUEL_35H)} au {SMIC_DATE}),
          c'est le SMIC qui s'applique.
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <GatedReveal
            toolSlug={TOOL_SLUG}
            toolLabel={TOOL_LABEL}
            resultPreview={`${ligne.label} — minimum ${fmtEuro(montant)} brut/mois`}
          >
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Salaire minimum</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Minimum brut mensuel — {ligne.label}
                  </p>
                  <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{fmtEuro(montant)}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {smicApplique
                      ? `Minimum conventionnel (${fmtEuro(ligne.brutMensuel)}) porté au SMIC`
                      : `Base ${grille.baseLabel}`}
                  </p>
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                  <Row label="Brut annuel (× 12)" value={fmtEuro(brutAnnuel)} />
                  <Row label="Taux horaire brut" value={fmtEuro2(tauxHoraire)} />
                  <Row label="Net mensuel estimé" value={`≈ ${fmtEuro(netEstime)}`} />
                  {ligne.coefficient && <Row label="Coefficient" value={String(ligne.coefficient)} />}
                </div>

                <p className="rounded-md border border-gray-100 bg-white px-3 py-2 text-xs text-gray-500">
                  Le net est une estimation indicative (charges salariales ~{Math.round((1 - NET_RATIO[categorie]) * 100)} %). Le net réel dépend de la mutuelle, de la prévoyance et du prélèvement à la source.
                </p>

                <div className="space-y-2 pt-2">
                  <a href={ctaSignupHref}>
                    <Button className="h-11 w-full rounded-full">
                      Essayer Batup gratuitement
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <p className="text-center text-xs text-gray-500">
                    Gérez paie, pointages et minima conventionnels dans un seul outil BTP.
                  </p>
                </div>
              </CardContent>
            </Card>
          </GatedReveal>
        </div>
      </div>

      {unlocked && (
        <StickyResultBar label={`Minimum ${ligne.label}`} value={fmtEuro(montant)} ctaHref={ctaSignupHref} />
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-gray-600">{label}</span>
      <span className="whitespace-nowrap font-semibold text-gray-900">{value}</span>
    </div>
  );
}
