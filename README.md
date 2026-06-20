# Balochistan Standard Services (BSS)

> Protecting Lives. Securing Assets. Building Trust.

Enterprise-grade web platform for **Balochistan Standard Services**. Customers
can browse products, send WhatsApp product orders, request services, and manage
their account. Admins can review the dashboard and registered users.

## Tech Stack

| Layer      | Technology                                  |
| ---------- | ------------------------------------------- |
| Frontend   | React 18, TypeScript, Vite                  |
| Styling/UI | Tailwind CSS, local shadcn-style primitives |
| Routing    | React Router                                |
| State      | Zustand                                     |
| Backend    | Supabase Auth, Postgres profiles, RLS       |

## Quick Start

```bash
npm install
cp .env.example .env
# add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

There is no demo login mode. Real authentication requires Supabase credentials.

## Supabase Setup

Paste `supabase/sql-editor.sql` into the Supabase SQL Editor and run it once.

Default admin:

```text
Email: admin@bss.com.pk
Password: BssAdmin@2026
```

Change those values in `supabase/sql-editor.sql` before running if needed.

## Features

- Public site: overview, products, services, contact, cart, and WhatsApp order
  flow.
- Auth: sign up, sign in, reset password, role-based route protection.
- Customer dashboard: one account dashboard with real profile details.
- Admin dashboard: lightweight overview and registered users list.
- Supabase: `customer` and `admin` roles only.
