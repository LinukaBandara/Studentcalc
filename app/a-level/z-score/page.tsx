import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ZScoreCalculator from "@/components/calculators/ZScoreCalculator";

export const metadata: Metadata = {
  title: "How Z-Score Works — A/L Explanation & Calculator",
  description: "Understand what a Z-score represents, the general formula, and why standardization matters — plus a basic educational Z-score calculator.",
  alternates: { canonical: "/a-level/z-score" },
};

export default function ZScorePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "A/L", href: "/a-level" },
          { name: "Z-Score", href: "/a-level/z-score" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">How Z-Score Works</h1>

      <div className="max-w-2xl text-[15px] text-slate space-y-4 mb-10">
        <p>
          A Z-score tells you how many standard deviations a value is above or below the mean
          of a distribution. It's a way to standardize scores so they can be compared even when
          they come from different scales or difficulty levels.
        </p>
        <p className="font-medium text-navy">Z = (X − μ) / σ</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>X — the raw score</li>
          <li>μ (mu) — the mean of all scores</li>
          <li>σ (sigma) — the standard deviation of all scores</li>
        </ul>
        <p>
          A Z-score of 0 means the value equals the mean. Positive means above average, negative
          means below. In Sri Lanka's A/L university admissions process, Z-scores standardize
          subject results across different papers before they're combined — but the official
          calculation uses island-wide datasets and a published methodology, not a single
          student's numbers.
        </p>
      </div>

      <h2 className="text-xl font-semibold text-navy mb-4">Try it yourself</h2>
      <ZScoreCalculator />
    </div>
  );
}
