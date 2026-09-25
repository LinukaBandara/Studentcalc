import { describe, it, expect } from "vitest";
import {
  percentOf,
  whatPercent,
  percentChange,
  percentDifference,
  isPercentageError,
} from "@/lib/calculations/percentage";

describe("percentage calculations", () => {
  it("calculates X percent of Y", () => {
    expect(percentOf(25, 200)).toEqual({ mode: "of", result: 50 });
  });

  it("calculates what percent X is of Y", () => {
    expect(whatPercent(25, 200)).toEqual({ mode: "isWhatPercent", result: 12.5 });
  });

  it("rejects a zero base for what-percent", () => {
    const result = whatPercent(25, 0);
    expect(isPercentageError(result) && result.code).toBe("DIVIDE_BY_ZERO");
  });

  it("calculates percentage increase", () => {
    expect(percentChange(100, 125)).toEqual({
      mode: "change",
      result: 25,
      direction: "increase",
    });
  });

  it("calculates percentage decrease", () => {
    expect(percentChange(100, 80)).toEqual({
      mode: "change",
      result: 20,
      direction: "decrease",
    });
  });

  it("calculates symmetric percentage difference", () => {
    expect(percentDifference(100, 120)).toEqual({ mode: "difference", result: 18.18 });
  });

  it("rejects a zero denominator in percentage difference", () => {
    const result = percentDifference(5, -5);
    expect(isPercentageError(result) && result.code).toBe("DIVIDE_BY_ZERO");
  });
});
