import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  LockKeyhole,
  Plus,
  Timer,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Module5Practice, { type WorkApi5 } from "@/components/Module5Practice";
import { useModuleProgress } from "@/contexts/ModuleProgressContext";
import {
  module5Lessons,
  module5Steps,
  module5Notice,
  module5Objectives,
  module5Core,
  module5Extra,
  module5Sources,
  module5Practices,
} from "@/lib/module5";
import {
  useModule5Work,
  lessonReady5,
  planReady5,
  readyForModule5,
  practiceReviewed5,
  requiredSteps5,
  evidenceKeys5,
  downloadWorkbook5,
  printWorkbook5,
} from "@/lib/module5Progress";
import { clockSeconds, formatClock } from "@/lib/module5Clock";
import type { M5Lesson } from "@/lib/module5Types";
import "./module3.css";
import "./module4.css";
import "./module5.css";
function Field5({
  api,
  name,
  title,
  prompt,
}: {
  api: WorkApi5;
  name: string;
  title: string;
  prompt: string;
}) {
  return (
    <div className="m3-field">
      <label htmlFor={`m5-${name}`}>{title}</label>
      <p id={`m5-${name}-help`}>{prompt}</p>
      <Textarea
        id={`m5-${name}`}
        aria-describedby={`m5-${name}-help`}
        value={api.work.fields[name] || ""}
        onChange={e => api.field(name, e.target.value)}
        rows={4}
        placeholder="Use specific evidence and an actionable next step…"
      />
      <span className="m3-save" role="status">
        {api.error
          ? "Not saved — download a backup before leaving."
          : "Saved in this browser as you type."}
      </span>
    </div>
  );
}
function Exports5({ api }: { api: WorkApi5 }) {
  return (
    <div className="m3-actions">
      <Button variant="outline" onClick={() => downloadWorkbook5(api.work)}>
        <Download size={16} />
        Download learning record
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          if (!printWorkbook5(api.work))
            toast.error("Allow pop-ups to open the print view.");
        }}
      >
        <FileText size={16} />
        Print / Save as PDF
      </Button>
    </div>
  );
}
function Lesson5({ lesson: l, api }: { lesson: M5Lesson; api: WorkApi5 }) {
  const [selected, setSelected] = useState(0);
  const practices = l.practices.filter(p => p.level === "core");
  const reviewed = api.work.completed.includes(`lesson${l.id}`);
  return (
    <>
      <section className="m3-paper">
        <span className="m3-eyebrow">01 / LEARN THE DECISION</span>
        <h2>{l.short}</h2>
        <div className="m4-objectives">
          {l.objectives.map((o, i) => (
            <p key={o}>
              <strong>0{i + 1}</strong>
              {o}
            </p>
          ))}
        </div>
        <div className="m3-concepts">
          {l.concepts.map(c => (
            <article key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="m3-paper">
        <span className="m3-eyebrow">02 / WORK THROUGH AN EXAMPLE</span>
        <h2>Make the reasoning visible before adding pressure.</h2>
        <pre className="m3-code">
          <code>{l.worked}</code>
        </pre>
        <ol className="m4-walkthrough">
          {l.walkthrough.map((w, i) => (
            <li key={w.title}>
              <span>{i + 1}</span>
              <div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="m3-invariant">
          <strong>Correctness anchor</strong>
          <p>{l.invariant}</p>
        </div>
        <div className="m4-complexity">
          <h3>Time and space</h3>
          <p>{l.complexity}</p>
        </div>
      </section>
      <section className="m3-paper">
        <span className="m3-eyebrow">03 / PREDICT, THEN EXPLAIN</span>
        <h2>Catch the failure before it costs another attempt.</h2>
        <div className="m4-pitfalls">
          {l.pitfalls.map(p => (
            <article key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
        <p>
          These knowledge checks are ungraded rehearsal. Predict the result and
          explain why before revealing the reasoning.
        </p>
        {l.checks.map((c, i) => (
          <details className="m4-predict" key={c.question}>
            <summary>
              Check {i + 1}: {c.question}
            </summary>
            <p>{c.answer}</p>
          </details>
        ))}
      </section>
      <section className="m3-paper">
        <span className="m3-eyebrow">04 / FLEXIBLE TIMED PRACTICE</span>
        <h2>Two core companions. One repeatable routine.</h2>
        <p>
          Plan → build → check → debrief. Start a flexible time box or use
          untimed mode, run tests in your Python environment, and preserve
          evidence. An unfinished solution is useful practice when you diagnose
          what to change.
        </p>
        <div
          className="m3-practice-tabs"
          role="group"
          aria-label="Core practice selection"
        >
          {practices.map((p, i) => (
            <Button
              key={p.id}
              variant={selected === i ? "default" : "outline"}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              {practiceReviewed5(api.work, p.id) && <CheckCircle2 size={14} />}
              Core practice {i + 1}
            </Button>
          ))}
        </div>
        <Module5Practice
          key={practices[selected].id}
          practice={practices[selected]}
          api={api}
        />
        <div className="m4-extra-banner">
          <Timer size={22} />
          <div>
            <strong>Want another timed repetition?</strong>
            <p>
              Two optional extras extend this lesson. Prioritize the pattern
              your debrief identifies, not merely the shortest exercise.
            </p>
            <Link href="/module/5/practice">
              Open timed extras
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="m3-paper">
        <span className="m3-eyebrow">05 / TURN PRACTICE INTO A HABIT</span>
        <h2>What will you do differently next time?</h2>
        <Field5
          api={api}
          name={`reflection${l.id}`}
          title={`Lesson ${l.id} reflection and action`}
          prompt={l.reflection}
        />
        <p className="m3-muted">
          Review the previous step, record both core practice debriefs, and
          enter a reflection. Practice speed, hints, and outcome do not
          determine eligibility.
        </p>
        <Button
          className="m3-primary"
          disabled={reviewed || !lessonReady5(api.work, l.id)}
          onClick={() => {
            api.complete(`lesson${l.id}`);
            toast.success(`Lesson ${l.id} review saved`);
          }}
        >
          {reviewed ? "Lesson reviewed" : `Mark Lesson ${l.id} Reviewed`}
        </Button>
      </section>
    </>
  );
}
function Extras5({ api }: { api: WorkApi5 }) {
  const [topic, setTopic] = useState("all");
  const [selected, setSelected] = useState(module5Extra[0].id);
  const filtered = module5Extra.filter(
    p => topic === "all" || p.id.startsWith(`m5-l${topic}-`)
  );
  const p = filtered.find(p => p.id === selected) || filtered[0];
  return (
    <>
      <section className="m3-paper">
        <span className="m3-eyebrow">OPTIONAL / TIMED REPETITION</span>
        <h2>Six more opportunities to practice under a time box.</h2>
        <p>
          Use these after a debrief identifies a gap. The suggested times are
          flexible and do not replicate an official assessment. You may pause,
          extend the budget before starting, hide the clock, or work without a
          countdown.
        </p>
        <label className="m4-filter" htmlFor="m5-topic">
          Filter by lesson
          <select
            id="m5-topic"
            aria-label="Filter by lesson"
            value={topic}
            onChange={e => setTopic(e.target.value)}
          >
            <option value="all">All lessons</option>
            <option value="1">Lesson 1 · Decomposition</option>
            <option value="2">Lesson 2 · Efficiency</option>
            <option value="3">Lesson 3 · Testing and recovery</option>
          </select>
        </label>
        <div
          className="m4-practice-grid"
          role="group"
          aria-label="Timed extra selection"
        >
          {filtered.map(item => (
            <button
              key={item.id}
              type="button"
              aria-pressed={p.id === item.id}
              onClick={() => setSelected(item.id)}
            >
              <span>
                {item.focus} · {item.minutes} min suggested{" "}
                {practiceReviewed5(api.work, item.id) && (
                  <CheckCircle2 size={15} aria-label="Reviewed" />
                )}
              </span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>
        <p className="m3-muted">
          {module5Extra.filter(p => practiceReviewed5(api.work, p.id)).length}{" "}
          of 6 optional extras reviewed. Switching closes the external editor;
          save your code first. Starting a different clock pauses any other
          running practice clock.
        </p>
        <Module5Practice key={p.id} practice={p} api={api} />
      </section>
      <section className="m3-paper">
        <h2>Optional mixed rehearsal</h2>
        <p>
          Select one planning extra and one debugging extra. Use their separate
          clocks or untimed mode. Between them, spend a brief review interval
          writing which task you would tackle first and why. Finish by
          explaining one change you would make under a tighter or more generous
          time box.
        </p>
        <p>
          This is a learning routine, not a reproduction of the GCA. Follow the
          actual assessment’s instructions about navigation, allowed resources,
          timing, and accommodations.
        </p>
        <Link className="m3-text-link" href="/module/5/plan">
          Use your results to choose review priorities
          <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
function Plan5({ api }: { api: WorkApi5 }) {
  return (
    <>
      <section className="m3-paper">
        <span className="m3-eyebrow">
          READINESS IS EVIDENCE, NOT A STOPWATCH SCORE
        </span>
        <h2>Choose the next practice that changes the outcome.</h2>
        <p>
          Module 4 asked whether an optimization is justified. Module 5 adds a
          second question: can you explain, implement, and test it reliably with
          the time and resources available? A fast attempt with an untested
          boundary is not stronger evidence than a slower attempt with a clear
          correction.
        </p>
        <div className="m3-rule-grid">
          <article>
            <h3>Prioritize a repeatable gap</h3>
            <p>
              Review mistakes that recur across attempts: unclear output
              contracts, unsafe mutation, duplicate handling, off-by-one bounds,
              or no time reserved for testing. Select a specific remedial
              activity, not “study Python more.”
            </p>
          </article>
          <article>
            <h3>Define what improvement looks like</h3>
            <p>
              Use a reproducible criterion: explain the invariant without the
              reference, pass a previously failing case, or write three useful
              tests before coding. A time goal can supplement evidence; it never
              replaces correctness.
            </p>
          </article>
        </div>
        <div className="m4-table-wrap">
          <table className="m4-table">
            <caption>
              Your latest practice evidence · elapsed values are a snapshot
            </caption>
            <thead>
              <tr>
                <th>Practice</th>
                <th>Clock / elapsed</th>
                <th>Self-report</th>
                <th>Help used</th>
              </tr>
            </thead>
            <tbody>
              {module5Practices.map(p => {
                const r = api.work.records[p.id];
                return (
                  <tr key={p.id}>
                    <td>
                      {p.title}
                      <small className="m5-cell-small">
                        {p.level === "extra"
                          ? "Optional extra"
                          : "Core companion"}
                      </small>
                    </td>
                    <td>
                      {r
                        ? `${r.clock.mode} · ${r.clock.status} · ${formatClock(clockSeconds(r.clock, Date.now()))}`
                        : "Not started"}
                    </td>
                    <td>{r?.outcome || "Not entered"}</td>
                    <td>
                      {r
                        ? `${r.hintsUsed} hints; reference ${r.solutionViewed ? "viewed" : "not viewed"}`
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="m3-muted">
          This table is not a readiness score or a prediction of official
          assessment results. All attempt outcomes are self-reported.
        </p>
      </section>
      <section className="m3-paper">
        <span className="m3-eyebrow">
          YOUR REVIEW PLAN / TWO REQUIRED PRIORITIES
        </span>
        <h2>Make the next study session specific.</h2>
        {[1, 2, 3].map(n => (
          <article className="m5-priority" key={n}>
            <h3>
              Priority {n}
              {n === 3 ? " · optional" : ""}
            </h3>
            <Field5
              api={api}
              name={`priority${n}`}
              title={`Priority ${n}: gap and evidence`}
              prompt="Name the concept and a specific attempt or failed test that makes it worth reviewing."
            />
            <Field5
              api={api}
              name={`action${n}`}
              title={`Priority ${n}: next activity and planned time`}
              prompt="Choose a lesson or companion practice, describe how you will approach it, and set a realistic study date or time block."
            />
            <Field5
              api={api}
              name={`check${n}`}
              title={`Priority ${n}: success criterion`}
              prompt="What observable result will show improvement? State an exact test, explanation, or habit you can verify."
            />
          </article>
        ))}
        <Exports5 api={api} />
        <p className="m3-muted">
          Review all three lessons and complete the first two priority entries
          before recording this step. The third priority is optional.
        </p>
        <Button
          className="m3-primary"
          disabled={
            api.work.completed.includes("plan") || !planReady5(api.work)
          }
          onClick={() => api.complete("plan")}
        >
          {api.work.completed.includes("plan")
            ? "Review plan saved"
            : "Mark Review Plan Complete"}
        </Button>
      </section>
      <section className="m3-paper">
        <span className="m3-eyebrow">BEFORE WEEK 6</span>
        <h2>Check instructions, not assumptions.</h2>
        <p>
          Use Canvas Module 6 and your assigned assessment invitation to confirm
          the official duration, permitted language and resources, navigation
          rules, technical setup, identity/proctoring requirements if any, and
          approved accommodations. This companion does not determine those rules
          or guarantee a result.
        </p>
        <p>
          If instructions are unclear, contact your instructor before beginning
          the assigned assessment. Do not treat practice pause buttons,
          reference solutions, or adjustable timers as permission to use them in
          an official assessment.
        </p>
      </section>
    </>
  );
}
export default function Module5() {
  const [location] = useLocation();
  const api = useModule5Work();
  const { isModuleUnlocked, isModuleCompleted, markModuleComplete } =
    useModuleProgress();
  const step = module5Steps.find(s => s.path === location) || module5Steps[0];
  const index = module5Steps.indexOf(step);
  const lesson = module5Lessons.find(l => step.id === `lesson${l.id}`);
  const complete = isModuleCompleted(5);
  const coreCount = module5Core.filter(p =>
    practiceReviewed5(api.work, p.id)
  ).length;
  const extraCount = module5Extra.filter(p =>
    practiceReviewed5(api.work, p.id)
  ).length;
  const eligible =
    readyForModule5(api.work) && isModuleUnlocked(5) && !api.error;
  const title =
    lesson?.title ||
    {
      overview: "Timed Readiness & Efficient Problem Solving",
      practice: "The timed-practice studio",
      plan: "Turn practice evidence into a review plan.",
      completion: "Leave with a plan, not just a time.",
    }[step.id] ||
    "Module 5";
  const intro =
    lesson?.intro ||
    {
      overview:
        "Bring your Python foundations, loop reasoning, and optimization habits together. Plan deliberately, implement a reliable solution, test what could fail, and use each attempt to decide what to review next.",
      practice:
        "Build confidence through focused, adjustable practice. The timer is a learning tool—not a grade, deadline, or claim of GCA readiness.",
      plan: "Identify the gaps that matter most, assign each one a concrete practice action, and define evidence of improvement before Week 6.",
      completion:
        "Preserve your strategy, a boundary test, a debugging correction, and two prioritized review actions. Your learning record stays separate from official Canvas submissions.",
    }[step.id];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div
      className="m3-page m5-page"
      data-track={
        ["plan", "completion"].includes(step.id) ? "career" : "technical"
      }
    >
      <div className="m3-wrap">
        <div className="m3-breadcrumb">
          <Link href="/">Course home</Link>
          <span>/</span>
          <Link href="/module/5">Module 5</Link>
          {step.id !== "overview" && (
            <>
              <span>/</span>
              <span>{step.label}</span>
            </>
          )}
        </div>
        <header className="m3-header">
          <div className="m3-eyebrow">
            TECH460 / WEEK 05 {lesson && `/ LESSON 0${lesson.id}`}
          </div>
          <h1>{title}</h1>
          <p>{intro}</p>
          <div className="m3-header-meta">
            <span>
              <BookOpen size={16} />3 lessons
            </span>
            <span>
              <Clock3 size={16} />6 core practices
            </span>
            <span>
              <Plus size={16} />6 timed extras
            </span>
          </div>
        </header>
        <nav className="m3-local-nav" aria-label="Module 5 navigation">
          <div className="m3-bookmark">
            <strong>05</strong>
            <span>READINESS STUDIO</span>
          </div>
          {module5Steps.map((s, i) => {
            const done =
              api.work.completed.includes(s.id) ||
              (s.id === "completion" && complete) ||
              (s.id === "practice" && extraCount === module5Extra.length);
            return (
              <Link
                key={s.id}
                href={s.path}
                aria-current={s.id === step.id ? "page" : undefined}
                data-complete={done}
              >
                <span>
                  {done ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                {s.label}
              </Link>
            );
          })}
          <small className="m3-ribbon-caption">
            Plan → build
            <br />→ check → debrief
          </small>
        </nav>
        {api.error && (
          <div className="m3-warning" role="alert">
            {api.error}
          </div>
        )}
        {!isModuleUnlocked(5) && (
          <div className="m3-warning">
            <LockKeyhole size={18} />
            <p>
              Read and practice ahead if useful. Complete Module 4 before
              recording Module 5 completion.{" "}
              <Link href="/module/4/completion">Review Module 4 progress.</Link>
            </p>
          </div>
        )}
        <aside className="m3-canvas">
          <strong>Companion learning; Canvas remains authoritative.</strong>
          <p>{module5Notice}</p>
        </aside>
        {step.id === "overview" && (
          <>
            <section className="m3-objective">
              <span>
                WEEK
                <br />
                <b>05</b>
              </span>
              <div>
                <h2>
                  A dependable process travels better than a memorized answer.
                </h2>
                <p>
                  The Week 5 outcome is to prioritize remaining GCA review
                  needs. These companion goals build directly on Modules 2–4:
                </p>
                <ol className="m4-goals">
                  {module5Objectives.map(o => (
                    <li key={o}>{o}</li>
                  ))}
                </ol>
              </div>
            </section>
            <section className="m3-paper">
              <span className="m3-eyebrow">YOUR LEARNING PATH</span>
              <h2>From correct solutions to reliable performance.</h2>
              {module5Lessons.map(l => (
                <article className="m3-chapter" key={l.id}>
                  <div className="m3-chapter-number">0{l.id}</div>
                  <div>
                    <h3>
                      <Link href={`/module/5/lesson${l.id}`}>
                        {l.title}
                        <ArrowRight size={18} />
                      </Link>
                    </h3>
                    <p>
                      {l.short} · 2 core companions + 2 optional timed extras
                    </p>
                    <ol>
                      {l.practices
                        .filter(p => p.level === "core")
                        .map(p => (
                          <li key={p.id}>
                            {p.title} · {p.minutes} min suggested
                          </li>
                        ))}
                    </ol>
                  </div>
                </article>
              ))}
            </section>
            <section className="m3-paper">
              <span className="m3-eyebrow">
                CONTINUITY / USE WHAT YOU ALREADY BUILT
              </span>
              <h2>Bring three habits forward.</h2>
              <div className="m3-concepts">
                <article>
                  <h3>From Module 2: name the data</h3>
                  <p>
                    Distinguish strings, lists, and mutation. State the output
                    shape and empty-input behavior before choosing operations.
                  </p>
                  <Link href="/module/2">Review Python foundations</Link>
                </article>
                <article>
                  <h3>From Module 3: explain the loop</h3>
                  <p>
                    Use an invariant and a boundary test to make a traversal
                    trustworthy. Debug one state change at a time.
                  </p>
                  <Link href="/module/3">Review structured traversal</Link>
                </article>
                <article>
                  <h3>From Module 4: justify the shortcut</h3>
                  <p>
                    Use a dictionary, two pointers, or a matrix traversal only
                    when the input contract supports it. Include preprocessing
                    and memory costs.
                  </p>
                  <Link href="/module/4">Review optimization techniques</Link>
                </article>
              </div>
            </section>
            <section className="m3-paper">
              <span className="m3-eyebrow">YOUR PRACTICE PROTOCOL</span>
              <h2>Use a time box without letting it replace judgment.</h2>
              <div className="m5-routine">
                {[
                  [
                    "01",
                    "Plan",
                    "State input, output, examples, and one edge case. Pick a simple baseline.",
                  ],
                  [
                    "02",
                    "Build",
                    "Implement the plan in small, explainable steps. Save an anchor before changing approach.",
                  ],
                  [
                    "03",
                    "Check",
                    "Run a normal case and a boundary. Diagnose the cause of a failure before editing.",
                  ],
                  [
                    "04",
                    "Debrief",
                    "Record what happened and choose one next action. Use evidence to plan the next session.",
                  ],
                ].map(([n, h, t]) => (
                  <article key={n}>
                    <span>{n}</span>
                    <h3>{h}</h3>
                    <p>{t}</p>
                  </article>
                ))}
              </div>
              <p>
                The clock is optional as a pressure tool: choose untimed mode or
                a longer budget when useful. Reaching zero never locks the
                editor, submits work, or marks an activity complete. No minimum
                speed or correct-solution outcome is required for a companion
                review.
              </p>
              <p className="m3-muted">
                Timer values use your device clock and are approximate. They
                continue across hidden tabs and reloads until paused or
                finished. Start another practice to pause the old clock. Keep
                one course tab open, and download backups of your local notes
                and debriefs.
              </p>
            </section>
            <section className="m3-paper">
              <h2>What to finish and what to keep.</h2>
              <p>
                Review all three lessons, record the six core practice debriefs,
                and create two review priorities. Keep a time-management
                strategy, exact boundary-test evidence, and one debugging
                correction. The six extras are optional. In Canvas, complete the
                official lessons, activities, discussions, and feedback listed
                there through their individual links.
              </p>
              <Button
                className="m3-primary"
                disabled={api.work.completed.includes("overview")}
                onClick={() => api.complete("overview")}
              >
                {api.work.completed.includes("overview")
                  ? "Overview reviewed"
                  : "Mark Overview Reviewed"}
              </Button>
            </section>
          </>
        )}
        {lesson && <Lesson5 key={lesson.id} lesson={lesson} api={api} />}{" "}
        {step.id === "practice" && <Extras5 api={api} />}{" "}
        {step.id === "plan" && <Plan5 api={api} />}
        {step.id === "completion" && (
          <>
            <section className="m3-paper">
              <span className="m3-eyebrow">
                PERSONAL PROGRESS / NOT A VERIFIED ASSESSMENT RESULT
              </span>
              <h2>
                {complete
                  ? "Module 5 marked complete."
                  : "Review your Module 5 record."}
              </h2>
              <div className="m3-completion-stats">
                <strong>
                  {coreCount}
                  <small>/ 6 core debriefs</small>
                </strong>
                <strong>
                  {extraCount}
                  <small>/ 6 optional extras</small>
                </strong>
                <strong>
                  {evidenceKeys5.filter(k => api.work.fields[k]?.trim()).length}
                  <small>/ 3 evidence entries</small>
                </strong>
              </div>
              <div className="m3-status-list">
                {module5Steps
                  .filter(s => requiredSteps5.includes(s.id))
                  .map(s => (
                    <Link key={s.id} href={s.path}>
                      <CheckCircle2
                        size={18}
                        className={
                          api.work.completed.includes(s.id) ? "m3-done" : ""
                        }
                      />
                      {s.label}
                      <span>
                        {api.work.completed.includes(s.id)
                          ? "Reviewed"
                          : "Needs review"}
                      </span>
                    </Link>
                  ))}
              </div>
              <p className="m3-muted">
                Review markers check the presence of your work, not its quality
                or code correctness. Timing and hint use never determine local
                completion.
              </p>
            </section>
            <section className="m3-paper">
              <span className="m3-eyebrow">
                YOUR EVIDENCE / MAKE IT REUSABLE
              </span>
              <h2>Carry a strategy into the next attempt.</h2>
              <Field5
                api={api}
                name="strategy"
                title="1. My time-management strategy"
                prompt="Explain how you will plan, reserve time for testing, decide when to revisit an approach, and recover when stuck. Refer to evidence from a practice attempt; distinguish your practice routine from official assessment rules."
              />
              <Field5
                api={api}
                name="boundary"
                title="2. Boundary-test evidence"
                prompt="Name the practice and record exact input, expected output, actual output, and the assumption it tested."
              />
              <Field5
                api={api}
                name="correction"
                title="3. Debugging correction and retest"
                prompt="Describe the cause of a failure, the smallest justified correction, and the test you ran again. Explain what you will watch for next time."
              />
              <Exports5 api={api} />
              <p className="m3-muted">
                Exports include practice timing snapshots, debriefs, help-use
                records, reflections, and your review plan. Code edited in the
                external Python editor is not included.
              </p>
            </section>
            <section className="m3-paper">
              <h2>Check official work in Canvas.</h2>
              <p>
                Verify the actual Module 5 requirements and all work assigned
                there. Consult Canvas and the assigned invitation for official
                GCA timing, navigation, resource, and accommodation rules. This
                confirmation is a self-report, not a grade or submission check.
              </p>
              <label className="m3-checkbox">
                <Checkbox
                  checked={api.work.canvasChecked}
                  onCheckedChange={v =>
                    api.update(old => ({ ...old, canvasChecked: v === true }))
                  }
                />
                <span>
                  I checked the official Module 5 requirements and my assigned
                  work in Canvas.
                </span>
              </label>
              <Field5
                api={api}
                name="pulse"
                title="Personal pulse reflection (optional)"
                prompt="Which skill feels more reliable? What still needs deliberate practice before Week 6? This private response is not sent to your instructor."
              />
            </section>
            <section className="m3-finish">
              <span className="m3-eyebrow">NEXT / WEEK 06</span>
              <h2>Prepare for the assigned assessment—not an imagined one.</h2>
              <p>
                Use your review plan to target the remaining gaps before the
                official GCA assigned in Canvas. Module 6’s companion page
                remains a placeholder; Canvas and your assessment invitation
                remain authoritative.
              </p>
              <div className="m3-actions">
                <Button
                  className="m3-primary"
                  disabled={!eligible || complete}
                  onClick={() => {
                    if (eligible) {
                      markModuleComplete(5);
                      toast.success(
                        "Module 5 completion saved in this browser"
                      );
                    }
                  }}
                >
                  {complete ? "Module 5 Completed" : "Mark Module 5 Complete"}
                </Button>
                {complete && (
                  <Link href="/module/6" className="m3-text-link">
                    Preview Module 6<ArrowRight size={16} />
                  </Link>
                )}
              </div>
              {!complete && (
                <p className="m3-muted">
                  Requires Module 4 completion, overview and three lesson
                  reviews, six core debriefs, three reflections, the first two
                  review priorities, review-plan confirmation, three evidence
                  entries, and Canvas-work confirmation. Timed extras are
                  optional; finishing under a time limit is not required.
                </p>
              )}
            </section>
          </>
        )}
        <section className="m3-references">
          <h2>Reference desk</h2>
          <p>
            Scope: the supplied Week 5 course map. Detailed lessons, problems,
            and time boxes are newly authored companions. These technical
            sources support explanations; they are not alternate official
            activity-launch links.
          </p>
          {(lesson?.sources || module5Sources).map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </section>
        <footer className="m3-footer">
          {index > 0 ? (
            <Link href={module5Steps[index - 1].path}>
              <ArrowLeft size={16} />
              {module5Steps[index - 1].label}
            </Link>
          ) : (
            <Link href="/module/4/completion">
              <ArrowLeft size={16} />
              Module 4
            </Link>
          )}
          {index < module5Steps.length - 1 ? (
            <Link href={module5Steps[index + 1].path}>
              Next: {module5Steps[index + 1].label}
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link href="/">
              Course roadmap
              <ArrowRight size={16} />
            </Link>
          )}
        </footer>
      </div>
    </div>
  );
}
