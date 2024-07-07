import { DarkMode, LightMode, Person, TimeToLeave } from '@mui/icons-material'
import {
  AppBar,
  Container,
  IconButton,
  Stack,
  SvgIconProps,
  Switch,
  Typography,
} from '@mui/material'
import { ChangeEventHandler, FC, memo, useCallback, useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useAuth, useIsDarkTheme } from '@faf-cars/hooks'
import AppRoute from '@faf-cars/lib/routing/app-route'

const Header: FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useIsDarkTheme()
  const { isAuthorized, isAdmin } = useAuth()

  const iconProps = useMemo<SvgIconProps>(
    () => ({
      width: 32,
      height: 32,
    }),
    [],
  )

  const icon = useMemo(
    () =>
      isDarkTheme ? <DarkMode {...iconProps} /> : <LightMode {...iconProps} />,
    [isDarkTheme],
  )

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setIsDarkTheme(event.target.checked),
    [],
  )

  return (
    <AppBar>
      <Container
        fixed
        maxWidth="lg"
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
              to={AppRoute.Listings}
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
            <Switch checked={isDarkTheme} onChange={handleChange} />
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
  )
}

export default memo(Header)
