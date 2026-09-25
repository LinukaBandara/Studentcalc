"use client";

import { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/utils/storage";

interface PlanSubject {
  id: string;
  name: string;
  priority: "high" | "medium" | "low";
  hoursAllocated: number;
}

interface Plan {
  examDate: string;
  hoursPerDay: number;
  subjects: PlanSubject[];
}

const EMPTY_PLAN: Plan = { examDate: "", hoursPerDay: 3, subjects: [] };

function newSubject(): PlanSubject {
  return { id: crypto.randomUUID(), name: "", priority: "medium", hoursAllocated: 0 };
}

const PRIORITY_WEIGHT = { high: 3, medium: 2, low: 1 };

export default function StudyPlanner() {
  const [plan, setPlan] = useState<Plan>(EMPTY_PLAN);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPlan(loadFromStorage(STORAGE_KEYS.studyPlanner, EMPTY_PLAN));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveToStorage(STORAGE_KEYS.studyPlanner, plan);
  }, [plan, loaded]);

  const daysLeft = plan.examDate
    ? Math.max(0, Math.ceil((new Date(plan.examDate).getTime() - Date.now()) / 86400000))
    : null;
  const totalHours = daysLeft !== null ? daysLeft * plan.hoursPerDay : 0;
  const totalWeight = plan.subjects.reduce((sum, s) => sum + PRIORITY_WEIGHT[s.priority], 0);

  const schedule = plan.subjects.map((s) => ({
    ...s,
    hoursAllocated:
      totalWeight > 0
        ? Math.round(((PRIORITY_WEIGHT[s.priority] / totalWeight) * totalHours) * 10) / 10
        : 0,
  }));

  return (
    <div className="max-w-2xl">
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm text-slate">
          Exam date
          <input
            type="date"
            value={plan.examDate}
            onChange={(e) => setPlan((p) => ({ ...p, examDate: e.target.value }))}
            className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
          />
        </label>
        <label className="text-sm text-slate">
          Hours/day available
          <input
            type="number"
            min={0}
            value={plan.hoursPerDay}
            onChange={(e) =>
              setPlan((p) => ({ ...p, hoursPerDay: parseFloat(e.target.value) || 0 }))
            }
            className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
          />
        </label>
      </div>

      <div className="mt-5 space-y-2">
        {plan.subjects.map((s, i) => (
          <div
            key={s.id}
            className="grid grid-cols-[1fr_120px_40px] gap-2 items-center bg-white border border-borderc rounded-card p-3"
          >
            <input
              type="text"
              placeholder={`Subject ${i + 1}`}
              value={s.name}
              onChange={(e) =>
                setPlan((p) => ({
                  ...p,
                  subjects: p.subjects.map((sub) =>
                    sub.id === s.id ? { ...sub, name: e.target.value } : sub
                  ),
                }))
              }
              className="min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
            />
            <select
              value={s.priority}
              onChange={(e) =>
                setPlan((p) => ({
                  ...p,
                  subjects: p.subjects.map((sub) =>
                    sub.id === s.id ? { ...sub, priority: e.target.value as PlanSubject["priority"] } : sub
                  ),
                }))
              }
              className="min-h-[44px] rounded-card border border-borderc px-2 text-[15px]"
            >
              <option value="high">High priority</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              type="button"
              onClick={() =>
                setPlan((p) => ({ ...p, subjects: p.subjects.filter((sub) => sub.id !== s.id) }))
              }
              className="min-h-[44px] text-slate"
              aria-label={`Remove subject ${i + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setPlan((p) => ({ ...p, subjects: [...p.subjects, newSubject()] }))}
        className="mt-3 min-h-[44px] rounded-card border border-borderc bg-white px-4 text-[15px] font-medium"
      >
        + Add subject
      </button>

      {daysLeft !== null && schedule.length > 0 && (
        <div className="mt-6 rounded-card bg-mint p-5">
          <p className="text-sm text-slate mb-3">
            {daysLeft} days left · {totalHours} total study hours
          </p>
          <ul className="space-y-1">
            {schedule.map((s) => (
              <li key={s.id} className="flex justify-between text-[15px] text-navy">
                <span>{s.name || "Untitled subject"}</span>
                <span className="font-medium">{s.hoursAllocated} hrs</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-slate mt-4">
        Your plan is saved locally in this browser only — it isn't sent anywhere.
      </p>
    </div>
  );
}
