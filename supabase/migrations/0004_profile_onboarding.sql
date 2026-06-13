alter table profiles
  add column if not exists city text,
  add column if not exists country text,
  add column if not exists company text,
  add column if not exists facility_type text;

create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
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
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    new.email,
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'facility_type',
    'customer'
  )
  on conflict (id) do nothing;
  return new;
end $$;
