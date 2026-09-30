import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // KCROC CTA hierarchy — copper/gold first, neutral second,
        // functional green reserved for WhatsApp and status messaging.
        ctaPrimary:
          'bg-[linear-gradient(135deg,#dfa86f_0%,#c9804d_58%,#a85f34_100%)] hover:brightness-105 text-[#17110c] font-extrabold rounded-xl shadow-kcroc-brand min-h-[46px] transition-[transform,filter,box-shadow] hover:-translate-y-px',
        ctaSecondary:
          'border border-[#c9804d]/55 text-[#efc19c] hover:border-[#c9804d]/80 hover:bg-[#c9804d]/[0.08] font-extrabold rounded-xl bg-transparent min-h-[46px] transition-[transform,background-color,border-color] hover:-translate-y-px',
        ctaTertiary:
          'text-[#dfa86f] hover:text-[#efc19c] font-bold underline underline-offset-4 bg-transparent p-0 h-auto',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-11 rounded-xl px-8',
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
