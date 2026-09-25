import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AttendanceCalculator from "@/components/calculators/AttendanceCalculator";

export const metadata: Metadata = {
  title: "Attendance Calculator — Calculate Your Attendance Percentage",
  description:
    "Calculate your attendance percentage and find out how many classes you can miss, or how many you need to attend to reach your target.",
  alternates: { canonical: "/calculators/attendance" },
};

export default function AttendanceCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: "Attendance Calculator", href: "/calculators/attendance" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">Attendance Calculator</h1>
      <p className="text-slate mb-8 max-w-xl">
        Enter your total and attended classes to see your attendance percentage and what it
        takes to hit your target.
      </p>
      <AttendanceCalculator />
      <p className="text-xs text-slate mt-8 max-w-xl">
        Attendance policies vary by institution — this tool doesn't represent any specific
        university or school's official policy.
      </p>
    </div>
  );
}
