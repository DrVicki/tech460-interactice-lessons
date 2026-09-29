import type { M5Lesson } from "./module5Types";

export const module5Lesson3: M5Lesson = {
  id: 3,
  title: "Test, Recover, and Turn Attempts into a Review Plan",
  short:
    "Use boundary evidence, failed assertions, and short debugging loops to strengthen your Week 6 review plan.",
  intro:
    "This is original TECH460 companion practice, not copied assessment content. Use it to turn a surprising assertion into a small, reproducible case, identify the violated contract or invariant, and retest the correction. The time boxes below are flexible companion suggestions, never official assessment limits. For any assigned CodeSignal work, open the relevant individual Module 5 link in Canvas; Canvas and the invitation are authoritative for current instructions, rules, timing, resources, retakes, AI use, proctoring, and credential details. Do not use a general CodeSignal entry point as a substitute for that individual Canvas link.",
  objectives: [
    "Design boundary tests that expose negative-value, dimension, index, empty-input, and invalid-input failures rather than only confirming a happy path.",
    "Use a failed assertion to make one root-cause correction, then run a focused regression set and a last-pass validation run.",
    "Convert evidence from attempts into a prioritized Week 6 review plan with a concrete next action and a stop rule for debugging.",
  ],
  concepts: [
    {
      title: "Boundary tests make the contract observable",
      text: "A boundary test selects a point where the algorithm changes behavior: a window equal to the entire list, an all-negative list, a one-row matrix, a rectangular rather than square matrix, an empty string, or an invalid argument. Start by writing the policy in the contract, then add one assertion per boundary. For example, initializing a maximum to 0 can look correct on positive inputs but contradicts a contract that permits negative values. The all-negative case makes that hidden assumption visible. A good boundary test is small enough that you can calculate the expected result before running code.",
    },
    {
      title: "A failed assertion is evidence, not a verdict",
      text: "Read a failure as a comparison between an observed value and a promised one. Minimize it to the smallest input that still fails, state which contract clause or invariant is broken, and trace only the variables relevant to that clause. Then change the cause, not the symptom. For a first-occurrence binary search, returning immediately at equality proves membership but fails the stronger first-index contract; moving the upper bound left after recording a candidate corrects the decision rule. Keep the failing assertion after the fix as a regression test.",
    },
    {
      title: "Time-box debugging to preserve decision quality",
      text: "Use a short loop: reproduce, inspect the contract and one trace, make one hypothesis, change one cause, and rerun the focused tests. If a suggested 8–20 minute practice box expires without a clear cause, stop changing code. Record the input, observed result, expected result, and the question you need to resolve; then move it into the review plan. This prevents random edits from creating new defects and leaves a useful artifact for later review. The suggested practice pacing is deliberately flexible, not an official limit.",
    },
    {
      title: "Last-pass validation becomes an evidence-driven Week 6 plan",
      text: "Before moving on, run the complete local assertion set, re-read the contract, and deliberately inspect the boundaries that caused earlier trouble. Capture evidence as specific labels: for example, “fixed window: invalid k policy now passes,” “transpose: output rows are independent,” or “binary search: duplicate target returns index 1.” Prioritize Week 6 review by risk and evidence: first a reproducible unresolved failure, then a rule you cannot explain from an invariant, then an untested boundary, and finally a stable skill that needs only light retrieval practice. Assign each item one next test or trace rather than a vague intention to review more.",
    },
  ],
  worked: `def first_occurrence(sorted_values, target):
    """Return the first index of target in an nondecreasing list, or -1."""
    low = 0
    high = len(sorted_values) - 1
    answer = -1

    while low <= high:
        mid = low + (high - low) // 2
        if sorted_values[mid] < target:
            low = mid + 1
        elif sorted_values[mid] > target:
            high = mid - 1
        else:
            answer = mid
            high = mid - 1  # keep searching the left half for an earlier match
    return answer


values = [1, 2, 2, 2, 5, 8]
assert first_occurrence(values, 2) == 1
assert first_occurrence(values, 1) == 0
assert first_occurrence(values, 8) == 5
assert first_occurrence(values, 4) == -1
assert first_occurrence([], 7) == -1
`,
  walkthrough: [
    {
      title: "Name the stronger contract before tracing",
      text: "The input is an nondecreasing list and the result must be the first index of target, not merely any matching index. On [1, 2, 2, 2, 5, 8], a conventional “return mid on equality” approach might return 2 or 3. The assertion expecting 1 distinguishes membership from first occurrence and gives the trace a precise target.",
    },
    {
      title: "Preserve the candidate when equality is found",
      text: "At equality, the value at mid is a valid candidate, so answer records mid. Before the correction, an immediate return stops too early. After the correction, high becomes mid - 1: every index strictly right of mid is irrelevant to finding a smaller matching index, while the left interval may still contain one.",
    },
    {
      title: "Trace the duplicate case to the boundary",
      text: "For target 2, the first equality can occur at index 2 or 3 depending on the interval. Recording it and reducing high eventually examines index 1. A comparison below target raises low; a comparison above target lowers high. The loop ends only when no candidate index remains, at which point answer is the leftmost equality seen or remains -1.",
    },
    {
      title: "Validate the repair, then file the evidence",
      text: "Run duplicate, first-position, last-position, absent, and empty cases. The duplicate assertion is the regression that would fail if equality again returned immediately. Record the before/after reason in the review plan: “before: equality proved only membership; after: saved candidate plus left search proves earliest occurrence.” This is a coverage of this companion contract, not a statement about any official content.",
    },
  ],
  invariant:
    "For first_occurrence, before each loop iteration every index below low is known to hold a value less than target, every index above high is known to hold a value greater than target or is at or to the right of a matching index already recorded, and answer is -1 or an index whose value equals target. When equality occurs, retaining answer and moving high left preserves the possibility of an earlier occurrence; when the interval is empty, answer is therefore the first occurrence if one exists.",
  complexity:
    "Let n be the number of values. first_occurrence halves the remaining search interval on each iteration, so it runs in O(log n) time and uses O(1) auxiliary space. This complexity assumes indexed access to an nondecreasing sequence as in a Python list; it is not a claim about every data structure or any official problem coverage. The fixed-window solution below runs in O(n) time with O(1) auxiliary space, transpose of an R by C matrix runs in O(RC) time and uses O(RC) output space, two-sum uses O(n) expected time and O(n) auxiliary space for its dictionary, and balanced parentheses uses O(n) time and O(1) auxiliary space because its counter never stores the whole input.",
  pitfalls: [
    {
      title: "Choosing a sentinel that is outside the allowed data range",
      text: "Starting a maximum at 0 quietly assumes a nonnegative answer. If negative values are allowed, seed the maximum from the first valid window (after validating k) or use a value that is guaranteed to be replaced. A test such as [-8, -3, -6] with k = 2 detects this mistake.",
    },
    {
      title: "Repairing an output symptom while leaving the structural cause",
      text: "Changing one expected matrix value does not repair output-row aliasing or swapped dimensions. In transpose, build independent output rows and use output[column][row] = input[row][column]. Then mutate one returned row in a test to prove that the other returned rows do not change.",
    },
    {
      title: "Letting a convenient early return bypass validation",
      text: "Returning None for a short two-sum input before checking types can violate a contract that requires invalid inputs to raise. Likewise, storing the current value before looking for its complement allows a single index to satisfy its own complement. Validate first; then look up only previously seen indices before storing the current index.",
    },
  ],
  checks: [
    {
      question:
        "Predict before revealing (ungraded): max_fixed_window_sum([-8, -3, -6], 2) should return what? Why would a version initialized with best = 0 fail?",
      answer:
        "It should return -9 because the two exact-width windows sum to -11 and -9. best = 0 would never be replaced by either negative sum, so it returns a value that is not the sum of any permitted window. Seeding best with the first valid window sum makes the result derive from actual input evidence.",
    },
    {
      question:
        "Predict before revealing (ungraded): A first-occurrence binary search finds target 2 at index 3 in [1, 2, 2, 2, 5]. Which bound should change, and why?",
      answer:
        "Record 3 as a candidate and change high to 2. Any first occurrence must be at an index less than 3, while indices greater than 3 cannot improve the candidate. Moving low right would discard the only region that could contain the earlier duplicate.",
    },
  ],
  reflection:
    "Create a four-line Week 6 review plan from your own evidence: (1) list one smallest failing or previously confusing input, (2) name the exact contract clause or invariant it tests, (3) schedule one next action such as hand-tracing three iterations or writing one boundary assertion, and (4) state a stop rule such as “after 12 focused minutes, record the trace and move to the next priority.” For actual assigned CodeSignal work, use only its individual Canvas module link and follow Canvas/invitation guidance.",
  sources: [
    {
      label: "Python Language Reference: assert statement semantics",
      href: "https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement",
    },
    {
      label: "Python Tutorial: nested list comprehensions and transpose",
      href: "https://docs.python.org/3/tutorial/datastructures.html#nested-list-comprehensions",
    },
    {
      label: "NIST Dictionary of Algorithms and Data Structures: binary search",
      href: "https://xlinux.nist.gov/dads/HTML/binarySearch.html",
    },
  ],
  practices: [
    {
      id: "m5-l3-p1",
      title: "Repair a maximum fixed-width window sum",
      level: "core",
      focus: "Debug",
      minutes: 16,
      pacing: { plan: 3, build: 7, check: 3, debrief: 3 },
      contract:
        "Repair max_fixed_window_sum(values, k). values must be a list of exact integers and k must be an exact integer (bool is not accepted as an integer for this companion contract). Return the greatest sum among all contiguous windows containing exactly k values. k must satisfy 1 <= k <= len(values); raise ValueError otherwise. Raise TypeError when values is not a list, an element is not an exact integer, or k is not an exact integer. Negative values and duplicate values are valid. Do not mutate values.",
      examples:
        "max_fixed_window_sum([4, -2, 5, -1], 2) returns 4 from [5, -1]; its exact-width window sums are 2, 3, and 4. max_fixed_window_sum([-8, -3, -6], 2) returns -9. max_fixed_window_sum([7], 1) returns 7.",
      plan: "State the invalid-window policy before writing a loop. Validate every contract precondition, calculate the first k-value sum, and treat it as the initial best. Then slide one position at a time: subtract the value leaving on the left and add the value entering on the right. Compare each real window sum with best. Keep the all-negative case in view while tracing.",
      boundary:
        "Test k = 1, k = len(values), all-negative values, duplicates, and k values of 0, negative, or too large. The function rejects an empty values list through the same 1 <= k <= len(values) policy. A list with a bool element is invalid under this exact-integer contract.",
      hints: [
        "A maximum must start from a permitted window sum, not from 0, because a correct maximum may be negative.",
        "After the first window, the window ending at index right has sum previous_sum - values[right - k] + values[right]. This avoids recomputing every window.",
      ],
      starter: `def max_fixed_window_sum(values, k):
    # INTENTIONAL BUGS FOR REPAIR: this validates neither input type nor k,
    # rejects k == len(values), and assumes a maximum cannot be negative.
    if k <= 0 or k >= len(values):
        raise ValueError('invalid window width')
    best = 0
    window_sum = sum(values[:k])
    for right in range(k, len(values)):
        window_sum += values[right] - values[right - k]
        best = max(best, window_sum)
    return best
`,
      tests: `assert max_fixed_window_sum([4, -2, 5, -1], 2) == 4
assert max_fixed_window_sum([-8, -3, -6], 2) == -9
assert max_fixed_window_sum([7], 1) == 7
assert max_fixed_window_sum([9, 1, -8], 2) == 10
assert max_fixed_window_sum([2, -1, 3], 3) == 4
assert max_fixed_window_sum([2, 2, 2], 1) == 2
try:
    max_fixed_window_sum([], 1)
    assert False, 'empty values with k=1 should fail'
except ValueError:
    pass
try:
    max_fixed_window_sum([1, 2], 0)
    assert False, 'zero width should fail'
except ValueError:
    pass
try:
    max_fixed_window_sum([1, 2], 3)
    assert False, 'oversized width should fail'
except ValueError:
    pass
try:
    max_fixed_window_sum([1, True], 1)
    assert False, 'bool cell should fail exact-integer policy'
except TypeError:
    pass
`,
      solution: `def max_fixed_window_sum(values, k):
    if not isinstance(values, list):
        raise TypeError('values must be a list')
    if any(type(value) is not int for value in values):
        raise TypeError('values must contain exact integers')
    if type(k) is not int:
        raise TypeError('k must be an exact integer')
    if not 1 <= k <= len(values):
        raise ValueError('k must be between 1 and len(values)')

    window_sum = 0
    for index in range(k):
        window_sum += values[index]
    best = window_sum
    for right in range(k, len(values)):
        window_sum += values[right] - values[right - k]
        if window_sum > best:
            best = window_sum
    return best
`,
      explanation:
        "The before version had three separate causes: it allowed type errors to appear incidentally, excluded the valid full-list window, and used 0 as an unjustified sentinel. The repaired version validates first, uses the first actual window as evidence for best, and then applies one subtract-and-add transition per later window. The all-negative assertion proves that best is based on a valid candidate rather than an assumed lower bound.",
      complexity:
        "Let n = len(values). Validation scans n values and the sliding loop performs at most n - k updates, so total time is O(n). The initial sum is O(k), which is within O(n), and uses an index loop rather than allocating a slice. The function keeps only a constant number of scalar variables beyond the input, so auxiliary space is O(1).",
      debrief:
        "Record which boundary exposed the defect and write the causal repair in one sentence: for example, “all-negative input failed because best began at 0; seed it from the first valid window.” If another test fails, minimize that input before changing code again. Suggested pacing totals 16 minutes and is flexible companion guidance, not an official limit.",
    },
    {
      id: "m5-l3-p2",
      title: "Repair rectangular transpose indices and row aliasing",
      level: "core",
      focus: "Debug",
      minutes: 18,
      pacing: { plan: 4, build: 8, check: 3, debrief: 3 },
      contract:
        "Repair transpose_rectangular(matrix). matrix must be a nonempty list of nonempty list rows with equal lengths. Return a new list of lists with shape (column_count, row_count) such that result[c][r] == matrix[r][c]. Raise TypeError when matrix is not a list or any row is not a list; raise ValueError for empty, zero-width, or jagged matrices. Do not mutate matrix. Each returned row must be a distinct list, so assigning a cell in one result row cannot assign a cell in another result row. Cell objects themselves are not deep-copied.",
      examples:
        "transpose_rectangular([[1, 2, 3], [4, 5, 6]]) returns [[1, 4], [2, 5], [3, 6]]. transpose_rectangular([[9], [8], [7]]) returns [[9, 8, 7]]. A 1 by 3 input becomes a 3 by 1 output; a rectangle is valid and is not treated as a square.",
      plan: "Validate the shape before indexing. Name rows and cols. Allocate cols independent result rows, each with rows placeholders. For every input coordinate (r, c), write its value to output coordinate (c, r). Use a postcondition test that mutates one output row, because equality of displayed rows alone cannot prove that they are independent objects.",
      boundary:
        "Use a 2 by 3 rectangle to expose swapped indices, a 1 by 1 case, one-row and one-column inputs, a jagged matrix, and a mutation test for output-row aliasing. Empty and zero-width matrices are rejected by this chosen companion policy instead of being assigned a transpose shape.",
      hints: [
        "The output has cols rows. Build them with a comprehension such as [[None for _ in range(rows)] for _ in range(cols)]; multiplying one inner list would alias it.",
        "Read input as matrix[r][c], then reverse the coordinate order for the destination: result[c][r]. A 2 by 3 input is a useful trace because output row index c reaches 0, 1, and 2.",
      ],
      starter: `def transpose_rectangular(matrix):
    # INTENTIONAL BUGS FOR REPAIR: repeated inner rows alias each other,
    # and the assignment keeps (r, c) instead of swapping to (c, r).
    rows = len(matrix)
    cols = len(matrix[0])
    result = [[None] * rows] * cols
    for r in range(rows):
        for c in range(cols):
            result[r][c] = matrix[r][c]
    return result
`,
      tests: `source = [[1, 2, 3], [4, 5, 6]]
assert transpose_rectangular(source) == [[1, 4], [2, 5], [3, 6]]
assert source == [[1, 2, 3], [4, 5, 6]]
assert transpose_rectangular([[9]]) == [[9]]
assert transpose_rectangular([[9, 8, 7]]) == [[9], [8], [7]]
result = transpose_rectangular([[1, 2], [3, 4]])
result[0][0] = 99
assert result[1][0] == 2, 'output rows must not alias'
try:
    transpose_rectangular([[1, 2], [3]])
    assert False, 'jagged matrix should fail'
except ValueError:
    pass
try:
    transpose_rectangular([[]])
    assert False, 'zero-width matrix should fail'
except ValueError:
    pass
try:
    transpose_rectangular((1, 2))
    assert False, 'non-list matrix should fail'
except TypeError:
    pass
`,
      solution: `def transpose_rectangular(matrix):
    if not isinstance(matrix, list):
        raise TypeError('matrix must be a list')
    if not matrix:
        raise ValueError('matrix must be nonempty')
    if not all(isinstance(row, list) for row in matrix):
        raise TypeError('each row must be a list')
    rows = len(matrix)
    cols = len(matrix[0])
    if cols == 0 or any(len(row) != cols for row in matrix):
        raise ValueError('matrix must be rectangular with positive width')

    result = [[None for _ in range(rows)] for _ in range(cols)]
    for r in range(rows):
        for c in range(cols):
            result[c][r] = matrix[r][c]
    return result
`,
      explanation:
        "The original allocation repeated one mutable inner list, so every apparent output row was the same object. It also tried to store a 2 by 3 input at result[r][c], even though result has three rows of length two. The repair makes one new row per output column and swaps the coordinate order. The mutation assertion is the decisive before/after check: it tests object independence, not only the values printed before mutation.",
      complexity:
        "Let R be the input row count and C the column count. Shape validation checks R rows, and the nested loop copies each of RC cells once, so total time is O(RC). The new matrix is O(RC) output space; beyond the output and loop variables, auxiliary space is O(1).",
      debrief:
        "Keep both failure labels in your review evidence: “index mapping” and “mutable-row aliasing.” If you initially fixed only the IndexError, rerun the output mutation test; it guards against a second root cause that a plain equality test may miss. Suggested pacing totals 18 minutes and is flexible companion guidance, not an official limit.",
    },
    {
      id: "m5-l3-p3",
      title: "debug distinct-index two-sum validation and self-reuse",
      level: "extra",
      focus: "Debug",
      minutes: 14,
      pacing: { plan: 3, build: 6, check: 3, debrief: 2 },
      contract:
        "Repair two_sum_distinct(values, target). values must be a list of exact integers and target must be an exact integer. Return a tuple (i, j) with i < j and values[i] + values[j] == target, or return None if no such two distinct indices exist. When several pairs exist, return the pair encountered first while scanning j from left to right and retaining the earliest earlier index for each value. Raise TypeError for an invalid container, element, or target even when values has fewer than two elements. Do not mutate values.",
      examples:
        "two_sum_distinct([2, 7, 11, 15], 9) returns (0, 1). two_sum_distinct([3, 1], 6) returns None because index 0 cannot be reused. two_sum_distinct([3, 3], 6) returns (0, 1). two_sum_distinct([], 0) returns None after successful validation.",
      plan: "Read the contract clause “two distinct indices” and validate every input before considering a short-input return. Maintain a dictionary from a previously seen value to its earliest index. At index j, look for target - values[j] before adding values[j] to the dictionary. The lookup order is the proof that a returned index predates j.",
      boundary:
        "Test a one-element self-reuse temptation, an actual duplicate pair, no pair, an empty valid list, a non-list value whose length is less than two, and bool values or target. The early return belongs after validation, not before it.",
      hints: [
        "If you put the current index in seen before checking its complement, target = 2 * values[j] can incorrectly return (j, j). Check seen first.",
        "Use seen.setdefault(value, index) after the lookup to keep the earliest index; do not overwrite a prior index for the same value.",
      ],
      starter: `def two_sum_distinct(values, target):
    # INTENTIONAL BUGS FOR REPAIR: the early return bypasses validation,
    # and current index is inserted before the lookup, allowing self-reuse.
    if len(values) < 2:
        return None
    seen = {}
    for index, value in enumerate(values):
        seen[value] = index
        complement = target - value
        if complement in seen:
            return (seen[complement], index)
    return None
`,
      tests: `assert two_sum_distinct([2, 7, 11, 15], 9) == (0, 1)
assert two_sum_distinct([3, 1], 6) is None
assert two_sum_distinct([3, 3], 6) == (0, 1)
assert two_sum_distinct([], 0) is None
assert two_sum_distinct([1, 4, 2, 3], 5) == (0, 1)
try:
    two_sum_distinct('x', 1)
    assert False, 'short non-list input must still be validated'
except TypeError:
    pass
try:
    two_sum_distinct([1, True], 2)
    assert False, 'bool value should fail exact-integer policy'
except TypeError:
    pass
try:
    two_sum_distinct([1, 2], True)
    assert False, 'bool target should fail exact-integer policy'
except TypeError:
    pass
`,
      solution: `def two_sum_distinct(values, target):
    if not isinstance(values, list):
        raise TypeError('values must be a list')
    if any(type(value) is not int for value in values):
        raise TypeError('values must contain exact integers')
    if type(target) is not int:
        raise TypeError('target must be an exact integer')
    if len(values) < 2:
        return None

    seen = {}
    for index, value in enumerate(values):
        complement = target - value
        if complement in seen:
            return (seen[complement], index)
        seen.setdefault(value, index)
    return None
`,
      explanation:
        "The repaired ordering separates validation, lookup, and insertion. For each current index j, seen contains only earlier indices, so any returned pair automatically has distinct indices and i < j. Validation before the len check makes the behavior consistent for every malformed input. setdefault preserves the earliest occurrence, making the stated tie behavior reproducible.",
      complexity:
        "Let n = len(values). Validation is O(n); the one-pass dictionary scan adds expected linear work under unit-cost hashing and arithmetic. Dictionary membership and insertion are O(1) expected per item, so expected total time is O(n); pathological hashing behavior can be worse. The dictionary holds up to n entries, using O(n) auxiliary space.",
      debrief:
        "Write down the smallest input that demonstrates each bug: a non-list short input for validation order and [3, 1] with target 6 for self-reuse. Then classify the correction as an ordering/invariant repair rather than a new special case. Suggested pacing totals 14 minutes and is flexible companion guidance, not an official limit.",
    },
    {
      id: "m5-l3-p4",
      title: "validate balanced parentheses with a strict alphabet",
      level: "extra",
      focus: "Implement",
      minutes: 12,
      pacing: { plan: 2, build: 5, check: 3, debrief: 2 },
      contract:
        "Implement balanced_parentheses(text). text must be a string made only of ( and ). Return True exactly when every prefix has at least as many opening parentheses as closing parentheses and the final counts are equal. The empty string is valid and returns True. Return False for an early closing parenthesis or a final unmatched opening parenthesis. Raise ValueError for every other character, including spaces, letters, brackets, and newlines; raise TypeError when text is not a string.",
      examples:
        'balanced_parentheses("") returns True. balanced_parentheses("(()())") returns True. balanced_parentheses(")(") returns False because the first prefix closes before it opens. balanced_parentheses("(()") returns False. balanced_parentheses("()[]") raises ValueError rather than silently ignoring the brackets.',
      plan: "Validate the outer type and the entire character alphabet first, then scan with an integer depth. On (, increment. On ), decrement and return False immediately if depth becomes negative. The preliminary alphabet check raises ValueError for any invalid character, including one after an early unmatched close. After the counting loop, return whether depth is zero. The empty string reaches that final test with depth 0.",
      boundary:
        "Include empty text, one opening, one closing, a balanced nested string, an early closing string, an unmatched final opening, and illegal characters in otherwise balanced-looking text. This contract intentionally supports only () and does not treat whitespace as harmless.",
      hints: [
        "A negative depth is evidence of an unmatched close in a prefix; return False as soon as it happens instead of waiting for the end.",
        "Check all characters belong to () before any early False return. Otherwise an invalid trailing character, such as in )x, can bypass validation.",
      ],
      starter: `def balanced_parentheses(text):
    raise NotImplementedError
`,
      tests: `assert balanced_parentheses('') is True
assert balanced_parentheses('(()())') is True
assert balanced_parentheses(')(') is False
assert balanced_parentheses('(()') is False
assert balanced_parentheses('()()') is True
try:
    balanced_parentheses(')x')
    assert False, 'validate the entire alphabet before returning False'
except ValueError:
    pass
try:
    balanced_parentheses('()[]')
    assert False, 'other bracket characters should fail'
except ValueError:
    pass
try:
    balanced_parentheses('( )')
    assert False, 'spaces should fail strict alphabet'
except ValueError:
    pass
try:
    balanced_parentheses(None)
    assert False, 'non-string should fail'
except TypeError:
    pass
`,
      solution: `def balanced_parentheses(text):
    if not isinstance(text, str):
        raise TypeError('text must be a string')
    if any(character not in '()' for character in text):
        raise ValueError('text may contain only parentheses')
    depth = 0
    for character in text:
        if character == '(':
            depth += 1
        elif character == ')':
            depth -= 1
            if depth < 0:
                return False
        else:
            raise ValueError('text may contain only parentheses')
    return depth == 0
`,
      explanation:
        "depth is a compressed stack for one bracket type: it counts opens not yet matched by closes. The prefix check prevents a later opening parenthesis from incorrectly rescuing an early close. Rejecting other characters before the balance scan is part of validation, not a formatting choice, so ()[] and ( ) do not silently receive a Boolean result. The final equality check distinguishes an empty or fully matched string from a string with opens left over.",
      complexity:
        "Let n be the character count. Alphabet validation and the balance scan together examine each character at most twice, so time is O(n). It keeps only depth and the current character, so auxiliary space is O(1). It does not construct a stack because there is only one parenthesis type.",
      debrief:
        "If a result surprises you, record the first prefix where depth changes unexpectedly or the first forbidden character. That concrete trace is stronger review evidence than “parentheses felt hard.” Suggested pacing totals 12 minutes and is flexible companion guidance, not an official limit.",
    },
  ],
};
