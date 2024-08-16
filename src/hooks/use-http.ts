import { useContext } from 'react';

import { HttpContext } from '@carhive/contexts/http';

export const useHttp = () => {
  return useContext(HttpContext);
};
