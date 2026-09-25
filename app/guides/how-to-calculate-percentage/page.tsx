import type { Metadata } from "next";
import GuideArticle from "@/components/content/GuideArticle";

export const metadata: Metadata = {
  title: "How to Calculate Percentage (4 Common Methods)",
  description: "Learn how to calculate percentages, percentage increase/decrease, and percentage difference — with worked examples for each.",
  alternates: { canonical: "/guides/how-to-calculate-percentage" },
};

export default function Page() {
  return (
    <GuideArticle
      title="How to Calculate Percentage"
      slug="how-to-calculate-percentage"
      shortAnswer="To find what percentage X is of Y, divide X by Y and multiply by 100."
      relatedCalculator={{ href: "/calculators/percentage", label: "Percentage Calculator" }}
      relatedGuides={[
        { href: "/guides/how-to-calculate-average", label: "How to Calculate an Average" },
        { href: "/guides/how-to-calculate-marks-needed", label: "How to Calculate Marks Needed" },
      ]}
    >
      <h2>What is X% of Y?</h2>
      <p>
        <code>Result = (X / 100) × Y</code>
      </p>
      <p>Example: 20% of 50 = (20/100) × 50 = <strong>10</strong>.</p>

      <h2>What percentage is X of Y?</h2>
      <p>
        <code>Result = (X / Y) × 100</code>
      </p>
      <p>Example: 75 out of 100 = (75/100) × 100 = <strong>75%</strong>.</p>

      <h2>Percentage increase or decrease</h2>
      <p>
        <code>Result = ((New − Old) / |Old|) × 100</code>
      </p>
      <p>
        Example: a mark rising from 50 to 75 is ((75−50)/50) × 100 = <strong>50% increase</strong>.
      </p>

      <h2>Percentage difference</h2>
      <p>
        Used to compare two values symmetrically (neither is "the original"):
        <br />
        <code>Result = (|A − B| / ((A+B)/2)) × 100</code>
      </p>

      <h2>Common mistakes</h2>
      <ul className="list-disc pl-5">
        <li>Confusing "percentage of" with "percentage increase" — they use different formulas.</li>
        <li>Dividing by the new value instead of the original when calculating change.</li>
        <li>Forgetting to handle a zero denominator, which makes the calculation undefined.</li>
      </ul>
    </GuideArticle>
  );
}
