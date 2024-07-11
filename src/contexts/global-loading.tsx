import { Backdrop, CircularProgress } from '@mui/material';
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react';

export interface GlobalLoadingContextProps {
  setLoading(): void;
  unsetLoading(): void;
}

export const GlobalLoadingContext = createContext<GlobalLoadingContextProps>(null!);

export const GlobalLoadingContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const unsetLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <GlobalLoadingContext.Provider
      value={{
        setLoading,
        unsetLoading,
      }}
    >
      <Backdrop
        open={isLoading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress />
      </Backdrop>
      {children}
    </GlobalLoadingContext.Provider>
  );
};
