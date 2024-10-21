import { createClient } from "@/utils/supabase/server";

// this is a temporary function that calls a generic select * from posts call
// it is to test the RLS functioning.
// Always specify WHERE ids as needed. Exampe, where account_id = X

export async function getPosts() {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select();

  console.log("Triggered");
  if (data) {
    console.log("Data returned.");
    return data;
  }
  if (error) {
    console.log("Error::::");
    console.log(error);
  }

  // return empty array if issue. Temp.
  return [];
}
