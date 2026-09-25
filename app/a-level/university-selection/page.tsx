import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "University Selection After A/L — How It Generally Works",
  description: "A general overview of how Sri Lankan university selection works after A/L, with links to official sources for current cutoffs and procedures.",
  alternates: { canonical: "/a-level/university-selection" },
};

export default function UniversitySelectionPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "A/L", href: "/a-level" },
          { name: "University Selection", href: "/a-level/university-selection" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">University Selection After A/L</h1>

      <div className="max-w-2xl text-[15px] text-slate space-y-4">
        <div className="rounded-card border border-warning/40 bg-amber-50 p-4 text-navy">
          <strong>StudentCalc does not calculate official university selection outcomes.</strong>{" "}
          Cutoffs, district quotas, and course availability change every year and are published
          officially by the University Grants Commission (UGC). Always verify with official
          sources before making decisions.
        </div>

        <p>Generally, the process after the A/L examination works roughly like this:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Results are released and Z-scores are calculated per subject stream.</li>
          <li>
            Students who meet minimum eligibility apply for university admission through the
            UGC's application process.
          </li>
          <li>
            Selection is based on Z-scores combined with district-based and island-wide merit
            quotas, which vary by course and year.
          </li>
          <li>Course and university placements are published by the UGC.</li>
        </ol>
        <p>
          Because quotas, cutoffs, and eligibility criteria are set fresh each year, this page
          intentionally does not list specific figures. Check the official UGC site for the
          current admissions circular and cutoff marks for your stream.
        </p>
      </div>
    </div>
  );
}
