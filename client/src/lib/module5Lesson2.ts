import type { M5Lesson } from "./module5Types";

export const module5Lesson2: M5Lesson = {
  id: 2,
  title: "Choose an Efficient, Explainable Implementation",
  short: "Make repeated work visible, then justify the tradeoff.",
  intro:
    "This original companion lesson builds on Module 4 hash maps, pointers, and matrices. Efficient code is not the cleverest-looking code: it performs work the specification actually needs, makes its policy visible, and has a complexity claim that names its assumptions. Throughout, n is the number of items in one primary list, r is a matrix row count, c is a matrix column count, m is the length of a second list, and q is the number of range queries. First write the direct, correct loop and identify a repeated computation; then decide whether preprocessing, a map, or pointers remove that repeat without obscuring the contract. These flexible companion exercises are not official assessments. For assigned CodeSignal work, use the individual Canvas Module 5 link that opens your assigned work.",
  objectives: [
    "Identify a repeated computation in a list, query, or matrix task and choose a direct implementation, a hash-based lookup, prefix preprocessing, or pointer scan with a stated reason.",
    "State honest time and space bounds using n, m, q, r, and c, separating returned output from auxiliary working storage and qualifying hash-table operations as average or expected rather than unconditional O(1).",
    "Implement and test precise policies for first-appearance ordering, duplicates, inclusive range bounds, empty inputs, and rectangular matrices before optimizing.",
  ],
  concepts: [
    {
      title: "Optimize repeated work, not a vague desire to be fast",
      text: "Start by naming what is repeated. If a program sums values from index i through j separately for every query, the same early values may be added many times. If it searches all prior events to find a group, the same comparisons recur. A direct solution is often the right first implementation when there is one result or a small input; it is also the reference that makes an optimized version testable. Do not introduce a map, prefix list, mutation, or a compressed one-liner merely because it has a fashionable asymptotic bound. Choose it when the workload has enough repeated work to repay its added state and when its contract remains easy to explain. Use n for one primary list length, m for a second-list length, q for the number of queries, r for matrix rows, and c for matrix columns. Those names prevent the misleading habit of calling every algorithm simply O(n). The stated bounds treat element hashing, comparison, and arithmetic as constant-cost; very long strings or large integers can add work.",
    },
    {
      title:
        "A map can group once while preserving a specified encounter order",
      text: "For event names, a dictionary maps each name to its growing list of indices. When an event is first seen, creating its list inserts that key at its first-appearance position; later events append their positions to the existing list. Modern Python dictionaries expose keys in insertion order, so returning the dictionary meets a first-appearance-order contract without a separate order list. Do not use a set as the result: a set discards both duplicate positions and order. The useful performance claim is careful: dictionary membership, lookup, and insertion are O(1) on average or expected under normal hash-table assumptions, so one pass is O(n) expected time. They are not a universal worst-case O(1) guarantee; an adverse hash-operation bound can make a full n-event grouping O(n squared).",
    },
    {
      title:
        "Prefix sums trade one preprocessing pass for cheap inclusive queries",
      text: "Build a prefix list P with a leading zero: P[0] = 0 and P[k] is the sum of the first k values. For an inclusive valid query (left, right), the desired sum is P[right + 1] - P[left]. The leading zero gives the same formula when left is zero and makes the list have n + 1 entries. Building P costs O(n) time and O(n) auxiliary space; each already-validated query then costs O(1), and q queries cost O(q) after preprocessing. Prefix sums are therefore O(n + q) total work, not magic O(1) for the whole task. A clear API validates every query before answering it: here a query is a pair of built-in integer indices with 0 <= left <= right < n. An empty query list deliberately returns an empty result, including when values is empty; a nonempty query on an empty values list is out of bounds.",
    },
    {
      title:
        "Pointers and rectangular loops make both storage and shape explicit",
      text: "Two sorted lists can be merged with one index per list: emit the smaller current value and advance only that list; choose the left list on equality if the contract specifies stable source precedence. This avoids repeatedly removing from a front or concatenating inputs before validation. The returned merged list is O(m + n) output space, while the two indices and scalar bookkeeping are O(1) auxiliary space. For a matrix, first decide what a matrix means. This lesson accepts a list of integer lists only when every row has the same c columns; [] is a valid 0-by-0 matrix and [[], []] is a valid 2-by-0 matrix, while mixed row lengths are rejected as ragged. A nested loop then touches every element once, O(r*c) element work, and can construct r row totals and c column totals. Those totals are required output space O(r + c), not hidden auxiliary storage.",
    },
  ],
  worked: `def stable_intersection(left: list[int], right: list[int]) -> list[int]:
    """Keep every left occurrence whose value appears at least once in right."""
    right_members = set(right)
    return [value for value in left if value in right_members]

# Duplicate policy: right is membership-only; eligible left duplicates are retained.
assert stable_intersection([4, 2, 4, 3, 2], [2, 4, 4]) == [4, 2, 4, 2]
assert stable_intersection([1, 1, 2], [1]) == [1, 1]
assert stable_intersection([9, 8], []) == []
assert stable_intersection([], [1, 2]) == []`,
  walkthrough: [
    {
      title: "Specify which duplicate policy “intersection” means",
      text: "For left = [4, 2, 4, 3, 2] and right = [2, 4, 4], this function means “retain every occurrence from left whose value is present somewhere in right.” It is not a set intersection, which would discard order and duplicates, and it is not a multiset intersection, which would retain only one occurrence of 2 because right contains only one 2. Naming that policy before coding makes [4, 2, 4, 2] the testable result.",
    },
    {
      title: "Build membership once",
      text: "Construct right_members as {2, 4}. This O(m) expected-time preprocessing replaces a scan through right for each left value. It uses O(u) auxiliary space, where u is the number of distinct values in right and u <= m. The set’s iteration order is irrelevant because the function never uses it to order output.",
    },
    {
      title: "Scan left to preserve stability",
      text: "Read left from index 0 onward. Value 4 is present, so emit 4; then emit 2, emit the next 4, skip 3, and emit the last 2. Output order is inherited entirely from left, which is why the result is stable even though membership comes from an unordered set.",
    },
    {
      title: "Account for the full design, not only a lookup",
      text: "Set construction takes O(m) expected time and the left scan takes O(n) expected time, so the expected total is O(n + m), with O(u) auxiliary set space and O(k) returned-output space for k retained occurrences. If hash operations suffer their O(size) adverse bound, this implementation has a quadratic adverse bound; do not write simply “always O(n + m).” A direct nested scan may be preferable when m is tiny, one query is all that exists, or avoiding extra memory matters more than repeated search.",
    },
  ],
  invariant:
    "For stable_intersection, immediately before processing left[index], result is exactly the eligible occurrences in left[0:index], in that original order, and right_members contains exactly the distinct values from right. For a prefix query answer, P[t] equals the sum of values[0:t] for every built prefix position t; therefore P[right + 1] - P[left] removes precisely the values before left and retains precisely the inclusive interval left through right. For merge, the output is the sorted merge of consumed prefixes and each pointer identifies the smallest unconsumed candidate of its input.",
  complexity:
    "Use the parameter that matches the shape. Grouping n events is O(n) expected time because each dictionary operation is O(1) average/expected, with O(n) returned dictionary-and-index-list space; the adverse hash-operation bound can be O(n squared). A prefix list plus q valid range queries costs O(n + q) time total, has O(n) auxiliary prefix space, and returns O(q) output. Stable intersection with a membership set is O(n + m) expected time, O(u) auxiliary set space for u distinct right values, and O(k) output; its adverse hash-operation bound is quadratic. Pointer merge including validation is O(m + n) time, O(1) auxiliary space beyond its O(m + n) output list. Rectangular totals visit r*c elements and perform an O(r) row-shape check, so O(r*c + r) time; when c >= 1 this is O(r*c), while a valid r-by-0 matrix still needs O(r) row checks. Its returned totals use O(r + c) output space and the arithmetic bookkeeping uses O(1) auxiliary space.",
  pitfalls: [
    {
      title: "Calling a hash lookup unconditional O(1)",
      text: "A Python dictionary or set is a strong practical choice for membership and grouping, but say O(1) average or expected per operation and identify the resulting expected whole-algorithm bound. A collision-heavy adverse bound changes the worst-case analysis. Also distinguish the unordered set used for membership from the ordered scan or dictionary insertion order that determines an observable result.",
    },
    {
      title: "Treating prefix sums as free or accepting invalid intervals",
      text: "P[right + 1] - P[left] is O(1) only after an O(n) preprocessing pass and an O(n)-space prefix list. Do not silently let Python negative indices reinterpret a query, let right equal n, or accept left > right. Validate the complete query list under the stated empty-query policy before calculating results so callers receive a clear TypeError or ValueError rather than a plausible wrong sum.",
    },
    {
      title: "Hiding costs and shape assumptions",
      text: "A new returned list is output space; a prefix list, map, or set retained only to do the work is auxiliary space. Report both. Likewise, a nested matrix loop is meaningful only after deciding whether empty matrices, empty rows, and ragged rows are valid. Do not use concatenation or slices merely to make validation terse when a pointer-based implementation promises not to create those intermediate copies.",
    },
  ],
  checks: [
    {
      question:
        "Predict before revealing: values is [5, -2, 7, 1]. With P = [0, 5, 3, 10, 11], what inclusive sum should query (1, 3) return, and which two prefix positions are subtracted?",
      answer:
        "Reveal: it returns P[4] - P[1] = 11 - 5 = 6, matching -2 + 7 + 1. P[right + 1] includes the right endpoint; subtracting P[left] removes exactly the values before left. Building P took one linear pass, so the arithmetic is O(1) per query only after that preprocessing.",
    },
    {
      question:
        'Predict before revealing: events is ["open", "save", "open", "close", "save"]. A dictionary creates a list on first sight and appends each index. What key order and value lists result, and why would returning a set of names be insufficient?',
      answer:
        'Reveal: the key order is ["open", "save", "close"] and the mapping is {"open": [0, 2], "save": [1, 4], "close": [3]}. Dictionary insertion order records the first encounter, while each appended index preserves repeated-event positions. A set would only retain the names, has no index lists, and provides no encounter-order contract.',
    },
  ],
  reflection:
    "Choose a small program of yours that rescans data, such as filtering events, answering totals, or processing a table. Write a short before/after note: identify the repeated work; state whether one direct scan or preprocessing is justified; name n, q, r, or c as appropriate; and label each new structure as auxiliary or output space. Include one explicit duplicate, empty-input, or invalid-bound policy. Then complete the actual assigned CodeSignal work through your individual Canvas Module 5 link, using this note to explain your implementation choices. This is a reflective action, not a scored quiz.",
  sources: [
    {
      label:
        "Python Software Foundation, Data Structures (sets and dictionaries)",
      href: "https://docs.python.org/3/tutorial/datastructures.html",
    },
    {
      label: "Python Software Foundation, itertools.accumulate",
      href: "https://docs.python.org/3/library/itertools.html",
    },
    {
      label: "MIT OpenCourseWare, 6.006 Lecture 4: Hashing",
      href: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-4-hashing/",
    },
  ],
  practices: [
    {
      id: "m5-l2-p1",
      title: "Group event indices in first-appearance order",
      level: "core",
      focus: "Implement",
      minutes: 18,
      pacing: { plan: 4, build: 8, check: 4, debrief: 2 },
      contract:
        "Implement group_event_indices(events). events must be a Python list whose elements are built-in strings. Return a new dictionary mapping every event name to a new list of all zero-based indices where it occurs. Keys must appear in the dictionary in the order of each name’s first occurrence; each index list must be in ascending encounter order. Do not mutate events. Raise TypeError for a non-list or for any element that is not a built-in string.",
      examples:
        'group_event_indices(["login", "view", "login", "logout", "view"]) returns {"login": [0, 2], "view": [1, 4], "logout": [3]}, with keys ordered login, view, logout. group_event_indices([]) returns {}. group_event_indices(["", ""]) returns {"": [0, 1]}.',
      plan: "Use one left-to-right enumerate pass. Validate the list and every element before building output. When a name is not a key, create its empty index list; then append the current index. Creating a key only on its first encounter establishes the required dictionary key order.",
      boundary:
        "The empty list returns an empty dictionary. Repeated names retain every distinct position. The empty string is a valid event name. A tuple of names, a non-string event, and bool or integer values are invalid and raise TypeError; do not coerce them with str().",
      hints: [
        "Dictionary insertion happens only when a name is first seen, so test membership before assigning its first empty list.",
        "Use enumerate(events) so the stored index comes from the original encounter order; append rather than replacing a prior list.",
      ],
      starter: `def group_event_indices(events: list[str]) -> dict[str, list[int]]:
    raise NotImplementedError`,
      tests: `def assert_raises(expected_exception, thunk):
    try:
        thunk()
    except expected_exception:
        return
    raise AssertionError('expected exception was not raised')

assert group_event_indices([]) == {}
assert group_event_indices(['', '']) == {'': [0, 1]}
grouped = group_event_indices(['login', 'view', 'login', 'logout', 'view'])
assert list(grouped) == ['login', 'view', 'logout']
assert grouped == {'login': [0, 2], 'view': [1, 4], 'logout': [3]}
assert_raises(TypeError, lambda: group_event_indices(('login', 'logout')))
assert_raises(TypeError, lambda: group_event_indices(['login', 7]))
assert_raises(TypeError, lambda: group_event_indices(['login', True]))`,
      solution: `def group_event_indices(events: list[str]) -> dict[str, list[int]]:
    if not isinstance(events, list):
        raise TypeError('events must be a list of built-in strings')
    if any(type(event) is not str for event in events):
        raise TypeError('events must contain only built-in strings')

    groups: dict[str, list[int]] = {}
    for index, event in enumerate(events):
        if event not in groups:
            groups[event] = []
        groups[event].append(index)
    return groups`,
      explanation:
        "The validation pass fixes the contract before output construction. During the main pass, groups contains exactly the names encountered so far in their first-appearance order, and each stored list contains exactly that name’s earlier indices in ascending order. A new key is created precisely at a first encounter; later occurrences only append. The returned dictionary and its nested lists are the requested result, not temporary overhead.",
      complexity:
        "Validation is O(n). The grouping pass is O(n) expected time when dictionary membership and insertion are O(1) average/expected; the adverse hash-operation bound can make it O(n squared). The returned mapping holds n total indices plus distinct keys, so output space is O(n). Beyond that returned object, the implementation uses O(1) auxiliary scalar storage and does not mutate events.",
      debrief:
        "A nested scan of prior event names can be easier to write but repeats comparisons as the stream grows. The map chooses one stored bucket per name and keeps encounter order explainable. After local checks, complete related assigned CodeSignal work only through your individual Canvas Module 5 link; this 18-minute pacing is a flexible companion suggestion, not an assessment limit.",
    },
    {
      id: "m5-l2-p2",
      title: "Answer validated inclusive range sums",
      level: "core",
      focus: "Implement",
      minutes: 20,
      pacing: { plan: 5, build: 9, check: 4, debrief: 2 },
      contract:
        "Implement inclusive_range_sums(values, queries). values must be a Python list of built-in integers. queries must be a Python list of two-item tuples (left, right), where left and right are built-in integers. Return a new list in query order; each result is the inclusive sum values[left] through values[right]. The empty query list returns [] even if values is empty. Every nonempty query must satisfy 0 <= left <= right < len(values). Raise TypeError for invalid container, tuple shape, or index/value type, and ValueError for invalid bounds. Do not mutate either input.",
      examples:
        "inclusive_range_sums([3, -1, 4, 2], [(0, 0), (0, 3), (1, 2), (3, 3)]) returns [3, 8, 3, 2]. inclusive_range_sums([], []) returns []. inclusive_range_sums([10], [(0, 0)]) returns [10].",
      plan: "Validate values, queries, every query shape, and all bounds before producing answers. Build prefix = [0], then append each running sum. For each validated (left, right), append prefix[right + 1] - prefix[left]. State both phases: one O(n) preprocessing pass and O(1) arithmetic per query.",
      boundary:
        "An empty values list is allowed only with no queries under this contract. A query with left < 0, right >= n, or left > right raises ValueError. A list instead of a query tuple, a tuple with the wrong length, and True used as an index raise TypeError. Negative values in values are valid and must be summed normally.",
      hints: [
        "Put zero at prefix[0], then after reading values[index], append the sum through that index. This makes the same subtraction work for left = 0.",
        "Validate every query before building answers: for a valid pair, use 0 <= left <= right < len(values), then calculate prefix[right + 1] - prefix[left].",
      ],
      starter: `def inclusive_range_sums(values: list[int], queries: list[tuple[int, int]]) -> list[int]:
    raise NotImplementedError`,
      tests: `def assert_raises(expected_exception, thunk):
    try:
        thunk()
    except expected_exception:
        return
    raise AssertionError('expected exception was not raised')

assert inclusive_range_sums([], []) == []
assert inclusive_range_sums([3, -1, 4, 2], [(0, 0), (0, 3), (1, 2), (3, 3)]) == [3, 8, 3, 2]
assert inclusive_range_sums([10], [(0, 0)]) == [10]
assert inclusive_range_sums([-5, -2, -3], [(0, 2), (1, 1)]) == [-10, -2]
assert_raises(ValueError, lambda: inclusive_range_sums([], [(0, 0)]))
assert_raises(ValueError, lambda: inclusive_range_sums([1, 2], [(-1, 0)]))
assert_raises(ValueError, lambda: inclusive_range_sums([1, 2], [(1, 0)]))
assert_raises(ValueError, lambda: inclusive_range_sums([1, 2], [(0, 2)]))
assert_raises(TypeError, lambda: inclusive_range_sums([1, True], []))
assert_raises(TypeError, lambda: inclusive_range_sums([1, 2], [[0, 1]]))
assert_raises(TypeError, lambda: inclusive_range_sums([1, 2], [(True, 1)]))`,
      solution: `def inclusive_range_sums(values: list[int], queries: list[tuple[int, int]]) -> list[int]:
    if not isinstance(values, list) or not isinstance(queries, list):
        raise TypeError('values and queries must be lists')
    if any(type(value) is not int for value in values):
        raise TypeError('values must contain only built-in integers')
    for query in queries:
        if type(query) is not tuple or len(query) != 2:
            raise TypeError('each query must be a two-item tuple')
        left, right = query
        if type(left) is not int or type(right) is not int:
            raise TypeError('query bounds must be built-in integers')
        if left < 0 or left > right or right >= len(values):
            raise ValueError('query bounds must satisfy 0 <= left <= right < len(values)')

    prefix = [0]
    for value in values:
        prefix.append(prefix[-1] + value)

    answers: list[int] = []
    for left, right in queries:
        answers.append(prefix[right + 1] - prefix[left])
    return answers`,
      explanation:
        "P[t] is the sum of exactly the first t values, starting with P[0] = 0. Thus P[right + 1] contains the target interval and all earlier values, while P[left] contains exactly the earlier values to remove. Validation is deliberately complete before answer construction, so an invalid later query cannot yield a partially returned answer. The empty-query policy needs no special branch: it builds a valid prefix if values exists and returns the empty answers list; with empty values it also returns [].",
      complexity:
        "Let n be len(values) and q be len(queries). Validation, prefix construction, and answer construction take O(n + q) time total. The prefix list is O(n) auxiliary working space, and answers is O(q) required output space. A single query is O(1) only after the O(n) prefix preprocessing; the total operation is not O(1).",
      debrief:
        "Compare this to adding every interval directly: direct work can be O(n) per wide query, while prefix sums pay once and reuse the result. The additional O(n) prefix storage is justified only when the repeated-query workload supports it. This 20-minute pacing is a flexible companion suggestion, not an official time limit.",
    },
    {
      id: "m5-l2-p3",
      title: "Merge sorted lists without temporary concatenation",
      level: "extra",
      focus: "Implement",
      minutes: 14,
      pacing: { plan: 3, build: 6, check: 3, debrief: 2 },
      contract:
        "Implement merge_sorted(left, right). left and right must each be Python lists of built-in integers in nondecreasing order. Return a new nondecreasing list containing every input occurrence. When equal current values are compared, append from left first. Do not mutate either input, do not concatenate inputs, do not use slices in validation, and do not use slices to append a remaining suffix. Raise TypeError for non-list inputs or non-integer elements and ValueError for an unsorted input.",
      examples:
        "merge_sorted([1, 2, 2, 8], [2, 3, 8]) returns [1, 2, 2, 2, 3, 8, 8]. merge_sorted([], [1, 1]) returns [1, 1]. merge_sorted([], []) returns a new empty list.",
      plan: "Validate each input independently with adjacent indexed comparisons, not a concatenated copy. Keep left_index and right_index. While neither is exhausted, append the smaller front value, choosing left on equality. Then use index loops to append the unconsumed suffix one value at a time.",
      boundary:
        "Either or both inputs may be empty. Duplicates are retained once for every occurrence, and equality chooses the left source first. Negative values are valid. A decreasing adjacent pair is invalid even if a later value would make the total output appear mostly sorted. Inputs remain unchanged.",
      hints: [
        "For each list, adjacent indices i and i + 1 are enough to verify nondecreasing order; no combined list is needed.",
        "After a pointer reaches its list length, the other list’s remaining values are already sorted, but append them in a while loop rather than with a slice.",
      ],
      starter: `def merge_sorted(left: list[int], right: list[int]) -> list[int]:
    raise NotImplementedError`,
      tests: `def assert_raises(expected_exception, thunk):
    try:
        thunk()
    except expected_exception:
        return
    raise AssertionError('expected exception was not raised')

assert merge_sorted([], []) == []
assert merge_sorted([], [1, 1]) == [1, 1]
assert merge_sorted([1, 2, 2, 8], [2, 3, 8]) == [1, 2, 2, 2, 3, 8, 8]
left_values = [-3, 4]
right_values = [-2, 4, 9]
assert merge_sorted(left_values, right_values) == [-3, -2, 4, 4, 9]
assert left_values == [-3, 4]
assert right_values == [-2, 4, 9]
assert_raises(ValueError, lambda: merge_sorted([2, 1], [3]))
assert_raises(TypeError, lambda: merge_sorted([1, True], [2]))
assert_raises(TypeError, lambda: merge_sorted([1], (2,)))`,
      solution: `def merge_sorted(left: list[int], right: list[int]) -> list[int]:
    if not isinstance(left, list) or not isinstance(right, list):
        raise TypeError('left and right must be lists of built-in integers')
    if any(type(value) is not int for value in left):
        raise TypeError('left must contain only built-in integers')
    if any(type(value) is not int for value in right):
        raise TypeError('right must contain only built-in integers')
    for index in range(len(left) - 1):
        if left[index] > left[index + 1]:
            raise ValueError('left must be in nondecreasing order')
    for index in range(len(right) - 1):
        if right[index] > right[index + 1]:
            raise ValueError('right must be in nondecreasing order')

    merged: list[int] = []
    left_index = 0
    right_index = 0
    while left_index < len(left) and right_index < len(right):
        if left[left_index] <= right[right_index]:
            merged.append(left[left_index])
            left_index += 1
        else:
            merged.append(right[right_index])
            right_index += 1
    while left_index < len(left):
        merged.append(left[left_index])
        left_index += 1
    while right_index < len(right):
        merged.append(right[right_index])
        right_index += 1
    return merged`,
      explanation:
        "Before each comparison, merged is the stable sorted merge of the consumed prefixes, and the two pointers name the first unconsumed values. The smaller front value is safe to emit because no later value in that same sorted input can be smaller. Choosing left on equality is an explicit stable-source policy. Once one input ends, the remaining suffix of the other is already sorted, so indexed appends preserve the invariant without a copy-producing slice.",
      complexity:
        "With m = len(left) and n = len(right), validation and merging are O(m + n) time. The returned merged list is O(m + n) output space. The indices and scalars use O(1) auxiliary space beyond the output, and validation creates no concatenated or sliced temporary list.",
      debrief:
        "This is a pointer solution because each input position advances once. It is clearer and more predictably linear than repeatedly deleting a first element, which shifts a Python list. This 14-minute pacing is a flexible companion suggestion, not an assessment limit.",
    },
    {
      id: "m5-l2-p4",
      title: "Row and column totals for a rectangular matrix",
      level: "extra",
      focus: "Plan",
      minutes: 16,
      pacing: { plan: 4, build: 7, check: 3, debrief: 2 },
      contract:
        "Implement matrix_totals(matrix). matrix must be a Python list of rows, where every row is a Python list of built-in integers and every row has the same length. Return (row_totals, column_totals), two new lists: row_totals[i] is the sum of row i and column_totals[j] is the sum of column j. The empty outer matrix [] returns ([], []). A nonempty zero-column matrix such as [[], []] is valid and returns ([0, 0], []). Reject ragged rows with ValueError and invalid outer/row/value types with TypeError. Do not mutate matrix.",
      examples:
        "matrix_totals([[1, 2, 3], [4, 5, 6]]) returns ([6, 15], [5, 7, 9]). matrix_totals([]) returns ([], []). matrix_totals([[], []]) returns ([0, 0], []).",
      plan: "Validate the outer list. If it is empty, return two empty lists. Otherwise set c from the first row length, validate every row is a list of exactly c built-in integers, then allocate c zero column totals. For each row, accumulate a scalar row total and add each element to its matching column slot before appending the row total.",
      boundary:
        "[] means no rows and no columns. [[], []] means two valid rows with zero columns, producing one zero per row and no column totals. [[1], [2, 3]] is ragged and raises ValueError. A tuple row, True as a cell, or a non-list outer container raises TypeError before any totals are returned.",
      hints: [
        "The first valid row establishes c. Check every later len(row) against c before treating matching indices as columns.",
        "Initialize column_totals with one zero per column. For each cell at column_index, add to both the current row_total and column_totals[column_index].",
      ],
      starter: `def matrix_totals(matrix: list[list[int]]) -> tuple[list[int], list[int]]:
    raise NotImplementedError`,
      tests: `def assert_raises(expected_exception, thunk):
    try:
        thunk()
    except expected_exception:
        return
    raise AssertionError('expected exception was not raised')

assert matrix_totals([]) == ([], [])
assert matrix_totals([[], []]) == ([0, 0], [])
assert matrix_totals([[1, 2, 3], [4, 5, 6]]) == ([6, 15], [5, 7, 9])
assert matrix_totals([[-1, 2], [3, -4], [0, 0]]) == ([1, -1, 0], [2, -2])
assert_raises(ValueError, lambda: matrix_totals([[1], [2, 3]]))
assert_raises(TypeError, lambda: matrix_totals([(1, 2)]))
assert_raises(TypeError, lambda: matrix_totals([[1, True]]))
assert_raises(TypeError, lambda: matrix_totals('not a matrix'))`,
      solution: `def matrix_totals(matrix: list[list[int]]) -> tuple[list[int], list[int]]:
    if not isinstance(matrix, list):
        raise TypeError('matrix must be a list of rows')
    if not matrix:
        return ([], [])

    first_row = matrix[0]
    if not isinstance(first_row, list):
        raise TypeError('each row must be a list of built-in integers')
    column_count = len(first_row)
    for row in matrix:
        if not isinstance(row, list):
            raise TypeError('each row must be a list of built-in integers')
        if len(row) != column_count:
            raise ValueError('matrix must be rectangular')
        if any(type(value) is not int for value in row):
            raise TypeError('each row must contain only built-in integers')

    row_totals: list[int] = []
    column_totals = [0] * column_count
    for row in matrix:
        row_total = 0
        for column_index, value in enumerate(row):
            row_total += value
            column_totals[column_index] += value
        row_totals.append(row_total)
    return (row_totals, column_totals)`,
      explanation:
        "The precondition makes column_index meaningful for every row. Once validation finishes, the nested-loop invariant is: after visiting a row prefix through column_index - 1, row_total is that prefix’s sum and each column_totals entry holds the sum of that column across all completed rows plus the visited part of this row. Adding the current value to both restores the invariant. Empty rows execute no inner iterations but still append a correct row total of zero.",
      complexity:
        "For r rows and c columns, validation and summation inspect r*c cell positions plus O(r) row-shape checks: O(r*c + r) time. This is O(r*c) when c >= 1; a valid r-by-0 matrix still takes O(r) to validate its rows. The returned row and column lists are O(r + c) output space. Apart from those outputs and scalar counters, auxiliary working space is O(1).",
      debrief:
        "The design makes rectangularity an explicit contract rather than allowing an accidental IndexError or silently ignoring extra cells. It also illustrates why output arrays should not be mislabeled as auxiliary overhead. This 16-minute pacing is a flexible companion suggestion, not an official time limit.",
    },
  ],
};
