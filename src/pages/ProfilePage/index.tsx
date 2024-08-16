import { Box, Button, Container, Typography } from '@mui/material';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';

import { UserCard } from '@carhive/components';
import { useAuth } from '@carhive/hooks';
import { AppRoute } from '@carhive/lib/routing';

const ProfilePage: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate(AppRoute.Login);
  }, []);

  return (
    <Box>
      <Container maxWidth="xs" sx={{ pt: 10 }}>
        {user && <UserCard user={user} />}
        <Button onClick={handleLogout}>
          <Typography variant="h6">Log out</Typography>
        </Button>
      </Container>
    </Box>
  );
};

export default ProfilePage;
