import { Clear, Favorite } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { FC, MouseEventHandler, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Navigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

import { useHttp, useWatchLoading } from '@faf-cars/hooks';
import {
  FavoriteListingAction,
  FavoriteListingActionType,
  ListingDto,
} from '@faf-cars/lib/listings';
import { QueryKey } from '@faf-cars/lib/query';
import { AppRoute } from '@faf-cars/lib/routing';
import { ToastId } from '@faf-cars/lib/toast';

interface Params extends Record<string, string> {
  listingId: string;
}

const ListingDetailsPage: FC = () => {
  const { listingId } = useParams<Params>();
  const http = useHttp();
  const queryClient = useQueryClient();

  const listingDetailsQuery = useQuery(
    [QueryKey.ListingDetails, listingId],
    () => http.listing.find(listingId!),
  );

  const favoritesMutation = useMutation(
    (action: FavoriteListingAction) =>
      // TODO: implement favorites
      Promise.resolve(),
    {
      onSuccess: () =>
        Promise.all([
          queryClient.invalidateQueries(QueryKey.ListingDetails),
          queryClient.invalidateQueries(QueryKey.ListingList),
        ]),
    },
  );

  useWatchLoading(listingDetailsQuery.isLoading);

  const listing: ListingDto | undefined = listingDetailsQuery.data;

  const handleFavoritesClick: MouseEventHandler = useCallback(async () => {
    favoritesMutation.mutate({
      type: listing?.isFavorite
        ? FavoriteListingActionType.Remove
        : FavoriteListingActionType.Add,
      listingId,
    });
  }, [listing, listingId]);

  if (listingDetailsQuery.error) {
    const error: unknown = listingDetailsQuery.error;

    if (error instanceof AxiosError && error.response?.status === 404) {
      toast('Listing not found', {
        type: 'error',
        toastId: ToastId.ListingNotFound,
      });
      return <Navigate to={AppRoute.Listings} />;
    }
  }

  return listingDetailsQuery.isLoading ? (
    <Box></Box>
  ) : (
    <Box>
      <Typography variant="body1">{listingId}</Typography>
      <Button
        startIcon={listing?.isFavorite ? <Clear /> : <Favorite />}
        onClick={handleFavoritesClick}
      >
        {listing?.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </Button>
    </Box>
  );
};

export default ListingDetailsPage;
