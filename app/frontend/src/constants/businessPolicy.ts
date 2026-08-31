// File: app/frontend/src/constants/businessPolicy.ts
// Canonical business-policy values used by customer-facing components.
// Keep this file aligned with the actual KCROC operating policy.

export const KCROC_POLICY = {
  warranty: {
    enabled: true,
    durationDays: 30,
    coverage: 'All parts and labor on the repair performed.',
  },
  pickupAndDelivery: {
    enabled: true,
    label: 'Free pickup & delivery across Kuwait',
  },
  noFixNoFee: true,
} as const;

export const getWarrantyLabel = () =>
  `${KCROC_POLICY.warranty.durationDays}-day warranty`;
