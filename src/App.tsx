import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'

import 'App.scss'
import { appRouter } from './routing/appRouter'

const App: FC = () => {
  return <RouterProvider router={appRouter} />
}

export default App
