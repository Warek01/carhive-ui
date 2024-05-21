import { jwtDecode } from 'jwt-decode'
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useLocalStorage } from 'usehooks-ts'

import type { AppJwtPayload } from '@/lib/auth'
import LocalStorageKey from '@/lib/local-storage-key'
import type { User } from '@/lib/user'
import getUserRole from '@/lib/utils/get-user-role'

export interface AuthContextProps {
  user: User | null
  authToken: string | null
  expiresAt: Date | null
  login(token: string): void
  logout(): void
}

const AuthContext = createContext<AuthContextProps>(null!)
export default AuthContext

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const [expiresAt, setExpiresAt] = useState<Date | null>(null)

  const [authToken, setAuthToken] = useLocalStorage<string | null>(
    LocalStorageKey.AUTH_TOKEN,
    null,
  )

  const login = useCallback((token: string) => {
    setAuthToken(token)
  }, [])

  const logout = useCallback(() => {
    setAuthToken(null)
  }, [])

  useEffect(() => {
    if (!authToken) {
      setUser(null)
      setExpiresAt(null)
      return
    }

    const decoded = jwtDecode<AppJwtPayload>(authToken)

    setExpiresAt(new Date(decoded.exp! * 1000))
    setUser({
      id: decoded.sub!,
      phone: decoded.phone,
      username: decoded.name,
      email: decoded.email,
      roles: getUserRole(decoded.role),
    })
  }, [authToken])

  const context: AuthContextProps = {
    user,
    authToken,
    login,
    logout,
    expiresAt,
  }

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
