import { useContext } from 'react';

import { LogContext } from '@carhive/contexts/log';

export const useLogger = () => {
  return useContext(LogContext).logger;
};
