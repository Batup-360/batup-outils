import { useMemo, useState } from 'react';
import { volumeBeton, dosageBeton } from '@/lib/beton-math';
import { volumeCylindre } from '@/lib/volume-math';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { GatedReveal } from './GatedReveal';
import { ToolCta } from './ToolCta';
import { useEmailGate } from '@/lib/email-gate-context';

const TOOL_SLUG = 'calculateur-beton';
const TOOL_LABEL = 'Calculateur de béton';

type Forme = 'rectangle' | 'poteau';

interface Inputs {
  forme: Forme;
  longueur: number;
  largeur: number;
  epaisseur: number;
  diametre: number;
  hauteurPoteau: number;
  nombrePoteaux: number;
  dosage: number;
  margePct: number;
}

const DEFAULTS: Inputs = {
  forme: 'rectangle',
  longueur: 0,
  largeur: 0,
  epaisseur: 12,
  diametre: 20,
  hauteurPoteau: 0,
  nombrePoteaux: 1,
  dosage: 350,
  margePct: 10,
};

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

export function BetonCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const { unlocked } = useEmailGate();

  const updateNumber = (key: keyof Inputs, value: string) => {
    const num = parseFloat(value.replace(',', '.')) || 0;
    setInputs((prev) => ({ ...prev, [key]: num }));
  };

  const results = useMemo(() => {
    const volumeBrut =
      inputs.forme === 'rectangle'
        ? volumeBeton(inputs.longueur, inputs.largeur, inputs.epaisseur)
        : volumeCylindre(inputs.diametre / 100, inputs.hauteurPoteau) *
          Math.max(1, Math.floor(inputs.nombrePoteaux || 0));
    const volume = volumeBrut * (1 + inputs.margePct / 100);
    const mat = dosageBeton(volume, inputs.dosage);
    return { volumeBrut, ...mat };
  }, [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: TOOL_SLUG });
    if (results.volumeM3 > 0) params.set('volume_beton', results.volumeM3.toFixed(2));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [results.volumeM3]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Dimensions de l'ouvrage</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Forme de l'ouvrage</Label>
              <div className="inline-flex w-full rounded-full border border-gray-200 bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => setInputs((p) => ({ ...p, forme: 'rectangle' }))}
                  aria-pressed={inputs.forme === 'rectangle'}
                  className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    inputs.forme === 'rectangle' ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dalle / semelle
                </button>
                <button
                  type="button"
                  onClick={() => setInputs((p) => ({ ...p, forme: 'poteau' }))}
                  aria-pressed={inputs.forme === 'poteau'}
                  className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    inputs.forme === 'poteau' ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Poteau rond
                </button>
              </div>
            </div>
            {inputs.forme === 'rectangle' ? (
              <>
                <Field label="Longueur" suffix="m" value={inputs.longueur} onChange={(v) => updateNumber('longueur', v)} />
                <Field label="Largeur" suffix="m" value={inputs.largeur} onChange={(v) => updateNumber('largeur', v)} />
                <Field label="Épaisseur" hint="Épaisseur de la dalle ou de la semelle" suffix="cm" value={inputs.epaisseur} onChange={(v) => updateNumber('epaisseur', v)} />
              </>
            ) : (
              <>
                <Field label="Diamètre du poteau" suffix="cm" value={inputs.diametre} onChange={(v) => updateNumber('diametre', v)} />
                <Field label="Hauteur du poteau" suffix="m" value={inputs.hauteurPoteau} onChange={(v) => updateNumber('hauteurPoteau', v)} />
                <Field label="Nombre de poteaux" suffix="u" value={inputs.nombrePoteaux} onChange={(v) => updateNumber('nombrePoteaux', v)} />
              </>
            )}
            <div className="space-y-1.5">
              <Label>Marge de sécurité</Label>
              <select
                value={inputs.margePct}
                onChange={(e) => updateNumber('margePct', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="0">Aucune (0 %)</option>
                <option value="5">+ 5 % (pose soignée)</option>
                <option value="10">+ 10 % (recommandé)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dosage en ciment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1.5">
              <Label>Dosage selon l'usage</Label>
              <select
                value={inputs.dosage}
                onChange={(e) => updateNumber('dosage', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="250">250 kg/m³ — fondation légère, béton de propreté</option>
                <option value="350">350 kg/m³ — dalle, terrasse (standard)</option>
                <option value="400">400 kg/m³ — béton armé, structurel</option>
              </select>
              <p className="text-xs text-gray-500">
                Quantités estimatives pour un béton de chantier courant. Pour un ouvrage porteur, suivez l'étude béton.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <GatedReveal
            toolSlug={TOOL_SLUG}
            toolLabel={TOOL_LABEL}
            resultPreview={`Béton ${fmtM3(results.volumeM3)} · ${fmtKg(results.cimentKg)} de ciment`}
          >
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Votre béton</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Volume de béton</p>
                  <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{fmtM3(results.volumeM3)}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {inputs.margePct > 0
                      ? `dont +${inputs.margePct} % de marge (${fmtM3(results.volumeBrut)} net)`
                      : 'sans marge de sécurité'}
                  </p>
                </div>
                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                  <Row label="Ciment" value={fmtKg(results.cimentKg)} />
                  <Row label="Sacs de 35 kg" value={results.sacs35 > 0 ? `${results.sacs35} sacs` : '—'} />
                  <Row label="Sacs de 25 kg" value={results.sacs25 > 0 ? `${results.sacs25} sacs` : '—'} />
                  <Row label="Sable" value={fmtKg(results.sableKg)} />
                  <Row label="Gravier" value={fmtKg(results.gravierKg)} />
                  <Row label="Eau de gâchage" value={fmtL(results.eauL)} />
                </div>
                {results.volumeM3 > 1 && (
                  <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-xs leading-relaxed text-sky-800">
                    Au-delà de 1 m³, la livraison en toupie (béton prêt à l'emploi, ~120 à 160 €/m³ HT)
                    est souvent plus économique et plus régulière que le béton fait à la bétonnière.
                  </div>
                )}
                <ToolCta href={ctaSignupHref} />
              </CardContent>
            </Card>
          </GatedReveal>
        </div>
      </div>

      {unlocked && (
        <StickyResultBar label="Volume de béton" value={fmtM3(results.volumeM3)} ctaHref={ctaSignupHref} />
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
  step = 'any',
}: {
  label: string;
  hint?: string;
  suffix: string;
  value: number;
  onChange: (v: string) => void;
  step?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
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
