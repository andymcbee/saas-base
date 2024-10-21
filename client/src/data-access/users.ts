import { createClient } from "@/utils/supabase/server";

export async function getUserData() {
  const supabase = createClient();

  const { data, error } = await supabase.from("account_users").select();

  if (error) {
    console.log("Error thrown when fetching account_users");
    return null;
  }

  return data;
}
