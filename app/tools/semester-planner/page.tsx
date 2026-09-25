import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import SemesterPlanner from "@/components/tools/SemesterPlanner";

export const metadata: Metadata = {
  title: "Semester Planner",
  description: "Track modules, assignments, and exam deadlines across your semester — saved locally in your browser.",
  alternates: { canonical: "/tools/semester-planner" },
};

export default function SemesterPlannerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          { name: "Semester Planner", href: "/tools/semester-planner" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">Semester Planner</h1>
      <p className="text-slate mb-8 max-w-xl">
        Add your modules, assignments, and exams to see what's coming up next.
      </p>
      <SemesterPlanner />
    </div>
  );
}
