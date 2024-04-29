import { FC, useContext } from 'react'
import { Box, Container } from '@mui/material'

import AuthContext from '@/context/AuthContext.tsx'
import { UserCard } from '@/components'

const ProfilePage: FC = () => {
  const { user } = useContext(AuthContext)

  return (
    <Box>
      <Container maxWidth="xs" sx={{ pt: 10 }}>
        <UserCard user={user} />
      </Container>
    </Box>
  )
}

export default ProfilePage
