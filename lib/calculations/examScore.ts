export interface ExamComponent {
  id: string;
  name: string;
  marks: number | null; // null = not yet completed
  weight: number; // percent of final grade
}

export interface ExamScoreResult {
  currentWeightedScore: number;
  completedWeight: number;
  remainingWeight: number;
}

export type ExamScoreError =
  | { code: "EMPTY_INPUT" }
  | { code: "INVALID_COMPONENT"; componentId: string }
  | { code: "WEIGHT_EXCEEDS_100" };

export function calculateExamScore(
  components: ExamComponent[]
): ExamScoreResult | ExamScoreError {
  if (components.length === 0) return { code: "EMPTY_INPUT" };

  let totalWeight = 0;
  let completedWeight = 0;
  let weightedScore = 0;

  for (const c of components) {
    if (!Number.isFinite(c.weight) || c.weight < 0) {
      return { code: "INVALID_COMPONENT", componentId: c.id };
    }
    totalWeight += c.weight;
    if (c.marks !== null) {
      if (!Number.isFinite(c.marks) || c.marks < 0 || c.marks > 100) {
        return { code: "INVALID_COMPONENT", componentId: c.id };
      }
      completedWeight += c.weight;
      weightedScore += (c.marks / 100) * c.weight;
    }
  }

  if (totalWeight > 100.001) return { code: "WEIGHT_EXCEEDS_100" };

  return {
    currentWeightedScore: Math.round(weightedScore * 100) / 100,
    completedWeight: Math.round(completedWeight * 100) / 100,
    remainingWeight: Math.round((100 - completedWeight) * 100) / 100,
  };
}

export function isExamScoreError(
  result: ExamScoreResult | ExamScoreError
): result is ExamScoreError {
  return "code" in result;
}

export function examScoreErrorMessage(error: ExamScoreError): string {
  switch (error.code) {
    case "EMPTY_INPUT":
      return "Add at least one assessment component.";
    case "INVALID_COMPONENT":
      return "Enter a valid weight for every component, and marks between 0–100 for completed ones.";
    case "WEIGHT_EXCEEDS_100":
      return "Total weight across all components can't exceed 100%.";
  }
}
