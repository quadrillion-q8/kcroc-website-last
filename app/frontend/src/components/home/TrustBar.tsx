// File: app/frontend/src/components/home/TrustBar.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { ShieldCheck, Truck, Lock, Zap, Star } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  'ShieldCheck': ShieldCheck,
  'Truck': Truck,
  'Lock': Lock,
  'Zap': Zap,
  'Star': Star
};

export const TrustBar = () => {
  const badges = KCROC_GRAPH.trustBadges;

  return (
    <div className="grid grid-cols-2 sm:flex sm:justify-center gap-0 sm:gap-8 border-y border-white/5 bg-brand-dark/40">
      {badges.map((badge) => {
        const Icon = ICON_MAP[badge.iconKey];
        return (
          <div key={badge.id} className="flex items-center justify-center gap-2 px-3 py-3 sm:px-0 sm:py-6 text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide">
            {Icon && <Icon className="w-4 h-4 text-emerald-500" />}
            {badge.title}
          </div>
        );
      })}
    </div>
  );
};
