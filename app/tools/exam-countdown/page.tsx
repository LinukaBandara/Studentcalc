import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ExamCountdown from "@/components/tools/ExamCountdown";

export const metadata: Metadata = {
  title: "Exam Countdown Timer",
  description: "A live countdown timer to your next exam — set the date and time and watch it tick down.",
  alternates: { canonical: "/tools/exam-countdown" },
};

export default function ExamCountdownPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          { name: "Exam Countdown", href: "/tools/exam-countdown" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">Exam Countdown</h1>
      <p className="text-slate mb-8 max-w-xl">
        Set your exam date and time to start a live countdown.
      </p>
      <ExamCountdown />
    </div>
  );
}
