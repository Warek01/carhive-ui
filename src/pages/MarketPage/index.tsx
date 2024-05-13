import { ChangeEvent, FC, useCallback, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Box, Pagination, Stack, Typography } from '@mui/material'
import { useQuery } from 'react-query'

import { ListingsList, CarTypesFilter } from '@/components'
import LocalStorageKey from '@/lib/LocalStorageKey'
import { useHttpService, useWatchLoading } from '@/hooks'
import QueryKey from '@/lib/QueryKey.ts'
import type { PaginationData } from '@/lib/definitions.ts'

const MarketPage: FC = () => {
  const http = useHttpService()

  const [selectedCarTypes, setSelectedCarTypes] = useLocalStorage<number[]>(
    LocalStorageKey.LISTINGS_FILTER,
    [],
  )

  const [paginationData, setPaginationData] = useLocalStorage<PaginationData>(
    LocalStorageKey.LISTINGS_PAGINATION_DATA,
    {
      currentPage: 0,
      totalPages: 1,
      itemsPerPage: 10,
    },
  )

  const listingsListQuery = useQuery(
    [QueryKey.LISTINGS_LIST, paginationData],
    () =>
      http.getListings({
        take: 10,
        page: paginationData.currentPage,
      }),
    {
      initialData: { totalItems: 0, items: [] },
    },
  )

  useWatchLoading(listingsListQuery.isLoading)

  const handlePaginationChange = useCallback(
    (event: ChangeEvent<unknown>, value: number) => {
      setPaginationData((pd) => ({
        ...pd,
        currentPage: value - 1,
      }))
    },
    [],
  )

  useEffect(() => {
    if (!listingsListQuery.data) return

    setPaginationData((pd) => ({
      ...pd,
      totalPages: Math.ceil(
        listingsListQuery.data.totalItems / pd.itemsPerPage,
      ),
    }))
  }, [listingsListQuery.data])

  return (
    <Stack spacing={3}>
      <Typography variant="h3">Categories:</Typography>
      <Box component="section">
        <CarTypesFilter
          onChange={setSelectedCarTypes}
          selected={selectedCarTypes}
        />
      </Box>
      <Typography variant="h3">Deals:</Typography>
      <Box
        component="section"
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={8}
        pb={10}
      >
        <ListingsList items={listingsListQuery.data!.items} />

        {paginationData.totalPages > 1 && (
          <Pagination
            count={paginationData.totalPages}
            size="large"
            page={paginationData.currentPage + 1}
            onChange={handlePaginationChange}
          />
        )}
      </Box>
    </Stack>
  )
}

export default MarketPage
