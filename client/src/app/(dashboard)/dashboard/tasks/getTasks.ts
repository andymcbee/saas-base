import { SupabaseClient } from "@supabase/supabase-js";

// Define the function to get tasks with optional category and status filters
export async function getTasks(
  supabase: SupabaseClient,
  {
    categoryIds = [],
    statusId = null,
  }: { categoryIds?: number[]; statusId?: number | null }
) {
  // Start building the query
  let query = supabase.from("tasks").select();

  // Execute the query and get the result
  const { data, error } = await query;
  console.log("Data:::::");
  console.log(data);

  if (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }

  return data; // Return the fetched tasks
}
