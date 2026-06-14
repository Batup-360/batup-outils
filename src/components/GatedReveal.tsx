import { Lock } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEmailGate } from '@/lib/email-gate-context';
import { Button } from './ui';

interface GatedRevealProps {
  toolSlug: string;
  toolLabel: string;
  resultPreview?: string;
  children: ReactNode;
}

/**
 * Wrap the result section of a calculator. When the visitor hasn't
 * unlocked yet, the content is blurred and an overlay invites them
 * to enter their email via the global EmailGate modal.
 */
export function GatedReveal({ toolSlug, toolLabel, resultPreview, children }: GatedRevealProps) {
  const { unlocked, openGate } = useEmailGate();

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none select-none blur-md">
        {children}
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
        <div className="w-full max-w-xs rounded-2xl border border-gray-200 bg-white/95 px-5 py-5 text-center shadow-xl backdrop-blur-sm">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#BFC6F4] via-[#7076F1] to-[#5368EE] text-white">
            <Lock className="h-4 w-4" />
          </div>
          <p className="text-sm font-semibold text-gray-900">Votre résultat est prêt</p>
          <p className="mt-1 text-xs leading-relaxed text-gray-600">
            Saisissez votre prénom et email pour l'afficher ici. Une copie part aussi par mail.
          </p>
          <Button
            type="button"
            onClick={() => openGate({ toolSlug, toolLabel, resultPreview })}
            className="mt-4 h-10 w-full rounded-full text-sm font-semibold"
          >
            Voir mon résultat
          </Button>
          <p className="mt-2 text-[10px] uppercase tracking-wider text-gray-400">
            Gratuit · sans engagement
          </p>
        </div>
      </div>
    </div>
  );
}
