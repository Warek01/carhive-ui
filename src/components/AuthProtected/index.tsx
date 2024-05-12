import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router'

import { AppRoute } from '@/routing/AppRoute.ts'
import { useAuth } from '@/hooks'

const AuthProtected: FC = () => {
  const { isAuthorized } = useAuth()

  return isAuthorized ? <Outlet /> : <Navigate to={AppRoute.LOGIN} />
}

export default AuthProtected
