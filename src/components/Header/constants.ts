import type { Link } from 'types/definitions'
import { AppRoute } from '../../routing/AppRoute'

export const headerLinks: Link[] = [
  {
    href: AppRoute.MARKET,
    content: 'Market',
  },
  {
    href: AppRoute.NEW_DEAL,
    content: 'Post a deal',
  },
  {
    href: AppRoute.PROFILE,
    content: 'My profile',
  },
]
