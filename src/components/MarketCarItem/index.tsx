import { FC, memo, useCallback, useMemo } from 'react'
import { Button, Card, IconButton } from '@mui/material'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { generatePath } from 'react-router'
import { useLocalStorage } from 'usehooks-ts'
import * as icons from '@mui/icons-material'

import type { Car } from 'types/definitions'
import { AppRoute } from 'routing/AppRoute'
import { carTypes } from 'lib/car'
import { toggleArrayItem } from 'utils'

interface Props {
  car: Car
}

const MarketCarItem: FC<Props> = ({ car }) => {
  const [favoriteCarIds, setFavoriteCarIds] = useLocalStorage<string[]>('favorite-car-ids', [])

  const isFavorite = useMemo(() => favoriteCarIds.includes(car.id), [favoriteCarIds, car.id])

  const handleFavoriteToggle = useCallback(() => {
    setFavoriteCarIds((favs) => toggleArrayItem(favs, car.id))
  }, [favoriteCarIds, isFavorite])

  return (
    <Card sx={{ p: 1 }}>
      <p>{`${car.brandName} ${car.model}`}</p>
      <p>Type: {carTypes[car.type]}</p>
      <p>Year: {dayjs(car.year).format('DD-MM-YYYY')}</p>

      {car.color && (
        <p className="flex items-center gap-3">
          Color:{' '}
          <span
            className="inline-block h-5 w-5 rounded-full"
            style={{ backgroundColor: car.color }}
          ></span>
        </p>
      )}

      <p>{car.price} $</p>

      <Link to={generatePath(AppRoute.CAR_DETAILS, { carId: car.id })}>
        <Button variant="outlined">Details</Button>
      </Link>
      <IconButton onClick={handleFavoriteToggle}>
        <icons.Star
          fontSize="medium"
          color={isFavorite ? 'warning' : 'primary'}
        />
      </IconButton>
    </Card>
  )
}

export default memo(MarketCarItem)
