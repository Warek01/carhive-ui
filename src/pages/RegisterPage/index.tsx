import { FC } from 'react'
import { Box, Container } from '@mui/material'

import { RegisterForm } from '@/components'

const RegisterPage: FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      mt={-10}
    >
      <Container fixed maxWidth="xs">
        <RegisterForm />
      </Container>
    </Box>
  )
}

export default RegisterPage
