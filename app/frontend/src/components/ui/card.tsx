import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * KCROC Card System — spec Section 7 (Card System Refinement) / Section 30
 * (Design Tokens). Three explicit hierarchy levels instead of the ad-hoc
 * `bg-slate-900/xx border rounded-2xl` combos repeated across ~50 files:
 *
 *   level="feature"   Level 1 — major selling points. Stronger elevation,
 *                      more padding. Use sparingly (2-4 per page max).
 *   level="standard"  Level 2 — normal supporting info. Restrained border,
 *                      moderate padding, no glow/elevation.
 *   level="compact"   Level 3 — small info. No container at all, just a
 *                      flex row (icon + text). Use instead of wrapping
 *                      everything in a bordered box.
 *   level="none"      (default) No injected classes — fully controlled by
 *                      the caller's className, exactly like the old Card.
 *
 * Existing call sites that don't pass `level` are unaffected.
 */
const cardVariants = cva('transition-all duration-300', {
  variants: {
    level: {
      feature:
        'bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/40 shadow-lg shadow-black/20',
      standard:
        'bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:border-slate-700',
      compact: 'flex items-center gap-3',
      none: '',
    },
  },
  defaultVariants: {
    level: 'none',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, level, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ level }), className)} {...props} />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 mb-3', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-lg font-bold leading-tight text-white', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-slate-400 leading-relaxed', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn(className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center mt-4 pt-4 border-t border-slate-800/60', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
