// File: app/frontend/src/core/analytics/usePageTracking.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from './trackers';

/**
 * Custom hook to automatically fire GA4 page views in a React SPA.
 * Drop this into your RootLayout.tsx so it listens to every route change.
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Wait a brief moment to ensure the document.title has updated
    const timeoutId = setTimeout(() => {
      trackPageView();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.search]); 
};
