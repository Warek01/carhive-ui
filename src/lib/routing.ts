import { RouteObject } from 'react-router-dom';

import { AppLayout, AppRouteProtection } from '@faf-cars/components';
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
} from '@faf-cars/pages';

export const enum AppRoute {
  Home = '/',
  Listings = '/listings',
  NewListing = '/listings/new',
  ListingDetails = '/listings/details/:listingId',
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
    AppRoute.Listings,
    AppRoute.Profile,
    AppRoute.NewListing,
    AppRoute.ListingDetails,
    AppRoute.AdminDashboard,
  ],
  [AppRouteProtectionLevel.AdminProtected]: [AppRoute.AdminDashboard],
};
