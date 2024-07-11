import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from '@faf-cars/contexts/auth';
import { GlobalLoadingContextProvider } from '@faf-cars/contexts/global-loading';
import { HttpContextProvider } from '@faf-cars/contexts/http';
import { QUERY_CLIENT_CONFIG } from '@faf-cars/lib/query';
import { APP_ROUTES } from '@faf-cars/lib/routing';

import './index.css';

const App: FC = () => {
  const queryClient = new QueryClient(QUERY_CLIENT_CONFIG);
  const router = createBrowserRouter(APP_ROUTES);

  return (
    <QueryClientProvider client={queryClient}>
      <HttpContextProvider>
        <AuthContextProvider>
          <GlobalLoadingContextProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <RouterProvider router={router} />
            </LocalizationProvider>
          </GlobalLoadingContextProvider>
        </AuthContextProvider>
      </HttpContextProvider>
    </QueryClientProvider>
  );
};

export default App;
