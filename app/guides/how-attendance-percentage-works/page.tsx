import type { Metadata } from "next";
import GuideArticle from "@/components/content/GuideArticle";

export const metadata: Metadata = {
  title: "How Attendance Percentage Works (With Examples)",
  description: "Learn how attendance percentage is calculated, how many classes you can miss, and how to work out what's needed to reach a target.",
  alternates: { canonical: "/guides/how-attendance-percentage-works" },
};

export default function Page() {
  return (
    <GuideArticle
      title="How Attendance Percentage Works"
      slug="how-attendance-percentage-works"
      shortAnswer="Attendance % = (classes attended / total classes) × 100."
      relatedCalculator={{ href: "/calculators/attendance", label: "Attendance Calculator" }}
      relatedGuides={[{ href: "/guides/how-to-calculate-percentage", label: "How to Calculate Percentage" }]}
    >
      <h2>The basic formula</h2>
      <p>
        <code>Attendance % = (Attended / Total) × 100</code>
      </p>
      <p>Example: attending 45 out of 50 classes = (45/50) × 100 = <strong>90%</strong>.</p>

      <h2>How many more classes can you miss?</h2>
      <p>
        If your target is T% and you've attended A out of C classes, you can miss additional
        classes as long as A stays ≥ T% of the new total. The largest total you can reach is{" "}
        <code>A × 100 / T</code>, so the number of additional misses is that value minus your
        current total classes.
      </p>

      <h2>How many classes do you need to attend to recover?</h2>
      <p>
        If you're below target, you need to attend enough future classes in a row that your
        attended count divided by the new total reaches T%. This is solved algebraically, and
        the exact number depends on how far below target you currently are — the Attendance
        Calculator works this out for you automatically.
      </p>

      <h2>Common mistakes</h2>
      <ul className="list-disc pl-5">
        <li>Assuming missing one more class only changes the numerator — it also changes the total.</li>
        <li>Not accounting for classes that haven't happened yet when planning ahead.</li>
        <li>Assuming a single official attendance policy — institutions set their own thresholds.</li>
      </ul>
    </GuideArticle>
  );
}
