"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote, AlertCircle, type LucideIcon } from "lucide-react";
import { getPosts } from "@/data-access/posts";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/lib/auth/UserProvider";
import MultiSelect from "@/components/MultiSelect";
import { ISelectProps } from "@/components/MultiSelect";

export default function ActivityPage() {
  const { accountData, setAccountData } = useUser();
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [posts, setPosts] = useState<any[]>([]); // temp 'any'

  // temp -- will move to different component once confirmed working

  const handleSelectionChange = (items: string[]) => {
    setSelectedStatuses(items);
  };

  const multiSelectOptions: ISelectProps = {
    values: [
      { key: "published", value: "Published" },
      { key: "draft", value: "Draft" },
    ],
    onSelectionChange: handleSelectionChange,
  };

  // this is for fetching filtered posts
  // we'll refactor this later. Just testing use cases.
  useEffect(() => {
    console.log("USE EFFECT TRIGGERED....");
    console.log(selectedStatuses);
    const supabase = createClient();

    const fetchData = async () => {
      let query = supabase.from("posts").select("*"); // Fetch all columns

      // If any status is selected, apply the status filter
      if (selectedStatuses.length > 0) {
        query = query.in("status", selectedStatuses); // Fetch posts where status is in selectedStatuses array
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data); // Set fetched posts to state
      }
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [selectedStatuses]);

  /*   const handleStatusChange = (selected: { key: string; value: string }[]) => {
    const statuses = selected.map((item) => item.key); // Extract keys (statuses)
    setSelectedStatuses(statuses); // Update the selected statuses
  }; */

  // initial fetch for data, or if the current account id changes

  useEffect(() => {
    // This needs to be combined with the filter search.
    // fix later.
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
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <MultiSelect
            values={multiSelectOptions.values}
            onSelectionChange={handleSelectionChange}
          />
        </CardContent>
      </Card>

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
                        {post.category} - {post.status} - {post.created_at}
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
