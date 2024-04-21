import { FC, memo, useEffect, useMemo } from 'react'
import { Theme, ThemeProvider } from '@mui/material/styles'
import { Outlet } from 'react-router'
import { useLocalStorage } from 'usehooks-ts'

import { Header } from '@/components'
import { darkTheme, lightTheme } from '@/lib/themes'
import LocalStorageKey from '@/lib/LocalStorageKey'

const AppLayout: FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage<boolean>(
    LocalStorageKey.THEME,
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  const theme = useMemo<Theme>(() => (isDarkTheme ? darkTheme : lightTheme), [isDarkTheme])

  useEffect(() => {
    isDarkTheme ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }, [isDarkTheme])

  return (
    <ThemeProvider theme={theme}>
      <div className="font-Montserrat min-h-screen bg-stone-200 px-3 py-2 text-2xl dark:bg-stone-800 dark:text-white">
        <Header
          isDarkTheme={isDarkTheme}
          setIsDarkTheme={setIsDarkTheme}
        />
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default memo(AppLayout)
