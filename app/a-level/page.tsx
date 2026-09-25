import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A/L Resources for Sri Lankan Students",
  description: "Z-score explanations, university selection information, subject resources, and links to official Sri Lankan A/L examination sources.",
  alternates: { canonical: "/a-level" },
};

const SECTIONS = [
  { href: "/a-level/z-score", title: "Z-Score", desc: "What a Z-score represents and how it's calculated." },
  { href: "/a-level/university-selection", title: "University Selection", desc: "How the selection process generally works, with links to official sources." },
  { href: "/a-level/subjects", title: "Subjects", desc: "A directory of A/L subjects and streams." },
  { href: "/a-level/resources", title: "Resources", desc: "Links to official Department of Examinations and UGC resources." },
];

export default function ALevelHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-navy mb-2">Sri Lankan A/L Resources</h1>
      <p className="text-slate mb-4 max-w-2xl">
        Tools and explanations for A/L students. StudentCalc is an independent student utility
        site — it is not affiliated with the Department of Examinations, the UGC, or any
        government body.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block rounded-card border border-borderc bg-white p-5 hover:border-emerald hover:shadow-sm transition-all"
          >
            <h2 className="font-semibold text-navy">{s.title}</h2>
            <p className="text-sm text-slate mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
