import { ButtonLink } from "@/components/ui/Button";
import Link from "next/link";

const POPULAR_CALCULATORS = [
  { href: "/calculators/gpa", title: "GPA Calculator", desc: "Calculate GPA using grades and credits." },
  { href: "/calculators/percentage", title: "Percentage Calculator", desc: "Calculate percentages, changes, and differences." },
  { href: "/calculators/grade", title: "Grade Calculator", desc: "Convert marks into grades using configurable scales." },
  { href: "/calculators/attendance", title: "Attendance Calculator", desc: "See how many classes you can miss." },
  { href: "/calculators/study-hours", title: "Study Hours Calculator", desc: "Estimate available study time before an exam." },
  { href: "/calculators/marks-needed", title: "Marks Needed Calculator", desc: "Find the marks required to reach a target score." },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-navy tracking-tight">
          Free Student Calculators & Study Tools
        </h1>
        <p className="mt-4 text-lg text-slate max-w-xl mx-auto">
          Calculate grades, plan your study time, track attendance, prepare for exams, and more —
          all in one simple place.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/calculators">Explore Calculators</ButtonLink>
          <ButtonLink href="/tools" variant="secondary">
            Browse Student Tools
          </ButtonLink>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-navy mb-6">Popular calculators</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_CALCULATORS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="block rounded-card border border-borderc bg-white p-5 hover:border-emerald hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-navy">{c.title}</h3>
              <p className="text-sm text-slate mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-navy mb-3">Sri Lankan A/L resources</h2>
        <p className="text-slate max-w-2xl">
          Z-score explanations, subject resources, and links to official examination sources —
          built for A/L students planning university selection.
        </p>
        <Link href="/a-level" className="inline-block mt-4 text-emerald font-medium hover:underline">
          Explore A/L tools →
        </Link>
      </section>
    </>
  );
}
