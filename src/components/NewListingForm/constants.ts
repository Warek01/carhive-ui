import * as Yup from 'yup'

import { carTypes, CreateListingDto } from '@/lib/listings'

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
} as unknown as CreateListingDto

export const createListingValidationSchema = Yup.object().shape({
  brandName: Yup.string().min(1).required('Brand is required.'),
  modelName: Yup.string().min(1).required('Model is required'),
  price: Yup.number()
    .positive('Price most be positive.')
    .integer()
    .required('Price is required.'),
  type: Yup.string().min(1).required('Car type is required.'),
  year: Yup.number().positive('Year must be possible').nullable(),
  engineType: Yup.string().min(1).nullable(),
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
  mileage: Yup.number()
    .integer()
    .positive('Mileage must be positive')
    .nullable(),
} as Record<keyof CreateListingDto, any>)
