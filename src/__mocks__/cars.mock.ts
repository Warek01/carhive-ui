import type { Car, Engine } from 'types/definitions'

export const __mock__engines: Engine[] = [
  { model: 'V6', brand: 'Toyota', volume: 3.5, type: 1, horsepower: 255 },
  { model: 'i-VTEC', brand: 'Honda', volume: 2.0, type: 1, horsepower: 110 },
  { model: 'EcoBoost', brand: 'Ford', volume: 2.3, type: 2, horsepower: 125 },
  { model: 'Turbo', brand: 'BMW', volume: 2.0, type: 3, horsepower: 200 },
]

export const __mock__cars: Car[] = [
  {
    id: '1',
    brandName: 'Toyota',
    model: 'Camry',
    price: 10_000,
    type: 0,
    engine: __mock__engines[0], // V6
    color: '#000000',
    clearance: 150,
    wheelSize: 17,
    mileage: 50000,
    year: new Date(2018, 5, 1),
  },
  {
    id: '2',
    brandName: 'Honda',
    model: 'CR-V',
    price: 10_000,
    type: 1,
    engine: __mock__engines[1], // i-VTEC
    color: '#FF0000',
    clearance: 170,
    wheelSize: 18,
    mileage: 40000,
    year: new Date(2019, 3, 1),
  },
  {
    id: '3',
    brandName: 'Ford',
    model: 'F-150',
    price: 10_000,
    type: 0,
    engine: __mock__engines[2], // EcoBoost
    color: '#FF0000',
    clearance: 200,
    wheelSize: 20,
    mileage: 60000,
    year: new Date(2017, 8, 1),
  },
  {
    id: '4',
    brandName: 'BMW',
    model: '3 Series',
    price: 10_000,
    type: 3,
    engine: __mock__engines[3], // Turbo
    color: '#FF0000',
    clearance: 140,
    wheelSize: 19,
    mileage: 30000,
    year: new Date(2020, 1, 1),
  },
  {
    id: '5',
    brandName: 'Toyota',
    model: 'Rav4',
    price: 10_000,
    type: 4,
    engine: __mock__engines[0], // V6
    color: '#FF0000',
    clearance: 180,
    wheelSize: 18,
    mileage: 35000,
    year: new Date(2019, 6, 1),
  },
  {
    id: '6',
    brandName: 'Honda',
    model: 'Civic',
    price: 10_000,
    type: 5,
    engine: __mock__engines[1], // i-VTEC
    color: '#FF0000',
    clearance: 140,
    wheelSize: 16,
    mileage: 20000,
    year: new Date(2021, 2, 1),
  },
  {
    id: '7',
    brandName: 'Ford',
    model: 'Escape',
    price: 10_000,
    type: 5,
    engine: __mock__engines[2], // EcoBoost
    color: '#FF0000',
    clearance: 160,
    wheelSize: 17,
    mileage: 45000,
    year: new Date(2018, 10, 1),
  },
  {
    id: '8',
    brandName: 'BMW',
    model: 'X5',
    price: 10_000,
    type: 0,
    engine: __mock__engines[3], // Turbo
    color: '#FF0000',
    clearance: 190,
    wheelSize: 19,
    mileage: 25000,
    year: new Date(2020, 5, 1),
  },
  {
    id: '9',
    brandName: 'Toyota',
    model: 'Prius',
    price: 10_000,
    type: 6,
    engine: __mock__engines[0], // V6
    color: '#FF0000',
    clearance: 140,
    wheelSize: 15,
    mileage: 30000,
    year: new Date(2019, 8, 1),
  },
  {
    id: '10',
    brandName: 'Honda',
    model: 'Accord',
    price: 10_000,
    type: 7,
    engine: __mock__engines[1], // i-VTEC
    color: '#FF0000',
    clearance: 150,
    wheelSize: 17,
    mileage: 40000,
    year: new Date(2018, 11, 1),
  },
  {
    id: '11',
    brandName: 'Ford',
    model: 'Mustang',
    price: 10_000,
    type: 2,
    engine: __mock__engines[2], // EcoBoost
    color: '#FF0000',
    clearance: 130,
    wheelSize: 18,
    mileage: 20000,
    year: new Date(2020, 7, 1),
  },
  {
    id: '12',
    brandName: 'BMW',
    model: 'X3',
    price: 10_000,
    type: 2,
    engine: __mock__engines[3], // Turbo
    color: '#FF0000',
    clearance: 170,
    wheelSize: 19,
    mileage: 35000,
    year: new Date(2019, 5, 1),
  },
  {
    id: '13',
    brandName: 'Toyota',
    model: 'Highlander',
    price: 10_000,
    type: 3,
    engine: __mock__engines[0], // V6
    color: '#FF0000',
    clearance: 190,
    wheelSize: 20,
    mileage: 50000,
    year: new Date(2017, 9, 1),
  },
  {
    id: '14',
    brandName: 'Honda',
    model: 'Pilot',
    price: 10_000,
    type: 4,
    engine: __mock__engines[1], // i-VTEC
    color:'#FF0000',
    clearance: 200,
    wheelSize: 18,
    mileage: 45000,
    year: new Date(2018, 6, 1),
  },
  {
    id: '15',
    brandName: 'Ford',
    model: 'Focus',
    price: 10_000,
    type: 5,
    engine: __mock__engines[2], // EcoBoost
    color: '#FF0000',
    clearance: 140,
    wheelSize: 16,
    mileage: 30000,
    year: new Date(2020, 3, 1),
  },
  {
    id: '16',
    brandName: 'BMW',
    model: '5 Series',
    price: 10_000,
    type: 6,
    engine: __mock__engines[3], // Turbo
    color: '#FF0000',
    clearance: 150,
    wheelSize: 17,
    mileage: 40000,
    year: new Date(2019, 2, 1),
  },
  {
    id: '17',
    brandName: 'Toyota',
    model: 'Tacoma',
    price: 10_000,
    type: 7,
    engine: __mock__engines[0], // V6
    color: '#FF0000',
    clearance: 180,
    wheelSize: 18,
    mileage: 60000,
    year: new Date(2017, 7, 1),
  },
  {
    id: '18',
    brandName: 'Honda',
    model: 'Odyssey',
    price: 10_000,
    type: 8,
    engine: __mock__engines[1], // i-VTEC
    color: '#FF0000',
    clearance: 160,
    wheelSize: 17,
    mileage: 35000,
    year: new Date(2018, 4, 1),
  },
]
