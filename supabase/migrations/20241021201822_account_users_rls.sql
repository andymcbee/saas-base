-- Enable Row-Level Security on the account_users table
ALTER TABLE public.account_users ENABLE ROW LEVEL SECURITY;


-- Policy: Users can view the account_users records they belong to
CREATE POLICY "Users can view account_users records that they belong to"
ON public.account_users
FOR SELECT
USING (
  account_users.user_id = auth.uid()
);