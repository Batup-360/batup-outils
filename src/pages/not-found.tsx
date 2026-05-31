import { Link } from 'wouter';
import { PublicNav } from '@/components/PublicNav';
import { PublicFooter } from '@/components/PublicFooter';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-base font-semibold text-brand-500">404</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page introuvable
          </h1>
          <p className="mt-4 text-base text-gray-600">
            Cette page n'existe pas (ou plus). Découvrez nos outils gratuits ci-dessous.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/calculateur-taux-horaire-btp"
              className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Calculateur de taux horaire
            </Link>
            <Link
              href="/calculateur-prix-chantier-btp"
              className="rounded-full border border-brand-500 px-6 py-3 text-sm font-semibold text-brand-500 hover:bg-brand-50"
            >
              Calculateur de prix de chantier
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
