import { Breakpoint, ThemeOptions } from '@mui/material';
import { amber, grey } from '@mui/material/colors';

export const APP_THEME_OPTIONS: ThemeOptions = {
  typography: {
    fontFamily: `Montserrat, sans-serif, serif`,
    fontSize: 16,
  },
  palette: {
    primary: {
      main: amber[600],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor:
            theme.palette.mode === 'dark'
              ? `${amber[600]} ${grey[800]}`
              : `${amber[600]} ${grey[300]}`,
        },
      }),
    },
    MuiTextField: {
      defaultProps: {
        autoComplete: 'new-password',
      },
    },
    MuiTooltip: {
      defaultProps: {
        enterDelay: 750,
        enterNextDelay: 750,
        enterTouchDelay: 750,
        leaveDelay: 250,
        leaveTouchDelay: 250,
      },
    },
  },
};

export const GLOBAL_CONTAINER_MAX_WIDTH: Breakpoint = 'xl';
