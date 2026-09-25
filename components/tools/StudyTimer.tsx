"use client";

import { useEffect, useRef, useState } from "react";

function format(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function StudyTimer() {
  const [durationMin, setDurationMin] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const reset = () => {
    setRunning(false);
    setSecondsLeft(durationMin * 60);
  };

  return (
    <div className="max-w-sm text-center">
      <p className="text-7xl font-bold text-navy tabular-nums my-6">{format(secondsLeft)}</p>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          disabled={secondsLeft === 0}
          className="min-h-[44px] rounded-card bg-emerald hover:bg-emerald-dark text-white px-6 text-[15px] font-medium disabled:opacity-40"
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

      <label className="block text-sm text-slate mt-8">
        Duration (minutes)
        <input
          type="number"
          min={1}
          max={180}
          value={durationMin}
          onChange={(e) => {
            const val = Math.max(1, Math.min(180, parseInt(e.target.value) || 1));
            setDurationMin(val);
            setSecondsLeft(val * 60);
            setRunning(false);
          }}
          className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px] text-center"
        />
      </label>
    </div>
  );
}
