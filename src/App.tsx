import { FC, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { AuthContextProvider } from '@/context/auth.context'
import { GlobalLoadingContextProvider } from '@/context/global-loading.context'
import APP_ROUTES from '@/lib/app-routes'

import './index.scss'

const App: FC = () => {
  const queryClient = useMemo<QueryClient>(() => new QueryClient({}), [])
  const router = useMemo(() => createBrowserRouter(APP_ROUTES), [])

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
