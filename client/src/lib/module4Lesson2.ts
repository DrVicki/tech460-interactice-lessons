import type { M4Lesson } from './module4Types';

export const module4Lesson2: M4Lesson = {
  id: 2,
  title: 'Two Pointers: Pair Sum and Compaction',
  short: 'Let the invariant move the pointers.',
  intro: 'This companion lesson for senior college students develops two-pointer reasoning rather than reproducing an official course prompt. Two indices can turn repeated scanning into one directed pass when ordering or a maintained region makes discarded work provably irrelevant. We will use sorted pair sum and stable in-place compaction as the core patterns, then extend the same reasoning to palindromes, merging sorted inputs, and a fixed-size sliding window.',
  objectives: [
    'Use sorted order to choose a safe pointer movement for pair sum and state the elimination argument that proves it does not discard a solution.',
    'Implement read/write compaction that preserves the relative order of retained values while using constant auxiliary working space.',
    'Compare two-pointer, sorting, and hash-based designs by their time, auxiliary-space, output-space, mutation, and original-index tradeoffs.'
  ],
  concepts: [
    {
      title: 'Sorted pair sum is an elimination algorithm',
      text: 'For a nondecreasing array, place left at the smallest candidate and right at the largest. If values[left] + values[right] is too small, every pair using values[left] with an index at most right is also too small, because no available partner is larger than values[right]. Move left. If the sum is too large, every pair using values[right] with an index at least left is also too large, because no available partner is smaller than values[left]. Move right. Equality supplies a pair of distinct positions. Each move permanently eliminates one boundary position, so the scan is linear after the input is sorted. Sorting an unsorted input costs O(n log n) time. Sorting values alone also changes positions; decorate each value with its original index when an answer must refer to the original input.'
    },
    {
      title: 'Read/write compaction separates inspection from placement',
      text: 'Use read to inspect every cell once and write to mark the next retained position. When a read value is kept, write it at values[write] and advance write; when it is rejected, only read advances. The key invariant is that the prefix before write is exactly the retained items seen so far, in their original order. After the scan, write is the logical length. Clearing the remaining physical cells is optional in many APIs, but doing so makes the postcondition visible in a teaching example. This is stable compaction: duplicates that are retained stay in their encounter order.'
    },
    {
      title: 'Opposite ends test a symmetric property',
      text: 'A palindrome scan compares the leftmost and rightmost unchecked characters. A mismatch disproves the property immediately. A match lets both boundaries move inward because those two positions are now certified. The invariant is that all pairs outside the current interval already match their mirror positions. This direct character version treats every character as significant, so spaces, punctuation, case, and Unicode code points are not silently normalized. If a specification instead asks for case-insensitive alphanumeric comparison, normalization must be stated and implemented explicitly.'
    },
    {
      title: 'Synchronized forward scans have useful extensions',
      text: 'Merging two sorted inputs uses one pointer in each input and repeatedly emits the smaller current value. It preserves duplicates and needs a new output list of size m + n; that output is required output space, while the pointer bookkeeping uses O(1) additional working space. A fixed-size sliding window is a related extension, not the same opposite-end pattern: retain the sum for one contiguous window, then subtract the value leaving and add the value entering as both window boundaries advance. This produces O(n) time instead of recomputing each window sum. A hash-table pair-sum alternative can preserve original indices without sorting and is O(n) expected time with O(n) auxiliary space, but dictionary lookup is O(1) average case and O(n) worst case, so the adverse hash-operation bound can make the full scan O(n squared).'
    }
  ],
  worked: `def pair_sum_with_original_indices(numbers: list[int], target: int) -> tuple[int, int] | None:
    # Keep each original index before sorting values for the two-pointer scan.
    ordered = sorted((value, index) for index, value in enumerate(numbers))
    left = 0
    right = len(ordered) - 1

    while left < right:
        total = ordered[left][0] + ordered[right][0]
        if total == target:
            first_index = ordered[left][1]
            second_index = ordered[right][1]
            return tuple(sorted((first_index, second_index)))
        if total < target:
            left += 1
        else:
            right -= 1
    return None

assert pair_sum_with_original_indices([4, 1, 3, 2, 2], 4) == (1, 2)
assert pair_sum_with_original_indices([3, 3], 6) == (0, 1)
assert pair_sum_with_original_indices([-5, -2, 1, 7], 2) == (0, 3)
assert pair_sum_with_original_indices([], 10) is None
assert pair_sum_with_original_indices([1, 2, 3], 100) is None`,
  walkthrough: [
    {
      title: '1. Preserve identity before ordering',
      text: 'For the input [4, 1, 3, 2, 2], pair every value with its original position. Sorting produces [(1, 1), (2, 3), (2, 4), (3, 2), (4, 0)]. The first number in each pair determines comparisons, while the second remains available for the result.'
    },
    {
      title: '2. Start at the extreme candidates',
      text: 'Set left to the pair holding value 1 and right to the pair holding value 4. Their sum is 5, which is greater than target 4. No pair using value 4 can succeed with any remaining candidate because every other candidate is at least 1.'
    },
    {
      title: '3. Eliminate the too-large boundary',
      text: 'Move right to value 3. Now 1 + 3 equals 4, so the stored original indices are 1 and 2. Returning them in increasing order makes the result representation deterministic even though the scan runs over a sorted copy.'
    },
    {
      title: '4. Understand the duplicate case',
      text: 'The two values 2 occupy different decorated records, so a target of 4 could be formed by them when the scan reaches those positions. The condition left < right prevents one occurrence from being reused as both members of a pair.'
    },
    {
      title: '5. Account for the design choice',
      text: 'The pointer scan itself is O(n), but creating and sorting the decorated list dominates at O(n log n). The decorated list uses O(n) auxiliary space and protects original positions. A one-pass hash-table design avoids sorting but has O(n) expected time, O(n) auxiliary space, and an O(n squared) worst-case bound under pathological hash behavior.'
    }
  ],
  invariant: 'Sorted pair sum invariant: at the start of every loop, no pair containing an index strictly below left or strictly above right can sum to target, and every still-possible pair has both indices in the inclusive interval from left through right. A too-small boundary sum eliminates left because even its largest remaining partner is insufficient; a too-large boundary sum eliminates right because even its smallest remaining partner is excessive. Read/write compaction invariant: before each read step, values[0:write] is exactly the retained subsequence among the values already read, in encounter order.',
  complexity: 'For an already sorted pair-sum input, the opposing pointers move at most n - 1 times: O(n) time and O(1) auxiliary space. Sorting an unsorted n-item input first is O(n log n) time; a decorated sorted copy uses O(n) auxiliary space and preserves original indices, while an in-place sort mutates order and still loses the value-to-original-index mapping unless indices are retained. A hash-table pair scan is O(n) expected time and O(n) auxiliary space, but its lookup operations are O(1) average case and O(n) worst case, yielding O(n squared) in the adverse bound. Stable compaction, palindrome scanning, and a fixed-size sliding-window scan are O(n) time and O(1) auxiliary space. Merging sorted inputs is O(m + n) time; its returned list is O(m + n) output space and its bookkeeping beyond that output is O(1).',
  pitfalls: [
    {
      title: 'Moving the wrong pointer',
      text: 'On a sorted pair-sum scan, moving right after a sum that is too small can only make the sum smaller, and moving left after a sum that is too large can only make it larger. Tie each movement to the monotonicity proof rather than to intuition.'
    },
    {
      title: 'Confusing a sorted value with its original location',
      text: 'Returning positions from a sorted copy returns positions in that copy, not in the caller’s data. Either require a sorted-input API that returns sorted positions, or decorate values with original indices before sorting. Avoid in-place sorting when the caller needs the original order unchanged.'
    },
    {
      title: 'Overwriting unread data during compaction',
      text: 'The write index must never get ahead of read. Advancing write only after retaining the current read value preserves unread cells and the stable retained prefix. Do not call repeated middle deletions on a Python list, because each deletion shifts later elements and can turn an intended linear pass into quadratic work.'
    }
  ],
  checks: [
    {
      question: 'Predict before revealing: The sorted array is [1, 2, 2, 7, 9] and target is 4. The first comparison is 1 + 9 = 10. Which pointer moves, and why is it safe even though there are duplicate 2 values?',
      answer: 'Reveal: right moves from 9 to 7. Because 1 + 9 is too large, every pair that uses 9 with an index at or to the right of left is at least 1 + 9 and is also too large; 9 cannot participate in a solution. The duplicate 2 values remain inside the candidate interval. The scan next sees 1 + 7, then 1 + 2, and finally the two distinct 2 positions can form the target. The proof eliminates values by order, not by uniqueness.'
    },
    {
      question: 'Predict before revealing: A read/write pass removes zeroes from [0, 5, 0, 5, 2]. After read has inspected the first four items, what are write and the meaningful prefix of the list?',
      answer: 'Reveal: write is 2 and the meaningful prefix is [5, 5]. The two zeroes were inspected but not copied. Each retained 5 was written at the next available prefix position, in the same order it was read. The value 2 has not yet been inspected, so it is not part of the invariant. After the final step, write becomes 3 and the compacted prefix is [5, 5, 2].'
    }
  ],
  reflection: 'Choose one small data-processing task you have written or reviewed that repeatedly rescans a list or deletes items from its middle. Write a short design note that names the scan boundaries, states one loop invariant in your own words, identifies whether input order and original indices must be preserved, and compares a two-pointer or sliding-window redesign with a hash-based alternative. Include one boundary case involving an empty input, a duplicate, or a window that does not fit. This is a reflective action, not a scored quiz.',
  practices: [
    {
      id: 'm4-l2-p1',
      title: 'Core: Find a pair in a sorted list',
      level: 'core',
      difficulty: 'Build',
      contract: 'Implement pair_sum_sorted(values, target). values must be a Python list of built-in integers in nondecreasing order, and target must be a built-in integer. Return the tuple (i, j) for the first equality encountered by the standard scan that begins at the two ends and moves left on a too-small sum or right on a too-large sum. Return None when no pair of distinct indices exists. This tie policy makes duplicate cases deterministic.',
      plan: 'Validate the list shape, integer values, target type, and nondecreasing precondition. Set left and right at opposite ends. Compare their sum with target, move only the boundary proved impossible by sorted order, and stop on equality or crossing.',
      boundary: 'An empty or one-item valid list returns None. Equal values may form a pair only when they occupy two distinct indices. A non-list or a non-integer value or target raises TypeError. A decreasing adjacent pair raises ValueError rather than silently applying a sorted-input algorithm to invalid data.',
      hints: [
        'For a sum smaller than target, ask whether keeping the current left value and choosing any smaller partner could help.',
        'Check sortedness before the scan with a pass over adjacent positions, then use while left < right so one item cannot be used twice.'
      ],
      starter: `def pair_sum_sorted(values: list[int], target: int) -> tuple[int, int] | None:
    raise NotImplementedError`,
      tests: `def assert_raises(expected_exception, thunk):
    try:
        thunk()
    except expected_exception:
        return
    raise AssertionError(f'expected {expected_exception.__name__}')

assert pair_sum_sorted([], 5) is None
assert pair_sum_sorted([8], 16) is None
assert pair_sum_sorted([1, 2, 2, 5], 4) == (1, 2)
assert pair_sum_sorted([-3, -1, 0, 4, 8], 3) == (1, 3)
assert pair_sum_sorted([1, 2, 3, 9], 10) == (0, 3)
assert_raises(ValueError, lambda: pair_sum_sorted([2, 1], 3))
assert_raises(TypeError, lambda: pair_sum_sorted((1, 2), 3))
assert_raises(TypeError, lambda: pair_sum_sorted([1, True], 2))`,
      solution: `def pair_sum_sorted(values: list[int], target: int) -> tuple[int, int] | None:
    if not isinstance(values, list) or type(target) is not int:
        raise TypeError('values must be a list of integers and target must be an integer')
    if any(type(value) is not int for value in values):
        raise TypeError('values must contain only built-in integers')
    if any(values[index] > values[index + 1] for index in range(len(values) - 1)):
        raise ValueError('values must be in nondecreasing order')

    left = 0
    right = len(values) - 1
    while left < right:
        total = values[left] + values[right]
        if total == target:
            return (left, right)
        if total < target:
            left += 1
        else:
            right -= 1
    return None`,
      explanation: 'Validation defines the API before the proof begins. During the scan, every index outside the current interval has already been ruled out. If the boundary sum is too small, the left value cannot reach target with any remaining partner, so left advances. If the sum is too large, the right value cannot reach target with any remaining partner, so right retreats. Each iteration moves one boundary, duplicates remain valid candidates at distinct positions, and crossing proves that no pair remains.',
      complexity: 'Validation and the scan each take O(n) time, so total time is O(n). The function stores only indices and scalar values: O(1) auxiliary space. The returned two-index tuple is O(1) output space.'
    },
    {
      id: 'm4-l2-p2',
      title: 'Core: Stable read/write compaction',
      level: 'core',
      difficulty: 'Build',
      contract: 'Implement compact_remove(values, removed). values must be a Python list of built-in integers and removed must be a built-in integer. Mutate values so that its prefix contains every value not equal to removed in original order, fill the remaining cells with None, and return the number of retained values. The function returns the logical length, not a new list.',
      plan: 'Validate once before mutating. Let read visit every original cell and let write identify the next retained prefix cell. Copy a kept read value to write, then advance write. After the read pass, overwrite the tail from write onward with None.',
      boundary: 'An empty list returns 0. If every value equals removed, the list becomes all None and the result is 0. If no value equals removed, values keeps the same sequence and the result is its length. Duplicate retained values remain duplicated and retain their relative order. Invalid shapes raise TypeError before any mutation.',
      hints: [
        'write is a count of retained items, so it starts at zero and moves only when a value is kept.',
        'Do not delete items while iterating. After all reads finish, use a second loop to make the unused tail explicit.'
      ],
      starter: `def compact_remove(values: list[int], removed: int) -> int:
    raise NotImplementedError`,
      tests: `def assert_raises(expected_exception, thunk):
    try:
        thunk()
    except expected_exception:
        return
    raise AssertionError(f'expected {expected_exception.__name__}')

numbers = [3, 2, 3, 2, 1]
assert compact_remove(numbers, 2) == 3
assert numbers == [3, 3, 1, None, None]
empty = []
assert compact_remove(empty, 9) == 0
assert empty == []
all_removed = [4, 4, 4]
assert compact_remove(all_removed, 4) == 0
assert all_removed == [None, None, None]
unchanged = [1, 1, 2]
assert compact_remove(unchanged, 9) == 3
assert unchanged == [1, 1, 2]
assert_raises(TypeError, lambda: compact_remove((1, 2), 1))
assert_raises(TypeError, lambda: compact_remove([1, False], 0))`,
      solution: `def compact_remove(values: list[int], removed: int) -> int:
    if not isinstance(values, list) or type(removed) is not int:
        raise TypeError('values must be a list of integers and removed must be an integer')
    if any(type(value) is not int for value in values):
        raise TypeError('values must contain only built-in integers')

    write = 0
    for read in range(len(values)):
        if values[read] != removed:
            values[write] = values[read]
            write += 1

    for index in range(write, len(values)):
        values[index] = None
    return write`,
      explanation: 'Before each read position is processed, the prefix ending before write contains exactly the retained values among the already-read positions, in the same order. A rejected value leaves write unchanged. A retained value is copied to the next prefix slot, which is never ahead of read, then write advances. The tail-clearing pass does not change the logical result; it makes the physical representation deterministic for callers and tests.',
      complexity: 'The validation, read pass, and tail-clearing pass are each O(n), so total time is O(n). The procedure uses O(1) auxiliary working space. It mutates the supplied list and returns only an integer; it allocates no separate output list.'
    },
    {
      id: 'm4-l2-p3',
      title: 'Extra: Exact palindrome scan',
      level: 'extra',
      difficulty: 'Debug',
      contract: 'Implement is_palindrome_text(text). text must be a Python string. Return True exactly when text reads identically from left to right and right to left by exact character equality. Do not ignore case, spaces, punctuation, or Unicode characters. Return True for the empty string and for one-character strings.',
      plan: 'Reject a non-string. Compare the two current boundary characters while left is below right. A mismatch can return False immediately. A match certifies both characters and permits both boundaries to move inward.',
      boundary: 'The empty string is a palindrome by the universal condition that no mirrored pair mismatches. One character is also a palindrome. Repeated characters are compared as separate positions. A non-string raises TypeError rather than being coerced with str().',
      hints: [
        'The middle character of an odd-length string does not need to compare with a different character.',
        'Use exact equality on text[left] and text[right]; do not call lower(), strip(), or isalnum() because this contract keeps every character significant.'
      ],
      starter: `def is_palindrome_text(text: str) -> bool:
    raise NotImplementedError`,
      tests: `def assert_raises(expected_exception, thunk):
    try:
        thunk()
    except expected_exception:
        return
    raise AssertionError(f'expected {expected_exception.__name__}')

assert is_palindrome_text('') is True
assert is_palindrome_text('x') is True
assert is_palindrome_text('level') is True
assert is_palindrome_text('abca') is False
assert is_palindrome_text('éaé') is True
assert is_palindrome_text('Aa') is False
assert_raises(TypeError, lambda: is_palindrome_text(['l', 'e', 'v', 'e', 'l']))`,
      solution: `def is_palindrome_text(text: str) -> bool:
    if not isinstance(text, str):
        raise TypeError('text must be a string')

    left = 0
    right = len(text) - 1
    while left < right:
        if text[left] != text[right]:
            return False
        left += 1
        right -= 1
    return True`,
      explanation: 'At every loop start, all character pairs outside the current left-through-right interval have matched their mirrors. If the current endpoints differ, no later comparison can repair that mismatch, so False is final. If they match, moving both pointers preserves the invariant. The loop stops after every mirrored pair has been certified, including the vacuous empty case and the unpaired center of an odd-length string.',
      complexity: 'Each character participates in at most one endpoint comparison, giving O(n) time. The scan retains only two indices, so auxiliary space is O(1). The Boolean result is O(1) output space.'
    },
    {
      id: 'm4-l2-p4',
      title: 'Extra: Merge two sorted inputs',
      level: 'extra',
      difficulty: 'Build',
      contract: 'Implement merge_sorted(left, right). left and right must each be Python lists of built-in integers in nondecreasing order. Return a new nondecreasing list containing every input occurrence, including duplicates. When current values are equal, consume from left first. Do not mutate either input list.',
      plan: 'Validate both inputs and their sortedness. Maintain one pointer per input and a result list. Append the smaller current value, choosing left on a tie. When one input is exhausted, append the untouched suffix of the other input.',
      boundary: 'Two empty lists produce a new empty list. Either input may be empty. Duplicates are retained once for each occurrence; equal front values are taken from left first. A non-list, non-integer element, or unsorted input raises an exception rather than producing a misleading merge.',
      hints: [
        'The next item in the merged output must be the smaller of the two not-yet-consumed front values.',
        'After one pointer reaches the end, no more comparisons are necessary because the other suffix is already sorted.'
      ],
      starter: `def merge_sorted(left: list[int], right: list[int]) -> list[int]:
    raise NotImplementedError`,
      tests: `def assert_raises(expected_exception, thunk):
    try:
        thunk()
    except expected_exception:
        return
    raise AssertionError(f'expected {expected_exception.__name__}')

assert merge_sorted([], []) == []
assert merge_sorted([], [1, 1]) == [1, 1]
assert merge_sorted([1, 2, 2, 8], [2, 3, 8]) == [1, 2, 2, 2, 3, 8, 8]
left_values = [-3, 4]
right_values = [-2, 4, 9]
assert merge_sorted(left_values, right_values) == [-3, -2, 4, 4, 9]
assert left_values == [-3, 4]
assert right_values == [-2, 4, 9]
assert_raises(ValueError, lambda: merge_sorted([2, 1], [3]))
assert_raises(TypeError, lambda: merge_sorted([1], (2,)))`,
      solution: `def merge_sorted(left: list[int], right: list[int]) -> list[int]:
    if not isinstance(left, list) or not isinstance(right, list):
        raise TypeError('left and right must be lists of integers')
    if any(type(value) is not int for value in left) or any(type(value) is not int for value in right):
        raise TypeError('both lists must contain only built-in integers')
    if any(left[index] > left[index + 1] for index in range(len(left) - 1)):
        raise ValueError('left must be in nondecreasing order')
    if any(right[index] > right[index + 1] for index in range(len(right) - 1)):
        raise ValueError('right must be in nondecreasing order')

    merged = []
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
      explanation: 'The invariant is that merged is the sorted merge of the prefixes already consumed, and the current pointers identify the smallest unconsumed candidate in each input. Choosing the smaller front value is safe because sortedness ensures no later value from that same input can be smaller. Choosing left on equality defines stable source precedence for equal values. Once one list ends, its competitor’s remaining suffix can be appended without comparisons because it is already sorted.',
      complexity: 'Let m and n be the input lengths. Validation plus merging takes O(m + n) time. The returned merged list requires O(m + n) output space. Validation uses generators without concatenating the inputs, and suffixes are appended with index loops rather than copied with slices. Auxiliary working space beyond the output is O(1).'
    },
    {
      id: 'm4-l2-p5',
      title: 'Extra extension: Maximum fixed-size window sum',
      level: 'extra',
      difficulty: 'Stretch',
      contract: 'Implement max_fixed_window_sum(values, width). values must be a Python list of built-in integers and width must be a positive built-in integer. Return the greatest sum among all contiguous windows containing exactly width values. Return None when width is larger than the list length, including an empty list. Return only the sum, so equal maxima need no tie-breaking position.',
      plan: 'Validate values and width. Form the first window sum once. Then move the window one step at a time by subtracting the item that leaves and adding the item that enters. Record a larger sum when found.',
      boundary: 'A width of one returns the largest individual value. Negative values are valid, so zero must not be used as a default maximum. Empty input or a width that does not fit returns None. Width zero or a negative width raises ValueError; invalid shapes and non-integer values raise TypeError.',
      hints: [
        'Sum the first width values with an index loop only after confirming the window fits. Avoid making a temporary slice if you want constant auxiliary space.',
        'When the right boundary reaches index r, the leaving value is at index r - width.'
      ],
      starter: `def max_fixed_window_sum(values: list[int], width: int) -> int | None:
    raise NotImplementedError`,
      tests: `def assert_raises(expected_exception, thunk):
    try:
        thunk()
    except expected_exception:
        return
    raise AssertionError(f'expected {expected_exception.__name__}')

assert max_fixed_window_sum([1, 3, -2, 5, 3], 2) == 8
assert max_fixed_window_sum([-5, -2, -3], 2) == -5
assert max_fixed_window_sum([4, 4, 4], 2) == 8
assert max_fixed_window_sum([7], 1) == 7
assert max_fixed_window_sum([], 1) is None
assert max_fixed_window_sum([1, 2], 3) is None
assert_raises(ValueError, lambda: max_fixed_window_sum([1, 2], 0))
assert_raises(TypeError, lambda: max_fixed_window_sum([1, True], 1))`,
      solution: `def max_fixed_window_sum(values: list[int], width: int) -> int | None:
    if not isinstance(values, list) or type(width) is not int:
        raise TypeError('values must be a list of integers and width must be an integer')
    if any(type(value) is not int for value in values):
        raise TypeError('values must contain only built-in integers')
    if width <= 0:
        raise ValueError('width must be positive')
    if width > len(values):
        return None

    current_sum = 0
    for index in range(width):
        current_sum += values[index]
    best_sum = current_sum
    for right in range(width, len(values)):
        current_sum += values[right] - values[right - width]
        if current_sum > best_sum:
            best_sum = current_sum
    return best_sum`,
      explanation: 'This is an extension of boundary movement to a contiguous region. Before each loop iteration, current_sum equals the sum of the width items ending immediately before right, and best_sum is the greatest completed window sum seen so far. Advancing the window removes exactly one old boundary value and adds exactly one new boundary value, so the invariant is restored in constant time. Initializing from the first real window correctly handles all-negative values.',
      complexity: 'Validation and the sliding scan take O(n) time. Initializing the first window takes O(width) time, with width at most n for a valid window, and uses an index loop without a temporary slice. Auxiliary working space is O(1), and the integer result uses O(1) output space under the unit-cost arithmetic model.'
    }
  ],
  sources: [
    {
      label: 'Python Software Foundation, Sorting Techniques',
      href: 'https://docs.python.org/3/howto/sorting.html'
    },
    {
      label: 'Python Time Complexity reference',
      href: 'https://wiki.python.org/moin/TimeComplexity'
    },
    {
      label: 'Princeton Algorithms, Mergesort',
      href: 'https://algs4.cs.princeton.edu/22mergesort/'
    },
    {
      label: 'MIT OpenCourseWare, Introduction to Algorithms, Sets and Sorting',
      href: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-3-sets-and-sorting/'
    }
  ]
};
