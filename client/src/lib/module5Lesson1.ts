import type { M5Lesson } from "./module5Types";

export const module5Lesson1: M5Lesson = {
  id: 1,
  title: "Decompose Before the Clock Wins",
  short:
    "Extract a narrow contract, turn it into a one-pass baseline, and spend time on work you can verify.",
  intro: `A timed programming prompt can feel larger than it is when the contract, edge cases, and implementation are mixed together. This companion uses Module 2 strings and Module 3 loops to make that separation deliberate: name the input and output, choose a direct scan, state the reset rule, then test the smallest meaningful boundaries. The practices below are original companions, not copied official assessments. Their time boxes are flexible study suggestions, never official assessment limits. For required CodeSignal work, use the individual links in Canvas Module 5.`,
  objectives: [
    "Extract a complete, narrow input/output contract and convert it into examples, boundary cases, and pseudocode before coding.",
    "Build reliable linear baselines with str.split(), counters, accumulators, and reset-on-boundary loop state.",
    "Use flexible plan/build/check/debrief time boxes to prioritize a solvable, testable implementation rather than inventing complexity under pressure.",
  ],
  concepts: [
    {
      title: "Contract extraction turns prose into decisions",
      text: `Before writing a loop, rewrite the prompt as a contract: input type and allowed values; exact output type; what counts; comparison operators; and empty-input behavior. “Positive” should become strictly greater than 0, not nonnegative. “Longest consecutive run” should become a count of adjacent qualifying elements, not the largest value. If a prompt does not define malformed input, keep your implementation contract narrow instead of adding speculative parsing or validation. Then choose one normal example and several boundaries that could falsify your interpretation. This removes ambiguity before the clock turns it into rework.`,
    },
    {
      title: "Reuse Module 2 strings with an explicit whitespace policy",
      text: `For the word-summary baseline, use text.split() with no separator. Python treats each run of whitespace as one separator and omits leading and trailing empty tokens; an empty or whitespace-only string therefore produces an empty list. In this lesson, a “word” means one resulting non-whitespace token: punctuation remains part of that token, and no punctuation stripping, lowercasing, or linguistic tokenization is implied. That policy is deliberately narrower and more testable than “clean up the text.” By contrast, split(' ') has different behavior: repeated spaces create empty strings and tabs/newlines are not separators.`,
    },
    {
      title: "A linear baseline needs state, a boundary, and a reset",
      text: `Many list tasks are one pass, not nested loops. For a longest positive run, keep current_run for the streak ending at the current position and best_run for the best streak seen anywhere. On a positive value, extend current_run and update best_run. On zero or a negative value, reset current_run to 0 because no positive run can cross that boundary. Write this as pseudocode first: initialize state; scan each item once; update or reset; return the best state. The same shape handles a running total, run-length encoding, and first threshold crossing.`,
    },
    {
      title: "Reliable progress beats speculative optimization",
      text: `A useful time-boxed plan is: read and extract the contract, draft the direct baseline, check named boundaries, then explain or improve only if time remains. Start with the part you can prove: a single scan whose variables have clear meanings. Do not introduce sorting, recursion, regex, or extra data structures when the stated operation is simply an ordered scan; those choices can change semantics or add failure modes. Complexity should be honest: a one-pass scan is O(n) time in the number of input items, while output storage may add space. These companion pacing suggestions support practice; they do not describe or alter any official assessment process.`,
    },
  ],
  worked: `# Worked example — transaction count and total, with helpers
#
# Contract: amounts is a finite list of nonnegative integer cent amounts. Return one display string in exactly the form “<count> transactions; total <total> cents”. The empty list is valid and returns “0 transactions; total 0 cents”. This example is intentionally distinct from the practices: it summarizes transactions instead of words, positive streaks, character runs, or threshold prefixes.
#
# Pseudocode:
# 1. Count the list items.
# 2. Scan the list once, adding each amount to total.
# 3. Build the required string from the two helper results.
#
#
def transaction_count(amounts: list[int]) -> int:
    return len(amounts)


def transaction_total(amounts: list[int]) -> int:
    total = 0
    for amount in amounts:
        total += amount
    return total


def summarize_transactions(amounts: list[int]) -> str:
    count = transaction_count(amounts)
    total = transaction_total(amounts)
    return f"{count} transactions; total {total} cents"


assert transaction_count([]) == 0
assert transaction_total([]) == 0
assert summarize_transactions([125, 300, 75]) == "3 transactions; total 500 cents"
assert summarize_transactions([]) == "0 transactions; total 0 cents"

# Before: “summarize transactions” is vague enough to invite mixing formatting, counting, and arithmetic. After: each helper has one job, the loop has one accumulator, and assertions pin down both an ordinary case and the empty boundary.`,
  walkthrough: [
    {
      title: "Freeze the vocabulary before the code",
      text: `For the transaction example, “amount” is an integer number of cents, “count” is the number of list entries, and “total” is their sum. That excludes floats, currency parsing, and refund semantics from this small contract. Naming those exclusions lets the code remain short without silently making decisions outside the problem.`,
    },
    {
      title: "Separate helpers by responsibility",
      text: `transaction_count answers only how many entries exist; transaction_total answers only their arithmetic sum. summarize_transactions composes the answers into Module 2-style formatted text. The before/after gain is local reasoning: a formatting failure cannot be mistaken for an accumulator failure.`,
    },
    {
      title: "Trace the accumulator, including the empty case",
      text: `For [125, 300, 75], total starts at 0, then becomes 125, 425, and 500. For [], the loop never runs and the initialized value 0 is already the right answer. Initializing from the identity value makes the boundary work without a special branch.`,
    },
    {
      title: "Verify the contract, then choose the next action",
      text: `The assertions check helper behavior, one ordinary summary, and the empty summary. If they pass, this O(n) baseline is complete for its stated contract; do not spend remaining time “optimizing” len() or the single loop. For required course work, open its individual link in Canvas Module 5.`,
    },
  ],
  invariant: `In transaction_total, immediately before the next iteration, total is the sum of exactly the amounts already processed. Adding the next amount preserves that prefix-sum statement, and total is the full sum when the loop ends. For the longest-positive-run practice, after processing values[0:i], current_run equals the number of consecutive strictly positive items ending at index i - 1 (or 0 if i is 0 or the last processed item is not positive), and best_run equals the longest strictly positive consecutive run anywhere in values[0:i]. A reset at a value <= 0 preserves that statement because no valid run spans the boundary.`,
  complexity: `For the worked transaction example, len(amounts) is O(1), the total loop is O(n), and the scalar working state is O(1) under a unit-cost arithmetic model. For a list of n values, the direct positive-run and threshold-prefix baselines inspect each value at most once: O(n) time and O(1) auxiliary space. The word summary is O(L) time for L input characters; split() materializes the token list, so its additional storage is O(L) in the worst case. Run-length encoding is O(L) time and uses O(r) output space for r runs; its auxiliary state beyond the returned list is O(1). These are costs of the stated baselines, not guarantees about hidden platform overhead.`,
  pitfalls: [
    {
      title: "Treating zero as positive",
      text: `If the contract says positive, use value > 0. A condition such as value >= 0 incorrectly lets zero bridge two runs, so [2, 0, 3] would falsely become a run of three instead of a best run of one.`,
    },
    {
      title: "Using split(' ') when the policy is whitespace",
      text: `split(' ') keeps empty fields from repeated spaces and does not split on tabs or newlines. For this lesson’s word contract, text.split() is the intended operation because it groups whitespace runs and produces no edge empties.`,
    },
    {
      title: "Returning the wrong prefix meaning",
      text: `A threshold task must state whether it returns an index, a count, a sum, or the prefix itself. Here the optional exercise returns a one-based count of items and only considers nonempty prefixes. Negative values are allowed, so do not stop merely because a partial sum decreases.`,
    },
  ],
  checks: [
    {
      question:
        'Predict (ungraded): With this lesson’s whitespace policy, what does "  red\\tblue  \\n".split() return?',
      answer:
        "Reveal: ['red', 'blue']. No-argument split() treats the spaces, tab, and newline as whitespace separators, groups adjacent whitespace, and omits edge empties.",
    },
    {
      question:
        "Predict (ungraded): What should a strict-positive-run function return for [4, 1, 0, 2, 3]?",
      answer:
        "Reveal: 2. The zero is a boundary, so the two runs have lengths 2 and 2; neither may cross the zero.",
    },
  ],
  reflection: `Action reflection: Choose one practice you can finish in its flexible companion time box. Write its contract in one sentence, identify its most dangerous boundary, implement and run its assertions locally, then complete any corresponding required CodeSignal work only through the individual Canvas module link provided in Canvas Module 5. Record one before/after decision: what vague phrase did you turn into an exact rule?`,
  sources: [
    {
      label:
        "Python documentation: str.split() whitespace and separator behavior",
      href: "https://docs.python.org/3/library/stdtypes.html#str.split",
    },
    {
      label: "Python language reference: assert statement semantics",
      href: "https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement",
    },
    {
      label:
        "OpenDSA: Data Structures and Algorithms—tradeoffs and asymptotic analysis",
      href: "https://opendsa.org/OpenDSA/Books/Catalog/html/IntroDSA.html",
    },
  ],
  practices: [
    {
      id: "m5-l1-p1",
      title: "Summarize nonempty whitespace-delimited words",
      level: "core",
      focus: "Implement",
      minutes: 12,
      pacing: { plan: 3, build: 5, check: 2, debrief: 2 },
      contract: `Write summarize_words(text: str) -> tuple[int, int]. text is any Python string. Define a word as one token returned by text.split() with no separator: runs of whitespace separate tokens; leading and trailing whitespace creates no tokens; punctuation remains in tokens. Return (word_count, character_count), where character_count is the sum of len(token) for those tokens. The empty string and whitespace-only strings are valid and return (0, 0). Do not strip punctuation, lowercase text, or use split(' ').`,
      examples: `summarize_words('blue sky') returns (2, 7). summarize_words('  go!\\tnow\\n') returns (2, 6) because the tokens are 'go!' and 'now'. summarize_words('   ') returns (0, 0).`,
      plan: `Suggested flexible companion pacing: 3 min plan, 5 min build, 2 min check, 2 min debrief (12 total). Pseudocode: tokens = text.split(); count the tokens; loop over tokens adding each token length; return both totals. Decide now that punctuation is counted because it stays in a token.`,
      boundary: `Test empty text, whitespace-only text, repeated whitespace containing tabs/newlines, and punctuation attached to a token. The key boundary is that no-argument split() returns [] rather than [''] for whitespace-only input.`,
      hints: [
        "Hint 1: Let tokens = text.split(). Its length already gives the first result component.",
        "Hint 2: Start character_count at 0 and add len(token) once for every token; return (len(tokens), character_count).",
      ],
      starter: `def summarize_words(text: str) -> tuple[int, int]:
    raise NotImplementedError`,
      tests: `assert summarize_words('blue sky') == (2, 7)
assert summarize_words('  go!\\tnow\\n') == (2, 6)
assert summarize_words('') == (0, 0)
assert summarize_words('   ') == (0, 0)
assert summarize_words('a  b   c') == (3, 3)`,
      solution: `def summarize_words(text: str) -> tuple[int, int]:
    tokens = text.split()
    character_count = 0
    for token in tokens:
        character_count += len(token)
    return len(tokens), character_count`,
      explanation: `The contract supplies the parsing operation: no-argument split() creates exactly the allowed nonempty tokens. After that, Module 3’s accumulator pattern totals token lengths. Before the contract, it is tempting to special-case spaces or remove punctuation; after it, both would be incorrect extra behavior.`,
      complexity: `For L characters in text, the work is O(L). split() stores the token list, which can require O(L) additional space in the worst case; the loop’s scalar accumulator is O(1) beyond that list.`,
      debrief: `Did your output count punctuation in a token and ignore all edge whitespace? If not, identify whether the failure came from the split policy or the length loop. Run this companion locally, then use an individual Canvas module link for any required CodeSignal work.`,
    },
    {
      id: "m5-l1-p2",
      title: "Find the longest consecutive positive run",
      level: "core",
      focus: "Plan",
      minutes: 16,
      pacing: { plan: 4, build: 7, check: 3, debrief: 2 },
      contract: `Write longest_positive_run(values: list[int]) -> int. values is a finite list of integers and may be empty. A qualifying item is strictly positive (value > 0). Return the greatest number of adjacent qualifying items in any one run. Return 0 when the list is empty or has no positive items. Zero and every negative value end a run; do not return the values, indexes, or number of runs.`,
      examples: `longest_positive_run([1, 2, 0, 3, 4, 5, -1, 6]) returns 3. longest_positive_run([-2, 0, -1]) returns 0. longest_positive_run([9]) returns 1.`,
      plan: `Suggested flexible companion pacing: 4 min plan, 7 min build, 3 min check, 2 min debrief (16 total). Pseudocode: set current_run and best_run to 0; for each value, increase current_run and possibly best_run if value > 0, otherwise reset current_run to 0; return best_run. Write the invariant before coding.`,
      boundary: `Check empty input, all nonpositive input, a run at the beginning, a run at the end, and zero between positives. The decisive boundary is [2, 0, 3]: it has a best length of 1 because zero breaks adjacency.`,
      hints: [
        "Hint 1: You need two integers: one for the run ending here and one for the best run seen so far.",
        "Hint 2: In the nonpositive branch, assign current_run = 0. In the positive branch, increment it before comparing it with best_run.",
      ],
      starter: `def longest_positive_run(values: list[int]) -> int:
    raise NotImplementedError`,
      tests: `assert longest_positive_run([]) == 0
assert longest_positive_run([-2, 0, -1]) == 0
assert longest_positive_run([9]) == 1
assert longest_positive_run([1, 2, 0, 3, 4, 5, -1, 6]) == 3
assert longest_positive_run([2, 0, 3]) == 1
assert longest_positive_run([0, 4, 5]) == 2`,
      solution: `def longest_positive_run(values: list[int]) -> int:
    current_run = 0
    best_run = 0

    for value in values:
        if value > 0:
            current_run += 1
            if current_run > best_run:
                best_run = current_run
        else:
            current_run = 0

    return best_run`,
      explanation: `The scan never needs to revisit an item. current_run answers a local question—how long is the valid suffix ending here?—while best_run preserves the global answer. Resetting on <= 0 prevents a run from crossing an invalid item. This is the direct reliable baseline, not a situation that needs nested loops.`,
      complexity: `For n list items, the algorithm is O(n) time and O(1) auxiliary space. It keeps two counters regardless of input length.`,
      debrief: `Trace [1, 2, 0, 3, 4] by hand and say when current_run resets. If your code returns 4, you used the wrong boundary rule. The listed pacing is a flexible companion suggestion, not an official assessment limit.`,
    },
    {
      id: "m5-l1-p3",
      title: "run-length encode a string",
      level: "extra",
      focus: "Implement",
      minutes: 14,
      pacing: { plan: 3, build: 6, check: 3, debrief: 2 },
      contract: `Write run_length_encode(text: str) -> list[tuple[str, int]]. text is any Python string. Return one (character, count) tuple for each maximal consecutive run of the same character, in encounter order. Preserve characters exactly, including spaces and case. Return [] for ''. Do not combine equal characters that are separated by another character, and do not return a compressed string.`,
      examples: `run_length_encode('aaabbcaa') returns [('a', 3), ('b', 2), ('c', 1), ('a', 2)]. run_length_encode('') returns []. run_length_encode('A a') returns [('A', 1), (' ', 1), ('a', 1)].`,
      plan: `Suggested flexible companion pacing: 3 min plan, 6 min build, 3 min check, 2 min debrief (14 total). Pseudocode: make an empty result list; for each character, extend the final tuple only if it has the same character, otherwise append a new (character, 1) tuple. The output list is your record of completed and current runs.`,
      boundary: `Check empty text, one character, one long run, alternating characters, a space, and the same character appearing in separate runs. The key boundary is 'aba': it must yield three tuples, not [('a', 2), ('b', 1)].`,
      hints: [
        "Hint 1: Before reading the final result tuple, first check whether result is nonempty.",
        "Hint 2: If the final tuple has the current character, replace it with (character, old_count + 1); otherwise append (character, 1).",
      ],
      starter: `def run_length_encode(text: str) -> list[tuple[str, int]]:
    raise NotImplementedError`,
      tests: `assert run_length_encode('') == []
assert run_length_encode('x') == [('x', 1)]
assert run_length_encode('aaaa') == [('a', 4)]
assert run_length_encode('aaabbcaa') == [('a', 3), ('b', 2), ('c', 1), ('a', 2)]
assert run_length_encode('aba') == [('a', 1), ('b', 1), ('a', 1)]
assert run_length_encode('A a') == [('A', 1), (' ', 1), ('a', 1)]`,
      solution: `def run_length_encode(text: str) -> list[tuple[str, int]]:
    encoded: list[tuple[str, int]] = []

    for character in text:
        if encoded and encoded[-1][0] == character:
            previous_character, previous_count = encoded[-1]
            encoded[-1] = (previous_character, previous_count + 1)
        else:
            encoded.append((character, 1))

    return encoded`,
      explanation: `The last output tuple represents the run currently being extended. A different character is a hard boundary, so append instead of searching earlier output. This “compare with current state, extend or reset” pattern is the string analogue of the positive-run scan.`,
      complexity: `For L characters, the scan is O(L) time. The returned list uses O(r) space for r consecutive runs; aside from that output, the implementation uses O(1) auxiliary state.`,
      debrief: `Make sure the final run is present without a special after-loop append: this solution appends or updates during every iteration. Explain why the two a characters in 'aba' cannot share a tuple.`,
    },
    {
      id: "m5-l1-p4",
      title: "first threshold-crossing prefix",
      level: "extra",
      focus: "Plan",
      minutes: 18,
      pacing: { plan: 4, build: 8, check: 4, debrief: 2 },
      contract: `Write first_threshold_prefix(values: list[int], threshold: int) -> int | None. values is a finite list of integers; negative, zero, and positive values are all allowed. threshold is an integer. Scan left to right, maintaining the cumulative sum. Return the smallest one-based prefix length k (where k >= 1) for which the sum of values[0:k] is greater than or equal to threshold. Return None if no nonempty prefix reaches the threshold. The empty prefix is never considered, even when threshold <= 0.`,
      examples: `first_threshold_prefix([2, 3, 1], 5) returns 2. first_threshold_prefix([-4, 7, -1], 2) returns 2. first_threshold_prefix([1, 1], 5) returns None. first_threshold_prefix([], 0) returns None because only nonempty prefixes count.`,
      plan: `Suggested flexible companion pacing: 4 min plan, 8 min build, 4 min check, 2 min debrief (18 total). Pseudocode: total = 0; enumerate values starting at 1; add the value; if total >= threshold, return the current one-based position; after the loop return None. Do not assume totals only rise—negative values are allowed—but the first time the condition is true is still the answer because scanning is in prefix order.`,
      boundary: `Check empty input, an immediate crossing, a never-crossing list, a negative value before a crossing, and threshold 0. The key boundary is [] with threshold 0: return None because the contract excludes the empty prefix.`,
      hints: [
        "Hint 1: enumerate(values, start=1) gives the required one-based prefix length as you scan.",
        "Hint 2: Add each value before checking total >= threshold. Return immediately on the first true check; return None only after the whole scan.",
      ],
      starter: `def first_threshold_prefix(values: list[int], threshold: int) -> int | None:
    raise NotImplementedError`,
      tests: `assert first_threshold_prefix([2, 3, 1], 5) == 2
assert first_threshold_prefix([-4, 7, -1], 2) == 2
assert first_threshold_prefix([1, 1], 5) is None
assert first_threshold_prefix([], 0) is None
assert first_threshold_prefix([0], 0) == 1
assert first_threshold_prefix([5, -10, 20], 4) == 1`,
      solution: `def first_threshold_prefix(values: list[int], threshold: int) -> int | None:
    total = 0

    for prefix_length, value in enumerate(values, start=1):
        total += value
        if total >= threshold:
            return prefix_length

    return None`,
      explanation: `The running total is the sum of exactly the prefix already examined. Checking immediately after each addition makes the first successful prefix the smallest possible one. Negative values rule out shortcuts based on assuming monotonic totals, but they do not rule out this linear scan.`,
      complexity: `For n values, the function is O(n) time in the worst case and O(1) auxiliary space. It may return earlier after a crossing, but O(n) is the honest worst-case bound.`,
      debrief: `Say aloud what the function returns: a one-based count, not an index or the total. Then test [-4, 7, -1] with threshold 2 and verify why the answer is 2. If you continue into required course work, use the individual link in Canvas Module 5.`,
    },
  ],
};
