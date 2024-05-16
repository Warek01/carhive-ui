import { ChangeEvent, FC, useCallback, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from '@mui/material'
import { useQuery } from 'react-query'

import { ListingsList, CarTypesFilter } from '@/components'
import { useHttpService, useWatchLoading } from '@/hooks'
import type { PaginationData } from '@/lib/definitions'
import { LISTING_ORDER_BY_VALUES } from '@/lib/listings'
import LocalStorageKey from '@/lib/local-storage-key'
import QueryKey from '@/lib/query-key'

const MarketPage: FC = () => {
  const http = useHttpService()
  const [orderBy, setOrderBy] = useLocalStorage<string>(
    LocalStorageKey.LISTINGS_ORDER_BY,
    'createdAtDesc',
  )

  const [selectedCarTypes, setSelectedCarTypes] = useLocalStorage<string[]>(
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
    [QueryKey.LISTINGS_LIST, paginationData, orderBy, selectedCarTypes],
    () =>
      http.getListings({
        take: paginationData.itemsPerPage,
        page: paginationData.currentPage,
        order: orderBy,
        carTypes: selectedCarTypes,
      }),
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
      <Box component="section">
        <Grid container spacing={3} py={3}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Order</InputLabel>
              <Select
                value={orderBy}
                label="Order"
                onChange={(e) => setOrderBy(e.target.value)}
              >
                {Object.entries(LISTING_ORDER_BY_VALUES).map(
                  ([value, text]) => (
                    <MenuItem value={value} key={value}>
                      {text}
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Items per page</InputLabel>
              <Select
                value={paginationData.itemsPerPage}
                label="Items per page"
                onChange={(e) =>
                  setPaginationData((p) => ({
                    ...p,
                    itemsPerPage: parseInt(e.target.value as string),
                  }))
                }
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <CarTypesFilter
          onChange={setSelectedCarTypes}
          selected={selectedCarTypes}
        />
      </Box>
      <Box
        component="section"
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={8}
        pb={10}
      >
        <ListingsList
          items={listingsListQuery.data?.items}
          skeletonCount={paginationData.itemsPerPage}
        />

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
