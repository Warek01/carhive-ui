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
  components: {
    MuiInputBase: {
      defaultProps: {
        autoComplete: 'new-password',
        inputProps: {
          autoComplete: 'new-password',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        autoComplete: 'new-password',
        inputProps: {
          autoComplete: 'new-password',
        },
      },
    },
  },
}

const dark = structuredClone(shared)
dark.palette!.mode = 'dark'

const light = structuredClone(shared)
light.palette!.mode = 'light'

export const darkTheme = createTheme(dark)

export const lightTheme = createTheme(light)
