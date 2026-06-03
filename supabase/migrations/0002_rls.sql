-- ============================================================================
-- Row Level Security (RLS) policies
-- ============================================================================

-- Helper: is the current user staff/admin?
create or replace function is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from profiles
    where id = auth.uid()
      and role in ('staff','manager','admin','super_admin')
  );
$$;

create or replace function is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from profiles
    where id = auth.uid()
      and role in ('admin','super_admin')
  );
$$;

-- Enable RLS
alter table profiles enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table services enable row level security;
alter table service_requests enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table payments enable row level security;
alter table invoices enable row level security;
alter table reviews enable row level security;
alter table tickets enable row level security;
alter table notifications enable row level security;
alter table blogs enable row level security;
alter table testimonials enable row level security;
alter table partners enable row level security;
alter table settings enable row level security;
alter table audit_logs enable row level security;

-- ---- Profiles ----
create policy "profiles_self_select" on profiles for select using (auth.uid() = id or is_staff());
create policy "profiles_self_update" on profiles for update using (auth.uid() = id or is_admin());
create policy "profiles_admin_all" on profiles for all using (is_admin()) with check (is_admin());

-- ---- Public catalog (read for everyone, write for staff) ----
create policy "categories_public_read" on categories for select using (true);
create policy "categories_staff_write" on categories for all using (is_staff()) with check (is_staff());

create policy "products_public_read" on products for select using (true);
create policy "products_staff_write" on products for all using (is_staff()) with check (is_staff());

create policy "product_images_public_read" on product_images for select using (true);
create policy "product_images_staff_write" on product_images for all using (is_staff()) with check (is_staff());

create policy "services_public_read" on services for select using (true);
create policy "services_staff_write" on services for all using (is_staff()) with check (is_staff());

create policy "testimonials_public_read" on testimonials for select using (true);
create policy "testimonials_staff_write" on testimonials for all using (is_staff()) with check (is_staff());

create policy "partners_public_read" on partners for select using (true);
create policy "partners_staff_write" on partners for all using (is_staff()) with check (is_staff());

create policy "blogs_public_read" on blogs for select using (published or is_staff());
create policy "blogs_staff_write" on blogs for all using (is_staff()) with check (is_staff());

create policy "settings_public_read" on settings for select using (true);
create policy "settings_admin_write" on settings for all using (is_admin()) with check (is_admin());

-- ---- Orders (owner or staff) ----
create policy "orders_owner_read" on orders for select using (auth.uid() = user_id or is_staff());
create policy "orders_owner_insert" on orders for insert with check (auth.uid() = user_id);
create policy "orders_staff_update" on orders for update using (is_staff()) with check (is_staff());

create policy "order_items_owner_read" on order_items for select using (
  exists (select 1 from orders o where o.id = order_id and (o.user_id = auth.uid() or is_staff()))
);
create policy "order_items_owner_insert" on order_items for insert with check (
  exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid())
);

create policy "payments_owner_read" on payments for select using (
  exists (select 1 from orders o where o.id = order_id and (o.user_id = auth.uid() or is_staff()))
);
create policy "payments_staff_write" on payments for all using (is_staff()) with check (is_staff());

create policy "invoices_owner_read" on invoices for select using (auth.uid() = user_id or is_staff());
create policy "invoices_staff_write" on invoices for all using (is_staff()) with check (is_staff());

-- ---- Service requests ----
create policy "sr_owner_read" on service_requests for select using (auth.uid() = user_id or is_staff());
create policy "sr_owner_insert" on service_requests for insert with check (auth.uid() = user_id);
create policy "sr_staff_update" on service_requests for update using (is_staff()) with check (is_staff());

-- ---- Reviews ----
create policy "reviews_public_read" on reviews for select using (approved or auth.uid() = user_id or is_staff());
create policy "reviews_owner_insert" on reviews for insert with check (auth.uid() = user_id);
create policy "reviews_staff_moderate" on reviews for update using (is_staff()) with check (is_staff());

-- ---- Tickets ----
create policy "tickets_owner_read" on tickets for select using (auth.uid() = user_id or is_staff());
create policy "tickets_owner_insert" on tickets for insert with check (auth.uid() = user_id);
create policy "tickets_staff_update" on tickets for update using (is_staff()) with check (is_staff());

-- ---- Notifications ----
create policy "notifications_owner_read" on notifications for select using (auth.uid() = user_id);
create policy "notifications_owner_update" on notifications for update using (auth.uid() = user_id);
create policy "notifications_staff_insert" on notifications for insert with check (is_staff() or auth.uid() = user_id);

-- ---- Audit logs (admin only) ----
create policy "audit_admin_read" on audit_logs for select using (is_admin());
create policy "audit_insert" on audit_logs for insert with check (is_staff());
