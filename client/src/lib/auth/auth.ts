import { createClient } from "@/utils/supabase/server";
import { getUserData } from "@/data-access/users";

// this is responsible for auth related functions
// it will also reference Supabase or other auth schemes we use

// this pulls all user data for the authenticated user
// this is to not be confused with the similarly named 'getUser' function
// provided by Supabase
// this function is different in the sense that it pulls data we store in the db, that
// is not within the JWT. Such as claims, account_ids, tenant_ids, etc.
// we do this to avoid stale jwt situations

export async function assembleUserData() {
  // TODO refactor this to include tenant id and other top level data as needed.

  // get supabase user

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("New::::");
  console.log(user);

  if (!user) return null;

  // this will later be all data such as tenants, roles, permissions, etc.
  const userData = await getUserData();
  console.log("USER DATA:::");
  console.log(userData);

  // TODO reutrn null or redirect?? look into this. What's the benefit of coupling vs disadvantage?
  // we could add redirect destination as an optional param??
  // if no user, redirect to /login and log 'no user detected. log in to continue.'

  // pass the user uuid and grab account ids

  // return all account_ids as an array
}
