"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote, AlertCircle, type LucideIcon } from "lucide-react";
import { getPosts } from "@/data-access/posts";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/lib/auth/UserProvider";

export default function ActivityPage() {
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
      console.log(posts);

      setPosts(posts);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [accountData?.currentAccountId]);

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Posts
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length > 0 ? (
            <ul className="space-y-4">
              {posts.map((post) => {
                return (
                  <li key={post.id} className="flex items-center space-x-4">
                    <div className="bg-orange-100 rounded-full p-2">
                      <StickyNote />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {post.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        post id: {post.id} - account id: {post.account_id}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <AlertCircle className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No posts yet
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                When you or your team add posts, you will see them here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
