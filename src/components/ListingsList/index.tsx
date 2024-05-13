import { FC, memo } from 'react'
import { Box, Grid } from '@mui/material'

import { ListingItem } from '@/components'
import { type Listing } from '@/lib/listings'

interface Props {
  items: Listing[]
}

const ListingsList: FC<Props> = ({ items }) => {
  return (
    <Box>
      <Grid spacing={2} container>
        {items.map((car, index) => (
          <Grid xs={4} key={index} item>
            <ListingItem listing={car} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default memo(ListingsList)
