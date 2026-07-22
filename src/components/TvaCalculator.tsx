import { useMemo, useState } from 'react';
import { Check, Clipboard } from 'lucide-react';
import { htToTtc, ttcToHt, tvaFromHT } from '@/lib/tva-math';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { GatedReveal } from './GatedReveal';
import { ToolCta } from './ToolCta';
import { useEmailGate } from '@/lib/email-gate-context';

const TOOL_SLUG = 'calculateur-tva';
const TOOL_LABEL = 'Calculateur de TVA';

type Sens = 'htToTtc' | 'ttcToHt';

interface Inputs {
  montant: number;
  sens: Sens;
  taux: number;
}

const DEFAULTS: Inputs = { montant: 0, sens: 'htToTtc', taux: 20 };

const RATES = [20, 10, 5.5, 2.1];

const EURO_FMT = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function fmtEuro(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— €';
  return `${EURO_FMT.format(n)} €`;
}
function fmtRate(n: number): string {
  return `${n.toString().replace('.', ',')} %`;
}

export function TvaCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [copied, setCopied] = useState(false);
  const { unlocked } = useEmailGate();

  const updateNumber = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const results = useMemo(() => {
    const { montant, sens, taux } = inputs;
    const ht = sens === 'htToTtc' ? montant : ttcToHt(montant, taux);
    const ttc = sens === 'htToTtc' ? htToTtc(montant, taux) : montant;
    const tva = tvaFromHT(ht, taux);
    return { ht, ttc, tva };
  }, [inputs]);

  const cible = inputs.sens === 'htToTtc' ? results.ttc : results.ht;
  const cibleLabel = inputs.sens === 'htToTtc' ? 'Montant TTC' : 'Montant HT';

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: TOOL_SLUG });
    if (inputs.montant > 0) params.set('amount', inputs.montant.toFixed(2));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [inputs.montant]);

  const handleCopy = async () => {
    const text = `HT : ${fmtEuro(results.ht)} · TVA (${fmtRate(inputs.taux)}) : ${fmtEuro(results.tva)} · TTC : ${fmtEuro(results.ttc)}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — ignore
    }
  };

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre montant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Sens de conversion</Label>
              <div className="inline-flex w-full rounded-full border border-gray-200 bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => setInputs((p) => ({ ...p, sens: 'htToTtc' }))}
                  aria-pressed={inputs.sens === 'htToTtc'}
                  className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    inputs.sens === 'htToTtc' ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  HT → TTC
                </button>
                <button
                  type="button"
                  onClick={() => setInputs((p) => ({ ...p, sens: 'ttcToHt' }))}
                  aria-pressed={inputs.sens === 'ttcToHt'}
                  className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    inputs.sens === 'ttcToHt' ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  TTC → HT
                </button>
              </div>
            </div>

            <Field
              label={inputs.sens === 'htToTtc' ? 'Montant hors taxes (HT)' : 'Montant toutes taxes (TTC)'}
              suffix="€"
              value={inputs.montant}
              onChange={(v) => updateNumber('montant', v)}
            />

            <div className="space-y-1.5">
              <Label>Taux de TVA</Label>
              <div className="flex flex-wrap gap-2">
                {RATES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setInputs((p) => ({ ...p, taux: r }))}
                    aria-pressed={inputs.taux === r}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      inputs.taux === r
                        ? 'bg-brand-500 text-white'
                        : 'border border-gray-200 bg-white text-gray-700 hover:border-brand-500/50'
                    }`}
                  >
                    {fmtRate(r)}
                  </button>
                ))}
              </div>
              <div className="relative pt-1">
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="any"
                  value={inputs.taux}
                  onChange={(e) => updateNumber('taux', e.target.value)}
                  className="pr-16"
                  aria-label="Taux de TVA personnalisé"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  % (autre)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <GatedReveal
            toolSlug={TOOL_SLUG}
            toolLabel={TOOL_LABEL}
            resultPreview={`${cibleLabel} ${fmtEuro(cible)} (TVA ${fmtRate(inputs.taux)})`}
          >
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Votre résultat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">{cibleLabel}</p>
                  <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{fmtEuro(cible)}</p>
                  <p className="mt-1 text-xs text-gray-500">TVA à {fmtRate(inputs.taux)}</p>
                </div>
                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                  <Row label="Montant HT" value={fmtEuro(results.ht)} />
                  <Row label={`TVA (${fmtRate(inputs.taux)})`} value={fmtEuro(results.tva)} />
                  <Row label="Montant TTC" value={fmtEuro(results.ttc)} />
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:border-brand-500 hover:text-brand-500"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copié
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-3.5 w-3.5" /> Copier le résultat
                    </>
                  )}
                </button>
                {inputs.sens === 'ttcToHt' && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
                    <span className="font-semibold">Erreur classique :</span> pour enlever la TVA, on
                    divise par 1,20 (à 20 %), on ne soustrait pas 20 %. Sur 120 € TTC, soustraire
                    20 % donne 96 € au lieu de 100 €.
                  </div>
                )}
                <ToolCta href={ctaSignupHref} />
              </CardContent>
            </Card>
          </GatedReveal>
        </div>
      </div>

      {unlocked && <StickyResultBar label={cibleLabel} value={fmtEuro(cible)} ctaHref={ctaSignupHref} />}
    </div>
  );
}

function Field({
  label,
  suffix,
  value,
  onChange,
}: {
  label: string;
  suffix: string;
  value: number;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="pr-16"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          {suffix}
        </span>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
