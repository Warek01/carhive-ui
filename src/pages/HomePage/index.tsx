import { Button, Grid, Skeleton, Typography } from '@mui/material';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';

import { useAuth, useHttp } from '@faf-cars/hooks';
import { QueryKey } from '@faf-cars/lib/query';
import { AppRoute } from '@faf-cars/lib/routing';

const HomePage: FC = () => {
  const { isAuthorized } = useAuth();
  const http = useHttp();

  const listingsCountQuery = useQuery(
    [QueryKey.ListingCount],
    () => http.listing.count(),
    {
      refetchInterval: 15_000,
      keepPreviousData: true,
    },
  );

  const citiesCountQuery = useQuery([QueryKey.CityCount], () =>
    http.city.count(),
  );

  const countriesCountQuery = useQuery([QueryKey.CountryCount], () =>
    http.country.count(),
  );

  return (
    <Grid container spacing={3} alignItems="center" py={6}>
      <Grid item xs={isAuthorized ? 12 : 9}>
        <Typography variant="h3" display="flex" alignItems="center">
          Browse{' '}
          {listingsCountQuery.data ?? <Skeleton width={48} sx={{ mx: 1 }} />}{' '}
          listings on FAF Cars
        </Typography>
      </Grid>
      {!isAuthorized && (
        <Grid item xs={3}>
          <Button
            sx={{ width: { xs: 160, lg: 220 }, height: { xs: 60, lg: 90 } }}
            size="large"
            variant="outlined"
            component={RouterLink}
            to={AppRoute.Login}
          >
            Sign in
          </Button>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography variant="h4" display="flex" alignItems="center">
          {citiesCountQuery.data ?? <Skeleton width={48} sx={{ mr: 1 }} />}{' '}
          cities across{' '}
          {countriesCountQuery.data ?? <Skeleton width={48} sx={{ mx: 1 }} />}{' '}
          Countries supported
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HomePage;
