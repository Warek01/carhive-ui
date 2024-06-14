import { Box, Button, Card, Link, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { FC, memo } from 'react'
import { generatePath } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'

import { Image } from '@/components'
import { Listing } from '@/lib/listings'
import AppRoute from '@/lib/routing/app-route'

interface Props {
  listing: Listing
}

const ListingItem: FC<Props> = ({ listing }) => {
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
        <Link
          component={RouterLink}
          to={generatePath(AppRoute.LISTING_DETAILS, { listingId: listing.id })}
        >
          <Image apiFile src={listing.preview} />
        </Link>
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
      </Box>
    </Card>
  )
}

export default memo(ListingItem)
