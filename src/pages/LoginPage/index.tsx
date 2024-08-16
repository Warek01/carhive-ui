import { Box, Container } from '@mui/material';
import { FC } from 'react';

import { LoginForm } from '@faf-cars/components/forms';

const LoginPage: FC = () => {
  return (
    <Box height="100%" display="flex" alignItems="center">
      <Container fixed maxWidth="xs">
        <LoginForm />
      </Container>
    </Box>
  );
};

export default LoginPage;
