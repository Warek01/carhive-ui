import { jwtDecode } from 'jwt-decode';
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { HttpContext } from '@faf-cars/contexts/http';
import { AppJwtPayload, AuthDto } from '@faf-cars/lib/auth';
import { QueryKey } from '@faf-cars/lib/query';
import { StorageKey } from '@faf-cars/lib/storage';
import { ToastId } from '@faf-cars/lib/toast';
import { AuthenticatedUser, UserRoleAsString } from '@faf-cars/lib/user';

export interface AuthContextProps {
  fetchedUser: AuthenticatedUser | null;
  userId: string | null;
  expiresAt: Date | null;
  isAuthorized: boolean;
  isListingCreator: boolean;
  isAdmin: boolean;
  login(data: AuthDto): void;
  logout(): void;
  expireSession(): void;
}

export const AuthContext = createContext<AuthContextProps>(null!);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const {
    httpService,
    accessToken,
    sessionExpired,
    setAccessToken,
    setRefreshToken,
    setSessionExpired,
  } = useContext(HttpContext);

  const decodedJwt = accessToken ? jwtDecode<AppJwtPayload>(accessToken) : null;

  const userQuery = useQuery(
    [QueryKey.User, accessToken],
    () => httpService.getUser<AuthenticatedUser>(decodedJwt!.sub!),
    {
      enabled: !!decodedJwt,
    },
  );

  const roles = !decodedJwt?.role
    ? []
    : Array.isArray(decodedJwt.role)
      ? decodedJwt.role
      : [decodedJwt.role];

  const login = useCallback((data: AuthDto) => {
    setAccessToken(data.token);
    setRefreshToken(data.refreshToken);
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);

    queryClient.clear();
    queryClient.invalidateQueries();

    const theme = localStorage.getItem(StorageKey.Theme);
    localStorage.clear();
    sessionStorage.clear();

    if (theme) {
      localStorage.setItem(StorageKey.Theme, theme);
    }
  }, []);

  const expireSession = useCallback(() => {
    setSessionExpired(true);
    setAccessToken(null);
    setRefreshToken(null);
  }, []);

  useEffect(() => {
    if (sessionExpired) {
      logout();

      toast('Session has expired.', {
        toastId: ToastId.AuthError,
        type: 'warning',
      });
    }
  }, [sessionExpired]);

  const context: AuthContextProps = {
    expiresAt: decodedJwt === null ? null : new Date(decodedJwt.exp! * 1000),
    isAdmin: roles.includes(UserRoleAsString.Admin) ?? false,
    isListingCreator: roles.includes(UserRoleAsString.ListingCreator) ?? false,
    userId: decodedJwt?.sub ?? null,
    fetchedUser: userQuery.data ?? null,
    isAuthorized: !!accessToken,
    login,
    logout,
    expireSession,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
