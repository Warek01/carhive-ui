import type { CarType } from 'lib/car/CarType'
import type { CarColor } from 'lib/car/CarColor'
import type { EngineType } from 'lib/car/EngineType'

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
  brand: Brand
  model: string
  type?: CarType
  engine?: Engine | number
  color?: CarColor
  clearance?: number
  wheelSize?: number
  mileage?: number
  year?: Date
}
