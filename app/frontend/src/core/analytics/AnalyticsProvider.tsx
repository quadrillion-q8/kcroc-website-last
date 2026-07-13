import React, { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Registry } from '../../knowledge/registry';
import { trackEvent, buildEntityPayload } from './index'; // assuming index.ts exports these
import { AnalyticsEvent, BaseEventPayload, BookingEvent } from './types';

interface AnalyticsContextValue {
  currentEntity: any | null;
  trackConversion: (event: AnalyticsEvent | BookingEvent, payload: BaseEventPayload) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const currentEntity = useMemo(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const slug = pathParts[pathParts.length - 1];
    return Registry.getServiceBySlug(slug) || null;
  }, [location.pathname]);

  const trackConversion = (event: AnalyticsEvent | BookingEvent, payload: BaseEventPayload) => {
    const entityContext = currentEntity ? buildEntityPayload(currentEntity, 'Service') : {};
    trackEvent(event, { ...entityContext, ...payload });
  };

  return (
    <AnalyticsContext.Provider value={{ currentEntity, trackConversion }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return context;
};
