import { FC } from 'react'
import { useParams } from 'react-router'

interface Params extends Record<string, string> {
  categoryId: string
}

const MarketCategoryPage: FC = () => {
  const { categoryId } = useParams<Params>()

  return <div>Market category {categoryId}</div>
}

export default MarketCategoryPage
