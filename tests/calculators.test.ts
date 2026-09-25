import { describe, it, expect } from "vitest";
import { calculateGrade, isGradeError } from "@/lib/calculations/grade";
import { calculateAttendance, isAttendanceError } from "@/lib/calculations/attendance";
import { calculateAverage, isAverageError } from "@/lib/calculations/average";
import {
  calculateWeightedAverage,
  isWeightedAverageError,
} from "@/lib/calculations/weightedAverage";
import { calculateMarksNeeded, isMarksNeededError } from "@/lib/calculations/marksNeeded";
import { calculateExamScore, isExamScoreError } from "@/lib/calculations/examScore";
import { calculateStudyHours, isStudyHoursError } from "@/lib/calculations/studyHours";

describe("calculateGrade", () => {
  it("maps 95 to A+", () => {
    const r = calculateGrade(95);
    if (!isGradeError(r)) expect(r.grade).toBe("A+");
  });
  it("maps 0 to F", () => {
    const r = calculateGrade(0);
    if (!isGradeError(r)) expect(r.grade).toBe("F");
  });
  it("rejects out-of-range marks", () => {
    const r = calculateGrade(150);
    expect(isGradeError(r) && r.code).toBe("OUT_OF_RANGE");
  });
});

describe("calculateAttendance", () => {
  it("100% attendance", () => {
    const r = calculateAttendance({ totalClasses: 20, attendedClasses: 20 });
    if (!isAttendanceError(r)) expect(r.attendancePercent).toBe(100);
  });
  it("50% attendance is below an 80% target", () => {
    const r = calculateAttendance({ totalClasses: 20, attendedClasses: 10, targetPercent: 80 });
    if (!isAttendanceError(r)) expect(r.status).toBe("below-target");
  });
  it("calculates classes that can still be missed", () => {
    const r = calculateAttendance({ totalClasses: 10, attendedClasses: 10, targetPercent: 80 });
    if (!isAttendanceError(r)) expect(r.classesCanMiss).toBeGreaterThanOrEqual(2);
  });
  it("calculates classes needed to reach target", () => {
    const r = calculateAttendance({ totalClasses: 10, attendedClasses: 5, targetPercent: 80 });
    if (!isAttendanceError(r)) expect(r.classesNeededToReachTarget).toBeGreaterThan(0);
  });
  it("rejects attended > total (impossible scenario)", () => {
    const r = calculateAttendance({ totalClasses: 10, attendedClasses: 15 });
    expect(isAttendanceError(r) && r.code).toBe("ATTENDED_EXCEEDS_TOTAL");
  });
});

describe("calculateAverage", () => {
  it("averages a single value", () => {
    const r = calculateAverage([42]);
    if (!isAverageError(r)) expect(r.average).toBe(42);
  });
  it("averages multiple values with decimals", () => {
    const r = calculateAverage([1.5, 2.5, 3]);
    if (!isAverageError(r)) expect(r.average).toBeCloseTo(2.33, 1);
  });
  it("rejects empty input", () => {
    expect(isAverageError(calculateAverage([]))).toBe(true);
  });
});

describe("calculateWeightedAverage", () => {
  it("computes normal weights", () => {
    const r = calculateWeightedAverage([
      { id: "1", value: 80, weight: 60 },
      { id: "2", value: 90, weight: 40 },
    ]);
    if (!isWeightedAverageError(r)) expect(r.weightedAverage).toBe(84);
  });
  it("rejects zero total weight", () => {
    const r = calculateWeightedAverage([{ id: "1", value: 80, weight: 0 }]);
    expect(isWeightedAverageError(r) && r.code).toBe("ZERO_TOTAL_WEIGHT");
  });
});

describe("calculateMarksNeeded", () => {
  it("computes an achievable target", () => {
    const r = calculateMarksNeeded({
      currentWeightedPercent: 40,
      targetPercent: 70,
      remainingWeightPercent: 50,
    });
    if (!isMarksNeededError(r)) expect(r.requiredScoreOnRemaining).toBe(60);
  });
  it("flags an impossible target", () => {
    const r = calculateMarksNeeded({
      currentWeightedPercent: 10,
      targetPercent: 95,
      remainingWeightPercent: 20,
    });
    expect(isMarksNeededError(r) && r.code).toBe("TARGET_ALREADY_IMPOSSIBLE");
  });
  it("handles boundary target exactly at 100", () => {
    const r = calculateMarksNeeded({
      currentWeightedPercent: 50,
      targetPercent: 100,
      remainingWeightPercent: 50,
    });
    if (!isMarksNeededError(r)) expect(r.requiredScoreOnRemaining).toBe(100);
  });
});

describe("calculateExamScore", () => {
  it("computes current weighted score with remaining components", () => {
    const r = calculateExamScore([
      { id: "1", name: "Midterm", marks: 80, weight: 40 },
      { id: "2", name: "Final", marks: null, weight: 60 },
    ]);
    if (!isExamScoreError(r)) {
      expect(r.currentWeightedScore).toBe(32);
      expect(r.remainingWeight).toBe(60);
    }
  });
});

describe("calculateStudyHours", () => {
  it("computes hours for a future exam", () => {
    const r = calculateStudyHours({
      examDate: "2030-01-10",
      currentDate: "2030-01-01",
      subjectCount: 3,
      hoursPerDay: 2,
    });
    if (!isStudyHoursError(r)) {
      expect(r.daysAvailable).toBe(9);
      expect(r.totalHours).toBe(18);
    }
  });
  it("rejects a past exam date", () => {
    const r = calculateStudyHours({
      examDate: "2020-01-01",
      currentDate: "2030-01-01",
      subjectCount: 2,
      hoursPerDay: 2,
    });
    expect(isStudyHoursError(r) && r.code).toBe("EXAM_IN_PAST");
  });
});
