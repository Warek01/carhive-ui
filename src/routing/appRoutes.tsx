import { RouteObject } from 'react-router-dom'

import {
  CarDetailsPage,
  HomePage,
  LoginPage,
  MarketPage,
  NewListingPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
} from '@/pages'
import { AppLayout } from '@/components'
import { AppRoute } from './AppRoute'

const appRoutes: RouteObject[] = [
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
        Component: NewListingPage,
      },
      {
        path: AppRoute.REGISTER,
        Component: RegisterPage,
      },
      {
        path: AppRoute.LOGIN,
        Component: LoginPage,
      },
      {
        path: AppRoute.ANY,
        Component: NotFoundPage,
      },
    ],
  },
]

export default appRoutes
