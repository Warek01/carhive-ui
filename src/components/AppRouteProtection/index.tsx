import { FC, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth, useHttp, useLogger } from '@faf-cars/hooks';
import { AppRouteProtectionLevel, ROUTE_TYPE_MAP } from '@faf-cars/lib/routing';
import { AppRoute } from '@faf-cars/lib/routing';

const AppRouteProtection: FC = () => {
  const location = useLocation();
  const { isAuthorized, isAdmin, expiresAt, login, expireSession } = useAuth();
  const httpService = useHttp();
  const logger = useLogger();

  const path = location.pathname;

  useEffect(() => {
    if (expiresAt && expiresAt <= new Date()) {
      logger.debug(`Token expired at ${expiresAt}`);

      httpService
        .refresh()
        .then((res) => {
          login(res);
        })
        .catch(() => {
          expireSession();
        });
    }
  }, [path]);

  const isOnAuthorizedPage =
    ROUTE_TYPE_MAP[AppRouteProtectionLevel.AuthProtected].includes(path);
  const isOnAdminPage =
    ROUTE_TYPE_MAP[AppRouteProtectionLevel.AdminProtected].includes(path);
  const isOnOnlyUnauthorizedPage =
    ROUTE_TYPE_MAP[AppRouteProtectionLevel.OnlyUnauthorized].includes(path);

  if (isOnOnlyUnauthorizedPage && isAuthorized) {
    return <Navigate to={AppRoute.Home} />;
  }

  if (isOnAuthorizedPage && !isAuthorized) {
    return <Navigate to={AppRoute.Login} />;
  }

  if (isOnAdminPage && !isAdmin) {
    return <Navigate to={AppRoute.Home} />;
  }

  return <Outlet />;
};

export default AppRouteProtection;
