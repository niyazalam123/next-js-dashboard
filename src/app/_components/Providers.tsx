"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

// Create a client
const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;
