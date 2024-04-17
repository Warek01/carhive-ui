import type { ReactNode } from 'react'

import type { AppRoute } from 'routing/AppRoute'

export interface AppEnv {
  readonly NODE_ENV: 'development' | 'production'
}

export interface Engine {
  model: string
  brand: string
  volume: number
  type: number
  horsepower: number
}

export interface Car {
  id: string
  brandName: string
  model: string
  price: number
  type: number
  engine?: Engine | number
  color?: string
  clearance?: number
  wheelSize?: number
  mileage?: number
  year?: Date
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
