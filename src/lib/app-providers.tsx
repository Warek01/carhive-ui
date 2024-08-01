import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from '@faf-cars/contexts/auth';
import { GlobalLoadingContextProvider } from '@faf-cars/contexts/global-loading';
import { HttpContextProvider } from '@faf-cars/contexts/http';
import { LogContextProvider } from '@faf-cars/contexts/log';
import { ThemeContextProvider } from '@faf-cars/contexts/theme';
import { QUERY_CLIENT_CONFIG } from '@faf-cars/lib/query';
import { APP_ROUTES } from '@faf-cars/lib/routing';

export type ProvidersArray = Array<{
  Provider: (props: any) => ReactNode;
  props: Record<string, any>;
}>;

export const PROVIDERS: ProvidersArray = [
  {
    Provider: QueryClientProvider,
    props: {
      client: new QueryClient(QUERY_CLIENT_CONFIG),
    },
  },
  {
    Provider: LogContextProvider,
    props: {},
  },
  {
    Provider: HttpContextProvider,
    props: {},
  },
  {
    Provider: AuthContextProvider,
    props: {},
  },
  {
    Provider: GlobalLoadingContextProvider,
    props: {},
  },
  {
    Provider: LocalizationProvider,
    props: {
      dateAdapter: AdapterDayjs,
    },
  },
  {
    Provider: ThemeContextProvider,
    props: {},
  },
  {
    Provider: RouterProvider,
    props: {
      router: createBrowserRouter(APP_ROUTES),
    },
  },
];

export const renderProviders = (initialValue: ReactNode) =>
  PROVIDERS.reduceRight(
    (acc, { Provider, props }) => <Provider {...props}>{acc}</Provider>,
    initialValue,
  );
