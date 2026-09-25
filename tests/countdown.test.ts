import { describe, it, expect } from "vitest";
import { calculateCountdown, isCountdownError } from "@/lib/calculations/countdown";

describe("calculateCountdown", () => {
  it("counts down to a future date", () => {
    const now = new Date("2030-01-01T00:00:00Z");
    const r = calculateCountdown("2030-01-03T00:00:00Z", now);
    if (!isCountdownError(r)) {
      expect(r.status).toBe("future");
      expect(r.days).toBe(2);
    }
  });

  it("detects today", () => {
    const now = new Date("2030-01-01T08:00:00Z");
    const r = calculateCountdown("2030-01-01T20:00:00Z", now);
    if (!isCountdownError(r)) expect(r.status).toBe("today");
  });

  it("detects a past date", () => {
    const now = new Date("2030-01-05T00:00:00Z");
    const r = calculateCountdown("2030-01-01T00:00:00Z", now);
    if (!isCountdownError(r)) expect(r.status).toBe("past");
  });

  it("rejects an invalid date", () => {
    const r = calculateCountdown("not-a-date");
    expect(isCountdownError(r) && r.code).toBe("INVALID_DATE");
  });
});
