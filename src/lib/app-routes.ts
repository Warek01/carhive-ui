import { RouteObject } from 'react-router-dom'

import { AppLayout, AppRouteProtection } from '@/components'
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
import AppRoute from '@/lib/app-route'

const APP_ROUTES: RouteObject[] = [
  {
    path: AppRoute.HOME,
    Component: AppLayout,
    children: [
      {
        Component: AppRouteProtection,
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
        ],
      },

      {
        path: AppRoute.ANY,
        Component: NotFoundPage,
      },
    ],
  },
]

export default APP_ROUTES
