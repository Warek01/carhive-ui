import { FC, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { ListingsList, CarTypesFilter } from '@/components'
import { useQueryState } from '@/lib/hooks'
import type { PaginationData } from '@/lib/definitions'
import LocalStorageKey from '@/lib/LocalStorageKey'
import { Listing } from '@/lib/listings'
import { Box, Container, Typography } from '@mui/material'

const MarketPage: FC = () => {
  const [selectedCarTypes, setSelectedCarTypes] = useQueryState<number[]>(
    'carTypes',
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
  const [currentPage, setCurrentPage] = useQueryState<number>('page', 0)
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
    <Container>
      <Box component="section">
        <Typography variant="h3">Categories:</Typography>
        <CarTypesFilter
          onChange={setSelectedCarTypes}
          initialSelected={selectedCarTypes}
        />
      </Box>
      <Box component="section">
        <Typography variant="h3">Deals:</Typography>
        <ListingsList items={items} paginationData={paginationData} />
      </Box>
    </Container>
  )
}

export default MarketPage
