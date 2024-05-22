import { RouteObject } from 'react-router-dom'

import { AppLayout, AppRouteProtection } from '@/components'
import AppRoute from '@/lib/routing/app-route'
import {
  AboutPage,
  AdminDashboardPage,
  CarDetailsPage,
  HomePage,
  LoginPage,
  MarketPage,
  NewListingPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
} from '@/pages'

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
          {
            path: AppRoute.ABOUT,
            Component: AboutPage,
          },
          {
            path: AppRoute.ADMIN_DASHBOARD,
            Component: AdminDashboardPage,
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
