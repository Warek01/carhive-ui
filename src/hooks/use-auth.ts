import { useContext } from 'react'

import AuthContext from '@/context/auth.context'

export default function useAuth() {
  const ctx = useContext(AuthContext)
  const isAuthorized = !!ctx.user && !!ctx.authToken

  return { ...ctx, isAuthorized }
}
