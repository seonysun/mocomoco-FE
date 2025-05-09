'use client';

import ProviderProps from '@/providers/type';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const query = new QueryClient();

const Providers = ({ children }: ProviderProps) => {
  return (
    <>
      <QueryClientProvider client={query}>{children}</QueryClientProvider>
    </>
  );
};

export default Providers;
