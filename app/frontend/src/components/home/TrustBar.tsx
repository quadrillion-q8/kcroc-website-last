// File: app/frontend/src/components/home/TrustBar.tsx
import React from 'react';
import { useHomeLocale } from './homeLocale';
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
  const { ar } = useHomeLocale();
  const badges = KCROC_GRAPH.trustBadges;

  return (
    <div className="grid grid-cols-2 sm:flex sm:justify-center gap-0 sm:gap-10 border-y border-white/[0.06] bg-brand-dark/30">
      {badges.map((badge) => {
        const Icon = ICON_MAP[badge.iconKey];
        return (
          <div key={badge.id} className="flex min-h-12 min-w-0 items-center justify-center gap-2 px-3 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-[#C4CDD1] sm:px-0 sm:py-5 sm:text-sm">
            {Icon && <Icon className="h-4 w-4 shrink-0 text-[#AAB5B9]" aria-hidden="true" />}
            {ar ? ({ 'badge-privacy': 'خصوصية بياناتك', 'badge-pickup': 'استلام وتوصيل مجاني', 'badge-warranty': 'ضمان 30 يوم', 'badge-esd': 'مختبر آمن من الكهرباء الساكنة' } as Record<string,string>)[badge.id] ?? badge.title : badge.title}
          </div>
        );
      })}
    </div>
  );
};
