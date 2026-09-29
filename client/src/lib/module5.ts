import { module5Lesson1 } from "./module5Lesson1";
import { module5Lesson2 } from "./module5Lesson2";
import { module5Lesson3 } from "./module5Lesson3";
import type { M5Practice } from "./module5Types";
export const module5Title =
  "Module 5: Timed Readiness & Efficient Problem Solving";
export const module5Lessons = [module5Lesson1, module5Lesson2, module5Lesson3];
export const module5Practices = module5Lessons.flatMap(l => l.practices);
export const module5Core = module5Practices.filter(p => p.level === "core");
export const module5Extra = module5Practices.filter(p => p.level === "extra");
export const module5Steps = [
  { id: "overview", label: "Overview", path: "/module/5" },
  { id: "lesson1", label: "Lesson 1", path: "/module/5/lesson1" },
  { id: "lesson2", label: "Lesson 2", path: "/module/5/lesson2" },
  { id: "lesson3", label: "Lesson 3", path: "/module/5/lesson3" },
  { id: "practice", label: "Timed extras", path: "/module/5/practice" },
  { id: "plan", label: "Review plan", path: "/module/5/plan" },
  { id: "completion", label: "Completion", path: "/module/5/completion" },
];
export const module5Notice =
  "Open every official CodeSignal lesson and activity through its individual link in Canvas Module 5. These newly authored lessons, practice problems, and adjustable time boxes are companions based on the Week 5 course map—not official Canvas prompts, GCA timing rules, scores, or submissions. Check Canvas and your assigned assessment invitation for actual requirements, accommodations, permitted resources, and deadlines.";
export const module5Objectives = [
  "Translate a problem into an explicit input/output contract, examples, and a short implementation plan before coding.",
  "Choose a correct baseline, then improve repeated work only when the constraints justify the trade-off.",
  "Use flexible practice time boxes to test boundaries, recover from errors, and explain a result without treating speed as a grade.",
  "Use attempt evidence to prioritize remaining GCA review needs before the assigned assessment in Week 6.",
];
export const module5Sources = Array.from(
  new Map(module5Lessons.flatMap(l => l.sources).map(s => [s.href, s])).values()
);
export function practiceCode5(p: M5Practice, solution = false) {
  return `# TECH460 Module 5 companion: ${p.title}\n# Run in your Python environment. This is not an official submission.\n\n${solution ? p.solution : p.starter}\n\n${p.tests}\nprint('Provided assertions passed. Add your own boundary test.')\n`;
}
export function downloadCode5(p: M5Practice, solution = false) {
  const url = URL.createObjectURL(
    new Blob([practiceCode5(p, solution)], {
      type: "text/x-python;charset=utf-8",
    })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = `TECH460-${p.id}-${solution ? "reference" : "starter"}.py`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
