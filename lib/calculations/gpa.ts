export interface GpaSubject {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

export interface GpaResult {
  gpa: number;
  totalCredits: number;
  totalGradePoints: number;
}

export type GpaError =
  | { code: "NO_SUBJECTS" }
  | { code: "INVALID_CREDITS"; subjectId: string }
  | { code: "UNKNOWN_GRADE"; subjectId: string; grade: string }
  | { code: "ZERO_TOTAL_CREDITS" };

/**
 * Default example grading scale. Clearly NOT a universal institutional
 * standard — see Section 11 of the product spec. Callers may supply
 * their own scale for institution-specific calculations.
 */
export const DEFAULT_GRADE_SCALE: Record<string, number> = {
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  D: 1.0,
  F: 0,
};

export function calculateGpa(
  subjects: GpaSubject[],
  scale: Record<string, number> = DEFAULT_GRADE_SCALE
): GpaResult | GpaError {
  if (subjects.length === 0) return { code: "NO_SUBJECTS" };

  let totalCredits = 0;
  let totalGradePoints = 0;

  for (const subject of subjects) {
    if (!Number.isFinite(subject.credits) || subject.credits <= 0) {
      return { code: "INVALID_CREDITS", subjectId: subject.id };
    }
    const gradePoint = scale[subject.grade];
    if (gradePoint === undefined) {
      return { code: "UNKNOWN_GRADE", subjectId: subject.id, grade: subject.grade };
    }
    totalCredits += subject.credits;
    totalGradePoints += gradePoint * subject.credits;
  }

  if (totalCredits === 0) return { code: "ZERO_TOTAL_CREDITS" };

  return {
    gpa: Math.round((totalGradePoints / totalCredits) * 100) / 100,
    totalCredits,
    totalGradePoints: Math.round(totalGradePoints * 100) / 100,
  };
}

export function isGpaError(result: GpaResult | GpaError): result is GpaError {
  return "code" in result;
}

export function gpaErrorMessage(error: GpaError): string {
  switch (error.code) {
    case "NO_SUBJECTS":
      return "Add at least one subject to calculate your GPA.";
    case "INVALID_CREDITS":
      return "Enter a credit value greater than 0 for every subject.";
    case "UNKNOWN_GRADE":
      return `"${error.grade}" isn't a recognized grade in the selected scale.`;
    case "ZERO_TOTAL_CREDITS":
      return "Total credits must be greater than 0.";
  }
}
