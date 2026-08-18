import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // CTA hierarchy — spec Section 16. Centralizes the cyan/emerald/
        // underline patterns already hand-rolled inline across Hero,
        // PricingTable, FAQSection etc. Existing inline-styled buttons are
        // untouched; new code can reach for these instead of re-typing
        // "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full".
        ctaPrimary:
          'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full shadow-lg shadow-cyan-500/10 min-h-[44px]',
        ctaSecondary:
          'border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-bold rounded-full bg-transparent min-h-[44px]',
        ctaTertiary:
          'text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4 bg-transparent p-0 h-auto',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
