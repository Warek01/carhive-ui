import { CarType } from 'lib/car/CarType'
import type { Brand, Car, Engine } from 'types/definitions'
import { EngineType } from 'lib/car/EngineType'
import { CarColor } from 'lib/car/CarColor'

const brands: Brand[] = [{ name: 'Toyota' }, { name: 'Honda' }, { name: 'Ford' }, { name: 'BMW' }]

const engines: Engine[] = [
  { model: 'V6', brand: 'Toyota', volume: 3.5, type: EngineType.GAS },
  { model: 'i-VTEC', brand: 'Honda', volume: 2.0, type: EngineType.GAS },
  { model: 'EcoBoost', brand: 'Ford', volume: 2.3, type: EngineType.GAS },
  { model: 'Turbo', brand: 'BMW', volume: 2.0, type: EngineType.GAS },
]

const cars: Car[] = [
  {
    brand: brands[0], // Toyota
    model: 'Camry',
    type: CarType.SEDAN,
    engine: engines[0], // V6
    color: CarColor.BLACK,
    clearance: 150,
    wheelSize: 17,
    mileage: 50000,
    year: new Date(2018, 5, 1),
  },
  {
    brand: brands[1], // Honda
    model: 'CR-V',
    type: CarType.SUV,
    engine: engines[1], // i-VTEC
    color: CarColor.RED,
    clearance: 170,
    wheelSize: 18,
    mileage: 40000,
    year: new Date(2019, 3, 1),
  },
  {
    brand: brands[2], // Ford
    model: 'F-150',
    type: CarType.PICKUP_TRUCK,
    engine: engines[2], // EcoBoost
    color: CarColor.WHITE,
    clearance: 200,
    wheelSize: 20,
    mileage: 60000,
    year: new Date(2017, 8, 1),
  },
  {
    brand: brands[3], // BMW
    model: '3 Series',
    type: CarType.SEDAN,
    engine: engines[3], // Turbo
    color: CarColor.BLUE,
    clearance: 140,
    wheelSize: 19,
    mileage: 30000,
    year: new Date(2020, 1, 1),
  },
  {
    brand: brands[0], // Toyota
    model: 'Rav4',
    type: CarType.SUV,
    engine: engines[0], // V6
    color: CarColor.GREEN,
    clearance: 180,
    wheelSize: 18,
    mileage: 35000,
    year: new Date(2019, 6, 1),
  },
  {
    brand: brands[1], // Honda
    model: 'Civic',
    type: CarType.HATCHBACK,
    engine: engines[1], // i-VTEC
    color: CarColor.SILVER,
    clearance: 140,
    wheelSize: 16,
    mileage: 20000,
    year: new Date(2021, 2, 1),
  },
  {
    brand: brands[2], // Ford
    model: 'Escape',
    type: CarType.SUV,
    engine: engines[2], // EcoBoost
    color: CarColor.ORANGE,
    clearance: 160,
    wheelSize: 17,
    mileage: 45000,
    year: new Date(2018, 10, 1),
  },
  {
    brand: brands[3], // BMW
    model: 'X5',
    type: CarType.SUV,
    engine: engines[3], // Turbo
    color: CarColor.BLACK,
    clearance: 190,
    wheelSize: 19,
    mileage: 25000,
    year: new Date(2020, 5, 1),
  },
  {
    brand: brands[0], // Toyota
    model: 'Prius',
    type: CarType.HATCHBACK,
    engine: engines[0], // V6
    color: CarColor.GREEN,
    clearance: 140,
    wheelSize: 15,
    mileage: 30000,
    year: new Date(2019, 8, 1),
  },
  {
    brand: brands[1], // Honda
    model: 'Accord',
    type: CarType.SEDAN,
    engine: engines[1], // i-VTEC
    color: CarColor.GRAY,
    clearance: 150,
    wheelSize: 17,
    mileage: 40000,
    year: new Date(2018, 11, 1),
  },
  {
    brand: brands[2], // Ford
    model: 'Mustang',
    type: CarType.COUPE,
    engine: engines[2], // EcoBoost
    color: CarColor.YELLOW,
    clearance: 130,
    wheelSize: 18,
    mileage: 20000,
    year: new Date(2020, 7, 1),
  },
  {
    brand: brands[3], // BMW
    model: 'X3',
    type: CarType.SUV,
    engine: engines[3], // Turbo
    color: CarColor.WHITE,
    clearance: 170,
    wheelSize: 19,
    mileage: 35000,
    year: new Date(2019, 5, 1),
  },
  {
    brand: brands[0], // Toyota
    model: 'Highlander',
    type: CarType.SUV,
    engine: engines[0], // V6
    color: CarColor.BLUE,
    clearance: 190,
    wheelSize: 20,
    mileage: 50000,
    year: new Date(2017, 9, 1),
  },
  {
    brand: brands[1], // Honda
    model: 'Pilot',
    type: CarType.SUV,
    engine: engines[1], // i-VTEC
    color: CarColor.SILVER,
    clearance: 200,
    wheelSize: 18,
    mileage: 45000,
    year: new Date(2018, 6, 1),
  },
  {
    brand: brands[2], // Ford
    model: 'Focus',
    type: CarType.HATCHBACK,
    engine: engines[2], // EcoBoost
    color: CarColor.RED,
    clearance: 140,
    wheelSize: 16,
    mileage: 30000,
    year: new Date(2020, 3, 1),
  },
  {
    brand: brands[3], // BMW
    model: '5 Series',
    type: CarType.SEDAN,
    engine: engines[3], // Turbo
    color: CarColor.BLACK,
    clearance: 150,
    wheelSize: 17,
    mileage: 40000,
    year: new Date(2019, 2, 1),
  },
  {
    brand: brands[0], // Toyota
    model: 'Tacoma',
    type: CarType.PICKUP_TRUCK,
    engine: engines[0], // V6
    color: CarColor.ORANGE,
    clearance: 180,
    wheelSize: 18,
    mileage: 60000,
    year: new Date(2017, 7, 1),
  },
  {
    brand: brands[1], // Honda
    model: 'Odyssey',
    type: CarType.MINIVAN,
    engine: engines[1], // i-VTEC
    color: CarColor.PURPLE,
    clearance: 160,
    wheelSize: 17,
    mileage: 35000,
    year: new Date(2018, 4, 1),
  },
]
