import { useContext } from 'react';

import { GlobalLoadingContext } from '@carhive/contexts/global-loading';

export const useLoading = () => {
  const { unsetLoading, setLoading } = useContext(GlobalLoadingContext);

  return {
    setLoading,
    unsetLoading,
  };
};
