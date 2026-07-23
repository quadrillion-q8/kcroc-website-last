import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-slate-950 text-slate-50">
          <h2 className="text-2xl font-extrabold text-cyan-400 mb-4">Something went wrong.</h2>
          <p className="text-slate-300 mb-6 max-w-md">
            We experienced a technical issue loading this page. 
          </p>
          <div className="flex gap-4">
            <a href="/" className="px-6 py-3 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors">
              Return Home
            </a>
            <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:bg-cyan-400 transition-colors">
              Contact via WhatsApp
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
