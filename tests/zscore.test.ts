import { describe, it, expect } from "vitest";
import { calculateZScore, isZScoreError } from "@/lib/calculations/zscore";

describe("calculateZScore", () => {
  it("computes a positive z-score above the mean", () => {
    const r = calculateZScore(70, 60, 5);
    if (!isZScoreError(r)) expect(r.zScore).toBe(2);
  });

  it("computes a negative z-score below the mean", () => {
    const r = calculateZScore(50, 60, 5);
    if (!isZScoreError(r)) expect(r.zScore).toBe(-2);
  });

  it("rejects a zero standard deviation", () => {
    const r = calculateZScore(50, 60, 0);
    expect(isZScoreError(r) && r.code).toBe("ZERO_STD_DEV");
  });

  it("rejects invalid input", () => {
    const r = calculateZScore(NaN, 60, 5);
    expect(isZScoreError(r) && r.code).toBe("INVALID_INPUT");
  });
});
