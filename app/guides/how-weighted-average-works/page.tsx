import type { Metadata } from "next";
import GuideArticle from "@/components/content/GuideArticle";

export const metadata: Metadata = {
  title: "How Weighted Averages Work",
  description: "Learn how to calculate a weighted average when different values carry different importance, with a worked grading example.",
  alternates: { canonical: "/guides/how-weighted-average-works" },
};

export default function Page() {
  return (
    <GuideArticle
      title="How Weighted Averages Work"
      slug="how-weighted-average-works"
      shortAnswer="Weighted average = the sum of (value × weight) for every item, divided by the total weight."
      relatedCalculator={{ href: "/calculators/weighted-average", label: "Weighted Average Calculator" }}
      relatedGuides={[
        { href: "/guides/how-to-calculate-average", label: "How to Calculate an Average" },
        { href: "/guides/how-to-calculate-gpa", label: "How to Calculate GPA" },
      ]}
    >
      <h2>The formula</h2>
      <p>
        <code>Weighted Average = Σ(Value × Weight) / Σ(Weight)</code>
      </p>

      <h2>Worked example</h2>
      <p>A course grade made up of:</p>
      <ul className="list-disc pl-5">
        <li>Assignments: 80%, weight 30</li>
        <li>Midterm: 70%, weight 30</li>
        <li>Final exam: 90%, weight 40</li>
      </ul>
      <p>
        (80×30) + (70×30) + (90×40) = 2400 + 2100 + 3600 = 8100
        <br />
        Total weight = 30 + 30 + 40 = 100
        <br />
        Weighted average = 8100 / 100 = <strong>81%</strong>
      </p>

      <h2>Where weighted averages show up</h2>
      <p>
        Course grades, GPA, and investment portfolio returns are all weighted averages under the
        hood — anywhere different items don't contribute equally to the final result.
      </p>

      <h2>Common mistakes</h2>
      <ul className="list-disc pl-5">
        <li>Using percentages that don't add up to 100 without realizing it changes the result.</li>
        <li>Forgetting to divide by total weight (not just the count of items).</li>
      </ul>
    </GuideArticle>
  );
}
