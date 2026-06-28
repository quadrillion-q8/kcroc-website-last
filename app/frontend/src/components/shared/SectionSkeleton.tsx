// src/components/shared/SectionSkeleton.tsx
import React from 'react';

type SectionSkeletonProps = {
  variant?: 'cards' | 'lines' | 'block';
  className?: string;
};

function PulseLine({ className = '' }: { className?: string }) {
  return <div className={`rounded-full bg-slate-800/80 animate-pulse ${className}`} />;
}

function PulseCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
      <div className="flex items-start gap-4">
        <PulseLine className="h-12 w-12 rounded-2xl" />
        <div className="flex-1 space-y-3">
          <PulseLine className="h-4 w-40" />
          <PulseLine className="h-3 w-24" />
          <PulseLine className="h-3 w-full" />
          <PulseLine className="h-3 w-5/6" />
        </div>
      </div>
    </div>
  );
}

export default function SectionSkeleton({
  variant = 'block',
  className = '',
}: SectionSkeletonProps) {
  if (variant === 'cards') {
    return (
      <div className={`w-full space-y-4 ${className}`}>
        <PulseCard />
        <PulseCard />
        <PulseCard />
      </div>
    );
  }

  if (variant === 'lines') {
    return (
      <div className={`w-full rounded-2xl border border-slate-800 bg-slate-950/40 p-5 space-y-4 ${className}`}>
        <PulseLine className="h-5 w-56" />
        <PulseLine className="h-4 w-3/4" />
        <PulseLine className="h-4 w-full" />
        <PulseLine className="h-4 w-5/6" />
        <PulseLine className="h-4 w-2/3" />
      </div>
    );
  }

  return (
    <div className={`w-full rounded-2xl border border-slate-800 bg-slate-950/40 p-6 ${className}`}>
      <div className="space-y-4">
        <PulseLine className="h-5 w-48" />
        <PulseLine className="h-4 w-3/4" />
        <PulseLine className="h-4 w-full" />
        <PulseLine className="h-4 w-5/6" />
      </div>
    </div>
  );
}
