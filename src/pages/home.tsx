import { Link } from 'wouter';
import {
  ArrowRight,
  Calculator,
  Clock,
  Coins,
  FileText,
  Percent,
  Receipt,
  Scale,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react';
import { PublicNav } from '@/components/PublicNav';
import { PublicFooter } from '@/components/PublicFooter';
import { SEOHead } from '@/lib/seo-head';
import { siteOrigin } from '@/lib/urls';

interface Tool {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SECTIONS: { title: string; tools: Tool[] }[] = [
  {
    title: 'Pricing & marge',
    tools: [
      {
        href: '/calculateur-taux-horaire-btp',
        icon: <Clock className="h-6 w-6" />,
        title: 'Calculateur de taux horaire BTP',
        description:
          "Combien dois-je facturer l'heure pour couvrir mes charges et dégager une vraie marge ?",
      },
      {
        href: '/calculateur-prix-chantier-btp',
        icon: <FileText className="h-6 w-6" />,
        title: 'Calculateur de prix de chantier',
        description:
          "Quel prix de vente HT viser pour un chantier rentable, sans surprise sur la marge ?",
      },
      {
        href: '/calculateur-marge-nette-coefficient-btp',
        icon: <Percent className="h-6 w-6" />,
        title: 'Calculateur marge nette + coefficient',
        description:
          'Convertissez en un clic un coefficient en marge nette (ou l’inverse), avec le prix de vente correspondant.',
      },
    ],
  },
  {
    title: 'Paie & RH',
    tools: [
      {
        href: '/calculateur-heures-supplementaires-btp',
        icon: <Calculator className="h-6 w-6" />,
        title: 'Calculateur heures sup BTP + paniers',
        description:
          'Heures supplémentaires 25 % / 50 %, paniers, indemnités de trajet, grand déplacement — convention collective bâtiment.',
      },
      {
        href: '/calculateur-cout-salarie-btp',
        icon: <Users className="h-6 w-6" />,
        title: 'Calculateur coût salarié employeur',
        description:
          "Du brut au coût total employeur : charges patronales, CIBTP, coût horaire chargé pour vos devis.",
      },
    ],
  },
  {
    title: 'Fiscal & légal',
    tools: [
      {
        href: '/calculateur-tva-autoliquidation-btp',
        icon: <Receipt className="h-6 w-6" />,
        title: 'TVA autoliquidation sous-traitance',
        description:
          'Suis-je en autoliquidation ? Quelle mention exacte mettre sur la facture ? Article 283-2 nonies du CGI.',
      },
      {
        href: '/calculateur-charges-sociales-artisan-btp',
        icon: <Wallet className="h-6 w-6" />,
        title: 'Charges sociales artisan BTP',
        description:
          'Cotisations URSSAF, retraite, CSG-CRDS selon votre statut (micro, EI, EURL, SARL, SAS) — barème 2026.',
      },
      {
        href: '/comparateur-statut-juridique-artisan-btp',
        icon: <Scale className="h-6 w-6" />,
        title: 'Comparateur de statut juridique',
        description:
          'Micro, EI, EURL, SARL ou SAS pour votre activité BTP ? Wizard en 4 questions avec recommandation.',
      },
    ],
  },
  {
    title: 'Cash & assurances',
    tools: [
      {
        href: '/calculateur-retenue-de-garantie',
        icon: <Coins className="h-6 w-6" />,
        title: 'Calculateur retenue de garantie 5 %',
        description:
          'Montant retenu, date de libération, alternative caution bancaire — Loi 71-584.',
      },
      {
        href: '/simulateur-decennale-btp',
        icon: <ShieldCheck className="h-6 w-6" />,
        title: 'Simulateur garantie décennale BTP',
        description:
          'Fourchette de prix estimée pour votre métier, ancienneté et chiffre d’affaires — 10 corps de métier.',
      },
    ],
  },
];

export default function Home() {
  const base = siteOrigin();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SEOHead
        title="Outils BTP gratuits — calculateurs taux horaire, marge, TVA, paie | Batup"
        description="10 outils gratuits pour artisans et PME du BTP : taux horaire, marge, heures supplémentaires, coût salarié, TVA autoliquidation, charges sociales, retenue de garantie, décennale. Sans inscription."
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
              10 calculateurs simples pour piloter la rentabilité, la paie et la fiscalité de
              votre activité BTP. Sans inscription, sans installation, conçus pour les artisans
              et PME du bâtiment.
            </p>
          </div>
        </section>

        {SECTIONS.map((section, idx) => (
          <section
            key={section.title}
            className={idx % 2 === 0 ? 'bg-white py-14' : 'bg-gray-50 py-14'}
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {section.title}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {section.tools.map((tool) => (
                  <ToolCard key={tool.href} {...tool} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <PublicFooter />
    </div>
  );
}

function ToolCard({ href, icon, title, description }: Tool) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 transition-all group-hover:gap-2">
        Ouvrir l'outil
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
