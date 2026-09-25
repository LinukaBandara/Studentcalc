import type { Metadata } from "next";
import GuideArticle from "@/components/content/GuideArticle";

export const metadata: Metadata = {
  title: "How to Calculate GPA (With a Worked Example)",
  description: "Learn the GPA formula, see a step-by-step worked example, and avoid the most common GPA calculation mistakes.",
  alternates: { canonical: "/guides/how-to-calculate-gpa" },
};

export default function Page() {
  return (
    <GuideArticle
      title="How to Calculate GPA"
      slug="how-to-calculate-gpa"
      shortAnswer="GPA = the sum of (grade point × credits) for every subject, divided by the total credits."
      relatedCalculator={{ href: "/calculators/gpa", label: "GPA Calculator" }}
      relatedGuides={[
        { href: "/guides/how-weighted-average-works", label: "How Weighted Averages Work" },
        { href: "/guides/how-to-calculate-percentage", label: "How to Calculate Percentage" },
      ]}
      faq={[
        {
          q: "Does every university use the same GPA scale?",
          a: "No. Scales vary — some use 4.0, others 5.0, and grade-point values for each letter grade differ by institution. Always check your own institution's official scale.",
        },
      ]}
    >
      <h2>Why GPA isn't just an average</h2>
      <p>
        A simple average treats every subject equally. GPA weights each subject by its credit
        value, so a 4-credit course affects your GPA more than a 2-credit one. That's why GPA is
        really a specific type of weighted average.
      </p>

      <h2>The formula</h2>
      <p>
        <code>GPA = Σ(Grade Point × Credit) / Σ(Credits)</code>
      </p>
      <p>
        Each letter grade maps to a grade point (for example A = 4.0, B = 3.0). Multiply each
        subject's grade point by its credits, add those up, then divide by the total credits.
      </p>

      <h2>Worked example</h2>
      <p>Say you took three subjects:</p>
      <ul className="list-disc pl-5">
        <li>Math: grade A (4.0), 4 credits</li>
        <li>English: grade B (3.0), 3 credits</li>
        <li>History: grade B- (2.7), 2 credits</li>
      </ul>
      <p>
        Grade points: (4.0×4) + (3.0×3) + (2.7×2) = 16 + 9 + 5.4 = 30.4
        <br />
        Total credits: 4 + 3 + 2 = 9
        <br />
        GPA = 30.4 / 9 = <strong>3.38</strong>
      </p>

      <h2>Common mistakes</h2>
      <ul className="list-disc pl-5">
        <li>Averaging grade points without weighting by credits.</li>
        <li>Using the wrong grade-point scale for your institution.</li>
        <li>Forgetting to include a subject with a low grade, which skews results upward.</li>
      </ul>
    </GuideArticle>
  );
}
