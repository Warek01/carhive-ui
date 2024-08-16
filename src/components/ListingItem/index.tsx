import { ImageNotSupported } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { FC, memo } from 'react';
import { generatePath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import {
  CAR_COLOR_HEX_MAP,
  CAR_STATUS_NAME_MAP,
  ListingDto,
} from '@carhive/lib/listing';
import { AppRoute } from '@carhive/lib/routing';

interface Props {
  listing: ListingDto;
}

const ListingItem: FC<Props> = ({ listing }) => {
  let title = `${listing.brandName} ${listing.modelName}`;

  if (listing.productionYear) {
    title = `${listing.productionYear} ${title}`;
  }

  return (
    <Box
      component={Card}
      p={2}
      overflow="hidden"
      width="100%"
      height={{ xs: 400, lg: 420 }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap={0.5}
    >
      <Link
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          aspectRatio: '16/9',
        }}
        component={RouterLink}
        to={generatePath(AppRoute.Listing, { listingId: listing.id })}
      >
        {listing.imagesUrls.length ? (
          <img
            style={{
              width: '100%',
              aspectRatio: '16/9',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            title={title}
            alt={title}
            loading="lazy"
            src={import.meta.env.VITE_API_BASENAME + listing.imagesUrls[0]}
          />
        ) : (
          <ImageNotSupported fontSize="large" />
        )}
      </Link>
      <Stack direction="column" spacing={1}>
        <Divider sx={{ my: 1 }} />
        <Typography
          title={title}
          variant="body1"
          textOverflow="ellipsis"
          overflow="hidden"
          maxWidth={300}
        >
          {title}
        </Typography>
        {listing.color !== null && (
          <Stack direction="row" spacing={1} alignItems="center">
            {listing.carStatus !== null && (
              <Chip
                title="Status"
                size="small"
                color="secondary"
                label={CAR_STATUS_NAME_MAP.get(listing.carStatus)}
              />
            )}
            <Box
              title="Color"
              width={30}
              height={22}
              bgcolor={CAR_COLOR_HEX_MAP.get(listing.color)}
              borderRadius={0.75}
            />
          </Stack>
        )}
        <Typography
          title={`${listing.sellAddress}, ${listing.cityName}, ${listing.countryCode}`}
        >
          {listing.cityName}
        </Typography>
        <Typography title="Price">{listing.price} $</Typography>
      </Stack>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Link
          component={RouterLink}
          to={generatePath(AppRoute.Listing, { listingId: listing.id })}
        >
          <Button variant="outlined">Details</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default memo(ListingItem);
