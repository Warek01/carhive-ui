import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { AppRoute } from './AppRoute'
import {
  CarDetailsPage,
  HomePage,
  MarketCategoryPage,
  MarketPage,
  NotFoundPage,
} from 'pages'

const routes: RouteObject[] = [
  {
    path: AppRoute.HOME,
    index: true,
    Component: HomePage,
  },
  {
    path: AppRoute.MARKET,
    Component: MarketPage,
  },
  {
    path: AppRoute.MARKET_CATEGORY,
    Component: MarketCategoryPage,
  },
  {
    path: AppRoute.CAR_DETAILS,
    Component: CarDetailsPage,
  },
  {
    path: AppRoute.ANY,
    Component: NotFoundPage,
  },
]

export const appRouter = createBrowserRouter(routes)
