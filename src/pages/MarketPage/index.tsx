import { FC, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { CarsList, CarTypesList } from 'components'
import { useQueryState } from 'hooks'
import { __mock__cars } from '__mocks__/cars.mock'
import type { PaginationData } from 'types/definitions'

const MarketPage: FC = () => {
  const [selectedCarTypes, setSelectedCarTypes] = useQueryState<number[]>('carTypes', [])
  const [favoriteCarIds, setFavoriteCarIds] = useLocalStorage('favorite-car-ids', [])

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
    () => __mock__cars.filter((c) => (selectedCarTypes.length ? selectedCarTypes.includes(c.type ?? -1) : true)),
    [selectedCarTypes],
  )

  return (
    <div>
      <section>
        <h1>Categories:</h1>
        <CarTypesList
          onChange={setSelectedCarTypes}
          initialSelected={selectedCarTypes}
        />
      </section>
      <section>
        <h1>Deals:</h1>
        <CarsList
          items={items}
          paginationData={paginationData}
        />
      </section>
    </div>
  )
}

export default MarketPage
