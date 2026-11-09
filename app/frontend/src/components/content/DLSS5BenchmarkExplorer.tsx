import React, { useMemo, useState } from 'react';

type Resolution = '1440p' | '4K';
type Metric = 'average' | 'low';

const BENCHMARKS = {
  '1440p': {
    average: {
      base: { off: 95.8, on: 83.8 },
      mfg4x: { off: 302.2, on: 256.7 },
    },
    low: {
      base: { off: 78.9, on: 71.5 },
      mfg4x: { off: 168.0, on: 152.0 },
    },
  },
  '4K': {
    average: {
      base: { off: 75.6, on: 57.2 },
      mfg4x: { off: 226.1, on: 179.1 },
    },
    low: {
      base: { off: 67.2, on: 53.0 },
      mfg4x: { off: 138.8, on: 122.9 },
    },
  },
} as const;

const formatFPS = (value: number) => value.toFixed(1);
const costPercent = (off: number, on: number) => ((off - on) / off) * 100;

export default function DLSS5BenchmarkExplorer() {
  const [resolution, setResolution] = useState<Resolution>('1440p');
  const [metric, setMetric] = useState<Metric>('average');

  const rows = useMemo(() => {
    const selected = BENCHMARKS[resolution][metric];
    return [
      { key: 'base', label: 'Neural Rendering · MFG off', values: selected.base },
      { key: 'mfg4x', label: 'Neural Rendering · 4× MFG', values: selected.mfg4x },
    ];
  }, [resolution, metric]);

  const maximum = Math.max(...rows.flatMap((row) => [row.values.off, row.values.on]));

  return (
    <section
      className="my-10 rounded-2xl border border-slate-700 bg-slate-950/80 p-5 sm:p-6"
      aria-labelledby="dlss5-benchmark-explorer-title"
    >
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-400">Interactive benchmark explorer</p>
        <h3 id="dlss5-benchmark-explorer-title" className="mt-2 text-xl font-black text-white">
          RTX 5090 · Hogwarts Legacy · DLSS Quality
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Switch resolution and metric to compare the same ComputerBase measurements with Neural Rendering off and on.
        </p>
      </div>

      <div className="flex flex-wrap gap-5">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Output resolution</p>
          <div className="flex rounded-xl border border-slate-700 p-1" role="group" aria-label="Choose output resolution">
            {(['1440p', '4K'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={resolution === option}
                onClick={() => setResolution(option)}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${resolution === option ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">FPS metric</p>
          <div className="flex rounded-xl border border-slate-700 p-1" role="group" aria-label="Choose FPS metric">
            <button
              type="button"
              aria-pressed={metric === 'average'}
              onClick={() => setMetric('average')}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${metric === 'average' ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              Average FPS
            </button>
            <button
              type="button"
              aria-pressed={metric === 'low'}
              onClick={() => setMetric('low')}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${metric === 'low' ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              1% low
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400" aria-label="Chart legend">
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-slate-500" aria-hidden="true" /> DLSS 5 off</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-cyan-400" aria-hidden="true" /> DLSS 5 on</span>
      </div>

      <div className="mt-5 space-y-6" aria-live="polite" aria-atomic="true">
        {rows.map((row) => {
          const loss = costPercent(row.values.off, row.values.on);
          return (
            <div key={row.key} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-bold text-white">{row.label}</h4>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300">
                  {loss.toFixed(1)}% lower with DLSS 5
                </span>
              </div>
              <div className="space-y-3">
                {([
                  { label: 'DLSS 5 off', value: row.values.off, className: 'bg-slate-500' },
                  { label: 'DLSS 5 on', value: row.values.on, className: 'bg-cyan-400' },
                ] as const).map((bar) => (
                  <div key={bar.label}>
                    <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                      <span className="font-semibold text-slate-300">{bar.label}</span>
                      <strong className="tabular-nums text-white">{formatFPS(bar.value)} FPS</strong>
                    </div>
                    <div
                      className="h-3 overflow-hidden rounded-full bg-slate-800"
                      role="img"
                      aria-label={`${bar.label}: ${formatFPS(bar.value)} FPS`}
                    >
                      <div
                        className={`h-full rounded-full ${bar.className}`}
                        style={{ width: `${(bar.value / maximum) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-xs leading-5 text-slate-500">
        Source: ComputerBase, November 5, 2026. RTX 5090, DLSS Quality. The 4× MFG figures include generated frames; they are not the underlying base-rendered FPS.
      </p>
    </section>
  );
}
