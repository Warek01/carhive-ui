import {
  ChangeEventHandler,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react'
import * as icons from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Container,
  Switch,
  Typography,
  SvgIconProps,
  Stack,
  IconButton,
} from '@mui/material'

import { AppRoute } from 'routing/AppRoute'
import { headerLinks } from './constants'

interface Props {
  isDarkTheme: boolean
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>
}

const Header: FC<Props> = ({ setIsDarkTheme, isDarkTheme }) => {
  const iconProps = useMemo<SvgIconProps>(
    () => ({
      width: 32,
      height: 32,
    }),
    [],
  )

  const icon = useMemo(
    () =>
      isDarkTheme ? (
        <icons.DarkMode {...iconProps} />
      ) : (
        <icons.LightMode {...iconProps} />
      ),
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
            <icons.TimeToLeave sx={{ width: 32, height: 32 }} />
            FAF cars
          </Typography>
          <Stack alignItems="center" direction="row" spacing={4} pl={4}>
            {headerLinks.map(({ content, href }, index) => (
              <Typography
                component={RouterLink}
                key={index}
                to={href ?? '#'}
                sx={{ color: 'inherit' }}
              >
                {content}
              </Typography>
            ))}
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
          <IconButton component={RouterLink} to={AppRoute.PROFILE}>
            <icons.Person fontSize="medium" />
          </IconButton>
        </Stack>
      </Container>
    </AppBar>
  )
}

export default memo(Header)
