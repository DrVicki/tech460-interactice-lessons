import { describe, it, expect } from "vitest";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  module5Lessons,
  module5Core,
  module5Extra,
  module5Practices,
  practiceCode5,
  module5Notice,
} from "./module5";
import {
  freshClock,
  startClock,
  pauseClock,
  finishClock,
  elapsedMs,
  clockView,
  parseClock,
  formatClock,
} from "./module5Clock";
import {
  emptyModule5,
  freshRecord5,
  parseModule5,
  practiceReviewed5,
  lessonReady5,
  planReady5,
  readyForModule5,
  recordReady5,
  requiredSteps5,
  requiredPlan5,
  evidenceKeys5,
  changeClock5,
  workbookText5,
  escapeHtml5,
} from "./module5Progress";
function runPython(code: string) {
  const dir = mkdtempSync(join(tmpdir(), "m5-python-"));
  const file = join(dir, "check.py");
  writeFileSync(file, code);
  try {
    return spawnSync("python3", [file], { encoding: "utf8", timeout: 10000 });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
function fullWork() {
  const w = emptyModule5();
  w.completed = [...requiredSteps5];
  w.canvasChecked = true;
  for (const k of [
    ...requiredPlan5,
    ...evidenceKeys5,
    "reflection1",
    "reflection2",
    "reflection3",
  ])
    w.fields[k] = "Specific test evidence and next action.";
  for (const p of module5Core) {
    w.records[p.id] = {
      ...freshRecord5(p.minutes),
      clock: {
        ...freshClock(p.minutes),
        mode: "untimed",
        status: "finished",
        elapsedMs: 1000,
      },
      outcome: "I need another attempt",
      testEvidence: "Input [-1] expected -1; observed 0.",
      nextAction: "Initialize from the first valid candidate.",
      reviewed: true,
    };
  }
  return w;
}
describe("Module 5 scope and source consistency", () => {
  it("has three lessons, six core practices, six extras and unique IDs", () => {
    expect(module5Lessons).toHaveLength(3);
    expect(module5Core).toHaveLength(6);
    expect(module5Extra).toHaveLength(6);
    expect(new Set(module5Practices.map(p => p.id)).size).toBe(12);
  });
  it("includes explained checks and pacing that sums to each suggested time box", () => {
    for (const l of module5Lessons) {
      expect(l.checks).toHaveLength(2);
      expect(l.sources.length).toBeGreaterThanOrEqual(2);
      expect(l.practices).toHaveLength(4);
      for (const p of l.practices) {
        expect(Object.values(p.pacing).reduce((a, b) => a + b, 0)).toBe(
          p.minutes
        );
        expect(p.hints).toHaveLength(2);
        expect(p.explanation.length).toBeGreaterThan(100);
      }
    }
  });
  it("labels companion timing and preserves Canvas-only activity access", () => {
    expect(module5Notice).toContain("individual link in Canvas Module 5");
    expect(module5Notice).toContain("not official Canvas prompts");
    expect(JSON.stringify(module5Lessons)).not.toMatch(/codesignal\.com/i);
  });
});
describe("Practice clock transitions", () => {
  it("starts idle and counts from an epoch rather than timer ticks", () => {
    const c = startClock(freshClock(10), 1000);
    expect(elapsedMs(c, 41000)).toBe(40000);
    expect(clockView(c, 41000)).toMatchObject({
      elapsed: 40,
      remaining: 560,
      expired: false,
    });
  });
  it("pauses, resumes, and excludes paused time", () => {
    let c = startClock(freshClock(), 1000);
    c = pauseClock(c, 11000);
    expect(elapsedMs(c, 99999)).toBe(10000);
    c = startClock(c, 100000);
    expect(elapsedMs(c, 105000)).toBe(15000);
  });
  it("finishes without submitting, grading, or permitting accidental restart", () => {
    const c = finishClock(startClock(freshClock(), 1000), 13000);
    expect(c.status).toBe("finished");
    expect(elapsedMs(c, 99999)).toBe(12000);
    expect(startClock(c, 100000)).toEqual(c);
    expect(finishClock(freshClock(), 100)).toEqual(freshClock());
  });
  it("handles expiry softly and retains elapsed time beyond the target", () => {
    const c = startClock(freshClock(1), 1000);
    expect(clockView(c, 91000)).toMatchObject({
      elapsed: 90,
      remaining: 0,
      overtime: 30,
      expired: true,
    });
    expect(c.status).toBe("running");
  });
  it("untimed mode never expires and still captures optional elapsed time", () => {
    const c = startClock({ ...freshClock(1), mode: "untimed" }, 0);
    expect(clockView(c, 120000)).toMatchObject({
      expired: false,
      elapsed: 120,
    });
  });
  it("preserves a running clock after JSON reload and avoids negative time", () => {
    const c = startClock(freshClock(), 5000);
    const restored = parseClock(JSON.parse(JSON.stringify(c)), 10);
    expect(elapsedMs(restored, 65000)).toBe(60000);
    expect(elapsedMs(restored, 3000)).toBe(0);
  });
  it("normalizes malformed clock settings without accepting NaN or invalid states", () => {
    expect(
      parseClock(
        {
          mode: "other",
          budgetSeconds: 0,
          status: "running",
          elapsedMs: -1,
          startedAt: null,
        },
        12
      )
    ).toMatchObject({
      mode: "timed",
      budgetSeconds: 720,
      status: "paused",
      elapsedMs: 0,
      startedAt: null,
    });
    expect(
      parseClock({ status: "finished", elapsedMs: Infinity }, 10).elapsedMs
    ).toBe(0);
    expect(formatClock(125)).toBe("02:05");
  });
  it("starting another exercise pauses the first at its actual elapsed time", () => {
    let w = emptyModule5();
    const [a, b] = module5Core;
    w = changeClock5(w, a.id, "start", 1000);
    w = changeClock5(w, b.id, "start", 6000);
    expect(w.records[a.id].clock).toMatchObject({
      status: "paused",
      elapsedMs: 5000,
      startedAt: null,
    });
    expect(w.records[b.id].clock).toMatchObject({
      status: "running",
      startedAt: 6000,
    });
  });
  it("resetting a clock preserves notes but clears the review marker", () => {
    const w = fullWork();
    const id = module5Core[0].id;
    const next = changeClock5(w, id, "reset", 1000);
    expect(next.records[id].testEvidence).toBe(w.records[id].testEvidence);
    expect(next.records[id].clock.status).toBe("idle");
    expect(practiceReviewed5(next, id)).toBe(false);
  });
});
describe("Module 5 records and readiness", () => {
  it("requires a finished attempt and an evidence debrief, not a successful or fast outcome", () => {
    const w = fullWork();
    expect(readyForModule5(w)).toBe(true);
    expect(w.records[module5Core[0].id].outcome).toBe("I need another attempt");
    expect(module5Extra.every(p => !w.records[p.id])).toBe(true);
  });
  it("cannot review a clock without a self-report and both debrief fields", () => {
    const r = freshRecord5(10);
    expect(recordReady5(r)).toBe(false);
    r.clock.status = "finished";
    r.outcome = "I tested my solution";
    r.testEvidence = "Input [] returned [].";
    expect(recordReady5(r)).toBe(false);
    r.nextAction = "Test a duplicate next.";
    expect(recordReady5(r)).toBe(true);
  });
  it("requires all core debriefs, lesson reflections, first two priorities, evidence, and Canvas check", () => {
    for (const p of module5Core) {
      const w = fullWork();
      delete w.records[p.id];
      expect(readyForModule5(w)).toBe(false);
    }
    for (const k of [
      ...requiredPlan5,
      ...evidenceKeys5,
      "reflection1",
      "reflection2",
      "reflection3",
    ]) {
      const w = fullWork();
      w.fields[k] = " ";
      expect(readyForModule5(w)).toBe(false);
    }
    for (const step of requiredSteps5) {
      const w = fullWork();
      w.completed = w.completed.filter(s => s !== step);
      expect(readyForModule5(w)).toBe(false);
    }
    const w = fullWork();
    w.canvasChecked = false;
    expect(readyForModule5(w)).toBe(false);
  });
  it("keeps the third priority and all timed extras optional", () => {
    expect(readyForModule5(fullWork())).toBe(true);
  });
  it("enforces prior lesson reviews and rejects nonexistent lessons", () => {
    const w = fullWork();
    expect(lessonReady5(w, 2)).toBe(true);
    w.completed = [];
    expect(lessonReady5(w, 1)).toBe(false);
    expect(lessonReady5(w, 99)).toBe(false);
    expect(planReady5(w)).toBe(false);
  });
  it("parses valid learner text and rejects unknown keys and malformed data", () => {
    const w = fullWork();
    w.fields.priority1 = "<script>draft</script>";
    const raw = JSON.stringify({
      ...w,
      fields: { ...w.fields, fake: "ignore" },
      completed: [...w.completed, "fake", "overview"],
      records: { ...w.records, unknown: {} },
    });
    const restored = parseModule5(raw);
    expect(restored.fields.priority1).toBe("<script>draft</script>");
    expect(restored.fields.fake).toBeUndefined();
    expect(restored.records.unknown).toBeUndefined();
    expect(restored.completed).toEqual(requiredSteps5);
    expect(() => parseModule5("{")).toThrow();
    expect(() => parseModule5('{"version":2}')).toThrow();
    expect(parseModule5(null)).toEqual(emptyModule5());
  });
  it("exports evidence and timing honestly and escapes print content", () => {
    const w = fullWork();
    w.fields.priority1 = '<script>alert("x")</script>';
    const text = workbookText5(w, 1000);
    expect(text).toContain("not a Canvas submission");
    expect(text).toContain("untimed");
    expect(text).toContain("I need another attempt");
    expect(text).toContain("optional timed extra");
    expect(text).toContain("Editor code is not included");
    expect(escapeHtml5(w.fields.priority1)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"
    );
  });
});
describe("Module 5 Python examples and contracts", () => {
  for (const lesson of module5Lessons) {
    it(`Lesson ${lesson.id}: entire displayed worked block executes`, () => {
      const out = runPython(lesson.worked);
      expect(out.status, out.stderr).toBe(0);
    });
    for (const p of lesson.practices) {
      it(`${p.id}: solution passes every displayed assertion`, () => {
        const out = runPython(practiceCode5(p, true));
        expect(out.status, out.stderr).toBe(0);
      });
      it(`${p.id}: starter exposes an intentional failure without a syntax error or hang`, () => {
        const out = runPython(practiceCode5(p));
        expect(out.status).not.toBe(0);
        expect(out.signal).toBeNull();
        expect(out.stderr).not.toContain("SyntaxError");
      });
    }
  }
  it("strict alphabet validation catches illegal characters after an unmatched close", () => {
    const p = module5Practices.find(p => p.id === "m5-l3-p4")!;
    const out = runPython(
      p.solution +
        `\nfor text in [')x', ')( ', ')[]']:\n    try:\n        balanced_parentheses(text)\n        raise AssertionError('missed invalid suffix')\n    except ValueError:\n        pass\n`
    );
    expect(out.status, out.stderr).toBe(0);
  });
  it("window sums and range queries agree with brute force across small negative/positive arrays", () => {
    const solution =
      module5Practices.find(p => p.id === "m5-l3-p1")!.solution +
      "\n" +
      module5Practices.find(p => p.id === "m5-l2-p2")!.solution;
    const out = runPython(
      solution +
        `\nfrom itertools import product\nfor n in range(1, 5):\n    for items in product(range(-2, 3), repeat=n):\n        values = list(items)\n        for k in range(1, n + 1):\n            assert max_fixed_window_sum(values, k) == max(sum(values[i:i+k]) for i in range(n-k+1))\n        queries = [(i, j) for i in range(n) for j in range(i, n)]\n        assert inclusive_range_sums(values, queries) == [sum(values[i:j+1]) for i, j in queries]\n        assert values == list(items)\n`
    );
    expect(out.status, out.stderr).toBe(0);
  });
  it("two-sum validates invalid tails before early success", () => {
    const p = module5Practices.find(p => p.id === "m5-l3-p3")!;
    const out = runPython(
      p.solution +
        `\ntry:\n    two_sum_distinct([2, 7, None], 9)\n    raise AssertionError('missed invalid tail')\nexcept TypeError:\n    pass\n`
    );
    expect(out.status, out.stderr).toBe(0);
  });
});
