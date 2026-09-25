import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import GradeCalculator from "@/components/calculators/GradeCalculator";

export const metadata: Metadata = {
  title: "Grade Calculator — Convert Marks to Letter Grades",
  description:
    "Convert marks into letter grades with a free online grade calculator, using a configurable grading scale.",
  alternates: { canonical: "/calculators/grade" },
};

export default function GradeCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "Grade Calculator", href: "/calculators/grade" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">Grade Calculator</h1>
      <p className="text-slate mb-8 max-w-xl">
        Enter your marks to see the corresponding letter grade.
      </p>
      <GradeCalculator />
      <section className="mt-12 max-w-xl">
        <h2 className="text-xl font-semibold text-navy mb-2">Related</h2>
        <p className="text-slate text-[15px]">
          <Link href="/calculators/gpa" className="text-emerald hover:underline">
            Convert grades into a GPA
          </Link>{" "}
          using your GPA calculator.
        </p>
      </section>
    </div>
  );
}
