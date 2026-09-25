export interface WeightedEntry {
  id: string;
  value: number;
  weight: number;
}

export interface WeightedAverageResult {
  weightedAverage: number;
  totalWeight: number;
}

export type WeightedAverageError =
  | { code: "EMPTY_INPUT" }
  | { code: "INVALID_ENTRY"; entryId: string }
  | { code: "ZERO_TOTAL_WEIGHT" };

export function calculateWeightedAverage(
  entries: WeightedEntry[]
): WeightedAverageResult | WeightedAverageError {
  if (entries.length === 0) return { code: "EMPTY_INPUT" };

  let weightedSum = 0;
  let totalWeight = 0;

  for (const entry of entries) {
    if (!Number.isFinite(entry.value) || !Number.isFinite(entry.weight) || entry.weight < 0) {
      return { code: "INVALID_ENTRY", entryId: entry.id };
    }
    weightedSum += entry.value * entry.weight;
    totalWeight += entry.weight;
  }

  if (totalWeight === 0) return { code: "ZERO_TOTAL_WEIGHT" };

  return {
    weightedAverage: Math.round((weightedSum / totalWeight) * 100) / 100,
    totalWeight: Math.round(totalWeight * 100) / 100,
  };
}

export function isWeightedAverageError(
  result: WeightedAverageResult | WeightedAverageError
): result is WeightedAverageError {
  return "code" in result;
}

export function weightedAverageErrorMessage(error: WeightedAverageError): string {
  switch (error.code) {
    case "EMPTY_INPUT":
      return "Add at least one value to calculate a weighted average.";
    case "INVALID_ENTRY":
      return "Every value and weight must be a valid, non-negative number.";
    case "ZERO_TOTAL_WEIGHT":
      return "Total weight must be greater than 0.";
  }
}
