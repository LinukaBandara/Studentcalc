import type { Metadata } from "next";
import Link from "next/link";
import GpaCalculator from "@/components/calculators/GpaCalculator";

export const metadata: Metadata = {
  title: "GPA Calculator — Calculate Your GPA Online",
  description:
    "Calculate your GPA from subject grades and credits with a free, accurate online GPA calculator. Uses a default 4.0-style example grading scale.",
  alternates: { canonical: "/calculators/gpa" },
};

export default function GpaCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate mb-6">
        <Link href="/" className="hover:text-emerald">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-emerald">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-navy">GPA Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold text-navy mb-2">GPA Calculator</h1>
      <p className="text-slate mb-8 max-w-xl">
        Add your subjects, grades, and credits to calculate your GPA instantly.
      </p>

      <GpaCalculator />

      <section className="mt-12 max-w-xl">
        <h2 className="text-xl font-semibold text-navy mb-2">How it's calculated</h2>
        <p className="text-slate text-[15px]">
          GPA = Σ(Grade Point × Credit) / Σ(Credits). Want the full walkthrough with a worked
          example?{" "}
          <Link href="/guides/how-to-calculate-gpa" className="text-emerald hover:underline">
            Read the GPA guide
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
