// Professional Studio: navy instrument panel, amber active pair, sage accumulated evidence.
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, RotateCcw } from 'lucide-react';
export type TraceKind = 'opposite' | 'nested' | 'simulation';
export function traceFrames(kind: TraceKind) {
  if (kind === 'opposite') {
    const values = [2, 4, 8, 16, 32];
    return Array.from({ length: Math.floor(values.length / 2) + 1 }, (_, count) => ({
      values: values.map(String), active: count < 2 ? [count, values.length - 1 - count] : [],
      status: count < 2 ? `Next: i = ${count}, opposite index = ${values.length - 1 - count}` : 'Stop: the middle element is unpaired.',
      result: JSON.stringify(Array.from({ length: count }, (_, i) => [values[i], values[values.length - 1 - i]])),
      invariant: `${count} distinct outer pair${count === 1 ? '' : 's'} processed exactly once.`
    }));
  }
  if (kind === 'nested') {
    const first = [1, 2], second = [3, 4, 5];
    const pairs = first.flatMap(a => second.map(b => [a, b]));
    return Array.from({ length: pairs.length + 1 }, (_, count) => ({
      values: pairs.map(p => `(${p[0]}, ${p[1]})`), active: count < pairs.length ? [count] : [],
      status: count < pairs.length ? `Next: i = ${Math.floor(count / second.length)}, j = ${count % second.length}; test sum == 6` : 'Stop: all six cross-array candidates checked.',
      result: JSON.stringify(pairs.slice(0, count).filter(p => p[0] + p[1] === 6)),
      invariant: `Exactly ${count} of ${pairs.length} candidates examined; all matches so far retained.`
    }));
  }
  let state: [string, number][] = [['Ada', 4], ['Bo', 7], ['Cy', 7]];
  const frames = [];
  while (state.length) {
    frames.push({ values: state.map(([name, power]) => `${name} · ${power}`), active: state.length > 1 ? [0, 1] : [0], status: state.length > 1 ? 'Higher strength advances; left wins ties; odd last entry gets a bye.' : 'Stop: Bo is the only remaining participant.', result: state.length > 1 ? 'Next round not yet applied' : 'Winner: Bo · 7', invariant: 'Current state contains only the survivors, in order.' });
    if (state.length === 1) break;
    const next: [string, number][] = [];
    for (let i = 0; i < state.length; i += 2) next.push(i + 1 >= state.length || state[i][1] >= state[i + 1][1] ? state[i] : state[i + 1]);
    state = next;
  }
  return frames;
}
export default function Module3Trace({ kind }: { kind: TraceKind }) {
  const [step, setStep] = useState(0);
  const frames = traceFrames(kind);
  const frame = frames[step];
  return <section className="m3-trace" aria-label="Interactive loop trace">
    <div className="m3-eyebrow">TRACE LAB / {kind === 'opposite' ? 'OUTSIDE → IN' : kind === 'nested' ? 'EVERY CANDIDATE' : 'ROUND → ROUND'}</div>
    <h2>See what the loop does.</h2>
    <p>Predict the next state, then advance one {kind === 'simulation' ? 'round' : 'iteration'}. This illustration does not run or grade your Python.</p>
    {kind === 'nested' && <p className="m3-mono">first = [1, 2] · second = [3, 4, 5] · target = 6</p>}
    <div className="m3-array">{frame.values.map((v, index) => <div key={index} className={frame.active.includes(index) ? 'active' : ''}><small>{kind === 'nested' ? 'candidate' : 'index'} {index}</small><strong>{v}</strong>{frame.active.includes(index) && <span className="m3-active-label">{kind === 'simulation' && step === frames.length - 1 ? 'winner' : 'next'}</span>}</div>)}</div>
    <div className="m3-trace-readout" aria-live="polite"><p>{frame.status}</p><code>result = {frame.result}</code><p>{frame.invariant}</p></div>
    <div className="m3-actions"><Button onClick={() => setStep(s => s + 1)} disabled={step === frames.length - 1} className="m3-gold">{kind === 'simulation' ? 'Advance round' : 'Next iteration'}<ArrowRight size={16} /></Button><Button variant="outline" className="m3-trace-reset" onClick={() => setStep(0)}><RotateCcw size={16} />Reset trace</Button><span>Step {step} / {frames.length - 1}</span></div>
  </section>;
}
