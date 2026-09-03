import { QueryClient } from "@tanstack/react-query";

/** Shared client so route loaders and hooks use the same cache. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
});
