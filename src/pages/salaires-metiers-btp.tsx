import { Link } from 'wouter';
import { PublicToolLayout } from '@/components/PublicToolLayout';
import { salairesMetiersCopy } from '@/content/salaires-metiers-copy';
import { salairesMetiersFAQ } from '@/content/salaires-metiers-faq';
import { METIERS } from '@/lib/salaires-metiers-btp';
import { APP_BASE, siteOrigin } from '@/lib/urls';

const EURO = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
const FAMILLES = ['Gros œuvre', 'Second œuvre', 'Encadrement & études'] as const;

export default function SalairesMetiersBtp() {
  const base = siteOrigin();
  const { hub } = salairesMetiersCopy;
  const canonicalUrl = `${base}${hub.canonicalPath}`;

  return (
    <PublicToolLayout
      seo={{ title: hub.seoTitle, description: hub.seoDescription, canonicalUrl }}
      webApplicationName="Salaires par métier du BTP"
      webApplicationDescription={hub.seoDescription}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Salaires par métier BTP', url: canonicalUrl },
      ]}
      heroH1={hub.h1}
      heroLede={hub.lede}
      signupHref={`${APP_BASE}/signup?source=salaires-metiers-btp`}
      ctaBannerTitle={salairesMetiersCopy.ctaBanner.title}
      ctaBannerSubtitle={salairesMetiersCopy.ctaBanner.subtitle}
      methodology={salairesMetiersCopy.methodology}
      faqItems={salairesMetiersFAQ}
    >
      <div className="space-y-8">
        {FAMILLES.map((famille) => {
          const list = METIERS.filter((m) => m.famille === famille);
          if (!list.length) return null;
          return (
            <div key={famille}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">{famille}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {list.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/salaire-${m.slug}`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-brand-500/50 hover:bg-brand-50/40"
                  >
                    <span className="text-sm font-medium text-gray-900">{m.label}</span>
                    <span className="text-sm font-semibold text-brand-600">
                      dès {EURO.format(m.debutantNet)} € net
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        <p className="text-xs text-gray-500">
          Salaires nets de début de carrière (source datée), à titre indicatif. Le minimum légal par région se
          consulte dans la{' '}
          <Link href="/grille-salaires-minima-batiment" className="text-brand-600 underline">
            grille des salaires BTP
          </Link>
          .
        </p>
      </div>
    </PublicToolLayout>
  );
}
