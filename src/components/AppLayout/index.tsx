import { FC, memo, useMemo } from 'react'
import { Theme, ThemeProvider } from '@mui/material/styles'
import { Outlet } from 'react-router'
import { useLocalStorage } from 'usehooks-ts'

import { Header } from '@/components'
import { darkTheme, lightTheme } from '@/lib/themes'
import LocalStorageKey from '@/lib/LocalStorageKey'
import { Container, CssBaseline } from '@mui/material'

const AppLayout: FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage<boolean>(
    LocalStorageKey.THEME,
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  const theme = useMemo<Theme>(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
      <Container fixed maxWidth="lg" sx={{ mt: 8 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default memo(AppLayout)
