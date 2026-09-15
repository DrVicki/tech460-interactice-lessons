import { useEffect, useState } from 'react';
import { module3PracticeIds, module3Lessons, module3Title } from './module3';

export const MODULE3_KEY = 'tech460-module3-workbook';
export type Module3Work = { completed: string[]; practices: string[]; fields: Record<string, string>; canvasChecked: boolean; updatedAt: string };
export const evidenceKeys = ['invariant', 'boundary', 'debugging'] as const;
export const evidenceLabels: Record<string, string> = { invariant: 'Loop invariant', boundary: 'Boundary test', debugging: 'Debugging correction', brand: 'Personal brand discussion draft', reflection1: 'Lesson 1 reflection', reflection2: 'Lesson 2 reflection', reflection3: 'Lesson 3 reflection', pulse: 'Personal pulse reflection' };
export function emptyModule3(): Module3Work { return { completed: [], practices: [], fields: {}, canvasChecked: false, updatedAt: '' }; }
export function parseModule3(raw: string | null): Module3Work {
  if (!raw) return emptyModule3();
  const value = JSON.parse(raw);
  if (!value || typeof value !== 'object') throw new Error('Invalid workbook');
  const strings = (items: unknown): string[] => Array.isArray(items) ? Array.from(new Set(items.filter((x): x is string => typeof x === 'string'))) : [];
  const fields = Object.fromEntries(Object.entries(value.fields || {}).filter(([, v]) => typeof v === 'string')) as Record<string, string>;
  return { completed: strings(value.completed).filter(s => ['overview', 'lesson1', 'lesson2', 'lesson3', 'discussion'].includes(s)), practices: strings(value.practices).filter(s => module3PracticeIds.includes(s)), fields, canvasChecked: value.canvasChecked === true, updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : '' };
}
export function hasEvidence(work: Module3Work) { return evidenceKeys.every(key => Boolean(work.fields[key]?.trim())); }
export function readyForModule3(work: Module3Work) {
  return ['overview', 'lesson1', 'lesson2', 'lesson3', 'discussion'].every(s => work.completed.includes(s)) && module3PracticeIds.every(id => work.practices.includes(id)) && hasEvidence(work) && work.canvasChecked;
}
export function useModule3Work() {
  const [initial] = useState(() => {
    try { return { work: parseModule3(localStorage.getItem(MODULE3_KEY)), error: '' }; }
    catch { return { work: emptyModule3(), error: 'Saved workbook could not be read. New edits will remain in memory until storage is available; download a backup.' }; }
  });
  const [work, setWork] = useState(initial.work);
  const [error, setError] = useState(initial.error);
  useEffect(() => {
    if (initial.error) return;
    try { localStorage.setItem(MODULE3_KEY, JSON.stringify(work)); setError(''); }
    catch { setError('Browser storage is unavailable. Your current edits are not saved across reloads. Download a backup before leaving.'); }
  }, [work, initial.error]);
  const update = (fn: (old: Module3Work) => Module3Work) => setWork(old => ({ ...fn(old), updatedAt: new Date().toISOString() }));
  const field = (key: string, text: string) => update(old => ({ ...old, fields: { ...old.fields, [key]: text } }));
  const complete = (id: string) => update(old => ({ ...old, completed: Array.from(new Set([...old.completed, id])) }));
  const practice = (id: string, checked: boolean) => update(old => ({ ...old, practices: checked ? Array.from(new Set([...old.practices, id])) : old.practices.filter(x => x !== id) }));
  return { work, error, field, complete, practice, update };
}
export function workbookText(work: Module3Work) {
  return `# ${module3Title}\n\nCreated by Dr. Vicki Bealman\n\nPersonal learning record — not a Canvas submission or verified grade.\n\n${Object.entries(evidenceLabels).map(([key, label]) => `## ${label}\n\n${work.fields[key]?.trim() || '(Not entered)'}`).join('\n\n')}\n\n## Practice review checklist\n\n${module3Lessons.flatMap(l => l.practices.map(p => `${work.practices.includes(p.id) ? '[x]' : '[ ]'} Lesson ${l.id}: ${p.title}`)).join('\n\n')}\n\nCanvas work checked: ${work.canvasChecked ? 'Yes (self-reported)' : 'Not yet'}\n\nLast edited: ${work.updatedAt || 'No edits yet'}`;
}
export function downloadWorkbook(work: Module3Work) {
  const url = URL.createObjectURL(new Blob([workbookText(work)], { type: 'text/markdown;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'TECH460-Module3-Learning-Record.md'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function escapeHtml(text: string) { return text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!)); }
export function printWorkbook(work: Module3Work) {
  const popup = window.open('', '_blank');
  if (!popup) return false;
  popup.opener = null;
  popup.document.write(`<!doctype html><html lang="en"><head><title>TECH460 Module 3 Learning Record</title><style>body{font:16px/1.6 Arial,sans-serif;color:#1a365d;max-width:850px;margin:40px auto;padding:20px}h1{font-family:Georgia,serif;border-bottom:3px solid #b98528;padding-bottom:16px}pre{font:15px/1.6 Arial,sans-serif;white-space:pre-wrap;overflow-wrap:anywhere;color:#2d3748}button{padding:10px 16px}@media print{button{display:none}body{margin:0;max-width:none}@page{margin:18mm}}</style></head><body><button onclick="window.print()">Print / Save as PDF</button><h1>Module 3 · Learning Record</h1><pre>${escapeHtml(workbookText(work))}</pre></body></html>`);
  popup.document.close();
  return true;
}
