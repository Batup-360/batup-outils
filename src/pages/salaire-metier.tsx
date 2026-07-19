import { useParams } from 'wouter';
import { PublicToolLayout } from '@/components/PublicToolLayout';
import { SalaireMetierCalculator } from '@/components/SalaireMetierCalculator';
import { salairesMetiersCopy } from '@/content/salaires-metiers-copy';
import { salairesMetiersFAQ } from '@/content/salaires-metiers-faq';
import { getMetier } from '@/lib/salaires-metiers-btp';
import { APP_BASE, siteOrigin } from '@/lib/urls';

const HUB_PATH = '/salaires-metiers-btp';

export default function SalaireMetier({ slug: slugProp }: { slug?: string }) {
  const params = useParams<{ metier?: string }>();
  const slug = slugProp ?? params.metier;
  const base = siteOrigin();
  const metier = getMetier(slug);

  const lbl = metier ? metier.label.toLowerCase() : 'métier BTP';
  const art = metier ? metier.article : "d'un";
  const canonicalUrl = `${base}/salaire-${slug ?? ''}`;

  const title = metier
    ? `Salaire ${lbl} 2026 : combien gagne ${art} ${lbl} ? | Batup`
    : 'Salaire métier BTP | Batup';
  const description = metier
    ? `Combien gagne ${art} ${lbl} dans le BTP en 2026 ? Salaire net de début de carrière, brut estimé et niveau conventionnel du bâtiment. Gratuit.`
    : salairesMetiersCopy.hub.seoDescription;
  const h1 = metier ? `Salaire ${lbl} en 2026` : 'Salaire métier BTP';
  const lede = metier
    ? `Combien gagne ${art} ${lbl} ? Salaire net de début de carrière, estimation du brut et niveau conventionnel dans le bâtiment. Gratuit, sans inscription.`
    : salairesMetiersCopy.hub.lede;

  return (
    <PublicToolLayout
      seo={{ title, description, canonicalUrl }}
      webApplicationName={title}
      webApplicationDescription={description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Salaires par métier BTP', url: `${base}${HUB_PATH}` },
        { name: metier ? metier.label : 'Métier', url: canonicalUrl },
      ]}
      heroH1={h1}
      heroLede={lede}
      signupHref={`${APP_BASE}/signup?source=salaire-${slug ?? 'metier'}`}
      ctaBannerTitle={salairesMetiersCopy.ctaBanner.title}
      ctaBannerSubtitle={salairesMetiersCopy.ctaBanner.subtitle}
      methodology={salairesMetiersCopy.methodology}
      faqItems={salairesMetiersFAQ}
    >
      <SalaireMetierCalculator metierSlug={slug} />
    </PublicToolLayout>
  );
}
