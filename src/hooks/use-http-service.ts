import { useMemo } from 'react'

import useAuth from '@/hooks/use-auth'
import HttpService from '@/services/http.service'

const useHttpService = () => {
  const { token } = useAuth()

  return useMemo<HttpService>(() => new HttpService(token), [token])
}

export default useHttpService
