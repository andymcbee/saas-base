"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTasks } from "./getTasks";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

export default function tasksPage() {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
  // fetch tasks using react query and display in table.
  const { data, error, isLoading } = useQuery({
    queryKey: [
      "tasks",
      { categoryIds: selectedCategoryIds, statusId: selectedStatusId },
    ], // This is the query key
    queryFn: () =>
      getTasks(supabase, {
        categoryIds: selectedCategoryIds,
        statusId: selectedStatusId,
      }), // This is the query function
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    const errorMessage = (error as Error).message;
    return <p>An error occurred: {errorMessage}</p>;
  }

  console.log(data);
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Tasks
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          Card Content Here.... table goes here I think?
        </CardContent>
      </Card>
    </section>
  );
}
