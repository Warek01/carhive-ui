import { useContext } from 'react'

import AuthContext from '@/context/AuthContext.tsx'

const useAuth = () => {
  const ctx = useContext(AuthContext)
  return { ...ctx, isAuthorized: ctx.user && ctx.authToken }
}

export default useAuth
