import { useContext } from 'react';

import { HttpContext } from '@faf-cars/context/http.context';

const useHttp = () => {
  return useContext(HttpContext).httpService;
};

export default useHttp;
