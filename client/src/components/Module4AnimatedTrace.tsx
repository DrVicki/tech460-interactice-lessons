import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  hashAnimation,
  pointerAnimation,
  HASH_SCENARIOS,
  POINTER_SCENARIOS,
  type HashFrame,
  type PointerFrame,
} from "@/lib/module4Animation";
import "./module4-animation.css";

const hashCode = [
  "counts = {}",
  "for index, value in enumerate(values):",
  "    previous = counts.get(value, 0)",
  "    counts[value] = previous + 1",
  "return counts",
];
const pointerCode = [
  "left, right = 0, len(values) - 1",
  "while left < right:",
  "    total = values[left] + values[right]",
  "    if total == target: return (left, right)",
  "    if total < target:",
  "        left += 1",
  "    else:",
  "        right -= 1",
  "return None",
];
function useMotionPreference() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const changed = () => setReduced(query.matches);
    query.addEventListener("change", changed);
    return () => query.removeEventListener("change", changed);
  }, []);
  return reduced;
}
function CodeTrace({ lines, active }: { lines: string[]; active: number }) {
  return (
    <details className="m4a-code-panel">
      <summary>
        Follow the Python logic <span>highlight = current operation</span>
      </summary>
      <div className="m4a-code-scroll">
        <ol aria-label="Python logic; highlighted line is the current operation">
          {lines.map((line, i) => (
            <li
              key={line}
              aria-current={i + 1 === active ? "step" : undefined}
              data-active={i + 1 === active}
            >
              <span aria-hidden="true">{i + 1 === active ? "›" : i + 1}</span>
              <code>{line}</code>
              {i + 1 === active && (
                <span className="sr-only">Current operation</span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <small>
        Function body shown for tracing; this visual does not execute your
        editor code.
      </small>
    </details>
  );
}
function HashVisual({
  frame,
  values,
  duration,
}: {
  frame: HashFrame;
  values: number[];
  duration: number;
}) {
  const stage =
    frame.phase === "lookup"
      ? 1
      : frame.phase === "write" || frame.phase === "done"
        ? 2
        : 0;
  const keyOrder = Array.from(new Set(values)).filter(key =>
    Object.hasOwn(frame.counts, String(key))
  );
  return (
    <>
      <div className="m4a-board-label">
        <strong>Input array</strong>
        <span>
          {frame.processed} / {values.length} items counted
        </span>
      </div>
      {values.length ? (
        <div
          className="m4a-input"
          style={{
            gridTemplateColumns: `repeat(${values.length}, minmax(0, 1fr))`,
          }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="m4a-cell"
              data-active={index === frame.index}
              data-processed={index < frame.processed}
              initial={false}
              animate={{
                opacity:
                  index < frame.processed && index !== frame.index ? 0.72 : 1,
              }}
              transition={{ duration }}
              aria-label={`Index ${index}, value ${value}${index === frame.index ? ", current input" : ""}${index < frame.processed ? ", counted" : ""}`}
            >
              <small>index {index}</small>
              <strong>{value}</strong>
              <span>
                {index === frame.index
                  ? "Current item"
                  : index < frame.processed
                    ? "Counted"
                    : "Waiting"}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="m4a-empty">values = [] · no items to read</div>
      )}
      <div className="m4a-flow" aria-label="Read, look up, write sequence">
        <div className="m4a-flow-labels">
          {["Read input", "Look up key", "Write count"].map((label, i) => (
            <span
              key={label}
              data-active={
                stage === i && frame.phase !== "start" && frame.phase !== "done"
              }
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <div className="m4a-flow-track" aria-hidden="true">
          <motion.div
            className="m4a-flow-token"
            initial={false}
            animate={{ x: `${stage * 100}%` }}
            transition={{ duration, ease: [0.23, 1, 0.32, 1] }}
          >
            <span>
              {frame.value === null
                ? frame.phase === "done"
                  ? "Done"
                  : "Ready"
                : `value ${frame.value}`}
            </span>
          </motion.div>
        </div>
      </div>
      <div className="m4a-hash-work">
        <div className="m4a-lookup">
          <span className="m4a-label">
            {frame.phase === "write"
              ? "Write operation"
              : frame.phase === "lookup"
                ? "Lookup result"
                : frame.phase === "done"
                  ? "Final result"
                  : "Next action"}
          </span>
          <strong>
            {frame.value === null
              ? frame.phase === "done"
                ? "Return counts"
                : "Read the first item"
              : frame.phase === "read"
                ? `value = ${frame.value}`
                : frame.phase === "lookup"
                  ? `get(${frame.value}, 0) → ${frame.previous}`
                  : `${frame.previous} + 1 → ${frame.next}`}
          </strong>
          <p>
            {frame.phase === "lookup"
              ? frame.isNew
                ? "Missing key: use the default zero. No row is inserted yet."
                : "Existing key: read its current count. The value is not duplicated as a new key."
              : frame.phase === "write"
                ? frame.isNew
                  ? "Insert a new key and its first count."
                  : "Update this row; keep the same key."
                : frame.phase === "done"
                  ? "Each count describes occurrences, not indices."
                  : "The stored dictionary changes only at the write step."}
          </p>
        </div>
        <div className="m4a-dictionary">
          <div className="m4a-board-label">
            <strong>Stored dictionary</strong>
            <span>
              {keyOrder.length} {keyOrder.length === 1 ? "key" : "keys"}
            </span>
          </div>
          <table>
            <caption className="sr-only">
              Dictionary entries after the current operation
            </caption>
            <thead>
              <tr>
                <th>Key</th>
                <th>Count</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {keyOrder.map(key => {
                const active = key === frame.value;
                const writing = active && frame.phase === "write";
                return (
                  <motion.tr
                    key={key}
                    data-active={active}
                    initial={duration ? { opacity: 0, x: -8 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration }}
                  >
                    <th scope="row">{key}</th>
                    <td>
                      <motion.span
                        key={`${key}-${frame.counts[key]}`}
                        initial={duration ? { opacity: 0, y: 7 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration }}
                        className="m4a-count"
                      >
                        {frame.counts[key]}
                      </motion.span>
                    </td>
                    <td>
                      {writing ? (
                        <span className="m4a-change">
                          {frame.isNew
                            ? "Inserted"
                            : `${frame.previous} → ${frame.next}`}
                        </span>
                      ) : active && frame.phase === "lookup" ? (
                        "Read count"
                      ) : (
                        "Stored"
                      )}
                    </td>
                  </motion.tr>
                );
              })}
              {!keyOrder.length && (
                <tr>
                  <td colSpan={3} className="m4a-empty-row">
                    Empty dictionary {"{}"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <p className="m4a-caption">
            Logical key–count entries, not physical hash buckets. Rows follow
            first appearance.
          </p>
        </div>
      </div>
    </>
  );
}
function PointerVisual({
  frame,
  values,
  target,
  duration,
}: {
  frame: PointerFrame;
  values: number[];
  target: number;
  duration: number;
}) {
  const stage = frame.phase === "decide" ? 1 : frame.phase === "move" ? 2 : 0;
  return (
    <>
      <div className="m4a-board-label">
        <strong>Sorted input array</strong>
        <span>
          Target <b>{target}</b>
        </span>
      </div>
      <div
        className="m4a-pointer-array"
        role="group"
        aria-label="Two-pointer candidate array"
      >
        <motion.div
          className="m4a-pointer m4a-left"
          data-testid="left-pointer"
          initial={false}
          animate={{ x: `${frame.left * 100}%` }}
          transition={{ duration, ease: [0.23, 1, 0.32, 1] }}
          style={{ width: `${100 / values.length}%` }}
        >
          <span>
            L = {frame.left}
            <i aria-hidden="true">↓</i>
          </span>
        </motion.div>
        <div
          className="m4a-pointer-cells"
          style={{
            gridTemplateColumns: `repeat(${values.length}, minmax(0,1fr))`,
          }}
        >
          {values.map((value, index) => {
            const out = frame.discarded.includes(index);
            return (
              <motion.div
                key={index}
                className="m4a-cell"
                data-active={
                  !out && (index === frame.left || index === frame.right)
                }
                data-found={
                  frame.found && (index === frame.left || index === frame.right)
                }
                data-out={out}
                initial={false}
                animate={{ opacity: out ? 0.72 : 1, scale: out ? 0.95 : 1 }}
                transition={{ duration }}
                aria-label={`Index ${index}, value ${value}, ${out ? "ruled out" : index === frame.left && index === frame.right ? "pointers meet here" : index === frame.left ? "left pointer" : index === frame.right ? "right pointer" : "candidate"}`}
              >
                <small>index {index}</small>
                <strong>{value}</strong>
                <span>
                  {out
                    ? "Out"
                    : frame.found &&
                        (index === frame.left || index === frame.right)
                      ? "Match"
                      : "In range"}
                </span>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          className="m4a-pointer m4a-right"
          data-testid="right-pointer"
          initial={false}
          animate={{ x: `${frame.right * 100}%` }}
          transition={{ duration, ease: [0.23, 1, 0.32, 1] }}
          style={{ width: `${100 / values.length}%` }}
        >
          <span>
            <i aria-hidden="true">↑</i>R = {frame.right}
          </span>
        </motion.div>
      </div>
      <div className="m4a-phase-strip">
        {["Compare", "Decide", "Move"].map((label, i) => (
          <span
            key={label}
            data-active={
              stage === i && ["compare", "decide", "move"].includes(frame.phase)
            }
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>
      <div className="m4a-comparison" data-found={frame.found}>
        <span className="m4a-label">
          {frame.phase === "found"
            ? "Pair found"
            : frame.phase === "not-found"
              ? "Search finished"
              : frame.phase === "move"
                ? "Pointer update"
                : frame.phase === "start"
                  ? "Initial state"
                  : "Current comparison"}
        </span>
        <strong>
          {frame.sum !== null
            ? `${values[frame.left]} + ${values[frame.right]} = ${frame.sum}`
            : frame.phase === "not-found"
              ? "Return None"
              : frame.phase === "move"
                ? `${frame.move === "left" ? "L" : "R"} moved to index ${frame.move === "left" ? frame.left : frame.right}`
                : `L = ${frame.left}, R = ${frame.right}`}
        </strong>
        <p>
          {frame.sum !== null
            ? `${frame.sum} ${frame.sum === target ? "=" : frame.sum < target ? "<" : ">"} ${target}${frame.phase === "compare" ? " · Predict the next action." : frame.phase === "found" ? " · Return this distinct-index pair." : ` · Move ${frame.move} next.`}`
            : frame.phase === "not-found"
              ? "left < right is false. Never reuse one index as both members of a pair."
              : "A pointer moves only after sorted order justifies eliminating that boundary."}
        </p>
      </div>
      <p className="m4a-caption">
        L and R move on separate rails so both remain visible when they meet.
        Dimmed “Out” cells have been eliminated; equal values at different
        indices are still distinct candidates.
      </p>
    </>
  );
}
export default function Module4AnimatedTrace({
  kind,
  standalone = false,
}: {
  kind: "hash" | "pointers";
  standalone?: boolean;
}) {
  const [scenario, setScenario] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [delay, setDelay] = useState(1800);
  const [instant, setInstant] = useState(false);
  const reduced = useMotionPreference();
  const root = useRef<HTMLElement>(null);
  const id = useId();
  const hash = HASH_SCENARIOS[scenario] || HASH_SCENARIOS[0];
  const pointer = POINTER_SCENARIOS[scenario] || POINTER_SCENARIOS[0];
  const frames = useMemo(
    () =>
      kind === "hash"
        ? hashAnimation(hash.values)
        : pointerAnimation(pointer.values, pointer.target),
    [kind, hash, pointer]
  );
  const currentStep = Math.min(step, frames.length - 1),
    frame = frames[currentStep];
  const terminal = currentStep === frames.length - 1;
  const duration = reduced || instant ? 0 : 0.28;
  useEffect(() => {
    if (!playing) return;
    if (terminal) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setInstant(false);
      setStep(s => Math.min(s + 1, frames.length - 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [playing, currentStep, delay, terminal, frames.length]);
  useEffect(() => {
    const visibility = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting) setPlaying(false);
      },
      { threshold: 0 }
    );
    if (root.current) observer.observe(root.current);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);
  const moveTo = (next: number, keyboard = false) => {
    setPlaying(false);
    setInstant(keyboard);
    setStep(Math.max(0, Math.min(next, frames.length - 1)));
  };
  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    setInstant(false);
    if (terminal) setStep(0);
    setPlaying(true);
  };
  const changeScenario = (next: number, e: MouseEvent) => {
    setPlaying(false);
    setInstant(e.detail === 0);
    setScenario(next);
    setStep(0);
  };
  const phaseLabels =
    kind === "hash"
      ? ["Read", "Look up", "Write"]
      : ["Compare", "Decide", "Move"];
  return (
    <section
      ref={root}
      className="m4a-lab"
      data-kind={kind}
      data-phase={frame.phase}
      data-step={currentStep}
      data-playing={playing}
      data-motion={duration === 0 ? "instant" : "animated"}
      aria-label="Interactive algorithm trace"
      aria-describedby={`${id}-help`}
      tabIndex={0}
      onKeyDown={e => {
        if (e.target !== e.currentTarget) return;
        if (["ArrowRight", "ArrowLeft", "Home", "End", " "].includes(e.key)) {
          e.preventDefault();
          if (e.key === " ") togglePlay();
          else
            moveTo(
              e.key === "Home"
                ? 0
                : e.key === "End"
                  ? frames.length - 1
                  : currentStep + (e.key === "ArrowRight" ? 1 : -1),
              true
            );
        }
      }}
    >
      <div className="m4a-top">
        <span className="m4a-eyebrow">
          ANIMATED LAB / {phaseLabels.join(" → ").toUpperCase()}
        </span>
        {!standalone && (
          <Link
            href={`/labs/${kind === "hash" ? "hash-maps" : "two-pointers"}`}
            target="_blank"
            rel="noreferrer"
            className="m4a-open"
          >
            Standalone lab
            <ExternalLink size={14} />
          </Link>
        )}
      </div>
      <h2>
        {kind === "hash"
          ? "Watch the dictionary build."
          : "See why each pointer moves."}
      </h2>
      <p className="m4a-intro">
        {kind === "hash"
          ? "A lookup and a write are different operations. Follow one input value through both, and watch repeated values update an existing key."
          : "Slow the search down: compare the boundary values, justify the elimination, then move exactly one pointer. Sorted order makes each move safe."}
      </p>
      <div className="m4a-scenarios" role="group" aria-label="Trace scenarios">
        {(kind === "hash" ? HASH_SCENARIOS : POINTER_SCENARIOS).map((s, i) => (
          <Button
            key={s.label}
            size="sm"
            variant="outline"
            aria-pressed={scenario === i}
            onClick={e => changeScenario(i, e)}
          >
            {s.label}
          </Button>
        ))}
      </div>
      <div className="m4a-controls">
        <div className="m4a-buttons">
          <Button
            className="m4a-play"
            onClick={togglePlay}
            aria-pressed={playing}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}{" "}
            {playing ? "Pause" : terminal ? "Replay trace" : "Play trace"}
          </Button>
          <Button
            variant="outline"
            disabled={currentStep === 0}
            onClick={e => moveTo(currentStep - 1, e.detail === 0)}
          >
            <ArrowLeft size={16} />
            Previous step
          </Button>
          <Button
            variant="outline"
            disabled={terminal}
            onClick={e => moveTo(currentStep + 1, e.detail === 0)}
          >
            Next step
            <ArrowRight size={16} />
          </Button>
          <Button variant="outline" onClick={e => moveTo(0, e.detail === 0)}>
            <RotateCcw size={16} />
            Reset trace
          </Button>
        </div>
        <label htmlFor={`${id}-speed`} className="m4a-speed">
          Playback pace
          <select
            id={`${id}-speed`}
            aria-label="Playback pace"
            value={delay}
            onChange={e => setDelay(Number(e.target.value))}
          >
            <option value={3000}>Slow · 3 sec/step</option>
            <option value={1800}>Standard · 1.8 sec/step</option>
            <option value={900}>Quick · 0.9 sec/step</option>
          </select>
        </label>
      </div>
      <div className="m4a-workspace">
        <div className="m4a-visual">
          {kind === "hash" ? (
            <HashVisual
              key={scenario}
              frame={frame as HashFrame}
              values={hash.values}
              duration={duration}
            />
          ) : (
            <PointerVisual
              key={scenario}
              frame={frame as PointerFrame}
              values={pointer.values}
              target={pointer.target}
              duration={duration}
            />
          )}
        </div>
        <CodeTrace
          lines={kind === "hash" ? hashCode : pointerCode}
          active={frame.line}
        />
      </div>
      <div
        className="m4a-explanation"
        aria-live={playing ? "off" : "polite"}
        aria-atomic="true"
      >
        <div className="m4a-step-label">
          <span>
            Step {currentStep + 1} / {frames.length}
          </span>
          <span>
            {terminal ? (
              <>
                <CheckCircle2 size={14} />
                Finished
              </>
            ) : frame.phase === "start" ? (
              "Ready"
            ) : (
              frame.phase.replace("-", " ")
            )}
          </span>
        </div>
        <h3>{frame.title}</h3>
        <p>{frame.text}</p>
      </div>

      <label className="m4a-timeline" htmlFor={`${id}-timeline`}>
        <span>
          Explore any step{" "}
          <b>
            {currentStep + 1} / {frames.length}
          </b>
        </span>
        <input
          id={`${id}-timeline`}
          type="range"
          min="0"
          max={frames.length - 1}
          value={currentStep}
          onChange={e => moveTo(Number(e.target.value), true)}
          aria-valuetext={`Step ${currentStep + 1} of ${frames.length}: ${frame.title}`}
        />
      </label>
      <p className="m4a-help" id={`${id}-help`}>
        {reduced
          ? "Reduced motion is enabled: every state remains visible, with instant transitions. Play advances the states only when you choose it."
          : "Nothing plays automatically. Use Next step to predict and inspect; Play advances until the final result."}{" "}
        Focus the lab and use ← / → to step or Space to play/pause. Playback
        pauses when the tab is hidden or the lab leaves view.
      </p>
    </section>
  );
}
