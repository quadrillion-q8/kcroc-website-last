# Kuwait Computer Repair On Call (KCROC)

**Production website:** https://www.computerrepairkuwait.com/  
**Service area:** Kuwait  
**Purpose:** Production web application and supporting implementation notes for Kuwait Computer Repair On Call.

KCROC provides computer and laptop repair services in Kuwait, including component-level diagnostics and repair. The website communicates service availability, repair options, pickup/delivery, and booking or contact paths for local customers.

## Repository layout

- `app/frontend/` — React, TypeScript and Vite application, build scripts, public assets, and dependencies.
- `app/frontend/src/data/graph.ts` — canonical route/entity graph used by the site's route and SEO data flow.
- `app/frontend/src/data/navGraph.generated.ts` and `seoGraph.generated.ts` — generated projections; update the authoritative source and run the generators rather than hand-editing generated output.
- `*.md` at the repository root — dated implementation notes, audits, and release evidence. Treat these as historical records; check the current source and deployment before relying on a note as the live state.

## Stack and runtime

- React 19, TypeScript, Vite 5, React Router, Tailwind CSS
- Static-site generation with `vite-react-ssg`
- PNPM 8.10.0 as declared in `app/frontend/package.json`
- Node.js 22.x

## Run locally

From the repository root:

```bash
cd app/frontend
pnpm install --frozen-lockfile
pnpm run dev
```

## Validate a production build

From `app/frontend/`:

```bash
pnpm run build
```

The build pipeline runs validation and generated-data steps, creates the sitemap, prerenders routes, and runs the SEO audit. Review any failures rather than bypassing the validation gates. Other useful scripts include:

```bash
pnpm run lint
pnpm run generate:nav
pnpm run generate:seo
pnpm run generate:sitemap
pnpm run audit:seo
```

Run generators through the documented scripts. Do not edit generated sitemap/SEO output by hand when the source graph is responsible for it.

## Environment variables and secrets

See `app/frontend/.env.example` for supported variable names. Depending on enabled functionality, the application may use server-side credentials for AI features, WhatsApp/Meta webhooks, or optional Upstash rate limiting/idempotency.

- Keep real credentials in local environment files or the deployment provider's secret settings.
- Never commit API keys, access tokens, webhook secrets, or customer information.
- A blank value in `.env.example` is a placeholder, not a working credential.
- Verify the applicable environment variables in a safe preview before enabling integrations in production.

## Release discipline

1. Change authoritative source data and components; do not patch generated artifacts manually.
2. Run the complete production build and resolve validation failures.
3. Review the rendered pages, canonical URLs, robots directives, sitemap membership, and mobile interactions in preview.
4. Confirm production deployment status before considering a release complete.

## Project and reuse

This repository is public, but no root license file was found during this review. Do not assume the application code, branding, images, or business content is licensed for reuse. Contact the owner for permission before copying or redistributing them.
