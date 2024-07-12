import { FC, PropsWithChildren, createContext } from 'react';

import { ConsoleLogger, LogLevel, Logger } from '@faf-cars/lib/logging';

export interface LogContextProps {
  logger: Logger;
}

export const LogContext = createContext<LogContextProps>(null!);

export const LogContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const logger = new ConsoleLogger(
    import.meta.env.PROD ? LogLevel.Error : LogLevel.Debug,
  );
  const context = { logger };

  return <LogContext.Provider value={context}>{children}</LogContext.Provider>;
};
