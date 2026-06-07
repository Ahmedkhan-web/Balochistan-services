# Architecture

## Overview

BSS is a single-page React application backed by Supabase. It is designed to be
**backend-optional**: when Supabase env vars are absent, stores fall back to
local seed data so the entire UI (including dashboards) is browsable.

```
┌─────────────────────────────────────────────────────────┐
│                      React SPA (Vite)                     │
│                                                           │
│  Pages ── Router ── Layouts ── Components (ui/common)      │
│     │                                                     │
│     ├── Zustand stores  (auth, cart, ui)                  │
│     ├── React Query     (server cache)                    │
│     └── English-only UI/content                           │
│                  │                                        │
│                  ▼                                        │
│        lib/supabase.ts  ──(if configured)──► Supabase     │
└─────────────────────────────────────────────────────────┘
                                   │
                                   ▼
        Postgres · Auth · RLS · Storage · Edge Functions
```

## Key decisions

- **Demo mode** (`isSupabaseConfigured`): `lib/supabase.ts` returns `null` when
  env vars are missing. Stores branch on this to use `DEMO_*` data, so the app
  never crashes without a backend and is fully demoable.
- **Data router**: `react-router-dom`'s `createBrowserRouter` enables
  `ScrollRestoration` and nested layout routes (`PublicLayout`,
  `DashboardLayout`). Auth is enforced via the `ProtectedRoute` wrapper with an
  optional `roles` allow-list.
- **Auth & RBAC**: `authStore` manages the session/profile. Roles
  (`customer · staff · manager · admin · super_admin`) gate the `/admin` area;
  the same model is mirrored server-side by RLS helper functions
  (`is_staff()`, `is_admin()`).
- **State**: ephemeral UI/cart/theme state lives in Zustand (persisted to
  `localStorage`); server data is fetched/cached through React Query when a
  backend is connected.
- **Styling**: Tailwind with CSS variables for theming (light/dark via a
  `.dark` class) and a green brand palette. UI primitives follow the shadcn
  pattern (CVA variants) but are vendored locally under `components/ui`.
- **Type safety**: domain types in `types/index.ts`; Supabase row/insert/update
  types in `types/database.ts` (regenerate with `supabase gen types`).

## Data model

See `supabase/migrations/0001_init.sql` for the full schema. Highlights:

- `profiles` extends `auth.users` (auto-created via the `on_auth_user_created`
  trigger).
- Catalog: `categories → products → product_images`, `reviews`.
- Commerce: `orders → order_items`, `payments`, `invoices`.
- Services: `services → service_requests` (with `assigned_to` staff ref).
- Support/engagement: `tickets`, `notifications`.
- CMS/ops: `blogs`, `testimonials`, `partners`, `settings`, `audit_logs`.

RLS (`0002_rls.sql`) enforces owner-scoped access for customer data and
staff/admin elevation for management, with public read on catalog/content.

## Payments & integrations (extension points)

Payment methods (`stripe · jazzcash · easypaisa · bank_transfer · cod`) are
modeled in the schema and checkout UI. Server-side capture/verification belongs
in Supabase **Edge Functions** using the secret keys listed in `.env.example`
(never exposed to the client). WhatsApp, Google Maps and Analytics are wired via
env-configurable values in `lib/constants.ts`.
