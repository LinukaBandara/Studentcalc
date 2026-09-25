import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for StudentCalc's calculators, tools, and content.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Terms", href: "/terms" }]} />
      <h1 className="text-3xl font-bold text-navy mb-6">Terms of Use</h1>

      <div className="text-[15px] text-slate space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-navy mb-2">Using the site</h2>
          <p>
            StudentCalc's calculators, tools, and guides are provided free for personal,
            educational use. You're welcome to use them as often as you like.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy mb-2">No warranty</h2>
          <p>
            Calculations are provided on a best-effort, "as is" basis. While the calculation
            logic is tested, StudentCalc makes no guarantee that results are error-free or fit
            for any specific official purpose. See the{" "}
            <a href="/disclaimer" className="text-emerald hover:underline">
              Disclaimer
            </a>{" "}
            for more on this.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy mb-2">Acceptable use</h2>
          <p>
            Please don't attempt to disrupt the site, scrape it at a rate that degrades service
            for others, or use it for unlawful purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-navy mb-2">Changes</h2>
          <p>
            These terms may be updated as the site evolves. Continued use of the site after a
            change means you accept the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}
