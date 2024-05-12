import { useMemo } from 'react'

import HttpService from '@/services/http.service.ts'

const useHttpService = () => useMemo<HttpService>(() => new HttpService(), [])

export default useHttpService
