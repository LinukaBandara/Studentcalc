"use client";

import { useState } from "react";
import {
  calculateExamScore,
  isExamScoreError,
  examScoreErrorMessage,
  ExamComponent,
} from "@/lib/calculations/examScore";

function newComponent(): ExamComponent {
  return { id: crypto.randomUUID(), name: "", marks: null, weight: 0 };
}

export default function ExamScoreCalculator() {
  const [components, setComponents] = useState<ExamComponent[]>([newComponent(), newComponent()]);
  const [submitted, setSubmitted] = useState(false);

  const update = (id: string, patch: Partial<ExamComponent>) => {
    setComponents((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setSubmitted(false);
  };
  const remove = (id: string) => setComponents((rows) => rows.filter((r) => r.id !== id));
  const add = () => setComponents((rows) => [...rows, newComponent()]);

  const result = submitted ? calculateExamScore(components) : null;

  return (
    <div className="max-w-xl">
      <div className="space-y-3">
        {components.map((c, i) => (
          <div
            key={c.id}
            className="grid grid-cols-[1fr_100px_90px_40px] gap-2 items-center bg-white border border-borderc rounded-card p-3"
          >
            <input
              type="text"
              placeholder={`Component ${i + 1} (e.g. Midterm)`}
              value={c.name}
              onChange={(e) => update(c.id, { name: e.target.value })}
              className="min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
              aria-label={`Component ${i + 1} name`}
            />
            <input
              type="number"
              placeholder="Marks"
              value={c.marks ?? ""}
              onChange={(e) =>
                update(c.id, { marks: e.target.value === "" ? null : parseFloat(e.target.value) })
              }
              className="min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
              aria-label={`Component ${i + 1} marks (leave blank if not completed)`}
            />
            <input
              type="number"
              placeholder="Weight %"
              value={c.weight}
              onChange={(e) => update(c.id, { weight: parseFloat(e.target.value) })}
              className="min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
              aria-label={`Component ${i + 1} weight`}
            />
            <button
              type="button"
              onClick={() => remove(c.id)}
              disabled={components.length <= 1}
              className="min-h-[44px] text-slate disabled:opacity-30"
              aria-label={`Remove component ${i + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={add}
          className="min-h-[44px] rounded-card border border-borderc bg-white px-4 text-[15px] font-medium"
        >
          + Add component
        </button>
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
          {isExamScoreError(result) ? (
            <p className="text-error text-[15px]">{examScoreErrorMessage(result)}</p>
          ) : (
            <>
              <p className="text-sm text-slate">Current weighted score</p>
              <p className="text-4xl font-bold text-navy">{result.currentWeightedScore}%</p>
              <p className="text-sm text-slate mt-2">
                Completed weight: {result.completedWeight}% · Remaining: {result.remainingWeight}%
              </p>
            </>
          )}
        </div>
      )}

      <p className="text-xs text-slate mt-4">
        Leave "Marks" blank for a component you haven't completed yet — it will be counted as
        remaining weight.
      </p>
    </div>
  );
}
