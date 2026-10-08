import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Laptop, MonitorCog } from 'lucide-react';

type Props = {
  context?: string;
};

export function CoreRepairPillars({ context = 'Choose the right starting point for a Kuwait repair job.' }: Props) {
  return (
    <section
      aria-labelledby="core-repair-pillars"
      className="mx-auto max-w-7xl px-6 py-12 border-t border-slate-800/50 relative z-10"
    >
      <div className="mb-7 max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400 mb-2">
          Core repair services
        </p>
        <h2 id="core-repair-pillars" className="text-2xl sm:text-3xl font-black text-white">
          Start with the main Kuwait repair service
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">{context}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/computer-repair-kuwait"
          className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-cyan-500/40 hover:bg-slate-900/75"
        >
          <MonitorCog className="h-6 w-6 text-cyan-400" aria-hidden="true" />
          <h3 className="mt-4 text-xl font-black text-white group-hover:text-cyan-300">
            Computer Repair Kuwait
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            The main commercial repair hub for desktops, laptops, gaming PCs, MacBooks and motherboard faults.
            Free pickup and delivery are available across Kuwait.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">
            View computer repair service <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>

        <Link
          to="/laptop-repair-kuwait"
          className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-cyan-500/40 hover:bg-slate-900/75"
        >
          <Laptop className="h-6 w-6 text-cyan-400" aria-hidden="true" />
          <h3 className="mt-4 text-xl font-black text-white group-hover:text-cyan-300">
            Laptop Repair Kuwait
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            The focused laptop repair hub for screens, batteries, charging, hinges, overheating, upgrades and
            motherboard-level faults.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">
            View laptop repair service <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}

export default CoreRepairPillars;
