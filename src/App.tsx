import { FC, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import 'App.scss'
import { appRouter } from 'routing/appRouter'
import LocalStorageKey from './lib/LocalStorageKey'
import { __mock__listings } from '__mocks__/listings'

const App: FC = () => {
  useEffect(() => {
    if (!localStorage.getItem(LocalStorageKey.LISTINGS))
      localStorage.setItem(LocalStorageKey.LISTINGS, JSON.stringify(__mock__listings))
  }, [])

  return <RouterProvider router={appRouter} />
}

export default App
