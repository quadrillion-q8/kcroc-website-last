// File: app/frontend/src/core/components/layout/AnimatedBackground.tsx
import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    // TEST 1: Changed from -z-10 to z-0 to guarantee it isn't hiding behind the body layer
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* Solid dark base so we don't rely on RootLayout's background */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* TEST 2: The "Native Tailwind" Test - A bouncing green circle */}
      {/* If you see this bouncing, the component is mounted perfectly! */}
      <div className="absolute left-10 top-32 w-32 h-32 bg-emerald-500 rounded-full animate-bounce shadow-2xl" />

      {/* TEST 3: The "Custom Config" Test - A solid blue circle with NO blur */}
      {/* If you see this moving in a weird shape, your tailwind.config.js is working perfectly! */}
      <div className="absolute right-10 top-32 w-32 h-32 bg-cyan-500 rounded-full animate-blob shadow-2xl" />

      {/* The Actual Glowing Orbs (with increased opacity so we can see them easily) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/50 blur-[80px] animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500/40 blur-[80px] animate-blob [animation-delay:2s]" />

    </div>
  );
};
