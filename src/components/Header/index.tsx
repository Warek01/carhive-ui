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
import {
  ChangeEventHandler,
  Dispatch,
  FC,
  SetStateAction,
  memo,
  useCallback,
  useMemo,
} from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useAuth } from '@/hooks'
import AppRoute from '@/lib/routing/app-route'

interface Props {
  isDarkTheme: boolean
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>
}

const Header: FC<Props> = ({ setIsDarkTheme, isDarkTheme }) => {
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
            to={AppRoute.HOME}
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
              to={AppRoute.LISTINGS}
              sx={{ color: 'inherit' }}
            >
              Market
            </Typography>
            <Typography
              component={RouterLink}
              to={AppRoute.NEW_LISTING}
              sx={{ color: 'inherit' }}
            >
              Post a deal
            </Typography>
            <Typography
              component={RouterLink}
              to={AppRoute.ABOUT}
              sx={{ color: 'inherit' }}
            >
              About
            </Typography>
            {isAdmin && (
              <Typography
                component={RouterLink}
                to={AppRoute.ADMIN_DASHBOARD}
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
            <IconButton component={RouterLink} to={AppRoute.PROFILE}>
              <Person fontSize="medium" />
            </IconButton>
          ) : (
            <Typography
              component={RouterLink}
              to={AppRoute.LOGIN}
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
