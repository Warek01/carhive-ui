export interface Listing {
  id: string
  brandName: string
  model: string
  price: number
  type: number
  horsepower?: number
  engineType?: number
  engineVolume?: number
  color?: string
  clearance?: number
  wheelSize?: number
  mileage?: number
  year?: Date
}

export interface CreateListingDTO extends Omit<Listing, 'id'> {}

export const engineTypes: string[] = ['Gas', 'Diesel', 'Hybrid', 'Electric', 'Other']

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
