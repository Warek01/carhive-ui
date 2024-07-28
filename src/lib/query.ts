import { QueryClientConfig } from 'react-query';

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
};

export const enum QueryKey {
  UserFind = 'user-find',
  UserList = 'user-list',
  UserCount = 'user-count',

  ListingList = 'listings-list',
  ListingDetails = 'listing-details',
  ListingStats = 'listings-stats',
  ListingCount = 'listings-count',

  ModelList = 'model-list',

  BrandList = 'brand-list',

  CityCount = 'city-count',
  CityList = 'city-list',

  CountryCount = 'country-count',
  CountryList = 'country-list',
}
