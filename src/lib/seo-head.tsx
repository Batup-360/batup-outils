import { useEffect } from 'react';

type JsonLdValue = string | number | boolean | null | undefined | JsonLdObject | JsonLdValue[];
type JsonLdObject = { [key: string]: JsonLdValue };

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImageUrl?: string;
  jsonLd?: JsonLdObject | JsonLdObject[];
}

const MANAGED_ATTR = 'data-seohead';

function setMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(MANAGED_ATTR, '1');
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    el.setAttribute(MANAGED_ATTR, '1');
    document.head.appendChild(el);
  }
  el.href = href;
}

function injectJsonLd(payload: JsonLdObject | JsonLdObject[]): HTMLScriptElement {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute(MANAGED_ATTR, '1');
  script.text = JSON.stringify(payload);
  document.head.appendChild(script);
  return script;
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImageUrl,
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
    if (ogImageUrl) {
      setMeta('meta[property="og:image"]', { property: 'og:image', content: ogImageUrl });
      setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImageUrl });
    }
    setCanonical(canonicalUrl);

    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const block of blocks) scripts.push(injectJsonLd(block));
    }

    return () => {
      document.title = previousTitle;
      for (const s of scripts) s.remove();
    };
  }, [title, description, canonicalUrl, ogImageUrl, jsonLd]);

  return null;
}
