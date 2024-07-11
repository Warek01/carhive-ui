import { Visibility } from '@mui/icons-material';
import { Button, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { FormikProvider, useFormik } from 'formik';
import { FC, memo, useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppTextField } from '@faf-cars/components/inputs';
import { useAuth, useHttp, useLoading } from '@faf-cars/hooks';
import { LoginData } from '@faf-cars/lib/auth';
import { AppRoute } from '@faf-cars/lib/routing';
import { ToastId } from '@faf-cars/lib/toast';

import { loginInitialValues, loginValidationSchema } from './constants';

const LoginForm: FC = () => {
  const httpService = useHttp();
  const { login } = useAuth();
  const { setLoading, unsetLoading } = useLoading();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSubmit = useCallback(async (values: LoginData) => {
    setLoading();

    try {
      const res = await httpService.login({ ...values });
      login(res);
    } catch (err) {
      console.error(err);

      if (err instanceof AxiosError) {
        switch (err.response?.status) {
          case 401:
            toast('Invalid password.', {
              type: 'error',
              toastId: ToastId.Login,
            });
            break;
          case 404:
            toast('User does not exist.', {
              type: 'error',
              toastId: ToastId.Login,
            });
            break;
        }
      } else {
        toast('Error.', { type: 'error', toastId: ToastId.Login });
      }
    }

    unsetLoading();
  }, []);

  const formik = useFormik({
    initialValues: loginInitialValues,
    onSubmit: handleSubmit,
    validationSchema: loginValidationSchema,
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
            Log in
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <AppTextField fullWidth label="Username" name="username" />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            position="relative"
          >
            <AppTextField
              fullWidth
              type={passwordShown ? 'text' : 'password'}
              label="Password"
              name="password"
            />
            <Tooltip title="Show password" enterDelay={1000}>
              <IconButton
                sx={{ position: 'absolute', right: 3 }}
                onMouseDown={() => setPasswordShown(true)}
                onMouseUp={() => setPasswordShown(false)}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          display="flex"
          gap={3}
          justifyContent="center"
          mt={3}
        >
          <Button variant="outlined" type="submit">
            Login
          </Button>
          <Button variant="text" component={RouterLink} to={AppRoute.Register}>
            Create account
          </Button>
        </Grid>
      </Grid>
    </FormikProvider>
  );
};

export default memo(LoginForm);
