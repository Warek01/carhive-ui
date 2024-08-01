import { useEffect } from 'react';

import { useLoading } from './index';

export const useWatchLoading = (...values: boolean[]) => {
  const { unsetLoading, setLoading } = useLoading();

  useEffect(() => {
    let loading = false;

    for (const v of values) {
      if (v) {
        loading = true;
        break;
      }
    }

    if (loading) {
      setLoading();
    } else {
      unsetLoading();
    }
  }, values);
};
