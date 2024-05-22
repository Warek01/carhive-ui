import { useContext, useEffect } from 'react'

import GlobalLoadingContext from '@/context/global-loading.context'

const useLoading = () => {
  const { unsetLoading, setLoading } = useContext(GlobalLoadingContext)

  return {
    setLoading,
    unsetLoading,
  }
}

export default useLoading
