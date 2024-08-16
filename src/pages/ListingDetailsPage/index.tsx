import { CircularProgress, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

import { ListingDetails } from '@carhive/components';
import { useHttp, useWatchLoading } from '@carhive/hooks';
import { QueryKey } from '@carhive/lib/query';
import { AppRoute } from '@carhive/lib/routing';
import { ToastId } from '@carhive/lib/toast';

interface Params extends Record<string, string> {
  listingId: string;
}

const ListingDetailsPage: FC = () => {
  const { listingId } = useParams<Params>();
  const http = useHttp();

  const listingDetailsQuery = useQuery(
    [QueryKey.ListingDetails, listingId],
    () => http.listing.find(listingId!),
  );

  useWatchLoading(listingDetailsQuery.isLoading);

  if (listingDetailsQuery.error) {
    const error: unknown = listingDetailsQuery.error;

    if (error instanceof AxiosError && error.response?.status === 404) {
      toast('Listing not found', {
        type: 'error',
        toastId: ToastId.ListingNotFound,
      });
      return <Navigate to={AppRoute.ListingList} />;
    }
  }

  if (listingDetailsQuery.isError) {
    return <Typography>Error loading listing</Typography>;
  }

  if (listingDetailsQuery.data) {
    return <ListingDetails listing={listingDetailsQuery.data} />;
  }

  return <CircularProgress />;
};

export default ListingDetailsPage;
