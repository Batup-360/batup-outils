import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { volumeMortier, dosageMortier } from '@/lib/mortier-math';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { GatedReveal } from './GatedReveal';
import { useEmailGate } from '@/lib/email-gate-context';

const TOOL_SLUG = 'calculateur-mortier';
const TOOL_LABEL = 'Calculateur de mortier';

interface Inputs {
  surface: number;
  epaisseur: number;
  dosage: number;
  margePct: number;
}

const DEFAULTS: Inputs = { surface: 0, epaisseur: 2, dosage: 350, margePct: 10 };

const KG_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const M3_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });

function fmtM3(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— m³';
  return `${M3_FMT.format(n)} m³`;
}
function fmtKg(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— kg';
  return `${KG_FMT.format(Math.round(n))} kg`;
}
function fmtL(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— L';
  return `${KG_FMT.format(Math.round(n))} L`;
}

export function MortierCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const { unlocked } = useEmailGate();

  const updateNumber = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const results = useMemo(() => {
    const volumeBrut = volumeMortier(inputs.surface, inputs.epaisseur);
    const volume = volumeBrut * (1 + inputs.margePct / 100);
    return { volumeBrut, ...dosageMortier(volume, inputs.dosage) };
  }, [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: TOOL_SLUG });
    if (results.volumeM3 > 0) params.set('volume_mortier', results.volumeM3.toFixed(2));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [results.volumeM3]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre ouvrage</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label="Surface à couvrir" hint="Surface d'enduit, de joints ou de chape" suffix="m²" value={inputs.surface} onChange={(v) => updateNumber('surface', v)} />
            <Field label="Épaisseur" suffix="cm" value={inputs.epaisseur} onChange={(v) => updateNumber('epaisseur', v)} />
            <div className="space-y-1.5">
              <Label>Usage / dosage</Label>
              <select
                value={inputs.dosage}
                onChange={(e) => updateNumber('dosage', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="300">300 kg/m³ — montage non porteur</option>
                <option value="350">350 kg/m³ — montage porteur / enduit (standard)</option>
                <option value="400">400 kg/m³ — enduit riche / scellement</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Marge de sécurité</Label>
              <select
                value={inputs.margePct}
                onChange={(e) => updateNumber('margePct', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="0">Aucune (0 %)</option>
                <option value="5">+ 5 %</option>
                <option value="10">+ 10 % (recommandé)</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <GatedReveal
            toolSlug={TOOL_SLUG}
            toolLabel={TOOL_LABEL}
            resultPreview={`Mortier ${fmtM3(results.volumeM3)} · ${fmtKg(results.cimentKg)} de ciment`}
          >
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Votre mortier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Volume de mortier</p>
                  <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{fmtM3(results.volumeM3)}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {inputs.margePct > 0 ? `dont +${inputs.margePct} % de marge` : 'sans marge'}
                  </p>
                </div>
                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                  <Row label="Ciment" value={fmtKg(results.cimentKg)} />
                  <Row label="Sacs de 35 kg" value={results.sacs35 > 0 ? `${results.sacs35} sacs` : '—'} />
                  <Row label="Sacs de 25 kg" value={results.sacs25 > 0 ? `${results.sacs25} sacs` : '—'} />
                  <Row label="Sable" value={fmtKg(results.sableKg)} />
                  <Row label="Eau de gâchage" value={fmtL(results.eauL)} />
                </div>
                <div className="space-y-2 pt-2">
                  <a href={ctaSignupHref}>
                    <Button className="h-11 w-full rounded-full">
                      Essayer Batup gratuitement
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </GatedReveal>
        </div>
      </div>

      {unlocked && (
        <StickyResultBar label="Volume de mortier" value={fmtM3(results.volumeM3)} ctaHref={ctaSignupHref} />
      )}
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
          className="pr-16"
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
