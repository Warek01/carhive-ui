import { Favorite, ShoppingCart, TimeToLeave } from '@mui/icons-material'

import { IconButton } from '@/lib/definitions'

export enum ListingsTab {
  ALL,
  FAVORITES,
  MY,
}

export const LISTING_TABS: IconButton<ListingsTab>[] = [
  {
    Icon: ShoppingCart,
    text: 'All',
    value: ListingsTab.ALL,
  },
  {
    Icon: Favorite,
    text: 'Favorites',
    value: ListingsTab.FAVORITES,
  },
  {
    Icon: TimeToLeave,
    text: 'My',
    value: ListingsTab.MY,
  },
]
