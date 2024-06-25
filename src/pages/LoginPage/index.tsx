import { Box, Container } from '@mui/material'
import { FC } from 'react'
import { Navigate } from 'react-router'

import { LoginForm } from '@/components'
import { useAuth } from '@/hooks'
import AppRoute from '@/lib/routing/app-route'

const LoginPage: FC = () => {
  const { isAuthorized } = useAuth()

  if (isAuthorized) return <Navigate to={AppRoute.Home} />

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      mt={-10}
    >
      <Container fixed maxWidth="xs">
        <LoginForm />
      </Container>
    </Box>
  )
}

export default LoginPage
