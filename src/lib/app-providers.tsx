import { PropsOf } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from '@carhive/contexts/auth';
import { GlobalLoadingContextProvider } from '@carhive/contexts/global-loading';
import { HttpContextProvider } from '@carhive/contexts/http';
import { LogContextProvider } from '@carhive/contexts/log';
import { ThemeContextProvider } from '@carhive/contexts/theme';
import { QUERY_CLIENT_CONFIG } from '@carhive/lib/query';
import { APP_ROUTES } from '@carhive/lib/routing';

export type ProvidersArray = Array<{
  Provider: (props: any) => ReactNode;
  props: Record<string, any>;
}>;

export const PROVIDERS: ProvidersArray = [
  {
    Provider: QueryClientProvider,
    props: {
      client: new QueryClient(QUERY_CLIENT_CONFIG),
    } as PropsOf<typeof QueryClientProvider>,
  },
  {
    Provider: GoogleOAuthProvider,
    props: {
      clientId:
        '568272482103-en7knuvbvheuqhtu9krfqcl0dglnjban.apps.googleusercontent.com',
    } as PropsOf<typeof GoogleOAuthProvider>,
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
    } as PropsOf<typeof LocalizationProvider>,
  },
  {
    Provider: ThemeContextProvider,
    props: {},
  },
  {
    Provider: RouterProvider,
    props: {
      router: createBrowserRouter(APP_ROUTES),
    } as PropsOf<typeof RouterProvider>,
  },
];

export const renderProviders = (initialValue: ReactNode) =>
  PROVIDERS.reduceRight(
    (acc, { Provider, props }) => <Provider {...props}>{acc}</Provider>,
    initialValue,
  );
