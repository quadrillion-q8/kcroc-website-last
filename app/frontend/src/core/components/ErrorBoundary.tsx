// File: app/frontend/src/core/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught exception in React tree:', error, errorInfo);
    // TODO: Future integration point for Sentry / Datadog telemetry
  }

  public render() {
    if (this.state.hasError) {
      const WA_LINK = `https://wa.me/96555301913?text=${encodeURIComponent("Hi KCROC, I encountered a technical issue on your website. I need help with my device.")}`;

      return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 bg-gray-950 font-sans text-white">
          <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl text-center">
            <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
              <AlertTriangle className="w-8 h-8 text-red-500" aria-hidden="true" />
            </div>
            
            <h1 className="text-2xl font-black mb-3 text-white tracking-tight">System Exception</h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              We encountered an unexpected error while loading this interface. Our diagnostics have been notified. Please return to the homepage or contact our lab directly for immediate assistance.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-6 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-[1.02] transition-all">
                <a href="/">
                  <Home className="w-4 h-4 mr-2" aria-hidden="true" /> Return to Homepage
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 py-6 rounded-xl transition-all">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" /> Contact Support Lab
                </a>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
