export type PercentageMode = "of" | "isWhatPercent" | "change" | "difference";

export type PercentageResult =
  | { mode: "of"; result: number }
  | { mode: "isWhatPercent"; result: number }
  | { mode: "change"; result: number; direction: "increase" | "decrease" | "none" }
  | { mode: "difference"; result: number };

export type PercentageError = { code: "DIVIDE_BY_ZERO" } | { code: "INVALID_INPUT" };

function isValidNumber(n: number): boolean {
  return Number.isFinite(n);
}

/** What is X% of Y? */
export function percentOf(x: number, y: number): PercentageResult | PercentageError {
  if (!isValidNumber(x) || !isValidNumber(y)) return { code: "INVALID_INPUT" };
  return { mode: "of", result: Math.round((x / 100) * y * 100) / 100 };
}

/** What percentage is X of Y? */
export function whatPercent(x: number, y: number): PercentageResult | PercentageError {
  if (!isValidNumber(x) || !isValidNumber(y)) return { code: "INVALID_INPUT" };
  if (y === 0) return { code: "DIVIDE_BY_ZERO" };
  return { mode: "isWhatPercent", result: Math.round((x / y) * 100 * 100) / 100 };
}

/** Percentage increase/decrease from X to Y */
export function percentChange(from: number, to: number): PercentageResult | PercentageError {
  if (!isValidNumber(from) || !isValidNumber(to)) return { code: "INVALID_INPUT" };
  if (from === 0) return { code: "DIVIDE_BY_ZERO" };
  const raw = ((to - from) / Math.abs(from)) * 100;
  const result = Math.round(raw * 100) / 100;
  const direction = result > 0 ? "increase" : result < 0 ? "decrease" : "none";
  return { mode: "change", result: Math.abs(result), direction };
}

/** Percentage difference between two values (symmetric) */
export function percentDifference(a: number, b: number): PercentageResult | PercentageError {
  if (!isValidNumber(a) || !isValidNumber(b)) return { code: "INVALID_INPUT" };

  const denominator = (a + b) / 2;
  if (denominator === 0) return { code: "DIVIDE_BY_ZERO" };

  const raw = (Math.abs(a - b) / denominator) * 100;
  return { mode: "difference", result: Math.round(raw * 100) / 100 };
}

export function isPercentageError(
  result: PercentageResult | PercentageError
): result is PercentageError {
  return "code" in result;
}

export function percentageErrorMessage(error: PercentageError): string {
  switch (error.code) {
    case "DIVIDE_BY_ZERO":
      return "This calculation needs a non-zero base value.";
    case "INVALID_INPUT":
      return "Enter valid numbers in every field.";
  }
}
