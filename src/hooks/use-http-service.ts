import { useMemo } from 'react';

import useAuth from '@faf-cars/hooks/use-auth';
import { HttpService } from '@faf-cars/services/http.service';

const useHttpService = () => {
  const { token } = useAuth();

  return useMemo<HttpService>(() => new HttpService(token), [token]);
};

export default useHttpService;
