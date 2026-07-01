// File: app/frontend/src/core/components/layout/AnimatedBackground.tsx
import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    // Uses your new semantic token: bg-brand-dark
    <div className="fixed inset-0 w-full h-full -z-50 bg-brand-dark overflow-hidden pointer-events-none">
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      
      {/* Animated Glowing Orbs using your custom Tailwind Keyframes (animate-blob) */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-brand-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-status-success rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
    </div>
  );
};
