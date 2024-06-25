import { Theme } from '@mui/material/styles'
import { useMemo } from 'react'

import { useIsDarkTheme } from '@/hooks/index'
import { darkTheme, lightTheme } from '@/lib/themes'

export default function useTheme() {
  const [isDarkTheme] = useIsDarkTheme()

  return useMemo<Theme>(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme],
  )
}
