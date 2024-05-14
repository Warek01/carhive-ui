import { FC, memo, useCallback, useMemo } from 'react'
import {
  Button,
  Card,
  IconButton,
  Typography,
  Link,
  Box,
  Stack,
} from '@mui/material'
import dayjs from 'dayjs'
import { Link as RouterLink } from 'react-router-dom'
import { generatePath } from 'react-router'
import { useLocalStorage } from 'usehooks-ts'
import * as icons from '@mui/icons-material'
import { amber } from '@mui/material/colors'

import { AppRoute } from '@/routing/AppRoute'
import { Listing } from '@/lib/listings'
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
    <Card sx={{ p: 1, overflow: 'hidden' }}>
      {listing.previewFileName && (
        <Box
          sx={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}
        >
          <img
            style={{ position: 'relative', width: '100%', height: '100%' }}
            alt={listing.modelName}
            src={`${import.meta.env.VITE_API_FILE_BASENAME}/${listing.previewFileName}`}
          />
        </Box>
      )}
      <Typography
        variant="body1"
        textOverflow="ellipsis"
        overflow="hidden"
        maxWidth={300}
      >
        {listing.brandName} {listing.modelName}
      </Typography>
      <Typography variant="body1">Type: {listing.type}</Typography>
      <Typography variant="body1">
        Year: {dayjs(listing.year).format('DD-MM-YYYY')}
      </Typography>

      {listing.color && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1">Color: </Typography>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: listing.color,
              borderRadius: 50,
            }}
          ></Box>
        </Stack>
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
