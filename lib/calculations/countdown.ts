export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  status: "future" | "today" | "past";
  totalMs: number;
}

export type CountdownError = { code: "INVALID_DATE" };

export function calculateCountdown(
  targetIso: string,
  now: Date = new Date()
): CountdownResult | CountdownError {
  const target = new Date(targetIso);
  if (Number.isNaN(target.getTime())) return { code: "INVALID_DATE" };

  const diffMs = target.getTime() - now.getTime();

  // The calculator accepts ISO timestamps, so compare the calendar date in UTC
  // rather than depending on the machine's local timezone.
  const isSameUtcDay =
    target.getUTCFullYear() === now.getUTCFullYear() &&
    target.getUTCMonth() === now.getUTCMonth() &&
    target.getUTCDate() === now.getUTCDate();

  const status: CountdownResult["status"] =
    isSameUtcDay ? "today" : diffMs < 0 ? "past" : "future";
  const abs = Math.abs(diffMs);

  const days = Math.floor(abs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((abs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((abs / (1000 * 60)) % 60);
  const seconds = Math.floor((abs / 1000) % 60);

  return { days, hours, minutes, seconds, status, totalMs: diffMs };
}

export function isCountdownError(
  result: CountdownResult | CountdownError
): result is CountdownError {
  return "code" in result;
}
