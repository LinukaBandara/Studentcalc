import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "StudentCalc's calculations are informational — not official guidance from any university, government, or examination body.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "Disclaimer", href: "/disclaimer" }]} />
      <h1 className="text-3xl font-bold text-navy mb-6">Disclaimer</h1>

      <div className="text-[15px] text-slate space-y-4">
        <p>
          StudentCalc's calculators and guides are for general informational and educational
          purposes only.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Calculations (GPA, grades, attendance, Z-scores, etc.) are based on general formulas
            and, where relevant, clearly labeled example scales — not necessarily the exact
            scale or policy your institution uses.
          </li>
          <li>
            Always verify grading scales, attendance policies, and admissions criteria with your
            own institution or the relevant official body before making decisions based on them.
          </li>
          <li>
            StudentCalc is not affiliated with, endorsed by, or an official channel of any
            government department, examination authority, or university — including Sri Lanka's
            Department of Examinations or University Grants Commission.
          </li>
          <li>
            For current examination dates, admissions cutoffs, or selection criteria, refer to
            the official sources linked on our{" "}
            <a href="/a-level/resources" className="text-emerald hover:underline">
              A/L Resources
            </a>{" "}
            page.
          </li>
        </ul>
      </div>
    </div>
  );
}
