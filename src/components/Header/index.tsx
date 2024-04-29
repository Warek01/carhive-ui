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
  Box,
  Stack,
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
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexDirection: 'row',
            }}
          >
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
        <Box component="label" sx={{ display: 'flex', alignItems: 'center' }}>
          <Switch checked={isDarkTheme} onChange={handleChange} />
          {icon}
        </Box>
      </Container>
    </AppBar>
  )
}

export default memo(Header)
