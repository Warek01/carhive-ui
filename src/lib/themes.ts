import { amber } from '@mui/material/colors'
import { ThemeOptions, createTheme } from '@mui/material/styles'

const shared: ThemeOptions = {
  typography: {
    fontFamily: `Montserrat, sans-serif, serif`,
    fontSize: 16,
  },
  palette: {
    primary: {
      main: amber[600],
    },
  },
  direction: 'ltr',
}

const dark = { ...shared }
dark.palette!.mode = 'dark'

const light = { ...shared }
light.palette!.mode = 'light'

export const darkTheme = createTheme(dark)

export const lightTheme = createTheme(light)
