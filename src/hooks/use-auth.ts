import { useContext } from 'react';

import { AuthContext } from '@faf-cars/contexts/auth';

export default function useAuth() {
  return useContext(AuthContext);
}
