import { Delete } from '@mui/icons-material'
import {
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

import { UpdateUserDto, User, UserRole } from '@/lib/user'
import { toggleArrayItem } from '@/lib/utils'

interface Props {
  users: User[]
  onDelete(user: User): void | Promise<void>
  onUpdate(userId: string, updateDto: UpdateUserDto): void | Promise<void>
}

const ROLES_MAP: [UserRole, string][] = [
  [UserRole.ADMIN, 'Admin'],
  [UserRole.SELF_DELETE, 'Self-delete'],
  [UserRole.CREATE_LISTING, 'Create listing'],
  [UserRole.REMOVE_LISTING, 'Remove listing'],
]

const UsersList: FC<Props> = ({ users, onUpdate, onDelete }) => {
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
                {ROLES_MAP.map(([role, text]) => (
                  <FormGroup key={role}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={u.roles.includes(role)}
                          inputProps={{ 'aria-label': 'controlled' }}
                          onChange={() =>
                            onUpdate(u.id, {
                              ...u,
                              roles: toggleArrayItem(u.roles, role),
                            })
                          }
                        />
                      }
                      label={<Typography variant="caption">{text}</Typography>}
                    />
                  </FormGroup>
                ))}
              </Stack>
              <IconButton color="error" onClick={() => onDelete(u)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Stack>
  )
}

export default memo(UsersList)
