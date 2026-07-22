import { useMemo, useState } from 'react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { GatedReveal } from './GatedReveal';
import { ToolCta } from './ToolCta';
import { useEmailGate } from '@/lib/email-gate-context';
import { useEmbedPrefill } from '@/lib/embed-context';
import type { EmbedResultPayload } from '@/lib/embed-result';

/**
 * Moteur partagé des calculateurs de quantités « métré » (parpaings, briques,
 * placo, carrelage, parquet, terrasse, isolant, peinture, consommation).
 * Chaque outil fournit une config : champs, listes déroulantes et fonction de
 * calcul. Le résultat s'affiche directement, avec l'option d'envoi par email.
 */

export interface QuantiteField {
  key: string;
  label: string;
  hint?: string;
  suffix: string;
  default?: number;
}

export interface QuantiteSelect {
  key: string;
  label: string;
  hint?: string;
  default: number;
  options: { label: string; value: number }[];
}

export interface QuantiteResult {
  mainLabel: string;
  mainValue: string;
  sub?: string;
  rows: { label: string; value: string }[];
}

export interface QuantiteConfig {
  toolSlug: string;
  toolLabel: string;
  source: string;
  inputTitle: string;
  fields: QuantiteField[];
  selects?: QuantiteSelect[];
  compute: (v: Record<string, number>) => QuantiteResult;
  /** Payload « Utiliser dans le devis » en mode embed (voir src/lib/embed-payloads.ts). */
  buildEmbedPayload?: (v: Record<string, number>) => EmbedResultPayload;
  stickyLabel: string;
}

const INT_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const NUM_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });

export const fmtInt = (n: number): string => (Number.isFinite(n) && n > 0 ? INT_FMT.format(Math.round(n)) : '—');
export const fmtNum = (n: number): string => (Number.isFinite(n) && n > 0 ? NUM_FMT.format(n) : '—');

export function QuantiteCalculator({ config }: { config: QuantiteConfig }) {
  const { unlocked } = useEmailGate();
  const prefill = useEmbedPrefill();

  const [values, setValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const f of config.fields) init[f.key] = f.default ?? 0;
    for (const s of config.selects ?? []) init[s.key] = s.default;
    // Pré-remplissage embed (v1) : uniquement le champ dont l'entrée EST une
    // surface en m² — jamais les autres champs (dimensions, taux, densités…).
    if (config.fields.some((f) => f.key === 'surface' && f.suffix === 'm²')) {
      const surface = prefill.num('surface', { min: 0.1, max: 100000 });
      if (surface !== undefined) init.surface = surface;
    }
    return init;
  });

  const setNum = (key: string, raw: string) => {
    const num = parseFloat(raw.replace(',', '.')) || 0;
    setValues((prev) => ({ ...prev, [key]: num }));
  };

  const result = useMemo(() => config.compute(values), [config, values]);
  const embedResult = useMemo(() => config.buildEmbedPayload?.(values), [config, values]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: config.source });
    // Carry the calculator inputs into the signup URL so the onboarding can be
    // pre-filled with the visitor's data (per the README CTA contract).
    for (const f of config.fields) {
      const v = values[f.key];
      if (Number.isFinite(v) && v > 0) params.set(f.key, String(v));
    }
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [config.source, config.fields, values]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>{config.inputTitle}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {config.fields.map((f) => (
              <Field
                key={f.key}
                label={f.label}
                hint={f.hint}
                suffix={f.suffix}
                value={values[f.key]}
                onChange={(v) => setNum(f.key, v)}
              />
            ))}
            {(config.selects ?? []).map((s) => (
              <div key={s.key} className="space-y-1.5">
                <Label>{s.label}</Label>
                <select
                  value={values[s.key]}
                  onChange={(e) => setNum(s.key, e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                >
                  {s.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {s.hint && <p className="text-xs text-gray-500">{s.hint}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <GatedReveal
            toolSlug={config.toolSlug}
            toolLabel={config.toolLabel}
            resultPreview={`${result.mainLabel} : ${result.mainValue}`}
          >
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Votre résultat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">{result.mainLabel}</p>
                  <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">{result.mainValue}</p>
                  {result.sub && <p className="mt-1 text-xs text-gray-500">{result.sub}</p>}
                </div>
                {result.rows.length > 0 && (
                  <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                    {result.rows.map((r) => (
                      <div key={r.label} className="flex items-center justify-between">
                        <span className="text-gray-600">{r.label}</span>
                        <span className="font-semibold text-gray-900">{r.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                <ToolCta href={ctaSignupHref} embedResult={embedResult} />
              </CardContent>
            </Card>
          </GatedReveal>
        </div>
      </div>

      {unlocked && (
        <StickyResultBar label={config.stickyLabel} value={result.mainValue} ctaHref={ctaSignupHref} />
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
