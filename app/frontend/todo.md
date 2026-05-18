# KCROC Service Booking Form - Development Plan

## Design Guidelines
- Match existing KCROC website style: emerald/green primary, white backgrounds, clean cards
- Color Palette: --primary: #059669, --primary-dark: #047857, --accent: #f59e0b, --call: #2563eb
- Typography: System fonts (already in kcroc.css)
- Form style: Clean white cards with emerald accents, matching existing .quote-form styles

## Development Tasks

1. **Database Setup** - Create `service_bookings` table via BackendManager.create_tables
2. **BookingPage.tsx** - New page with the service booking form component
3. **App.tsx** - Add /book route
4. **Header.tsx** - Add "Book Now" link to navigation
5. **Footer** - Add "Book Service" link in App.tsx footer quick links
6. **Lint & Build** - Run pnpm run lint && pnpm run build

## Files to Create/Modify
- `/workspace/app/frontend/src/pages/BookingPage.tsx` (NEW)
- `/workspace/app/frontend/src/App.tsx` (MODIFY - add route + footer link)
- `/workspace/app/frontend/src/components/Header.tsx` (MODIFY - add Book Now nav)