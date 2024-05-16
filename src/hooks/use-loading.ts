import { useContext, useEffect } from 'react'

import GlobalLoadingContext from '@/context/global-loading.context'

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
