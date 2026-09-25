"use client";

import { useState } from "react";
import { calculateGrade, isGradeError, gradeErrorMessage, DEFAULT_GRADE_BANDS } from "@/lib/calculations/grade";

export default function GradeCalculator() {
  const [marks, setMarks] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && marks !== "" ? calculateGrade(parseFloat(marks)) : null;

  return (
    <div className="max-w-md">
      <label className="block text-sm text-slate mb-1" htmlFor="marks">
        Marks (0–100)
      </label>
      <input
        id="marks"
        type="number"
        min={0}
        max={100}
        value={marks}
        onChange={(e) => {
          setMarks(e.target.value);
          setSubmitted(false);
        }}
        className="w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
      />

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="min-h-[44px] rounded-card bg-emerald hover:bg-emerald-dark text-white px-5 text-[15px] font-medium"
        >
          Calculate Grade
        </button>
        <button
          type="button"
          onClick={() => {
            setMarks("");
            setSubmitted(false);
          }}
          className="min-h-[44px] rounded-card px-4 text-[15px] font-medium text-slate"
        >
          Reset
        </button>
      </div>

      {result && (
        <div className="mt-6 rounded-card bg-mint p-5" role="status" aria-live="polite">
          {isGradeError(result) ? (
            <p className="text-error text-[15px]">{gradeErrorMessage(result)}</p>
          ) : (
            <>
              <p className="text-sm text-slate">Grade</p>
              <p className="text-4xl font-bold text-navy">{result.grade}</p>
              <p className="text-sm text-slate mt-2">
                Range: {result.band.min}–{result.band.max}
              </p>
            </>
          )}
        </div>
      )}

      <details className="mt-6 text-sm text-slate">
        <summary className="cursor-pointer font-medium text-navy">View grading scale</summary>
        <table className="mt-3 w-full text-left border-collapse overflow-x-auto block">
          <thead>
            <tr className="border-b border-borderc">
              <th className="py-2 pr-4">Grade</th>
              <th className="py-2">Range</th>
            </tr>
          </thead>
          <tbody>
            {DEFAULT_GRADE_BANDS.map((b) => (
              <tr key={b.grade} className="border-b border-borderc last:border-0">
                <td className="py-2 pr-4">{b.grade}</td>
                <td className="py-2">
                  {b.min}–{b.max}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs">
          This is an example scale — not a universal standard. Check your institution's actual
          grading policy.
        </p>
      </details>
    </div>
  );
}
