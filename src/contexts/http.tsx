import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { StorageKey } from '@faf-cars/lib/storage';
import { HttpService } from '@faf-cars/services/http';

// this contexts acts as a storage for auth tokens and provides http service
// the service will use refresh token when encounters 401 Unauthorized and set
// new token or expire it

export interface HttpContextProps {
  httpService: HttpService;
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  refreshToken: string | null;
  setRefreshToken: Dispatch<SetStateAction<string | null>>;
  sessionExpired: boolean;
  setSessionExpired: Dispatch<SetStateAction<boolean>>;
}

export const HttpContext = createContext<HttpContextProps>(null!);

export const HttpContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    StorageKey.AccessToken,
    null,
    { initializeWithValue: true },
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    StorageKey.RefreshToken,
    null,
    { initializeWithValue: true },
  );
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (sessionExpired) {
      setSessionExpired(false);
    }
  }, [sessionExpired]);

  const context: HttpContextProps = {
    httpService: null!,
    refreshToken,
    setRefreshToken,
    accessToken,
    setAccessToken,
    sessionExpired,
    setSessionExpired,
  };

  context.httpService = new HttpService(context);

  return (
    <HttpContext.Provider value={context}>{children}</HttpContext.Provider>
  );
};
