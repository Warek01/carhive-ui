import { Box } from '@mui/material'
import { FC } from 'react'

import { NewListingForm } from '@/components'

const NewDealPage: FC = () => {
  return (
    <Box pt={10}>
      <NewListingForm />
    </Box>
  )
}

export default NewDealPage
