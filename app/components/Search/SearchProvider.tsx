'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface SearchProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export function SearchProvider({ children }: SearchProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
