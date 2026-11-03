import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { BLOG_LINKS, RELATED_TOOLS, SEO_ROUTE_BY_PATH } from '@/seo-manifest';

interface RelatedToolsProps {
  /** Optional explicit path; falls back to window.location.pathname. */
  currentPath?: string;
}

export function RelatedTools({ currentPath }: RelatedToolsProps) {
  const pathname =
    currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '');
  const slugs = RELATED_TOOLS[pathname] ?? [];
  const related = slugs
    .map((slug) => SEO_ROUTE_BY_PATH[slug])
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const blog = BLOG_LINKS[pathname] ?? [];

  if (related.length === 0 && blog.length === 0) return null;

  return (
    <section
      className="relative z-10 -mt-[60px] overflow-hidden bg-white pt-32 pb-12 lg:pt-40"
      style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {related.length > 0 && (
          <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Outils BTP complémentaires
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{tool.breadcrumbName}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{tool.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 transition-all group-hover:gap-2">
                    Ouvrir l'outil
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
        {blog.length > 0 && (
          <div className={related.length > 0 ? 'mt-10' : ''}>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Pour aller plus loin
            </h2>
            <ul className="mt-4 space-y-2">
              {blog.map((b) => (
                <li key={b.href}>
                  <a
                    href={b.href}
                    className="inline-flex items-start gap-1.5 text-base font-medium text-brand-600 hover:underline"
                  >
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0" />
                    {b.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
