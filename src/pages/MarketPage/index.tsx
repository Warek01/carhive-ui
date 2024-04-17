import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { CarTypesList } from 'components'
import type { CarType } from 'lib/car/CarType'
import { useQueryState } from '../../hooks'

const MarketPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCarTypes, setSelectedCarTypes] = useQueryState<CarType[]>(
    'carTypes',
    [],
  )

  return (
    <div>
      <div>
        <h1>Categories:</h1>
        <CarTypesList
          onChange={setSelectedCarTypes}
          initialSelected={selectedCarTypes}
        />
      </div>
    </div>
  )
}

export default MarketPage
