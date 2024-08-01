import { Box, Container, CssBaseline } from '@mui/material';
import { FC, memo } from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header, MobileSplashScreen } from '@faf-cars/components';
import { GLOBAL_CONTAINER_MAX_WIDTH } from '@faf-cars/lib/themes';
import { useGetToastProps } from '@faf-cars/lib/toast';

const AppLayout: FC = () => {
  const toastProps = useGetToastProps();

  return (
    <Box
      pt={8}
      minHeight="100vh"
      height="100vh"
      maxHeight="100bvh"
      position="relative"
    >
      <CssBaseline />
      <ToastContainer {...toastProps} />
      <Box overflow="auto" height="100%" py={4}>
        <MobileSplashScreen>
          <Header />
          <Container fixed maxWidth={GLOBAL_CONTAINER_MAX_WIDTH}>
            <Outlet />
          </Container>
        </MobileSplashScreen>
      </Box>
    </Box>
  );
};

export default memo(AppLayout);
