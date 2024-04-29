import { FC, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Box, Typography } from '@mui/material'

import { ListingsList, CarTypesFilter } from '@/components'
import type { PaginationData } from '@/lib/definitions'
import LocalStorageKey from '@/lib/LocalStorageKey'
import { Listing } from '@/lib/listings'

const MarketPage: FC = () => {
  const [selectedCarTypes, setSelectedCarTypes] = useLocalStorage<number[]>(
    LocalStorageKey.LISTINGS_FILTER,
    [],
  )
  const [favoriteListings, setFavoriteListings] = useLocalStorage<number[]>(
    LocalStorageKey.FAVORITE_LISTINGS,
    [],
  )
  const [listings, setListings] = useLocalStorage<Listing[]>(
    LocalStorageKey.LISTINGS,
    [],
  )

  // Implement pagination later
  const totalPages = 10
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useLocalStorage<number>(
    LocalStorageKey.MARKET_PAGE,
    0,
  )
  const paginationData = useMemo<PaginationData>(
    () => ({
      currentPage,
      itemsPerPage,
      totalPages,
    }),
    [currentPage],
  )

  const items = useMemo(
    () =>
      listings.filter((c) =>
        selectedCarTypes.length
          ? selectedCarTypes.includes(c.type ?? -1)
          : true,
      ),
    [selectedCarTypes],
  )

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
        <Typography variant="h3">Deals:</Typography>
        <ListingsList items={items} paginationData={paginationData} />
      </Box>
    </Box>
  )
}

export default MarketPage
