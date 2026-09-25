import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Student Tools",
  description: "Browse StudentCalc's study tools: exam countdown, study timer, pomodoro, study planner, semester planner, and assignment deadline tracker.",
  alternates: { canonical: "/tools" },
};

const TOOLS = [
  { href: "/tools/exam-countdown", title: "Exam Countdown", desc: "Live countdown to your next exam." },
  { href: "/tools/study-timer", title: "Study Timer", desc: "A simple distraction-free study timer." },
  { href: "/tools/pomodoro", title: "Pomodoro", desc: "Configurable focus/break session timer." },
  { href: "/tools/study-planner", title: "Study Planner", desc: "Split your remaining study hours across subjects by priority." },
  { href: "/tools/semester-planner", title: "Semester Planner", desc: "Track modules, assignments, and exam deadlines." },
  { href: "/tools/assignment-deadline", title: "Assignment Deadline Tracker", desc: "Track individual assignment due dates." },
];

export default function ToolsHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-navy mb-2">Student Tools</h1>
      <p className="text-slate mb-8 max-w-xl">
        Planning and focus tools that run entirely in your browser — nothing is stored on a
        server, and nothing requires an account.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="block rounded-card border border-borderc bg-white p-5 hover:border-emerald hover:shadow-sm transition-all"
          >
            <h2 className="font-semibold text-navy">{t.title}</h2>
            <p className="text-sm text-slate mt-1">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
