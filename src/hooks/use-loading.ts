import { useContext } from 'react';

import { GlobalLoadingContext } from '@faf-cars/contexts/global-loading';

const useLoading = () => {
  const { unsetLoading, setLoading } = useContext(GlobalLoadingContext);

  return {
    setLoading,
    unsetLoading,
  };
};

export default useLoading;
