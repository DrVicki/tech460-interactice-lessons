import { useEffect, useState } from "react";
import {
  module5Core,
  module5Lessons,
  module5Practices,
  module5Title,
} from "./module5";
import {
  freshClock,
  parseClock,
  pauseClock,
  startClock,
  finishClock,
  clockSeconds,
  formatClock,
  type PracticeClock,
} from "./module5Clock";
export const MODULE5_KEY = "tech460-module5-workbook";
export const requiredSteps5 = [
  "overview",
  "lesson1",
  "lesson2",
  "lesson3",
  "plan",
];
export const evidenceKeys5 = ["strategy", "boundary", "correction"] as const;
export const requiredPlan5 = [
  "priority1",
  "action1",
  "check1",
  "priority2",
  "action2",
  "check2",
];
export const fieldLabels5: Record<string, string> = {
  reflection1: "Planning reflection",
  reflection2: "Efficiency reflection",
  reflection3: "Testing and recovery reflection",
  priority1: "Priority 1: gap and evidence",
  action1: "Priority 1: next activity and planned time",
  check1: "Priority 1: success criterion",
  priority2: "Priority 2: gap and evidence",
  action2: "Priority 2: next activity and planned time",
  check2: "Priority 2: success criterion",
  priority3: "Priority 3 (optional): gap and evidence",
  action3: "Priority 3 (optional): next activity and planned time",
  check3: "Priority 3 (optional): success criterion",
  strategy: "My time-management and triage strategy",
  boundary: "Boundary-test evidence",
  correction: "Debugging correction and retest",
  pulse: "Personal pulse reflection (optional)",
};
export const outcomes5 = [
  "I tested my solution",
  "I needed hints or the reference",
  "I need another attempt",
] as const;
export type PracticeRecord5 = {
  clock: PracticeClock;
  outcome: string;
  testEvidence: string;
  nextAction: string;
  reviewed: boolean;
  hintsUsed: number;
  solutionViewed: boolean;
};
export type Module5Work = {
  version: 1;
  completed: string[];
  fields: Record<string, string>;
  records: Record<string, PracticeRecord5>;
  canvasChecked: boolean;
  updatedAt: string;
};
export function emptyModule5(): Module5Work {
  return {
    version: 1,
    completed: [],
    fields: {},
    records: {},
    canvasChecked: false,
    updatedAt: "",
  };
}
export function freshRecord5(minutes: number): PracticeRecord5 {
  return {
    clock: freshClock(minutes),
    outcome: "",
    testEvidence: "",
    nextAction: "",
    reviewed: false,
    hintsUsed: 0,
    solutionViewed: false,
  };
}
export function parseModule5(raw: string | null): Module5Work {
  if (!raw) return emptyModule5();
  const value = JSON.parse(raw);
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    value.version !== 1
  )
    throw new Error("Invalid Module 5 workbook");
  const fields =
    value.fields &&
    typeof value.fields === "object" &&
    !Array.isArray(value.fields)
      ? (Object.fromEntries(
          Object.entries(value.fields).filter(
            ([k, v]) => Object.hasOwn(fieldLabels5, k) && typeof v === "string"
          )
        ) as Record<string, string>)
      : {};
  const records: Record<string, PracticeRecord5> = {};
  for (const p of module5Practices) {
    const r = value.records?.[p.id];
    if (r && typeof r === "object" && !Array.isArray(r)) {
      records[p.id] = {
        clock: parseClock(r.clock, p.minutes),
        outcome: outcomes5.includes(r.outcome) ? r.outcome : "",
        testEvidence: typeof r.testEvidence === "string" ? r.testEvidence : "",
        nextAction: typeof r.nextAction === "string" ? r.nextAction : "",
        reviewed: r.reviewed === true,
        hintsUsed: Number.isInteger(r.hintsUsed)
          ? Math.max(0, Math.min(p.hints.length, r.hintsUsed))
          : 0,
        solutionViewed: r.solutionViewed === true,
      };
    }
  }
  return {
    version: 1,
    fields,
    records,
    completed: Array.isArray(value.completed)
      ? Array.from(
          new Set(
            value.completed.filter(
              (s: unknown): s is string =>
                typeof s === "string" && requiredSteps5.includes(s)
            )
          )
        )
      : [],
    canvasChecked: value.canvasChecked === true,
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : "",
  };
}
export function recordReady5(record: PracticeRecord5 | undefined) {
  return Boolean(
    record &&
      record.clock.status === "finished" &&
      outcomes5.includes(record.outcome as (typeof outcomes5)[number]) &&
      record.testEvidence.trim() &&
      record.nextAction.trim()
  );
}
export function practiceReviewed5(work: Module5Work, id: string) {
  return Boolean(work.records[id]?.reviewed && recordReady5(work.records[id]));
}
export function lessonReady5(work: Module5Work, id: number) {
  const lesson = module5Lessons.find(l => l.id === id);
  return Boolean(
    lesson &&
      work.completed.includes(id === 1 ? "overview" : `lesson${id - 1}`) &&
      lesson.practices
        .filter(p => p.level === "core")
        .every(p => practiceReviewed5(work, p.id)) &&
      work.fields[`reflection${id}`]?.trim()
  );
}
export function planReady5(work: Module5Work) {
  return (
    [1, 2, 3].every(i => work.completed.includes(`lesson${i}`)) &&
    requiredPlan5.every(k => work.fields[k]?.trim())
  );
}
export function readyForModule5(work: Module5Work) {
  return (
    requiredSteps5.every(s => work.completed.includes(s)) &&
    module5Core.every(p => practiceReviewed5(work, p.id)) &&
    [1, 2, 3].every(i => work.fields[`reflection${i}`]?.trim()) &&
    planReady5(work) &&
    evidenceKeys5.every(k => work.fields[k]?.trim()) &&
    work.canvasChecked
  );
}
export function changeClock5(
  work: Module5Work,
  id: string,
  action: "start" | "pause" | "finish" | "reset",
  now: number
): Module5Work {
  const p = module5Practices.find(p => p.id === id);
  if (!p) return work;
  const records = { ...work.records };
  const record = records[id] || freshRecord5(p.minutes);
  if (action === "start")
    for (const [key, entry] of Object.entries(records))
      records[key] = { ...entry, clock: pauseClock(entry.clock, now) };
  const clock =
    action === "start"
      ? startClock(record.clock, now)
      : action === "pause"
        ? pauseClock(record.clock, now)
        : action === "finish"
          ? finishClock(record.clock, now)
          : {
              ...freshClock(p.minutes),
              mode: record.clock.mode,
              budgetSeconds: record.clock.budgetSeconds,
            };
  records[id] = {
    ...record,
    clock,
    reviewed: action === "reset" ? false : record.reviewed,
  };
  return { ...work, records };
}
export function useModule5Work() {
  const [initial] = useState(() => {
    try {
      return {
        work: parseModule5(localStorage.getItem(MODULE5_KEY)),
        error: "",
      };
    } catch {
      return {
        work: emptyModule5(),
        error:
          "Saved Module 5 data could not be read. Existing data has not been overwritten. Download current edits before leaving; course reset clears all course data.",
      };
    }
  });
  const [work, setWork] = useState(initial.work);
  const [error, setError] = useState(initial.error);
  useEffect(() => {
    if (initial.error) return;
    try {
      localStorage.setItem(MODULE5_KEY, JSON.stringify(work));
      setError("");
    } catch {
      setError(
        "Browser storage is unavailable. Changes are in memory only. Download your learning record before leaving."
      );
    }
  }, [work, initial.error]);
  const update = (fn: (old: Module5Work) => Module5Work) =>
    setWork(old => ({ ...fn(old), updatedAt: new Date().toISOString() }));
  const field = (name: string, text: string) =>
    update(old => ({ ...old, fields: { ...old.fields, [name]: text } }));
  const record = (id: string, fn: (r: PracticeRecord5) => PracticeRecord5) =>
    update(old => {
      const p = module5Practices.find(p => p.id === id);
      return p
        ? {
            ...old,
            records: {
              ...old.records,
              [id]: fn(old.records[id] || freshRecord5(p.minutes)),
            },
          }
        : old;
    });
  const clock = (id: string, action: "start" | "pause" | "finish" | "reset") =>
    update(old => changeClock5(old, id, action, Date.now()));
  const complete = (id: string) =>
    update(old => {
      const allowed =
        id === "overview" ||
        (id === "plan"
          ? planReady5(old)
          : lessonReady5(old, Number(id.replace("lesson", ""))));
      return allowed && requiredSteps5.includes(id)
        ? { ...old, completed: Array.from(new Set([...old.completed, id])) }
        : old;
    });
  return { work, error, update, field, record, clock, complete };
}
export function workbookText5(work: Module5Work, now = Date.now()) {
  return `# ${module5Title}\n\nCreated by Dr. Vicki Bealman\n\nPersonal companion record — not a Canvas submission, verified score, or official certificate. Time boxes are adjustable suggestions. Practice outcomes and tests below are learner-reported, not executed or graded by this site.\n\n${Object.entries(
    fieldLabels5
  )
    .map(
      ([key, label]) =>
        `## ${label}\n\n${work.fields[key]?.trim() || "(Not entered)"}`
    )
    .join("\n\n")}\n\n## Practice records\n\n${module5Practices
    .map(p => {
      const r = work.records[p.id];
      return `### ${p.title} (${p.level === "core" ? "core companion" : "optional timed extra"})\n\nReviewed: ${practiceReviewed5(work, p.id) ? "Yes" : "Not yet"}\n\n${r ? `Clock: ${r.clock.status}; ${r.clock.mode}; elapsed ${formatClock(clockSeconds(r.clock, now))}; ${r.clock.mode === "timed" ? `time box ${r.clock.budgetSeconds / 60} minutes` : "no countdown target"}. Running clock values are a snapshot at export.\n\nHints revealed: ${r.hintsUsed}; reference viewed: ${r.solutionViewed ? "yes" : "no"}.\n\nOutcome: ${r.outcome || "(Not selected)"}\n\nTest evidence: ${r.testEvidence || "(Not entered)"}\n\nNext action: ${r.nextAction || "(Not entered)"}` : "Not started."}`;
    })
    .join(
      "\n\n"
    )}\n\n## Review steps\n\n${requiredSteps5.map(s => `- [${work.completed.includes(s) ? "x" : " "}] ${s}`).join("\n")}\n\nCanvas requirements checked: ${work.canvasChecked ? "Yes (self-reported)" : "Not yet"}\n\nLast edited: ${work.updatedAt || "Not yet"}\n\nOnly the latest clock and debrief per activity are stored. Editor code is not included; save your .py files separately.\n`;
}
export function escapeHtml5(text: string) {
  return text.replace(
    /[&<>"']/g,
    c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!
  );
}
export function downloadWorkbook5(work: Module5Work) {
  const url = URL.createObjectURL(
    new Blob([workbookText5(work)], { type: "text/markdown;charset=utf-8" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "TECH460-Module5-Learning-Record.md";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function printWorkbook5(work: Module5Work) {
  const popup = window.open("", "_blank");
  if (!popup) return false;
  popup.opener = null;
  popup.document.write(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>TECH460 Module 5 Learning Record</title><style>body{font:16px/1.65 Arial,sans-serif;color:#1a365d;max-width:850px;margin:40px auto;padding:20px}h1{font-family:Georgia,serif;border-bottom:3px solid #b98528;padding-bottom:16px}pre{font:15px/1.65 Arial,sans-serif;white-space:pre-wrap;overflow-wrap:anywhere;color:#2d3748}button{padding:12px 18px}@media print{button{display:none}body{margin:0;max-width:none}@page{margin:18mm}}</style></head><body><button onclick="window.print()">Print / Save as PDF</button><h1>Module 5 · Learning Record</h1><pre>${escapeHtml5(workbookText5(work))}</pre></body></html>`
  );
  popup.document.close();
  return true;
}
