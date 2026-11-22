# KCROC global UI contrast, hierarchy and simplicity policy

Applies to **every current and new KCROC page**, both English and Kuwaiti-style Arabic, including navigation, services, location pages, repair problem pages, booking/contact, guides, FAQ, and future components.

## Non-negotiable accessibility rules

1. **Surface and text must match.** Declare `data-kcroc-surface="light"` or `data-kcroc-surface="dark"` on any mixed-theme panel. Use the centralized `--kcroc-ui-*` color pairs in `app/frontend/src/index.css`. Never place dark ink on a graphite panel or muted light text on a cream panel.
2. **Contrast thresholds.** At least WCAG AA 4.5:1 for normal text and placeholders, 3:1 for large text and essential controls/field outlines. Do not imply guaranteed accessibility on the basis of token checks alone; check rendered styles, states and focus rings.
3. **Fields must be legible.** Visible labels (14px or larger), field text at least 16px, controls at least 44px high, explicit hover/focus styles, sufficient contrast for empty placeholders and entered values, and full keyboard interaction. Field labels must remain visible after typing.
4. **Buttons must communicate priority.** One visually primary action per task and a clearly readable secondary action. Copper primary buttons use dark text; pale secondary buttons use dark text, while graphite secondary buttons use light text. Do not make the phone or WhatsApp action blend into a dark background.
5. **Clear hierarchy.** Each panel needs a descriptive heading, optional one-sentence explanation, then controls/information. Headings should dominate labels, labels should dominate help text. Prefer real customer language over internal “protocol”, “dispatch”, “SLA”, and decorative counters.
6. **One coherent surface system.** Light editorial cards use warm paper/white and dark ink; dark technical/safety modules are purposeful exceptions and must opt in explicitly. Do not mix a dark form with adjacent white information cards when both perform the same ordinary customer task. Keep emergency/safety styling distinguishable.
7. **Reduce visual noise.** Avoid animated status dots, repetitive badges, overdesigned technical labels, nested dark/light cards, and redundant text. Use at most two form columns on desktop, one on mobile; preserve comfortable spacing, RTL flow and responsive tap targets.
8. **No style bleed.** Global theme CSS must exclude nested dark opt-in modules from blanket light text/card/button selectors. Avoid global descendant `* { color: ... !important; }` overrides. Protect the color of badges, status indicators, numbered steps and CTA labels.
9. **Preserve business and SEO integrity.** Keep canonical URLs, structured data, conversion event names, contact links, bilingual parity, approved service claims and existing pricing-page layout unchanged when implementing accessibility fixes.

## Implementation pattern

- Shared tokens / form standards: `app/frontend/src/index.css`
- Template-specific editorial containment: `app/frontend/src/pages/KCROCEditorialRollout.css`
- Demonstration: Kuwait City pickup form is a light opt-in form; the emergency protocol is an intentionally dark opt-in module.
- Put `data-kcroc-form` on new structured customer forms to inherit the global label/input/target/focus rules. Use `data-kcroc-action="primary"` or `data-kcroc-action="secondary"` for consistent actions.
- For Arabic interfaces, keep the same contrast rules and native RTL alignment; no Latin-style tracking on Arabic headings.

## Required checks on every UI change

Run `node scripts/validate-kcroc-ui-contrast.mjs` and the existing `node scripts/validate-global-ui-ux.mjs` as part of prebuild. Review actual rendered desktop (1440px), tablet (768px), and mobile (375px) layouts, in EN/AR and with keyboard navigation. Verify field, button and heading contrast in computed styles rather than trusting source class names.

This policy is mandatory for new UI work; source assertions cannot prove that every pre-existing component has been visually audited.

## Required FAQ treatment (website-wide, including English and ar-KW)

Every FAQ item, whether a native details/summary disclosure, custom accessible button/region accordion, or intentionally static answer card, must declare \`data-kcroc-faq-item="true"\`. Group wrappers with obsolete dark backgrounds can opt into \`data-kcroc-faq-list="true"\`.

- **Surface:** white \`#FFFFFF\`, warm white \`#FFFAF4\` when expanded; dark question text \`#172022\`; answer text \`#566467\`; copper arrows and focus \`#8F4F2C\`. Control boundaries and foreground colors must meet their respective WCAG AA contrasts.
- **Interaction:** FAQ accordions start collapsed (unless a deep link opens one). Never hide answer text from SSG HTML or break FAQPage answer/source parity. Preserve existing question IDs, answer text, analytics events, and links.
- **Layout:** no muddy gray cards or dark-on-dark question text; visible arrows, clear 16px questions, accessible focus styles, keyboard interaction, responsive spacing, logical RTL alignment, and reduced-motion support.
- **Separation:** TOC disclosures, diagnostic tools, safety warnings and pricing matrices are **not** FAQ cards and must never receive FAQ-specific recoloring.
- **Release gate:** the frontend prebuild executes \`scripts/validate-kcroc-faq-global.mjs\`, checking contrast token pairs, template opt-in inventory, and source-level collapsed behavior. In addition, run the full SSG/SEO/FAQ schema checks and visually inspect EN/AR at 375px, 768px and 1440px.
