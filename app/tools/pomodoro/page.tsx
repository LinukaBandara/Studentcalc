import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Pomodoro from "@/components/tools/Pomodoro";

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description: "A configurable Pomodoro timer — focus sessions, short breaks, and long breaks.",
  alternates: { canonical: "/tools/pomodoro" },
};

export default function PomodoroPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col items-center text-center">
      <div className="self-start w-full">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Tools", href: "/tools" },
            { name: "Pomodoro", href: "/tools/pomodoro" },
          ]}
        />
      </div>
      <h1 className="text-3xl font-bold text-navy mb-2">Pomodoro Timer</h1>
      <p className="text-slate mb-4 max-w-xl">
        A default 25/5/15 configuration — fully customizable below.
      </p>
      <Pomodoro />
    </div>
  );
}
