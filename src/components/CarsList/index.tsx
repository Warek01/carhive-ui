import { FC, memo } from 'react'
import { Grid } from '@mui/material'

import type { Car, PaginationData } from 'types/definitions'
import { MarketCarItem } from 'components'

interface Props {
  paginationData: PaginationData
  items: Car[]
}

const CarsList: FC<Props> = ({ items, paginationData }) => {
  return (
    <div>
      <Grid
        spacing={2}
        container
      >
        {items.map((car, index) => (
          <Grid
            xs={4}
            key={index}
            item
          >
            <MarketCarItem car={car} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default memo(CarsList)
