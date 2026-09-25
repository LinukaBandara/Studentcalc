"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "focus" | "shortBreak" | "longBreak";

const PHASE_LABEL: Record<Phase, string> = {
  focus: "Focus",
  shortBreak: "Short break",
  longBreak: "Long break",
};

function format(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Pomodoro() {
  // Common default Pomodoro configuration — fully customizable below.
  const [focusMin, setFocusMin] = useState(25);
  const [shortBreakMin, setShortBreakMin] = useState(5);
  const [longBreakMin, setLongBreakMin] = useState(15);
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(4);

  const [phase, setPhase] = useState<Phase>("focus");
  const [sessionCount, setSessionCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(focusMin * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const durationFor = (p: Phase) =>
    (p === "focus" ? focusMin : p === "shortBreak" ? shortBreakMin : longBreakMin) * 60;

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;

        // Phase complete — advance
        if (phase === "focus") {
          const nextCount = sessionCount + 1;
          setSessionCount(nextCount);
          const next: Phase = nextCount % sessionsBeforeLongBreak === 0 ? "longBreak" : "shortBreak";
          setPhase(next);
          return durationFor(next);
        }
        setPhase("focus");
        return durationFor("focus");
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phase, sessionCount]);

  const reset = () => {
    setRunning(false);
    setPhase("focus");
    setSessionCount(0);
    setSecondsLeft(focusMin * 60);
  };

  return (
    <div className="max-w-sm text-center">
      <p className="text-sm font-medium text-emerald uppercase tracking-wide">
        {PHASE_LABEL[phase]}
      </p>
      <p className="text-7xl font-bold text-navy tabular-nums my-4">{format(secondsLeft)}</p>
      <p className="text-xs text-slate">Session {sessionCount + 1}</p>

      <div className="flex justify-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="min-h-[44px] rounded-card bg-emerald hover:bg-emerald-dark text-white px-6 text-[15px] font-medium"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="min-h-[44px] rounded-card border border-borderc bg-white px-6 text-[15px] font-medium"
        >
          Reset
        </button>
      </div>

      <details className="mt-8 text-left">
        <summary className="cursor-pointer text-sm font-medium text-navy">Customize</summary>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {[
            ["Focus (min)", focusMin, setFocusMin],
            ["Short break (min)", shortBreakMin, setShortBreakMin],
            ["Long break (min)", longBreakMin, setLongBreakMin],
            ["Sessions before long break", sessionsBeforeLongBreak, setSessionsBeforeLongBreak],
          ].map(([label, val, setter]) => (
            <label key={label as string} className="text-xs text-slate">
              {label}
              <input
                type="number"
                min={1}
                value={val as number}
                onChange={(e) => {
                  (setter as (n: number) => void)(Math.max(1, parseInt(e.target.value) || 1));
                  reset();
                }}
                className="mt-1 w-full min-h-[40px] rounded-card border border-borderc px-2 text-sm"
              />
            </label>
          ))}
        </div>
      </details>
    </div>
  );
}
