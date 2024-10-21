-- Users table already exists as default Supabase table

-- ACCOUNTS
CREATE TABLE public.accounts (
  id            serial PRIMARY KEY,                    -- Incremental id for account
  account_name  varchar(100) NOT NULL,                 -- Account name with reasonable char limit
  created_at    timestamp default now()               -- Created at, defaults to current time
);

-- ACCOUNT_USERS
CREATE TABLE public.account_users (
  id          serial PRIMARY KEY,                     -- Incremental ID for the account_users table
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE, -- Foreign key to auth.users (UUID)
  account_id  integer REFERENCES public.accounts(id) ON DELETE CASCADE, -- Foreign key to public.accounts
  created_at  timestamp DEFAULT now()                  -- Created at, defaults to the current timestamp
);


-- POSTS
-- The Posts table is just used to demonstrate access control.
-- A user should only be able to view their own account's posts once RLS is setup.
-- Drop these tables as needed.
CREATE TABLE public.posts (
  id          serial PRIMARY KEY,                     -- Incremental ID for the posts table
  message     text NOT NULL,                          -- Message text field with no limits
  account_id  integer REFERENCES public.accounts(id) ON DELETE CASCADE, -- Foreign key to public.accounts
  created_at  timestamp DEFAULT now()                 -- Created at, defaults to the current timestamp
);
