import { useContext } from 'react'

import AuthContext from '@/context/auth.context'

export default function useAuth() {
  const ctx = useContext(AuthContext)

  const isAdmin =
    ctx.user?.role === 'Admin' ||
    (Array.isArray(ctx.user?.role) && ctx.user.role.includes('Admin'))

  const isAuthorized = !!ctx.user && !!ctx.authToken

  return { ...ctx, isAuthorized, isAdmin }
}
