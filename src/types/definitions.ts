import type { ReactNode } from 'react'

import type { CarColor } from 'lib/car/CarColor'
import type { EngineType } from 'lib/car/EngineType'
import type { AppRoute } from 'routing/AppRoute'

export interface AppEnv {
  readonly NODE_ENV: 'development' | 'production'
}

export interface Brand {
  name: string
}

export interface Engine {
  model: string
  brand: string
  volume: number
  type: EngineType
}

export interface Car {
  id: string
  brand: Brand
  model: string
  price: number
  type: number
  engine?: Engine | number
  color?: CarColor
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
