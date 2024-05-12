import { FC } from 'react'
import { Box, Container } from '@mui/material'

import { LoginForm } from '@/components'

const LoginPage: FC = () => {
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
