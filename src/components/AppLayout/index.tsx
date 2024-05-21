import { Container, CssBaseline } from '@mui/material'
import { Theme, ThemeProvider } from '@mui/material/styles'
import { FC, memo, useMemo } from 'react'
import { Outlet } from 'react-router'
import { ToastContainer, ToastContainerProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDarkMode, useLocalStorage } from 'usehooks-ts'

import { Header, MobileSplashScreen } from '@/components'
import LocalStorageKey from '@/lib/local-storage-key'
import { darkTheme, lightTheme } from '@/lib/themes'

const AppLayout: FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage<boolean>(
    LocalStorageKey.THEME,
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  const theme = useMemo<Theme>(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme],
  )

  const toastProps = useMemo<ToastContainerProps>(
    () => ({
      theme: isDarkTheme ? 'dark' : 'colored',
      autoClose: 2000,
      limit: 3,
      position: 'top-right',
      closeOnClick: true,
      closeButton: false,
      draggable: true,
      draggablePercent: 50,
      draggableDirection: 'x',
      stacked: false,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      progressStyle: {
        backgroundColor: theme.palette.primary.main,
      },
      toastStyle: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      },
    }),
    [isDarkTheme, theme],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer {...toastProps} />
      <MobileSplashScreen>
        <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
        <Container
          fixed
          maxWidth="lg"
          sx={{ pt: 8, minHeight: '100vh', height: '100vh' }}
        >
          <Outlet />
        </Container>
      </MobileSplashScreen>
    </ThemeProvider>
  )
}

export default memo(AppLayout)
