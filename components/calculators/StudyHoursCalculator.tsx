"use client";

import { useState } from "react";
import {
  calculateStudyHours,
  isStudyHoursError,
  studyHoursErrorMessage,
} from "@/lib/calculations/studyHours";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function StudyHoursCalculator() {
  const [examDate, setExamDate] = useState("");
  const [subjectCount, setSubjectCount] = useState("3");
  const [hoursPerDay, setHoursPerDay] = useState("4");
  const [submitted, setSubmitted] = useState(false);

  const result =
    submitted && examDate !== ""
      ? calculateStudyHours({
          examDate,
          currentDate: todayIso(),
          subjectCount: parseFloat(subjectCount),
          hoursPerDay: parseFloat(hoursPerDay),
        })
      : null;

  return (
    <div className="max-w-md">
      <label className="block text-sm text-slate">
        Exam date
        <input
          type="date"
          value={examDate}
          onChange={(e) => {
            setExamDate(e.target.value);
            setSubmitted(false);
          }}
          className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
        />
      </label>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <label className="text-sm text-slate">
          Subjects
          <input
            type="number"
            min={1}
            value={subjectCount}
            onChange={(e) => {
              setSubjectCount(e.target.value);
              setSubmitted(false);
            }}
            className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
          />
        </label>
        <label className="text-sm text-slate">
          Hours/day available
          <input
            type="number"
            min={1}
            max={24}
            value={hoursPerDay}
            onChange={(e) => {
              setHoursPerDay(e.target.value);
              setSubmitted(false);
            }}
            className="mt-1 w-full min-h-[44px] rounded-card border border-borderc px-3 text-[15px]"
          />
        </label>
      </div>

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
          {isStudyHoursError(result) ? (
            <p className="text-error text-[15px]">{studyHoursErrorMessage(result)}</p>
          ) : (
            <>
              <p className="text-sm text-slate">Total available study time</p>
              <p className="text-4xl font-bold text-navy">{result.totalHours} hrs</p>
              <p className="text-sm text-slate mt-2">
                {result.daysAvailable} days left · ~{result.hoursPerSubject} hrs per subject
              </p>
            </>
          )}
        </div>
      )}

      <p className="text-xs text-slate mt-4">
        This is a simple planning estimate based on the hours you tell us you have — it isn't a
        scientifically optimized study schedule.
      </p>
    </div>
  );
}
