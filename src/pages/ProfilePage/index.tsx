import { FC, useContext } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { Navigate } from 'react-router'

import AuthContext from '@/context/AuthContext.tsx'
import { UserCard } from '@/components'
import { AppRoute } from '@/routing/AppRoute.ts'

const ProfilePage: FC = () => {
  const { user, logout } = useContext(AuthContext)

  if (!user) return <Navigate to={AppRoute.LOGIN} />

  return (
    <Box>
      <Container maxWidth="xs" sx={{ pt: 10 }}>
        <UserCard user={user} />
        <Button onClick={logout}>
          <Typography variant="h6">Log out</Typography>
        </Button>
      </Container>
    </Box>
  )
}

export default ProfilePage
