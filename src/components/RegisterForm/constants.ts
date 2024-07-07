import * as Yup from 'yup'

import type { RegisterCredentials } from '@faf-cars/lib/auth'

export const registerInitialValues = {
  email: '',
  password: '',
  username: '',
  repeatPassword: '',
} as RegisterCredentials

export const registerValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required.')
    .min(1, 'Username is too short.'),
  password: Yup.string()
    .required('Password is required.')
    .min(1, 'Password is too short.'),
  email: Yup.string().email('Not valid email.').min(1, 'Email is too short.'),
  repeatPassword: Yup.string()
    .required('Repeated password is required.')
    .min(1, 'Repeated password is too short.'),
} as Record<keyof RegisterCredentials, any>)
