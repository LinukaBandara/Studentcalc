import type { Metadata } from "next";
import GuideArticle from "@/components/content/GuideArticle";

export const metadata: Metadata = {
  title: "How to Calculate the Marks You Need on Remaining Work",
  description: "Learn how to work out what score you need on remaining assessments to hit a target overall grade, with a worked example.",
  alternates: { canonical: "/guides/how-to-calculate-marks-needed" },
};

export default function Page() {
  return (
    <GuideArticle
      title="How to Calculate Marks Needed"
      slug="how-to-calculate-marks-needed"
      shortAnswer="Required score = (Target − Current) / Remaining weight × 100."
      relatedCalculator={{ href: "/calculators/marks-needed", label: "Marks Needed Calculator" }}
      relatedGuides={[{ href: "/guides/how-weighted-average-works", label: "How Weighted Averages Work" }]}
    >
      <h2>The formula</h2>
      <p>
        <code>Required score on remaining work (%) = (Target% − Current weighted%) / Remaining weight% × 100</code>
      </p>

      <h2>Worked example</h2>
      <p>
        You've secured 40% of your total grade so far (already weighted in), your target is 70%
        overall, and 50% of the grade weight remains.
      </p>
      <p>
        Points needed = 70 − 40 = 30
        <br />
        Required score = 30 / 50 × 100 = <strong>60%</strong>
      </p>
      <p>
        So you'd need to average 60% on the remaining assessments to hit a 70% overall.
      </p>

      <h2>When a target isn't achievable</h2>
      <p>
        If the required score comes out above 100%, the target isn't mathematically reachable
        given how much weight is left — you'd need to score more than full marks.
      </p>

      <h2>Common mistakes</h2>
      <ul className="list-disc pl-5">
        <li>Using your current mark on completed work instead of its weighted contribution.</li>
        <li>Forgetting that "remaining weight" isn't the same as "remaining assignments count."</li>
      </ul>
    </GuideArticle>
  );
}
