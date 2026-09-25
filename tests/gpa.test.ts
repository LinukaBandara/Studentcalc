import { describe, it, expect } from "vitest";
import { calculateGpa, isGpaError } from "@/lib/calculations/gpa";

describe("calculateGpa", () => {
  it("calculates GPA for one subject", () => {
    const result = calculateGpa([{ id: "1", name: "Math", grade: "A", credits: 3 }]);
    expect(isGpaError(result)).toBe(false);
    if (!isGpaError(result)) expect(result.gpa).toBe(4.0);
  });

  it("calculates GPA for multiple subjects with different credits", () => {
    const result = calculateGpa([
      { id: "1", name: "Math", grade: "A", credits: 3 },
      { id: "2", name: "Physics", grade: "B", credits: 4 },
    ]);
    expect(isGpaError(result)).toBe(false);
    if (!isGpaError(result)) {
      // (4.0*3 + 3.0*4) / 7 = 24/7 = 3.43
      expect(result.gpa).toBeCloseTo(3.43, 2);
      expect(result.totalCredits).toBe(7);
    }
  });

  it("returns NO_SUBJECTS for empty input", () => {
    const result = calculateGpa([]);
    expect(isGpaError(result) && result.code).toBe("NO_SUBJECTS");
  });

  it("returns INVALID_CREDITS for zero or negative credits", () => {
    const result = calculateGpa([{ id: "1", name: "Math", grade: "A", credits: 0 }]);
    expect(isGpaError(result) && result.code).toBe("INVALID_CREDITS");
  });

  it("returns UNKNOWN_GRADE for a grade not in the scale", () => {
    const result = calculateGpa([{ id: "1", name: "Math", grade: "Z", credits: 3 }]);
    expect(isGpaError(result) && result.code).toBe("UNKNOWN_GRADE");
  });

  it("never produces NaN or Infinity", () => {
    const result = calculateGpa([{ id: "1", name: "Math", grade: "F", credits: 3 }]);
    if (!isGpaError(result)) {
      expect(Number.isFinite(result.gpa)).toBe(true);
    }
  });
});
