// File: app/frontend/src/core/analytics/usePageTracking.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from './trackers';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    let animationFrameId: number;

    // requestAnimationFrame ensures the DOM paint has completed 
    // and your SEO Helmet has successfully updated the document.title
    animationFrameId = requestAnimationFrame(() => {
      trackPageView();
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, [location.pathname, location.search]); 
};
