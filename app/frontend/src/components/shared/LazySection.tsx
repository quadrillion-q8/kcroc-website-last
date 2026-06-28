// File: src/components/shared/LazySection.tsx
import React, { Suspense, Component, ErrorInfo, ReactNode } from 'react';
import SectionSkeleton from './SectionSkeleton'; // Updated import path

interface Props {
  children: ReactNode;
  label: string;
  variant?: 'cards' | 'lines' | 'block';
  className?: string;
}

// Error Boundary remains the same
class ErrorBoundary extends Component<{ children: ReactNode, label: string }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export const LazySection = ({ children, label, variant = 'block', className }: Props) => (
  <section className={`w-full ${className}`}>
    <ErrorBoundary label={label}>
      <Suspense fallback={<SectionSkeleton variant={variant} />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  </section>
);
