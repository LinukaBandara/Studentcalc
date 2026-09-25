"use client";

import { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "@/lib/utils/storage";

interface SemesterItem {
  id: string;
  module: string;
  type: "assignment" | "exam";
  dueDate: string;
}

function newItem(): SemesterItem {
  return { id: crypto.randomUUID(), module: "", type: "assignment", dueDate: "" };
}

function daysUntil(dateStr: string): number | null {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}

export default function SemesterPlanner() {
  const [items, setItems] = useState<SemesterItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadFromStorage(STORAGE_KEYS.semesterPlanner, []));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveToStorage(STORAGE_KEYS.semesterPlanner, items);
  }, [items, loaded]);

  const sorted = [...items]
    .filter((i) => i.dueDate)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="max-w-2xl">
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="grid grid-cols-[1fr_120px_150px_40px] gap-2 items-center bg-white border border-borderc rounded-card p-3"
          >
            <input
              type="text"
              placeholder={`Module ${i + 1}`}
              value={item.module}
              onChange={(e) =>
                setItems((rows) =>
                  rows.map((r) => (r.id === item.id ? { ...r, module: e.target.value } : r))
                )
              }
              className="min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
            />
            <select
              value={item.type}
              onChange={(e) =>
                setItems((rows) =>
                  rows.map((r) =>
                    r.id === item.id ? { ...r, type: e.target.value as SemesterItem["type"] } : r
                  )
                )
              }
              className="min-h-[44px] rounded-card border border-borderc px-2 text-[15px]"
            >
              <option value="assignment">Assignment</option>
              <option value="exam">Exam</option>
            </select>
            <input
              type="date"
              value={item.dueDate}
              onChange={(e) =>
                setItems((rows) =>
                  rows.map((r) => (r.id === item.id ? { ...r, dueDate: e.target.value } : r))
                )
              }
              className="min-h-[44px] rounded-card border border-borderc px-2 text-[15px]"
            />
            <button
              type="button"
              onClick={() => setItems((rows) => rows.filter((r) => r.id !== item.id))}
              className="min-h-[44px] text-slate"
              aria-label={`Remove ${item.module || "item"}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setItems((rows) => [...rows, newItem()])}
        className="mt-3 min-h-[44px] rounded-card border border-borderc bg-white px-4 text-[15px] font-medium"
      >
        + Add item
      </button>

      {sorted.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-navy mb-3">Upcoming deadlines</h2>
          <ul className="space-y-2">
            {sorted.map((item) => {
              const d = daysUntil(item.dueDate);
              const overdue = d !== null && d < 0;
              return (
                <li
                  key={item.id}
                  className={`rounded-card p-3 flex justify-between text-[15px] ${
                    overdue ? "bg-red-50 text-error" : "bg-mint text-navy"
                  }`}
                >
                  <span>
                    {item.module || "Untitled"} · {item.type}
                  </span>
                  <span className="font-medium">
                    {overdue ? `${Math.abs(d!)}d overdue` : `${d}d left`}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <p className="text-xs text-slate mt-4">
        Saved locally in this browser only — no account, no personal data collected.
      </p>
    </div>
  );
}
