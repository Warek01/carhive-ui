import { Clear, Favorite } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Unstable_Grid2 as Grid,
  Typography,
} from '@mui/material';
import { FC, memo, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Carousel } from '@carhive/components';
import { useHttp } from '@carhive/hooks';
import {
  BODY_STYLE_NAME_MAP,
  CAR_COLOR_HEX_MAP,
  CAR_COLOR_NAME_MAP,
  CAR_DRIVETRAIN_NAME_MAP,
  CAR_STATUS_NAME_MAP,
  CAR_TRANSMISSIONS_NAME_MAP,
  FUEL_TYPE_NAME_MAP,
  ListingDto,
} from '@carhive/lib/listing';
import { QueryKey } from '@carhive/lib/query';

import UserInfo from './UserInfo';

interface Props {
  listing: ListingDto;
}

const ListingDetails: FC<Props> = ({ listing }) => {
  const http = useHttp();
  const queryClient = useQueryClient();

  const favoritesMutation = useMutation(
    () => {
      return listing.isFavorite
        ? http.listing.removeFromFavorites(listing.id)
        : http.listing.addToFavorites(listing.id);
    },
    {
      onSuccess: () =>
        Promise.all([
          queryClient.invalidateQueries(QueryKey.ListingDetails),
          queryClient.invalidateQueries(QueryKey.ListingList),
        ]),
    },
  );

  let title = `${listing.brandName} ${listing.modelName}`;

  if (listing.productionYear) {
    title = `${listing.productionYear} ${title}`;
  }

  const FIELDS = [
    {
      label: 'Year',
      value: listing.productionYear,
    },
    {
      label: 'Brand',
      value: listing.brandName,
    },
    {
      label: 'Model',
      value: listing.modelName,
    },
    {
      label: 'Mileage',
      value: listing.mileage,
    },
    {
      label: 'Horsepower',
      value: listing.horsepower,
    },
    {
      label: 'Clearance',
      value: listing.clearance,
    },
    {
      label: 'Price',
      value: listing.price,
    },
    {
      label: 'Wheel size',
      value: listing.wheelSize,
    },
    {
      label: 'Engine volume',
      value: listing.engineVolume,
    },
    {
      label: 'Body',
      value: BODY_STYLE_NAME_MAP.get(listing.bodyStyle!),
    },
    {
      label: 'Transmission',
      value: CAR_TRANSMISSIONS_NAME_MAP.get(listing.transmission!),
    },
    {
      label: 'Drivetrain',
      value: CAR_DRIVETRAIN_NAME_MAP.get(listing.drivetrain!),
    },
    {
      label: 'Fuel type',
      value: FUEL_TYPE_NAME_MAP.get(listing.fuelType!),
    },
    {
      label: 'Status',
      value: CAR_STATUS_NAME_MAP.get(listing.carStatus!),
    },
    {
      label: 'Color',
      value: listing.color !== null && (
        <>
          {CAR_COLOR_NAME_MAP.get(listing.color!)}
          <Box
            sx={{
              width: 30,
              height: 22,
              bgcolor: CAR_COLOR_HEX_MAP.get(listing.color),
              borderRadius: 0.75,
            }}
          />
        </>
      ),
    },
  ];

  const favoriteButton = useMemo(() => {
    const loading = favoritesMutation.isLoading;
    const favorite = listing.isFavorite;

    return (
      <Button
        disabled={loading}
        startIcon={favorite ? <Clear /> : <Favorite />}
        onClick={() => favoritesMutation.mutate()}
      >
        {favorite ? 'Remove from favorites' : 'Add to favorites'}
      </Button>
    );
  }, [listing.isFavorite, favoritesMutation]);

  return (
    <Grid container spacing={3}>
      <Grid container xs={12} spacing={3} alignItems="flex-start">
        <Grid xs={8}>
          <Carousel images={listing.imagesUrls} />
        </Grid>
        <Grid container spacing={1} xs={4}>
          <Grid xs={12}>
            <Typography variant="h3">{title}</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant="body1">{listing.price} $</Typography>
          </Grid>
          <Grid xs={12}>{favoriteButton}</Grid>
          <Grid xs={12}>
            <UserInfo user={listing.publisher} />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        rowSpacing={{ xs: 1, md: 2 }}
        columnSpacing={{ xs: 1, md: 2, lg: 4 }}
      >
        {FIELDS.map(({ label, value }) => (
          <Grid key={label} xs={12} md={6} lg={4}>
            <Box
              component={Card}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px={2}
              py={1.5}
            >
              <Typography variant="body2">{label}</Typography>
              <Typography
                variant="body2"
                display="flex"
                gap={1}
                alignItems="center"
                color={value ? 'secondary.main' : 'secondary.dark'}
              >
                {value ?? 'Not specified'}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid xs={12}>
        {listing.description ? (
          <Typography>{listing.description}</Typography>
        ) : (
          <Typography color="secondary.dark">No description</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(ListingDetails);
