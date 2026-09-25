import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StudyHoursCalculator from "@/components/calculators/StudyHoursCalculator";

export const metadata: Metadata = {
  title: "Study Hours Calculator — Plan Your Exam Prep Time",
  description:
    "Estimate how many study hours you have before an exam and how to split them across your subjects.",
  alternates: { canonical: "/calculators/study-hours" },
};

export default function StudyHoursCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "Study Hours Calculator", href: "/calculators/study-hours" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">Study Hours Calculator</h1>
      <p className="text-slate mb-8 max-w-xl">
        Enter your exam date and available time to estimate your study hours.
      </p>
      <StudyHoursCalculator />
    </div>
  );
}
