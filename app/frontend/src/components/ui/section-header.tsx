// File: src/components/ui/section-header.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  /** Eyebrow color — the site mostly uses emerald, ServicesGrid uses cyan. */
  tone?: 'emerald' | 'cyan';
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Reusable eyebrow + H2 + description block. Carries no font-size classes
 * of its own — sizing comes from the global `h2` rule in index.css — so it
 * stays in sync automatically if the type scale ever changes.
 */
export function SectionHeader({
  eyebrow,
  tone = 'emerald',
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center';
  return (
    <div className={cn('mb-8 sm:mb-12', isCenter && 'text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'text-[11px] font-bold uppercase tracking-[1px] mb-2 sm:mb-3',
            tone === 'cyan' ? 'text-cyan-400' : 'text-emerald-500'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2>{title}</h2>
      {description && (
        <p className={cn('mt-3 text-slate-400 text-sm sm:text-base leading-relaxed', isCenter && 'max-w-xl mx-auto')}>
          {description}
        </p>
      )}
    </div>
  );
}
