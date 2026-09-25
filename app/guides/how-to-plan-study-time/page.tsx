import type { Metadata } from "next";
import GuideArticle from "@/components/content/GuideArticle";

export const metadata: Metadata = {
  title: "How to Plan Study Time Before an Exam",
  description: "A practical approach to planning study time across subjects before an exam, without unsupported productivity claims.",
  alternates: { canonical: "/guides/how-to-plan-study-time" },
};

export default function Page() {
  return (
    <GuideArticle
      title="How to Plan Study Time"
      slug="how-to-plan-study-time"
      shortAnswer="Estimate your total available hours, then split them across subjects based on priority and difficulty."
      relatedCalculator={{ href: "/calculators/study-hours", label: "Study Hours Calculator" }}
      relatedGuides={[{ href: "/guides/how-to-prepare-for-exams", label: "How to Prepare for Exams" }]}
    >
      <h2>Step 1: Count your available hours</h2>
      <p>
        Multiply the days left before your exam by the hours you can realistically study each
        day — not your ideal number, your realistic one, accounting for classes, sleep, and
        breaks.
      </p>

      <h2>Step 2: Split by priority</h2>
      <p>
        Not every subject needs equal time. Weaker subjects or higher-weighted exams generally
        deserve a larger share of your available hours.
      </p>

      <h2>Step 3: Build in buffer time</h2>
      <p>
        Plans slip. Leaving roughly 10–15% of your schedule unplanned gives you room to catch up
        without the whole plan falling apart.
      </p>

      <h2>A note on "optimal" schedules</h2>
      <p>
        There's no single scientifically proven optimal study schedule that applies to everyone
        — it depends on the subject, your own working style, and how much time you actually
        have. Treat any planning tool, including ours, as a starting estimate to adjust as you
        go.
      </p>

      <h2>Common mistakes</h2>
      <ul className="list-disc pl-5">
        <li>Planning by ideal hours instead of realistic ones.</li>
        <li>Giving every subject equal time regardless of how prepared you already are.</li>
        <li>Leaving no buffer for the days that don't go to plan.</li>
      </ul>
    </GuideArticle>
  );
}
