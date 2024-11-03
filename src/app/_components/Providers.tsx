"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react'


// Create a client
const queryClient = new QueryClient()

const Providers = ({children}:PropsWithChildren<{}>) => {
  return (
    <>
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
    </>
  )
}

export default Providers