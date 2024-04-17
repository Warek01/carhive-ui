import type { Brand, Car, Engine } from 'types/definitions'
import { EngineType } from 'lib/car/EngineType'
import { CarColor } from 'lib/car/CarColor'

export const __mock__brands: Brand[] = [{ name: 'Toyota' }, { name: 'Honda' }, { name: 'Ford' }, { name: 'BMW' }]

export const __mock__engines: Engine[] = [
  { model: 'V6', brand: 'Toyota', volume: 3.5, type: EngineType.GAS },
  { model: 'i-VTEC', brand: 'Honda', volume: 2.0, type: EngineType.GAS },
  { model: 'EcoBoost', brand: 'Ford', volume: 2.3, type: EngineType.GAS },
  { model: 'Turbo', brand: 'BMW', volume: 2.0, type: EngineType.GAS },
]

export const __mock__cars: Car[] = [
  {
    id: '1',
    brand: __mock__brands[0], // Toyota
    model: 'Camry',
    price: 10_000,
    type: 0,
    engine: __mock__engines[0], // V6
    color: CarColor.BLACK,
    clearance: 150,
    wheelSize: 17,
    mileage: 50000,
    year: new Date(2018, 5, 1),
  },
  {
    id: '2',
    brand: __mock__brands[1], // Honda
    model: 'CR-V',
    price: 10_000,
    type: 1,
    engine: __mock__engines[1], // i-VTEC
    color: CarColor.RED,
    clearance: 170,
    wheelSize: 18,
    mileage: 40000,
    year: new Date(2019, 3, 1),
  },
  {
    id: '3',
    brand: __mock__brands[2], // Ford
    model: 'F-150',
    price: 10_000,
    type: 0,
    engine: __mock__engines[2], // EcoBoost
    color: CarColor.WHITE,
    clearance: 200,
    wheelSize: 20,
    mileage: 60000,
    year: new Date(2017, 8, 1),
  },
  {
    id: '4',
    brand: __mock__brands[3], // BMW
    model: '3 Series',
    price: 10_000,
    type: 3,
    engine: __mock__engines[3], // Turbo
    color: CarColor.BLUE,
    clearance: 140,
    wheelSize: 19,
    mileage: 30000,
    year: new Date(2020, 1, 1),
  },
  {
    id: '5',
    brand: __mock__brands[0], // Toyota
    model: 'Rav4',
    price: 10_000,
    type: 4,
    engine: __mock__engines[0], // V6
    color: CarColor.GREEN,
    clearance: 180,
    wheelSize: 18,
    mileage: 35000,
    year: new Date(2019, 6, 1),
  },
  {
    id: '6',
    brand: __mock__brands[1], // Honda
    model: 'Civic',
    price: 10_000,
    type: 5,
    engine: __mock__engines[1], // i-VTEC
    color: CarColor.SILVER,
    clearance: 140,
    wheelSize: 16,
    mileage: 20000,
    year: new Date(2021, 2, 1),
  },
  {
    id: '7',
    brand: __mock__brands[2], // Ford
    model: 'Escape',
    price: 10_000,
    type: 5,
    engine: __mock__engines[2], // EcoBoost
    color: CarColor.ORANGE,
    clearance: 160,
    wheelSize: 17,
    mileage: 45000,
    year: new Date(2018, 10, 1),
  },
  {
    id: '8',
    brand: __mock__brands[3], // BMW
    model: 'X5',
    price: 10_000,
    type: 0,
    engine: __mock__engines[3], // Turbo
    color: CarColor.BLACK,
    clearance: 190,
    wheelSize: 19,
    mileage: 25000,
    year: new Date(2020, 5, 1),
  },
  {
    id: '9',
    brand: __mock__brands[0], // Toyota
    model: 'Prius',
    price: 10_000,
    type: 6,
    engine: __mock__engines[0], // V6
    color: CarColor.GREEN,
    clearance: 140,
    wheelSize: 15,
    mileage: 30000,
    year: new Date(2019, 8, 1),
  },
  {
    id: '10',
    brand: __mock__brands[1], // Honda
    model: 'Accord',
    price: 10_000,
    type: 7,
    engine: __mock__engines[1], // i-VTEC
    color: CarColor.GRAY,
    clearance: 150,
    wheelSize: 17,
    mileage: 40000,
    year: new Date(2018, 11, 1),
  },
  {
    id: '11',
    brand: __mock__brands[2], // Ford
    model: 'Mustang',
    price: 10_000,
    type: 2,
    engine: __mock__engines[2], // EcoBoost
    color: CarColor.YELLOW,
    clearance: 130,
    wheelSize: 18,
    mileage: 20000,
    year: new Date(2020, 7, 1),
  },
  {
    id: '12',
    brand: __mock__brands[3], // BMW
    model: 'X3',
    price: 10_000,
    type: 2,
    engine: __mock__engines[3], // Turbo
    color: CarColor.WHITE,
    clearance: 170,
    wheelSize: 19,
    mileage: 35000,
    year: new Date(2019, 5, 1),
  },
  {
    id: '13',
    brand: __mock__brands[0], // Toyota
    model: 'Highlander',
    price: 10_000,
    type: 3,
    engine: __mock__engines[0], // V6
    color: CarColor.BLUE,
    clearance: 190,
    wheelSize: 20,
    mileage: 50000,
    year: new Date(2017, 9, 1),
  },
  {
    id: '14',
    brand: __mock__brands[1], // Honda
    model: 'Pilot',
    price: 10_000,
    type: 4,
    engine: __mock__engines[1], // i-VTEC
    color: CarColor.SILVER,
    clearance: 200,
    wheelSize: 18,
    mileage: 45000,
    year: new Date(2018, 6, 1),
  },
  {
    id: '15',
    brand: __mock__brands[2], // Ford
    model: 'Focus',
    price: 10_000,
    type: 5,
    engine: __mock__engines[2], // EcoBoost
    color: CarColor.RED,
    clearance: 140,
    wheelSize: 16,
    mileage: 30000,
    year: new Date(2020, 3, 1),
  },
  {
    id: '16',
    brand: __mock__brands[3], // BMW
    model: '5 Series',
    price: 10_000,
    type: 6,
    engine: __mock__engines[3], // Turbo
    color: CarColor.BLACK,
    clearance: 150,
    wheelSize: 17,
    mileage: 40000,
    year: new Date(2019, 2, 1),
  },
  {
    id: '17',
    brand: __mock__brands[0], // Toyota
    model: 'Tacoma',
    price: 10_000,
    type: 7,
    engine: __mock__engines[0], // V6
    color: CarColor.ORANGE,
    clearance: 180,
    wheelSize: 18,
    mileage: 60000,
    year: new Date(2017, 7, 1),
  },
  {
    id: '18',
    brand: __mock__brands[1], // Honda
    model: 'Odyssey',
    price: 10_000,
    type: 8,
    engine: __mock__engines[1], // i-VTEC
    color: CarColor.PURPLE,
    clearance: 160,
    wheelSize: 17,
    mileage: 35000,
    year: new Date(2018, 4, 1),
  },
]
