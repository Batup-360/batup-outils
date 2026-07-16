import { PublicToolLayout } from '@/components/PublicToolLayout';
import { MortierCalculator } from '@/components/MortierCalculator';
import { mortierCopy } from '@/content/mortier-copy';
import { mortierFAQ } from '@/content/mortier-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurMortier() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${mortierCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: mortierCopy.seo.title, description: mortierCopy.seo.description, canonicalUrl }}
      webApplicationName={mortierCopy.webApplication.name}
      webApplicationDescription={mortierCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de mortier', url: canonicalUrl },
      ]}
      heroH1={mortierCopy.hero.h1}
      heroLede={mortierCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-mortier`}
      ctaBannerTitle={mortierCopy.ctaBanner.title}
      ctaBannerSubtitle={mortierCopy.ctaBanner.subtitle}
      methodology={mortierCopy.methodology}
      faqItems={mortierFAQ}
    >
      <MortierCalculator />
    </PublicToolLayout>
  );
}
