import { Clear, Favorite } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { FC, MouseEventHandler, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Navigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

import { useHttpService, useWatchLoading } from '@/hooks'
import {
  FavoriteListingAction,
  FavoriteListingActionType,
  Listing,
} from '@/lib/listings'
import QueryKey from '@/lib/query-key'
import AppRoute from '@/lib/routing/app-route'
import { ToastId } from '@/lib/toast'

interface Params extends Record<string, string> {
  listingId: string
}

const ListingDetailsPage: FC = () => {
  const { listingId } = useParams<Params>()
  const http = useHttpService()
  const queryClient = useQueryClient()

  const listingDetailsQuery = useQuery(
    [QueryKey.ListingDetails, listingId],
    () => http.getListingDetails(listingId!),
  )

  const favoritesMutation = useMutation(
    (action: FavoriteListingAction) => http.mutateFavoriteListings(action),
    {
      onSuccess: () =>
        Promise.all([
          queryClient.invalidateQueries(QueryKey.ListingDetails),
          queryClient.invalidateQueries(QueryKey.ListingsList),
        ]),
    },
  )

  useWatchLoading(listingDetailsQuery.isLoading)

  const listing: Listing | undefined = listingDetailsQuery.data

  const handleFavoritesClick: MouseEventHandler = useCallback(async () => {
    favoritesMutation.mutate({
      type: listing?.isFavorite
        ? FavoriteListingActionType.Remove
        : FavoriteListingActionType.Add,
      listingId,
    })
  }, [listing, listingId])

  if (listingDetailsQuery.error) {
    const error: unknown = listingDetailsQuery.error
    console.error(error)

    if (error instanceof AxiosError && error.response?.status === 404) {
      toast('Listing not found', {
        type: 'error',
        toastId: ToastId.ListingNotFound,
      })
      return <Navigate to={AppRoute.Listings} />
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
  )
}

export default ListingDetailsPage
