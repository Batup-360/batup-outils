import { useMemo, useState } from 'react';
import { Check, Clipboard } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';
import { Card, CardContent, CardHeader, CardTitle, Input, Label } from './ui';
import { StickyResultBar } from './StickyResultBar';
import { GatedReveal } from './GatedReveal';
import { ToolCta } from './ToolCta';
import { useEmailGate } from '@/lib/email-gate-context';

const TOOL_SLUG = 'generateur-attestation-tva';
const TOOL_LABEL = "Générateur d'attestation TVA";

type Taux = '10' | '5.5';

interface Inputs {
  taux: Taux;
  clientNom: string;
  clientAdresse: string;
  adresseTravaux: string;
  natureTravaux: string;
  date: string;
}

const DEFAULTS: Inputs = {
  taux: '10',
  clientNom: '',
  clientAdresse: '',
  adresseTravaux: '',
  natureTravaux: '',
  date: '',
};

const ARTICLE: Record<Taux, string> = {
  '10': "article 279-0 bis du Code général des impôts",
  '5.5': "article 278-0 bis A du Code général des impôts",
};
const TAUX_LABEL: Record<Taux, string> = { '10': '10 %', '5.5': '5,5 %' };

function ph(v: string, fallback: string): string {
  const t = v.trim();
  return t.length > 0 ? t : fallback;
}

export function buildAttestation(inputs: Inputs): string {
  const taux = TAUX_LABEL[inputs.taux];
  const article = ARTICLE[inputs.taux];
  // Clause finale propre au 5,5 % (rénovation énergétique), sinon aucune.
  const clauseEnergie =
    inputs.taux === '5.5'
      ? ' et qu’ils ont la nature de travaux de rénovation énergétique'
      : '';
  // Formulation officielle (BOFiP BOI-LETTRE-000280, 22/10/2025).
  return `MENTION DE CERTIFICATION — TVA À TAUX RÉDUIT DE ${taux}
(${article})

Je soussigné(e) ${ph(inputs.clientNom, '……………………………………')}, demeurant ${ph(inputs.clientAdresse, '……………………………………')}, certifie, en qualité de preneur de la prestation, que les travaux réalisés à l'adresse suivante : ${ph(inputs.adresseTravaux, '……………………………………')}, concernent des locaux à usage d'habitation achevés depuis plus de deux ans et qu'ils n'ont pas eu pour effet, sur une période de deux ans au plus, de concourir à la production d'un immeuble neuf au sens du 2° du 2 du I de l'article 257 du CGI, ni d'entraîner une augmentation de la surface de plancher des locaux existants supérieure à 10 %${clauseEnergie}.

Nature des travaux : ${ph(inputs.natureTravaux, '……………………………………')}

Depuis le 1er mars 2025, cette mention, portée et signée par le client sur le devis ou la facture, remplace l'attestation CERFA. À conserver jusqu'au 31 décembre de la 5e année suivant la facturation.

Fait à …………………………, le ${ph(inputs.date, '……/……/………')}

Signature du client (précédée de la mention « lu et approuvé ») :`;
}

export function AttestationTvaGenerator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [copied, setCopied] = useState(false);
  const { unlocked } = useEmailGate();

  const update = <K extends keyof Inputs>(key: K, value: Inputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const attestation = useMemo(() => buildAttestation(inputs), [inputs]);

  const ctaSignupHref = useMemo(() => {
    const params = new URLSearchParams({ source: TOOL_SLUG, taux: inputs.taux });
    return `${APP_BASE}/signup?${params.toString()}`;
  }, [inputs.taux]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(attestation);
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
            <CardTitle>Informations de l'attestation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Taux de TVA applicable</Label>
              <div className="inline-flex w-full rounded-full border border-gray-200 bg-gray-50 p-1">
                <button
                  type="button"
                  onClick={() => update('taux', '10')}
                  aria-pressed={inputs.taux === '10'}
                  className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    inputs.taux === '10' ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  10 % — rénovation
                </button>
                <button
                  type="button"
                  onClick={() => update('taux', '5.5')}
                  aria-pressed={inputs.taux === '5.5'}
                  className={`flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    inputs.taux === '5.5' ? 'bg-white text-brand-500 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  5,5 % — énergétique
                </button>
              </div>
            </div>

            <TextField label="Nom et prénom du client" value={inputs.clientNom} onChange={(v) => update('clientNom', v)} placeholder="Jean Dupont" />
            <TextField label="Adresse du client" value={inputs.clientAdresse} onChange={(v) => update('clientAdresse', v)} placeholder="12 rue des Lilas, 75000 Paris" />
            <TextField label="Adresse des travaux" value={inputs.adresseTravaux} onChange={(v) => update('adresseTravaux', v)} placeholder="Identique ou différente de l'adresse du client" />
            <TextField label="Nature des travaux" value={inputs.natureTravaux} onChange={(v) => update('natureTravaux', v)} placeholder="Ex. isolation des combles, rénovation salle de bain…" />

            <div className="space-y-1.5">
              <Label htmlFor="att-date">Date</Label>
              <Input id="att-date" type="date" value={inputs.date} onChange={(e) => update('date', e.target.value)} />
            </div>

            <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
              Le taux réduit suppose un logement achevé depuis plus de 2 ans. L'attestation doit être signée par le client avant la facturation et conservée 5 ans.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-20 space-y-4">
          <GatedReveal
            toolSlug={TOOL_SLUG}
            toolLabel={TOOL_LABEL}
            resultPreview={`Attestation TVA ${TAUX_LABEL[inputs.taux]} générée`}
          >
            <Card className="border-brand-500/20 bg-gradient-to-br from-brand-50 to-white">
              <CardHeader>
                <CardTitle>Votre attestation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <pre className="flex-1 whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-gray-900">
{attestation}
                  </pre>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-brand-500 hover:text-brand-500"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" /> Copié
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-4 w-4" /> Copier l'attestation
                    </>
                  )}
                </button>
                <ToolCta href={ctaSignupHref} className="space-y-2 pt-1" />
              </CardContent>
            </Card>
          </GatedReveal>
        </div>
      </div>

      {unlocked && (
        <StickyResultBar
          label="Attestation TVA"
          value={TAUX_LABEL[inputs.taux]}
          ctaHref={ctaSignupHref}
        />
      )}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
