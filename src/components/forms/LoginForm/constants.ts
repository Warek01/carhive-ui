import * as Yup from 'yup';

import { LoginData } from '@faf-cars/lib/auth';

export const loginInitialValues = {
  password: '',
  username: '',
} as LoginData;

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required.')
    .min(1, 'Username is too short.'),
  password: Yup.string()
    .required('Password is required.')
    .min(1, 'Password is too short.'),
} as Record<keyof LoginData, any>);
