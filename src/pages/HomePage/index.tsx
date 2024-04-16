import { FC } from 'react'
import { Link } from 'react-router-dom'
import { AppRoute } from '../../routing/AppRoute'
import { generatePath } from 'react-router'

const HomePage: FC = () => {
  return (
    <div>
      <Link
        to={generatePath(AppRoute.MARKET_CATEGORY, { categoryId: '123124132' })}
      >
        Category
      </Link>
    </div>
  )
}

export default HomePage
