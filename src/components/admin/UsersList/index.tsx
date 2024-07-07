import { Delete } from '@mui/icons-material'
import {
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { FC, memo } from 'react'

import { useAuth } from '@faf-cars/hooks'
import { UpdateUser, User, UserRole } from '@faf-cars/lib/user'
import { toggleArrayItem } from '@faf-cars/lib/utils'

interface Props {
  users: User[]
  loadingUserIds: string[]
  onDelete(user: User): void | Promise<void>
  onUpdate(userId: string, updateDto: UpdateUser): void | Promise<void>
}

const ROLES_STRING_MAP: [UserRole, string][] = [
  [UserRole.Admin, 'Admin'],
  [UserRole.ListingCreator, 'Listing creator'],
]

const UsersList: FC<Props> = ({
  users,
  onUpdate,
  onDelete,
  loadingUserIds,
}) => {
  const { fetchedUser } = useAuth()

  return (
    <Stack spacing={1} alignSelf="stretch">
      {users.map((u) => (
        <Paper key={u.id} sx={{ px: 2, py: 1 }}>
          <Grid container display="flex" alignItems="center">
            <Grid item xs={4} display="flex" alignItems="center">
              <Typography color="secondary.main" variant="body2" pr={1.5}>
                {u.username}
              </Typography>
              <Typography variant="caption">{u.email}</Typography>
            </Grid>
            <Grid
              item
              xs={8}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row">
                {ROLES_STRING_MAP.map(([role, text]) => (
                  <FormGroup key={role}>
                    <FormControlLabel
                      control={
                        <Switch
                          disabled={
                            u!.id === fetchedUser!.id ||
                            loadingUserIds.includes(u.id)
                          }
                          checked={u.roles!.includes(role)}
                          inputProps={{ 'aria-label': 'controlled' }}
                          onChange={() =>
                            onUpdate(u!.id, {
                              ...u!,
                              roles: toggleArrayItem(u!.roles!, role),
                            })
                          }
                        />
                      }
                      label={<Typography variant="caption">{text}</Typography>}
                    />
                  </FormGroup>
                ))}
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                {loadingUserIds.includes(u.id) && (
                  <CircularProgress size={24} />
                )}
                <IconButton
                  color="error"
                  onClick={() => onDelete(u)}
                  disabled={
                    u.id === fetchedUser!.id || loadingUserIds.includes(u.id)
                  }
                >
                  <Delete />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Stack>
  )
}

export default memo(UsersList)
