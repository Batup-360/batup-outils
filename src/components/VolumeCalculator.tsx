import { useMemo, useState } from 'react';
import { volumeForme, LITRES_PAR_M3, type FormeVolume } from '@/lib/volume-math';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { GatedReveal } from './GatedReveal';
import { ToolCta } from './ToolCta';
import { useEmailGate } from '@/lib/email-gate-context';

const TOOL_SLUG = 'calculateur-volume';
const TOOL_LABEL = 'Calculateur de volume';

interface Inputs {
  forme: FormeVolume;
  a: number;
  b: number;
  c: number;
}

const DEFAULTS: Inputs = { forme: 'pave', a: 0, b: 0, c: 0 };

const M3_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });
const L_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });

function fmtM3(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— m³';
  return `${M3_FMT.format(n)} m³`;
}
function fmtL(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— L';
  return `${L_FMT.format(Math.round(n))} L`;
}

export function VolumeCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const { unlocked } = useEmailGate();

  const parseNum = (v: string) => parseFloat(v.replace(',', '.')) || 0;
  const update = (key: keyof Inputs, value: number) => setInputs((prev) => ({ ...prev, [key]: value }));

  const volume = useMemo(
    () => volumeForme(inputs.forme, inputs.a, inputs.b, inputs.c),
    [inputs],
  );

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: TOOL_SLUG });
    if (volume > 0) params.set('volume', volume.toFixed(2));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [volume]);

  const isPave = inputs.forme === 'pave';

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Forme et dimensions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Forme</Label>
              <div className="inline-flex w-full rounded-full border border-gray-200 bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => setInputs((p) => ({ ...p, forme: 'pave' }))}
                  aria-pressed={isPave}
                  className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    isPave ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Pavé (boîte)
                </button>
                <button
                  type="button"
                  onClick={() => setInputs((p) => ({ ...p, forme: 'cylindre' }))}
                  aria-pressed={!isPave}
                  className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    !isPave ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cylindre
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {isPave ? (
                <>
                  <Field label="Longueur" suffix="m" value={inputs.a} onChange={(v) => update('a', parseNum(v))} />
                  <Field label="Largeur" suffix="m" value={inputs.b} onChange={(v) => update('b', parseNum(v))} />
                  <Field label="Hauteur" suffix="m" value={inputs.c} onChange={(v) => update('c', parseNum(v))} />
                </>
              ) : (
                <>
                  <Field label="Diamètre" suffix="m" value={inputs.a} onChange={(v) => update('a', parseNum(v))} />
                  <Field label="Hauteur" suffix="m" value={inputs.b} onChange={(v) => update('b', parseNum(v))} />
                </>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Pour un terrassement, pensez au foisonnement (+20 à 40 %) pour estimer le volume à évacuer.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <GatedReveal
            toolSlug={TOOL_SLUG}
            toolLabel={TOOL_LABEL}
            resultPreview={`Volume ${fmtM3(volume)} (${fmtL(volume * LITRES_PAR_M3)})`}
          >
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Votre volume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Volume</p>
                  <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{fmtM3(volume)}</p>
                  <p className="mt-1 text-xs text-gray-500">soit {fmtL(volume * LITRES_PAR_M3)}</p>
                </div>
                <ToolCta href={ctaSignupHref} className="space-y-2 pt-1" />
              </CardContent>
            </Card>
          </GatedReveal>
        </div>
      </div>

      {unlocked && <StickyResultBar label="Volume" value={fmtM3(volume)} ctaHref={ctaSignupHref} />}
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
          className="pr-10"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          {suffix}
        </span>
      </div>
    </div>
  );
}
