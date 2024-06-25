import { Container, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { FC, memo } from 'react'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Header, MobileSplashScreen } from '@/components'
import { useTheme } from '@/hooks'
import { useGetToastProps } from '@/lib/toast'

const AppLayout: FC = () => {
  const theme = useTheme()
  const toastProps = useGetToastProps()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer {...toastProps} />
      <MobileSplashScreen>
        <Header />
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
