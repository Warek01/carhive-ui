import { Button, Grid, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { FormikProvider, useFormik } from 'formik';
import { FC, memo, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppTextField } from '@faf-cars/components/inputs';
import { useAuth, useHttp, useLoading } from '@faf-cars/hooks';
import { RegisterData } from '@faf-cars/lib/auth';
import { AppRoute } from '@faf-cars/lib/routing';
import { ToastId } from '@faf-cars/lib/toast';

import { registerInitialValues, registerValidationSchema } from './constants';

const RegisterForm: FC = () => {
  const { login } = useAuth();
  const { setLoading, unsetLoading } = useLoading();
  const httpService = useHttp();

  const handleSubmit = useCallback(async (values: RegisterData) => {
    if (values.password !== values.repeatPassword) {
      formik.setFieldError('passwordRepeat', 'Password mismatch');
      return;
    }

    setLoading();

    try {
      const res = await httpService.register({
        email: values.email,
        password: values.password,
        username: values.username,
      });
      login(res);
    } catch (err) {
      console.error(err);

      if (err instanceof AxiosError) {
        switch (err.response?.status) {
          case 401:
            toast('Invalid password.', {
              type: 'error',
              toastId: ToastId.Register,
            });
            break;
          case 404:
            toast('User does not exist.', {
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
