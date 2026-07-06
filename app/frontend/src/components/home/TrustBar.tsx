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
    <div className="flex justify-center gap-8 py-6 border-y border-white/5 bg-slate-950 flex-wrap">
      {badges.map((badge) => {
        const Icon = ICON_MAP[badge.iconKey];
        return (
          <div key={badge.id} className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
            {Icon && <Icon className="w-4 h-4 text-emerald-500" />}
            {badge.title}
          </div>
        );
      })}
    </div>
  );
};
