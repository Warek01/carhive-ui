import { FC, useMemo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import appRoutes from '@/routing/appRoutes.tsx'
import { AuthContextProvider } from '@/context/AuthContext.tsx'
import { GlobalLoadingContextProvider } from '@/context/GlobalLoadingContext.tsx'
import './index.scss'

const App: FC = () => {
  const queryClient = useMemo<QueryClient>(() => new QueryClient({}), [])
  const router = useMemo(() => createBrowserRouter(appRoutes), [])

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
