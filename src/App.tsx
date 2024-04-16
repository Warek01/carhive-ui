import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'

import 'App.scss'
import { appRouter } from './routing/appRouter'

const App: FC = () => {
  return (
    <main className="bg-red-500">
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App
