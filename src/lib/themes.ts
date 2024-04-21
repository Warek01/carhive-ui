import { createTheme, ThemeOptions } from '@mui/material/styles'

const shared: ThemeOptions = {
  typography: {
    fontFamily: `Montserrat, sans-serif, serif`,
    fontSize: 16,
  },
}

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  ...shared,
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  ...shared,
})
