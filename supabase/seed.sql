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
INSERT INTO public.posts (message, account_id, status, category, created_at)
VALUES
  ('This is the first post by armcburn+a1admin@gmail.com', 1, 'published', 'Facebook', now()),
  ('This is the second post by armcburn+a1admin@gmail.com', 1, 'draft', 'Google', now());

-- Insert posts for user2 (armcburn+a1user@gmail.com) in Account 1
INSERT INTO public.posts (message, account_id, status, category, created_at)
VALUES
  ('This is the first post by armcburn+a1user@gmail.com', 1, 'published', 'Instagram', now()),
  ('This is the second post by armcburn+a1user@gmail.com', 1, 'published', 'Facebook', now());

-- Insert posts for user3 (armcburn+a2admin@gmail.com) in Account 2
INSERT INTO public.posts (message, account_id, status, category, created_at)
VALUES
  ('This is the first post by armcburn+a2admin@gmail.com', 2, 'published', 'Instagram', now()),
  ('This is the second post by armcburn+a2admin@gmail.com', 2, 'draft', 'Google', now());

END $$;

-- NO RLS ON THE BELOW TABLES.
-- JUST TESTING FILTERING ON THE UI.

-- Insert into option_types table
INSERT INTO option_types (name) VALUES ('task_status');
INSERT INTO option_types (name) VALUES ('task_category');
INSERT INTO option_types (name) VALUES ('task_priority');

-- Insert into options table (status options)
INSERT INTO options (type_id, value) VALUES ((SELECT id FROM option_types WHERE name = 'task_status'), 'in-progress');
INSERT INTO options (type_id, value) VALUES ((SELECT id FROM option_types WHERE name = 'task_status'), 'completed');
INSERT INTO options (type_id, value) VALUES ((SELECT id FROM option_types WHERE name = 'task_status'), 'pending');

-- Insert into options table (category options)
INSERT INTO options (type_id, value) VALUES ((SELECT id FROM option_types WHERE name = 'task_category'), 'development');
INSERT INTO options (type_id, value) VALUES ((SELECT id FROM option_types WHERE name = 'task_category'), 'marketing');
INSERT INTO options (type_id, value) VALUES ((SELECT id FROM option_types WHERE name = 'task_category'), 'sales');

-- Insert into options table (priority options)
INSERT INTO options (type_id, value) VALUES ((SELECT id FROM option_types WHERE name = 'task_priority'), 'low');
INSERT INTO options (type_id, value) VALUES ((SELECT id FROM option_types WHERE name = 'task_priority'), 'medium');
INSERT INTO options (type_id, value) VALUES ((SELECT id FROM option_types WHERE name = 'task_priority'), 'high');


-- Insert task with only status
INSERT INTO tasks (text, status_id)
VALUES 
  ('Update project documentation', 
    (SELECT id FROM options WHERE value = 'completed' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status'))),
  ('Review marketing strategy', 
    (SELECT id FROM options WHERE value = 'pending' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status'))),
  ('Review team feedback', 
    (SELECT id FROM options WHERE value = 'in-progress' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')));

-- Insert task with status and category
INSERT INTO tasks (text, status_id, category_id)
VALUES 
  ('Prepare presentation slides', 
    (SELECT id FROM options WHERE value = 'in-progress' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')),
    (SELECT id FROM options WHERE value = 'development' AND type_id = (SELECT id FROM option_types WHERE name = 'task_category'))),
  ('Analyze competitors', 
    (SELECT id FROM options WHERE value = 'pending' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')),
    (SELECT id FROM options WHERE value = 'marketing' AND type_id = (SELECT id FROM option_types WHERE name = 'task_category'))),
  ('Draft sales proposal', 
    (SELECT id FROM options WHERE value = 'completed' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')),
    (SELECT id FROM options WHERE value = 'sales' AND type_id = (SELECT id FROM option_types WHERE name = 'task_category')));

-- Insert task with status and priority
INSERT INTO tasks (text, status_id, priority_id)
VALUES 
  ('Check email server', 
    (SELECT id FROM options WHERE value = 'pending' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')),
    (SELECT id FROM options WHERE value = 'medium' AND type_id = (SELECT id FROM option_types WHERE name = 'task_priority'))),
  ('Audit financial records', 
    (SELECT id FROM options WHERE value = 'completed' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')),
    (SELECT id FROM options WHERE value = 'high' AND type_id = (SELECT id FROM option_types WHERE name = 'task_priority'))),
  ('Test new software features', 
    (SELECT id FROM options WHERE value = 'in-progress' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')),
    (SELECT id FROM options WHERE value = 'urgent' AND type_id = (SELECT id FROM option_types WHERE name = 'task_priority')));

-- Insert task with status, category, and priority
INSERT INTO tasks (text, status_id, category_id, priority_id)
VALUES 
  ('Organize team outing', 
    (SELECT id FROM options WHERE value = 'in-progress' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')),
    (SELECT id FROM options WHERE value = 'marketing' AND type_id = (SELECT id FROM option_types WHERE name = 'task_category')),
    (SELECT id FROM options WHERE value = 'low' AND type_id = (SELECT id FROM option_types WHERE name = 'task_priority'))),
  ('Plan quarterly budget review', 
    (SELECT id FROM options WHERE value = 'completed' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')),
    (SELECT id FROM options WHERE value = 'finance' AND type_id = (SELECT id FROM option_types WHERE name = 'task_category')),
    (SELECT id FROM options WHERE value = 'high' AND type_id = (SELECT id FROM option_types WHERE name = 'task_priority')));

-- Insert multiple tasks at once with one having a NULL priority
INSERT INTO tasks (text, status_id, category_id, priority_id)
VALUES 
  ('Deploy new website version', 
    (SELECT id FROM options WHERE value = 'in-progress' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')),
    (SELECT id FROM options WHERE value = 'IT' AND type_id = (SELECT id FROM option_types WHERE name = 'task_category')),
    (SELECT id FROM options WHERE value = 'urgent' AND type_id = (SELECT id FROM option_types WHERE name = 'task_priority'))),
  ('Conduct market research', 
    (SELECT id FROM options WHERE value = 'pending' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')),
    (SELECT id FROM options WHERE value = 'marketing' AND type_id = (SELECT id FROM option_types WHERE name = 'task_category')),
    NULL),  -- No priority assigned
  ('Write internal policy update', 
    (SELECT id FROM options WHERE value = 'pending' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')),
    NULL,  -- No category
    NULL),  -- No priority
  ('Organize client meeting', 
    (SELECT id FROM options WHERE value = 'completed' AND type_id = (SELECT id FROM option_types WHERE name = 'task_status')),
    NULL,  -- No category
    (SELECT id FROM options WHERE value = 'low' AND type_id = (SELECT id FROM option_types WHERE name = 'task_priority')));
