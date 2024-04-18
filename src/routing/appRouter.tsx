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
        path: AppRoute.MARKET,
        Component: MarketPage,
      },
      {
        path: AppRoute.CAR_DETAILS,
        Component: CarDetailsPage,
      },
      {
        path: AppRoute.NEW_DEAL,
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
