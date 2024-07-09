import { AppRoute } from '@faf-cars/lib/routing/app-route'
import AppRouteType from '@faf-cars/lib/routing/app-route-type'

const ROUTE_TYPE_MAP: Record<AppRouteType, (AppRoute | string)[]> = {
  [AppRouteType.UNPROTECTED]: [
    AppRoute.Home,
    AppRoute.About,
    AppRoute.Login,
    AppRoute.Register,
  ],
  [AppRouteType.AUTH_PROTECTED]: [
    AppRoute.Listings,
    AppRoute.Profile,
    AppRoute.NewListing,
    AppRoute.ListingDetails,
    AppRoute.AdminDashboard,
  ],
  [AppRouteType.ADMIN_PROTECTED]: [AppRoute.AdminDashboard],
}

export default ROUTE_TYPE_MAP
