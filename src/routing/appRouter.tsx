import { createBrowserRouter, RouteObject } from 'react-router-dom'

import {
  CarDetailsPage,
  HomePage,
  MarketPage,
  NewDealPage,
  NotFoundPage,
  ProfilePage,
} from '@/pages'
import { AppLayout } from '@/components'
import { AppRoute } from './AppRoute'

const routes: RouteObject[] = [
  {
    path: AppRoute.HOME,
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: AppRoute.LISTINGS,
        Component: MarketPage,
      },
      {
        path: AppRoute.LISTING_DETAILS,
        Component: CarDetailsPage,
      },
      {
        path: AppRoute.PROFILE,
        Component: ProfilePage,
      },
      {
        path: AppRoute.NEW_LISTING,
        Component: NewDealPage,
      },
      {
        path: AppRoute.ANY,
        Component: NotFoundPage,
      },
    ],
  },
]

export const appRouter = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_APP_BASE_PATH,
})
