import { describe, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { module4Lessons, module4Practices, module4Core, module4Extra, practiceCode, module4Notice } from './module4';
import { emptyModule4, parseModule4, readyForModule4, lessonReady4, escapeHtml4, workbookText4, requiredSteps } from './module4Progress';
import { frequencyTrace, pointerTrace, matrixTrace, operationModel } from './module4Trace';

function execute(source: string) {
  const dir = mkdtempSync(join(tmpdir(), 'tech460-m4-'));
  const path = join(dir, 'example.py'); writeFileSync(path, source);
  try { return spawnSync('python3', [path], { encoding: 'utf8', timeout: 10000 }); }
  finally { rmSync(dir, { recursive: true, force: true }); }
}
function fullWork() {
  const work = emptyModule4();
  work.completed = [...requiredSteps]; work.practices = module4Core.map(p => p.id);
  work.fields = { reflection1: 'A hash lookup replaces a scan.', reflection2: 'Sortedness justifies elimination.', reflection3: 'Rows and columns use different bounds.', strategy: 'Choose by contract.', tradeoff: 'Average O(n), O(n) storage.', boundary: 'Empty input returns None.', correction: 'Check before insert.' };
  work.canvasChecked = true; return work;
}
describe('Module 4 content and readiness', () => {
  it('has three lessons, six core and nine optional practices with unique IDs', () => {
    expect(module4Lessons).toHaveLength(3); expect(module4Core).toHaveLength(6); expect(module4Extra).toHaveLength(9); expect(new Set(module4Practices.map(p => p.id)).size).toBe(15);
    for (const l of module4Lessons) { expect(l.practices).toHaveLength(5); expect(l.checks).toHaveLength(2); expect(l.concepts).toHaveLength(4); expect(l.sources.length).toBeGreaterThan(1); }
  });
  it('keeps official work in Canvas and labels activities as companions', () => { expect(module4Notice).toContain('individual link in Canvas Module 4'); expect(module4Notice).toContain('newly authored companions'); });
  it('does not require optional extras for completion', () => { expect(readyForModule4(fullWork())).toBe(true); });
  it('requires each core review, all reflections, evidence, discussion and Canvas confirmation', () => {
    expect(readyForModule4(emptyModule4())).toBe(false);
    for (const key of ['reflection1', 'reflection2', 'reflection3', 'strategy', 'tradeoff', 'boundary', 'correction']) { const w = fullWork(); w.fields[key] = ' '; expect(readyForModule4(w)).toBe(false); }
    for (const p of module4Core) { const w = fullWork(); w.practices = w.practices.filter(id => id !== p.id); expect(readyForModule4(w)).toBe(false); }
    for (const s of requiredSteps) { const w = fullWork(); w.completed = w.completed.filter(id => id !== s); expect(readyForModule4(w)).toBe(false); }
    const w = fullWork(); w.canvasChecked = false; expect(readyForModule4(w)).toBe(false);
  });
  it('requires a prior review before each lesson and rejects invalid lessons', () => {
    const w = fullWork(); expect(lessonReady4(w, 1)).toBe(true); w.completed = []; expect(lessonReady4(w, 1)).toBe(false); expect(lessonReady4(w, 2)).toBe(false); expect(lessonReady4(w, 99)).toBe(false);
  });
  it('normalizes untrusted persisted values without losing legitimate learner text', () => {
    const parsed = parseModule4(JSON.stringify({ version: 1, completed: ['overview', 'overview', 'fake'], practices: ['m4-l1-p1', 'fake', 'm4-l1-p1'], fields: { strategy: '<script>draft</script>', unwanted: 'ignore', reflection1: 7 }, canvasChecked: 'true' }));
    expect(parsed.completed).toEqual(['overview']); expect(parsed.practices).toEqual(['m4-l1-p1']); expect(parsed.fields).toEqual({ strategy: '<script>draft</script>' }); expect(parsed.canvasChecked).toBe(false);
  });
  it('rejects malformed storage and unknown versions, while handling first visits', () => {
    expect(parseModule4(null)).toEqual(emptyModule4()); for (const raw of ['{', 'null', '[]', '{"version":2}', '"x"']) expect(() => parseModule4(raw)).toThrow();
  });
  it('exports all evidence and labels optional work without rendering HTML', () => {
    const w = fullWork(); w.fields.strategy = '<script>alert("x")</script>'; const text = workbookText4(w);
    expect(text).toContain('optional extra'); expect(text).toContain('Before / after complexity'); expect(text).toContain('not a Canvas submission'); expect(text).toContain('Code in the external editor is not included');
    expect(escapeHtml4(w.fields.strategy)).toBe('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  });
});
describe('Module 4 interactive traces', () => {
  it('counts the processed prefix without mutating previous frames', () => { const frames = frequencyTrace([4, 1, 4, 2]); expect(frames[0].counts).toEqual({}); expect(frames[1].counts).toEqual({4:1}); expect(frames.at(-1)?.counts).toEqual({4:2,1:1,2:1}); });
  it('traces pair success, exhaustion, duplicates, and empty input', () => {
    expect(pointerTrace([1,2,4,6,9],8).at(-1)).toMatchObject({ left:1,right:3,found:true });
    expect(pointerTrace([1,2,4],10).at(-1)?.sum).toBeNull(); expect(pointerTrace([3,3],6).at(-1)?.found).toBe(true); expect(pointerTrace([],1).at(-1)?.found).toBe(false); expect(() => pointerTrace([2,1],3)).toThrow();
  });
  it('transposes non-square input without mutating input or previous frames', () => { const input = [[3,1,4],[1,5,9]]; const f = matrixTrace(input); expect(f).toHaveLength(7); expect(f[0].output).toEqual([[null,null],[null,null],[null,null]]); expect(f.at(-1)?.output).toEqual([[3,1],[1,5],[4,9]]); expect(input).toEqual([[3,1,4],[1,5,9]]); expect(() => matrixTrace([[1],[2,3]])).toThrow(); });
  it('models candidate counts rather than claiming measured speed', () => { expect(operationModel(2)).toEqual({candidates:1,lookupSteps:2}); expect(operationModel(20)).toEqual({candidates:190,lookupSteps:20}); });
});
describe('Module 4 executable Python contracts', () => {
  for (const lesson of module4Lessons) {
    it(`Lesson ${lesson.id}: worked assertions pass`, () => { const output = execute(lesson.worked); expect(output.status, output.stderr).toBe(0); });
    for (const p of lesson.practices) {
      it(`${p.id}: solution passes displayed assertions`, () => { const output = execute(practiceCode(p, true)); expect(output.status, output.stderr).toBe(0); });
      it(`${p.id}: starter fails intentionally and clearly`, () => { const output = execute(practiceCode(p)); expect(output.status).toBe(1); expect(output.stderr).toContain('NotImplementedError'); expect(output.stderr).not.toContain('SyntaxError'); });
    }
  }
  it('hash pair contracts validate invalid tails before early success', () => {
    const source = module4Core[1].solution + '\n' + module4Extra.find(p => p.id === 'm4-l1-p5')!.solution + `
for function in (two_sum_indices, has_two_sum_distinct):
    try:
        function([3, 3, None], 6)
        raise AssertionError('missed invalid tail')
    except TypeError:
        pass
`;
    const o = execute(source); expect(o.status, o.stderr).toBe(0);
  });
  it('hash and sorted pointer results agree with exhaustive pair existence on small arrays', () => {
    const source = module4Core.find(p => p.id === 'm4-l1-p2')!.solution + '\n' + module4Core.find(p => p.id === 'm4-l2-p1')!.solution + `
from itertools import product
for size in range(5):
    for items in product(range(-2, 3), repeat=size):
        values = list(items)
        for target in range(-4, 5):
            pairs = [(i, j) for j in range(len(values)) for i in range(j) if values[i] + values[j] == target]
            expected = pairs[0] if pairs else None
            assert two_sum_indices(values, target) == expected
            ordered = sorted(values)
            found = pair_sum_sorted(ordered, target)
            assert (found is not None) == bool(pairs)
            if found is not None:
                i, j = found
                assert i < j and ordered[i] + ordered[j] == target
`;
    const o = execute(source); expect(o.status, o.stderr).toBe(0);
  });
  it('transpose is reversible for rectangles and allocates independent result rows', () => {
    const source = module4Core.find(p => p.id === 'm4-l3-p2')!.solution + `
for rows in range(1, 5):
    for cols in range(1, 6):
        grid = [[r * cols + c for c in range(cols)] for r in range(rows)]
        result = transpose_rectangular(grid)
        assert transpose_rectangular(result) == grid
        result[0][0] = -999
        assert grid[0][0] == 0
        if cols > 1:
            assert result[1][0] == 1
`;
    const o = execute(source); expect(o.status, o.stderr).toBe(0);
  });
});
