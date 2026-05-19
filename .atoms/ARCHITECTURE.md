---
last_updated: 2026-05-19T23:15:18Z
---

# Architecture Design

## System Overview
KCROC is a full-stack web app with a React frontend (Vite + TS + Tailwind + shadcn/ui) and a FastAPI backend on Atoms Cloud. Users browse services, submit bookings via a form, and receive WhatsApp confirmations. The backend exposes REST endpoints for booking creation/management and handles persistence via SQLAlchemy + Alembic migrations.

## Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, react-router
- Backend: Python, FastAPI, SQLAlchemy, Alembic
- Database: Atoms Cloud (PostgreSQL)
- Auth: Atoms Cloud Auth
- Messaging: WhatsApp (booking confirmations)
- Tooling: pnpm (frontend), uvicorn (backend)

## Module Design
| Module | Responsibility | Key Files |
|--------|---------------|-----------|
| Frontend Pages | Public service pages, booking flow, gallery | app/frontend/src/pages/*.tsx |
| Frontend Components | Layout, Header/Footer, Hero, CTA, Reviews, FloatingActions | app/frontend/src/components/*.tsx |
| SEO | Per-page metadata via SEOHead | app/frontend/src/components/SEOHead.tsx |
| Auth Guard | Protect admin routes | app/frontend/src/components/ProtectedAdminRoute.tsx |
| Backend API | Routing layer for bookings/services | app/backend/routers/ |
| Backend Services | Business logic for bookings | app/backend/services/service_bookings.py |
| Backend Models/Schemas | ORM models + Pydantic schemas | app/backend/models/, app/backend/schemas/ |
| Migrations | DB schema versioning | app/backend/alembic/ |

## Tech Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Frontend framework | React + Vite | Fast dev, modern DX |
| UI library | shadcn/ui + Tailwind | Composable, customizable |
| Backend framework | FastAPI | Async, type-safe, auto OpenAPI |
| ORM | SQLAlchemy + Alembic | Mature, migration-friendly |
| Auth | Atoms Cloud Auth | Reuse platform auth, avoid custom JWT |
| Confirmation channel | WhatsApp | Local user preference in Kuwait |

## File Tree Plan
```
workspace/
├── app/
│   ├── backend/
│   │   ├── main.py
│   │   ├── lambda_handler.py
│   │   ├── alembic/ + alembic.ini
│   │   ├── core/
│   │   ├── routers/
│   │   ├── services/service_bookings.py
│   │   ├── models/, schemas/
│   │   ├── data_models/
│   │   ├── dependencies/, middlewares/, utils/
│   │   └── skills_docs/
│   └── frontend/
│       ├── package.json, pnpm-lock.yaml
│       ├── public/
│       └── src/
│           ├── App.tsx, main.tsx, index.css
│           ├── pages/ (Home, Services, BookingPage, Gallery, About,
│           │          Contact, Pricing, LaptopRepair, MacBookRepair,
│           │          BatteryReplacement, ScreenReplacement,
│           │          GamingPCCooling, WebDesignKuwait, NotFound,
│           │          Index, LogoutCallbackPage)
│           ├── components/ (Header, Footer, Hero, Layout, Reviews,
│           │               Services, Contact, CallToAction,
│           │               FloatingActions, LoadingSpinner,
│           │               ProtectedAdminRoute, SEOHead, ui/)
│           ├── api/, contexts/, hooks/, lib/, styles/
└── .atoms/ (ATOMS.md, PROGRESS.md, ARCHITECTURE.md)
```

## Implementation Guide
- Frontend dev: `cd app/frontend && pnpm install && pnpm run dev`
- Frontend build/lint: `pnpm run lint && pnpm run build`
- Backend dev: `cd app/backend && pip install -r requirements.txt && uvicorn main:app --reload`
- DB migrations: use Alembic via `alembic upgrade head` from `app/backend/`
- Add new service page: create `src/pages/<Service>.tsx`, register route in `App.tsx`, add `SEOHead` metadata, link from `Services.tsx`/`Header.tsx` as needed
- Booking flow: `BookingPage.tsx` → POST to backend booking endpoint in `routers/` → `services/service_bookings.py` persists + triggers WhatsApp confirmation
- Admin routes: wrap with `ProtectedAdminRoute` using Atoms Cloud auth context

