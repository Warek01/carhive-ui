import * as Yup from 'yup';

import {
  BODY_STYLES,
  CAR_COLORS,
  CAR_STATUSES,
  CreateListingDto,
  FUEL_TYPES,
} from '@faf-cars/lib/listings';

export const IMAGE_SIZE_LIMIT = 5 * 1024 * 1024;

export const createListingInitialValues: CreateListingDto = {
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
  carStatus: null,
  description: null,
};

export const createListingValidationSchema = Yup.object().shape({
  brandName: Yup.string().required('Brand is required.'),
  modelName: Yup.string().required('Model is required'),
  price: Yup.number().positive('Price must be positive.').integer().nullable(),
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
  countryCode: Yup.string()
    .length(2, 'Country code must be of type XX')
    .nullable(),
  sellAddress: Yup.string().max(255, 'Address is too long').nullable(),
  description: Yup.string().max(5000, 'Description is too long').nullable(),
  images: Yup.array().of(Yup.mixed()),
  carStatus: Yup.number().oneOf(CAR_STATUSES).nullable(),
} as Record<keyof CreateListingDto, any>);
