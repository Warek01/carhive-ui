import { amber } from '@mui/material/colors'
import { ThemeOptions, createTheme } from '@mui/material/styles'
import _ from 'lodash'

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

export const darkTheme = createTheme(
  _.merge({}, shared, {
    palette: {
      mode: 'dark',
    },
  } as ThemeOptions),
)

export const lightTheme = createTheme(
  _.merge({}, shared, {
    palette: {
      mode: 'light',
    },
  } as ThemeOptions),
)
