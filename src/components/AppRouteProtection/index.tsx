import { Box, CircularProgress, Typography } from '@mui/material';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '@faf-cars/hooks';
import { AppRoute } from '@faf-cars/lib/routing/app-route';
import AppRouteType from '@faf-cars/lib/routing/app-route-type';
import ROUTE_TYPE_MAP from '@faf-cars/lib/routing/route-type-map';

const AppRouteProtection: FC = () => {
  const location = useLocation();
  const { isAuthorized, isAdmin, refresh, expiresAt } = useAuth();

  const path = location.pathname;
  const [isRefreshing, setIsRefreshing] = useState(false);

  const expiredRef = useRef(false);
  expiredRef.current = !!expiresAt && expiresAt < new Date();

  const refreshWithBackdropTimeout = useCallback(() => {
    // do not show the spinner if the request took less than 0,5 seconds
    const backdropTimeout = setTimeout(() => setIsRefreshing(true), 500);
    refresh().finally(() => {
      clearTimeout(backdropTimeout);
      setIsRefreshing(false);
    });
  }, []);

  if (expiredRef.current) {
    refreshWithBackdropTimeout();
  }

  // check if token expired every 60 seconds
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (!expiredRef.current || isRefreshing) {
        return;
      }

      refreshWithBackdropTimeout();
    }, 60_000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const isOnAuthorizedPage =
    ROUTE_TYPE_MAP[AppRouteType.AUTH_PROTECTED].includes(path);
  const isOnAdminPage =
    ROUTE_TYPE_MAP[AppRouteType.ADMIN_PROTECTED].includes(path);

  if (isRefreshing) {
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
    );
  }

  if (isOnAuthorizedPage && !isAuthorized)
    return <Navigate to={AppRoute.Login} />;
  if (isOnAdminPage && !isAdmin) return <Navigate to={AppRoute.Home} />;
  return <Outlet />;
};

export default AppRouteProtection;
