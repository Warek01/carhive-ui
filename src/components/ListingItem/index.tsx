import { FC, memo, useCallback, useMemo } from 'react'
import { Button, Card, IconButton } from '@mui/material'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { generatePath } from 'react-router'
import { useLocalStorage } from 'usehooks-ts'
import * as icons from '@mui/icons-material'

import { AppRoute } from '@/routing/AppRoute'
import { carTypes, Listing } from '@/lib/listings'
import { toggleArrayItem } from '@/lib/utils'

interface Props {
  listing: Listing
}

const ListingItem: FC<Props> = ({ listing }) => {
  const [favoriteCarIds, setFavoriteCarIds] = useLocalStorage<string[]>('favorite-car-ids', [])

  const isFavorite = useMemo(
    () => favoriteCarIds.includes(listing.id),
    [favoriteCarIds, listing.id],
  )

  const handleFavoriteToggle = useCallback(() => {
    setFavoriteCarIds((favs) => toggleArrayItem(favs, listing.id))
  }, [favoriteCarIds, isFavorite])

  return (
    <Card sx={{ p: 1 }}>
      <p>{`${listing.brandName} ${listing.model}`}</p>
      <p>Type: {carTypes[listing.type]}</p>
      <p>Year: {dayjs(listing.year).format('DD-MM-YYYY')}</p>

      {listing.color && (
        <p className="flex items-center gap-3">
          Color:{' '}
          <span
            className="inline-block h-5 w-5 rounded-full"
            style={{ backgroundColor: listing.color }}
          ></span>
        </p>
      )}

      <p>{listing.price} $</p>

      <Link to={generatePath(AppRoute.LISTING_DETAILS, { listingId: listing.id })}>
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

export default memo(ListingItem)
