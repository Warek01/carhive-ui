import { createContext, FC, PropsWithChildren, useEffect, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import type { User } from '@/lib/definitions.ts'
import LocalStorageKey from '@/lib/LocalStorageKey.ts'
import { __mock__currentUser } from '@/__mocks__/users.ts'

export interface AuthContextProps {
  user: User
}

const AuthContext = createContext<AuthContextProps>(null!)

export default AuthContext

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useLocalStorage(
    LocalStorageKey.CURRENT_USER,
    __mock__currentUser,
    { initializeWithValue: true },
  )

  // debug
  useEffect(() => {
    setUser(__mock__currentUser)
  }, [])

  const context = useMemo<AuthContextProps>(
    () => ({
      user,
    }),
    [user],
  )

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
