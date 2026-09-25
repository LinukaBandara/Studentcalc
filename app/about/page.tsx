import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "About StudentCalc",
  description: "What StudentCalc is, why it exists, and what you can do with it.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <h1 className="text-3xl font-bold text-navy mb-6">About StudentCalc</h1>

      <div className="text-[15px] text-slate space-y-4">
        <p>
          StudentCalc is a free set of calculators and study tools built for students —
          starting with a focus on Sri Lankan students, while being built to work for anyone.
        </p>
        <p>
          The idea is simple: the calculations students need — GPA, percentages, attendance,
          weighted grades, study time — are common, repetitive, and easy to get wrong by hand.
          StudentCalc handles the arithmetic so you can focus on the studying.
        </p>
        <h2 className="text-xl font-semibold text-navy pt-2">What you can do here</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Calculate GPA, percentages, grades, averages, and weighted averages</li>
          <li>Work out attendance percentages and what it takes to hit a target</li>
          <li>Plan study time and track deadlines — entirely in your browser</li>
          <li>Understand A/L Z-scores and find official Sri Lankan examination resources</li>
        </ul>
        <h2 className="text-xl font-semibold text-navy pt-2">What StudentCalc isn't</h2>
        <p>
          StudentCalc is an independent project, not an official university, government, or
          examination body. It doesn't require an account, and calculator inputs stay in your
          browser rather than being sent to a server. See the{" "}
          <a href="/privacy" className="text-emerald hover:underline">
            Privacy Policy
          </a>{" "}
          for details.
        </p>
      </div>
    </div>
  );
}
