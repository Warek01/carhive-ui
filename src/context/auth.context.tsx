import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { jwtDecode } from 'jwt-decode'

import type { User } from '@/lib/definitions'
import type { AppJwtPayload } from '@/lib/auth'
import LocalStorageKey from '@/lib/local-storage-key'

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
      username: decoded.name,
      email: decoded.email,
      id: decoded.sub!,
      role: decoded.role,
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
