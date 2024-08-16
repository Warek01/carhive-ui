import { DarkMode, LightMode, Person, TimeToLeave } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  SvgIconProps,
  Switch,
  Typography,
} from '@mui/material';
import {
  ChangeEventHandler,
  FC,
  memo,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { ThemeContext } from '@faf-cars/contexts/theme';
import { useAuth } from '@faf-cars/hooks';
import { AppRoute } from '@faf-cars/lib/routing';
import { GLOBAL_CONTAINER_MAX_WIDTH } from '@faf-cars/lib/themes';

const Header: FC = () => {
  const { isAuthorized, isAdmin } = useAuth();
  const { setThemeMode, themeMode } = useContext(ThemeContext);

  const iconProps = useMemo<SvgIconProps>(
    () => ({
      width: 32,
      height: 32,
    }),
    [],
  );

  const icon = useMemo(
    () =>
      themeMode === 'dark' ? (
        <DarkMode {...iconProps} />
      ) : (
        <LightMode {...iconProps} />
      ),
    [themeMode],
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const isDark = event.target.checked;
      setThemeMode(isDark ? 'dark' : 'light');
    },
    [],
  );

  return (
    <>
      <Box height={64} />
      <AppBar>
        <Container
          fixed
          maxWidth={GLOBAL_CONTAINER_MAX_WIDTH}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            height: 64,
          }}
        >
          <Stack direction="row" gap={3}>
            <Typography
              component={RouterLink}
              variant="h6"
              to={AppRoute.Home}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'center',
                color: 'inherit',
              }}
            >
              <TimeToLeave sx={{ width: 32, height: 32 }} />
              FAF cars
            </Typography>
            <Stack alignItems="center" direction="row" spacing={4} pl={4}>
              <Typography
                component={RouterLink}
                to={AppRoute.ListingList}
                sx={{ color: 'inherit' }}
              >
                Market
              </Typography>
              <Typography
                component={RouterLink}
                to={AppRoute.NewListing}
                sx={{ color: 'inherit' }}
              >
                Post a deal
              </Typography>
              <Typography
                component={RouterLink}
                to={AppRoute.About}
                sx={{ color: 'inherit' }}
              >
                About
              </Typography>
              {isAdmin && (
                <Typography
                  component={RouterLink}
                  to={AppRoute.AdminDashboard}
                  sx={{ color: 'inherit' }}
                >
                  Dashboard
                </Typography>
              )}
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack
              component="label"
              direction="row"
              spacing={0}
              alignItems="center"
            >
              <Switch checked={themeMode === 'dark'} onChange={handleChange} />
              {icon}
            </Stack>
            {isAuthorized ? (
              <IconButton component={RouterLink} to={AppRoute.Profile}>
                <Person fontSize="medium" />
              </IconButton>
            ) : (
              <Typography
                component={RouterLink}
                to={AppRoute.Login}
                sx={{ color: 'inherit' }}
              >
                Sign in
              </Typography>
            )}
          </Stack>
        </Container>
      </AppBar>
    </>
  );
};

export default memo(Header);
