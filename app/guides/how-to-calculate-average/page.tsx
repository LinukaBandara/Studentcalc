import type { Metadata } from "next";
import GuideArticle from "@/components/content/GuideArticle";

export const metadata: Metadata = {
  title: "How to Calculate an Average",
  description: "Learn how to calculate the average (mean) of a set of numbers, with a worked example.",
  alternates: { canonical: "/guides/how-to-calculate-average" },
};

export default function Page() {
  return (
    <GuideArticle
      title="How to Calculate an Average"
      slug="how-to-calculate-average"
      shortAnswer="Average = the sum of all values divided by how many values there are."
      relatedCalculator={{ href: "/calculators/average", label: "Average Calculator" }}
      relatedGuides={[{ href: "/guides/how-weighted-average-works", label: "How Weighted Averages Work" }]}
    >
      <h2>The formula</h2>
      <p>
        <code>Average = Sum of values / Number of values</code>
      </p>

      <h2>Worked example</h2>
      <p>Test scores: 70, 85, 90, 60.</p>
      <p>
        Sum = 70 + 85 + 90 + 60 = 305
        <br />
        Count = 4
        <br />
        Average = 305 / 4 = <strong>76.25</strong>
      </p>

      <h2>When a plain average isn't enough</h2>
      <p>
        A plain average treats every value equally. If some values matter more than others —
        like an exam worth more than a quiz — you need a{" "}
        <a href="/guides/how-weighted-average-works" className="text-emerald hover:underline">
          weighted average
        </a>{" "}
        instead.
      </p>

      <h2>Common mistakes</h2>
      <ul className="list-disc pl-5">
        <li>Miscounting the number of values, especially when some are missing or blank.</li>
        <li>Including a value that shouldn't count (e.g. an excused or dropped assignment).</li>
      </ul>
    </GuideArticle>
  );
}
