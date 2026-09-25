export interface ZScoreResult {
  zScore: number;
}

export type ZScoreError = { code: "INVALID_INPUT" } | { code: "ZERO_STD_DEV" };

/**
 * Basic educational Z-score: Z = (X - mean) / standard deviation.
 *
 * This is NOT the official Sri Lankan university admissions Z-score
 * methodology, which uses subject-specific, island-wide datasets and
 * official standardization procedures published by the UGC / Department
 * of Examinations. This tool only illustrates the underlying statistical
 * concept with a score a student supplies themselves.
 */
export function calculateZScore(
  score: number,
  mean: number,
  stdDev: number
): ZScoreResult | ZScoreError {
  if (!Number.isFinite(score) || !Number.isFinite(mean) || !Number.isFinite(stdDev)) {
    return { code: "INVALID_INPUT" };
  }
  if (stdDev === 0) return { code: "ZERO_STD_DEV" };

  return { zScore: Math.round(((score - mean) / stdDev) * 10000) / 10000 };
}

export function isZScoreError(result: ZScoreResult | ZScoreError): result is ZScoreError {
  return "code" in result;
}

export function zScoreErrorMessage(error: ZScoreError): string {
  switch (error.code) {
    case "INVALID_INPUT":
      return "Enter valid numbers for score, mean, and standard deviation.";
    case "ZERO_STD_DEV":
      return "Standard deviation must be greater than 0.";
  }
}
