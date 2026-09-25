export interface GradeBand {
  grade: string;
  min: number;
  max: number;
}

/**
 * Default example grading scale. Explicitly NOT a universal institutional
 * standard (Section 13) — institutions vary widely. Callers may supply
 * their own bands for institution-specific calculations.
 */
export const DEFAULT_GRADE_BANDS: GradeBand[] = [
  { grade: "A+", min: 90, max: 100 },
  { grade: "A", min: 80, max: 89.999 },
  { grade: "A-", min: 75, max: 79.999 },
  { grade: "B+", min: 70, max: 74.999 },
  { grade: "B", min: 65, max: 69.999 },
  { grade: "B-", min: 60, max: 64.999 },
  { grade: "C+", min: 55, max: 59.999 },
  { grade: "C", min: 50, max: 54.999 },
  { grade: "D", min: 40, max: 49.999 },
  { grade: "F", min: 0, max: 39.999 },
];

export type GradeError = { code: "INVALID_MARKS" } | { code: "OUT_OF_RANGE" };

export interface GradeResult {
  grade: string;
  band: GradeBand;
}

export function calculateGrade(
  marks: number,
  bands: GradeBand[] = DEFAULT_GRADE_BANDS
): GradeResult | GradeError {
  if (!Number.isFinite(marks)) return { code: "INVALID_MARKS" };
  const band = bands.find((b) => marks >= b.min && marks <= b.max);
  if (!band) return { code: "OUT_OF_RANGE" };
  return { grade: band.grade, band };
}

export function isGradeError(result: GradeResult | GradeError): result is GradeError {
  return "code" in result;
}

export function gradeErrorMessage(error: GradeError): string {
  switch (error.code) {
    case "INVALID_MARKS":
      return "Enter a valid numeric mark.";
    case "OUT_OF_RANGE":
      return "Marks must fall within the grading scale (typically 0–100).";
  }
}
