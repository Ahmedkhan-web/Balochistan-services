# Architecture

## Overview

BSS is a Vite React single-page application backed by Supabase for only the
parts that need real users: authentication, profiles, and admin access.
Products, services, page content, cart state, and WhatsApp request flows stay in
the frontend so the public site remains fast.

```
React SPA (Vite)
  Pages -> Router -> Layouts -> Components
    - Zustand stores: auth, cart, ui
    - Static product/service/content data
    - Supabase auth/profile data when configured
    - WhatsApp request links for orders, services, and installations

Supabase
  Auth users -> public.profiles
  RLS: customer owns own profile, admin can read users
```

## Key Decisions

- **No demo mode**: auth actions require real `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_ANON_KEY` values. The app no longer provides fake sign-in or
  fake dashboard data.
- **Two roles only**: `customer` and `admin`.
- **Customer dashboard**: one lightweight dashboard page with real account
  information and quick actions.
- **Admin dashboard**: one overview plus registered-user details from
  Supabase.
- **Requests**: product orders, service requests, and installation requests
  open prepared WhatsApp messages to the configured BSS number.
- **Performance**: Supabase is dynamically imported, admin/dashboard routes are
  lazy-loaded, and public catalog content stays static.

## Supabase

Use `supabase/sql-editor.sql` as the single paste-ready setup file. It creates:

- `public.user_role` enum with `customer` and `admin`.
- `public.profiles`.
- Profile triggers for new auth users.
- RLS policies for self profile access and admin user-list access.
- A default admin auth user and profile.
