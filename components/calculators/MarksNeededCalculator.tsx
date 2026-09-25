"use client";

import { useState } from "react";
import {
  calculateMarksNeeded,
  isMarksNeededError,
  marksNeededErrorMessage,
} from "@/lib/calculations/marksNeeded";

export default function MarksNeededCalculator() {
  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState("");
  const [remainingWeight, setRemainingWeight] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const result =
    submitted && current !== "" && target !== "" && remainingWeight !== ""
      ? calculateMarksNeeded({
          currentWeightedPercent: parseFloat(current),
          targetPercent: parseFloat(target),
          remainingWeightPercent: parseFloat(remainingWeight),
        })
      : null;

  return (
    <div className="max-w-md">
      <label className="block text-sm text-slate">
        Current score secured so far (%)
        <input
          type="number"
          value={current}
          onChange={(e) => {
            setCurrent(e.target.value);
            setSubmitted(false);
          }}
          className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
        />
      </label>
      <label className="block text-sm text-slate mt-3">
        Target overall percentage
        <input
          type="number"
          value={target}
          onChange={(e) => {
            setTarget(e.target.value);
            setSubmitted(false);
          }}
          className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
        />
      </label>
      <label className="block text-sm text-slate mt-3">
        Remaining assessment weight (%)
        <input
          type="number"
          value={remainingWeight}
          onChange={(e) => {
            setRemainingWeight(e.target.value);
            setSubmitted(false);
          }}
          className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
        />
      </label>

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="min-h-[44px] rounded-card bg-emerald hover:bg-emerald-dark text-white px-5 text-[15px] font-medium"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="mt-6 rounded-card bg-mint p-5" role="status" aria-live="polite">
          {isMarksNeededError(result) ? (
            <p className="text-error text-[15px]">{marksNeededErrorMessage(result)}</p>
          ) : (
            <>
              <p className="text-sm text-slate">You need to score</p>
              <p className="text-4xl font-bold text-navy">{result.requiredScoreOnRemaining}%</p>
              <p className="text-sm text-slate mt-2">on the remaining assessment weight</p>
            </>
          )}
        </div>
      )}

      <p className="text-xs text-slate mt-4">
        Assumes "current score" is already weighted into the overall grade proportionally.
        Check your course's actual grading breakdown for exact figures.
      </p>
    </div>
  );
}
