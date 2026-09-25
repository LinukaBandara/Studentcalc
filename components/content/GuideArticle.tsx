import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

export interface GuideRelated {
  href: string;
  label: string;
}

export interface GuideArticleProps {
  title: string;
  slug: string;
  shortAnswer: string;
  children: React.ReactNode;
  relatedCalculator?: GuideRelated;
  relatedGuides?: GuideRelated[];
  faq?: { q: string; a: string }[];
}

export default function GuideArticle({
  title,
  slug,
  shortAnswer,
  children,
  relatedCalculator,
  relatedGuides,
  faq,
}: GuideArticleProps) {
  const siteUrl = getSiteUrl();
  const articleUrl = `${siteUrl}/guides/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: shortAnswer,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    image: [`${siteUrl}/og-image.png`],
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-image.png`,
      },
    },
  };

  const faqJsonLd =
    faq && faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: title, href: `/guides/${slug}` },
        ]}
      />

      <h1 className="text-3xl font-bold text-navy mb-4">{title}</h1>
      <p className="text-lg text-navy bg-mint rounded-card p-4 mb-8">{shortAnswer}</p>

      <div className="prose-content text-[15px] text-slate space-y-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_h2]:mt-8 [&_h2]:mb-2 [&_strong]:text-navy [&_code]:text-navy [&_code]:bg-borderc/40 [&_code]:px-1 [&_code]:rounded">
        {children}
      </div>

      {(relatedCalculator || (relatedGuides && relatedGuides.length > 0)) && (
        <div className="mt-10 border-t border-borderc pt-6">
          {relatedCalculator && (
            <p className="text-[15px] mb-2">
              <Link href={relatedCalculator.href} className="text-emerald font-medium hover:underline">
                Try the {relatedCalculator.label} →
              </Link>
            </p>
          )}
          {relatedGuides && relatedGuides.length > 0 && (
            <div className="text-[15px]">
              <p className="text-slate mb-1">Related guides:</p>
              <ul className="list-disc pl-5 space-y-1">
                {relatedGuides.map((g) => (
                  <li key={g.href}>
                    <Link href={g.href} className="text-emerald hover:underline">
                      {g.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {faq && faq.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-navy mb-3">FAQ</h2>
          <div className="space-y-4">
            {faq.map((f) => (
              <div key={f.q}>
                <p className="font-medium text-navy">{f.q}</p>
                <p className="text-slate text-[15px] mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
