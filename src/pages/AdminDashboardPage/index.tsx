import { Add } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Container,
  Fab,
  Modal,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import { FormikHelpers } from 'formik'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'usehooks-ts'

import { CreateUserForm, UsersList } from '@faf-cars/components'
import { useHttpService, useWatchLoading } from '@faf-cars/hooks'
import type { CreateUserDto, RegisterDto } from '@faf-cars/lib/auth'
import dev_delay from '@faf-cars/lib/dev/delay'
import {
  DEFAULT_PAGINATION_DATA,
  PaginationData,
} from '@faf-cars/lib/paginationData'
import QueryKey from '@faf-cars/lib/query-key'
import StorageKey from '@faf-cars/lib/storage-key'
import { ToastId } from '@faf-cars/lib/toast'
import { CreateUser, UpdateUser, User } from '@faf-cars/lib/user'

const AdminDashboardPage: FC = () => {
  const [pagination, setPagination] = useLocalStorage<PaginationData>(
    StorageKey.DashboardUserPagination,
    DEFAULT_PAGINATION_DATA,
  )

  const http = useHttpService()
  const queryClient = useQueryClient()
  const usersQuery = useQuery([QueryKey.UsersList, pagination], () =>
    http.getUsers({
      take: pagination.size,
      page: pagination.page,
    }),
  )
  const deleteUserMutation = useMutation(
    (userId: string) => http.deleteUser(userId),
    {
      onSuccess: () => queryClient.invalidateQueries(QueryKey.UsersList),
    },
  )
  const updateUserMutation = useMutation({
    mutationFn: ([userId, updateDto]: [string, UpdateUser]) =>
      http.updateUser(userId, updateDto),
    onSuccess: () => queryClient.invalidateQueries(QueryKey.UsersList),
  })
  const createUserMutation = useMutation(
    (createDto: CreateUserDto) => http.createUser(createDto),
    {
      onSuccess: () => queryClient.invalidateQueries(QueryKey.UsersList),
    },
  )

  useWatchLoading(createUserMutation.isLoading)

  const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false)
  const [registerDto, setRegisterDto] = useState<RegisterDto>({} as RegisterDto)
  const [loadingUserIds, setLoadingUserIds] = useState<string[]>([])
  const loadingUserTimeoutIds = useRef<Record<string, NodeJS.Timeout>>({})

  const startLoadingUser = useCallback((userId: string) => {
    loadingUserTimeoutIds.current[userId] = setTimeout(
      () => setLoadingUserIds((ids) => ids.concat(userId)),
      250,
    )
  }, [])

  const stopLoadingUser = useCallback((userId: string) => {
    setLoadingUserIds((ids) => ids.filter((id) => id !== userId))
    clearTimeout(loadingUserTimeoutIds.current[userId])
  }, [])

  const handleUserDelete = useCallback(async (user: User) => {
    startLoadingUser(user.id)

    try {
      await deleteUserMutation.mutateAsync(user.id)
      toast('User deleted.', { toastId: ToastId.UserDelete })
    } catch (err) {
      console.error(err)
      toast('Error deleting.', { type: 'error' })
    } finally {
      stopLoadingUser(user.id)
    }
  }, [])

  const handleUserUpdate = useCallback(
    async (userId: string, updateDto: UpdateUser) => {
      startLoadingUser(userId)

      try {
        await dev_delay(2500)
        await updateUserMutation.mutateAsync([userId, updateDto])
        toast('User updated.', { toastId: ToastId.UserUpdate })
      } catch (err) {
        console.error(err)
        toast('Error updating.', { type: 'error', toastId: ToastId.UserUpdate })
      } finally {
        stopLoadingUser(userId)
      }
    },
    [],
  )

  const handleUserCreate = useCallback(
    async (createDto: CreateUser, helpers: FormikHelpers<CreateUser>) => {
      setIsCreatingUser(false)
      try {
        await createUserMutation.mutateAsync(createDto)
        toast('User created.', { toastId: ToastId.UserCreate })
      } catch (err) {
        console.error(err)
        toast('Error creating.', { type: 'error', toastId: ToastId.UserCreate })
      }
      helpers.resetForm()
      setRegisterDto({} as RegisterDto)
    },
    [registerDto],
  )

  useEffect(() => {
    if (usersQuery.data)
      setPagination((p) => ({
        ...p,
        count: Math.ceil(usersQuery.data.totalItems / p.size),
      }))
  }, [usersQuery.data])

  const modalElement = useMemo(
    () => (
      <Modal open={isCreatingUser} onClose={() => setIsCreatingUser(false)}>
        <Container
          fixed
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={2}>
            <CreateUserForm onSubmit={handleUserCreate} />
          </Stack>
        </Container>
      </Modal>
    ),
    [isCreatingUser, registerDto],
  )

  return (
    <>
      {modalElement}

      <Box>
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
              <UsersList
                users={usersQuery.data.items}
                onDelete={handleUserDelete}
                onUpdate={handleUserUpdate}
                loadingUserIds={loadingUserIds}
              />
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
        <Fab
          variant="extended"
          size="large"
          sx={{
            position: 'fixed',
            right: 32,
            bottom: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
          onClick={() => setIsCreatingUser(true)}
        >
          <Add />
          <Typography variant="body1">Add user</Typography>
        </Fab>
      </Box>
    </>
  )
}

export default AdminDashboardPage
