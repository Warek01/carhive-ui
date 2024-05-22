import AppRoute from '@/lib/routing/app-route'
import AppRouteType from '@/lib/routing/app-route-type'

const ROUTE_TYPE_MAP: Record<AppRouteType, (AppRoute | string)[]> = {
  [AppRouteType.UNPROTECTED]: [
    AppRoute.HOME,
    AppRoute.ABOUT,
    AppRoute.LOGIN,
    AppRoute.REGISTER,
  ],
  [AppRouteType.AUTH_PROTECTED]: [
    AppRoute.LISTINGS,
    AppRoute.PROFILE,
    AppRoute.NEW_LISTING,
    AppRoute.LISTING_DETAILS,
    AppRoute.ADMIN_DASHBOARD,
  ],
  [AppRouteType.ADMIN_PROTECTED]: [AppRoute.ADMIN_DASHBOARD],
}

export default ROUTE_TYPE_MAP
