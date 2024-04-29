import { FC, memo } from 'react'
import { Avatar, Card, CardContent, Typography } from '@mui/material'
import * as icons from '@mui/icons-material'

import type { User } from '@/lib/definitions.ts'

interface Props {
  user: User
}

const UserCard: FC<Props> = ({ user }) => {
  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Avatar>
          <icons.AccountCircle />
        </Avatar>
        <Typography variant="h5" component="h2">
          {user.name}
        </Typography>
        <Typography color="textSecondary">Username: {user.username}</Typography>
      </CardContent>
    </Card>
  )
}

export default memo(UserCard)
