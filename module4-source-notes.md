# Module 4 implementation notes

## Content scope

Module 4 extends the supplied Week 4 map, **Optimization & Multidimensional Problems**, covering hash maps, pointers, matrices, discussion, and the outcome of explaining correct, efficient trade-offs. The detailed Canvas Module 4 objective, lesson titles, assignment titles, full prompts, grading rules, deadlines, and feedback requirements were not supplied. Consequently, all new lesson objectives, exercises, and the discussion scaffold are explicitly authored companion material rather than representations of official Canvas assessments.

Every Module 4 route reminds students to open official CodeSignal lessons and activities through their individual links in Canvas Module 4. No Canvas API, submission workflow, official grade verification, backend, or account system was added. Existing official TECH460 branding and instructor attribution are preserved. GitHub Pages `docs/` and course videos are outside this change.

## Learning design

| Area | Implementation |
| --- | --- |
| Lesson 1 | Hash maps, frequency counts, one-pass two-sum, duplicate policies, stable deduplication, first unique characters, and self-reuse debugging |
| Lesson 2 | Sorted two-pointer pair search, elimination proofs, original-index preservation, stable read/write compaction, palindrome scans, sorted merging, and fixed-window sums |
| Lesson 3 | Rectangular validation, row/column bounds, transpose, row aliasing, bounded neighbors, rectangular diagonal sums, and clipped windows |
| Interactions | Three step-through trace labs, a candidate-count growth model, six predict/reveal prompts, progressive practice hints, reference explanations, and external Python editor embeds |
| Practice | Six core companions and nine optional extras, each with a contract, starter, assertions, reference implementation, and complexity explanation; optional grid-analysis integration challenge |
| Evidence | Three lesson action reflections, a discussion draft, before/after trade-off analysis, exact boundary-test evidence, and a debugging correction |
| Export | Browser-local learning record as Markdown and escaped printable HTML for Save as PDF; starter/reference Python downloads per exercise |

Lesson data is split into `module4Lesson1.ts`, `module4Lesson2.ts`, and `module4Lesson3.ts`, typed by `module4Types.ts`. The aggregator `module4.ts` supplies routes, metadata, and practice helpers. `Module4.tsx` renders overview, three lessons, extra practice, discussion, and completion using the existing Professional Studio workbook styling plus scoped Module 4 additions.

## Technical grounding

The [Python built-in operation complexity reference](https://docs.python.org/3/library/time-complexity.html) supports the distinction between average and worst-case hashing, list scans, slices, and sorting. [Dictionary documentation](https://docs.python.org/3/library/stdtypes.html#mapping-types-dict) supports key/hashability and insertion-order behavior. [Python sorting guidance](https://docs.python.org/3/howto/sorting.html), [MIT hashing](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-4-hashing/), and [Princeton merging](https://algs4.cs.princeton.edu/22mergesort/) ground the optimization discussion. [Python nested comprehensions](https://docs.python.org/3/tutorial/datastructures.html) and [zip documentation](https://docs.python.org/3/library/functions.html#zip) support the matrix explanations. These references are linked in the UI and are not alternate activity-launch links.

The parent review corrected early-return validation in both hash pair functions so invalid trailing values cannot evade the documented contract. Merge and fixed-window references avoid temporary slices and list concatenation to match their constant auxiliary-space explanations. Matrix explanations include shape-validation cost, single-row/column neighbor exceptions, integer-coordinate validation, and shallow cell sharing in newly allocated transpose rows. Numerical examples and reference assertions were executed rather than accepted solely from prose.

## Progress and persistence

`tech460-module4-workbook` stores versioned local data. Final readiness requires overview, three lesson and discussion review markers; all six core reviews; nonblank lesson reflections, discussion draft and three evidence fields; and the learner's Canvas-work confirmation. The global completion function separately checks Module 3 completion and parses the stored workbook. Optional extras and the integration challenge do not block completion. Fields are checked for presence, not content quality. Completion remains a self-reported milestone, not certification or official assessment evidence.

Malformed saved data is not silently overwritten, and unavailable storage produces a backup warning. Course reset clears Module 4 along with existing `tech460-*` records. Notes use Module 4 categories and tags. External editor changes are not captured in the workbook and must be saved by the student separately.

## Validation

TypeScript and production build pass. All 75 automated tests pass, consisting of 27 Module 3 regressions and 48 Module 4 tests. Module 4 coverage includes all three worked Python examples, all fifteen reference solutions and starter failures, exhaustive small-input pair-search comparisons, transpose properties, trace states, readiness rules, persistence normalization, and print escaping.

The isolated Chromium walkthrough covers all seven new routes, all fifteen review controls, topic filtering, trace scenarios, hint progression, reference disclosure, code downloads, editor URLs and expand controls, reflections, notes, prerequisite gating, optional-work independence, 50% course progress, reload persistence, Markdown and safe print exports, course reset, and corrupt storage. Additional checks cover all routes at 320px and 390px, mobile navigation, and primary opaque text contrasts of at least 4.5:1. Desktop and mobile screenshots were visually inspected. The Module 3 browser regression suite also passes.

QA scripts and screenshots remain outside the project under `/home/ubuntu/m4-qa/`; synthetic browser data is confined to disposable test contexts. Remote Coddy code execution was not asserted. Known build warnings concerning global font-import order and bundle size remain non-blocking. Public preview returned HTTP 200 at the active sandbox address before checkpointing.
