export interface StudyHoursInput {
  examDate: string; // ISO date
  currentDate: string; // ISO date, defaults to now
  subjectCount: number;
  hoursPerDay: number;
}

export interface StudyHoursResult {
  daysAvailable: number;
  totalHours: number;
  hoursPerSubject: number;
}

export type StudyHoursError =
  | { code: "INVALID_DATE" }
  | { code: "EXAM_IN_PAST" }
  | { code: "INVALID_SUBJECT_COUNT" }
  | { code: "INVALID_HOURS_PER_DAY" };

export function calculateStudyHours(input: StudyHoursInput): StudyHoursResult | StudyHoursError {
  const exam = new Date(input.examDate);
  const now = new Date(input.currentDate);

  if (isNaN(exam.getTime()) || isNaN(now.getTime())) return { code: "INVALID_DATE" };

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysAvailable = Math.ceil((exam.getTime() - now.getTime()) / msPerDay);

  if (daysAvailable <= 0) return { code: "EXAM_IN_PAST" };
  if (!Number.isFinite(input.subjectCount) || input.subjectCount <= 0)
    return { code: "INVALID_SUBJECT_COUNT" };
  if (!Number.isFinite(input.hoursPerDay) || input.hoursPerDay <= 0 || input.hoursPerDay > 24)
    return { code: "INVALID_HOURS_PER_DAY" };

  const totalHours = daysAvailable * input.hoursPerDay;

  return {
    daysAvailable,
    totalHours: Math.round(totalHours * 100) / 100,
    hoursPerSubject: Math.round((totalHours / input.subjectCount) * 100) / 100,
  };
}

export function isStudyHoursError(
  result: StudyHoursResult | StudyHoursError
): result is StudyHoursError {
  return "code" in result;
}

export function studyHoursErrorMessage(error: StudyHoursError): string {
  switch (error.code) {
    case "INVALID_DATE":
      return "Enter a valid exam date.";
    case "EXAM_IN_PAST":
      return "The exam date must be in the future.";
    case "INVALID_SUBJECT_COUNT":
      return "Enter at least 1 subject.";
    case "INVALID_HOURS_PER_DAY":
      return "Enter available hours per day between 1 and 24.";
  }
}
