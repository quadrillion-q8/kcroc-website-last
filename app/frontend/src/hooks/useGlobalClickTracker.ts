// File: app/frontend/src/hooks/useGlobalClickTracker.ts
import { useEffect } from 'react';
import { trackCallClick, trackWhatsAppClick } from '../utils/analytics';

export function useGlobalClickTracker() {
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // Find the closest anchor tag matching the click target element tree hierarchy
      const anchor = (event.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Get the readable page path name clean identifier string (e.g., "/services" or "/about")
      const currentPath = window.location.pathname || 'Home Page';

      // Scenario A: Check for Phone click invocations
      if (href.startsWith('tel:')) {
        trackCallClick(currentPath);
      } 
      
      // Scenario B: Check for WhatsApp link configurations
      else if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        trackWhatsAppClick(currentPath);
      }
    };

    // Attach listener globally to the DOM layout container architecture
    document.addEventListener('click', handleGlobalClick);
    
    // Cleanup lifecycle detachment tracking parameters safely
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);
}
