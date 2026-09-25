import type { Metadata } from "next";
import GuideArticle from "@/components/content/GuideArticle";

export const metadata: Metadata = {
  title: "How Z-Scores Work",
  description: "Understand what a Z-score means, the formula behind it, and its limitations — with a worked example.",
  alternates: { canonical: "/guides/how-z-score-works" },
};

export default function Page() {
  return (
    <GuideArticle
      title="How Z-Scores Work"
      slug="how-z-score-works"
      shortAnswer="A Z-score shows how many standard deviations a value is from the mean: Z = (X − μ) / σ."
      relatedCalculator={{ href: "/a-level/z-score", label: "Z-Score Calculator" }}
      relatedGuides={[{ href: "/guides/how-to-calculate-percentage", label: "How to Calculate Percentage" }]}
    >
      <h2>The formula</h2>
      <p>
        <code>Z = (X − μ) / σ</code>
      </p>
      <p>X is the raw score, μ is the mean, and σ is the standard deviation of the distribution.</p>

      <h2>Worked example</h2>
      <p>A student scores 70 in an exam where the mean is 60 and the standard deviation is 5.</p>
      <p>
        Z = (70 − 60) / 5 = <strong>2</strong>
      </p>
      <p>A Z-score of 2 means the score is two standard deviations above the mean — well above average.</p>

      <h2>Why standardization matters</h2>
      <p>
        Raw marks alone don't tell you how hard a paper was. A 70 on an easy paper (high mean)
        means less than a 70 on a hard one (low mean). Z-scores let you compare performance
        across different papers on a common scale.
      </p>

      <h2>Limitations</h2>
      <ul className="list-disc pl-5">
        <li>Z-scores assume something close to a normal distribution of scores.</li>
        <li>
          Official admissions Z-scores (like Sri Lanka's A/L university selection) use
          island-wide datasets and a published methodology — not a single student's numbers, and
          not what a simple educational calculator can reproduce.
        </li>
      </ul>
    </GuideArticle>
  );
}
