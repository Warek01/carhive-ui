import { Star } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { amber } from '@mui/material/colors'
import dayjs from 'dayjs'
import { FC, memo, useCallback, useMemo } from 'react'
import { generatePath } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

import { Image } from '@/components'
import { Listing } from '@/lib/listings'
import AppRoute from '@/lib/routing/app-route'
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
    <Card
      component="div"
      sx={{
        p: 2,
        overflow: 'hidden',
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
      }}
    >
      <Box mb={2}>
        <Image
          src={`${import.meta.env.VITE_API_FILE_BASENAME}/${listing.previewFileName}`}
        />
      </Box>
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

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Link
          component={RouterLink}
          to={generatePath(AppRoute.LISTING_DETAILS, { listingId: listing.id })}
        >
          <Button variant="outlined">Details</Button>
        </Link>
        <IconButton onClick={handleFavoriteToggle}>
          <Star
            fontSize="medium"
            sx={{ color: isFavorite ? amber[500] : 'default' }}
          />
        </IconButton>
      </Box>
    </Card>
  )
}

export default memo(ListingItem)
