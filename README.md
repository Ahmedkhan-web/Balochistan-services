# Balochistan Standard Services (BSS)

> Protecting Lives. Securing Assets. Building Trust.

Enterprise-grade web platform for **Balochistan Standard Services** — a fire
safety and security systems company. Customers can browse and order products,
request and track services, and manage their account; staff and admins manage
the catalog, orders, services, users and content from a dedicated console.

The app is built to be **fully browsable without a backend** (demo mode using
local seed data) and connects to a real **Supabase** backend the moment you add
your credentials.

---

## Tech Stack

| Layer        | Technology                                                        |
| ------------ | ----------------------------------------------------------------- |
| Frontend     | React 18, TypeScript, Vite                                        |
| Styling/UI   | Tailwind CSS, shadcn-style primitives, Framer Motion, lucide-react |
| Routing      | React Router (data router)                                        |
| Data/State   | TanStack React Query, Zustand                                     |
| Backend      | Supabase (PostgreSQL, Auth, RLS, Edge Functions, Realtime)        |
| i18n         | i18next + react-i18next (English, Urdu; RTL-ready for Arabic)     |
| Deployment   | Vercel / Cloudflare Pages + Supabase                              |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. (optional) configure environment
cp .env.example .env
# add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for real backend

# 3. Run the dev server
npm run dev          # http://localhost:5173
```

### Demo mode

Without Supabase env vars the app runs on local seed data:

- **Customer dashboard**: sign in with any email (e.g. `user@test.com`).
- **Admin console**: sign in with an email starting with `admin`
  (e.g. `admin@bss.com.pk`).

---

## Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start Vite dev server                    |
| `npm run build`     | Type-check and build for production      |
| `npm run preview`   | Preview the production build             |
| `npm run lint`      | Run ESLint                               |
| `npm run typecheck` | Type-check without emitting              |
| `npm run format`    | Format with Prettier                     |

---

## Project Structure

```
src/
├── components/
│   ├── ui/            # shadcn-style primitives (button, card, input, table…)
│   ├── common/        # Logo, Seo, Icon, FloatingActions, toggles…
│   ├── layout/        # Navbar, Footer, PublicLayout, DashboardLayout, guards
│   ├── home/          # Hero & home sections
│   ├── products/      # ProductCard
│   ├── services/      # ServiceCard
│   └── dashboard/     # StatCard, RevenueChart, StatusBadge, PageHeader
├── pages/             # Public pages + auth/ + dashboard/ + admin/
├── data/              # Seed content (products, services, dashboard mocks)
├── store/             # Zustand stores (auth, cart, ui)
├── lib/               # supabase client, query client, utils, constants
├── i18n/              # i18next config + locales (en, ur)
├── types/             # Domain types + Supabase Database types
└── router.tsx         # Route definitions

supabase/
├── migrations/        # 0001_init.sql (schema), 0002_rls.sql (policies)
├── seed.sql           # Categories, services, testimonials, partners
└── config.toml        # Local Supabase config
```

---

## Backend Setup (Supabase)

```bash
# Using the Supabase CLI
supabase start                 # local stack
supabase db reset              # apply migrations + seed
# OR push migrations to a hosted project:
supabase db push
```

Then set in `.env`:

```
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

The schema includes all entities (profiles, roles, products, categories,
orders, order_items, payments, services, service_requests, reviews, invoices,
tickets, notifications, blogs, testimonials, partners, settings, audit_logs)
with foreign keys, indexes, `updated_at` triggers, an auto-profile trigger on
signup, and **Row Level Security** policies (owner-scoped reads/writes plus
staff/admin elevation via `is_staff()` / `is_admin()` helpers).

---

## Features

- **Public site**: Home, Overview, Products (search/filter/sort), Product
  detail (gallery, specs, reviews), Services, Service detail (booking), Contact
  (form, map, WhatsApp), Cart & Checkout (Stripe/JazzCash/EasyPaisa/Bank/COD).
- **Auth**: Sign up, Sign in, Forgot/Reset password, role-based access.
- **Customer dashboard**: overview, orders, service requests, invoices,
  wishlist, notifications, support tickets, profile.
- **Admin console**: revenue analytics, product/order/service management,
  users & staff, reviews moderation, CMS & website settings, audit logs.
- **Extras**: dark/light mode, English/Urdu (RTL) i18n, newsletter, emergency
  call & WhatsApp floating actions, SEO (meta/OG/Twitter, sitemap, robots,
  JSON-LD LocalBusiness).

---

## Deployment

- **Vercel**: import the repo — `vercel.json` configures the Vite build, SPA
  rewrites and security headers. Add the `VITE_*` env vars in project settings.
- **Cloudflare Pages**: build command `npm run build`, output `dist`. The
  `public/_redirects` file handles SPA routing.

---

## License

Proprietary — © Balochistan Standard Services. All rights reserved.
