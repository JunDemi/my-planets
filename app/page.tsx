'use client';

import PortfolioExperience from '@/components/PortfolioExperience';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioExperience />
    </QueryClientProvider>
  );
}
