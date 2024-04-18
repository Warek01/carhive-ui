import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { AppRoute } from './AppRoute'
import { CarDetailsPage, HomePage, MarketPage, NewDealPage, NotFoundPage } from 'pages'
import { AppLayout } from 'components'

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
        path: AppRoute.NEW_LISTING,
        Component: NewDealPage,
      },
    ],
  },
  {
    path: AppRoute.ANY,
    Component: NotFoundPage,
  },
]

export const appRouter = createBrowserRouter(routes)
