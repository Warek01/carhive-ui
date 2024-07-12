import { useContext } from 'react';

import { LogContext } from '@faf-cars/contexts/log';

export const useLogger = () => {
  return useContext(LogContext).logger;
};
