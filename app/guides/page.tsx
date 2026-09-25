import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Guides",
  description: "Clear, worked-example guides on GPA, percentages, attendance, averages, marks needed, Z-scores, study planning, and exam prep.",
  alternates: { canonical: "/guides" },
};

const GUIDES = [
  { href: "/guides/how-to-calculate-gpa", title: "How to Calculate GPA" },
  { href: "/guides/how-to-calculate-percentage", title: "How to Calculate Percentage" },
  { href: "/guides/how-attendance-percentage-works", title: "How Attendance Percentage Works" },
  { href: "/guides/how-to-calculate-average", title: "How to Calculate an Average" },
  { href: "/guides/how-weighted-average-works", title: "How Weighted Averages Work" },
  { href: "/guides/how-to-calculate-marks-needed", title: "How to Calculate Marks Needed" },
  { href: "/guides/how-z-score-works", title: "How Z-Scores Work" },
  { href: "/guides/how-to-plan-study-time", title: "How to Plan Study Time" },
  { href: "/guides/how-to-prepare-for-exams", title: "How to Prepare for Exams" },
];

export default function GuidesHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-navy mb-2">Guides</h1>
      <p className="text-slate mb-8 max-w-xl">
        Clear explanations with worked examples — each guide links to its matching calculator.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {GUIDES.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="block rounded-card border border-borderc bg-white p-5 hover:border-emerald hover:shadow-sm transition-all font-medium text-navy"
          >
            {g.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
