import { useEffect, useState } from 'react';
import { module4Core, module4Lessons, module4Practices, module4Title } from './module4';

export const MODULE4_KEY = 'tech460-module4-workbook';
export const requiredSteps = ['overview', 'lesson1', 'lesson2', 'lesson3', 'discussion'];
export const evidenceKeys4 = ['tradeoff', 'boundary', 'correction'] as const;
export const fieldLabels4: Record<string, string> = {
  reflection1: 'Hash-map reflection and action', reflection2: 'Two-pointer reflection and action', reflection3: 'Matrix reflection and action',
  strategy: 'Engineering trade-offs discussion draft', tradeoff: 'Before / after complexity and correctness', boundary: 'Boundary-test evidence', correction: 'Debugging correction',
  capstone: 'Optional integration challenge', pulse: 'Personal pulse reflection (not sent to the instructor)',
};
export type Module4Work = { version: 1; completed: string[]; practices: string[]; fields: Record<string, string>; canvasChecked: boolean; updatedAt: string };
export function emptyModule4(): Module4Work { return { version: 1, completed: [], practices: [], fields: {}, canvasChecked: false, updatedAt: '' }; }
export function parseModule4(raw: string | null): Module4Work {
  if (!raw) return emptyModule4();
  const value = JSON.parse(raw);
  if (!value || typeof value !== 'object' || Array.isArray(value) || value.version !== 1) throw new Error('Invalid Module 4 workbook');
  const strings = (items: unknown): string[] => Array.isArray(items) ? Array.from(new Set(items.filter((s): s is string => typeof s === 'string'))) : [];
  const fields = value.fields && typeof value.fields === 'object' && !Array.isArray(value.fields) ? Object.fromEntries(Object.entries(value.fields).filter(([k, v]) => Object.hasOwn(fieldLabels4, k) && typeof v === 'string')) as Record<string, string> : {};
  return { version: 1, completed: strings(value.completed).filter(s => requiredSteps.includes(s)), practices: strings(value.practices).filter(s => module4Practices.some(p => p.id === s)), fields, canvasChecked: value.canvasChecked === true, updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : '' };
}
export function lessonReady4(work: Module4Work, id: number) {
  const lesson = module4Lessons.find(l => l.id === id);
  return Boolean(lesson && work.completed.includes(id === 1 ? 'overview' : `lesson${id - 1}`) && lesson.practices.filter(p => p.level === 'core').every(p => work.practices.includes(p.id)) && work.fields[`reflection${id}`]?.trim());
}
export function hasEvidence4(work: Module4Work) { return evidenceKeys4.every(k => Boolean(work.fields[k]?.trim())); }
export function readyForModule4(work: Module4Work) {
  return requiredSteps.every(s => work.completed.includes(s)) && module4Core.every(p => work.practices.includes(p.id)) && [1, 2, 3].every(id => Boolean(work.fields[`reflection${id}`]?.trim())) && Boolean(work.fields.strategy?.trim()) && hasEvidence4(work) && work.canvasChecked;
}
export function useModule4Work() {
  const [initial] = useState(() => {
    try { return { work: parseModule4(localStorage.getItem(MODULE4_KEY)), error: '' }; }
    catch { return { work: emptyModule4(), error: 'The saved Module 4 workbook could not be read. Existing stored data has not been overwritten. Download current edits before leaving; use course reset only if you intend to clear your course data.' }; }
  });
  const [work, setWork] = useState(initial.work);
  const [error, setError] = useState(initial.error);
  useEffect(() => {
    if (initial.error) return;
    try { localStorage.setItem(MODULE4_KEY, JSON.stringify(work)); setError(''); }
    catch { setError('Browser storage is unavailable. These edits are only in memory. Download a learning record before leaving.'); }
  }, [work, initial.error]);
  const update = (fn: (old: Module4Work) => Module4Work) => setWork(old => ({ ...fn(old), updatedAt: new Date().toISOString() }));
  const field = (key: string, text: string) => update(old => ({ ...old, fields: { ...old.fields, [key]: text } }));
  const complete = (id: string) => update(old => {
    const allowed = id === 'overview' || (id === 'discussion' ? [1, 2, 3].every(n => old.completed.includes(`lesson${n}`)) && Boolean(old.fields.strategy?.trim()) : lessonReady4(old, Number(id.replace('lesson', ''))));
    return allowed && requiredSteps.includes(id) ? { ...old, completed: Array.from(new Set([...old.completed, id])) } : old;
  });
  const practice = (id: string, checked: boolean) => update(old => ({ ...old, practices: checked ? Array.from(new Set([...old.practices, id])) : old.practices.filter(s => s !== id) }));
  return { work, error, update, field, complete, practice };
}
export function workbookText4(work: Module4Work) {
  return `# ${module4Title}\n\nCreated by Dr. Vicki Bealman\n\nPersonal companion learning record — not a Canvas submission, verified grade, or official certificate.\n\n${Object.entries(fieldLabels4).map(([key, label]) => `## ${label}\n\n${work.fields[key]?.trim() || '(Not entered)'}`).join('\n\n')}\n\n## Practice review\n\n${module4Lessons.flatMap(l => l.practices.map(p => `- [${work.practices.includes(p.id) ? 'x' : ' '}] Lesson ${l.id} · ${p.title} (${p.level === 'core' ? 'core companion' : 'optional extra'})`)).join('\n')}\n\n## Review steps\n\n${requiredSteps.map(s => `- [${work.completed.includes(s) ? 'x' : ' '}] ${s}`).join('\n')}\n\nCanvas requirements checked: ${work.canvasChecked ? 'Yes (self-reported)' : 'Not yet'}\n\nLast edited: ${work.updatedAt || 'No edits yet'}\n\nCode in the external editor is not included. Keep your own .py files separately.\n`;
}
export function downloadWorkbook4(work: Module4Work) {
  const url = URL.createObjectURL(new Blob([workbookText4(work)], { type: 'text/markdown;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'TECH460-Module4-Learning-Record.md'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function escapeHtml4(text: string) { return text.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)); }
export function printWorkbook4(work: Module4Work) {
  const popup = window.open('', '_blank'); if (!popup) return false;
  popup.opener = null;
  popup.document.write(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>TECH460 Module 4 Learning Record</title><style>body{font:16px/1.65 Arial,sans-serif;color:#1a365d;max-width:850px;margin:40px auto;padding:20px}h1{font-family:Georgia,serif;border-bottom:3px solid #b98528;padding-bottom:16px}pre{font:15px/1.65 Arial,sans-serif;white-space:pre-wrap;overflow-wrap:anywhere;color:#2d3748}button{padding:12px 18px}@media print{button{display:none}body{margin:0;max-width:none}@page{margin:18mm}}</style></head><body><button onclick="window.print()">Print / Save as PDF</button><h1>Module 4 · Learning Record</h1><pre>${escapeHtml4(workbookText4(work))}</pre></body></html>`);
  popup.document.close(); return true;
}
