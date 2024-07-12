import { useContext } from 'react';

import { AuthContext } from '@faf-cars/contexts/auth';

export const useAuth = () => {
  return useContext(AuthContext);
};
