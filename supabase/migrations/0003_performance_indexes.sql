-- Targeted indexes for common dashboard, moderation, and account lookups.
-- These keep owner-scoped and status/date sorted queries fast as tables grow.

create index if not exists idx_profiles_role on profiles(role);

create index if not exists idx_products_category_featured
  on products(category_id, featured desc, created_at desc);

create index if not exists idx_product_images_product_position
  on product_images(product_id, position);

create index if not exists idx_services_featured
  on services(featured, created_at desc);

create index if not exists idx_orders_user_created
  on orders(user_id, created_at desc);

create index if not exists idx_orders_status_created
  on orders(status, created_at desc);

create index if not exists idx_service_requests_user_created
  on service_requests(user_id, created_at desc);

create index if not exists idx_service_requests_status_created
  on service_requests(status, created_at desc);

create index if not exists idx_invoices_user_created
  on invoices(user_id, created_at desc);

create index if not exists idx_reviews_product_approved_created
  on reviews(product_id, approved, created_at desc);

create index if not exists idx_tickets_user_status_created
  on tickets(user_id, status, created_at desc);

create index if not exists idx_notifications_user_read_created
  on notifications(user_id, read, created_at desc);

create index if not exists idx_blogs_published_created
  on blogs(published, created_at desc);

create index if not exists idx_audit_logs_created
  on audit_logs(created_at desc);
