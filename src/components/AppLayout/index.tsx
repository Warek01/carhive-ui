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
    <>
      <CssBaseline />
      <ToastContainer {...toastProps} />
      <Box
        overflow="auto"
        minHeight="100vh"
        height="100vh"
        maxHeight="100vh"
        position="relative"
        display="flex"
        flexDirection="column"
      >
        <MobileSplashScreen>
          <Header />
          <Box overflow="auto" flex={1} py={3}>
            <Container fixed maxWidth={GLOBAL_CONTAINER_MAX_WIDTH}>
              <Outlet />
            </Container>
          </Box>
        </MobileSplashScreen>
      </Box>
    </>
  );
};

export default memo(AppLayout);
