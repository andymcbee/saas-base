"use client";

import { getPosts } from "@/data-access/posts";
import { useUser } from "@/lib/auth/UserProvider";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function BlogsPage() {
  const { accountData, setAccountData } = useUser();
  const [posts, setPosts] = useState<any[]>([]); // temp 'any'

  useEffect(() => {
    if (!accountData?.currentAccountId) return;

    const supabase = createClient();

    const fetchData = async () => {
      const posts = await getPosts(
        supabase,
        accountData?.currentAccountId as string
      );

      setPosts(posts);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [accountData?.currentAccountId]);

  if (!accountData?.currentAccountId) return <div>No user!</div>;

  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            {post.message} -- account id: {post.account_id}
          </div>
        );
      })}
    </>
  );
}
