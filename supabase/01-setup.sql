-- 1. SCHEMA SETUP (Run this first)
-- This file creates the tables, roles, triggers, and policies.

create extension if not exists pgcrypto;

drop trigger if exists on_auth_user_created on auth.users;
drop table if exists public.profiles cascade;
drop function if exists public.handle_new_user();
drop function if exists public.set_updated_at();
drop function if exists public.protect_profile_role();
drop function if exists public.is_admin() cascade;
drop type if exists public.user_role cascade;

create type public.user_role as enum ('customer', 'admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  city text,
  country text default 'Pakistan',
  company text,
  facility_type text,
  role public.user_role not null default 'customer',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles(role);
create index profiles_created_at_idx on public.profiles(created_at desc);
create index profiles_email_idx on public.profiles(lower(email));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    full_name,
    email,
    phone,
    city,
    country,
    company,
    facility_type,
    role
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    lower(new.email),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'city',
    coalesce(new.raw_user_meta_data->>'country', 'Pakistan'),
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'facility_type',
    case
      when lower(new.email) = 'admin@bss.com.pk' then 'admin'::public.user_role
      else 'customer'::public.user_role
    end
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = excluded.full_name,
    updated_at = now();

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;

create policy profiles_self_select
on public.profiles
for select
using (auth.uid() = id or public.is_admin());

create policy profiles_self_insert
on public.profiles
for insert
with check (auth.uid() = id);

create policy profiles_self_update
on public.profiles
for update
using (auth.uid() = id or public.is_admin())
with check (
  public.is_admin()
  or (auth.uid() = id)
);

create policy profiles_admin_all
on public.profiles
for all
using (public.is_admin())
with check (public.is_admin());

-- Force schema reload to prevent cache errors
NOTIFY pgrst, 'reload schema';
