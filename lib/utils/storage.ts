/**
 * Thin, typed wrapper around localStorage. Every StudentCalc planning tool
 * that persists data does so entirely in the browser — nothing is sent to
 * a server (Section 47 / 48 of the product spec).
 */
export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be full or disabled (private browsing) — fail silently,
    // the UI still works for the current session.
  }
}

export const STORAGE_KEYS = {
  studyPlanner: "studentcalc:study-planner",
  semesterPlanner: "studentcalc:semester-planner",
  assignmentDeadlines: "studentcalc:assignment-deadlines",
} as const;
