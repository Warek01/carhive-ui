import { Box, CircularProgress, Typography } from '@mui/material'
import { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

import { useAuth } from '@faf-cars/hooks'
import AppRoute from '@faf-cars/lib/routing/app-route'
import AppRouteType from '@faf-cars/lib/routing/app-route-type'
import ROUTE_TYPE_MAP from '@faf-cars/lib/routing/route-type-map'

const AppRouteProtection: FC = () => {
  const location = useLocation()
  const { isAuthorized, isAdmin, refresh, expiresAt } = useAuth()

  const path = location.pathname

  if (expiresAt && expiresAt < new Date()) {
    refresh()

    return (
      <Box
        display="flex"
        justifyContent="center"
        height="100%"
        alignItems="center"
        gap={1}
      >
        <Typography>Refreshing token</Typography>
        <CircularProgress />
      </Box>
    )
  }

  const isOnAuthorizedPage =
    ROUTE_TYPE_MAP[AppRouteType.AUTH_PROTECTED].includes(path)
  const isOnAdminPage =
    ROUTE_TYPE_MAP[AppRouteType.ADMIN_PROTECTED].includes(path)

  if (isOnAuthorizedPage && !isAuthorized)
    return <Navigate to={AppRoute.Login} />
  if (isOnAdminPage && !isAdmin) return <Navigate to={AppRoute.Home} />
  return <Outlet />
}

export default AppRouteProtection
