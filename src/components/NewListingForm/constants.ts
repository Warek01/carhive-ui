import * as Yup from 'yup'

import type { CreateListing } from '@faf-cars/lib/listings'

export const createListingInitialValues = {
  brandName: '',
  modelName: '',
  price: null,
  type: '',
  color: '#FFFFFF',
  year: null,
  clearance: null,
  wheelSize: null,
  mileage: null,
  engineType: null,
  engineVolume: null,
  horsepower: null,
  publisherId: null,
} as unknown as CreateListing

export const createListingValidationSchema = Yup.object().shape({
  brandName: Yup.string().min(1).required('Brand is required.'),
  modelName: Yup.string().min(1).required('Model is required'),
  price: Yup.number()
    .positive('Price most be positive.')
    .integer()
    .required('Price is required.'),
  bodyStyle: Yup.number().positive().required('Car type is required.'),
  productionYear: Yup.number().positive('Year must be possible').nullable(),
  engineType: Yup.number().positive(),
  color: Yup.number().positive(),
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
  mileage: Yup.number()
    .integer()
    .positive('Mileage must be positive')
    .nullable(),
  countryCode: Yup.string().length(2).required('Country is required'),
  sellAddress: Yup.string().max(255),
} as Record<keyof CreateListing, any>)
