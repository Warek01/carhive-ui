import { FC, memo, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { useAuth, useHttp, useLogger } from '@faf-cars/hooks';
import { AppRouteProtectionLevel, ROUTE_TYPE_MAP } from '@faf-cars/lib/routing';
import { AppRoute } from '@faf-cars/lib/routing';

const AppRouteProtection: FC = () => {
  const location = useLocation();
  const { isAuthorized, isAdmin, expiresAt, login, expireSession } = useAuth();
  const http = useHttp();
  const logger = useLogger();
  const path = location.pathname;

  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const redirectTo = searchParams.get('redirectTo');
  newSearchParams.delete('redirectTo');

  useEffect(() => {
    if (expiresAt instanceof Date && expiresAt <= new Date()) {
      logger.debug(`Token expired at ${expiresAt}`);

      http.auth
        .refresh()
        .then((res) => {
          login(res);
        })
        .catch(() => {
          newSearchParams.set('redirectTo', path);
          setSearchParams(newSearchParams);
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
    return (
      <Navigate
        to={{
          pathname: redirectTo ?? AppRoute.Home,
          search: newSearchParams.toString(),
        }}
      />
    );
  }

  if (isOnAuthorizedPage && !isAuthorized) {
    newSearchParams.set('redirectTo', path);

    return (
      <Navigate
        to={{
          pathname: AppRoute.Login,
          search: newSearchParams.toString(),
        }}
      />
    );
  }

  if (isOnAdminPage && !isAdmin) {
    return (
      <Navigate
        to={{ pathname: AppRoute.Home, search: newSearchParams.toString() }}
      />
    );
  }

  return <Outlet />;
};

export default memo(AppRouteProtection);
