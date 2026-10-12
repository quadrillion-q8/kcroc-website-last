// File: app/frontend/src/core/components/CookieConsentBanner.tsx
import React, { useEffect, useState } from 'react';
import { Shield, Check, X, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  getConsentState,
  setConsentState,
} from '../privacy/consent';

declare global {
  interface WindowEventMap {
    'kcroc:open-consent-preferences': CustomEvent;
  }
}

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = getConsentState();
    setIsVisible(stored === 'unknown');

    const handleOpen = () => setIsVisible(true);
    window.addEventListener('kcroc:open-consent-preferences', handleOpen);

    return () => window.removeEventListener('kcroc:open-consent-preferences', handleOpen);
  }, []);

  const handleAccept = () => {
    setConsentState('granted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    setConsentState('denied');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="kcroc-cookie-banner fixed bottom-24 left-0 right-0 z-[100] font-sans md:bottom-0"
      role="dialog"
      aria-label="Privacy and cookie choices"
      aria-live="polite"
    >
      <div className="bg-brand-dark/95 backdrop-blur-xl border-t border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] p-4 sm:p-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="hidden sm:flex w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-cyan-500" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg tracking-tight mb-1">
                Privacy & Cookie Choices
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
                KCROC uses Google Analytics to understand traffic. Until you choose, only anonymous, cookie-free measurement is used; accepting allows cookies for fuller analytics and advertising measurement. Read our{' '}
                <Link to="/privacy-policy" className="text-cyan-500 hover:text-cyan-400 underline underline-offset-2">
                  Privacy Policy
                </Link>{' '}
                for details.
              </p>
            </div>
          </div>

          <div className="flex flex-row w-full md:w-auto gap-2 sm:gap-3 shrink-0">
            <button
              onClick={handleDecline}
              className="flex-1 md:flex-none flex min-h-[44px] items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white font-bold text-sm touch-manipulation transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <X className="w-4 h-4 shrink-0 mr-1.5 sm:mr-2" aria-hidden="true" />
              <span className="sm:hidden">Reject</span>
              <span className="hidden sm:inline">Reject Optional</span>
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none flex min-h-[44px] items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl border border-transparent bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-black text-sm shadow-[0_0_15px_rgba(6,182,212,0.2)] touch-manipulation transition-colors focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <Check className="w-4 h-4 shrink-0 mr-1.5 sm:mr-2" aria-hidden="true" />
              <span className="sm:hidden">Accept</span>
              <span className="hidden sm:inline">Accept Optional</span>
            </button>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl mt-3 flex items-center gap-2 text-[11px] text-slate-500">
          <Settings2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>
            You can revisit these choices from the Privacy Policy at any time.
          </span>
        </div>
      </div>
    </div>
  );
};
