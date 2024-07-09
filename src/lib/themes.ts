import { Breakpoint } from '@mui/material';
import { amber } from '@mui/material/colors';
import { ThemeOptions, createTheme } from '@mui/material/styles';

const SHARED: ThemeOptions = {
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
};

const dark = structuredClone(SHARED);
dark.palette!.mode = 'dark';
export const DARK_THEME = createTheme(dark);

const light = structuredClone(SHARED);
light.palette!.mode = 'light';
export const LIGHT_THEME = createTheme(light);

export const GLOBAL_CONTAINER_MAX_WIDTH: Breakpoint = 'xl';
