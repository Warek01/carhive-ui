import { Box, Container } from '@mui/material';
import { FC } from 'react';

import { RegisterForm } from '@carhive/components/forms';

const RegisterPage: FC = () => {
  return (
    <Box height="100%" display="flex" alignItems="center">
      <Container fixed maxWidth="xs">
        <RegisterForm />
      </Container>
    </Box>
  );
};

export default RegisterPage;
