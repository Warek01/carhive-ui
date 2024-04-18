import * as Yup from 'yup'

import { carTypes, CreateListingDTO } from 'lib/listings'

export const createListingInitialValues: CreateListingDTO = {
  brandName: '',
  model: '',
  price: 0,
  year: new Date(),
  type: 0,
  color: '#ffffff',
  clearance: 0,
  wheelSize: 0,
}

export const createListingValidationSchema = Yup.object().shape({
  brandName: Yup.string().min(1),
  model: Yup.string().min(1),
  price: Yup.number().positive().integer(),
  year: Yup.date(),
  type: Yup.number()
    .positive()
    .max(carTypes.length - 1)
    .integer(),
  color: Yup.string().optional(),
  clearance: Yup.number().integer().positive().optional(),
  wheelSize: Yup.number().positive().optional(),
})
