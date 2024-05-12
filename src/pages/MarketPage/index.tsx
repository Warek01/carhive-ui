import { FC } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Box, Typography } from '@mui/material'

import { ListingsList, CarTypesFilter } from '@/components'
import type { PaginationData } from '@/lib/definitions'
import LocalStorageKey from '@/lib/LocalStorageKey'
import { Listing } from '@/lib/listings'
import { useHttpService, useLoading } from '@/hooks'
import { useQuery } from 'react-query'
import QueryKey from '@/lib/QueryKey.ts'

const MarketPage: FC = () => {
  const http = useHttpService()

  const [selectedCarTypes, setSelectedCarTypes] = useLocalStorage<number[]>(
    LocalStorageKey.LISTINGS_FILTER,
    [],
  )

  const listingsListQuery = useQuery(QueryKey.LISTINGS_LIST, () =>
    http.getListings(),
  )

  useLoading(listingsListQuery.isLoading)

  return (
    <Box>
      <Box component="section">
        <Typography variant="h3">Categories:</Typography>
        <CarTypesFilter
          onChange={setSelectedCarTypes}
          selected={selectedCarTypes}
        />
      </Box>
      <Box component="section">
        {listingsListQuery.isLoading ? (
          <Typography variant="h3">Loading</Typography>
        ) : (
          <>
            <Typography variant="h3">Deals:</Typography>
            <ListingsList items={listingsListQuery.data?.items ?? []} />
          </>
        )}
      </Box>
    </Box>
  )
}

export default MarketPage
