import { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

import { useAuth } from '@/hooks'
import AppRoute from '@/lib/app-route'
import AppRouteType from '@/lib/app-route-type'

const ROUTE_TYPE_MAP: Record<AppRouteType, (AppRoute | string)[]> = {
  [AppRouteType.UNAUTHORIZED]: [AppRoute.LOGIN, AppRoute.REGISTER],
  [AppRouteType.AUTHORIZED]: [
    AppRoute.LISTINGS,
    AppRoute.PROFILE,
    AppRoute.NEW_LISTING,
    AppRoute.HOME,
    AppRoute.LISTING_DETAILS,
    AppRoute.ADMIN_DASHBOARD,
  ],
  [AppRouteType.ADMIN]: [AppRoute.ADMIN_DASHBOARD],
}

const AppRouteProtection: FC = () => {
  const location = useLocation()
  const { isAuthorized, isAdmin } = useAuth()

  const isOnUnauthorizedPage = ROUTE_TYPE_MAP[
    AppRouteType.UNAUTHORIZED
  ].includes(location.pathname)
  const isOnAuthorizedPage = ROUTE_TYPE_MAP[AppRouteType.AUTHORIZED].includes(
    location.pathname,
  )
  const isOnAdminPage = ROUTE_TYPE_MAP[AppRouteType.ADMIN].includes(
    location.pathname,
  )

  if (!isOnUnauthorizedPage && !isAuthorized)
    return <Navigate to={AppRoute.LOGIN} />
  else if (!isOnAuthorizedPage && isAuthorized)
    return <Navigate to={AppRoute.HOME} />
  else if (isOnAdminPage && !isAdmin) return <Navigate to={AppRoute.HOME} />
  else return <Outlet />
}

export default AppRouteProtection