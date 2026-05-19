---
last_updated: 2026-05-19T23:15:18Z
status: active
---

# Project Context

## Project Overview
KCROC is an online platform for booking computer repair services (laptops, desktops, MacBooks, gaming PCs) in Kuwait. Users can schedule repairs, manage bookings, and receive WhatsApp confirmations. Targets individual consumers and businesses seeking reliable tech support.

## Key Decisions
| Date | Decision | By | Rationale |
|------|----------|-----|-----------|
| 2026-05-18 | Use FastAPI + React + TypeScript + Tailwind | Team | Modern, type-safe full-stack with fast iteration |
| 2026-05-18 | Atoms Cloud as backend platform | Team | Built-in auth, DB, and storage |
| 2026-05-18 | WhatsApp for booking confirmations | Team | Preferred messaging channel in Kuwait market |

## Constraints
- Backend must use Atoms Cloud auth (no separate admin login)
- Frontend uses shadcn/ui + Tailwind CSS
- Service-specific landing pages (Laptop, MacBook, Battery, Screen, Gaming PC) for SEO
- Gallery currently in placeholder state (images removed)
- Locale: Kuwait market focus


