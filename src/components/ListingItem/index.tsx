import { FC, memo, useCallback, useMemo } from 'react'
import { Button, Card, IconButton, Typography, Link } from '@mui/material'
import dayjs from 'dayjs'
import { Link as RouterLink } from 'react-router-dom'
import { generatePath } from 'react-router'
import { useLocalStorage } from 'usehooks-ts'
import * as icons from '@mui/icons-material'
import { amber } from '@mui/material/colors'

import { AppRoute } from '@/routing/AppRoute'
import { carTypes, Listing } from '@/lib/listings'
import { toggleArrayItem } from '@/lib/utils'

interface Props {
  listing: Listing
}

const ListingItem: FC<Props> = ({ listing }) => {
  const [favoriteCarIds, setFavoriteCarIds] = useLocalStorage<string[]>(
    'favorite-car-ids',
    [],
  )

  const isFavorite = useMemo(
    () => favoriteCarIds.includes(listing.id),
    [favoriteCarIds, listing.id],
  )

  const handleFavoriteToggle = useCallback(() => {
    setFavoriteCarIds((favs) => toggleArrayItem(favs, listing.id))
  }, [favoriteCarIds, isFavorite])

  return (
    <Card sx={{ p: 1 }}>
      <Typography variant="body1">{`${listing.brandName} ${listing.model}`}</Typography>
      <Typography variant="body1">Type: {carTypes[listing.type]}</Typography>
      <Typography variant="body1">
        Year: {dayjs(listing.year).format('DD-MM-YYYY')}
      </Typography>

      {listing.color && (
        <Typography variant="body1" className="flex items-center gap-3">
          Color:{' '}
          <span
            className="inline-block h-5 w-5 rounded-full"
            style={{ backgroundColor: listing.color }}
          ></span>
        </Typography>
      )}

      <p>{listing.price} $</p>

      <Link
        component={RouterLink}
        to={generatePath(AppRoute.LISTING_DETAILS, { listingId: listing.id })}
      >
        <Button variant="outlined">Details</Button>
      </Link>
      <IconButton onClick={handleFavoriteToggle}>
        <icons.Star
          fontSize="medium"
          sx={{ color: isFavorite ? amber[500] : 'default' }}
        />
      </IconButton>
    </Card>
  )
}

export default memo(ListingItem)
