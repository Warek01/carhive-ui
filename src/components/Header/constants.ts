import type { Link } from '@/lib/definitions'
import { AppRoute } from '@/routing/AppRoute'

export const headerLinks: Link[] = [
  {
    href: AppRoute.LISTINGS,
    content: 'Market',
  },
  {
    href: AppRoute.NEW_LISTING,
    content: 'Post a deal',
  },
  {
    href: AppRoute.LOGIN,
    content: 'Login',
  },
  {
    href: AppRoute.REGISTER,
    content: 'Register',
  },
]
