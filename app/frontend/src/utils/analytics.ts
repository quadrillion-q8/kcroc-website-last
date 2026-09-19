// File: app/frontend/src/utils/analytics.ts
import { trackEvent } from '../core/analytics/core';

/**
 * Reusable utility to track lead-related interactions across the KCROC website.
 * The core analytics dispatcher enforces the site's optional-tracking consent gate.
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
