import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import WeightedAverageCalculator from "@/components/calculators/WeightedAverageCalculator";

export const metadata: Metadata = {
  title: "Weighted Average Calculator — Calculate Weighted Grades",
  description:
    "Calculate a weighted average from values and their weights — useful for grades made up of assignments, tests, and exams with different weightings.",
  alternates: { canonical: "/calculators/weighted-average" },
};

export default function WeightedAverageCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "Weighted Average Calculator", href: "/calculators/weighted-average" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">Weighted Average Calculator</h1>
      <p className="text-slate mb-8 max-w-xl">
        Enter each value and its weight to calculate the weighted average.
      </p>
      <WeightedAverageCalculator />
    </div>
  );
}
