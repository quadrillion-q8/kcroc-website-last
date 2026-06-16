import React from 'react';
import { Link } from 'react-router-dom';
import { INTERNAL_FOOTER_LINKS, SERVICE_AREAS } from '../../constants/data';

export default function LocalSEOFooter() {
  return (
    <section className="w-full py-20 bg-slate-900/10 border-t border-slate-800/50 flex justify-center px-6 relative z-10">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight text-center">
          Professional Computer Repair Services in Kuwait
        </h2>
        <div className="space-y-6 text-slate-400 text-sm md:text-base leading-relaxed text-center mb-8">
          <p>
            KCROC provides professional laptop and computer repair services throughout Kuwait including {SERVICE_AREAS.slice(0, 8).join(', ')}, and more.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {INTERNAL_FOOTER_LINKS.map(link => (
            <Link key={link.path} to={link.path} className="text-cyan-400 hover:text-cyan-300 underline text-sm transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 rounded p-1">
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
