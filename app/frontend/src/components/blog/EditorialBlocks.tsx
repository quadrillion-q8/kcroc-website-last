import React from 'react';
import { CheckCircle2, Cpu, Gauge, Thermometer, Zap } from 'lucide-react';

export interface ComparisonRow { feature: string; intel: string; amd: string; takeaway?: string; }
export interface DecisionItem { audience: string; priority: string; guidance: string; }

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="my-10 overflow-x-auto rounded-2xl border border-slate-800" role="region" aria-label="Intel Core Ultra and AMD Ryzen AI comparison" tabIndex={0}>
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <caption className="sr-only">Intel Core Ultra versus AMD Ryzen AI at a glance</caption>
        <thead>
          <tr className="bg-slate-900">
            <th scope="col" className="p-4 text-left text-xs font-black uppercase tracking-wide text-slate-400">What matters</th>
            <th scope="col" className="p-4 text-left text-xs font-black uppercase tracking-wide text-cyan-400">Intel Core Ultra</th>
            <th scope="col" className="p-4 text-left text-xs font-black uppercase tracking-wide text-emerald-400">AMD Ryzen AI</th>
            <th scope="col" className="p-4 text-left text-xs font-black uppercase tracking-wide text-slate-400">Buyer takeaway</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-slate-800/80 align-top">
              <th scope="row" className="p-4 text-left font-bold text-white">{row.feature}</th>
              <td className="p-4 text-slate-300">{row.intel}</td>
              <td className="p-4 text-slate-300">{row.amd}</td>
              <td className="p-4 text-slate-400">{row.takeaway || 'Compare the exact laptop configuration.'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TechnicalDiagram({ title, children, icon: Icon = Cpu }: { title: string; children: React.ReactNode; icon?: React.ElementType }) {
  return (
    <figure className="my-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7">
      <figcaption className="mb-5 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-cyan-400">
        <Icon size={17} aria-hidden="true" /> {title}
      </figcaption>
      <div className="grid gap-3 sm:grid-cols-3">{children}</div>
    </figure>
  );
}

export function DiagramStep({ title, text, emphasis }: { title: string; text: string; emphasis?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${emphasis ? 'border-cyan-500/40 bg-cyan-500/10' : 'border-slate-800 bg-slate-950/50'}`}>
      <p className="font-black text-white">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-400">{text}</p>
    </div>
  );
}

export function DecisionGuide({ items }: { items: DecisionItem[] }) {
  return (
    <div className="my-10 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <article key={item.audience} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-lg font-black text-white">{item.audience}</h3>
            <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-300">{item.priority}</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{item.guidance}</p>
        </article>
      ))}
    </div>
  );
}

export function BuyingChecklist({ items }: { items: string[] }) {
  return (
    <div className="my-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-7">
      <h3 className="mb-5 flex items-center gap-2 text-xl font-black text-white"><CheckCircle2 className="text-cyan-400" aria-hidden="true" /> Laptop buying checklist</h3>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map(item => <li key={item} className="flex gap-3 text-sm text-slate-300"><span aria-hidden="true">□</span><span>{item}</span></li>)}
      </ul>
    </div>
  );
}

export function PerformanceEquation() {
  return (
    <TechnicalDiagram title="Laptop performance is a system" icon={Gauge}>
      <DiagramStep title="CPU" text="Architecture and core count set the ceiling, but only within the power and thermal envelope." />
      <DiagramStep title="Power + cooling" text="Firmware, sustained power limits, heatpipes, fans and chassis determine how long performance can be maintained." emphasis />
      <DiagramStep title="Memory + GPU" text="RAM configuration, iGPU bandwidth and dedicated-GPU power can change the result dramatically." />
    </TechnicalDiagram>
  );
}

export function ThermalDiagram() {
  return (
    <TechnicalDiagram title="What happens as heat rises" icon={Thermometer}>
      <DiagramStep title="Normal load" text="The cooling system removes heat while clocks remain within the intended operating envelope." />
      <DiagramStep title="Sustained heat" text="Temperature, power and fan behavior converge on the laptop's thermal limits." emphasis />
      <DiagramStep title="Thermal throttling" text="The processor reduces frequency and/or power to stay within safe limits. Performance becomes lower but more sustainable." />
    </TechnicalDiagram>
  );
}

export function NpuDiagram() {
  return (
    <TechnicalDiagram title="Where the NPU fits" icon={Zap}>
      <DiagramStep title="App feature" text="An application requests a supported AI inference task such as background blur or noise removal." />
      <DiagramStep title="NPU" text="The neural processing unit executes supported inference efficiently, reducing the need to use CPU resources for that task." emphasis />
      <DiagramStep title="Result" text="The benefit appears only when software actually supports the NPU and the workload maps well to it." />
    </TechnicalDiagram>
  );
}
