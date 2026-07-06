// File: app/frontend/src/components/home/Process.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';

export const Process = () => {
  const processData = KCROC_GRAPH.processes.find(p => p.id === 'proc-standard');
  if (!processData) return null;

  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-white mb-16 text-center">How Our Repair Process Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {processData.steps.map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="text-6xl font-black text-slate-800 mb-4">0{item.step}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
