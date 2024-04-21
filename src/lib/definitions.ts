import type { ReactNode } from 'react'

import type { AppRoute } from 'routing/AppRoute'

export interface AppEnv {
  readonly NODE_ENV: 'development' | 'production'
}

export interface Link {
  content: ReactNode
  href?: string | AppRoute
}

export interface PaginationData {
  currentPage: number
  totalPages: number
  itemsPerPage: number
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null
}
