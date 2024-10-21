import { createClient } from "@/utils/supabase/server";

export interface UserData {
  account_ids: number[];
}

export async function getUserData() {
  const supabase = createClient();

  const { data, error } = await supabase.from("account_users").select();

  if (error) {
    console.log("Error thrown when fetching account_users");
    return null;
  }

  const userAccountIds: number[] = data.map((item) => item.account_id);

  const userData: UserData = {
    account_ids: userAccountIds,
  };

  return userData;
}
