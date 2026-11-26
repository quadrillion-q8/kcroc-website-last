# KCROC editorial image frame policy — 2026-11-27

Applies to every route using the shared contextual editorial treatment, in either language.

- No forced square or 4:3 canvas for naturally shaped photographs. No white pillarboxing or letterboxing. The frame follows the image's intrinsic aspect ratio and fills its column.
- Hero photographs fill their available width with natural height, without a white matte or clipped caption.
- Desktop sticky photography may be center-cropped only if its natural height exceeds the available reading viewport. Preserve relevant content; use an explicitly marked diagram for any raster illustration that must never be cropped.
- SVG and explicitly marked technical diagrams remain at their natural ratio and scroll normally on desktop. Never crop labels.
- Keep existing section-specific image uniqueness, alt text, captions, lazy loading, responsive stacking and intelligent sticky article navigation.
- Do not apply these rules to logos, icons, or unrelated UI assets.
- Browser regression checks inspect decoded image sizing, padding, hero width, fit, and diagram ratio at 390, 768, 1024, 1440 and 1920px on representative routes including the Intel vs AMD guide. Inspect screenshot evidence before production release. Source-image borders, if any, are a separate asset-quality issue.
