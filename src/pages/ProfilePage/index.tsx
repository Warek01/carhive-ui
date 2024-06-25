import { Box, Button, Container, Typography } from '@mui/material'
import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router'

import { UserCard } from '@/components'
import { useAuth } from '@/hooks'
import AppRoute from '@/lib/routing/app-route'

const ProfilePage: FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    logout()
    navigate(AppRoute.LOGIN)
  }, [])

  return (
    <Box>
      <Container maxWidth="xs" sx={{ pt: 10 }}>
        {user && <UserCard user={user} />}
        <Button onClick={handleLogout}>
          <Typography variant="h6">Log out</Typography>
        </Button>
      </Container>
    </Box>
  )
}

export default ProfilePage
