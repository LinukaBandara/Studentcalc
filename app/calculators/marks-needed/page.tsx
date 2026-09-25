import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import MarksNeededCalculator from "@/components/calculators/MarksNeededCalculator";

export const metadata: Metadata = {
  title: "Marks Needed Calculator — What Score Do You Need?",
  description:
    "Calculate the marks you need on remaining assessments to reach your target overall percentage.",
  alternates: { canonical: "/calculators/marks-needed" },
};

export default function MarksNeededCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "Marks Needed Calculator", href: "/calculators/marks-needed" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">Marks Needed Calculator</h1>
      <p className="text-slate mb-8 max-w-xl">
        Find out what score you need on your remaining work to hit your target grade.
      </p>
      <MarksNeededCalculator />
    </div>
  );
}
