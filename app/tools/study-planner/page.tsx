import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StudyPlanner from "@/components/tools/StudyPlanner";

export const metadata: Metadata = {
  title: "Study Planner",
  description: "Build a simple study plan by exam date, available hours, and subject priority — saved locally in your browser.",
  alternates: { canonical: "/tools/study-planner" },
};

export default function StudyPlannerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          { name: "Study Planner", href: "/tools/study-planner" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">Study Planner</h1>
      <p className="text-slate mb-8 max-w-xl">
        Add your subjects and set a priority for each — we'll split your available hours
        accordingly.
      </p>
      <StudyPlanner />
    </div>
  );
}
