import { Box, Container } from '@mui/material';
import { FC } from 'react';
import { Navigate } from 'react-router';

import { RegisterForm } from '@faf-cars/components/forms';
import { useAuth } from '@faf-cars/hooks';
import { AppRoute } from '@faf-cars/lib/routing';

const RegisterPage: FC = () => {
  const { isAuthorized } = useAuth();

  if (isAuthorized) return <Navigate to={AppRoute.Home} />;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      mt={-10}
    >
      <Container fixed maxWidth="xs">
        <RegisterForm />
      </Container>
    </Box>
  );
};

export default RegisterPage;
