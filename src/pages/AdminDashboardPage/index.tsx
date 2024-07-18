import { Add } from '@mui/icons-material';
import {
  Box,
  Container,
  Fab,
  Modal,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { FormikHelpers } from 'formik';
import { FC, useCallback, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useSessionStorage } from 'usehooks-ts';

import { ListingsCharts, UsersList } from '@faf-cars/components/admin';
import { CreateUserForm } from '@faf-cars/components/admin/forms';
import { useHttp, useWatchLoading } from '@faf-cars/hooks';
import { RegisterDto } from '@faf-cars/lib/auth';
import { QueryKey } from '@faf-cars/lib/query';
import { StorageKey } from '@faf-cars/lib/storage';
import { ToastId } from '@faf-cars/lib/toast';
import { CreateUserDto } from '@faf-cars/lib/user';

const enum AdminTab {
  UsersList = 'users',
  ListingsStats = 'listings',
}

const ADMIN_TABS: Record<AdminTab, string> = {
  [AdminTab.UsersList]: 'Users',
  [AdminTab.ListingsStats]: 'Listings',
};

const AdminDashboardPage: FC = () => {
  const [selectedTab, setSelectedTab] = useSessionStorage(
    StorageKey.AdminTab,
    AdminTab.UsersList,
  );

  const http = useHttp();
  const queryClient = useQueryClient();

  const createUserMutation = useMutation(
    (createDto: CreateUserDto) => http.user.create(createDto),
    {
      onSuccess: () => queryClient.invalidateQueries(QueryKey.UsersList),
    },
  );

  useWatchLoading(createUserMutation.isLoading);

  const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false);
  const [registerDto, setRegisterDto] = useState<RegisterDto>(
    {} as RegisterDto,
  );

  const handleUserCreate = useCallback(
    async (createDto: CreateUserDto, helpers: FormikHelpers<CreateUserDto>) => {
      setIsCreatingUser(false);
      try {
        await createUserMutation.mutateAsync(createDto);
        toast('User created.', { toastId: ToastId.UserCreate });
      } catch (err) {
        toast('Error creating.', {
          type: 'error',
          toastId: ToastId.UserCreate,
        });
      }
      helpers.resetForm();
      setRegisterDto({} as RegisterDto);
    },
    [registerDto],
  );

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
  );

  const addUserElement = useMemo(
    () => (
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
    ),
    [],
  );

  const tabsElement = useMemo(
    () => (
      <Tabs
        value={selectedTab}
        onChange={(event, value) => setSelectedTab(value)}
        aria-label="tab"
      >
        {Object.entries(ADMIN_TABS).map(([tab, text]) => (
          <Tab key={tab} label={text} value={tab} />
        ))}
      </Tabs>
    ),
    [selectedTab],
  );

  const renderedTabElement = {
    [AdminTab.UsersList]: <UsersList />,
    [AdminTab.ListingsStats]: <ListingsCharts />,
  }[selectedTab];

  return (
    <>
      {modalElement}
      {tabsElement}
      <Box>
        {renderedTabElement}
        {addUserElement}
      </Box>
    </>
  );
};

export default AdminDashboardPage;
