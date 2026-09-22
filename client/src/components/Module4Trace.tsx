import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { frequencyTrace, pointerTrace, matrixTrace, operationModel } from '@/lib/module4Trace';

export function EfficiencyLab() {
  const [n, setN] = useState(20);
  const model = operationModel(n);
  return <section className="m3-paper m4-model"><div className="m3-eyebrow">GROWTH LAB / A MODEL, NOT A BENCHMARK</div><h2>Count the work before timing it.</h2><p>For a no-match pair search, an exhaustive scan of distinct index pairs tests n(n − 1) / 2 candidates. A one-pass dictionary approach processes n items, performing a constant number of dictionary operations per item on average.</p><label htmlFor="m4-size">Input length: <strong>{n}</strong></label><input id="m4-size" type="range" min="2" max="100" value={n} onChange={e => setN(Number(e.target.value))} /><div className="m4-model-stats" aria-live="polite"><div><strong>{model.candidates.toLocaleString()}</strong><span>exhaustive pair candidates</span></div><div><strong>{model.lookupSteps}</strong><span>one-pass item visits</span></div></div><p className="m3-muted">These are different work units, not measured seconds or a promised speedup. Hash lookups have average-case constant cost, not an unconditional guarantee; the dictionary also needs extra memory. Small inputs and implementation overhead can change real timings.</p></section>;
}
export default function Module4Trace({ lesson }: { lesson: number }) {
  const [step, setStep] = useState(0);
  const [scenario, setScenario] = useState(0);
  const hashValues = [4, 1, 4, 2];
  const pointerScenarios = [{ label: 'Pair found', values: [1, 2, 4, 6, 9], target: 8 }, { label: 'No pair', values: [1, 2, 4], target: 10 }, { label: 'Duplicates', values: [3, 3], target: 6 }];
  const matrixScenarios = [{ label: 'Rectangular 2 × 3', values: [[3, 1, 4], [1, 5, 9]] }, { label: 'Single row', values: [[2, 7, 1]] }];
  const pointer = pointerScenarios[scenario] || pointerScenarios[0];
  const matrix = matrixScenarios[scenario]?.values || matrixScenarios[0].values;
  const hashFrames = frequencyTrace(hashValues), pointerFrames = pointerTrace(pointer.values, pointer.target), matrixFrames = matrixTrace(matrix);
  const frames = lesson === 1 ? hashFrames : lesson === 2 ? pointerFrames : matrixFrames;
  const currentStep = Math.min(step, frames.length - 1);
  const current = frames[currentStep];
  const h = hashFrames[Math.min(step, hashFrames.length - 1)], p = pointerFrames[Math.min(step, pointerFrames.length - 1)], m = matrixFrames[Math.min(step, matrixFrames.length - 1)];
  return <section className="m3-trace m4-trace" aria-label="Interactive algorithm trace"><div className="m3-eyebrow">VISUAL LAB / PREDICT → STEP → EXPLAIN</div><h2>{lesson === 1 ? 'See the dictionary remember.' : lesson === 2 ? 'Move a pointer for a reason.' : 'Swap coordinates, not assumptions.'}</h2><p>{lesson === 1 ? 'Before advancing, predict which key changes. A repeated value updates an existing count, not the number of distinct keys.' : lesson === 2 ? `The input is already sorted. Find one distinct-index pair whose values total ${pointer.target}. Each frame shows the comparison before the pointer moves.` : 'Trace a new transpose without mutating the input. Each step copies exactly one cell; unfilled output cells are shown as dots.'}</p>
    {lesson !== 1 && <div className="m4-scenarios" role="group" aria-label="Trace scenarios">{(lesson === 2 ? pointerScenarios : matrixScenarios).map((s, i) => <Button key={s.label} size="sm" variant="outline" className={scenario === i ? 'm3-gold' : 'm3-trace-reset'} aria-pressed={scenario === i} onClick={() => { setScenario(i); setStep(0); }}>{s.label}</Button>)}</div>}
    {lesson === 1 && <><div className="m3-array">{hashValues.map((v, i) => <div key={i} className={h.index === i ? 'active' : ''}><small>index {i}</small><strong>{v}</strong>{h.index === i && <span className="m3-active-label">current</span>}</div>)}</div><div className="m4-dictionary"><span>Dictionary after this step</span><code>{JSON.stringify(h.counts)}</code></div></>}
    {lesson === 2 && <div className="m3-array">{pointer.values.map((v, i) => <div key={i} className={p.left === i || p.right === i ? 'active' : ''}><small>index {i}</small><strong>{v}</strong><span className="m3-active-label">{p.left === i && p.right === i ? 'L = R' : p.left === i ? 'L / left' : p.right === i ? 'R / right' : '·'}</span></div>)}</div>}
    {lesson === 3 && <div className="m4-matrices"><div><h3>Input · {matrix.length} × {matrix[0].length}</h3><div className="m4-matrix" style={{ gridTemplateColumns: `repeat(${matrix[0].length}, minmax(0, 1fr))` }}>{matrix.flatMap((row, r) => row.map((v, c) => <div key={`${r}-${c}`} className={r === m.row && c === m.col ? 'active' : ''}><small>[{r}][{c}]</small><strong>{v}</strong></div>))}</div></div><div><h3>Output · {matrix[0].length} × {matrix.length}</h3><div className="m4-matrix" style={{ gridTemplateColumns: `repeat(${matrix.length}, minmax(0, 1fr))` }}>{m.output.flatMap((row, r) => row.map((v, c) => <div key={`${r}-${c}`} className={r === m.col && c === m.row ? 'active' : ''}><small>[{r}][{c}]</small><strong>{v ?? '·'}</strong></div>))}</div></div></div>}
    <div className="m3-trace-readout" aria-live="polite" aria-atomic="true"><strong>Frame {currentStep + 1} of {frames.length}</strong>{lesson === 2 && p.sum !== null && <code>{pointer.values[p.left]} + {pointer.values[p.right]} = {p.sum} {p.found ? '✓' : ''}</code>}<p>{current.text}</p></div><div className="m3-actions"><Button variant="outline" className="m3-trace-reset" disabled={currentStep === 0} onClick={() => setStep(currentStep - 1)}><ArrowLeft size={16} />Previous step</Button><Button className="m3-gold" disabled={currentStep === frames.length - 1} onClick={() => setStep(currentStep + 1)}>Next step<ArrowRight size={16} /></Button><Button variant="outline" className="m3-trace-reset" onClick={() => setStep(0)}><RotateCcw size={16} />Reset trace</Button></div>
  </section>;
}
