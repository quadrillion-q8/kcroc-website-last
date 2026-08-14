// File: app/frontend/src/core/components/CookieConsentBanner.tsx
import React, { useState, useEffect } from 'react';
import { Shield, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Allow TypeScript to recognize the global gtag function
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem('kcroc-cookie-consent');
    
    if (!consent) {
      // Delay slightly so it doesn't jarringly block the LCP paint
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else if (consent === 'granted') {
      // If previously granted, update gtag immediately on load
      grantConsent();
    }
  }, []);

  const grantConsent = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('kcroc-cookie-consent', 'granted');
    grantConsent();
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('kcroc-cookie-consent', 'denied');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    // 🚀 FIXED-ELEMENT OVERLAP: bottom-24 on mobile keeps this banner clear of
    // the StickyMobileCTA bar (Call/WhatsApp), which is also fixed at
    // bottom-0 with z-50 — previously both sat at bottom-0 and the banner
    // (z-100) would render directly on top of the CTA bar, hiding it behind
    // the cookie prompt for every first-time mobile visitor. md:bottom-0
    // restores the original desktop position, where there's no competing
    // bottom bar. Safe-area padding protects the buttons from the home
    // indicator / gesture area on notched devices.
    <div
      className="fixed bottom-24 left-0 right-0 z-[100] transform transition-transform duration-500 ease-in-out font-sans md:bottom-0"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] p-4 sm:p-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="hidden sm:flex w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-cyan-500" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg tracking-tight mb-1">
                Data Privacy & Analytics
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
                We use cookies to monitor site performance and improve our services. In alignment with our strict data privacy ethos, we do not activate tracking without your explicit consent. Read our <Link to="/privacy-security-kuwait" className="text-cyan-500 hover:text-cyan-400 underline underline-offset-2">Privacy Policy</Link> for details.
              </p>
            </div>
          </div>

          <div className="flex flex-row w-full md:w-auto gap-3 shrink-0">
            <button
              onClick={handleDecline}
              aria-label="Decline cookies"
              className="flex-1 md:flex-none flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white font-bold text-sm transition-all"
            >
              <X className="w-4 h-4 mr-2" aria-hidden="true" />
              Decline
            </button>
            <button
              onClick={handleAccept}
              aria-label="Accept cookies"
              className="flex-1 md:flex-none flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl border border-transparent bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-black text-sm shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-[1.02] transition-all"
            >
              <Check className="w-4 h-4 mr-2" aria-hidden="true" />
              Accept All
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
