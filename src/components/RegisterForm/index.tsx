import { Button, Grid, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { useFormik } from 'formik'
import { FC, memo, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormikTextField } from '@/components'
import { useAuth, useHttpService, useLoading } from '@/hooks'
import type { RegisterCredentials } from '@/lib/auth'
import AppRoute from '@/lib/routing/app-route'

import { registerInitialValues, registerValidationSchema } from './constants'

const RegisterForm: FC = () => {
  const { login } = useAuth()
  const { setLoading, unsetLoading } = useLoading()
  const http = useHttpService()

  const handleSubmit = useCallback(
    async (values: RegisterCredentials) => {
      if (values.password !== values.repeatPassword) {
        formik.setFieldError('passwordRepeat', 'Password mismatch')
        return
      }

      setLoading()

      try {
        const res = await http.register({
          email: values.email,
          password: values.password,
          username: values.username,
        })
        login(res)
      } catch (err) {
        console.error(err)

        if (err instanceof AxiosError) {
          switch (err.response?.status) {
            case 401:
              toast('Invalid password.', { type: 'error' })
              break
            case 404:
              toast('User does not exist.', { type: 'error' })
              break
          }
        } else {
          toast('Error.', { type: 'error' })
        }
      }

      unsetLoading()
    },
    [login],
  )

  const formik = useFormik({
    initialValues: registerInitialValues,
    onSubmit: handleSubmit,
    validationSchema: registerValidationSchema,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: true,
  })

  return (
    <Grid container component="form" onSubmit={formik.handleSubmit} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" textAlign="center">
          Register
        </Typography>
      </Grid>
      <Grid item container xs={12} spacing={2}>
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
            type="Email"
            label="Email"
            name="email"
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
        <Grid item xs={12}>
          <FormikTextField
            fullWidth
            formik={formik}
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
  )
}

export default memo(RegisterForm)
