import type { MetadataRoute } from "next";

const SITE_URL = "https://studentcalc.example"; // TODO: replace with real production domain

// NOTE: extend this list as each phase adds real, implemented routes.
// Never include a route here until its page actually exists (Section 37).
const ROUTES = [
  "/",
  "/calculators",
  "/calculators/gpa",
  "/calculators/percentage",
  "/calculators/grade",
  "/calculators/attendance",
  "/calculators/average",
  "/calculators/weighted-average",
  "/calculators/marks-needed",
  "/calculators/exam-score",
  "/calculators/study-hours",
  "/tools",
  "/tools/exam-countdown",
  "/tools/study-timer",
  "/tools/pomodoro",
  "/tools/study-planner",
  "/tools/semester-planner",
  "/tools/assignment-deadline",
  "/a-level",
  "/a-level/z-score",
  "/a-level/university-selection",
  "/a-level/subjects",
  "/a-level/resources",
  "/guides",
  "/guides/how-to-calculate-gpa",
  "/guides/how-to-calculate-percentage",
  "/guides/how-attendance-percentage-works",
  "/guides/how-to-calculate-average",
  "/guides/how-weighted-average-works",
  "/guides/how-to-calculate-marks-needed",
  "/guides/how-z-score-works",
  "/guides/how-to-plan-study-time",
  "/guides/how-to-prepare-for-exams",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
