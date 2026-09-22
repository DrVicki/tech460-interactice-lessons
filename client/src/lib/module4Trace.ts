export function frequencyTrace(values: number[]) {
  const counts: Record<string, number> = {};
  const frames = [{ index: -1, counts: {} as Record<string, number>, text: 'Start with an empty dictionary. No values have been processed.' }];
  values.forEach((value, index) => {
    const previous = counts[value] || 0;
    counts[value] = previous + 1;
    frames.push({ index, counts: { ...counts }, text: `Read values[${index}] = ${value}. The previous count was ${previous}; store ${previous + 1}. The dictionary now counts exactly the processed prefix.` });
  });
  return frames;
}
export function pointerTrace(values: number[], target: number) {
  if (values.some((value, i) => i > 0 && value < values[i - 1])) throw new Error('The trace requires sorted input.');
  let left = 0, right = values.length - 1;
  const frames: { left: number; right: number; sum: number | null; text: string; found: boolean }[] = [];
  while (left < right) {
    const sum = values[left] + values[right];
    if (sum === target) { frames.push({ left, right, sum, text: `Found distinct indices (${left}, ${right}). Their values sum to ${target}. Stop: this contract asks for one pair, not all pairs.`, found: true }); return frames; }
    frames.push({ left, right, sum, text: sum < target ? `Sum ${sum} is below ${target}. With this left value, every remaining smaller right value also falls short. Discard left index ${left} by moving left forward.` : `Sum ${sum} exceeds ${target}. With this right value, every remaining larger left value is also too large. Discard right index ${right} by moving right backward.`, found: false });
    if (sum < target) left++; else right--;
  }
  frames.push({ left, right, sum: null, text: 'The pointers have met or crossed. There are no two distinct candidate indices left, so return None.', found: false });
  return frames;
}
export function matrixTrace(matrix: number[][]) {
  const rows = matrix.length, cols = rows ? matrix[0].length : 0;
  if (matrix.some(row => row.length !== cols)) throw new Error('The trace requires rectangular input.');
  const output: (number | null)[][] = Array.from({ length: cols }, () => Array<number | null>(rows).fill(null));
  const frames = [{ row: -1, col: -1, output: output.map(row => [...row]), text: `Create ${cols} independent output rows, each with ${rows} cells. The transpose swaps the dimensions.` }];
  matrix.forEach((line, row) => line.forEach((value, col) => {
    output[col][row] = value;
    frames.push({ row, col, output: output.map(line => [...line]), text: `Copy input[${row}][${col}] = ${value} into output[${col}][${row}]. Advance across the input row before moving down.` });
  }));
  return frames;
}
export function operationModel(n: number) { return { candidates: n * (n - 1) / 2, lookupSteps: n }; }
