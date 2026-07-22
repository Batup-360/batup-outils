import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui';
import { useEmbedSlug } from '@/lib/embed-context';
import { emitEmbedResult, validEmbedLines, type EmbedResultPayload } from '@/lib/embed-result';

/**
 * CTA « Essayer Batup gratuitement » commun à tous les calculateurs.
 *
 * En mode embed (iframe dans l'app Batup), le CTA signup disparaît. À la
 * place, si le calculateur fournit un `embedResult` avec au moins une ligne
 * valide, on affiche « Utiliser dans le devis » : le clic émet le payload
 * vers l'app hôte via postMessage (canal `batup-embed-result` v1, voir
 * docs/embed.md). Les outils sans payload (pricing, fiscal, RH…) continuent
 * de ne rien afficher en embed.
 *
 * `children` accueille le contenu d'accompagnement du CTA (tagline
 * marketing, bouton secondaire vers un autre outil) — masqué lui aussi
 * en mode embed.
 */
export function ToolCta({
  href,
  className = 'space-y-2 pt-2',
  children,
  embedResult,
}: {
  href: string;
  className?: string;
  children?: ReactNode;
  embedResult?: EmbedResultPayload;
}) {
  const embedSlug = useEmbedSlug();
  if (embedSlug !== null) {
    if (!embedResult || validEmbedLines(embedResult.lines).length === 0) return null;
    return (
      <div className={className}>
        <Button
          type="button"
          data-testid="cta-embed-result"
          className="h-11 w-full rounded-full"
          onClick={() => emitEmbedResult(embedSlug, embedResult)}
        >
          Utiliser dans le devis
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }
  return (
    <div className={className}>
      <a href={href} data-testid="cta-signup">
        <Button className="h-11 w-full rounded-full">
          Essayer Batup gratuitement
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </a>
      {children}
    </div>
  );
}
