import { Box } from '@mui/material'
import { FC } from 'react'
import { useParams } from 'react-router'

interface Params extends Record<string, string> {
  carId: string
}

const CarDetailsPage: FC = () => {
  const { carId } = useParams<Params>()

  return <Box>{carId}</Box>
}

export default CarDetailsPage
