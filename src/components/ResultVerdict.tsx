import { AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react';
import type { VerdictKind } from '@/lib/pricing';

const VERDICT_CONFIG: Record<
  VerdictKind,
  { label: string; description: string; classes: string; Icon: typeof CheckCircle }
> = {
  rentable: {
    label: 'Chantier rentable',
    description:
      'Votre marge est supérieure au seuil de sécurité de 14,5 %. Vous couvrez vos charges et dégagez un bénéfice net.',
    classes: 'bg-emerald-50 border-emerald-300 text-emerald-800',
    Icon: CheckCircle,
  },
  limite: {
    label: 'Rentabilité limite',
    description:
      'Votre marge est inférieure à 14,5 %. Un aléa (retard, SAV, remise) peut faire basculer le chantier en perte.',
    classes: 'bg-amber-50 border-amber-300 text-amber-800',
    Icon: AlertTriangle,
  },
  perte: {
    label: 'Chantier en perte',
    description:
      'Vos coûts directs dépassent le prix de vente. Il faut revoir le devis ou refuser le chantier.',
    classes: 'bg-rose-50 border-rose-300 text-rose-800',
    Icon: TrendingDown,
  },
};

export function ResultVerdict({ verdict }: { verdict: VerdictKind }) {
  const cfg = VERDICT_CONFIG[verdict];
  const Icon = cfg.Icon;
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-4 ${cfg.classes}`}
      role="status"
      data-testid={`verdict-${verdict}`}
    >
      <Icon className="mt-0.5 h-6 w-6 flex-shrink-0" />
      <div>
        <p className="text-base font-semibold">{cfg.label}</p>
        <p className="mt-1 text-sm leading-relaxed opacity-90">{cfg.description}</p>
      </div>
    </div>
  );
}
