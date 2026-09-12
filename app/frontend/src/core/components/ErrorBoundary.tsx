import React from 'react';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  isChunkError: boolean;
}

// 🩹 FIX: companion to the `vite:preloadError` handler in main.tsx. That
// listener catches the common case, but a failed dynamic import can also
// surface as a plain thrown error straight into React's render (e.g. if it
// doesn't go through Vite's preload wrapper in a given browser), which
// bypasses the window event entirely and lands here instead. Recognize that
// class of error by message so this boundary doesn't show visitors a dead
// "Something went wrong" screen for what's actually just a stale chunk after
// a new deploy — it force-reloads once, same guard key as main.tsx, and
// falls back to the normal crash UI if a fresh reload doesn't resolve it.
const isChunkLoadError = (error: Error): boolean =>
  /failed to fetch dynamically imported module|dynamically imported module|loading chunk .* failed|importing a module script failed/i.test(
    error.message || ''
  );

// 🩹 FIX: WhatsApp link previously hardcoded the phone number instead of
// sourcing it from the graph's business entity — this is the site's
// crash-fallback CTA, so it's especially important it never silently
// points at a stale number. Computed once at module load via the shared
// helper (reads KCROC_GRAPH.business.telephone).
const CRASH_WA_LINK = buildWhatsAppLink();

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    isChunkError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, isChunkError: isChunkLoadError(error) };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);

    if (this.state.isChunkError && typeof window !== 'undefined') {
      const RELOAD_GUARD_KEY = 'kcroc:chunk-reload-attempted';
      if (!sessionStorage.getItem(RELOAD_GUARD_KEY)) {
        sessionStorage.setItem(RELOAD_GUARD_KEY, '1');
        window.location.reload();
      }
      // If the guard is already set, a reload already didn't fix it this
      // session — fall through and render the normal crash UI below rather
      // than looping.
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-brand-dark text-slate-50">
          <h2 className="text-2xl font-extrabold text-cyan-400 mb-4">
            {this.state.isChunkError ? 'Updating the site…' : 'Something went wrong.'}
          </h2>
          <p className="text-slate-300 mb-6 max-w-md">
            {this.state.isChunkError
              ? "We've just shipped an update and this page needs a quick refresh to load it."
              : 'We experienced a technical issue loading this page.'}
          </p>
          <div className="flex gap-4">
            <a href="/" className="px-6 py-3 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors">
              Return Home
            </a>
            <a href={CRASH_WA_LINK} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:bg-cyan-400 transition-colors">
              Contact via WhatsApp
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
