import { createClient } from "@/utils/supabase/server";
import { getUserData } from "@/data-access/users";
import { UserData } from "@/data-access/users";

// this is responsible for auth related functions
// it will also reference Supabase or other auth schemes we use

// this pulls all user data for the authenticated user
// this is to not be confused with the similarly named 'getUser' function
// provided by Supabase
// this function is different in the sense that it pulls data we store in the db, that
// is not within the JWT. Such as claims, account_ids, tenant_ids, etc.
// we do this to avoid stale jwt situations

// Define the return type of the function explicitly
export async function assembleUserData(): Promise<UserData | null> {
  // Initialize your Supabase client
  const supabase = createClient();

  // Get the current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("New::::");
  console.log(user);

  // If no user is found, return null
  if (!user) return null;

  // Fetch additional user data such as tenants, roles, permissions, etc.
  const userData = await getUserData();

  // Return the assembled user data
  return userData;
}
