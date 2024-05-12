import { useCallback, useContext, useEffect, useState } from 'react'

import GlobalLoadingContext from '@/context/GlobalLoadingContext.tsx'

const useLoading = (isLoading: boolean | null = null) => {
  const { unsetLoading, setLoading } = useContext(GlobalLoadingContext)

  useEffect(() => {
    if (isLoading !== null) isLoading ? setLoading() : unsetLoading()
  }, [isLoading])

  return {
    setLoading,
    unsetLoading,
  }
}

export default useLoading
