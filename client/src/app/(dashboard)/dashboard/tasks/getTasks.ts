import { SupabaseClient } from "@supabase/supabase-js";
import { Task } from "@/types";
//helper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatTasks = (rawTasks: any[]): Task[] => {
  return rawTasks.map((task) => ({
    id: task.id,
    text: task.text,
    createdAt: new Date(task.created_at).toLocaleString(), // Format the date for display
    status: task.status.value, // Pull the status value
    category: task.category ? task.category.value : null, // If category exists, get its value; else, set null
    priority: task.priority ? task.priority.value : null, // If priority exists, get its value; else, set null
  }));
};

// Define the function to get tasks with optional category and status filters
export async function getTasks(supabase: SupabaseClient): Promise<Task[]> {
  // Specify the return type as Promise<Task[]> {
  // Start building the query

  const query = supabase.from("tasks").select(`
    id,
    text,
    created_at,
    status: status_id ( value ),
    category: category_id ( value ),
    priority: priority_id ( value )
  `);

  // Execute the query and get the result
  const { data, error } = await query;
  if (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
  const formattedTasks = data ? formatTasks(data) : [];

  return formattedTasks; // Return the fetched tasks
}
