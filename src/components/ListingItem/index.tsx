import { Box, Button, Card, Link, Stack, Typography } from '@mui/material'
import { FC, memo } from 'react'
import { generatePath } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'

import { Image } from '@faf-cars/components'
import {
  BODY_STYLE_STRING_MAP,
  CAR_COLOR_HEX_MAP,
  CAR_COLOR_NAME_MAP,
  Listing,
} from '@faf-cars/lib/listings'
import { AppRoute } from '@faf-cars/lib/routing/app-route'

interface Props {
  listing: Listing
  lazy: boolean
}

const ListingItem: FC<Props> = ({ listing, lazy }) => {
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
          to={generatePath(AppRoute.ListingDetails, { listingId: listing.id })}
        >
          <Image
            alt="Listing"
            src={import.meta.env.VITE_API_BASENAME + listing.previewUrl}
            lazy={lazy}
            aspectRatio="16/9"
            objectFit="cover"
            objectPosition="center"
          />
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
      <Typography variant="body1">
        {BODY_STYLE_STRING_MAP.get(listing.bodyStyle)}
      </Typography>
      <Typography variant="body1">{listing.productionYear}</Typography>

      {listing.color !== null && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1">
            {CAR_COLOR_NAME_MAP.get(listing.color)}
          </Typography>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: CAR_COLOR_HEX_MAP.get(listing.color),
              borderRadius: 50,
            }}
          ></Box>
        </Stack>
      )}

      <p>{listing.price} $</p>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Link
          component={RouterLink}
          to={generatePath(AppRoute.ListingDetails, { listingId: listing.id })}
        >
          <Button variant="outlined">Details</Button>
        </Link>
      </Box>
    </Card>
  )
}

export default memo(ListingItem)
