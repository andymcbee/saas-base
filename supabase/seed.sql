-- Seed script for 3 users, accounts, and account_users
DO $$
DECLARE
    user1_uuid UUID := '550e8400-e29b-41d4-a716-446655440000';  -- UUID for armcburn+a1admin@gmail.com
    user2_uuid UUID := '550e8400-e29b-41d4-a716-446655440001';  -- UUID for armcburn+a1user@gmail.com
    user3_uuid UUID := '550e8400-e29b-41d4-a716-446655440002';  -- UUID for armcburn+a2admin@gmail.com
BEGIN

-- Insert users into auth.users
-- User 1: armcburn+a1admin@gmail.com
INSERT INTO auth.users (
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
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    user1_uuid,
    'authenticated',
    'authenticated',
    'armcburn+a1admin@gmail.com',
    crypt('password123', gen_salt('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
);

-- User 2: armcburn+a1user@gmail.com
INSERT INTO auth.users (
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
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    user2_uuid,
    'authenticated',
    'authenticated',
    'armcburn+a1user@gmail.com',
    crypt('password123', gen_salt('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
);

-- User 3: armcburn+a2admin@gmail.com
INSERT INTO auth.users (
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
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    user3_uuid,
    'authenticated',
    'authenticated',
    'armcburn+a2admin@gmail.com',
    crypt('password123', gen_salt('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
);

-- Insert users into auth.identities
-- Identity for user1 (armcburn+a1admin@gmail.com)
INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
)
VALUES (
    uuid_generate_v4(),
    user1_uuid,
    user1_uuid,
    format('{"sub":"%s","email":"%s"}', user1_uuid::text, 'armcburn+a1admin@gmail.com')::jsonb,
    'email',
    current_timestamp,
    current_timestamp,
    current_timestamp
);

-- Identity for user2 (armcburn+a1user@gmail.com)
INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
)
VALUES (
    uuid_generate_v4(),
    user2_uuid,
    user2_uuid,
    format('{"sub":"%s","email":"%s"}', user2_uuid::text, 'armcburn+a1user@gmail.com')::jsonb,
    'email',
    current_timestamp,
    current_timestamp,
    current_timestamp
);

-- Identity for user3 (armcburn+a2admin@gmail.com)
INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
)
VALUES (
    uuid_generate_v4(),
    user3_uuid,
    user3_uuid,
    format('{"sub":"%s","email":"%s"}', user3_uuid::text, 'armcburn+a2admin@gmail.com')::jsonb,
    'email',
    current_timestamp,
    current_timestamp,
    current_timestamp
);

-- Insert accounts into public.accounts
INSERT INTO public.accounts (account_name, created_at)
VALUES
  ('Account 1', now()),
  ('Account 2', now());

-- Insert account_users associations
-- Account 1: User1 (admin) and User2 (user)
INSERT INTO public.account_users (user_id, account_id, created_at)
VALUES
  (user1_uuid, 1, now()), -- armcburn+a1admin@gmail.com for Account 1 MULTI ACCOUNT USER
  (user2_uuid, 1, now()); -- armcburn+a1user@gmail.com for Account 1

-- Account 2: User3 (admin)
INSERT INTO public.account_users (user_id, account_id, created_at)
VALUES
  (user3_uuid, 2, now()), -- armcburn+a2admin@gmail.com for Account 2
  (user1_uuid, 2, now()); -- armcburn+a1admin@gmail.com for Account 2 MULTI ACCOUNT USER

-- NOTE: posts are tied to accounts, not users.
-- Insert posts for user1 (armcburn+a1admin@gmail.com) in Account 1
INSERT INTO public.posts (message, account_id, created_at)
VALUES
  ('This is the first post by armcburn+a1admin@gmail.com', 1, now()),
  ('This is the second post by armcburn+a1admin@gmail.com', 1, now());

-- Insert posts for user2 (armcburn+a1user@gmail.com) in Account 1
INSERT INTO public.posts (message, account_id, created_at)
VALUES
  ('This is the first post by armcburn+a1user@gmail.com', 1, now()),
  ('This is the second post by armcburn+a1user@gmail.com', 1, now());

-- Insert posts for user3 (armcburn+a2admin@gmail.com) in Account 2
INSERT INTO public.posts (message, account_id, created_at)
VALUES
  ('This is the first post by armcburn+a2admin@gmail.com', 2, now()),
  ('This is the second post by armcburn+a2admin@gmail.com', 2, now());

END $$;
