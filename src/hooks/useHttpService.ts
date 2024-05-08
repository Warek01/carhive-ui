import HttpService from '@/serices/http.service.ts'

const useHttpService = (): HttpService => HttpService.getSingleton()

export default useHttpService
