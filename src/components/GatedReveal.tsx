import { Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEmailGate } from '@/lib/email-gate-context';
import { useEmbedded } from '@/lib/embed-context';

interface GatedRevealProps {
  toolSlug: string;
  toolLabel: string;
  resultPreview?: string;
  children: ReactNode;
}

/**
 * Wrap the result section of a calculator. The result is always visible —
 * below it, the visitor is offered an optional "receive by email" action
 * that opens the global EmailGate modal. Once they've sent it once, the
 * offer is replaced by a discreet confirmation.
 */
export function GatedReveal({ toolSlug, toolLabel, resultPreview, children }: GatedRevealProps) {
  const { unlocked, openGate } = useEmailGate();
  const embedded = useEmbedded();

  // In an embed (iframe inside the Batup app), show the result only — no email
  // capture, since the user is already an authenticated Batup user.
  if (embedded) {
    return <>{children}</>;
  }

  return (
    <div className="space-y-3">
      {children}
      {unlocked ? (
        <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          Résultat envoyé par email
        </p>
      ) : (
        <button
          type="button"
          onClick={() => openGate({ toolSlug, toolLabel, resultPreview })}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-500/30 bg-white px-4 py-2.5 text-sm font-semibold text-brand-600 transition-colors hover:border-brand-500/60 hover:bg-brand-50"
        >
          <Mail className="h-4 w-4" />
          Recevoir mon résultat par email
        </button>
      )}
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-gray-400">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" /> 100 % gratuit
        </span>
        <span aria-hidden>·</span>
        <span>Sans inscription</span>
        <span aria-hidden>·</span>
        <span>Données en France</span>
      </p>
    </div>
  );
}
