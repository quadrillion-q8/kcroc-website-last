import React from 'react';
import { BUSINESS_INFO, AREAS } from '../../constants/data';

export default function AreasServed() {
  // Convert object values into an array for mapping
  const areaList = Object.values(AREAS);

  return (
    <section className="w-full py-16 border-y border-slate-800/50 flex justify-center px-6 text-center bg-slate-900/20 backdrop-blur-sm relative z-10">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-black text-white mb-6 tracking-tight">Serving Customers Across Kuwait</h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          {BUSINESS_INFO.name} provides free pickup and delivery throughout {areaList.slice(0, -1).map(a => a.name).join(', ')}, and {areaList[areaList.length - 1].name}.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {areaList.map(area => (
            <span 
              key={area.name} 
              className="px-4 py-2 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300 text-sm font-medium hover:border-cyan-500/30 transition-colors cursor-default"
            >
              {area.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
