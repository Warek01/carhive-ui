import { ChangeEventHandler, Dispatch, FC, memo, SetStateAction, useCallback, useEffect, useMemo } from 'react'
import Switch from '@mui/material/Switch'
import * as icons from '@mui/icons-material'
import { Link } from 'react-router-dom'

import { AppRoute } from 'routing/AppRoute'
import { headerLinks } from './constants'

interface Props {
  isDarkTheme: boolean
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>
}

const Header: FC<Props> = ({ setIsDarkTheme, isDarkTheme }) => {
  const icon = useMemo(
    () =>
      isDarkTheme ? (
        <icons.DarkMode
          width={32}
          height={32}
        />
      ) : (
        <icons.LightMode
          width={32}
          height={32}
        />
      ),
    [isDarkTheme],
  )

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => setIsDarkTheme(event.target.checked),
    [setIsDarkTheme],
  )

  return (
    <header className="flex flex-row justify-between border-b border-b-black px-12">
      <Link
        to={AppRoute.HOME}
        className="custom flex gap-3"
      >
        <icons.TimeToLeave fontSize="large" />
        <h3>FAF cars</h3>
      </Link>
      <nav className="flex gap-4">
        {headerLinks.map(({ content, href }, index) => (
          <Link
            key={index}
            to={href ?? '#'}
          >
            {content}
          </Link>
        ))}
      </nav>
      <label>
        <Switch
          checked={isDarkTheme}
          onChange={handleChange}
        />
        {icon}
      </label>
    </header>
  )
}

export default memo(Header)
