import { describe, expect, it } from "vitest";
import {
  hashAnimation,
  pointerAnimation,
  HASH_SCENARIOS,
  POINTER_SCENARIOS,
} from "./module4Animation";

const count = (items: number[]) =>
  items.reduce<Record<string, number>>(
    (out, v) => ({ ...out, [v]: (out[v] || 0) + 1 }),
    {}
  );
describe("Hash animation micro-steps", () => {
  it("separates each read, lookup, and write, bracketed by start and done", () => {
    for (const scenario of HASH_SCENARIOS) {
      const frames = hashAnimation(scenario.values);
      expect(frames.map(f => f.phase)).toEqual([
        "start",
        ...scenario.values.flatMap(() => ["read", "lookup", "write"]),
        "done",
      ]);
      expect(frames[0].counts).toEqual({});
      expect(frames.at(-1)?.counts).toEqual(count(scenario.values));
    }
  });
  it("never changes stored counts during a read or lookup", () => {
    const values = [4, 1, 4, 2];
    for (const frame of hashAnimation(values)) {
      expect(frame.counts).toEqual(count(values.slice(0, frame.processed)));
      if (frame.phase === "read" || frame.phase === "lookup")
        expect(frame.processed).toBe(frame.index);
      if (frame.phase === "write")
        expect(frame.processed).toBe(frame.index + 1);
    }
  });
  it("distinguishes insertion from updating a repeated key", () => {
    const frames = hashAnimation([4, 1, 4, 2]);
    const repeated = frames.find(f => f.index === 2 && f.phase === "write")!;
    expect(repeated).toMatchObject({
      isNew: false,
      previous: 1,
      next: 2,
      counts: { 4: 2, 1: 1 },
    });
    expect(
      frames.find(f => f.index === 2 && f.phase === "lookup")?.counts
    ).toEqual({ 4: 1, 1: 1 });
  });
  it("creates independent snapshots that support stepping backward safely", () => {
    const frames = hashAnimation([3, 3, 3]);
    const saved = JSON.stringify(frames[1]);
    frames.at(-1)!.counts["3"] = 900;
    expect(JSON.stringify(frames[1])).toBe(saved);
  });
  it("shows an empty dictionary as a valid empty-input result", () => {
    expect(hashAnimation([]).map(f => f.phase)).toEqual(["start", "done"]);
    expect(hashAnimation([]).at(-1)).toMatchObject({
      counts: {},
      processed: 0,
      value: null,
    });
  });
});
describe("Two-pointer animation micro-steps", () => {
  it("compares and explains before each physical pointer move", () => {
    const frames = pointerAnimation([1, 2, 4, 6, 9], 8);
    expect(frames.map(f => f.phase)).toEqual([
      "start",
      "compare",
      "decide",
      "move",
      "compare",
      "decide",
      "move",
      "compare",
      "found",
    ]);
    for (let i = 1; i < frames.length; i++) {
      const f = frames[i],
        previous = frames[i - 1];
      if (f.phase === "decide") {
        expect(f.left).toBe(previous.left);
        expect(f.right).toBe(previous.right);
        expect(f.discarded).toEqual(previous.discarded);
      }
      if (f.phase === "move") {
        expect(previous.phase).toBe("decide");
        expect(
          Math.abs(f.left - previous.left) + Math.abs(f.right - previous.right)
        ).toBe(1);
        expect(f.sum).toBeNull();
      }
    }
  });
  it("moves only the justified boundary and does not retain the old sum", () => {
    for (const s of POINTER_SCENARIOS) {
      const frames = pointerAnimation(s.values, s.target);
      frames.forEach((f, i) => {
        if (f.phase === "move") {
          const prior = frames[i - 1];
          if (prior.sum! < s.target) {
            expect(f.left).toBe(prior.left + 1);
            expect(f.right).toBe(prior.right);
          } else {
            expect(f.right).toBe(prior.right - 1);
            expect(f.left).toBe(prior.left);
          }
          expect(f.sum).toBeNull();
        }
      });
    }
  });
  it("retains distinct indices when duplicate values match", () => {
    const frames = pointerAnimation([3, 3], 6);
    expect(frames.map(f => f.phase)).toEqual(["start", "compare", "found"]);
    expect(frames.at(-1)).toMatchObject({
      left: 0,
      right: 1,
      found: true,
      sum: 6,
    });
  });
  it("handles exhaustion, empty input, and a lone value without self pairing", () => {
    for (const values of [[], [3], [1, 2, 4]])
      expect(pointerAnimation(values, 20).at(-1)?.phase).toBe("not-found");
    expect(pointerAnimation([3], 6).at(-1)?.found).toBe(false);
  });
  it("rejects unsorted input rather than suggesting unjustified moves", () => {
    expect(() => pointerAnimation([3, 1, 2], 4)).toThrow("sorted");
  });
  it("every eliminated index is excluded by the sorted-order correctness argument", () => {
    const arrays = [
      [-4, -2, 0, 1, 6],
      [1, 1, 1, 3, 5],
      [0, 0],
      [2],
      [1, 2, 3, 4, 5, 6],
    ];
    for (const values of arrays) {
      for (let target = -8; target <= 12; target++) {
        const frames = pointerAnimation(values, target);
        const validPairs = values.flatMap((v, i) =>
          values.flatMap((w, j) => (j > i && v + w === target ? [[i, j]] : []))
        );
        for (const frame of frames) {
          for (const [i, j] of validPairs) {
            expect(frame.discarded).not.toContain(i);
            expect(frame.discarded).not.toContain(j);
          }
        }
        expect(frames.at(-1)?.found).toBe(validPairs.length > 0);
      }
    }
  });
});
