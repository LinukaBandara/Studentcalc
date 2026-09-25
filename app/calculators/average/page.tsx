import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AverageCalculator from "@/components/calculators/AverageCalculator";

export const metadata: Metadata = {
  title: "Average Calculator — Calculate the Mean of Your Numbers",
  description: "Calculate the average (mean) of any set of numbers, free and instantly.",
  alternates: { canonical: "/calculators/average" },
};

export default function AverageCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "Average Calculator", href: "/calculators/average" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">Average Calculator</h1>
      <p className="text-slate mb-8 max-w-xl">
        Add your values to calculate their average.
      </p>
      <AverageCalculator />
    </div>
  );
}
