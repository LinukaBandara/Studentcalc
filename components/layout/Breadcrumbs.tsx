import Link from "next/link";

export interface Crumb {
  name: string;
  href: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.href,
    })),
  };
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-slate mb-6">
        {crumbs.map((c, i) => (
          <span key={c.href}>
            {i === crumbs.length - 1 ? (
              <span className="text-navy">{c.name}</span>
            ) : (
              <>
                <Link href={c.href} className="hover:text-emerald">
                  {c.name}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
