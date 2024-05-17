import type { FileDto } from '@/lib/definitions'
import { User } from '@/lib/user'

export interface Listing {
  id: string
  brandName: string
  modelName: string
  price: number
  type: string
  horsepower: number | null
  engineType: string | null
  engineVolume: number | null
  color: string | null
  clearance: number | null
  wheelSize: number | null
  mileage: number | null
  year: number | null
  updatedAt: string
  createdAt: string
  deletedAt: string | null
  publisher: User | null
  previewFileName: string | null
}

export interface CreateListingDto {
  brandName: string
  modelName: string
  price: number
  type: string
  horsepower: number | null
  engineType: string | null
  engineVolume: number | null
  color: string | null
  clearance: number | null
  wheelSize: number | null
  mileage: number | null
  year: number | null
  publisherId: string
  previewImage: FileDto
}

export const ENGINE_TYPES: string[] = [
  'Gas',
  'Diesel',
  'Hybrid',
  'Electric',
  'Other',
]

export const CAR_TYPES: string[] = [
  'Sedan',
  'SUV',
  'Crossover',
  'Van',
  'Minivan',
  'Hatchback',
  'Wagon',
  'Coupe',
  'Pickup Truck',
  'Convertible',
  'Other',
]

export const CAR_BRANDS: string[] = [
  'Acura',
  'Alfa Romeo',
  'Audi',
  'Bentley',
  'BMW',
  'Bugatti',
  'Buick',
  'BYD',
  'Cadillac',
  'Chery',
  'Chevrolet',
  'Chrysler',
  'Daihatsu',
  'Dodge',
  'Ferrari',
  'Fiat',
  'Ford',
  'Genesis',
  'Geely',
  'GMC',
  'Honda',
  'Hummer',
  'Hyundai',
  'Infiniti',
  'Jaguar',
  'Jeep',
  'Kia',
  'Koenigsegg',
  'Lada',
  'Lamborghini',
  'Land Rover',
  'Lexus',
  'Lincoln',
  'Lotus',
  'Maserati',
  'Maybach',
  'Mazda',
  'McLaren',
  'Mercedes-Benz',
  'Mini',
  'Mitsubishi',
  'Nissan',
  'Oldsmobile',
  'Pagani',
  'Pontiac',
  'Porsche',
  'Proton',
  'Ram',
  'Rolls-Royce',
  'Saab',
  'Saturn',
  'Smart',
  'Spyker',
  'Subaru',
  'Suzuki',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo',
]

export const LISTING_ORDER_BY_VALUES: Record<string, string> = {
  createdAtDesc: 'New first',
  createdAtAsc: 'Old first',
  priceAsc: 'Cheap first',
  priceDesc: 'Expensive first',
}
