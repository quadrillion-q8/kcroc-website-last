# KCROC — No Duplicate Images Per Page

**Owner policy:** Display each content photograph or illustration at most once on any individual page, in English or Arabic. Reusing an image on different URLs, including language twins, is permitted.

## Scope
All home, service, problem, brand, location, directory, booking, business, gallery and editorial pages. Hero, gallery, cards, article figures and background imagery count together. Resizing, cropping, mirroring, converting formats or renaming a photograph does not make it a new photograph. Choose a genuinely different relevant image or remove the redundant placement. Preserve accurate alt text, image dimensions, licensing, layout, pricing and SEO metadata. Prefer genuine KCROC workshop imagery; do not fabricate repair evidence.

Header/footer logos and metadata (Open Graph, JSON-LD, preloads) are not content placements. A picture element and its responsive alternatives are one placement. Opening an existing gallery thumbnail in a temporary lightbox is an interaction with that image, not a new editorial placement.

## Verification and rollout
- The production build runs a mandatory strict audit over all prerendered HTML routes and writes `app/frontend/page-image-audit.json`. Review every finding.
- After building, run `pnpm run validate:page-images` in `app/frontend`. Known duplicate placements fail this strict command. Run it before approving an image-related release.
- The production build must fail if any duplicate pair is found. Do not merge or deploy an image-related change unless certification is clean. Review the generated report and check the expanded homepage service cards in a browser.
- Automated checks cover main-content img/srcset/picture placements, inline CSS image URLs, KCROC .wNNN derivatives and identical local asset bytes. They do not prove visual uniqueness across edited/re-encoded photos, stylesheet-only backgrounds or client-only interactions. Review those manually on mobile and desktop. Do not bypass the policy by renaming or cropping assets.

