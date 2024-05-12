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
import { AppLayout, AuthProtected, ReverseAuthProtected } from '@/components'
import { AppRoute } from './AppRoute'

const appRoutes: RouteObject[] = [
  {
    path: AppRoute.HOME,
    Component: AppLayout,
    children: [
      {
        Component: AuthProtected,
        children: [
          // auth protected routes
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
        ],
      },

      {
        Component: ReverseAuthProtected,
        children: [
          // non-protected routes
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

      // 404
      {
        path: AppRoute.ANY,
        Component: NotFoundPage,
      },
    ],
  },
]

export default appRoutes
