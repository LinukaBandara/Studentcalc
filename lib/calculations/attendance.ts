export interface AttendanceInput {
  totalClasses: number;
  attendedClasses: number;
  targetPercent?: number;
}

export interface AttendanceResult {
  attendancePercent: number;
  missedClasses: number;
  status: "on-track" | "at-risk" | "below-target";
  /** How many additional classes can still be missed while staying at/above target. */
  classesCanMiss?: number;
  /** Consecutive attended classes required to reach target, if currently below it. */
  classesNeededToReachTarget?: number;
  /** True if the target is mathematically unreachable given classes already missed. */
  targetUnreachable?: boolean;
}

export type AttendanceError =
  | { code: "INVALID_TOTAL" }
  | { code: "INVALID_ATTENDED" }
  | { code: "ATTENDED_EXCEEDS_TOTAL" }
  | { code: "INVALID_TARGET" };

export function calculateAttendance(
  input: AttendanceInput
): AttendanceResult | AttendanceError {
  const { totalClasses, attendedClasses, targetPercent = 80 } = input;

  if (!Number.isFinite(totalClasses) || totalClasses <= 0) return { code: "INVALID_TOTAL" };
  if (!Number.isFinite(attendedClasses) || attendedClasses < 0)
    return { code: "INVALID_ATTENDED" };
  if (attendedClasses > totalClasses) return { code: "ATTENDED_EXCEEDS_TOTAL" };
  if (!Number.isFinite(targetPercent) || targetPercent <= 0 || targetPercent > 100)
    return { code: "INVALID_TARGET" };

  const attendancePercent = Math.round((attendedClasses / totalClasses) * 100 * 100) / 100;
  const missedClasses = totalClasses - attendedClasses;

  const result: AttendanceResult = {
    attendancePercent,
    missedClasses,
    status:
      attendancePercent >= targetPercent
        ? "on-track"
        : attendancePercent >= targetPercent - 5
        ? "at-risk"
        : "below-target",
  };

  if (attendancePercent >= targetPercent) {
    // classesCanMiss = largest m such that attended / (total + m) >= target/100
    // attended >= (target/100) * (total + m)  =>  m <= attended*100/target - total
    const maxTotal = Math.floor((attendedClasses * 100) / targetPercent);
    result.classesCanMiss = Math.max(0, maxTotal - totalClasses);
  } else {
    // classesNeeded = smallest n such that (attended + n) / (total + n) >= target/100
    // attended + n >= (target/100)(total + n)
    // n(1 - target/100) >= (target/100)*total - attended
    const t = targetPercent / 100;
    if (t >= 1) {
      result.targetUnreachable = true;
    } else {
      const n = (t * totalClasses - attendedClasses) / (1 - t);
      if (n < 0) {
        result.classesNeededToReachTarget = 0;
      } else {
        result.classesNeededToReachTarget = Math.ceil(n);
      }
    }
  }

  return result;
}

export function isAttendanceError(
  result: AttendanceResult | AttendanceError
): result is AttendanceError {
  return "code" in result;
}

export function attendanceErrorMessage(error: AttendanceError): string {
  switch (error.code) {
    case "INVALID_TOTAL":
      return "Enter a value greater than 0 for total classes.";
    case "INVALID_ATTENDED":
      return "Enter a value of 0 or more for classes attended.";
    case "ATTENDED_EXCEEDS_TOTAL":
      return "Classes attended can't exceed total classes.";
    case "INVALID_TARGET":
      return "Enter a target attendance percentage between 1 and 100.";
  }
}
