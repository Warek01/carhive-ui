import * as Yup from 'yup'

import { carTypes, CreateListingDTO } from '@/lib/listings'

export const createListingInitialValues: CreateListingDTO = {
  brandName: '',
  model: '',
  price: null,
  type: null,
  color: '#ffffff',
  year: null,
  clearance: null,
  wheelSize: null,
  mileage: null,
  engineType: null,
  engineVolume: null,
  horsepower: null,
}

export const createListingValidationSchema = Yup.object().shape({
  brandName: Yup.string().min(1),
  model: Yup.string().min(1),
  price: Yup.number().positive().integer(),
  year: Yup.number().positive(),
  type: Yup.number()
    .positive()
    .max(carTypes.length - 1)
    .integer(),
  color: Yup.string().nullable(),
  clearance: Yup.number().integer().positive().nullable(),
  wheelSize: Yup.number().integer().positive().nullable(),
  engineType: Yup.number().integer().positive().nullable(),
  engineVolume: Yup.number().min(0).nullable(),
  horsepower: Yup.number().integer().positive().nullable(),
})
