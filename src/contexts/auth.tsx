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
import { User, UserRole } from '@faf-cars/lib/user';

export interface AuthContextProps {
  user: User | null;
  expiresAt: Date | null;
  isAuthorized: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  login(data: AuthDto): void;
  logout(): void;
  expireSession(): void;
}

export const AuthContext = createContext<AuthContextProps>(null!);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const http = useContext(HttpContext);
  const {
    accessToken,
    setAccessToken,
    setRefreshToken,
    sessionExpired,
    setSessionExpired,
  } = http;

  const decodedJwt = accessToken ? jwtDecode<AppJwtPayload>(accessToken) : null;

  const userQuery = useQuery(
    [QueryKey.UserList, accessToken],
    () => http.user.find(decodedJwt!.sub!),
    {
      enabled: !!decodedJwt,
    },
  );

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

  const user: User | null = userQuery.data ?? null;

  const context: AuthContextProps = {
    expiresAt: decodedJwt === null ? null : new Date(decodedJwt.exp! * 1000),
    isAdmin:
      (user?.roles!.includes(UserRole.Admin) ||
        user?.roles!.includes(UserRole.SuperAdmin)) ??
      false,
    isSuperAdmin: user?.roles!.includes(UserRole.SuperAdmin) ?? false,
    isAuthorized: !!accessToken,
    user,
    login,
    logout,
    expireSession,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
