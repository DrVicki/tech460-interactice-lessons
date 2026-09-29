# Module 5 implementation notes

## Scope and instructional continuity

Module 5 is **Timed Readiness & Efficient Problem Solving**, based on the instructor-supplied Week 5 course map: decomposition, efficiency, GCA strategy, and prioritizing remaining review needs. No detailed official Module 5 overview, assessment prompts, points, or due dates were supplied. Consequently, the lesson titles, Python problems, suggested time boxes, knowledge checks, and reflection prompts are explicitly labeled newly authored companion material. The site does not claim they are official Canvas or CodeSignal questions.

The lessons extend Module 2 strings and collections, Module 3 loop reasoning and debugging, and Module 4 justified optimization. The learning sequence is **plan → build → check → debrief**. Module 5 adds three lessons, six core companion practices, six optional timed extras, and a prioritized review plan. The core practices cover word summaries, positive runs, event-index grouping, inclusive prefix-sum queries, sliding-window repair, and rectangular transpose repair. Extras cover run-length encoding, threshold prefixes, pointer merge, matrix totals, distinct-index two-sum repair, and strict parentheses validation.

All official lessons and activities must be launched through their individual links in Canvas Module 5. Canvas and the assigned assessment invitation remain authoritative for actual timing, navigation, permitted resources, accommodations, submission, and scoring requirements. No official assessment duration, passing score, or guaranteed readiness claim was introduced. Module 6 remains a companion placeholder.

## Learner experience and data boundaries

Each practice supplies a complete contract, examples, suggested plan/build/check/debrief pacing, two progressive hints, starter code, executable assertions, a reference solution, and correctness and complexity explanations. The external Coddy editor is supplemental; the site does not execute or grade submitted Python, persist edits inside the iframe, or send work to Canvas. Starter and reference `.py` downloads include the same assertions that are tested during development.

The timer supports a configurable countdown (1–120 minutes using selectable budgets), untimed elapsed mode, start/pause/resume, explicit finish, optional hidden display, and confirmed clock reset. A time box ending never locks the editor or submits work. Only one practice clock runs at a time within the current workbook; starting a different one pauses the prior clock. Elapsed values derive from stored epoch timestamps rather than counting interval ticks, so hidden-tab throttling and reloads do not silently grant time. Values use the device clock and are approximate; they are not assessment evidence. Keep one course tab open because multi-tab edits are not merged.

Only the latest clock and debrief for each activity are stored. Reset preserves debrief text and help-use history but clears the practice review marker and timing; the UI explains this and offers cancellation. Export first to retain an earlier timing record. A finished clock is not a completed practice review: the learner must choose a self-reported outcome, enter exact test evidence and a next action, and record the review. Needing another attempt or using hints never blocks a review, and finishing under a suggested limit is never required.

Module completion requires Module 4 completion, the overview, three lesson reviews and reflections, six core debriefs, the first two review priorities, review-plan confirmation, three evidence entries, and self-reported Canvas-work confirmation. The third priority, six extras, and personal pulse reflection are optional. All eligibility is local and presence-based—not grading or official verification. Module 5 is integrated into the shared route map, sidebar, homepage roadmap, Notes labels, course progress, reset coverage, and Module 4 handoff.

Records use `tech460-module5-workbook`. Invalid top-level data is not overwritten; storage failure is disclosed. Markdown and escaped print/PDF exports include reflections, priorities, practice timing snapshots, outcomes, hint/reference use, and debriefs. External editor code is not included. This work does not modify the server, configure external APIs, push GitHub changes, or update the older `docs/` GitHub Pages companion.

## Technical source desk

Each lesson links its relevant sources. These sources were searched and fetched during authoring:

| Source | Use |
|---|---|
| [Python string methods](https://docs.python.org/3/library/stdtypes.html#str.split) | Exact no-argument whitespace splitting behavior |
| [Python assert statement](https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement) | Assertion-based local checks |
| [OpenDSA introduction](https://opendsa.org/OpenDSA/Books/Catalog/html/IntroDSA.html) | Problem/algorithm distinction and trade-offs |
| [Python data structures](https://docs.python.org/3/tutorial/datastructures.html) | Dictionaries, sets, list behavior, and transpose patterns |
| [Python itertools](https://docs.python.org/3/library/itertools.html) | Accumulation/prefix reasoning |
| [MIT 6.006 hashing](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-4-hashing/) | Qualified expected hashing costs |
| [NIST binary search](https://xlinux.nist.gov/dads/HTML/binarySearch.html) | Search structure and logarithmic interval reduction |

## Validation and review corrections

The Module 5 suite contains 49 tests; combined with Modules 3, 4, and the animation state suite, 135 tests passed. Tests execute all three displayed worked blocks and all twelve reference solutions, ensure each starter has an intentional failure rather than syntax errors, verify pacing totals, compare window sums and range queries against brute-force results over small arrays, and cover timer transitions, normalization, persistence, exports, and completion requirements.

Content review corrected a contradictory window-sum example, removed a slice that invalidated an O(1)-auxiliary-space claim, ensured strict parentheses validation rejects an invalid suffix even after an unmatched close, made the entire Lesson 1 worked block executable, aligned the binary-search invariant, and clarified duplicate-policy and constant-cost assumptions. Supplied test outputs were checked independently rather than relying only on the drafting agents’ validation.

The first full Chromium walkthrough passed all seven Module 5 routes, all twelve practice/debrief controls, timers and reload persistence, nonblocking expiry, untimed mode, reset confirmation, knowledge-check reveals, hints, reference explanations, external-editor URL encoding, Python downloads, prerequisite gating, review priorities, safe exports, Notes, 320px/390px width checks, course reset, and corrupt-storage preservation. Remote embedded Python execution is not asserted. TypeScript and production build passed; existing nonblocking CSS import-order and bundle-size warnings remain.

Browser QA artifacts and scripts live outside the project under `/home/ubuntu/m5-qa/`. Their seeded learner data belongs only to isolated test browser contexts, not the user's live browser.

### Final checkpoint validation — September 29, 2026

After formatting and UI polish, TypeScript, all 135 tests, and the production build passed again. The dedicated Module 5 browser flow and the existing Module 3/4 browser regressions all passed. Additional checks confirmed that the official logo loads, keyboard activation starts practice, the changing clock has silent screen-reader timer semantics, new clock text exceeds 4.5:1 contrast on its actual background, both visible and hidden clocks fit 320px and 390px screens, and storage failures are disclosed. Finished/idle clocks no longer remain sticky over the learner’s debrief; running/paused clocks stay available. Desktop and phone screenshots were inspected. The public Module 5 preview returned HTTP 200. No application page errors were recorded.
