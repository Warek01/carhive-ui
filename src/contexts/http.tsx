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

import { useLogger } from '@faf-cars/hooks';
import { StorageKey } from '@faf-cars/lib/storage';
import {
  AuthHttpService,
  BrandHttpService,
  CityHttpService,
  CountryHttpService,
  ListingHttpService,
  UserHttpService,
} from '@faf-cars/services/http';

// this contexts acts as a storage for auth tokens and provides http services
// the services will use refresh token when encounters 401 Unauthorized and set
// new token or expire it

export interface HttpContextProps {
  auth: AuthHttpService;
  brand: BrandHttpService;
  city: CityHttpService;
  country: CountryHttpService;
  listing: ListingHttpService;
  user: UserHttpService;
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  refreshToken: string | null;
  setRefreshToken: Dispatch<SetStateAction<string | null>>;
  sessionExpired: boolean;
  setSessionExpired: Dispatch<SetStateAction<boolean>>;
}

export const HttpContext = createContext<HttpContextProps>(null!);

export const HttpContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const logger = useLogger();

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
    logger.debug(
      'Access token:',
      accessToken ?? 'null',
      'Refresh token:',
      refreshToken ?? 'null',
    );
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (sessionExpired) {
      setSessionExpired(false);
    }
  }, [sessionExpired]);

  const context: HttpContextProps = {
    auth: null!,
    brand: null!,
    city: null!,
    country: null!,
    listing: null!,
    user: null!,
    refreshToken,
    setRefreshToken,
    accessToken,
    setAccessToken,
    sessionExpired,
    setSessionExpired,
  };

  context.auth = new AuthHttpService(context);
  context.brand = new BrandHttpService(context);
  context.city = new CityHttpService(context);
  context.country = new CountryHttpService(context);
  context.listing = new ListingHttpService(context);
  context.user = new UserHttpService(context);

  return (
    <HttpContext.Provider value={context}>{children}</HttpContext.Provider>
  );
};
