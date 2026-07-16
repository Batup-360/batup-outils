import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { calculeEscalier, BLONDEL_MIN, BLONDEL_MAX } from '@/lib/escalier-math';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { GatedReveal } from './GatedReveal';
import { useEmailGate } from '@/lib/email-gate-context';

const TOOL_SLUG = 'calculateur-escalier';
const TOOL_LABEL = "Calculateur d'escalier";

interface Inputs {
  hauteurTotale: number;
  hauteurMarche: number;
  reculement: number;
}

const DEFAULTS: Inputs = { hauteurTotale: 0, hauteurMarche: 17.5, reculement: 0 };

const CM_FMT = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });

function fmtCm(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '— cm';
  return `${CM_FMT.format(n)} cm`;
}

export function EscalierCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const { unlocked } = useEmailGate();

  const parseNum = (v: string) => parseFloat(v.replace(',', '.')) || 0;
  const update = (key: keyof Inputs, value: number) => setInputs((prev) => ({ ...prev, [key]: value }));

  const r = useMemo(
    () => calculeEscalier(inputs.hauteurTotale, inputs.hauteurMarche, inputs.reculement),
    [inputs],
  );

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: TOOL_SLUG });
    if (r.nombreMarches > 0) params.set('marches', String(r.nombreMarches));
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [r.nombreMarches]);

  return (
    <div className="grid gap-6 pb-20 lg:grid-cols-5 lg:pb-0">
      <div className="space-y-6 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Votre trémie</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Hauteur à monter"
              hint="De sol fini à sol fini"
              suffix="cm"
              value={inputs.hauteurTotale}
              onChange={(v) => update('hauteurTotale', parseNum(v))}
            />
            <Field
              label="Hauteur de marche souhaitée"
              hint="Idéal 16 à 18 cm"
              suffix="cm"
              value={inputs.hauteurMarche}
              onChange={(v) => update('hauteurMarche', parseNum(v))}
            />
            <div className="sm:col-span-2">
              <Field
                label="Reculement disponible (optionnel)"
                hint="Longueur au sol dispo. Laissez vide pour un giron calculé par Blondel."
                suffix="cm"
                value={inputs.reculement}
                onChange={(v) => update('reculement', parseNum(v))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <GatedReveal
            toolSlug={TOOL_SLUG}
            toolLabel={TOOL_LABEL}
            resultPreview={`${r.nombreMarches} marches · marche ${fmtCm(r.hauteurMarcheCm)} · giron ${fmtCm(r.gironCm)}`}
          >
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Votre escalier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">Nombre de marches</p>
                  <p className="mt-1 text-4xl font-bold text-brand-500 sm:text-5xl">
                    {r.nombreMarches > 0 ? r.nombreMarches : '—'}
                  </p>
                </div>

                {r.nombreMarches > 0 && (
                  <div
                    className={`flex items-start gap-3 rounded-lg border p-3 text-sm ${
                      r.confortable
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : 'border-amber-300 bg-amber-50 text-amber-800'
                    }`}
                    role="status"
                  >
                    {r.confortable ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold">
                        {r.confortable ? 'Escalier confortable' : 'À ajuster'}
                      </p>
                      <p className="mt-0.5 opacity-90">
                        Blondel : {fmtCm(r.blondelCm)} (confort entre {BLONDEL_MIN} et {BLONDEL_MAX} cm)
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                  <Row label="Hauteur de marche" value={fmtCm(r.hauteurMarcheCm)} />
                  <Row label="Giron" value={fmtCm(r.gironCm)} />
                  <Row label="Reculement total" value={fmtCm(r.reculementTotalCm)} />
                  <Row
                    label={
                      <span className="inline-flex items-center gap-1">
                        Formule de Blondel
                        <span title="2 × hauteur de marche + giron" className="cursor-help text-gray-400">
                          <HelpCircle className="h-3.5 w-3.5" />
                        </span>
                      </span>
                    }
                    value={fmtCm(r.blondelCm)}
                  />
                </div>

                <div className="space-y-2 pt-1">
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
        <StickyResultBar
          label="Nombre de marches"
          value={r.nombreMarches > 0 ? String(r.nombreMarches) : '—'}
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

function Row({ label, value }: { label: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
