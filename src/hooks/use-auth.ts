import { useContext } from 'react';

import { AuthContext } from '@carhive/contexts/auth';

export const useAuth = () => {
  return useContext(AuthContext);
};
