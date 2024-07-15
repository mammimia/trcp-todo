import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { trcp } from './client';
import { httpBatchLink } from '@trpc/client';

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trcpClient] = useState(() =>
    trcp.createClient({
      links: [
        httpBatchLink({
          url: '/api/trcp'
        })
      ]
    })
  );

  return (
    <trcp.Provider client={trcpClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trcp.Provider>
  );
}
