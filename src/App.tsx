import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AuthContextProvider } from '@/context/auth.context'
import { GlobalLoadingContextProvider } from '@/context/global-loading.context'
import { QUERY_CLIENT_CONFIG } from '@/lib/query'
import APP_ROUTES from '@/lib/routing/app-routes'

import './index.css'

const App: FC = () => {
  const queryClient = new QueryClient(QUERY_CLIENT_CONFIG)
  const router = createBrowserRouter(APP_ROUTES)

  console.log('App')

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
