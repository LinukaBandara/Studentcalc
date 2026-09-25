import type { Metadata } from "next";
import Link from "next/link";
import PercentageCalculator from "@/components/calculators/PercentageCalculator";

export const metadata: Metadata = {
  title: "Percentage Calculator — Calculate Percentages Easily",
  description:
    "Calculate percentages, percentage increase/decrease, and percentage differences with a free, easy-to-use online percentage calculator.",
  alternates: { canonical: "/calculators/percentage" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    { "@type": "ListItem", position: 2, name: "Calculators", item: "/calculators" },
    { "@type": "ListItem", position: 3, name: "Percentage Calculator", item: "/calculators/percentage" },
  ],
};

export default function PercentageCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-slate mb-6">
        <Link href="/" className="hover:text-emerald">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-emerald">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-navy">Percentage Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold text-navy mb-2">Percentage Calculator</h1>
      <p className="text-slate mb-8 max-w-xl">
        Choose a calculation mode, enter your values, and get an instant result.
      </p>

      <PercentageCalculator />

      <section className="mt-12 max-w-xl">
        <h2 className="text-xl font-semibold text-navy mb-2">Related guide</h2>
        <p className="text-slate text-[15px]">
          <Link href="/guides/how-to-calculate-percentage" className="text-emerald hover:underline">
            How to calculate percentages
          </Link>{" "}
          — formulas and worked examples for every mode above.
        </p>
      </section>
    </div>
  );
}
