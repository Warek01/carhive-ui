import { Delete } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'usehooks-ts';

import { useAuth, useHttpService } from '@faf-cars/hooks';
import dev_delay from '@faf-cars/lib/dev/delay';
import {
  DEFAULT_PAGINATION_DATA,
  PaginationData,
} from '@faf-cars/lib/paginationData';
import { QueryKey } from '@faf-cars/lib/query-key';
import { StorageKey } from '@faf-cars/lib/storage-key';
import { ToastId } from '@faf-cars/lib/toast';
import { UpdateUser, User, UserRole } from '@faf-cars/lib/user';
import { toggleArrayItem } from '@faf-cars/lib/utils';

const ROLES_STRING_MAP: [UserRole, string][] = [
  [UserRole.Admin, 'Admin'],
  [UserRole.ListingCreator, 'Listing creator'],
];

const UsersList: FC = () => {
  const { fetchedUser } = useAuth();
  const http = useHttpService();
  const queryClient = useQueryClient();

  const [pagination, setPagination] = useLocalStorage<PaginationData>(
    StorageKey.DashboardUserPagination,
    DEFAULT_PAGINATION_DATA,
  );

  const [loadingUserIds, setLoadingUserIds] = useState<string[]>([]);
  const loadingUserTimeoutIds = useRef<Record<string, NodeJS.Timeout>>({});

  const startLoadingUser = useCallback((userId: string) => {
    loadingUserTimeoutIds.current[userId] = setTimeout(
      () => setLoadingUserIds((ids) => ids.concat(userId)),
      250,
    );
  }, []);

  const stopLoadingUser = useCallback((userId: string) => {
    setLoadingUserIds((ids) => ids.filter((id) => id !== userId));
    clearTimeout(loadingUserTimeoutIds.current[userId]);
  }, []);

  const usersQuery = useQuery([QueryKey.UsersList, pagination], () =>
    http.getUsers({
      take: pagination.size,
      page: pagination.page,
    }),
  );
  const deleteUserMutation = useMutation(
    (userId: string) => http.deleteUser(userId),
    {
      onSuccess: () => queryClient.invalidateQueries(QueryKey.UsersList),
    },
  );
  const updateUserMutation = useMutation({
    mutationFn: ([userId, updateDto]: [string, UpdateUser]) =>
      http.updateUser(userId, updateDto),
    onSuccess: () => queryClient.invalidateQueries(QueryKey.UsersList),
  });

  const handleUserDelete = useCallback(async (user: User) => {
    startLoadingUser(user.id);

    try {
      await deleteUserMutation.mutateAsync(user.id);
      toast('User deleted.', { toastId: ToastId.UserDelete });
    } catch (err) {
      console.error(err);
      toast('Error deleting.', { type: 'error' });
    } finally {
      stopLoadingUser(user.id);
    }
  }, []);

  const handleUserUpdate = useCallback(
    async (userId: string, updateDto: UpdateUser) => {
      startLoadingUser(userId);

      try {
        await dev_delay(2500);
        await updateUserMutation.mutateAsync([userId, updateDto]);
        toast('User updated.', { toastId: ToastId.UserUpdate });
      } catch (err) {
        console.error(err);
        toast('Error updating.', {
          type: 'error',
          toastId: ToastId.UserUpdate,
        });
      } finally {
        stopLoadingUser(userId);
      }
    },
    [],
  );

  useEffect(() => {
    if (usersQuery.data)
      setPagination((p) => ({
        ...p,
        count: Math.ceil(usersQuery.data.totalItems / p.size),
      }));
  }, [usersQuery.data]);

  return (
    <Box
      py={3}
      width="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap={3}
    >
      {usersQuery.data ? (
        <>
          <Stack spacing={1} alignSelf="stretch">
            {usersQuery.data.items.map((u) => (
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
                                  handleUserUpdate(u!.id, {
                                    ...u!,
                                    roles: toggleArrayItem(u!.roles!, role),
                                  })
                                }
                              />
                            }
                            label={
                              <Typography variant="caption">{text}</Typography>
                            }
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
                        onClick={() => handleUserDelete(u)}
                        disabled={
                          u.id === fetchedUser!.id ||
                          loadingUserIds.includes(u.id)
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
          <Pagination
            page={pagination.page + 1}
            count={pagination.count}
            onChange={(_, page) =>
              setPagination((p) => ({ ...p, page: page - 1 }))
            }
          />
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default memo(UsersList);
