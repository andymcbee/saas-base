"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { UserData } from "@/data-access/users"; // Adjust the path
import { setCookie } from "cookies-next";

// Define the context type for user data.
type UserContextType = {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
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
  userData: UserData | null; // Resolved data instead of a promise
}) {
  const [userState, setUserState] = useState<UserData | null>(userData);

  useEffect(() => {
    setUserState(userData); // Update state if userData prop changes
    setCookie("userData", userData);
  }, [userData]);

  // Return the provider with the current UserData and the setter function.
  return (
    <UserContext.Provider
      value={{ userData: userState, setUserData: setUserState }}
    >
      {children}
    </UserContext.Provider>
  );
}
