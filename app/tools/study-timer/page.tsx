import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StudyTimer from "@/components/tools/StudyTimer";

export const metadata: Metadata = {
  title: "Study Timer",
  description: "A simple, distraction-free study timer with a custom duration.",
  alternates: { canonical: "/tools/study-timer" },
};

export default function StudyTimerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col items-center text-center">
      <div className="self-start w-full">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Tools", href: "/tools" },
            { name: "Study Timer", href: "/tools/study-timer" },
          ]}
        />
      </div>
      <h1 className="text-3xl font-bold text-navy mb-2">Study Timer</h1>
      <p className="text-slate mb-4 max-w-xl">A simple, distraction-free timer.</p>
      <StudyTimer />
    </div>
  );
}
