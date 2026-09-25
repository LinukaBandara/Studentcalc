import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about StudentCalc's calculators, privacy, and A/L information.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  {
    q: "Is StudentCalc free to use?",
    a: "Yes, every calculator, tool, and guide on StudentCalc is free to use with no account required.",
  },
  {
    q: "Does StudentCalc store my grades or personal data?",
    a: "Calculator inputs are processed in your browser and aren't sent to a server. The planning tools (Study Planner, Semester Planner, Assignment Deadline Tracker) save data locally in your browser using localStorage — see the Privacy Policy for details.",
  },
  {
    q: "Which GPA scale does the GPA Calculator use?",
    a: "It defaults to a common 4.0-style scale (A = 4.0 down to F = 0), clearly labeled as an example. Institutions vary, so always check your own institution's official scale.",
  },
  {
    q: "Is the attendance policy on this site official?",
    a: "No — the Attendance Calculator lets you set your own target percentage. It doesn't represent any specific institution's official attendance policy.",
  },
  {
    q: "Is the Z-score calculator the same as the official Sri Lankan university admissions Z-score?",
    a: "No. It's a basic educational calculation (Z = (X − mean) / standard deviation) to illustrate the concept. The official admissions Z-score uses island-wide datasets and a methodology published by the Department of Examinations and UGC.",
  },
  {
    q: "Is StudentCalc affiliated with any government or university?",
    a: "No. StudentCalc is an independent, unofficial student utility site.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs crumbs={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]} />
      <h1 className="text-3xl font-bold text-navy mb-8">Frequently Asked Questions</h1>

      <div className="space-y-6">
        {FAQS.map((f) => (
          <div key={f.q}>
            <p className="font-semibold text-navy">{f.q}</p>
            <p className="text-slate text-[15px] mt-1">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
