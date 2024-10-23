"use client"; // Ensure this is a client-side component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

// Create a QueryProvider component that wraps children in the QueryClientProvider
export function QueryProvider({ children }: { children: ReactNode }) {
  // Create a QueryClient instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
