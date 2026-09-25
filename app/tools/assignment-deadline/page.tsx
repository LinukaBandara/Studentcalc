import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AssignmentDeadlineTracker from "@/components/tools/AssignmentDeadlineTracker";

export const metadata: Metadata = {
  title: "Assignment Deadline Tracker",
  description: "Track individual assignment due dates and see what's overdue — saved locally in your browser.",
  alternates: { canonical: "/tools/assignment-deadline" },
};

export default function AssignmentDeadlinePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          { name: "Assignment Deadline Tracker", href: "/tools/assignment-deadline" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">Assignment Deadline Tracker</h1>
      <p className="text-slate mb-8 max-w-xl">
        Add your assignments and due dates to keep track of what's next.
      </p>
      <AssignmentDeadlineTracker />
    </div>
  );
}
