import { useMemo, useState } from 'react';
import {
  pentePourcent,
  angleDegres,
  longueurRampant,
  pourcentVersDegres,
  degresVersPourcent,
} from '@/lib/pente-math';
import { buildPenteToiturePayload } from '@/lib/embed-payloads';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { GatedReveal } from './GatedReveal';
import { ToolCta } from './ToolCta';
import { useEmailGate } from '@/lib/email-gate-context';

const TOOL_SLUG = 'calculateur-pente-toiture';
const TOOL_LABEL = 'Calculateur de pente de toiture';

type Mode = 'dimensions' | 'pente';
type Unite = 'pourcent' | 'degres';

interface Inputs {
  mode: Mode;
  base: number;
  hauteur: number;
  penteValeur: number;
  unite: Unite;
}

const DEFAULTS: Inputs = { mode: 'dimensions', base: 0, hauteur: 0, penteValeur: 0, unite: 'pourcent' };

const N1 = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });
const N2 = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });

function fmtPct(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— %';
  return `${N1.format(n)} %`;
}
function fmtDeg(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— °';
  return `${N1.format(n)} °`;
}
function fmtM(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— m';
  return `${N2.format(n)} m`;
}

export function PenteToitureCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const { unlocked } = useEmailGate();

  const parseNum = (v: string) => parseFloat(v.replace(',', '.')) || 0;
  const update = (key: keyof Inputs, value: number) => setInputs((prev) => ({ ...prev, [key]: value }));

  const results = useMemo(() => {
    if (inputs.mode === 'dimensions') {
      const pct = pentePourcent(inputs.hauteur, inputs.base);
      return {
        pourcent: pct,
        degres: angleDegres(inputs.hauteur, inputs.base),
        rampant: longueurRampant(inputs.hauteur, inputs.base),
        hasRampant: true,
      };
    }
    if (inputs.unite === 'pourcent') {
      return { pourcent: inputs.penteValeur, degres: pourcentVersDegres(inputs.penteValeur), rampant: 0, hasRampant: false };
    }
    return { pourcent: degresVersPourcent(inputs.penteValeur), degres: inputs.penteValeur, rampant: 0, hasRampant: false };
  }, [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: TOOL_SLUG });
    if (results.pourcent > 0) params.set('pente', results.pourcent.toFixed(1));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [results.pourcent]);

  const embedResult = useMemo(
    () =>
      buildPenteToiturePayload({
        pourcent: results.pourcent,
        degres: results.degres,
        rampantM: results.hasRampant ? results.rampant : 0,
      }),
    [results],
  );

  const isDim = inputs.mode === 'dimensions';

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre toiture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Méthode</Label>
              <div className="inline-flex w-full rounded-full border border-gray-200 bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => setInputs((p) => ({ ...p, mode: 'dimensions' }))}
                  aria-pressed={isDim}
                  className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    isDim ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Depuis les dimensions
                </button>
                <button
                  type="button"
                  onClick={() => setInputs((p) => ({ ...p, mode: 'pente' }))}
                  aria-pressed={!isDim}
                  className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    !isDim ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Pente connue
                </button>
              </div>
            </div>

            {isDim ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Base horizontale" hint="Portée à l'horizontale" suffix="m" value={inputs.base} onChange={(v) => update('base', parseNum(v))} />
                <Field label="Dénivelé (hauteur)" hint="Égout au faîtage" suffix="m" value={inputs.hauteur} onChange={(v) => update('hauteur', parseNum(v))} />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Unité de la pente connue</Label>
                  <div className="inline-flex w-full rounded-full border border-gray-200 bg-gray-50 p-1">
                    <button
                      type="button"
                      onClick={() => setInputs((p) => ({ ...p, unite: 'pourcent' }))}
                      aria-pressed={inputs.unite === 'pourcent'}
                      className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                        inputs.unite === 'pourcent' ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Pourcentage
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputs((p) => ({ ...p, unite: 'degres' }))}
                      aria-pressed={inputs.unite === 'degres'}
                      className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                        inputs.unite === 'degres' ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Degrés
                    </button>
                  </div>
                </div>
                <Field
                  label={inputs.unite === 'pourcent' ? 'Pente' : 'Angle'}
                  suffix={inputs.unite === 'pourcent' ? '%' : '°'}
                  value={inputs.penteValeur}
                  onChange={(v) => update('penteValeur', parseNum(v))}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <GatedReveal
            toolSlug={TOOL_SLUG}
            toolLabel={TOOL_LABEL}
            resultPreview={`Pente ${fmtPct(results.pourcent)} (${fmtDeg(results.degres)})`}
          >
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Votre pente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Pente</p>
                  <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{fmtPct(results.pourcent)}</p>
                  <p className="mt-1 text-xs text-gray-500">soit {fmtDeg(results.degres)}</p>
                </div>
                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                  <Row label="Pente" value={fmtPct(results.pourcent)} />
                  <Row label="Angle" value={fmtDeg(results.degres)} />
                  <Row label="Équivalent" value={results.pourcent > 0 ? `${N1.format(results.pourcent)} cm/m` : '—'} />
                  {results.hasRampant && <Row label="Longueur du rampant" value={fmtM(results.rampant)} />}
                </div>
                <ToolCta href={ctaSignupHref} embedResult={embedResult} />
              </CardContent>
            </Card>
          </GatedReveal>
        </div>
      </div>

      {unlocked && <StickyResultBar label="Pente" value={fmtPct(results.pourcent)} ctaHref={ctaSignupHref} />}
    </div>
  );
}

function Field({
  label,
  hint,
  suffix,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
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
          className="pr-12"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          {suffix}
        </span>
      </div>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
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
