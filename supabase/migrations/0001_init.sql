-- ============================================================================
-- Balochistan Standard Services (BSS) — Initial Schema
-- PostgreSQL / Supabase
-- Creates enums, tables, foreign keys, indexes, triggers and RLS policies.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Enums
-- ----------------------------------------------------------------------------
do $$ begin
  create type user_role as enum ('customer','staff','manager','admin','super_admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type order_status as enum ('pending','confirmed','processing','shipped','delivered','cancelled','refunded');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_status as enum ('unpaid','paid','refunded','failed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_method as enum ('stripe','jazzcash','easypaisa','bank_transfer','cod');
exception when duplicate_object then null; end $$;

do $$ begin
  create type service_request_status as enum ('requested','scheduled','in_progress','completed','cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type ticket_status as enum ('open','pending','resolved','closed');
exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- Helper: updated_at trigger
-- ----------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ----------------------------------------------------------------------------
-- Profiles (extends auth.users)
-- ----------------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  role user_role not null default 'customer',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Roles & permissions (RBAC reference tables)
create table if not exists roles (
  id serial primary key,
  name text not null unique,
  description text
);

create table if not exists permissions (
  id serial primary key,
  name text not null unique,
  description text
);

create table if not exists role_permissions (
  role_id int references roles(id) on delete cascade,
  permission_id int references permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

-- ----------------------------------------------------------------------------
-- Catalog: categories, products, images
-- ----------------------------------------------------------------------------
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category_id uuid references categories(id) on delete set null,
  subcategory text,
  description text,
  specifications jsonb not null default '{}',
  price numeric(12,2) not null check (price >= 0),
  discount_price numeric(12,2) check (discount_price >= 0),
  stock int not null default 0 check (stock >= 0),
  rating numeric(2,1) not null default 0,
  reviews_count int not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  position int not null default 0
);

-- ----------------------------------------------------------------------------
-- Services & requests
-- ----------------------------------------------------------------------------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  icon text,
  starting_price numeric(12,2),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists service_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  service_id uuid references services(id) on delete set null,
  reference text not null unique,
  status service_request_status not null default 'requested',
  address text not null,
  scheduled_at timestamptz,
  assigned_to uuid references profiles(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Orders, items, payments, invoices
-- ----------------------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  reference text not null unique,
  status order_status not null default 'pending',
  payment_status payment_status not null default 'unpaid',
  payment_method payment_method not null default 'cod',
  subtotal numeric(12,2) not null default 0,
  tax numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  shipping_address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  name text not null,
  quantity int not null check (quantity > 0),
  price numeric(12,2) not null
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  method payment_method not null,
  status payment_status not null default 'unpaid',
  amount numeric(12,2) not null,
  transaction_ref text,
  created_at timestamptz not null default now()
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  number text not null unique,
  amount numeric(12,2) not null,
  tax numeric(12,2) not null default 0,
  total numeric(12,2) not null,
  status payment_status not null default 'unpaid',
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Reviews & ratings
-- ----------------------------------------------------------------------------
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Support tickets, notifications
-- ----------------------------------------------------------------------------
create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  subject text not null,
  description text,
  status ticket_status not null default 'open',
  priority text not null default 'medium',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- CMS: blogs, testimonials, partners, settings, audit logs
-- ----------------------------------------------------------------------------
create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  role text,
  quote text not null,
  rating int not null default 5 check (rating between 1 and 5),
  created_at timestamptz not null default now()
);

create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo text
);

create table if not exists settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id) on delete set null,
  actor_email text,
  action text not null,
  target text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Indexes
-- ----------------------------------------------------------------------------
create index if not exists idx_products_category on products(category_id);
create index if not exists idx_products_featured on products(featured);
create index if not exists idx_orders_user on orders(user_id);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_order_items_order on order_items(order_id);
create index if not exists idx_service_requests_user on service_requests(user_id);
create index if not exists idx_reviews_product on reviews(product_id);
create index if not exists idx_invoices_user on invoices(user_id);
create index if not exists idx_notifications_user on notifications(user_id);
create index if not exists idx_tickets_user on tickets(user_id);
create index if not exists idx_audit_actor on audit_logs(actor_id);

-- ----------------------------------------------------------------------------
-- updated_at triggers
-- ----------------------------------------------------------------------------
create trigger trg_profiles_updated before update on profiles for each row execute function set_updated_at();
create trigger trg_products_updated before update on products for each row execute function set_updated_at();
create trigger trg_orders_updated before update on orders for each row execute function set_updated_at();
create trigger trg_service_requests_updated before update on service_requests for each row execute function set_updated_at();
create trigger trg_tickets_updated before update on tickets for each row execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- Auto-create profile on new auth user
-- ----------------------------------------------------------------------------
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    new.email,
    new.raw_user_meta_data->>'phone',
    'customer'
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
