import * as Yup from 'yup'

import { carTypes, CreateListingDTO } from '@/lib/listings'

export const createListingInitialValues: CreateListingDTO = {
  brandName: '',
  model: '',
  price: null,
  type: null,
  color: '#FFFFFF',
  year: null,
  clearance: null,
  wheelSize: null,
  mileage: null,
  engineType: null,
  engineVolume: null,
  horsepower: null,
}

export const createListingValidationSchema = Yup.object().shape({
  brandName: Yup.string().min(1).required('Brand is required.'),
  model: Yup.string().min(1).required('Model is required'),
  price: Yup.number()
    .positive('Price most be positive.')
    .integer()
    .required('Price is required.'),
  year: Yup.number()
    .positive('Year must be possible')
    .required('Year is required.'),
  engineType: Yup.number()
    .integer()
    .positive()
    .required('Engine type is required'),
  type: Yup.number()
    .positive()
    .max(carTypes.length - 1)
    .integer()
    .required('Car type is required.'),
  color: Yup.string().nullable(),
  clearance: Yup.number()
    .integer()
    .positive('Clearance must be positive.')
    .nullable(),
  wheelSize: Yup.number()
    .integer()
    .positive('Wheel size must be positive.')
    .nullable(),
  engineVolume: Yup.number().min(0, 'Volume must be positive.').nullable(),
  horsepower: Yup.number()
    .integer()
    .positive('Horsepower must be positive.')
    .nullable(),
})
