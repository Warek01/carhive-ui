import AppRoute from '@/lib/app-route'
import type { Link } from '@/lib/definitions'

export const HEADER_LINKS: Link[] = [
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
  {
    href: AppRoute.ADMIN_DASHBOARD,
    content: 'Admin',
  },
]
