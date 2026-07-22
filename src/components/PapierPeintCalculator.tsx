import { useMemo, useState } from 'react';
import { calculePapierPeint } from '@/lib/papier-peint-math';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { GatedReveal } from './GatedReveal';
import { ToolCta } from './ToolCta';
import { useEmailGate } from '@/lib/email-gate-context';

const TOOL_SLUG = 'calculateur-papier-peint';
const TOOL_LABEL = 'Calculateur de papier peint';

interface Inputs {
  longueur: number;
  largeur: number;
  hauteur: number;
  largeurRouleau: number;
  longueurRouleau: number;
  raccord: number;
}

const DEFAULTS: Inputs = {
  longueur: 0,
  largeur: 0,
  hauteur: 2.5,
  largeurRouleau: 0.53,
  longueurRouleau: 10.05,
  raccord: 0,
};

const N0 = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const N1 = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });

export function PapierPeintCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const { unlocked } = useEmailGate();

  const parseNum = (v: string) => parseFloat(v.replace(',', '.')) || 0;
  const update = (key: keyof Inputs, value: number) => setInputs((prev) => ({ ...prev, [key]: value }));

  const perimetre = useMemo(() => 2 * (inputs.longueur + inputs.largeur), [inputs.longueur, inputs.largeur]);

  const r = useMemo(
    () =>
      calculePapierPeint(
        perimetre,
        inputs.hauteur,
        inputs.largeurRouleau,
        inputs.longueurRouleau,
        inputs.raccord,
      ),
    [perimetre, inputs.hauteur, inputs.largeurRouleau, inputs.longueurRouleau, inputs.raccord],
  );

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: TOOL_SLUG });
    if (r.rouleaux > 0) params.set('rouleaux', String(r.rouleaux));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [r.rouleaux]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre pièce</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label="Longueur de la pièce" suffix="m" value={inputs.longueur} onChange={(v) => update('longueur', parseNum(v))} />
            <Field label="Largeur de la pièce" suffix="m" value={inputs.largeur} onChange={(v) => update('largeur', parseNum(v))} />
            <Field label="Hauteur sous plafond" suffix="m" value={inputs.hauteur} onChange={(v) => update('hauteur', parseNum(v))} />
            <div className="flex items-end">
              <p className="text-xs text-gray-500">
                Périmètre calculé : <span className="font-semibold text-gray-700">{perimetre > 0 ? `${N1.format(perimetre)} m` : '—'}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Le rouleau</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <Field label="Largeur du rouleau" hint="0,53 m standard" suffix="m" value={inputs.largeurRouleau} onChange={(v) => update('largeurRouleau', parseNum(v))} />
            <Field label="Longueur du rouleau" hint="10 m standard" suffix="m" value={inputs.longueurRouleau} onChange={(v) => update('longueurRouleau', parseNum(v))} />
            <Field label="Raccord du motif" hint="0 si sans raccord" suffix="cm" value={inputs.raccord} onChange={(v) => update('raccord', parseNum(v))} />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <GatedReveal
            toolSlug={TOOL_SLUG}
            toolLabel={TOOL_LABEL}
            resultPreview={`${r.rouleaux} rouleaux de papier peint`}
          >
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Rouleaux nécessaires</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">À acheter</p>
                  <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">
                    {r.rouleaux > 0 ? `${r.rouleaux} rouleaux` : '—'}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">+ 1 rouleau de marge conseillé (même bain)</p>
                </div>
                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                  <Row label="Surface des murs" value={r.surfaceM2 > 0 ? `${N1.format(r.surfaceM2)} m²` : '—'} />
                  <Row label="Lés nécessaires" value={r.lesNecessaires > 0 ? `${N0.format(r.lesNecessaires)} lés` : '—'} />
                  <Row label="Lés par rouleau" value={r.lesParRouleau > 0 ? `${N0.format(r.lesParRouleau)} lés` : '—'} />
                </div>
                <ToolCta href={ctaSignupHref} />
              </CardContent>
            </Card>
          </GatedReveal>
        </div>
      </div>

      {unlocked && (
        <StickyResultBar
          label="Rouleaux"
          value={r.rouleaux > 0 ? String(r.rouleaux) : '—'}
          ctaHref={ctaSignupHref}
        />
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
