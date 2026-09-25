import type { Metadata } from "next";
import GuideArticle from "@/components/content/GuideArticle";

export const metadata: Metadata = {
  title: "How to Prepare for Exams",
  description: "A practical, no-nonsense approach to exam preparation — planning, active recall, practice, and rest.",
  alternates: { canonical: "/guides/how-to-prepare-for-exams" },
};

export default function Page() {
  return (
    <GuideArticle
      title="How to Prepare for Exams"
      slug="how-to-prepare-for-exams"
      shortAnswer="Start early, actively test yourself rather than just re-reading, and protect your sleep in the final days."
      relatedCalculator={{ href: "/tools/exam-countdown", label: "Exam Countdown" }}
      relatedGuides={[{ href: "/guides/how-to-plan-study-time", label: "How to Plan Study Time" }]}
    >
      <h2>Start with a plan, not the content</h2>
      <p>
        Before opening a textbook, work out how many days you have and roughly how they'll be
        split across subjects. A plan reduces the anxiety of not knowing whether you have "enough
        time."
      </p>

      <h2>Prioritize active recall over re-reading</h2>
      <p>
        Testing yourself — with practice questions, flashcards, or explaining a concept out loud
        without notes — tends to build stronger recall than passively re-reading material. Past
        papers are especially useful for this.
      </p>

      <h2>Space out your review</h2>
      <p>
        Reviewing material more than once, spaced a few days apart, tends to help retention more
        than cramming everything into one long session right before the exam.
      </p>

      <h2>Protect your sleep before the exam</h2>
      <p>
        An all-nighter right before an exam usually costs more than it gains — sleep plays a
        direct role in memory consolidation and clear thinking during the exam itself.
      </p>

      <h2>Common mistakes</h2>
      <ul className="list-disc pl-5">
        <li>Re-reading notes repeatedly without testing yourself on the material.</li>
        <li>Leaving practice papers until the last day instead of spacing them out.</li>
        <li>Sacrificing sleep the night before to fit in more studying.</li>
      </ul>
    </GuideArticle>
  );
}
