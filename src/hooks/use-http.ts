import { useContext } from 'react';

import { HttpContext } from '@faf-cars/contexts/http';

export const useHttp = () => {
  return useContext(HttpContext).httpService;
};
