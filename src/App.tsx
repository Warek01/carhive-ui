import { FC, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { appRouter } from '@/routing/appRouter'
import LocalStorageKey from '@/lib/LocalStorageKey'
import { __mock__listings } from '@/__mocks__/listings'
import { AuthContextProvider } from '@/context/AuthContext.tsx'
import './index.scss'

const App: FC = () => {
  // debug
  useEffect(() => {
    if (!localStorage.getItem(LocalStorageKey.LISTINGS))
      localStorage.setItem(
        LocalStorageKey.LISTINGS,
        JSON.stringify(__mock__listings),
      )
  }, [])

  return (
    <AuthContextProvider>
      <RouterProvider router={appRouter} />
    </AuthContextProvider>
  )
}

export default App
