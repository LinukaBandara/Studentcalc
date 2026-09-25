export interface AverageResult {
  average: number;
  sum: number;
  count: number;
}

export type AverageError = { code: "EMPTY_INPUT" } | { code: "INVALID_VALUE" };

export function calculateAverage(values: number[]): AverageResult | AverageError {
  if (values.length === 0) return { code: "EMPTY_INPUT" };
  for (const v of values) {
    if (!Number.isFinite(v)) return { code: "INVALID_VALUE" };
  }
  const sum = values.reduce((acc, v) => acc + v, 0);
  return {
    average: Math.round((sum / values.length) * 100) / 100,
    sum: Math.round(sum * 100) / 100,
    count: values.length,
  };
}

export function isAverageError(result: AverageResult | AverageError): result is AverageError {
  return "code" in result;
}

export function averageErrorMessage(error: AverageError): string {
  switch (error.code) {
    case "EMPTY_INPUT":
      return "Add at least one value to calculate an average.";
    case "INVALID_VALUE":
      return "Every value must be a valid number.";
  }
}
