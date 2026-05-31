import { Link } from 'wouter';
import { ArrowRight, Calculator, FileText } from 'lucide-react';
import { PublicNav } from '@/components/PublicNav';
import { PublicFooter } from '@/components/PublicFooter';
import { SEOHead } from '@/lib/seo-head';
import { siteOrigin } from '@/lib/urls';

export default function Home() {
  const base = siteOrigin();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHead
        title="Outils BTP gratuits — calculateurs taux horaire et prix de chantier | Batup"
        description="Outils gratuits pour artisans et PME du BTP : calculez votre taux horaire à facturer et le prix juste d'un chantier en quelques minutes. Sans inscription."
        canonicalUrl={`${base}/`}
      />
      <PublicNav />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-[#f5f5ff] via-white to-white py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Outils BTP gratuits
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg">
              Deux calculateurs simples pour piloter la rentabilité de votre activité BTP.
              Sans inscription, sans installation, en 2 minutes.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              <ToolCard
                href="/calculateur-taux-horaire-btp"
                icon={<Calculator className="h-6 w-6" />}
                title="Calculateur de taux horaire"
                description="Combien dois-je facturer l'heure pour couvrir mes charges et dégager une vraie marge ?"
              />
              <ToolCard
                href="/calculateur-prix-chantier-btp"
                icon={<FileText className="h-6 w-6" />}
                title="Calculateur de prix de chantier"
                description="Quel prix de vente HT viser pour un chantier rentable, sans surprise sur la marge ?"
              />
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

function ToolCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
        {icon}
      </div>
      <h2 className="mt-5 text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-base text-gray-600">{description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 group-hover:gap-2 transition-all">
        Ouvrir l'outil
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
