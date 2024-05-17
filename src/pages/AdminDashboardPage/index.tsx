import { Add } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Fab,
  FormControlLabel,
  Modal,
  Pagination,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { FormikHelpers } from 'formik'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'usehooks-ts'

import { CreateUserForm, UsersList } from '@/components'
import { useHttpService, useWatchLoading } from '@/hooks'
import type { RegisterDto } from '@/lib/auth'
import { PaginationData } from '@/lib/definitions'
import LocalStorageKey from '@/lib/local-storage-key'
import QueryKey from '@/lib/query-key'
import { CreateUserDto, UpdateUserDto, User } from '@/lib/user'

const AdminDashboardPage: FC = () => {
  const [paginationData, setPaginationData] = useLocalStorage<PaginationData>(
    LocalStorageKey.ADMIN_DASHBOARD_USERS_LIST_PAGINATION_DATA,
    {
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 0,
    },
  )

  const http = useHttpService()
  const queryClient = useQueryClient()
  const usersQuery = useQuery([QueryKey.USERS_LIST, paginationData], () =>
    http.getUsers({
      take: paginationData.itemsPerPage,
      page: paginationData.currentPage,
    }),
  )
  const deleteUserMutation = useMutation(
    (userId: string) => http.deleteUser(userId),
    {
      onSuccess: () => queryClient.invalidateQueries(QueryKey.USERS_LIST),
    },
  )
  const updateUserMutation = useMutation({
    mutationFn: ([userId, updateDto]: [string, UpdateUserDto]) =>
      http.updateUser(userId, updateDto),
    onSuccess: () => queryClient.invalidateQueries(QueryKey.USERS_LIST),
  })
  const createUserMutation = useMutation(
    (registerDto: RegisterDto) => http.register(registerDto),
    {
      onSuccess: () => queryClient.invalidateQueries(QueryKey.USERS_LIST),
    },
  )

  useWatchLoading(createUserMutation.isLoading)

  const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false)
  const [registerDto, setRegisterDto] = useState<RegisterDto>({} as RegisterDto)

  const handleUserDelete = useCallback(async (user: User) => {
    try {
      await deleteUserMutation.mutateAsync(user.id)
      toast('User deleted.')
    } catch (err) {
      console.error(err)
      toast('Error deleting.', { type: 'error' })
    }
  }, [])

  const handleUserUpdate = useCallback(
    async (userId: string, updateDto: UpdateUserDto) => {
      try {
        await updateUserMutation.mutateAsync([userId, updateDto])
        toast('User updated.')
      } catch (err) {
        console.error(err)
        toast('Error updating.', { type: 'error' })
      }
    },
    [],
  )

  const handleUserCreate = useCallback(
    async (createDto: CreateUserDto, helpers: FormikHelpers<CreateUserDto>) => {
      setIsCreatingUser(false)
      try {
        await createUserMutation.mutateAsync(createDto)
        toast('User created.')
      } catch (err) {
        console.error(err)
        toast('Error creating.', { type: 'error' })
      }
      helpers.resetForm()
      setRegisterDto({} as RegisterDto)
    },
    [registerDto],
  )

  useEffect(() => {
    if (usersQuery.data)
      setPaginationData((p) => ({
        ...p,
        totalPages: Math.ceil(usersQuery.data.totalItems / p.itemsPerPage),
      }))
  }, [usersQuery.data])

  const modalElement = useMemo(
    () => (
      <Modal open={isCreatingUser} onClose={() => setIsCreatingUser(false)}>
        <Container
          fixed
          sx={{
            position: 'absolute' as 'absolute',
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
              />
              <Pagination
                page={paginationData.currentPage + 1}
                count={paginationData.totalPages}
                onChange={(_, page) =>
                  setPaginationData((p) => ({ ...p, currentPage: page - 1 }))
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
