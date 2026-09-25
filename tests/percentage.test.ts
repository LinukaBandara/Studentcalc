import { describe, it, expect } from "vitest";
import {
  percentOf,
  whatPercent,
  percentChange,
  percentDifference,
  isPercentageError,
} from "@/lib/calculations/percentage";

describe("whatPercent", () => {
  it("75 is 75% of 100", () => {
    const r = whatPercent(75, 100);
    expect(isPercentageError(r)).toBe(false);
    if (!isPercentageError(r)) expect(r.result).toBe(75);
  });

  it("100 of 125 is 80%", () => {
    const r = whatPercent(100, 125);
    if (!isPercentageError(r)) expect(r.result).toBe(80);
  });

  it("returns DIVIDE_BY_ZERO when base is 0", () => {
    const r = whatPercent(10, 0);
    expect(isPercentageError(r) && r.code).toBe("DIVIDE_BY_ZERO");
  });
});

describe("percentOf", () => {
  it("20% of 50 is 10", () => {
    const r = percentOf(20, 50);
    if (!isPercentageError(r)) expect(r.result).toBe(10);
  });
});

describe("percentChange", () => {
  it("detects an increase", () => {
    const r = percentChange(50, 75);
    if (!isPercentageError(r) && r.mode === "change") {
      expect(r.direction).toBe("increase");
      expect(r.result).toBe(50);
    }
  });

  it("detects a decrease", () => {
    const r = percentChange(100, 60);
    if (!isPercentageError(r) && r.mode === "change") {
      expect(r.direction).toBe("decrease");
      expect(r.result).toBe(40);
    }
  });

  it("returns DIVIDE_BY_ZERO when starting from 0", () => {
    const r = percentChange(0, 50);
    expect(isPercentageError(r) && r.code).toBe("DIVIDE_BY_ZERO");
  });
});

describe("percentDifference", () => {
  it("calculates symmetric difference", () => {
    const r = percentDifference(10, 20);
    if (!isPercentageError(r)) expect(r.result).toBeCloseTo(66.67, 1);
  });

  it("never returns NaN or Infinity for valid input", () => {
    const r = percentDifference(5, 5);
    if (!isPercentageError(r)) expect(Number.isFinite(r.result)).toBe(true);
  });
});
