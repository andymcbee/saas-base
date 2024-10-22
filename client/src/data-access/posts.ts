import { SupabaseClient } from "@supabase/supabase-js";

// this is a temporary function that calls a generic select * from posts call
// it is to test the RLS functioning.
// Always specify WHERE ids as needed. Exampe, where account_id = X

export async function getPosts(
  supabaseClient: SupabaseClient,
  currentAccountId: string
) {
  const { data, error } = await supabaseClient
    .from("posts")
    .select("*") // You can also specify the columns you want here instead of '*'
    .eq("account_id", currentAccountId);

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

export async function deletePostById(post_id: number) {
  /*   const supabase = createClient();

  const response = await supabase.from("posts").delete().eq("id", post_id);

  console.log("Res:::");
  console.log(response); */
}
