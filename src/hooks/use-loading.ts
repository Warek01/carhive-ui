import { useContext } from 'react';

import GlobalLoadingContext from '@faf-cars/context/global-loading.context';

const useLoading = () => {
  const { unsetLoading, setLoading } = useContext(GlobalLoadingContext);

  return {
    setLoading,
    unsetLoading,
  };
};

export default useLoading;
