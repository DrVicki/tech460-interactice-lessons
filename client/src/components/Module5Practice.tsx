import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock3,
  Play,
  Pause,
  CheckCircle2,
  RotateCcw,
  Download,
  Code2,
} from "lucide-react";
import { toast } from "sonner";
import CodeEditor from "./CodeEditor";
import type { M5Practice } from "@/lib/module5Types";
import { practiceCode5, downloadCode5 } from "@/lib/module5";
import { clockView, formatClock } from "@/lib/module5Clock";
import {
  useModule5Work,
  freshRecord5,
  recordReady5,
  outcomes5,
  practiceReviewed5,
} from "@/lib/module5Progress";
export type WorkApi5 = ReturnType<typeof useModule5Work>;
export default function Module5Practice({
  practice: p,
  api,
}: {
  practice: M5Practice;
  api: WorkApi5;
}) {
  const r = api.work.records[p.id] || freshRecord5(p.minutes);
  const [now, setNow] = useState(Date.now());
  const [editorOpen, setEditorOpen] = useState(false);
  const [showClock, setShowClock] = useState(true);
  const [resetConfirm, setResetConfirm] = useState(false);
  useEffect(() => {
    setNow(Date.now());
    if (r.clock.status !== "running") return;
    const tick = window.setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(tick);
  }, [r.clock.status, r.clock.startedAt, p.id]);
  const view = clockView(r.clock, now);
  const reviewed = practiceReviewed5(api.work, p.id);
  const clockAction = (action: "start" | "pause" | "finish" | "reset") => {
    setNow(Date.now());
    api.clock(p.id, action);
  };
  return (
    <article className="m3-practice m5-practice" data-practice={p.id}>
      <span className="m3-chip">
        {p.level === "core" ? "CORE COMPANION" : "OPTIONAL TIMED EXTRA"} /{" "}
        {p.focus.toUpperCase()}
      </span>
      <h3>{p.title}</h3>
      <p>{p.contract}</p>
      <pre className="m3-code">
        <code>{p.examples}</code>
      </pre>
      <div className="m5-pacing" aria-label="Suggested practice pacing">
        {Object.entries(p.pacing).map(([label, minutes]) => (
          <div key={label}>
            <strong>{minutes} min</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="m3-muted">
        Suggested {p.minutes}-minute practice only—not an official GCA limit.
        Adjust it, pause, or choose untimed mode. If you change the total,
        redistribute the planning/build/check/debrief stages yourself.
      </p>
      <section
        className="m5-clock"
        aria-label="Practice timer"
        data-status={r.clock.status}
        data-expired={view.expired}
      >
        <div className="m5-clock-main">
          <div>
            <span className="m5-clock-label">
              <Clock3 size={15} />
              {r.clock.mode === "untimed"
                ? "Elapsed · no target"
                : view.expired
                  ? "Time-box reached"
                  : "Time remaining"}
            </span>
            <strong
              className="m5-clock-digits"
              role="timer"
              aria-live="off"
              aria-label={
                showClock
                  ? r.clock.mode === "timed"
                    ? `Time remaining ${formatClock(view.remaining)}`
                    : `Elapsed ${formatClock(view.elapsed)}`
                  : "Clock display hidden"
              }
            >
              {showClock
                ? formatClock(
                    r.clock.mode === "timed" ? view.remaining : view.elapsed
                  )
                : "— — : — —"}
            </strong>
            <span className="m5-clock-status">
              {r.clock.status}{" "}
              {r.clock.mode === "timed" && showClock
                ? `· elapsed ${formatClock(view.elapsed)}`
                : ""}
            </span>
          </div>
          <div className="m5-clock-buttons">
            <Button
              disabled={
                r.clock.status === "running" || r.clock.status === "finished"
              }
              onClick={() => clockAction("start")}
            >
              <Play size={15} />
              {r.clock.status === "paused"
                ? "Resume practice"
                : "Start practice"}
            </Button>
            <Button
              variant="outline"
              disabled={r.clock.status !== "running"}
              onClick={() => clockAction("pause")}
            >
              <Pause size={15} />
              Pause
            </Button>
            <Button
              variant="outline"
              disabled={
                r.clock.status === "idle" || r.clock.status === "finished"
              }
              onClick={() => clockAction("finish")}
            >
              <CheckCircle2 size={15} />
              Finish attempt
            </Button>
            <Button variant="outline" onClick={() => setResetConfirm(true)}>
              <RotateCcw size={15} />
              Reset clock
            </Button>
          </div>
        </div>
        <div className="m5-clock-settings">
          <label htmlFor={`${p.id}-mode`}>
            Practice mode
            <select
              id={`${p.id}-mode`}
              aria-label="Practice mode"
              disabled={r.clock.status !== "idle"}
              value={r.clock.mode}
              onChange={e =>
                api.record(p.id, old => ({
                  ...old,
                  clock: {
                    ...old.clock,
                    mode: e.target.value === "untimed" ? "untimed" : "timed",
                  },
                }))
              }
            >
              <option value="timed">Flexible countdown</option>
              <option value="untimed">Untimed · no target</option>
            </select>
          </label>
          {r.clock.mode === "timed" && (
            <label htmlFor={`${p.id}-budget`}>
              Time box
              <select
                id={`${p.id}-budget`}
                aria-label="Time box"
                disabled={r.clock.status !== "idle"}
                value={r.clock.budgetSeconds / 60}
                onChange={e =>
                  api.record(p.id, old => ({
                    ...old,
                    clock: {
                      ...old.clock,
                      budgetSeconds: Number(e.target.value) * 60,
                    },
                  }))
                }
              >
                {Array.from(
                  new Set([
                    1,
                    5,
                    8,
                    10,
                    12,
                    15,
                    20,
                    30,
                    45,
                    60,
                    90,
                    120,
                    p.minutes,
                  ])
                )
                  .sort((a, b) => a - b)
                  .map(m => (
                    <option value={m} key={m}>
                      {m} minutes{m === p.minutes ? " · suggested" : ""}
                    </option>
                  ))}
              </select>
            </label>
          )}
          <button
            type="button"
            className="m5-hide-clock"
            onClick={() => setShowClock(!showClock)}
          >
            {showClock ? "Hide clock display" : "Show clock display"}
          </button>
        </div>
        <div role="status" className="m5-timer-message">
          {r.clock.status === "finished"
            ? "Attempt finished. Record a debrief below; finishing a clock does not verify your code."
            : view.expired
              ? "Your practice time-box has ended. Nothing is submitted or locked. Continue if useful, or finish and record what to improve."
              : r.clock.status === "paused"
                ? "Paused. Take the time you need; this is practice, not a proctored assessment."
                : "The clock continues while hidden or after a reload until you pause or finish. Starting another practice pauses this one."}
        </div>
        {resetConfirm && (
          <div
            className="m5-reset-confirm"
            role="group"
            aria-label="Confirm clock reset"
          >
            <p>
              Reset this activity’s latest clock and review marker? Debrief text
              and hint history are kept. Export first if you want to retain the
              old timing.
            </p>
            <Button variant="outline" onClick={() => setResetConfirm(false)}>
              Keep clock
            </Button>
            <Button
              onClick={() => {
                clockAction("reset");
                setResetConfirm(false);
              }}
            >
              Confirm reset
            </Button>
          </div>
        )}
      </section>
      <div className="m3-rule-grid">
        <article>
          <h4>Plan before coding</h4>
          <p>{p.plan}</p>
        </article>
        <article>
          <h4>Boundary to investigate</h4>
          <p>{p.boundary}</p>
        </article>
      </div>
      <div className="m4-hints">
        <Button
          variant="outline"
          disabled={r.hintsUsed >= p.hints.length}
          onClick={() =>
            api.record(p.id, old => ({
              ...old,
              hintsUsed: Math.min(old.hintsUsed + 1, p.hints.length),
            }))
          }
        >
          {r.hintsUsed === 0
            ? "Show first hint"
            : r.hintsUsed < p.hints.length
              ? "Show next hint"
              : "All hints revealed"}
        </Button>
        {p.hints.slice(0, r.hintsUsed).map((h, i) => (
          <p key={i}>
            <strong>Hint {i + 1}.</strong> {h}
          </p>
        ))}
      </div>
      <p className="m3-muted">
        Run code and assertions in your Python environment. Starters may
        intentionally fail or contain a labeled bug. The external editor is
        supplemental, not an official submission; edits inside it are not saved
        by this guide. Copy your code before switching activities.
      </p>
      {editorOpen ? (
        <CodeEditor
          key={p.id}
          title={p.title}
          description="Timed companion workspace — not auto-graded"
          initialCode={practiceCode5(p)}
          stdin=""
          height="500px"
        />
      ) : (
        <Button className="m3-primary" onClick={() => setEditorOpen(true)}>
          <Code2 size={16} />
          Open Python practice editor
        </Button>
      )}
      <details>
        <summary>Starter code and self-check assertions</summary>
        <pre className="m3-code">
          <code>{practiceCode5(p)}</code>
        </pre>
        <Button variant="outline" onClick={() => downloadCode5(p)}>
          <Download size={16} />
          Download starter .py
        </Button>
      </details>
      <details
        className="m4-solution"
        onToggle={e => {
          if (e.currentTarget.open && !r.solutionViewed)
            api.record(p.id, old => ({ ...old, solutionViewed: true }));
        }}
      >
        <summary>Compare with the explained reference solution</summary>
        <p>
          Try first, then use the explanation to diagnose a gap. Viewing help is
          recorded for reflection, not penalized or scored.
        </p>
        <pre className="m3-code">
          <code>{p.solution}</code>
        </pre>
        <h4>Why this works</h4>
        <p>{p.explanation}</p>
        <h4>Time and space</h4>
        <p>{p.complexity}</p>
        <Button variant="outline" onClick={() => downloadCode5(p, true)}>
          <Download size={16} />
          Download reference .py
        </Button>
      </details>
      <section className="m5-debrief">
        <span className="m3-eyebrow">DEBRIEF / MORE THAN A STOPWATCH</span>
        <h3>Keep the evidence, not just the time.</h3>
        <p>{p.debrief}</p>
        <label htmlFor={`${p.id}-outcome`}>
          Attempt outcome
          <select
            id={`${p.id}-outcome`}
            aria-label="Attempt outcome"
            value={r.outcome}
            onChange={e =>
              api.record(p.id, old => ({ ...old, outcome: e.target.value }))
            }
          >
            <option value="">Choose a self-report…</option>
            {outcomes5.map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label htmlFor={`${p.id}-test`}>Exact test evidence</label>
        <Textarea
          id={`${p.id}-test`}
          value={r.testEvidence}
          rows={3}
          placeholder="Input, expected output, actual output, and what it revealed…"
          onChange={e =>
            api.record(p.id, old => ({ ...old, testEvidence: e.target.value }))
          }
        />
        <label htmlFor={`${p.id}-next`}>Next improvement</label>
        <Textarea
          id={`${p.id}-next`}
          value={r.nextAction}
          rows={3}
          placeholder="Name one change to your planning, implementation, or tests…"
          onChange={e =>
            api.record(p.id, old => ({ ...old, nextAction: e.target.value }))
          }
        />
        <p className="m3-muted">
          Finish the attempt, choose an outcome, and add both debrief entries.
          No minimum speed or successful-code claim is required.{" "}
          {p.level === "extra"
            ? "This extra is optional and never blocks module completion."
            : ""}{" "}
          Only the latest clock and debrief per activity are saved.
        </p>
        <Button
          className="m3-primary"
          disabled={reviewed || !recordReady5(r)}
          onClick={() => {
            api.record(p.id, old => ({ ...old, reviewed: true }));
            toast.success("Companion practice review saved");
          }}
        >
          {reviewed ? "Practice reviewed" : "Record practice review"}
        </Button>
        <span className="m3-save" role="status">
          {api.error
            ? "Not saved — download a backup."
            : "Saved in this browser; keep one course tab open to avoid conflicting edits."}
        </span>
      </section>
    </article>
  );
}
