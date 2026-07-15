// File: app/frontend/src/core/components/layout/AnimatedBackground.tsx
import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    // ✅ Fix 2: Changed to -z-10 so it sits right behind content
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

      {/* Base dark background is provided here instead of RootLayout */}
      <div className="absolute inset-0 bg-brand-dark" />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* ✅ Fix 5: Removed mix-blend-multiply and increased blur/opacity */}
      {/* ✅ Fix 4: Used Tailwind arbitrary values [animation-delay:2s] to avoid custom CSS */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-cyan-500/20 blur-[120px] animate-blob" />

      <div className="absolute right-0 top-40 w-96 h-96 rounded-full bg-sky-500/20 blur-[120px] animate-blob [animation-delay:2s]" />

      <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-emerald-500/15 blur-[120px] animate-blob [animation-delay:4s]" />

    </div>
  );
};
