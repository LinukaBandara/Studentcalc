import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Official A/L Resources & Links",
  description: "Links to official Sri Lankan Department of Examinations and UGC resources for A/L results, admissions, and circulars.",
  alternates: { canonical: "/a-level/resources" },
};

const LINKS = [
  {
    name: "Department of Examinations, Sri Lanka",
    href: "https://www.doenets.lk",
    desc: "Official results, examination schedules, and circulars.",
  },
  {
    name: "University Grants Commission (UGC)",
    href: "https://www.ugc.ac.lk",
    desc: "Official university admissions procedures, cutoffs, and circulars.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "A/L", href: "/a-level" },
          { name: "Resources", href: "/a-level/resources" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">Official Resources</h1>
      <p className="text-slate mb-8 max-w-xl">
        For anything time-sensitive — results, cutoffs, deadlines — always check these official
        sources rather than relying on secondhand information.
      </p>

      <div className="space-y-4 max-w-xl">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-card border border-borderc bg-white p-5 hover:border-emerald transition-colors"
          >
            <h2 className="font-semibold text-navy">{l.name}</h2>
            <p className="text-sm text-slate mt-1">{l.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
