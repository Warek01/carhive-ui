import * as Yup from 'yup';

import {
  BODY_STYLES,
  CAR_BRANDS_TEMP,
  CAR_COLORS,
  CreateListingDto,
  FUEL_TYPES,
} from '@faf-cars/lib/listings';

export const createListingInitialValues = {
  brandName: '',
  modelName: '',
  countryCode: 'DE',
  price: null,
  bodyStyle: null,
  color: null,
  productionYear: null,
  clearance: null,
  wheelSize: null,
  mileage: null,
  fuelType: null,
  engineVolume: null,
  horsepower: null,
  sellAddress: null,
  images: [],
  preview: null,
} as CreateListingDto;

export const createListingValidationSchema = Yup.object().shape({
  brandName: Yup.string().oneOf(CAR_BRANDS_TEMP).required('Brand is required.'),
  modelName: Yup.string().required('Model is required'),
  price: Yup.number().positive('Price most be positive.').integer().nullable(),
  bodyStyle: Yup.number().oneOf(BODY_STYLES).nullable(),
  productionYear: Yup.number().positive('Year must be possible').nullable(),
  fuelType: Yup.number().oneOf(FUEL_TYPES).nullable(),
  color: Yup.number().oneOf(CAR_COLORS).nullable(),
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
  countryCode: Yup.string().length(2).nullable(),
  sellAddress: Yup.string().max(255).nullable(),
} as Record<keyof CreateListingDto, any>);
