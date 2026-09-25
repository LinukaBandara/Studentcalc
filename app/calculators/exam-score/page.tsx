import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ExamScoreCalculator from "@/components/calculators/ExamScoreCalculator";

export const metadata: Metadata = {
  title: "Exam Score Calculator — Track Your Weighted Grade",
  description:
    "Track your current weighted exam score across assignments, tests, and finals, and see how much weight remains.",
  alternates: { canonical: "/calculators/exam-score" },
};

export default function ExamScoreCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "Exam Score Calculator", href: "/calculators/exam-score" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">Exam Score Calculator</h1>
      <p className="text-slate mb-8 max-w-xl">
        Add each graded component and its weight to track your current overall score.
      </p>
      <ExamScoreCalculator />
    </div>
  );
}
