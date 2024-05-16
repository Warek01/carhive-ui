import { useMemo } from 'react'

import HttpService from '@/services/http.service'

const useHttpService = () => useMemo<HttpService>(() => new HttpService(), [])

export default useHttpService
