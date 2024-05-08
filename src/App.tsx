import { FC, useMemo } from 'react'
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import appRoutes from '@/routing/appRoutes.tsx'
import { AuthContextProvider } from '@/context/AuthContext.tsx'
import './index.scss'

const App: FC = () => {
  const queryClient = useMemo<QueryClient>(() => new QueryClient({}), [])

  const router = useMemo(
    () =>
      import.meta.env.DEV
        ? createBrowserRouter(appRoutes)
        : createHashRouter(appRoutes),
    [],
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App
