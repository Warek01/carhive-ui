import { QueryClientConfig } from 'react-query'

export const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      staleTime: 60_000,
      keepPreviousData: true,
      retry: false,
      retryOnMount: false,
    },
  },
}
