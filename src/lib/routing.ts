import { RouteObject } from 'react-router-dom';

import { AppLayout, AppRouteProtection } from '@carhive/components';
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
} from '@carhive/pages';

export const enum AppRoute {
  Home = '/',
  ListingList = '/listing',
  NewListing = '/listing/new',
  Listing = '/listing/:listingId',
  User = '/user/:userId',
  Profile = '/me',
  Register = '/register',
  Login = '/login',
  AdminDashboard = '/admin',
  About = '/about',
  Any = '*',
}

export const enum AppRouteProtectionLevel {
  Unprotected,
  OnlyUnauthorized,
  AuthProtected,
  AdminProtected,
}

export const APP_ROUTES: RouteObject[] = [
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
            path: AppRoute.ListingList,
            Component: MarketPage,
          },
          {
            path: AppRoute.Listing,
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
];

export const ROUTE_TYPE_MAP: Record<
  AppRouteProtectionLevel,
  Array<AppRoute | string>
> = {
  [AppRouteProtectionLevel.Unprotected]: [AppRoute.Home, AppRoute.About],
  [AppRouteProtectionLevel.OnlyUnauthorized]: [
    AppRoute.Login,
    AppRoute.Register,
  ],
  [AppRouteProtectionLevel.AuthProtected]: [
    AppRoute.ListingList,
    AppRoute.Profile,
    AppRoute.NewListing,
    AppRoute.Listing,
    AppRoute.AdminDashboard,
  ],
  [AppRouteProtectionLevel.AdminProtected]: [AppRoute.AdminDashboard],
};
