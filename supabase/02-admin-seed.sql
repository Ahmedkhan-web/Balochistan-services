-- 2. ADMIN SEED (Run this SECOND)
-- This bypasses complex identities by using the simplest, most universal
-- method to force an admin user into auth.users. 
-- IMPORTANT: Run this ONLY AFTER running the setup script!

do $$
declare
  admin_id uuid := gen_random_uuid();
  admin_email text := 'admin@bss.com.pk';
  admin_password text := 'BssAdmin@2026';
begin
  -- 1. Clean up any previous failed attempts for this email
  delete from auth.users where email = admin_email;

  -- 2. Insert into auth.users
  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) values (
    '00000000-0000-0000-0000-000000000000',
    admin_id,
    'authenticated',
    'authenticated',
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"BSS Admin"}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

  -- 3. Safely insert identity (ignoring constraint errors if schema differs)
  begin
    insert into auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) values (
      gen_random_uuid(),
      admin_id,
      format('{"sub":"%s","email":"%s"}', admin_id::text, admin_email)::jsonb,
      'email',
      admin_id::text,
      now(),
      now(),
      now()
    );
  exception when others then
    -- If auth.identities fails due to version mismatch, the user will still exist.
    null;
  end;

end;
$$;
