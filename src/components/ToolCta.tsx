import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui';
import { useEmbedded } from '@/lib/embed-context';

/**
 * CTA « Essayer Batup gratuitement » commun à tous les calculateurs.
 * En mode embed (iframe dans l'app Batup), on ne montre RIEN : un
 * utilisateur déjà dans l'app n'a pas à s'inscrire. (Phase 2 : ce même
 * emplacement accueillera le bouton « Utiliser dans le devis ».)
 *
 * `children` accueille le contenu d'accompagnement du CTA (tagline
 * marketing, bouton secondaire vers un autre outil) — masqué lui aussi
 * en mode embed.
 */
export function ToolCta({
  href,
  className = 'space-y-2 pt-2',
  children,
}: {
  href: string;
  className?: string;
  children?: ReactNode;
}) {
  const embedded = useEmbedded();
  if (embedded) return null;
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
