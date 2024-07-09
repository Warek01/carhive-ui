import { Box, Button, Container, Typography } from '@mui/material'
import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router'

import { UserCard } from '@faf-cars/components'
import { useAuth } from '@faf-cars/hooks'
import { AppRoute } from '@faf-cars/lib/routing/app-route'

const ProfilePage: FC = () => {
  const { fetchedUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    logout()
    navigate(AppRoute.Login)
  }, [])

  return (
    <Box>
      <Container maxWidth="xs" sx={{ pt: 10 }}>
        {fetchedUser && <UserCard user={fetchedUser} />}
        <Button onClick={handleLogout}>
          <Typography variant="h6">Log out</Typography>
        </Button>
      </Container>
    </Box>
  )
}

export default ProfilePage
