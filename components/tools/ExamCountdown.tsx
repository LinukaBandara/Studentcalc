"use client";

import { useEffect, useState } from "react";
import { calculateCountdown, isCountdownError } from "@/lib/calculations/countdown";

export default function ExamCountdown() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [now, setNow] = useState<Date | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [active]);

  const targetIso = date ? `${date}T${time || "00:00"}:00` : "";
  const result = active && now && targetIso ? calculateCountdown(targetIso, now) : null;

  return (
    <div className="max-w-md">
      <label className="block text-sm text-slate">
        Exam name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Physics Final"
          className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
        />
      </label>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <label className="text-sm text-slate">
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setActive(false);
            }}
            className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
          />
        </label>
        <label className="text-sm text-slate">
          Time
          <input
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setActive(false);
            }}
            className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => setActive(true)}
        disabled={!date}
        className="mt-4 min-h-[44px] rounded-card bg-emerald hover:bg-emerald-dark text-white px-5 text-[15px] font-medium disabled:opacity-40"
      >
        Start countdown
      </button>

      {result && (
        <div className="mt-6 rounded-card bg-mint p-5" role="status" aria-live="polite">
          {isCountdownError(result) ? (
            <p className="text-error text-[15px]">Enter a valid date.</p>
          ) : result.status === "past" ? (
            <p className="text-navy text-[15px]">
              {name || "This exam"} was {result.days}d {result.hours}h ago.
            </p>
          ) : result.status === "today" ? (
            <p className="text-2xl font-bold text-navy">{name || "Exam"} is today!</p>
          ) : (
            <>
              <p className="text-sm text-slate">{name || "Exam"} in</p>
              <div className="flex gap-4 mt-1">
                {[
                  ["Days", result.days],
                  ["Hours", result.hours],
                  ["Min", result.minutes],
                  ["Sec", result.seconds],
                ].map(([label, val]) => (
                  <div key={label as string} className="text-center">
                    <p className="text-3xl font-bold text-navy tabular-nums">{val}</p>
                    <p className="text-xs text-slate">{label}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
