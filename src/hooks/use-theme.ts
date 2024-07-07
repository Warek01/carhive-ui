import { Theme } from '@mui/material/styles'
import { useMemo } from 'react'

import { useIsDarkTheme } from '@faf-cars/hooks/index'
import { darkTheme, lightTheme } from '@faf-cars/lib/themes'

export default function useTheme() {
  const [isDarkTheme] = useIsDarkTheme()

  return useMemo<Theme>(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme],
  )
}
