import { Favorite, ShoppingCart, TimeToLeave } from '@mui/icons-material'

import { IconButton } from '@faf-cars/lib/definitions'

export enum ListingsTab {
  All,
  Favorites,
  My,
}

export const LISTING_TABS: IconButton<ListingsTab>[] = [
  {
    Icon: ShoppingCart,
    text: 'All',
    value: ListingsTab.All,
  },
  {
    Icon: Favorite,
    text: 'Favorites',
    value: ListingsTab.Favorites,
  },
  {
    Icon: TimeToLeave,
    text: 'My',
    value: ListingsTab.My,
  },
]
