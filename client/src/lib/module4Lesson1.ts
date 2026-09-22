import type { M4Lesson } from './module4Types';

export const module4Lesson1: M4Lesson = {
  id: 1,
  title: 'Hash Maps: Replace Repeated Searches with Lookups',
  short: 'Frequency counts, one-pass two-sum, and duplicate-safe lookup patterns',
  intro: 'Preserve useful information about values already seen so a repeated linear search becomes a dictionary or set lookup. Build frequency counts, find distinct-index pairs, and explain the memory you trade for fewer repeated searches.',
  objectives: [
    'Choose a set or dictionary when a problem repeatedly asks whether a value has appeared or needs information associated with that value.',
    'Build frequency counts in one pass and use the count table to find a first unique character without changing input order.',
    'Implement one-pass two-sum with distinct indices, including the duplicate case in which the same value must occur twice.'
  ],
  concepts: [
    {
      title: '01 / Replace repeated scans with remembered state',
      text: 'If each item in a length-n list searches the earlier portion of that list, the repeated list membership checks can take quadratic time. A set records which hashable values have been seen; a dictionary records a value associated with each hashable key. In CPython, membership and insertion are average O(1), so one lookup per input item makes the common pattern average O(n). This is an average-case claim, not a guarantee: severe collisions can make a single hash-table operation O(n).'
    },
    {
      title: '02 / Count before selecting',
      text: 'A frequency table maps each value to the number of times it occurs. Increment counts[item] as the input is scanned, using counts.get(item, 0) + 1. When the desired answer depends on global frequency but must respect original order, make a second left-to-right pass and select the first item whose count is one. A dictionary preserves insertion order in current Python, but scanning the original sequence makes the ordering rule explicit rather than incidental.'
    },
    {
      title: '03 / One-pass two-sum stores earlier indices',
      text: 'At index j with value x and target t, the only useful earlier value is t - x. Ask whether that complement is already in a dictionary mapping value to an earlier index before storing x. Checking first prevents one element from satisfying both positions of a pair. For deterministic output, retain the first index for each value; then the first pair found has the smallest completing index j, and for that j uses the earliest compatible i.'
    },
    {
      title: '04 / Sets remove repeats; contracts preserve meaning',
      text: 'Stable deduplication needs both a set and a list: the set answers whether a value was seen, while the list records the first-appearance order. A bare set is unordered, so converting a list directly to a set does not implement a stable-output contract. Keys and set elements must be hashable; lists and dictionaries cannot be dictionary keys or set elements. State explicitly whether invalid container shapes raise TypeError, whether an empty input returns an empty result, and whether equal values at different indices may form a pair.'
    }
  ],
  worked: `def frequency_counts(items):
    counts = {}
    for item in items:
        counts[item] = counts.get(item, 0) + 1
    return counts


def two_sum_indices(values, target):
    first_index = {}
    for j, value in enumerate(values):
        complement = target - value
        if complement in first_index:
            return (first_index[complement], j)
        if value not in first_index:
            first_index[value] = j
    return None


assert frequency_counts(['red', 'blue', 'red', 'green', 'red']) == {
    'red': 3,
    'blue': 1,
    'green': 1,
}
assert frequency_counts([]) == {}
assert two_sum_indices([2, 7, 11, 15], 9) == (0, 1)
assert two_sum_indices([3, 3], 6) == (0, 1)
assert two_sum_indices([3], 6) is None
assert two_sum_indices([], 4) is None`,
  walkthrough: [
    {
      title: 'Step 1 / State the lookup that would end the search',
      text: 'For values [2, 7, 11, 15] and target 9, when the current value is x, a valid earlier partner must equal 9 - x. The dictionary should therefore map a seen value to its index, not map an index to a value.'
    },
    {
      title: 'Step 2 / Process index 0',
      text: 'At j = 0, value = 2 and complement = 7. The dictionary is empty, so no earlier partner exists. Store 2 mapped to 0. The dictionary now represents exactly the usable values from indices before the next iteration.'
    },
    {
      title: 'Step 3 / Process index 1',
      text: 'At j = 1, value = 7 and complement = 2. The lookup succeeds with index 0, so return (0, 1). Both indices are distinct because the current item was checked against previously stored items before it could be stored.'
    },
    {
      title: 'Step 4 / Trace the equal-value boundary',
      text: 'For [3, 3] with target 6, the first 3 finds no partner and is stored at index 0. The second 3 then finds the earlier 3 and returns (0, 1). For [3] with target 6, there is no later second occurrence, so returning a pair would incorrectly reuse index 0.'
    },
    {
      title: 'Step 5 / Separate counting from selecting',
      text: 'The frequency function increments one dictionary entry per item. If a later task asks for the first unique item, scan the original input after building the counts and return the first item whose count equals one. The count table answers global frequency; the second scan enforces input order.'
    }
  ],
  invariant: 'Before processing values[j] in two_sum_indices, first_index contains the earliest index of every distinct value in values[0:j], and no index in first_index is j or later. Therefore, a successful complement lookup yields a valid pair (i, j) with i < j and never reuses the current index.',
  complexity: 'Assume hashing, equality, and arithmetic on the exercise values cost O(1); arbitrary user-defined objects or very large integers can add cost. For n inputs, frequency counting, stable deduplication, and one-pass two-sum take average O(n) time because each iteration performs a constant number of average O(1) dictionary or set operations. Under pathological collisions, those operations can be O(n), making these patterns O(n^2) in the worst case. A frequency table or seen map/set stores O(u) entries for u distinct values. Count it as output space when it is returned as the result, or as auxiliary space when it supports another result. Two-sum returns an O(1)-size pair or None and uses O(u) auxiliary space. Stable deduplication has O(u) auxiliary set space and an O(u) output list; report output space separately from auxiliary space when requested.',
  pitfalls: [
    {
      title: 'Store before checking: self reuse',
      text: 'If code inserts the current value and immediately tests for its complement, a lone value can appear to pair with itself. Check for the complement first, then store the current value. The tests [3], 6 and [3, 3], 6 distinguish the bug from the correct duplicate case.'
    },
    {
      title: 'Overwrite the first index without a policy',
      text: 'Assigning seen[value] = j on every occurrence can still find a valid pair, but it changes which deterministic pair is returned. Preserve the first index when the contract promises the earliest compatible prior index; write that policy and test repeated values.'
    },
    {
      title: 'Use a set when output order matters',
      text: 'set(items) removes duplicates but does not preserve a positional-output contract. For stable deduplication, append a value to the output only when it is absent from a separate seen set. Also remember that unhashable values such as lists cannot be members of that set.'
    }
  ],
  checks: [
    {
      question: 'Predict before revealing: What should one-pass two_sum_indices([5], 10) return, and why is that different from two_sum_indices([5, 5], 10)?',
      answer: 'It should return None for [5] because a pair requires two distinct indices and the only 5 is at index 0. With [5, 5], index 0 is stored after it fails to find an earlier partner; at index 1, the complement 5 is already mapped to index 0, so the result is (0, 1). The check-before-store order is what prevents self reuse while allowing a real duplicate pair.'
    },
    {
      question: 'Predict before revealing: Stable deduplicate [2, 1, 2, 3, 1] by scanning left to right with a seen set and result list. What are the result and the contents of seen after the scan?',
      answer: 'The result is [2, 1, 3] because only first occurrences are appended in input order. The seen set contains 1, 2, and 3, but its iteration order is not part of the contract. The list carries the observable stable order; the set exists only for fast membership decisions.'
    }
  ],
  reflection: 'Choose one earlier nested-loop or repeated-membership solution from your own study notes. Write its input and output contract, identify the repeated search, and refactor it using either a set, a frequency dictionary, or a value-to-index dictionary. Hand-trace one empty case, one duplicate case, and one no-answer case. Then state the loop invariant and distinguish auxiliary space from result space in two or three sentences.',
  practices: [
    {
      id: 'm4-l1-p1',
      title: 'Frequency Counts in First-Key Appearance Order',
      level: 'core',
      difficulty: 'Build',
      contract: 'Write frequency_counts(items). items must be a list whose elements are hashable. Return a new dictionary mapping each distinct item to its total number of occurrences. Dictionary key order must be the order of each key’s first appearance in items. Return {} for an empty list. Raise TypeError for a non-list argument or an unhashable element.',
      boundary: 'An empty list returns {}. Equal values count together under normal Python equality, so 1 and True refer to the same dictionary key. A tuple, None, or another non-list input raises TypeError. A nested list element raises TypeError because it is unhashable.',
      plan: 'Validate that the outer input is a list. Start an empty dictionary. For each item, read its current count with get using zero as the default, then write back one more. Do not sort: insertion order supplies the required first-key order.',
      hints: [
        'counts.get(item, 0) returns zero when item has not appeared yet.',
        'Increment with counts[item] = counts.get(item, 0) + 1. Let dictionary key insertion happen at the first occurrence rather than building a separate order list.'
      ],
      starter: `def frequency_counts(items):
    raise NotImplementedError('Implement the stated contract.')`,
      tests: `assert frequency_counts([]) == {}
assert frequency_counts(['red', 'blue', 'red', 'green', 'red']) == {'red': 3, 'blue': 1, 'green': 1}
assert frequency_counts([2, 1, 2, 1, 2]) == {2: 3, 1: 2}
assert list(frequency_counts(['b', 'a', 'b', 'c']).keys()) == ['b', 'a', 'c']
try:
    frequency_counts(('a', 'a'))
    assert False, 'a non-list input must raise TypeError'
except TypeError:
    pass
try:
    frequency_counts([['not hashable']])
    assert False, 'an unhashable element must raise TypeError'
except TypeError:
    pass`,
      solution: `def frequency_counts(items):
    if not isinstance(items, list):
        raise TypeError('items must be a list')
    counts = {}
    for item in items:
        counts[item] = counts.get(item, 0) + 1
    return counts`,
      explanation: 'The dictionary is the state summary of the prefix processed so far: after each iteration, its value for every encountered item equals that item’s count in the processed prefix. get supplies zero for a new key. Python dictionaries retain insertion order, so the first assignment to each key establishes the requested key order. The function returns a newly built dictionary and does not mutate the input list.',
      complexity: 'For n items and u distinct items, time is average O(n) and O(n^2) in the hash-collision worst case. The returned dictionary uses O(u) output space. Beyond that output, the loop uses O(1) auxiliary working space; total additional storage is O(u).'
    },
    {
      id: 'm4-l1-p2',
      title: 'One-Pass Two-Sum with Distinct Indices',
      level: 'core',
      difficulty: 'Build',
      contract: 'Write two_sum_indices(values, target). values must be a list of exact integers and target must be an exact integer. Return a tuple (i, j) with i < j such that values[i] + values[j] equals target. Return the first pair completed while scanning j from left to right; for that j, use the earliest compatible i. Return None when no pair exists. Indices must be distinct, and the input list must not be mutated.',
      boundary: 'An empty or one-item list returns None. [3, 3] with target 6 returns (0, 1), while [3] with target 6 returns None. Negative values and targets are valid. A non-list outer input, a bool or non-integer element, or a non-integer target raises TypeError.',
      plan: 'Validate the input. Make a dictionary from previously seen value to its earliest index. At each index j, calculate target minus the current value and look for that complement before adding the current value. Add a value only if it has not been seen, which preserves its earliest index.',
      hints: [
        'At index j, a partner must have value target - values[j]. Store values, not complements, as dictionary keys.',
        'The membership test must come before storing the current value. Use if value not in first_index before recording j so duplicates retain their earliest index.'
      ],
      starter: `def two_sum_indices(values, target):
    raise NotImplementedError('Implement the stated contract.')`,
      tests: `assert two_sum_indices([2, 7, 11, 15], 9) == (0, 1)
assert two_sum_indices([3, 3], 6) == (0, 1)
assert two_sum_indices([3], 6) is None
assert two_sum_indices([1, 5, 1, 5], 6) == (0, 1)
assert two_sum_indices([-4, 10, 7, -1], 6) == (0, 1)
assert two_sum_indices([], 0) is None
try:
    two_sum_indices([2, 7, 'invalid tail'], 9)
    assert False, 'validate all values even if an early pair exists'
except TypeError:
    pass
try:
    two_sum_indices((2, 7), 9)
    assert False, 'a non-list input must raise TypeError'
except TypeError:
    pass
try:
    two_sum_indices([2, True], 3)
    assert False, 'bool is not an exact integer under this contract'
except TypeError:
    pass`,
      solution: `def two_sum_indices(values, target):
    if not isinstance(values, list):
        raise TypeError('values must be a list')
    if type(target) is not int:
        raise TypeError('target must be an exact integer')
    if any(type(value) is not int for value in values):
        raise TypeError('each value must be an exact integer')
    first_index = {}
    for j, value in enumerate(values):
        complement = target - value
        if complement in first_index:
            return (first_index[complement], j)
        if value not in first_index:
            first_index[value] = j
    return None`,
      explanation: 'Before each iteration, first_index maps every distinct earlier value to its earliest index. A complement found in that map necessarily comes from an earlier position, so the returned indices are distinct and ordered. Looking up before insertion blocks an illegal one-element self-pair; retaining rather than overwriting an existing key gives the stated deterministic tie policy. The function never changes values.',
      complexity: 'For n values and u distinct prefix values, time is average O(n) and worst-case O(n^2) if dictionary operations degrade under collisions. The map uses O(u) auxiliary space. The returned pair or None requires O(1) output space.'
    },
    {
      id: 'm4-l1-p3',
      title: 'Stable Deduplication',
      level: 'extra',
      difficulty: 'Build',
      contract: 'Write stable_unique(items). items must be a list whose elements are hashable. Return a new list containing each distinct item exactly once, in the order of its first appearance. Return [] for an empty list. Do not mutate items. Raise TypeError for a non-list argument or an unhashable element.',
      boundary: 'Repeated adjacent and separated values are both removed after their first occurrence. An empty input returns []. Equal values follow Python equality, so 0 and False represent the same seen key. A nested list element is invalid because it cannot be placed in a set.',
      plan: 'Validate the outer list. Keep seen as a set and result as a list. For each item, append it and add it to seen only when it is absent from seen. Return result rather than converting seen to a list.',
      hints: [
        'A set gives average constant-time membership, but it is not the ordered output.',
        'Use if item not in seen: then add item to seen and append item to result. The order of these two updates does not alter the result in single-threaded code, but both belong in the same branch.'
      ],
      starter: `def stable_unique(items):
    raise NotImplementedError('Implement the stated contract.')`,
      tests: `assert stable_unique([]) == []
assert stable_unique([2, 1, 2, 3, 1]) == [2, 1, 3]
assert stable_unique(['a', 'a', 'b', 'a', 'c', 'b']) == ['a', 'b', 'c']
original = [0, False, 1, True, 0]
assert stable_unique(original) == [0, 1]
assert original == [0, False, 1, True, 0]
try:
    stable_unique('abc')
    assert False, 'a non-list input must raise TypeError'
except TypeError:
    pass
try:
    stable_unique([[1], [1]])
    assert False, 'an unhashable element must raise TypeError'
except TypeError:
    pass`,
      solution: `def stable_unique(items):
    if not isinstance(items, list):
        raise TypeError('items must be a list')
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result`,
      explanation: 'The loop invariant is that result contains exactly the first occurrence of every distinct value in the processed prefix, in prefix order, and seen contains exactly the values in result. When a value is new, both structures grow; when it is already seen, neither changes. Keeping the list separate makes stable order explicit and avoids treating a set’s arbitrary iteration order as an output guarantee.',
      complexity: 'For n items and u distinct values, time is average O(n) and worst-case O(n^2) under hash collisions. The seen set uses O(u) auxiliary space. The returned result list uses O(u) output space, so total additional storage is O(u) for each category, not O(n) auxiliary space merely because an output exists.'
    },
    {
      id: 'm4-l1-p4',
      title: 'First Unique Character',
      level: 'extra',
      difficulty: 'Stretch',
      contract: 'Write first_unique_char(text). text must be a string. Return the first character in left-to-right order that occurs exactly once in the entire string. Return None for an empty string or when every character repeats. Preserve character case and treat each Python string element as a character. Raise TypeError for a non-string argument.',
      boundary: 'The empty string returns None. A one-character string returns that character. Case is distinct, so A and a are different characters. Spaces and punctuation participate normally. A non-string such as None or a list raises TypeError.',
      plan: 'Validate text. First count every character in a dictionary. Then scan text again from left to right and return the first character whose count equals one. If the second scan ends, return None.',
      hints: [
        'One pass can count occurrences, but cannot know that an early character is globally unique until the rest of the text has been examined.',
        'Use two loops: counts[char] = counts.get(char, 0) + 1, then for char in text: if counts[char] == 1: return char.'
      ],
      starter: `def first_unique_char(text):
    raise NotImplementedError('Implement the stated contract.')`,
      tests: `assert first_unique_char('leetcode') == 'l'
assert first_unique_char('aabb') is None
assert first_unique_char('') is None
assert first_unique_char('swiss') == 'w'
assert first_unique_char('aA') == 'a'
assert first_unique_char('  !!') is None
try:
    first_unique_char(None)
    assert False, 'a non-string input must raise TypeError'
except TypeError:
    pass`,
      solution: `def first_unique_char(text):
    if not isinstance(text, str):
        raise TypeError('text must be a string')
    counts = {}
    for char in text:
        counts[char] = counts.get(char, 0) + 1
    for char in text:
        if counts[char] == 1:
            return char
    return None`,
      explanation: 'The first pass establishes the global count of every character. During the second pass, every earlier character has already been rejected because its global count was not one; therefore the first accepted character is the first unique character in the original order. Returning during the first pass would be wrong for text such as abca because the first a later repeats.',
      complexity: 'For n characters and k distinct characters, the two passes take average O(n) time and O(k) auxiliary dictionary space. The return value is one character or None, so output space is O(1). With pathological hash collisions, dictionary operations can degrade and the worst-case time is O(n^2).'
    },
    {
      id: 'm4-l1-p5',
      title: 'Debug a Duplicate and Self-Reuse Check',
      level: 'extra',
      difficulty: 'Debug',
      contract: 'Write has_two_sum_distinct(values, target). values must be a list of exact integers and target must be an exact integer. Return True exactly when two different indices i and j have values[i] + values[j] equal to target; otherwise return False. Do not return True by using one value twice. The input list must remain unchanged. Raise TypeError for invalid outer shapes or non-exact-integer values.',
      boundary: '[] and a one-item list return False. [5] with target 10 is False, but [5, 5] with target 10 is True. Negative values are valid. A bool is rejected even though bool is a subclass of int, because this contract requires exact integers.',
      plan: 'Validate the input. Scan from left to right with a seen set of earlier values. At each value, check whether target minus value is already seen. Only after that check, add the current value. This ordering is the repair for the self-reuse bug.',
      hints: [
        'A common incorrect version adds value to seen before asking whether target - value is present; test it on [5] and target 10.',
        'The correct loop is: compute complement, return True if complement in seen, then seen.add(value). The set represents only earlier positions at the moment of the test.'
      ],
      starter: `def has_two_sum_distinct(values, target):
    raise NotImplementedError('Implement the stated contract.')`,
      tests: `assert has_two_sum_distinct([], 0) is False
assert has_two_sum_distinct([5], 10) is False
assert has_two_sum_distinct([5, 5], 10) is True
assert has_two_sum_distinct([1, 4, 2, 9], 6) is True
assert has_two_sum_distinct([-3, 8, 4], 5) is True
assert has_two_sum_distinct([1, 2, 3], 20) is False
try:
    has_two_sum_distinct([5, 5, 'invalid tail'], 10)
    assert False, 'validate all values before early success'
except TypeError:
    pass
original = [1, 4, 2, 9]
has_two_sum_distinct(original, 6)
assert original == [1, 4, 2, 9]
try:
    has_two_sum_distinct([5, True], 6)
    assert False, 'bool is not an exact integer under this contract'
except TypeError:
    pass`,
      solution: `def has_two_sum_distinct(values, target):
    if not isinstance(values, list):
        raise TypeError('values must be a list')
    if type(target) is not int:
        raise TypeError('target must be an exact integer')
    if any(type(value) is not int for value in values):
        raise TypeError('each value must be an exact integer')
    seen = set()
    for value in values:
        complement = target - value
        if complement in seen:
            return True
        seen.add(value)
    return False`,
      explanation: 'At the beginning of each iteration, seen contains exactly the values from earlier indices. Consequently, a successful complement lookup witnesses two distinct positions: an earlier position holding complement and the current position holding value. A lone 5 is checked against an empty seen set before 5 is added, so it cannot create a false self-pair. A second 5 succeeds because the first one is genuinely earlier.',
      complexity: 'For n values and u distinct values, time is average O(n) and worst-case O(n^2) if set operations suffer pathological collisions. The seen set uses O(u) auxiliary space. The Boolean output is O(1) space.'
    }
  ],
  sources: [
    {
      label: 'Python documentation: Time complexity of operations on built-in types',
      href: 'https://docs.python.org/3/library/time-complexity.html'
    },
    {
      label: 'Python documentation: Set and dictionary types',
      href: 'https://docs.python.org/3/library/stdtypes.html#mapping-types-dict'
    },
    {
      label: 'MIT OpenCourseWare: Introduction to Algorithms, Lecture 4 Hashing',
      href: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-4-hashing/'
    }
  ]
};
