import { Box, Button, Container, Typography } from '@mui/material'
import { FC } from 'react'

import { UserCard } from '@/components'
import { useAuth } from '@/hooks'

const ProfilePage: FC = () => {
  const { user, logout } = useAuth()

  return (
    <Box>
      <Container maxWidth="xs" sx={{ pt: 10 }}>
        <UserCard user={user!} />
        <Button onClick={logout}>
          <Typography variant="h6">Log out</Typography>
        </Button>
      </Container>
    </Box>
  )
}

export default ProfilePage
