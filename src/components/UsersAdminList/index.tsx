import { FC, memo } from 'react'
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
import { Delete } from '@mui/icons-material'

import { UpdateUserDto, User, UserRole } from '@/lib/user'
import { toggleArrayItem } from '@/lib/utils'

interface Props {
  users: User[]
  onDelete(user: User): void | Promise<void>
  onUpdate(userId: string, updateDto: UpdateUserDto): void | Promise<void>
}

const UsersAdminList: FC<Props> = ({ users, onUpdate, onDelete }) => {
  return (
    <Stack spacing={1} alignSelf="stretch">
      {users.map((u) => (
        <Paper key={u.id} sx={{ px: 2, py: 1 }}>
          <Grid container display="flex" alignItems="center">
            <Grid item xs={4} display="flex" alignItems="center">
              <Typography color="secondary.main" variant="body1" pr={1.5}>
                {u.username}
              </Typography>
              <Typography variant="body2">{u.email}</Typography>
            </Grid>
            <Grid item xs={8} display="flex" alignItems="center">
              <Stack direction="row">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={u.roles.includes(UserRole.ADMIN)}
                        inputProps={{ 'aria-label': 'controlled' }}
                        onChange={() =>
                          onUpdate(u.id, {
                            ...u,
                            roles: toggleArrayItem(u.roles, UserRole.ADMIN),
                          })
                        }
                      />
                    }
                    label="Admin"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={u.roles.includes(UserRole.REMOVE_LISTING)}
                        inputProps={{ 'aria-label': 'controlled' }}
                        onChange={() =>
                          onUpdate(u.id, {
                            ...u,
                            roles: toggleArrayItem(
                              u.roles,
                              UserRole.REMOVE_LISTING,
                            ),
                          })
                        }
                      />
                    }
                    label="Remove listing"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={u.roles.includes(UserRole.CREATE_LISTING)}
                        inputProps={{ 'aria-label': 'controlled' }}
                        onChange={() =>
                          onUpdate(u.id, {
                            ...u,
                            roles: toggleArrayItem(
                              u.roles,
                              UserRole.CREATE_LISTING,
                            ),
                          })
                        }
                      />
                    }
                    label="Create listing"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={u.roles.includes(UserRole.SELF_DELETE)}
                        inputProps={{ 'aria-label': 'controlled' }}
                        onChange={() =>
                          onUpdate(u.id, {
                            ...u,
                            roles: toggleArrayItem(
                              u.roles,
                              UserRole.SELF_DELETE,
                            ),
                          })
                        }
                      />
                    }
                    label="Self delete"
                  />
                </FormGroup>
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

export default memo(UsersAdminList)
