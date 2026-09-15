// Professional Studio: evidence-led instruction, explicit contracts, and readable Python.
export const module3Title = 'Module 3: Looping & Interview Implementation';
export const module3Objective = 'Solve introductory coding problems requiring repetitive execution, through writing, applying, and debugging basic Python loops (for and while), including loop control statements.';
export const module3Notice = 'All assigned lessons and activities are accessed through their individual links in Canvas Module 3. These companion examples are original practice, not the official assessed prompts. Confirm input rules, outputs, due dates, points, and submission requirements in Canvas.';
export type Practice = { id: string; title: string; contract: string; plan: string; boundary: string; hint: string; signature: string; imports?: string; tests: string; solution: string };
export type Lesson = { id: number; title: string; short: string; intro: string; concepts: { title: string; text: string }[]; worked: string; invariant: string; debug: string; check: { question: string; answer: string }; practices: Practice[] };
export const module3Lessons: Lesson[] = [
  {
    id: 1, title: 'Manipulating Arrays to Find Opposite Element Pairs', short: 'Opposite pairs',
    intro: 'Build on Module 2 indexing and loop control to pair elements from opposite ends of a Python list. A precise pairing rule matters more than a clever expression: decide whether the middle element participates, whether duplicates count, and whether “reverse” refers to position or digits before you code.',
    concepts: [
      { title: '01 / Define the traversal', text: 'For the positional examples here, index i pairs with n - 1 - i. Visit only range(n // 2), so each pair is processed once. An odd-length list leaves the middle element unpaired. An empty or singleton list produces no pairs. Python range excludes its stop value. [1]' },
      { title: '02 / Translate for into while', text: 'A for loop is convenient when the number of pairs is known. A while loop can use left = 0 and right = len(values) - 1, then continue while left < right. After processing, increase left and decrease right. A continue before these updates can stop progress toward termination.' },
      { title: '03 / Explain correctness', text: 'Before each iteration, the result contains exactly the pairs outside the remaining left-to-right interval. It starts empty, gains one new pair each step, and is complete when the indices meet or cross. This statement is the loop invariant; shrinking the interval explains termination separately.' },
      { title: '04 / Distinguish pairing rules', text: 'Opposite positions are not the same as additive opposites or reversed digits. The reverse-counterpart companion uses digit reversal, not symmetric positions. Write the rule in your own words before selecting a loop. Positional pairing takes O(n) time and O(n) result space for fixed-size numeric values.' }
    ],
    worked: `def opposite_pairs(values):
    pairs = []
    left, right = 0, len(values) - 1
    while left < right:
        pairs.append((values[left], values[right]))
        left += 1
        right -= 1
    return pairs

assert opposite_pairs([2, 4, 8, 16, 32]) == [(2, 32), (4, 16)]
assert opposite_pairs([]) == []
assert opposite_pairs([7]) == []`,
    invariant: 'Before iteration i, the result contains exactly the i outer pairs already processed, in outside-in order, with no pair repeated.',
    debug: 'Bug: right = len(values) indexes one position past the end. Correction: right = len(values) - 1. Use a two-element list to expose the error immediately. A separate left <= right bug incorrectly includes the center under our stated rule.',
    check: { question: 'For [2, 4, 8, 16, 32], how many distinct opposite-position pairs should this contract produce? What happens to 8?', answer: 'Two pairs: (2, 32) and (4, 16). The center value 8 remains unpaired. Iterating across all five indices would duplicate pairs and pair the center with itself.' },
    practices: [
      { id: 'l1p1', title: 'Creating Geometric Mean Pairs from an Array', contract: 'Companion contract: accept a list of nonnegative numbers. For each distinct opposite-position pair, return its geometric mean sqrt(a * b), outside-in. Skip the center in an odd-length list. Negative inputs are outside this companion contract.', plan: 'Initialize a result list. Loop through half the indices, find the opposite index, compute the mean, and append. Keep multiplication inside the square root; (a + b) / 2 is the arithmetic mean.', boundary: 'Test an empty list, a singleton, an odd-length list, and a pair containing zero. Use isclose for non-exact floating-point results.', hint: 'Use values[len(values) - 1 - i] for the partner, then sqrt(values[i] * partner). [2]', imports: 'from math import sqrt, isclose', signature: 'def geometric_pairs(values):', tests: `assert geometric_pairs([]) == []
assert geometric_pairs([5]) == []
assert geometric_pairs([4, 9, 16, 25]) == [10.0, 12.0]
assert geometric_pairs([0, 7, 9]) == [0.0]
assert isclose(geometric_pairs([2, 3])[0], sqrt(6))`, solution: `def geometric_pairs(values):
    result = []
    for i in range(len(values) // 2):
        result.append(sqrt(values[i] * values[len(values) - 1 - i]))
    return result` },
      { id: 'l1p2', title: 'Pairing Numbers with their Reverse Counterparts in a List', contract: 'Companion contract: accept nonnegative integers and return value pairs at indices i < j where the later value equals the digit reversal of the earlier one. Each index pair counts, so repeated values may produce repeated pairs. A single palindrome cannot pair with itself; two occurrences can. Reversal drops leading zeros: 120 becomes 21.', plan: 'Use a for loop for i and a while loop for j beginning at i + 1. Compute int(str(values[i])[::-1]), compare later values, and advance j on every iteration.', boundary: 'Test [11], [11, 11], [120, 21], an empty list, and repeated 12 values. Do not confuse digit reversal with reverse traversal.', hint: 'Keep j += 1 outside the if block. Otherwise the first nonmatch can create an infinite loop.', signature: 'def reverse_pairs(values):', tests: `assert reverse_pairs([]) == []
assert reverse_pairs([11]) == []
assert reverse_pairs([11, 11]) == [(11, 11)]
assert reverse_pairs([12, 21, 34, 43]) == [(12, 21), (34, 43)]
assert reverse_pairs([120, 21]) == [(120, 21)]
assert reverse_pairs([12, 12, 21]) == [(12, 21), (12, 21)]`, solution: `def reverse_pairs(values):
    result = []
    for i in range(len(values)):
        reversed_value = int(str(values[i])[::-1])
        j = i + 1
        while j < len(values):
            if values[j] == reversed_value:
                result.append((values[i], values[j]))
            j += 1
    return result` },
      { id: 'l1p3', title: 'Summing Up Opposite Elements in an Array', contract: 'Companion contract: return one sum for each opposite-position pair, outside-in. Do not mutate the input and do not include an unpaired center. Integers may be negative.', plan: 'Reuse the positional traversal from the worked example. Change only the operation performed on each pair. Implement it once with for and again with while; compare their outputs.', boundary: 'Try [], [9], [-2, 5], and an odd-length list. Check that the input still has its original values after the call.', hint: 'For an input of length n, your result length must be n // 2.', signature: 'def opposite_sums(values):', tests: `assert opposite_sums([]) == []
assert opposite_sums([9]) == []
assert opposite_sums([-2, 5]) == [3]
assert opposite_sums([1, 2, 3, 4, 5]) == [6, 6]
original = [1, 2, 3, 4]
assert opposite_sums(original) == [5, 5]
assert original == [1, 2, 3, 4]`, solution: `def opposite_sums(values):
    result = []
    for i in range(len(values) // 2):
        result.append(values[i] + values[len(values) - 1 - i])
    return result` }
    ]
  },
  {
    id: 2, title: 'Nested Loop Pair Discovery: Comparing Elements Across Two Arrays', short: 'Cross-array discovery',
    intro: 'Move from a single list to two collections. Nested loops let each element of the first list meet every element of the second. Your task is to define the match condition, preserve the required output order, and explain why every required candidate is examined.',
    concepts: [
      { title: '01 / Enumerate the candidate space', text: 'For each a in the first list, scan every b in the second. With lengths n and m this visits n × m candidates. zip aligns positions instead and stops at the shorter input by default; it does not enumerate all cross-array pairs. [3]' },
      { title: '02 / Separate search from selection', text: 'The loops generate candidates; an if statement selects matches. Store results outside both loops. For fixed-size numeric equality or addition, full traversal costs O(nm) time, plus result storage. Substring checks and large-integer arithmetic can add work per candidate.' },
      { title: '03 / Use break deliberately', text: 'break exits only the innermost enclosing loop. It is appropriate when only the first match for the current item is needed, but incorrect when all index pairs must be collected. continue skips the remainder of the current iteration. [1]' },
      { title: '04 / Specify duplicates and arithmetic', text: 'Unique common values and all matching index pairs are different outputs. Write the duplicate policy first. For a nonnegative integer total s, use r = isqrt(s) and test r * r == s for a perfect square. Reject negative totals before isqrt; zero is a perfect square. [2]' }
    ],
    worked: `def equal_index_pairs(first, second):
    result = []
    for i in range(len(first)):
        for j in range(len(second)):
            if first[i] == second[j]:
                result.append((i, j))
    return result

assert equal_index_pairs([2, 2], [2, 3]) == [(0, 0), (1, 0)]
assert equal_index_pairs([], [2]) == []`,
    invariant: 'Before outer iteration i, all matching pairs involving first[0:i] have been recorded. During that iteration, before inner index j, all matches between first[i] and second[0:j] have been recorded.',
    debug: 'Bug: defining result = [] inside the outer loop discards earlier matches. Move initialization above both loops. A test with a match in each of two different outer iterations reveals the loss.',
    check: { question: 'How many candidate comparisons are made for first = [1, 2] and second = [3, 4, 5]? Would zip visit the same candidates?', answer: 'The nested loops make six comparisons. zip makes two aligned pairs, so it misses four candidates. The inner loop must restart for each new outer element.' },
    practices: [
      { id: 'l2p1', title: 'Finding Common Elements in Two Arrays', contract: 'Companion contract: return unique common integer values in their first-appearance order in the first list. Duplicates in either input must not duplicate the output.', plan: 'For each value in first, skip it if it is already in result. Search second until a match is found, append once, and break only the inner loop.', boundary: 'Test repeated matches, no overlap, one empty list, and two empty lists. Check output order using first = [3, 1] and second = [1, 3].', hint: 'A list-based result is intentionally used for loop practice. Explain its membership-check cost before considering a set optimization in a later module.', signature: 'def common_values(first, second):', tests: `assert common_values([3, 1, 3, 2], [2, 3, 3]) == [3, 2]
assert common_values([3, 1], [1, 3]) == [3, 1]
assert common_values([], [1]) == []
assert common_values([1], []) == []
assert common_values([1], [2]) == []`, solution: `def common_values(first, second):
    result = []
    for value in first:
        if value in result:
            continue
        for other in second:
            if value == other:
                result.append(value)
                break
    return result` },
      { id: 'l2p2', title: 'Substring Search in Tuple Arrays', contract: 'Companion contract: records is a list of (id, text) tuples with unique ids; queries is a list of distinct, nonempty strings. Return (id, query) for each case-sensitive substring match, in record order then query order. This is substring matching, not whole-word matching.', plan: 'Unpack each record, loop through queries, and test query in text. Append every match; do not break after the first query.', boundary: 'Test an empty records list, empty queries, no match, and a capitalization mismatch. Empty queries are excluded by this contract; Python otherwise treats the empty string as a substring.', hint: 'Use for record_id, text in records, then for query in queries. Tuple unpacking names the fields clearly. [3]', signature: 'def substring_matches(records, queries):', tests: `assert substring_matches([(1, 'python loops'), (2, 'loop lab')], ['loop', 'py']) == [(1, 'loop'), (1, 'py'), (2, 'loop')]
assert substring_matches([], ['x']) == []
assert substring_matches([(1, 'abc')], []) == []
assert substring_matches([(1, 'Python')], ['python']) == []`, solution: `def substring_matches(records, queries):
    result = []
    for record_id, text in records:
        for query in queries:
            if query in text:
                result.append((record_id, query))
    return result` },
      { id: 'l2p3', title: 'Finding Pairs in Two Lists with Nested Loops', contract: 'Companion contract: given two integer lists and a target, return all value pairs (a, b) whose sum equals target. Output follows outer-list then inner-list order. Every matching index combination counts, including repeated value pairs.', plan: 'Initialize the output once. Nest one loop per list. Append only when a + b == target. Do not break because later items can also match.', boundary: 'Test duplicate values, negative values, empty input, and no match. Predict the number of candidates before running.', hint: 'This contract intentionally differs from the unique-values rule in Practice 1.', signature: 'def target_pairs(first, second, target):', tests: `assert target_pairs([1, 2, 2], [3, 4], 5) == [(1, 4), (2, 3), (2, 3)]
assert target_pairs([-1, 0], [1, 2], 0) == [(-1, 1)]
assert target_pairs([], [3], 3) == []
assert target_pairs([1], [1], 5) == []`, solution: `def target_pairs(first, second, target):
    result = []
    for a in first:
        for b in second:
            if a + b == target:
                result.append((a, b))
    return result` },
      { id: 'l2p4', title: 'Finding Perfect Square Sum Pairs from Two Arrays', contract: 'Companion contract: return every value pair whose integer sum is a nonnegative perfect square. Include zero. Preserve nested-loop order and repeated index combinations; skip negative sums.', plan: 'Generate each cross-array pair. Compute total. Use continue for total < 0; otherwise test isqrt(total) squared against total.', boundary: 'Test sums below zero, exactly zero, exactly a square, and just below or above a square. Do not rely on rounding a floating-point root.', hint: 'Set root = isqrt(total) after the negative guard. root * root == total is an exact integer test. [2]', imports: 'from math import isqrt', signature: 'def square_sum_pairs(first, second):', tests: `assert square_sum_pairs([0, 1], [0, 3]) == [(0, 0), (1, 0), (1, 3)]
assert square_sum_pairs([-4], [0, 4, 5]) == [(-4, 4), (-4, 5)]
assert square_sum_pairs([2], [6, 7, 8]) == [(2, 7)]
assert square_sum_pairs([], [1]) == []`, solution: `def square_sum_pairs(first, second):
    result = []
    for a in first:
        for b in second:
            total = a + b
            if total < 0:
                continue
            root = isqrt(total)
            if root * root == total:
                result.append((a, b))
    return result` }
    ]
  },
  {
    id: 3, title: 'Exploring Array Interactions through Simulation Games', short: 'State & simulation',
    intro: 'A simulation repeatedly applies rules to a changing state. Before writing a loop, identify the state, one legal update, the order of updates, and the condition that ends the process. The games below use explicitly defined companion rules; use the actual Canvas prompt for the graded game rules.',
    concepts: [
      { title: '01 / State → rule → next state', text: 'Represent the current state with a list, select the next pair or turn, apply one rule, and record the result. Trace a tiny input by hand before coding. Decide whether updates happen sequentially or simultaneously; the two interpretations can produce different results.' },
      { title: '02 / Preserve the current round', text: 'For a round-based tournament, build a new winners list while reading the current list. Replace the current state only after the round is complete. Removing elements while iterating the same list can skip elements because indices shift. [1] [3]' },
      { title: '03 / Prove the process stops', text: 'For pairwise elimination, every round with more than one participant reduces the count. For a fixed-turn game, a counter advances toward the requested number of turns. A while loop needs a reachable stopping condition, not merely an expectation that the game will end.' },
      { title: '04 / Debug one transition', text: 'When a final answer is wrong, log the round, index, inputs, decision, and next state. Find the first transition that differs from your hand trace. Correct the rule or boundary there, then rerun both the failing input and a previously passing case.' }
    ],
    worked: `def pair_chunks(text):
    chunks = []
    index = 0
    while index < len(text):
        chunks.append(text[index:index + 2])
        index += 2
    return chunks

assert pair_chunks('ABCDE') == ['AB', 'CD', 'E']
assert pair_chunks('') == []`,
    invariant: 'At the start of a round, current contains exactly the surviving participants from the previous round in order. After processing each complete pair, next_round contains exactly its winner; an unpaired last participant advances unchanged.',
    debug: 'Bug: reading current[i + 1] without checking i + 1 < len(current) crashes for an odd number of participants. Handle the unpaired last participant explicitly, and test three participants rather than only powers of two.',
    check: { question: 'Why should a simultaneous neighborhood update write into a new list rather than change each element of the existing list immediately?', answer: 'Every new value must use the same old state. In-place updates let later positions see earlier new values, changing a simultaneous rule into a sequential one. A copied or newly built next-state list preserves the contract.' },
    practices: [
      { id: 'l3p1', title: 'String Processing Through Sequential Pairing', contract: 'Companion contract: swap each adjacent, non-overlapping pair of characters. Preserve a final unpaired character. Return a new string; preserve spaces, punctuation, and letter case.', plan: 'Use a while index. If a partner exists, append the second character then the first. Otherwise append the final character. Advance by two and join the result.', boundary: 'Test empty, one-character, odd-length, even-length, and punctuation-containing strings.', hint: 'Guard index + 1 < len(text). This is adjacent pairing, not first-with-last pairing.', signature: 'def swap_adjacent(text):', tests: `assert swap_adjacent('') == ''
assert swap_adjacent('A') == 'A'
assert swap_adjacent('ABCDE') == 'BADCE'
assert swap_adjacent('ABCD') == 'BADC'
assert swap_adjacent('a! b') == '!ab '`, solution: `def swap_adjacent(text):
    result = []
    i = 0
    while i < len(text):
        if i + 1 < len(text):
            result.append(text[i + 1])
            result.append(text[i])
        else:
            result.append(text[i])
        i += 2
    return ''.join(result)` },
      { id: 'l3p2', title: 'Medieval Tournament Simulation', contract: 'Companion game: participants are (name, nonnegative strength) tuples. Adjacent participants compete; greater strength wins, with the left participant winning a tie. An unpaired last participant advances. Repeat rounds until one remains. Return that tuple, or None for an empty input. Do not mutate the input.', plan: 'Copy participants into current. While more than one remains, build next_round by visiting pairs with step two. Handle a bye before comparing. Replace current after the round.', boundary: 'Test no participants, a singleton, tied strengths, and an odd-sized tournament. Explain why the participant count strictly decreases in each nonfinal round.', hint: 'A bye needs an append followed by continue in the for loop. The range iterator advances automatically; your while loop advances when current becomes next_round.', signature: 'def tournament(participants):', tests: `assert tournament([]) is None
assert tournament([('A', 3)]) == ('A', 3)
assert tournament([('A', 5), ('B', 5)]) == ('A', 5)
team = [('Ada', 4), ('Bo', 7), ('Cy', 7)]
assert tournament(team) == ('Bo', 7)
assert team == [('Ada', 4), ('Bo', 7), ('Cy', 7)]`, solution: `def tournament(participants):
    current = participants[:]
    while len(current) > 1:
        next_round = []
        for i in range(0, len(current), 2):
            if i + 1 == len(current):
                next_round.append(current[i])
                continue
            left, right = current[i], current[i + 1]
            next_round.append(left if left[1] >= right[1] else right)
        current = next_round
    return current[0] if current else None` },
      { id: 'l3p3', title: 'Houses Game Simulation', contract: 'Companion game: houses is a binary list of lights (0 off, 1 on), and turns is a nonnegative integer. Each turn updates all houses simultaneously: a house becomes 1 if its two neighbors differ, otherwise 0. Missing neighbors count as 0. Return the state after exactly turns turns; do not mutate the input. These are practice rules, not a claim about the assessed Houses Game.', plan: 'Copy the input. For each turn, initialize next_state, inspect neighbors in current, append the new value, and replace current only after every house is processed.', boundary: 'Test zero turns, empty houses, one house, and two turns. Compare a hand trace of [1, 0, 0] with your result to catch accidental in-place updates.', hint: 'Use 0 for a missing left or right neighbor. The new state depends only on neighbors from the previous turn.', signature: 'def houses_game(houses, turns):', tests: `assert houses_game([], 3) == []
assert houses_game([1], 1) == [0]
assert houses_game([1, 0, 0], 0) == [1, 0, 0]
assert houses_game([1, 0, 0], 1) == [0, 1, 0]
assert houses_game([1, 0, 0], 2) == [1, 0, 1]
original = [1, 0, 0]
houses_game(original, 1)
assert original == [1, 0, 0]`, solution: `def houses_game(houses, turns):
    current = houses[:]
    for turn in range(turns):
        next_state = []
        for i in range(len(current)):
            left = current[i - 1] if i > 0 else 0
            right = current[i + 1] if i + 1 < len(current) else 0
            next_state.append(1 if left != right else 0)
        current = next_state
    return current` }
    ]
  }
];
export const module3PracticeIds = module3Lessons.flatMap(l => l.practices.map(p => p.id));
export function starterCode(p: Practice) {
  return `# TECH460 Module 3 - companion practice, not a Canvas submission\n${p.imports || ''}\n\n${p.signature}\n    # TODO: implement the stated companion contract\n    pass\n\n# These assertions should fail until you implement the function.\n${p.tests}\nprint('All companion checks passed. Add your own boundary test.')`;
}
export const module3Sources = [
  { label: '[1] Python: control flow, range, break and continue', href: 'https://docs.python.org/3/tutorial/controlflow.html' },
  { label: '[2] Python: sqrt, isqrt and isclose', href: 'https://docs.python.org/3/library/math.html' },
  { label: '[3] Python: lists, tuples and looping techniques', href: 'https://docs.python.org/3/tutorial/datastructures.html' }
];
