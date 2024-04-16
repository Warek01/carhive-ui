import { FC } from 'react'
import { useParams } from 'react-router'

interface Params extends Record<string, string> {
  carId: string
}

const CarDetailsPage: FC = () => {
  const { carId } = useParams<Params>()

  return <div>{carId}</div>
}

export default CarDetailsPage
