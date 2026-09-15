import { describe, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { module3Lessons, module3PracticeIds, starterCode } from './module3';
import { emptyModule3, parseModule3, readyForModule3, escapeHtml, workbookText } from './module3Progress';

describe('Module 3 source alignment and completion', () => {
  it('contains three lessons and ten unique practices', () => {
    expect(module3Lessons.map(l => l.practices.length)).toEqual([3, 4, 3]);
    expect(new Set(module3PracticeIds).size).toBe(10);
  });
  it('requires review, evidence, and Canvas confirmation', () => {
    const work = emptyModule3();
    expect(readyForModule3(work)).toBe(false);
    work.completed = ['overview', 'lesson1', 'lesson2', 'lesson3', 'discussion'];
    work.practices = module3PracticeIds;
    work.fields = { invariant: 'All prior pairs have been handled.', boundary: 'Empty input returns an empty list.', debugging: 'Changed len(a) to len(a)-1.' };
    expect(readyForModule3(work)).toBe(false);
    work.canvasChecked = true;
    expect(readyForModule3(work)).toBe(true);
    work.fields.boundary = '   ';
    expect(readyForModule3(work)).toBe(false);
  });
  it('normalizes persisted data and preserves learner text', () => {
    const parsed = parseModule3(JSON.stringify({ completed: ['overview', 'overview', 'fake'], practices: ['l1p1', 'fake'], fields: { brand: '<script>my draft</script>', no: 6 } }));
    expect(parsed.completed).toEqual(['overview']);
    expect(parsed.practices).toEqual(['l1p1']);
    expect(parsed.fields.brand).toBe('<script>my draft</script>');
    expect(parsed.fields.no).toBeUndefined();
    expect(workbookText(parsed)).toContain('<script>my draft</script>');
  });
  it('escapes text for print export instead of executing student input', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  });
});

describe('Python worked examples and companion contracts', () => {
  function execute(source: string) {
    const dir = mkdtempSync(join(tmpdir(), 'tech460-python-'));
    const path = join(dir, 'example.py');
    writeFileSync(path, source);
    try { return spawnSync('python3', [path], { encoding: 'utf8', timeout: 5000 }); }
    finally { rmSync(dir, { recursive: true, force: true }); }
  }
  for (const lesson of module3Lessons) {
    it(`executes Lesson ${lesson.id} worked example`, () => {
      const output = execute(lesson.worked);
      expect(output.status, output.stderr).toBe(0);
    });
    for (const p of lesson.practices) {
      it(`${p.id}: reference implementation passes every displayed assertion`, () => {
        const output = execute(`${p.imports || ''}\n${p.solution}\n${p.tests}`);
        expect(output.status, output.stderr).toBe(0);
      });
      it(`${p.id}: starter fails clearly, not with syntax or an infinite loop`, () => {
        const output = execute(starterCode(p));
        expect(output.status).toBe(1);
        expect(output.stderr).toContain('AssertionError');
      });
    }
  }
});
