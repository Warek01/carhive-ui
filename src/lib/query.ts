import { QueryClientConfig } from 'react-query'

export const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      staleTime: Infinity,
      keepPreviousData: true,
      retry: true,
      retryDelay: 1000,
      retryOnMount: true,
    },
  },
}
