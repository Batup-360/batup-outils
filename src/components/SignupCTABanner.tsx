import { ArrowRight } from 'lucide-react';
import { APP_BASE } from '@/lib/urls';

interface SignupCTABannerProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  signupHref?: string;
}

export function SignupCTABanner({
  title = 'Ne perdez plus d’argent sur vos prochains chantiers',
  subtitle = 'Pilotez vos charges, vos marges et vos devis en temps réel avec Batup. Essai gratuit, sans carte bancaire.',
  ctaLabel = 'Essayer Batup gratuitement',
  signupHref = `${APP_BASE}/signup`,
}: SignupCTABannerProps) {
  return (
    <section className="bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23] py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">{subtitle}</p>
        <div className="mt-8">
          <a
            href={signupHref}
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-base font-medium text-[#1a1a3e] hover:bg-gray-100"
          >
            {ctaLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        <p className="mt-4 text-xs text-white/50">Sans carte bancaire · 2 minutes pour démarrer</p>
      </div>
    </section>
  );
}
