import type { Nullable, User } from '@/lib/definitions'

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
  previewUrl: string | null
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
}

export const engineTypes: string[] = [
  'Gas',
  'Diesel',
  'Hybrid',
  'Electric',
  'Other',
]

export const carTypes: string[] = [
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

export const carBrands: string[] = [
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
