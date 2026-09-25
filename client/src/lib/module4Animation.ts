import { frequencyTrace, pointerTrace } from "./module4Trace";

export type HashPhase = "start" | "read" | "lookup" | "write" | "done";
export type HashFrame = {
  phase: HashPhase;
  index: number;
  value: number | null;
  counts: Record<string, number>;
  previous: number;
  next: number;
  isNew: boolean;
  processed: number;
  line: number;
  title: string;
  text: string;
};
export function hashAnimation(values: number[]): HashFrame[] {
  const states = frequencyTrace(values);
  const frames: HashFrame[] = [
    {
      phase: "start",
      index: -1,
      value: null,
      counts: {},
      previous: 0,
      next: 0,
      isNew: false,
      processed: 0,
      line: 1,
      title: "Start with an empty dictionary",
      text: "No items have been counted. Step through reading a value, looking up its old count, and writing the new count as separate operations.",
    },
  ];
  values.forEach((value, index) => {
    const before = states[index].counts;
    const previous = before[value] || 0;
    const shared = {
      index,
      value,
      counts: { ...before },
      previous,
      next: previous + 1,
      isNew: !Object.hasOwn(before, String(value)),
      processed: index,
    };
    frames.push({
      ...shared,
      phase: "read",
      line: 2,
      title: `Read values[${index}] = ${value}`,
      text: `Move the input cursor to index ${index}. The dictionary still summarizes only the ${index} earlier item${index === 1 ? "" : "s"}; reading does not change a count.`,
    });
    frames.push({
      ...shared,
      counts: { ...before },
      phase: "lookup",
      line: 3,
      title: shared.isNew
        ? `Key ${value} is not present`
        : `Key ${value} already exists`,
      text: shared.isNew
        ? `counts.get(${value}, 0) returns the default 0. Prepare to insert a new key; nothing has been stored yet.`
        : `counts.get(${value}, 0) returns ${previous}. This is a repeat occurrence, so update the existing key rather than creating another row.`,
    });
    frames.push({
      ...shared,
      counts: { ...states[index + 1].counts },
      processed: index + 1,
      phase: "write",
      line: 4,
      title: shared.isNew
        ? `Insert ${value} → 1`
        : `Update ${value}: ${previous} → ${previous + 1}`,
      text: `Store counts[${value}] = ${previous} + 1. The dictionary now counts exactly the first ${index + 1} input items. ${shared.isNew ? "A new key was added." : "The key count increased; the number of distinct keys did not."}`,
    });
  });
  const last = states[states.length - 1];
  frames.push({
    phase: "done",
    index: -1,
    value: null,
    counts: { ...last.counts },
    previous: 0,
    next: 0,
    isNew: false,
    processed: values.length,
    line: 5,
    title: "All input items have been counted",
    text: `Return the frequency dictionary. ${values.length} item${values.length === 1 ? "" : "s"} produced ${Object.keys(last.counts).length} distinct key${Object.keys(last.counts).length === 1 ? "" : "s"}. Count totals equal the input length.`,
  });
  return frames;
}
export type PointerPhase =
  | "start"
  | "compare"
  | "decide"
  | "move"
  | "found"
  | "not-found";
export type PointerFrame = {
  phase: PointerPhase;
  left: number;
  right: number;
  sum: number | null;
  move: "left" | "right" | null;
  discarded: number[];
  line: number;
  title: string;
  text: string;
  found: boolean;
  iteration: number;
};
export function pointerAnimation(
  values: number[],
  target: number
): PointerFrame[] {
  const states = pointerTrace(values, target); // Also validates sortedness.
  const eliminated = (left: number, right: number) =>
    values.map((_, i) => i).filter(i => i < left || i > right);
  const frames: PointerFrame[] = [
    {
      phase: "start",
      left: 0,
      right: values.length - 1,
      sum: null,
      move: null,
      discarded: [],
      line: 1,
      title: "Place pointers at the two ends",
      text: "The input is already sorted in nondecreasing order. Left and right must identify different indices. No candidates have been eliminated.",
      found: false,
      iteration: 0,
    },
  ];
  states.forEach((state, i) => {
    const shared = {
      left: state.left,
      right: state.right,
      sum: state.sum,
      move: null,
      discarded: eliminated(state.left, state.right),
      found: false,
      iteration: i + 1,
    };
    if (state.sum === null) {
      frames.push({
        ...shared,
        phase: "not-found",
        line: 9,
        title: "No distinct-index pair remains",
        text: "The pointers have met or crossed. The loop condition left < right is false; one remaining cell cannot pair with itself. Return None.",
      });
      return;
    }
    frames.push({
      ...shared,
      phase: "compare",
      line: 3,
      title: `Compare ${values[state.left]} + ${values[state.right]} with ${target}`,
      text: `The two current values sum to ${state.sum}. Compare the sum with the target before deciding which boundary, if any, can be eliminated.`,
    });
    if (state.found) {
      frames.push({
        ...shared,
        phase: "found",
        line: 4,
        found: true,
        title: `Found distinct indices (${state.left}, ${state.right})`,
        text: `${values[state.left]} + ${values[state.right]} = ${target}. Return this pair and stop: the contract asks for one pair, not all possible pairs. Equal values are allowed when their indices differ.`,
      });
      return;
    }
    const move = state.sum < target ? "left" : "right";
    frames.push({
      ...shared,
      phase: "decide",
      move,
      line: move === "left" ? 5 : 7,
      title:
        move === "left"
          ? "Too small: rule out the left boundary"
          : "Too large: rule out the right boundary",
      text: state.text + " The pointers have not moved yet.",
    });
    const next = states[i + 1];
    frames.push({
      ...shared,
      phase: "move",
      left: next.left,
      right: next.right,
      sum: null,
      move,
      discarded: eliminated(next.left, next.right),
      line: move === "left" ? 6 : 8,
      title:
        move === "left"
          ? `Move left: ${state.left} → ${next.left}`
          : `Move right: ${state.right} → ${next.right}`,
      text: `${move === "left" ? "Left advances one position" : "Right retreats one position"}. The dimmed, “Out” positions have been ruled out by sorted order, not by guessing. ${next.left < next.right ? "Now compare the new boundary values." : "The pointers now meet or cross; no distinct pair remains to test."}`,
    });
  });
  return frames;
}
export const HASH_SCENARIOS = [
  { label: "Repeated values", values: [4, 1, 4, 2] },
  { label: "All identical", values: [3, 3, 3] },
  { label: "Empty input", values: [] as number[] },
];
export const POINTER_SCENARIOS = [
  { label: "Pair found", values: [1, 2, 4, 6, 9], target: 8 },
  { label: "No pair", values: [1, 2, 4], target: 10 },
  { label: "Duplicates", values: [3, 3], target: 6 },
];
