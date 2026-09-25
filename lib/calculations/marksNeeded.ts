export interface MarksNeededInput {
  /** Percentage already secured from completed assessments, weighted into the final grade. */
  currentWeightedPercent: number;
  /** Target overall percentage. */
  targetPercent: number;
  /** Remaining weight (as a percent of the total grade) still to be assessed. */
  remainingWeightPercent: number;
}

export interface MarksNeededResult {
  /** The percentage score needed on the remaining weight to hit the target. */
  requiredScoreOnRemaining: number;
  achievable: boolean;
}

export type MarksNeededError =
  | { code: "INVALID_INPUT" }
  | { code: "NO_REMAINING_WEIGHT" }
  | { code: "TARGET_ALREADY_IMPOSSIBLE" };

export function calculateMarksNeeded(
  input: MarksNeededInput
): MarksNeededResult | MarksNeededError {
  const { currentWeightedPercent, targetPercent, remainingWeightPercent } = input;

  if (
    !Number.isFinite(currentWeightedPercent) ||
    !Number.isFinite(targetPercent) ||
    !Number.isFinite(remainingWeightPercent)
  ) {
    return { code: "INVALID_INPUT" };
  }
  if (remainingWeightPercent <= 0) return { code: "NO_REMAINING_WEIGHT" };
  if (remainingWeightPercent > 100 || currentWeightedPercent < 0 || targetPercent < 0) {
    return { code: "INVALID_INPUT" };
  }

  const pointsNeeded = targetPercent - currentWeightedPercent;
  // requiredScoreOnRemaining is a % of the remaining assessment(s) themselves
  const requiredScoreOnRemaining =
    Math.round((pointsNeeded / remainingWeightPercent) * 100 * 100) / 100;

  if (requiredScoreOnRemaining > 100) {
    return { code: "TARGET_ALREADY_IMPOSSIBLE" };
  }

  return {
    requiredScoreOnRemaining: Math.max(0, requiredScoreOnRemaining),
    achievable: requiredScoreOnRemaining <= 100,
  };
}

export function isMarksNeededError(
  result: MarksNeededResult | MarksNeededError
): result is MarksNeededError {
  return "code" in result;
}

export function marksNeededErrorMessage(error: MarksNeededError): string {
  switch (error.code) {
    case "INVALID_INPUT":
      return "Enter valid percentages: current score, target, and remaining weight (0–100).";
    case "NO_REMAINING_WEIGHT":
      return "Remaining weight must be greater than 0 — there's nothing left to score on.";
    case "TARGET_ALREADY_IMPOSSIBLE":
      return "This target isn't reachable — it would require scoring over 100% on the remaining work.";
  }
}
