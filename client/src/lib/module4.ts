import { module4Lesson1 } from './module4Lesson1';
import { module4Lesson2 } from './module4Lesson2';
import { module4Lesson3 } from './module4Lesson3';
import type { M4Practice } from './module4Types';

export const module4Title = 'Module 4: Optimization & Multidimensional Problems';
export const module4Notice = 'Open every official CodeSignal lesson and activity through its individual link in Canvas Module 4. This guide does not launch, submit, or verify official assessments. The lessons, practice titles, and discussion scaffold here are newly authored companions based on the Week 4 course map; consult Canvas for the actual prompts, points, deadlines, and submission requirements.';
export const module4Lessons = [module4Lesson1, module4Lesson2, module4Lesson3];
export const module4Practices = module4Lessons.flatMap(l => l.practices);
export const module4Core = module4Practices.filter(p => p.level === 'core');
export const module4Extra = module4Practices.filter(p => p.level === 'extra');
export const module4Sources = Array.from(new Map(module4Lessons.flatMap(l => l.sources).map(s => [s.href, s])).values());
export const module4Steps = [
  { id: 'overview', path: '/module/4', label: 'Overview' },
  ...module4Lessons.map(l => ({ id: `lesson${l.id}`, path: `/module/4/lesson${l.id}`, label: `Lesson ${l.id}` })),
  { id: 'practice', path: '/module/4/practice', label: 'Extra practice' },
  { id: 'discussion', path: '/module/4/discussion', label: 'Discussion' },
  { id: 'completion', path: '/module/4/completion', label: 'Completion' },
];
export const module4Objectives = [
  'Replace repeated searches with a dictionary or set, and explain the time–space trade-off.',
  'Apply two-pointer traversal only when the input contract justifies each pointer move.',
  'Traverse and transform rectangular matrices without confusing row and column bounds.',
  'Defend an implementation using a correctness argument, boundary tests, and an honest complexity comparison.',
];
export function practiceCode(p: M4Practice, solution = false) {
  return `# TECH460 Module 4 — companion practice, not an official assessment\n# ${p.title}\n# ${p.contract}\n\n${solution ? p.solution : p.starter}\n\n# Self-check assertions; starters intentionally require implementation.\n${p.tests}\nprint("All provided checks passed. Add a test of your own.")\n`;
}
export function downloadPractice(p: M4Practice, solution = false) {
  const url = URL.createObjectURL(new Blob([practiceCode(p, solution)], { type: 'text/x-python;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = `${p.id}-${solution ? 'reference' : 'starter'}.py`; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
