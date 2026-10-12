# KCROC Mobile Improvement Completion — 12 October 2026

## Applied to the supplied baseline

This update was rebased onto the user-supplied `kcroc-website-last-main.zip` rather than reusing the older completed archive wholesale. Existing non-mobile work in the supplied baseline was retained, including its current `src/data/graph.ts` local-area FAQ and service/problem content and its current `src/pages/PrivacyPolicy.tsx` wording and links.

## Source changes

- **First-screen conversion:** preserves the hero's booking and WhatsApp actions, uses a native H1, adjusts narrow-screen CTA widths/padding, and refines the responsive hero-image `sizes` value while keeping high loading priority.
- **Earlier service discovery:** moves the core service grid directly after the trust strip and before the guided quote selector.
- **Touch usability and safe areas:** improves the persistent Call/WhatsApp bar's narrow-screen sizing, keeps device safe areas in mind, and adds a bottom spacer sized for the sticky controls.
- **Cookie choices on small screens:** makes the consent panel compact and scrollable on short viewports, positions it above the mobile contact bar, and improves button sizing and focus styling. The open mobile navigation layers above the panel.
- **Booking form accessibility and funnel:** uses semantic form submission, connects visible labels to form controls, exposes selected device chips with `aria-pressed`, and records `begin_booking` only once when the visitor starts interacting. WhatsApp handoff is tracked separately as `whatsapp_click`.
- **WhatsApp routing and measurement:** uses the shared WhatsApp link helper on the booking page and mobile menu; mobile-menu WhatsApp taps send explicit `whatsapp_click` events.
- **Regression guard:** adds `scripts/validate-mobile-improvements.mjs` and runs it during `prebuild` so key mobile layout/accessibility and analytics contracts are checked before a release build.

## Checks completed in this environment

- `node scripts/validate-main-landmarks.mjs` — passed.
- `node scripts/validate-mobile-improvements.mjs` — passed.
- TypeScript/TSX syntax transpilation — 117 source files checked; no syntax diagnostics.
- Verified that `src/data/graph.ts` and `src/pages/PrivacyPolicy.tsx` remain byte-for-byte identical to the newly supplied baseline.
- Archive integrity is checked after packaging.

The TypeScript transpilation check is a syntax check, not a full semantic type-check. A full Vite/SSG production build and ESLint run were not completed because dependencies are not installed in this environment and the repository's pinned package manager setup is unavailable here.

## Still needs preview/production verification

- Test narrow mobile layouts at 320×720, 360×800, 390×844, and 430×932, including mobile navigation, cookie choices, booking fields and the sticky Call/WhatsApp bar.
- Run same-condition mobile PageSpeed Insights/Lighthouse measurements before and after deployment and compare LCP, INP, and CLS.
- Confirm that analytics events arrive in the live analytics property.
- Do not infer `booking_complete` from opening WhatsApp. The website cannot observe whether the customer confirms a repair inside WhatsApp; accurate completion tracking needs a confirmed-booking/CRM signal or an import of confirmed bookings.

This archive contains source changes only. It has not been deployed to production from this environment.
