import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Calculators",
  description: "Browse every StudentCalc calculator: GPA, percentage, grades, attendance, and study planning tools.",
  alternates: { canonical: "/calculators" },
};

const CATEGORIES: { title: string; items: { href: string; label: string; live?: boolean }[] }[] = [
  {
    title: "Grades & Marks",
    items: [
      { href: "/calculators/gpa", label: "GPA Calculator", live: true },
      { href: "/calculators/percentage", label: "Percentage Calculator", live: true },
      { href: "/calculators/grade", label: "Grade Calculator", live: true },
      { href: "/calculators/average", label: "Average Calculator", live: true },
      { href: "/calculators/weighted-average", label: "Weighted Average Calculator", live: true },
      { href: "/calculators/marks-needed", label: "Marks Needed Calculator", live: true },
      { href: "/calculators/exam-score", label: "Exam Score Calculator", live: true },
    ],
  },
  {
    title: "Attendance",
    items: [{ href: "/calculators/attendance", label: "Attendance Calculator", live: true }],
  },
  {
    title: "Study Planning",
    items: [{ href: "/calculators/study-hours", label: "Study Hours Calculator", live: true }],
  },
];

export default function CalculatorsHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-navy mb-2">All Calculators</h1>
      <p className="text-slate mb-10 max-w-xl">
        Every calculator on StudentCalc, grouped by category.
      </p>

      {CATEGORIES.map((cat) => (
        <section key={cat.title} className="mb-10">
          <h2 className="text-lg font-semibold text-navy mb-4">{cat.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.items.map((item) =>
              item.live ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-card border border-borderc bg-white p-4 hover:border-emerald transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <div
                  key={item.href}
                  className="rounded-card border border-dashed border-borderc bg-white/50 p-4 text-slate"
                  aria-disabled="true"
                >
                  {item.label} <span className="text-xs">(in progress)</span>
                </div>
              )
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
