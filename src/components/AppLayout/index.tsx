import { FC, memo, useMemo } from 'react'
import { Theme, ThemeProvider } from '@mui/material/styles'
import { Outlet } from 'react-router'
import { useLocalStorage } from 'usehooks-ts'
import { ToastContainer, ToastContainerProps } from 'react-toastify'
import { Container, CssBaseline, Paper } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'

import { Header, MobileSplashScreen } from '@/components'
import { darkTheme, lightTheme } from '@/lib/themes'
import LocalStorageKey from '@/lib/LocalStorageKey'

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
      autoClose: 3000,
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
