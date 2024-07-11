import { useContext } from 'react';

import { HttpContext } from '@faf-cars/contexts/http';

const useHttp = () => {
  return useContext(HttpContext).httpService;
};

export default useHttp;
