import * as Yup from 'yup';

import { LoginFormData } from '@carhive/lib/auth';

export const loginInitialValues = {
  password: '',
  username: '',
} as LoginFormData;

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required.')
    .min(1, 'Username is too short.'),
  password: Yup.string()
    .required('Password is required.')
    .min(1, 'Password is too short.'),
} as Record<keyof LoginFormData, any>);
