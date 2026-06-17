import { Star } from 'lucide-react';

export default function GMBRating() {
  return (
    <a 
      href="https://share.google/bH4mP7dUN4fLt8SBo" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center bg-[#0a0f1c]/80 backdrop-blur-md border border-cyan-500/30 p-4 rounded-l-2xl shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-400 hover:scale-105 transition-all cursor-pointer"
      aria-label="View our Google reviews"
    >
      <div className="text-xl font-black text-white">4.9/5</div>
      <div className="flex text-cyan-400 mb-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-cyan-400" />
        ))}
      </div>
      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        150+ REVIEWS
      </div>
    </a>
  );
}
