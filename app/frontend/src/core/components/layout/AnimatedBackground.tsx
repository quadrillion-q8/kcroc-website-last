// File: app/frontend/src/core/components/layout/AnimatedBackground.tsx
import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* Deep dark base layer */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* 
        Increased opacity (/30 and /20) and reduced blur slightly (100px) 
        so the glowing orbs actually show up against the dark background! 
      */}
      <div className="absolute top-1/4 -left-10 w-[500px] h-[500px] rounded-full bg-cyan-500/30 blur-[100px] animate-blob" />
      
      <div className="absolute bottom-1/4 -right-10 w-[500px] h-[500px] rounded-full bg-emerald-500/20 blur-[100px] animate-blob [animation-delay:3s]" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-500/20 blur-[120px] animate-blob [animation-delay:6s]" />

    </div>
  );
};
