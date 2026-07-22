import { useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { aireForme, type FormeSurface } from '@/lib/surface-math';
import { buildSurfacePayload } from '@/lib/embed-payloads';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { GatedReveal } from './GatedReveal';
import { ToolCta } from './ToolCta';
import { useEmailGate } from '@/lib/email-gate-context';

const TOOL_SLUG = 'calculateur-surface';
const TOOL_LABEL = 'Calculateur de surface';

interface Zone {
  id: number;
  forme: FormeSurface;
  a: number;
  b: number;
}

let nextId = 1;
const newZone = (): Zone => ({ id: nextId++, forme: 'rectangle', a: 0, b: 0 });

const M2_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });

function fmtM2(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— m²';
  return `${M2_FMT.format(n)} m²`;
}

const DIMS: Record<FormeSurface, { a: string; b?: string }> = {
  rectangle: { a: 'Longueur', b: 'Largeur' },
  triangle: { a: 'Base', b: 'Hauteur' },
  cercle: { a: 'Diamètre' },
};

function formuleSurface(z: Zone): string {
  const n = (x: number) => (x > 0 ? String(x).replace('.', ',') : '?');
  switch (z.forme) {
    case 'rectangle':
      return `${n(z.a)} × ${n(z.b)}`;
    case 'triangle':
      return `${n(z.a)} × ${n(z.b)} ÷ 2`;
    case 'cercle':
      return `π × (${n(z.a)} ÷ 2)²`;
    default:
      return '';
  }
}

export function SurfaceCalculator() {
  const [zones, setZones] = useState<Zone[]>(() => [newZone()]);
  const { unlocked } = useEmailGate();

  const update = (id: number, patch: Partial<Zone>) =>
    setZones((prev) => prev.map((z) => (z.id === id ? { ...z, ...patch } : z)));
  const addZone = () => setZones((prev) => [...prev, newZone()]);
  const removeZone = (id: number) => setZones((prev) => (prev.length > 1 ? prev.filter((z) => z.id !== id) : prev));

  const parseNum = (v: string) => parseFloat(v.replace(',', '.')) || 0;

  const total = useMemo(
    () => zones.reduce((sum, z) => sum + aireForme(z.forme, z.a, z.b), 0),
    [zones],
  );

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: TOOL_SLUG });
    if (total > 0) params.set('surface', total.toFixed(2));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [total]);

  const embedResult = useMemo(() => buildSurfacePayload(total, zones.length), [total, zones.length]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Vos zones à mesurer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {zones.map((z, i) => {
              const dims = DIMS[z.forme];
              return (
                <div key={z.id} className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Zone {i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeZone(z.id)}
                      disabled={zones.length === 1}
                      className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 disabled:opacity-30"
                      aria-label={`Supprimer la zone ${i + 1}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label>Forme</Label>
                      <select
                        value={z.forme}
                        onChange={(e) => update(z.id, { forme: e.target.value as FormeSurface })}
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      >
                        <option value="rectangle">Rectangle</option>
                        <option value="triangle">Triangle</option>
                        <option value="cercle">Cercle</option>
                      </select>
                    </div>
                    <Field label={dims.a} suffix="m" value={z.a} onChange={(v) => update(z.id, { a: parseNum(v) })} />
                    {dims.b ? (
                      <Field label={dims.b} suffix="m" value={z.b} onChange={(v) => update(z.id, { b: parseNum(v) })} />
                    ) : (
                      <div className="hidden sm:block" />
                    )}
                  </div>
                  <p className="mt-2 text-right text-xs text-gray-500">
                    <span className="font-mono">{formuleSurface(z)}</span> = {fmtM2(aireForme(z.forme, z.a, z.b))}
                  </p>
                </div>
              );
            })}

            <button
              type="button"
              onClick={addZone}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-brand-500/50 hover:text-brand-600"
            >
              <Plus className="h-4 w-4" />
              Ajouter une zone
            </button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <GatedReveal
            toolSlug={TOOL_SLUG}
            toolLabel={TOOL_LABEL}
            resultPreview={`Surface totale ${fmtM2(total)}`}
          >
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Surface totale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Somme de {zones.length} zone{zones.length > 1 ? 's' : ''}
                  </p>
                  <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{fmtM2(total)}</p>
                </div>
                <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-3 text-xs text-gray-500">
                  <p>Pour un revêtement, ajoutez 5 à 10 % de perte pour les coupes et les chutes.</p>
                  <p>
                    <strong className="text-gray-700">Surface brute au sol</strong> — ce n'est pas un
                    mesurage légal Carrez (vente) ou Boutin (location), qui déduisent les murs et les
                    zones de moins de 1,80 m.
                  </p>
                </div>
                <ToolCta href={ctaSignupHref} className="space-y-2 pt-1" embedResult={embedResult} />
              </CardContent>
            </Card>
          </GatedReveal>
        </div>
      </div>

      {unlocked && <StickyResultBar label="Surface totale" value={fmtM2(total)} ctaHref={ctaSignupHref} />}
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
