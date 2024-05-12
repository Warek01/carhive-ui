import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router'

import { AppRoute } from '@/routing/AppRoute.ts'
import { useAuth } from '@/hooks'

const ReverseAuthProtected: FC = () => {
  const { isAuthorized } = useAuth()

  return isAuthorized ? <Navigate to={AppRoute.HOME} /> : <Outlet />
}

export default ReverseAuthProtected
