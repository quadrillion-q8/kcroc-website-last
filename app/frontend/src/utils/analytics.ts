// File: app/frontend/src/utils/analytics.ts
import { trackEvent } from '../core/analytics/core';

/**
 * Reusable utility to track lead-related interactions across the KCROC website.
 * Consent is enforced by Google Consent Mode (see index.html).
 */
export const trackLead = (
  buttonName: string,
  additionalParams?: Record<string, string | number | boolean>,
) => {
  trackEvent('generate_lead', {
    event_category: 'Contact',
    event_label: buttonName,
    ...additionalParams,
  });
};
