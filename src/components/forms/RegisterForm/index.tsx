import { Button, Grid, Typography } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { AxiosError } from 'axios';
import { FormikProvider, useFormik } from 'formik';
import { FC, memo, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppTextField } from '@faf-cars/components/inputs';
import { useAuth, useHttp, useLoading } from '@faf-cars/hooks';
import { GOOGLE_LOGIN_PROPS, RegisterFormData } from '@faf-cars/lib/auth';
import { AppRoute } from '@faf-cars/lib/routing';
import { ToastId } from '@faf-cars/lib/toast';

import { registerInitialValues, registerValidationSchema } from './constants';

const RegisterForm: FC = () => {
  const { login } = useAuth();
  const { setLoading, unsetLoading } = useLoading();
  const http = useHttp();

  const handleGoogleSubmit = useCallback(
    async (credentials: CredentialResponse) => {
      setLoading();

      try {
        const res = await http.auth.googleRegister(credentials.credential!);
        login(res);
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 409) {
          toast('Google account already registered', {
            type: 'error',
            toastId: ToastId.Register,
          });
        } else {
          toast('Something went wrong', {
            type: 'error',
            toastId: ToastId.Register,
          });
        }
      }

      unsetLoading();
    },
    [],
  );

  const handleSubmit = useCallback(async (values: RegisterFormData) => {
    if (values.password !== values.repeatPassword) {
      formik.setFieldError('passwordRepeat', 'Password mismatch');
      return;
    }

    setLoading();

    try {
      const res = await http.auth.register({
        email: values.email,
        password: values.password,
        username: values.username,
      });
      login(res);
    } catch (err) {
      if (err instanceof AxiosError) {
        switch (err.response?.status) {
          case 401:
            toast('Invalid password', {
              type: 'error',
              toastId: ToastId.Register,
            });
            break;
        }
      } else {
        toast('Error.', { type: 'error', toastId: ToastId.Register });
      }
    }

    unsetLoading();
  }, []);

  const formik = useFormik({
    initialValues: registerInitialValues,
    onSubmit: handleSubmit,
    validationSchema: registerValidationSchema,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: true,
  });

  return (
    <FormikProvider value={formik}>
      <Grid
        container
        component="form"
        onSubmit={formik.handleSubmit}
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography variant="h3" textAlign="center">
            Register
          </Typography>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12}>
            <AppTextField fullWidth label="Username" name="username" />
          </Grid>
          <Grid item xs={12}>
            <AppTextField fullWidth type="Email" label="Email" name="email" />
          </Grid>
          <Grid item xs={12}>
            <AppTextField
              fullWidth
              type="password"
              label="Password"
              name="password"
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextField
              fullWidth
              type="password"
              label="Repeat passwoed"
              name="repeatPassword"
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <GoogleLogin
            {...GOOGLE_LOGIN_PROPS}
            context="signup"
            text="signup_with"
            onSuccess={handleGoogleSubmit}
          />
          <Button variant="outlined" type="submit">
            Register
          </Button>
          <Button variant="text" component={RouterLink} to={AppRoute.Login}>
            Already have an account?
          </Button>
        </Grid>
      </Grid>
    </FormikProvider>
  );
};

export default memo(RegisterForm);
