import { jwtDecode } from 'jwt-decode'
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
} from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'usehooks-ts'

import type { AppJwtPayload, JwtResponse } from '@/lib/auth'
import QueryKey from '@/lib/query-key'
import StorageKey from '@/lib/storage-key'
import { ToastId } from '@/lib/toast'
import { User, UserRole } from '@/lib/user'
import HttpService from '@/services/http.service'

export interface AuthContextProps {
  fetchedUser: User | null
  userId: string | null
  token: string | null
  refreshToken: string | null
  expiresAt: Date | null
  isAuthorized: boolean
  isAdmin: boolean
  login(data: JwtResponse): void
  logout(): void
  refresh(): Promise<void>
}

const AuthContext = createContext<AuthContextProps>(null!)
export default AuthContext

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient()

  const [authData, setAuthData] = useLocalStorage<JwtResponse | null>(
    StorageKey.AuthData,
    null,
  )

  const token = useMemo<string | null>(
    () => authData?.token ?? null,
    [authData],
  )

  const isAuthorized = useMemo<boolean>(() => !!token, [token])

  const refreshToken = useMemo<string | null>(
    () => authData?.refreshToken ?? null,
    [authData],
  )

  const decoded = useMemo<AppJwtPayload | null>(
    () => (token ? jwtDecode<AppJwtPayload>(token) : null),
    [token],
  )

  const http = useMemo<HttpService>(() => new HttpService(token), [token])

  const userQuery = useQuery(
    [QueryKey.User, token],
    () => http.getUser(decoded!.sub!),
    {
      enabled: isAuthorized,
    },
  )

  const fetchedUser = useMemo<User | null>(
    () => userQuery.data ?? null,
    [userQuery.data],
  )

  const expiresAt = useMemo<Date | null>(
    () => (decoded ? new Date(decoded.exp! * 1000) : null),
    [decoded],
  )

  const isAdmin = useMemo<boolean>(
    () => fetchedUser?.roles?.includes(UserRole.Admin) ?? false,
    [fetchedUser],
  )

  const userId = useMemo<string | null>(
    () => (token === null ? null : decoded!.sub!),
    [decoded],
  )

  const login = useCallback((data: JwtResponse) => {
    setAuthData(data)
  }, [])

  const logout = useCallback(() => {
    queryClient.clear()
    queryClient.invalidateQueries()
    const theme = localStorage.getItem(StorageKey.Theme)
    localStorage.clear()
    sessionStorage.clear()
    setAuthData(null)

    if (theme) localStorage.setItem(StorageKey.Theme, theme)
  }, [])

  const refresh = useCallback(async () => {
    if (!authData) return

    try {
      const http = new HttpService(null)
      const res = await http.refresh(authData)
      login(res)
    } catch (err) {
      console.error(err)
      toast('Session has expired.', {
        toastId: ToastId.SessionExpire,
        type: 'warning',
      })
      logout()
    }
  }, [authData, login, logout])

  const context: AuthContextProps = {
    fetchedUser: fetchedUser,
    isAuthorized,
    token,
    refreshToken,
    isAdmin,
    login,
    logout,
    expiresAt,
    refresh,
    userId,
  }

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
