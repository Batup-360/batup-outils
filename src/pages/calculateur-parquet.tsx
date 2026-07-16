import { PublicToolLayout } from '@/components/PublicToolLayout';
import { ParquetCalculator } from '@/components/ParquetCalculator';
import { parquetCopy } from '@/content/parquet-copy';
import { parquetFAQ } from '@/content/parquet-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurParquet() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${parquetCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: parquetCopy.seo.title, description: parquetCopy.seo.description, canonicalUrl }}
      webApplicationName={parquetCopy.webApplication.name}
      webApplicationDescription={parquetCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de parquet', url: canonicalUrl },
      ]}
      heroH1={parquetCopy.hero.h1}
      heroLede={parquetCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-parquet`}
      ctaBannerTitle={parquetCopy.ctaBanner.title}
      ctaBannerSubtitle={parquetCopy.ctaBanner.subtitle}
      methodology={parquetCopy.methodology}
      faqItems={parquetFAQ}
    >
      <ParquetCalculator />
    </PublicToolLayout>
  );
}
