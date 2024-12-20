"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { UserData } from "@/data-access/users"; // Adjust the path
import { setCookie, getCookie, CookieValueTypes } from "cookies-next";

function getCurrentUserCookie(): UserDataCookie | null {
  const userDataCookie: CookieValueTypes = getCookie("userData");

  let parsedUserDataCookie: any = null;

  // Check if the cookie is a string before parsing
  if (typeof userDataCookie === "string") {
    try {
      parsedUserDataCookie = JSON.parse(userDataCookie);
    } catch (error) {
      console.error("Error parsing cookie: ", error);
    }
  } else {
    console.warn(
      "Cookie is not a string or is undefined/boolean:",
      userDataCookie
    );
  }

  return parsedUserDataCookie;
}

// Interface for Account Data stored in cookie
// it should mirror all the same data types as UserContextType
// minus the setState and function definitions

export interface UserDataCookie {
  accountData: AccountData;
}

// Interfaces for Account Data
export interface AccountData {
  currentAccountId?: string;
  accountIds?: string[];
}

// Define the context type for user data.
type UserContextType = {
  accountData: AccountData | null;
  setAccountData: (data: AccountData) => void;
};

// Create the user context with a default null value.
const UserContext = createContext<UserContextType | null>(null);

// Hook to allow components to consume the context.
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// UserProvider component
export function UserProvider({
  children,
  userData,
}: {
  children: ReactNode;
  userData: UserData | null;
}) {
  const [accountDataState, setAccountDataState] = useState<AccountData | null>(
    null
  );

  // useEffect to keep the cookie and the current state in sync

  useEffect(() => {
    console.log("USE EFFECT FOR ACCOUNT DATA STATE TRIGGERED!");
    // modify the cookie to sync with the new accountDataState
    if (accountDataState) {
      const userDataCookie: UserDataCookie = {
        accountData: accountDataState,
      };
      setCookie("userData", userDataCookie);
    }
  }, [accountDataState]);

  // used for detecting page re-loads
  // this should only trigger once since
  // the data is passed in via a Layout
  useEffect(() => {
    const parsedUserDataCookie = getCurrentUserCookie();
    if (userData && userData.account_ids && userData.account_ids.length > 0) {
      // get the currentAccId from cookie if it exists. Otherwise, default to zeroth item.
      const accountData: AccountData = {
        currentAccountId: parsedUserDataCookie?.accountData.currentAccountId
          ? parsedUserDataCookie?.accountData.currentAccountId
          : userData.account_ids[0].toString(),
        accountIds: userData.account_ids.map((accountId) =>
          accountId.toString()
        ),
      };
      setAccountDataState(accountData);
      // refactor this later to be an interface containing all items

      // cookie is set in useEffect that changes on state updates, not userData
    } else {
      // Handle the case where account IDs are not available
      // Could set to null or use a default state
      setAccountDataState(null);
      // I think we null the cookie here???
    }
  }, [userData]);

  // Return the provider with the current UserData and the setter function.
  return (
    <UserContext.Provider
      value={{
        accountData: accountDataState,
        setAccountData: setAccountDataState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
