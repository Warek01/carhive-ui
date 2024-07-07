import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthContextProvider } from '@faf-cars/context/auth.context'
import { GlobalLoadingContextProvider } from '@faf-cars/context/global-loading.context'
import { QUERY_CLIENT_CONFIG } from '@faf-cars/lib/query'
import APP_ROUTES from '@faf-cars/lib/routing/app-routes'

import './index.css'

const App: FC = () => {
  const queryClient = new QueryClient(QUERY_CLIENT_CONFIG)
  const router = createBrowserRouter(APP_ROUTES)

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <GlobalLoadingContextProvider>
          <RouterProvider router={router} />
        </GlobalLoadingContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App
