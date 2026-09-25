import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "A/L Subject Streams — Sri Lanka",
  description: "A directory of Sri Lankan A/L subject streams: Physical Science, Biological Science, Commerce, Arts, and Technology.",
  alternates: { canonical: "/a-level/subjects" },
};

const STREAMS = [
  {
    name: "Physical Science",
    subjects: ["Combined Mathematics", "Physics", "Chemistry"],
  },
  {
    name: "Biological Science",
    subjects: ["Biology", "Physics", "Chemistry"],
  },
  {
    name: "Commerce",
    subjects: ["Business Statistics", "Accounting", "Economics", "Business Studies"],
  },
  {
    name: "Arts",
    subjects: ["A wide range of subjects including languages, history, geography, political science, and more — combinations vary by school."],
  },
  {
    name: "Technology",
    subjects: ["Engineering Technology", "Bio Systems Technology", "Science for Technology"],
  },
];

export default function SubjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "A/L", href: "/a-level" },
          { name: "Subjects", href: "/a-level/subjects" },
        ]}
      />
      <h1 className="text-3xl font-bold text-navy mb-2">A/L Subject Streams</h1>
      <p className="text-slate mb-8 max-w-2xl">
        A general overview of the main A/L subject streams in Sri Lanka. Exact subject
        combinations and availability depend on your school.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {STREAMS.map((s) => (
          <div key={s.name} className="rounded-card border border-borderc bg-white p-5">
            <h2 className="font-semibold text-navy">{s.name}</h2>
            <ul className="mt-2 text-sm text-slate list-disc pl-4 space-y-1">
              {s.subjects.map((subj) => (
                <li key={subj}>{subj}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
