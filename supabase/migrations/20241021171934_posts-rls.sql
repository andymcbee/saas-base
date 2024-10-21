-- Enable Row-Level Security on the posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view posts belonging to their account
CREATE POLICY "Users can view posts in their accounts"
ON public.posts
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.account_users
    WHERE account_users.user_id = auth.uid()  -- Ensure the current user exists in account_users
    AND account_users.account_id = posts.account_id -- Match the account_id from posts
  )
);
