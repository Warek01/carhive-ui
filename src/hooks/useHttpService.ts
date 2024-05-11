import { useMemo } from 'react'

import HttpService from '@/serices/http.service.ts'

const useHttpService = () => useMemo<HttpService>(() => new HttpService(), [])

export default useHttpService
