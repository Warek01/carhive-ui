import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tab,
  Tabs,
} from '@mui/material'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useLocalStorage, useSessionStorage } from 'usehooks-ts'

import { CarTypesFilter, ListingsList } from '@/components'
import { useHttpService, usePagination, useWatchLoading } from '@/hooks'
import { LISTING_ORDER_BY_VALUES, Listing } from '@/lib/listings'
import { PaginatedResponse } from '@/lib/paginationData'
import QueryKey from '@/lib/query-key'
import StorageKey from '@/lib/storage-key'
import { LISTING_TABS, ListingsTab } from '@/pages/MarketPage/constants'

const MarketPage: FC = () => {
  const http = useHttpService()
  const [orderBy, setOrderBy] = useLocalStorage<string>(
    StorageKey.LISTINGS_ORDER_BY,
    'createdAtDesc',
  )

  const [selectedCarTypes, setSelectedCarTypes] = useLocalStorage<string[]>(
    StorageKey.LISTINGS_FILTER,
    [],
  )

  const [selectedTab, setSelectedTab] = useSessionStorage<ListingsTab>(
    StorageKey.LISTINGS_TAB,
    ListingsTab.ALL,
  )

  const pagination = usePagination(StorageKey.LISTINGS_PAGINATION)

  const fetchListingsFn = useCallback((): Promise<
    PaginatedResponse<Listing>
  > => {
    const params = {
      take: pagination.size,
      page: pagination.page,
      order: orderBy,
      carTypes: selectedCarTypes,
    }

    switch (selectedTab) {
      case ListingsTab.ALL:
        return http.getListings(params)
      case ListingsTab.FAVORITES:
        return http.getFavoriteListings(params)
      case ListingsTab.MY:
        // TODO: implement
        throw new Error('Not implemented')
    }
  }, [selectedTab, pagination, orderBy, selectedCarTypes])

  const listingsListQuery = useQuery(
    [
      QueryKey.LISTINGS_LIST,
      pagination,
      orderBy,
      selectedCarTypes,
      selectedTab,
    ],
    fetchListingsFn,
  )

  const listings = listingsListQuery.data?.items ?? []

  const tabsElements = useMemo(
    () =>
      LISTING_TABS.map(({ text, value, Icon }) => (
        <Tab
          key={value}
          value={value}
          icon={<Icon fontSize="medium" />}
          iconPosition="start"
          label={text}
        />
      )),
    [],
  )

  const orderByElement = useMemo(
    () => (
      <FormControl fullWidth>
        <InputLabel>Order</InputLabel>
        <Select
          value={orderBy}
          size="small"
          label="Order"
          onChange={(e) => setOrderBy(e.target.value)}
        >
          {Object.entries(LISTING_ORDER_BY_VALUES).map(([value, text]) => (
            <MenuItem value={value} key={value}>
              {text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
    [],
  )

  useWatchLoading(listingsListQuery.isLoading)

  useEffect(() => {
    if (!listingsListQuery.data) return

    pagination.setItems(listingsListQuery.data.totalItems)
  }, [listingsListQuery.data])

  useEffect(() => {
    pagination.setPage(0)
  }, [
    selectedCarTypes,
    pagination.count,
    pagination.size,
    orderBy,
    selectedTab,
  ])

  return (
    <Stack spacing={3}>
      <Box component="section">
        <Grid container spacing={3} py={3}>
          <Grid item xs={6}>
            {orderByElement}
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Items per page</InputLabel>
              <Select
                value={pagination.size}
                size="small"
                label="Items per page"
                onChange={(e) => pagination.setSize(e.target.value)}
              >
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
        <Tabs value={selectedTab} onChange={(e, tab) => setSelectedTab(tab)}>
          {tabsElements}
        </Tabs>
      </Box>
      <Box
        component="section"
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={8}
        pb={10}
      >
        <ListingsList items={listings} skeletonCount={pagination.size} />

        {pagination.count > 1 && (
          <Pagination
            count={pagination.count}
            size="large"
            page={pagination.page + 1}
            onChange={(e, page) => pagination.setPage(page - 1)}
          />
        )}
      </Box>
    </Stack>
  )
}

export default MarketPage
