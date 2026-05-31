import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { APP_BASE, MARKETING_BASE } from '@/lib/urls';

/**
 * Marketing navbar — dark floating pill matching batup.fr.
 * Links to the main marketing site (Fonctionnalités, Pour qui ?, etc.)
 * and to app.batup.fr for auth (Se connecter / S'inscrire).
 */

const MARKETING_LINKS: { label: string; href: string; withChevron?: boolean }[] = [
  { label: 'Fonctionnalités', href: `${MARKETING_BASE}/`, withChevron: true },
  { label: 'Pour qui ?', href: `${MARKETING_BASE}/`, withChevron: true },
  { label: 'Nos tarifs', href: `${MARKETING_BASE}/tarifs-logiciel-btp` },
  { label: 'Blog', href: `${MARKETING_BASE}/blog` },
  { label: 'Demander une démo', href: `${MARKETING_BASE}/demander-une-demo` },
  { label: "Centre d'aide", href: `${MARKETING_BASE}/centre-aide` },
];

const SIGNUP_GRADIENT = 'linear-gradient(180deg, #BFC6F4 0%, #7076F1 50%, #5368EE 100%)';

interface PublicNavProps {
  signupHref?: string;
  loginHref?: string;
}

export function PublicNav({
  signupHref = `${APP_BASE}/signup`,
  loginHref = `${APP_BASE}/login`,
}: PublicNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-transparent py-2 px-4 sm:px-6 lg:px-8" id="navbar">
      <div
        className="mx-auto max-w-7xl rounded-2xl border border-white/10 px-5 shadow-md backdrop-blur-xl sm:px-6 lg:px-8"
        style={{ backgroundColor: '#151515' }}
      >
        <div className="flex h-12 items-center justify-between lg:h-14">
          <a href={MARKETING_BASE} className="flex shrink-0 items-center gap-2">
            <img src="/assets/logo-batup-marketing.png" alt="BatUp" className="h-9 w-auto" />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {MARKETING_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {link.label}
                {link.withChevron && <ChevronDown className="h-4 w-4" />}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={loginHref}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Se connecter
            </a>
            <a
              href={signupHref}
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#7076F1]/25"
              style={{ background: SIGNUP_GRADIENT }}
            >
              S'inscrire
            </a>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 top-0 z-[60] flex flex-col overflow-x-hidden lg:hidden">
          <div
            className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-4"
            style={{ backgroundColor: '#151515' }}
          >
            <a href={MARKETING_BASE} onClick={() => setMobileOpen(false)}>
              <img src="/assets/logo-batup-marketing.png" alt="BatUp" className="h-8 w-auto" />
            </a>
            <button
              type="button"
              className="rounded-lg p-2 text-white hover:bg-white/10"
              aria-label="Fermer le menu"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto bg-white px-4 py-4 pb-24">
            {MARKETING_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-lg px-2 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col items-center gap-3 border-t border-gray-100 pt-5">
              <a
                href={loginHref}
                className="py-1 text-sm font-medium text-gray-500"
                onClick={() => setMobileOpen(false)}
              >
                Se connecter
              </a>
              <a
                href={signupHref}
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                style={{ background: SIGNUP_GRADIENT }}
                onClick={() => setMobileOpen(false)}
              >
                S'inscrire
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
