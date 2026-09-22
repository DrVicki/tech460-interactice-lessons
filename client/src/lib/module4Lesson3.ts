import type { M4Lesson } from './module4Types';

export const module4Lesson3: M4Lesson = {
  id: 3,
  title: 'Matrices: Rectangular Traversal & Bounded Neighborhoods',
  short: 'Use row and column coordinates safely on rectangular matrices.',
  intro: 'Created by Dr. Vicki Bealman for TECH460 companion study. These practice contracts require a nonempty rectangular list of row lists; this is a chosen policy, not a universal Python rule. The optional integration challenge deliberately uses a different empty-input policy. Build independent rows whenever later updates must affect one row only. You will validate its shape before indexing, traverse every cell without assuming a square, transpose rows into columns, and inspect only in-bounds orthogonal neighbors. The examples deliberately reject malformed shapes and never wrap an index from one edge to the opposite edge.',
  objectives: [
    'Validate a nonempty rectangular matrix and use row-column coordinates to access every cell safely.',
    'Implement rectangular traversal, transpose, and diagonal calculations without assuming equal row and column counts.',
    'Analyze a bounded local neighborhood and explain why negative indexing and aliased rows produce incorrect matrix behavior.'
  ],
  concepts: [
    {
      title: 'Coordinates and rectangular shape',
      text: 'For a matrix with R rows and C columns, a valid cell has coordinates (r, c) where 0 <= r < R and 0 <= c < C. The matrix is rectangular only when every row has the same positive length C. A 2 by 5 matrix is valid even though it is not square. Validate before nested indexing so a jagged row cannot cause a late or misleading IndexError.'
    },
    {
      title: 'Traversal is row-major, not square-only',
      text: 'A row-major traversal uses an outer loop over rows and an inner loop over the columns of that row. With a validated rectangle, range(rows) and range(cols) visit each cell exactly once, including duplicate values as distinct cells. The number of iterations is R times C, not R squared unless the particular input happens to be square.'
    },
    {
      title: 'Transpose and independent rows',
      text: 'The transpose of an R by C matrix is a C by R matrix whose cell (c, r) receives the original cell (r, c). Our nonmutating transpose contract creates new output row lists while swapping the dimensions. Avoid constructing rows with [[value] * C] * R: repetition aliases one inner list, so a write through one row appears in every row. A nested comprehension creates a distinct inner list for each row.'
    },
    {
      title: 'Bounded neighborhoods, diagonals, and local evidence',
      text: 'Orthogonal neighbors are the candidates up, left, right, and down that pass the same bounds check as any cell. Reject candidates outside the matrix rather than relying on Python negative indices, which would wrap to a real position from the end. A rectangular diagonal has min(R, C) cells; the main diagonal uses (i, i), while the anti-diagonal uses (i, C - 1 - i). A clipped local window generalizes this idea by checking each candidate coordinate before including it.'
    }
  ],
  worked: `def require_rectangle(matrix):
    if not isinstance(matrix, list) or not matrix:
        raise ValueError('matrix must be a nonempty list of rows')
    if not all(isinstance(row, list) for row in matrix):
        raise TypeError('each row must be a list')
    cols = len(matrix[0])
    if cols == 0 or any(len(row) != cols for row in matrix):
        raise ValueError('matrix must be rectangular with positive width')
    return len(matrix), cols


def transpose(matrix):
    rows, cols = require_rectangle(matrix)
    return [[matrix[r][c] for r in range(rows)] for c in range(cols)]


def orthogonal_neighbors(matrix, row, col):
    rows, cols = require_rectangle(matrix)
    if type(row) is not int or type(col) is not int:
        raise TypeError('row and col must be exact integers')
    if not (0 <= row < rows and 0 <= col < cols):
        raise IndexError('cell is outside the matrix')
    result = []
    for dr, dc in [(-1, 0), (0, -1), (0, 1), (1, 0)]:
        nr, nc = row + dr, col + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            result.append((nr, nc, matrix[nr][nc]))
    return result


matrix = [[2, 2, 5, 7], [1, 3, 3, 9], [4, 6, 8, 8]]
rows, cols = require_rectangle(matrix)
row_sums = []
for r in range(rows):
    total = 0
    for c in range(cols):
        total += matrix[r][c]
    row_sums.append(total)

assert (rows, cols) == (3, 4)
assert row_sums == [16, 16, 26]
assert transpose(matrix) == [[2, 1, 4], [2, 3, 6], [5, 3, 8], [7, 9, 8]]
assert orthogonal_neighbors(matrix, 0, 0) == [(0, 1, 2), (1, 0, 1)]
assert orthogonal_neighbors(matrix, 2, 3) == [(1, 3, 9), (2, 2, 8)]

aliased = [[0] * 3] * 2
aliased[0][0] = 9
independent = [[0 for _ in range(3)] for _ in range(2)]
independent[0][0] = 9
assert aliased == [[9, 0, 0], [9, 0, 0]]
assert independent == [[9, 0, 0], [0, 0, 0]]
`,
  walkthrough: [
    {
      title: 'Validate before coordinate arithmetic',
      text: 'require_rectangle first rejects an empty outer list, non-list rows, an empty first row, and rows whose length differs from the first row. It returns rows = 3 and cols = 4 for the example, so later coordinates are interpreted against an explicit 3 by 4 shape.'
    },
    {
      title: 'Traverse all cells',
      text: 'The outer loop selects rows 0 through 2. For each row, the inner loop selects columns 0 through 3 and adds that cell exactly once. The two equal row totals show that duplicate numeric values are preserved rather than deduplicated.'
    },
    {
      title: 'Transpose a rectangle',
      text: 'The transpose loops over the original four columns first. For original column 0, it reads values at (0, 0), (1, 0), and (2, 0) to produce [2, 1, 4]. The result has four rows and three columns, which demonstrates why a transpose of a rectangle need not be square.'
    },
    {
      title: 'Filter neighbor candidates by bounds',
      text: 'At (0, 0), up and left are rejected before indexing. Only right and down remain. At (2, 3), down and right are rejected. The method never reads matrix[-1][0] or matrix[2][-1], so Python negative indexing cannot create wraparound behavior.'
    },
    {
      title: 'Debug row aliasing',
      text: 'The repeated-row construction stores two references to one inner list, so changing aliased[0][0] changes both displayed rows. The nested comprehension creates two separate inner lists, and the same write changes only the intended row.'
    }
  ],
  invariant: 'After validation, rows and cols describe the matrix for the entire operation. Every matrix access satisfies 0 <= r < rows and 0 <= c < cols. A full traversal visits each coordinate once; a bounded-neighbor routine emits only valid candidate coordinates and never wraps across an edge.',
  complexity: 'Let R be rows, C be columns, and N = R times C. Checking only row containers and their lengths costs O(R) time and O(1) auxiliary space. Row-major traversal, transpose, and a diagonal scan cost O(N), O(N), and O(min(R, C)) time respectively; transpose uses O(N) output space and O(1) auxiliary space beyond that output. After shape validation, one orthogonal-neighbor query is O(1) time and O(1) output and auxiliary space because it considers four candidates; the supplied validating function takes O(R) total time. Likewise, the supplied diagonal function takes O(R + min(R, C)) including validation. A radius-k clipped window costs O(R + W) total time including shape validation, where W is the number of returned cells, O(W) output space, and O(1) auxiliary space beyond the output. None of these fixed-grid routines requires hashing. If a later graph traversal keeps a visited set, set insertion and membership are O(1) expected per operation but O(V) worst case per operation for V stored items, and the set uses O(V) auxiliary space.',
  pitfalls: [
    {
      title: 'Negative indexing is accidental wraparound',
      text: 'Python accepts matrix[-1] and row[-1], but those refer to existing last positions. Do not index a neighbor until both candidate coordinates pass explicit lower and upper bounds.'
    },
    {
      title: 'Zip can silently hide a jagged row',
      text: 'Plain zip stops at the shortest row. Using it to transpose an unchecked matrix can discard values without an error. Validate row lengths first, or use zip with strict=True only after choosing a policy for its ValueError.'
    },
    {
      title: 'Repeated rows are not independent rows',
      text: 'The expression [[0] * cols] * rows repeats references to one mutable row. Use a nested comprehension such as [[0 for _ in range(cols)] for _ in range(rows)] whenever later mutation must affect one cell only.'
    }
  ],
  checks: [
    {
      question: 'Predict before revealing: A validated matrix has shape 2 by 5. What shape does its transpose have, and how many coordinates does a complete row-major traversal visit?',
      answer: 'The transpose has shape 5 by 2 because each original column becomes one output row and each original row becomes one output column. Traversal visits 2 times 5 = 10 coordinates. Neither result requires the matrix to be square; using a loop bounded by rows for both dimensions would incorrectly miss columns or index beyond a row.'
    },
    {
      question: 'Predict before revealing: For a 3 by 4 matrix, what should a no-wrap orthogonal-neighbor function return for coordinate (0, 0) if its order is up, left, right, down?',
      answer: 'It returns only right (0, 1) and down (1, 0), in that order. Up would be (-1, 0) and left would be (0, -1), both out of bounds. Python would make those negative indexes refer to existing last positions, so accepting them would incorrectly connect opposite edges instead of reporting a bounded neighborhood.'
    }
  ],
  reflection: 'Choose a small non-square table from a technical context, such as two sensors measured across four intervals. Write its shape and three coordinate-value pairs. Then state one boundary coordinate, list its legal orthogonal neighbors in a fixed order, and describe one assertion you would add to detect either a jagged row or row aliasing before analysis begins.',
  practices: [
    {
      id: 'm4-l3-p1',
      title: 'Validate and report a rectangular shape',
      level: 'core',
      difficulty: 'Build',
      contract: 'Implement matrix_shape(matrix). Input must be a nonempty list whose entries are lists and whose rows all have the same positive length. Return the tuple (row_count, column_count). Raise TypeError when the outer value is not a list or an entry is not a list. Raise ValueError for an empty matrix, a zero-width row, or jagged row lengths. Values inside cells, including duplicates, are not inspected or changed.',
      boundary: 'The policy rejects empty and zero-width shapes instead of assigning them an ambiguous column count. A one-cell matrix is valid. A 2 by 3 matrix is valid and must not be treated as an error because it is not square.',
      plan: 'First check the outer container and that it has at least one row. Check every row container, record the first row length, reject zero width, then ensure every other row has that same length. Finally return the two dimensions.',
      hints: [
        'The number of rows is len(matrix), but use len(matrix[0]) for columns only after confirming that the matrix is nonempty and the first row is a list.',
        'any(len(row) != cols for row in matrix) expresses the rectangularity test after every row has been confirmed as a list.'
      ],
      starter: `def matrix_shape(matrix):
    raise NotImplementedError
`,
      solution: `def matrix_shape(matrix):
    if not isinstance(matrix, list):
        raise TypeError('matrix must be a list')
    if not matrix:
        raise ValueError('matrix must be nonempty')
    if not all(isinstance(row, list) for row in matrix):
        raise TypeError('each row must be a list')
    cols = len(matrix[0])
    if cols == 0:
        raise ValueError('rows must be nonempty')
    if any(len(row) != cols for row in matrix):
        raise ValueError('matrix must be rectangular')
    return len(matrix), cols
`,
      tests: `assert matrix_shape([[1, 1, 2], [3, 5, 8]]) == (2, 3)
assert matrix_shape([[0]]) == (1, 1)
try:
    matrix_shape([])
    assert False, 'empty matrix should fail'
except ValueError:
    pass
try:
    matrix_shape([[1, 2], [3]])
    assert False, 'jagged matrix should fail'
except ValueError:
    pass
try:
    matrix_shape([[1], (2,)])
    assert False, 'non-list row should fail'
except TypeError:
    pass
try:
    matrix_shape([[]])
    assert False, 'zero-width matrix should fail'
except ValueError:
    pass
`,
      explanation: 'The function establishes a shape contract before any matrix algorithm relies on two indices. It intentionally checks row types before calling len on every row. Duplicate cell values are irrelevant because shape depends only on containers and row lengths. The returned dimensions support later loops that safely use row indices from 0 through rows minus 1 and column indices from 0 through cols minus 1.',
      complexity: 'There are R row containers. The function performs O(R) type and length checks and uses O(1) auxiliary space: the all and any generator expressions yield one row at a time rather than storing all rows. It returns one constant-size tuple and does not inspect all R times C cell values.'
    },
    {
      id: 'm4-l3-p2',
      title: 'Transpose a validated rectangle',
      level: 'core',
      difficulty: 'Build',
      contract: 'Implement transpose_rectangular(matrix). The input policy is the same as matrix_shape: a nonempty rectangular list of nonempty list rows is required. Return a new list of lists with shape (columns, rows), where output[c][r] equals input[r][c]. Raise TypeError for non-list containers and ValueError for empty, zero-width, or jagged shapes. Do not mutate the input.',
      boundary: 'A one-row rectangle becomes a column and a one-column rectangle becomes a row. A 2 by 3 input must become a 3 by 2 output. Invalid shapes are rejected before transposition so no values are silently dropped.',
      plan: 'Validate the matrix and record rows and cols. For each original column c, build one new row by reading matrix[r][c] for every original row r. Append each independent new row to the result.',
      hints: [
        'The outer loop range is cols, because the output has one row for every input column.',
        'A nested list comprehension can state the mapping directly: the inner expression reads matrix[r][c], with r varying over input rows.'
      ],
      starter: `def transpose_rectangular(matrix):
    raise NotImplementedError
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
    return [[matrix[r][c] for r in range(rows)] for c in range(cols)]
`,
      tests: `source = [[1, 2, 2], [3, 4, 5]]
assert transpose_rectangular(source) == [[1, 3], [2, 4], [2, 5]]
assert source == [[1, 2, 2], [3, 4, 5]]
assert transpose_rectangular([[7]]) == [[7]]
assert transpose_rectangular([[1], [2], [2]]) == [[1, 2, 2]]
try:
    transpose_rectangular([[1, 2], [3]])
    assert False, 'jagged matrix should fail'
except ValueError:
    pass
try:
    transpose_rectangular([])
    assert False, 'empty matrix should fail'
except ValueError:
    pass
`,
      explanation: 'For each output row c, the inner comprehension collects the c-th value from every original row. This gives output[c][r] = matrix[r][c] and naturally changes a 2 by 3 input into a 3 by 2 output. The returned row lists are newly allocated, so assigning an output cell does not assign an input cell. Cell objects themselves are not deep-copied; mutable objects stored inside cells remain shared. Validation happens before the comprehensions, preventing a short row from being truncated or indexed out of range.',
      complexity: 'Validation is O(R). The nested construction reads each of N = R times C cells once, so total time is O(N). The transpose itself is O(N) output space; aside from the output and comprehension iteration state, auxiliary space is O(1). No hash table is used.'
    },
    {
      id: 'm4-l3-p3',
      title: 'List bounded orthogonal neighbor coordinates',
      level: 'extra',
      difficulty: 'Build',
      contract: 'Implement orthogonal_coordinates(matrix, row, col). The matrix must be a nonempty rectangular list of nonempty list rows. row and col must be exact integers and the requested cell must be in bounds. Raise TypeError for non-integer coordinates. Return a list of valid neighbor coordinate tuples in this exact order: up, left, right, down. Do not include diagonal cells, do not include the center, and do not wrap around an edge. Raise ValueError for an invalid shape and IndexError for an out-of-bounds cell.',
      boundary: 'For a grid with at least two rows and columns, a corner has two neighbors, a non-corner edge has three, and an interior cell has four. Single-row or single-column grids have fewer neighbors. A 1 by 1 matrix returns an empty list. Negative row or column requests are invalid even though Python would normally permit negative indexing.',
      plan: 'Validate the rectangle and requested coordinate. Store the four direction offsets in the required order. Add an offset to the center coordinate, append it only if both coordinates are in bounds, and return the accumulated list.',
      hints: [
        'Use offsets [(-1, 0), (0, -1), (0, 1), (1, 0)] to preserve the required result order.',
        'Compute nr and nc first. The condition is 0 <= nr < rows and 0 <= nc < cols; only then may you append or index.'
      ],
      starter: `def orthogonal_coordinates(matrix, row, col):
    raise NotImplementedError
`,
      solution: `def orthogonal_coordinates(matrix, row, col):
    if not isinstance(matrix, list) or not matrix:
        raise ValueError('matrix must be nonempty')
    if not all(isinstance(item, list) for item in matrix):
        raise ValueError('rows must be lists')
    rows = len(matrix)
    cols = len(matrix[0])
    if cols == 0 or any(len(item) != cols for item in matrix):
        raise ValueError('matrix must be rectangular with positive width')
    if type(row) is not int or type(col) is not int:
        raise TypeError('row and col must be exact integers')
    if not (0 <= row < rows and 0 <= col < cols):
        raise IndexError('cell is outside the matrix')
    result = []
    for dr, dc in [(-1, 0), (0, -1), (0, 1), (1, 0)]:
        nr, nc = row + dr, col + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            result.append((nr, nc))
    return result
`,
      tests: `grid = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]]
assert orthogonal_coordinates(grid, 1, 2) == [(0, 2), (1, 1), (1, 3), (2, 2)]
assert orthogonal_coordinates(grid, 0, 0) == [(0, 1), (1, 0)]
assert orthogonal_coordinates(grid, 2, 3) == [(1, 3), (2, 2)]
assert orthogonal_coordinates([[42]], 0, 0) == []
try:
    orthogonal_coordinates(grid, -1, 0)
    assert False, 'negative index must not wrap'
except IndexError:
    pass
try:
    orthogonal_coordinates([[1, 2], [3]], 0, 0)
    assert False, 'jagged matrix should fail'
except ValueError:
    pass
`,
      explanation: 'The implementation treats directions as candidate coordinate arithmetic rather than as immediate indexing. Each candidate undergoes the same two-dimensional bounds check, which rejects negative indices rather than inheriting Python sequence behavior. The fixed direction sequence makes the output deterministic. It works for 3 by 4 and 1 by 1 inputs because rows and cols are independently measured.',
      complexity: 'Shape validation is O(R). After validation, the routine examines exactly four offsets, so neighbor generation is O(1) time. The returned list has at most four coordinate tuples, making output and auxiliary space O(1). It uses no hashing; a visited set would be unnecessary because these four distinct offsets cannot duplicate a coordinate.'
    },
    {
      id: 'm4-l3-p4',
      title: 'Sum both bounded diagonals of a rectangle',
      level: 'extra',
      difficulty: 'Build',
      contract: 'Implement diagonal_sums(matrix). Input must be a nonempty rectangular list of nonempty list rows containing numbers that support addition. Return the tuple (main_sum, anti_sum). For i from 0 through min(rows, cols) minus 1, add matrix[i][i] to main_sum and matrix[i][cols - 1 - i] to anti_sum. Raise ValueError for empty, zero-width, or jagged shapes. Repeated values and an overlapping center cell are counted wherever their specified diagonal occurrence appears.',
      boundary: 'Rectangles are valid: a 2 by 3 matrix contributes two cells to each diagonal and a 3 by 2 matrix also contributes two. In a 1 by 1 matrix, the sole value is both the main and anti-diagonal sum. The task returns two sums, so this intentional overlap is not deduplicated.',
      plan: 'Validate and measure the rectangle. Set both sums to zero. Loop i over range(min(rows, cols)), reading the main coordinate (i, i) and anti coordinate (i, cols - 1 - i) at each step.',
      hints: [
        'The loop length is min(rows, cols), not rows and not cols alone.',
        'The anti-diagonal starts at the final column of row 0, so its column formula is cols - 1 - i.'
      ],
      starter: `def diagonal_sums(matrix):
    raise NotImplementedError
`,
      solution: `def diagonal_sums(matrix):
    if not isinstance(matrix, list) or not matrix:
        raise ValueError('matrix must be nonempty')
    if not all(isinstance(row, list) for row in matrix):
        raise ValueError('rows must be lists')
    rows = len(matrix)
    cols = len(matrix[0])
    if cols == 0 or any(len(row) != cols for row in matrix):
        raise ValueError('matrix must be rectangular with positive width')
    main_total = 0
    anti_total = 0
    for i in range(min(rows, cols)):
        main_total += matrix[i][i]
        anti_total += matrix[i][cols - 1 - i]
    return main_total, anti_total
`,
      tests: `assert diagonal_sums([[1, 2, 3], [4, 5, 6]]) == (6, 8)
assert diagonal_sums([[1, 2], [3, 4], [5, 6]]) == (5, 5)
assert diagonal_sums([[9]]) == (9, 9)
assert diagonal_sums([[2, 2, 2], [2, 2, 2]]) == (4, 4)
try:
    diagonal_sums([[]])
    assert False, 'zero-width matrix should fail'
except ValueError:
    pass
try:
    diagonal_sums([[1, 2], [3]])
    assert False, 'jagged matrix should fail'
except ValueError:
    pass
`,
      explanation: 'A diagonal is bounded by the smaller dimension because an index i must be valid as both a row index and, for the main diagonal, a column index. For the anti-diagonal, cols minus 1 is the rightmost valid column and subtracting i moves left one column per row. Keeping two totals makes the behavior on a shared center explicit rather than applying an unrequested deduplication rule.',
      complexity: 'Validation costs O(R). The summation loop runs min(R, C) times, so total time is O(R + min(R, C)). The function returns a constant-size tuple and retains O(1) auxiliary space. No output matrix or hash table is constructed.'
    },
    {
      id: 'm4-l3-p5',
      title: 'Analyze a clipped local window',
      level: 'extra',
      difficulty: 'Stretch',
      contract: 'Implement local_window_summary(matrix, row, col, radius). The matrix must be a nonempty rectangular list of nonempty list rows, row and col must identify an existing cell, row and col must be exact integers (otherwise raise TypeError), and radius must be a nonnegative exact integer (otherwise raise ValueError). Cell values must support numeric addition. Return a dictionary with keys values, count, and total. values is a row-major list of triples (r, c, matrix[r][c]) for every in-bounds cell whose row and column each differ from the center by at most radius; it includes the center and diagonal positions. count is len(values), and total is the sum of the included values. Raise ValueError for an invalid shape or negative radius and IndexError for an invalid center coordinate.',
      boundary: 'The requested window is clipped at matrix edges rather than wrapped or padded. Radius zero returns only the center. A radius larger than the dimensions can include the entire rectangular matrix. Duplicate values remain separate triples because coordinates, not values, define membership.',
      plan: 'Validate the matrix, center, and radius. Clamp the row interval to max(0, row - radius) through min(rows, row + radius + 1), and clamp columns similarly. Traverse that rectangle row-major, appending triples and adding their values. Return the three requested fields.',
      hints: [
        'Python range stops before its end, which is why the upper clamp needs row + radius + 1 and col + radius + 1.',
        'Build values and total in the same nested loops. Then count can be len(values), which makes the two returned fields agree by construction.'
      ],
      starter: `def local_window_summary(matrix, row, col, radius):
    raise NotImplementedError
`,
      solution: `def local_window_summary(matrix, row, col, radius):
    if not isinstance(matrix, list) or not matrix:
        raise ValueError('matrix must be nonempty')
    if not all(isinstance(item, list) for item in matrix):
        raise ValueError('rows must be lists')
    rows = len(matrix)
    cols = len(matrix[0])
    if cols == 0 or any(len(item) != cols for item in matrix):
        raise ValueError('matrix must be rectangular with positive width')
    if type(row) is not int or type(col) is not int:
        raise TypeError('row and col must be exact integers')
    if not (0 <= row < rows and 0 <= col < cols):
        raise IndexError('cell is outside the matrix')
    if type(radius) is not int or radius < 0:
        raise ValueError('radius must be a nonnegative integer')
    values = []
    total = 0
    for r in range(max(0, row - radius), min(rows, row + radius + 1)):
        for c in range(max(0, col - radius), min(cols, col + radius + 1)):
            value = matrix[r][c]
            values.append((r, c, value))
            total += value
    return {'values': values, 'count': len(values), 'total': total}
`,
      tests: `grid = [[1, 2, 2, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
assert local_window_summary(grid, 1, 1, 1) == {
    'values': [(0, 0, 1), (0, 1, 2), (0, 2, 2), (1, 0, 5), (1, 1, 6), (1, 2, 7), (2, 0, 9), (2, 1, 10), (2, 2, 11)],
    'count': 9,
    'total': 53,
}
assert local_window_summary(grid, 0, 0, 1) == {
    'values': [(0, 0, 1), (0, 1, 2), (1, 0, 5), (1, 1, 6)],
    'count': 4,
    'total': 14,
}
assert local_window_summary(grid, 2, 3, 0) == {
    'values': [(2, 3, 12)], 'count': 1, 'total': 12
}
assert local_window_summary([[3, 4, 5]], 0, 1, 9) == {
    'values': [(0, 0, 3), (0, 1, 4), (0, 2, 5)], 'count': 3, 'total': 12
}
try:
    local_window_summary(grid, 0, 0, -1)
    assert False, 'negative radius should fail'
except ValueError:
    pass
try:
    local_window_summary(grid, 3, 0, 1)
    assert False, 'out-of-bounds center should fail'
except IndexError:
    pass
`,
      explanation: 'Clamping converts the conceptual square centered at the requested cell into a valid rectangular slice of the actual matrix. The loops use those clamped bounds, so no candidate outside the grid is ever indexed and no negative index can wrap. The output preserves row-major coordinate evidence as well as the numeric total, which makes duplicate values auditable by their distinct positions.',
      complexity: 'Validation costs O(R). Let W be the number of cells in the clipped window, at most min(R, 2radius + 1) times min(C, 2radius + 1). The traversal costs O(W) time, produces O(W) output space for values, and uses O(1) auxiliary space beyond that output. No hash structure is needed because row-major bounds produce each window coordinate exactly once.'
    }
  ],
  sources: [
    {
      label: 'Python documentation: data structures and nested list comprehensions',
      href: 'https://docs.python.org/3/tutorial/datastructures.html'
    },
    {
      label: 'Python documentation: zip and strict unequal-length behavior',
      href: 'https://docs.python.org/3/library/functions.html#zip'
    },
    {
      label: 'Princeton Algorithms, 4.1 Undirected Graphs',
      href: 'https://algs4.cs.princeton.edu/41graph/'
    }
  ]
};
