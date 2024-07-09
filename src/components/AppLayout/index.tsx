import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { FC, memo } from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header, MobileSplashScreen } from '@faf-cars/components';
import { useTheme } from '@faf-cars/hooks';
import { GLOBAL_CONTAINER_MAX_WIDTH } from '@faf-cars/lib/themes';
import { useGetToastProps } from '@faf-cars/lib/toast';

const AppLayout: FC = () => {
  const theme = useTheme();
  const toastProps = useGetToastProps();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer {...toastProps} />
      <MobileSplashScreen>
        <Header />
        <Container
          fixed
          maxWidth={GLOBAL_CONTAINER_MAX_WIDTH}
          sx={{ pt: 8, minHeight: '100vh', height: '100vh' }}
        >
          <Outlet />
        </Container>
      </MobileSplashScreen>
    </ThemeProvider>
  );
};

export default memo(AppLayout);
