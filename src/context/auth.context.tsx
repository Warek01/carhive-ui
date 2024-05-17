import { jwtDecode } from 'jwt-decode'
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
} from 'react'
import { useLocalStorage } from 'usehooks-ts'

import type { AppJwtPayload } from '@/lib/auth'
import LocalStorageKey from '@/lib/local-storage-key'
import type { User } from '@/lib/user'
import getUserRole from '@/lib/utils/get-user-role'

export interface AuthContextProps {
  user: User | null
  authToken: string | null
  login(token: string): void
  logout(): void
}

const AuthContext = createContext<AuthContextProps>(null!)
export default AuthContext

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>(
    LocalStorageKey.CURRENT_USER,
    null,
    { initializeWithValue: true },
  )

  const [authToken, setAuthToken] = useLocalStorage<string | null>(
    LocalStorageKey.AUTH_TOKEN,
    null,
  )

  const login = useCallback((token: string) => {
    setAuthToken(token)
    const decoded = jwtDecode<AppJwtPayload>(token)
    setUser({
      id: decoded.sub || decoded.nameid!,
      username: decoded.name,
      email: decoded.email,
      roles: getUserRole(decoded.role),
    })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setAuthToken(null)
  }, [])

  const context = useMemo<AuthContextProps>(
    () => ({
      user,
      authToken,
      login,
      logout,
    }),
    [user, authToken, login, logout],
  )

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
