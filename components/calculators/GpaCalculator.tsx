"use client";

import { useState } from "react";
import {
  calculateGpa,
  isGpaError,
  gpaErrorMessage,
  DEFAULT_GRADE_SCALE,
  GpaSubject,
} from "@/lib/calculations/gpa";

const GRADES = Object.keys(DEFAULT_GRADE_SCALE);

function newSubject(): GpaSubject {
  return { id: crypto.randomUUID(), name: "", grade: "A", credits: 3 };
}

export default function GpaCalculator() {
  const [subjects, setSubjects] = useState<GpaSubject[]>([newSubject(), newSubject()]);
  const [submitted, setSubmitted] = useState(false);

  const update = (id: string, patch: Partial<GpaSubject>) =>
    setSubjects((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const remove = (id: string) => setSubjects((rows) => rows.filter((r) => r.id !== id));
  const add = () => setSubjects((rows) => [...rows, newSubject()]);
  const reset = () => {
    setSubjects([newSubject(), newSubject()]);
    setSubmitted(false);
  };

  const result = submitted ? calculateGpa(subjects) : null;

  return (
    <div className="max-w-2xl">
      <div className="space-y-3">
        {subjects.map((s, i) => (
          <div
            key={s.id}
            className="grid grid-cols-[1fr_100px_90px_40px] gap-2 items-center bg-white border border-borderc rounded-card p-3"
          >
            <input
              type="text"
              placeholder={`Subject ${i + 1}`}
              value={s.name}
              onChange={(e) => update(s.id, { name: e.target.value })}
              className="min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
              aria-label={`Subject ${i + 1} name`}
            />
            <select
              value={s.grade}
              onChange={(e) => update(s.id, { grade: e.target.value })}
              className="min-h-[44px] rounded-card border border-borderc px-2 text-[15px]"
              aria-label={`Subject ${i + 1} grade`}
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={0}
              step="0.5"
              value={s.credits}
              onChange={(e) => update(s.id, { credits: parseFloat(e.target.value) })}
              className="min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
              aria-label={`Subject ${i + 1} credits`}
            />
            <button
              type="button"
              onClick={() => remove(s.id)}
              disabled={subjects.length <= 1}
              className="min-h-[44px] text-slate disabled:opacity-30"
              aria-label={`Remove subject ${i + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          type="button"
          onClick={add}
          className="min-h-[44px] rounded-card border border-borderc bg-white px-4 text-[15px] font-medium"
        >
          + Add subject
        </button>
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="min-h-[44px] rounded-card bg-emerald hover:bg-emerald-dark text-white px-5 text-[15px] font-medium"
        >
          Calculate GPA
        </button>
        <button
          type="button"
          onClick={reset}
          className="min-h-[44px] rounded-card px-4 text-[15px] font-medium text-slate"
        >
          Reset
        </button>
      </div>

      {result && (
        <div className="mt-6 rounded-card bg-mint p-5" role="status" aria-live="polite">
          {isGpaError(result) ? (
            <p className="text-error text-[15px]">{gpaErrorMessage(result)}</p>
          ) : (
            <>
              <p className="text-sm text-slate">Your GPA</p>
              <p className="text-4xl font-bold text-navy">{result.gpa.toFixed(2)}</p>
              <p className="text-sm text-slate mt-2">
                {result.totalCredits} total credits · {result.totalGradePoints} grade points
              </p>
            </>
          )}
        </div>
      )}

      <p className="text-xs text-slate mt-4">
        Uses a default example 4.0-style scale (A = 4.0 … F = 0). Your institution's official
        scale may differ — check your student handbook for the exact values.
      </p>
    </div>
  );
}
