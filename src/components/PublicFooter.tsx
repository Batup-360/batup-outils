import { APP_BASE, MARKETING_BASE } from '@/lib/urls';

export function PublicFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <a href={MARKETING_BASE}>
              <img src="/assets/logo-batup-marketing.png" alt="Batup" className="h-7 w-auto" />
            </a>
            <span className="text-sm text-gray-500">© {new Date().getFullYear()} Batup</span>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-gray-500">
            <a href="/calculateur-taux-horaire-btp" className="hover:text-gray-900">
              Calculateur de taux horaire
            </a>
            <a href="/calculateur-prix-chantier-btp" className="hover:text-gray-900">
              Calculateur de prix de chantier
            </a>
            <a href={`${APP_BASE}/login`} className="hover:text-gray-900">
              Connexion
            </a>
            <a href={`${APP_BASE}/signup`} className="hover:text-gray-900">
              Essai gratuit
            </a>
          </nav>
        </div>
        <p className="mt-6 text-xs text-gray-400">
          Calculs fournis à titre indicatif sur la base des informations saisies — ne se
          substituent pas à un conseil comptable.
        </p>
      </div>
    </footer>
  );
}
