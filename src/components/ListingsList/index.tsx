import { FC, memo } from 'react'
import { Grid } from '@mui/material'

import type { PaginationData } from '@/lib/definitions'
import { ListingItem } from '@/components'
import { type Listing } from '@/lib/listings'

interface Props {
  paginationData: PaginationData
  items: Listing[]
}

const ListingsList: FC<Props> = ({ items, paginationData }) => {
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
            <ListingItem listing={car} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default memo(ListingsList)
