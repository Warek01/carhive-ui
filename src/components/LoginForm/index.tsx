import { Button, Grid, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { useFormik } from 'formik'
import { FC, memo, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormikTextField } from '@faf-cars/components'
import { useAuth, useHttpService, useLoading } from '@faf-cars/hooks'
import { LoginCredentials } from '@faf-cars/lib/auth'
import AppRoute from '@faf-cars/lib/routing/app-route'
import { ToastId } from '@faf-cars/lib/toast'

import { loginInitialValues, loginValidationSchema } from './constants'

const LoginForm: FC = () => {
  const { login } = useAuth()
  const http = useHttpService()
  const { setLoading, unsetLoading } = useLoading()

  const handleSubmit = useCallback(
    async (values: LoginCredentials) => {
      setLoading()

      try {
        const res = await http.login({ ...values })
        login(res)
      } catch (err) {
        console.error(err)

        if (err instanceof AxiosError) {
          switch (err.response?.status) {
            case 401:
              toast('Invalid password.', {
                type: 'error',
                toastId: ToastId.Login,
              })
              break
            case 404:
              toast('User does not exist.', {
                type: 'error',
                toastId: ToastId.Login,
              })
              break
          }
        } else {
          toast('Error.', { type: 'error', toastId: ToastId.Login })
        }
      }

      unsetLoading()
    },
    [login],
  )

  const formik = useFormik({
    initialValues: loginInitialValues,
    onSubmit: handleSubmit,
    validationSchema: loginValidationSchema,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: true,
  })

  return (
    <Grid container component="form" onSubmit={formik.handleSubmit} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" textAlign="center">
          Log in
        </Typography>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12}>
          <FormikTextField
            fullWidth
            formik={formik}
            label="Username"
            name="username"
          />
        </Grid>
        <Grid item xs={12}>
          <FormikTextField
            fullWidth
            formik={formik}
            type="password"
            label="Password"
            name="password"
          />
        </Grid>
      </Grid>

      <Grid item xs={12} display="flex" gap={3} justifyContent="center" mt={3}>
        <Button variant="outlined" type="submit">
          Login
        </Button>
        <Button variant="text" component={RouterLink} to={AppRoute.Register}>
          Create account
        </Button>
      </Grid>
    </Grid>
  )
}

export default memo(LoginForm)
