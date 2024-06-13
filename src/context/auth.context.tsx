import { jwtDecode } from 'jwt-decode'
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
} from 'react'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'usehooks-ts'

import type { AppJwtPayload, JwtResponse } from '@/lib/auth'
import StorageKey from '@/lib/storage-key'
import { User, UserRole } from '@/lib/user'
import getUserRole from '@/lib/utils/get-user-role'
import HttpService from '@/services/http.service'

export interface AuthContextProps {
  user: User | null
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
  const [authData, setAuthData] = useLocalStorage<JwtResponse | null>(
    StorageKey.AUTH_DATA,
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

  const user = useMemo<User | null>(
    () =>
      decoded
        ? {
            id: decoded.sub!,
            phone: decoded.phone,
            username: decoded.name,
            email: decoded.email,
            roles: getUserRole(decoded.role),
          }
        : null,
    [decoded],
  )

  const expiresAt = useMemo<Date | null>(
    () => (decoded ? new Date(decoded.exp! * 1000) : null),
    [decoded],
  )

  const isAdmin = useMemo<boolean>(
    () => user?.roles?.includes(UserRole.ADMIN) ?? false,
    [user],
  )

  const login = useCallback((data: JwtResponse) => {
    setAuthData(data)
  }, [])

  const logout = useCallback(() => {
    setAuthData(null)
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
        toastId: 'session-expire',
        type: 'warning',
      })
      logout()
    }
  }, [authData, login, logout])

  const context: AuthContextProps = {
    user,
    isAuthorized,
    token,
    refreshToken,
    isAdmin,
    login,
    logout,
    expiresAt,
    refresh,
  }

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
