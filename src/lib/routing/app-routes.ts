import { RouteObject } from 'react-router-dom'

import { AppLayout, AppRouteProtection } from '@/components'
import AppRoute from '@/lib/routing/app-route'
import {
  AboutPage,
  AdminDashboardPage,
  HomePage,
  ListingDetailsPage,
  LoginPage,
  MarketPage,
  NewListingPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
} from '@/pages'

const APP_ROUTES: RouteObject[] = [
  {
    path: AppRoute.Home,
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
            path: AppRoute.Listings,
            Component: MarketPage,
          },
          {
            path: AppRoute.ListingDetails,
            Component: ListingDetailsPage,
          },
          {
            path: AppRoute.Profile,
            Component: ProfilePage,
          },
          {
            path: AppRoute.NewListing,
            Component: NewListingPage,
          },
          {
            path: AppRoute.Register,
            Component: RegisterPage,
          },
          {
            path: AppRoute.Login,
            Component: LoginPage,
          },
          {
            path: AppRoute.About,
            Component: AboutPage,
          },
          {
            path: AppRoute.AdminDashboard,
            Component: AdminDashboardPage,
          },
        ],
      },

      {
        path: AppRoute.Any,
        Component: NotFoundPage,
      },
    ],
  },
]

export default APP_ROUTES
