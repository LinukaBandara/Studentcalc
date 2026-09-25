"use client";

import { useState } from "react";
import { calculateZScore, isZScoreError, zScoreErrorMessage } from "@/lib/calculations/zscore";

export default function ZScoreCalculator() {
  const [score, setScore] = useState("");
  const [mean, setMean] = useState("");
  const [stdDev, setStdDev] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const result =
    submitted && score !== "" && mean !== "" && stdDev !== ""
      ? calculateZScore(parseFloat(score), parseFloat(mean), parseFloat(stdDev))
      : null;

  return (
    <div className="max-w-md">
      <label className="block text-sm text-slate">
        Your score (X)
        <input
          type="number"
          value={score}
          onChange={(e) => {
            setScore(e.target.value);
            setSubmitted(false);
          }}
          className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
        />
      </label>
      <label className="block text-sm text-slate mt-3">
        Mean (μ)
        <input
          type="number"
          value={mean}
          onChange={(e) => {
            setMean(e.target.value);
            setSubmitted(false);
          }}
          className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
        />
      </label>
      <label className="block text-sm text-slate mt-3">
        Standard deviation (σ)
        <input
          type="number"
          value={stdDev}
          onChange={(e) => {
            setStdDev(e.target.value);
            setSubmitted(false);
          }}
          className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
        />
      </label>

      <button
        type="button"
        onClick={() => setSubmitted(true)}
        className="mt-4 min-h-[44px] rounded-card bg-emerald hover:bg-emerald-dark text-white px-5 text-[15px] font-medium"
      >
        Calculate Z-score
      </button>

      {result && (
        <div className="mt-6 rounded-card bg-mint p-5" role="status" aria-live="polite">
          {isZScoreError(result) ? (
            <p className="text-error text-[15px]">{zScoreErrorMessage(result)}</p>
          ) : (
            <>
              <p className="text-sm text-slate">Z-score</p>
              <p className="text-4xl font-bold text-navy">{result.zScore}</p>
            </>
          )}
        </div>
      )}

      <div className="mt-6 rounded-card border border-warning/40 bg-amber-50 p-4">
        <p className="text-sm text-navy">
          <strong>This is an educational calculation only.</strong> It is not the official Sri
          Lankan university admissions Z-score, which uses island-wide subject datasets and an
          official methodology published by the Department of Examinations / UGC. See the{" "}
          <a
            href="https://www.doenets.lk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald hover:underline"
          >
            Department of Examinations
          </a>{" "}
          for official figures.
        </p>
      </div>
    </div>
  );
}
