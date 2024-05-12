import { FC, memo, useCallback, useContext } from 'react'
import { useFormik } from 'formik'
import {
  TextField,
  FormControl,
  Button,
  Box,
  Grid,
  FormHelperText,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { useHttpService, useLoading } from '@/hooks'
import { registerInitialValues, registerValidationSchema } from './constants'
import AuthContext from '@/context/AuthContext.tsx'
import { AppRoute } from '@/routing/AppRoute.ts'
import type { RegisterCredentials } from '@/lib/auth.ts'

const RegisterForm: FC = () => {
  const { login } = useContext(AuthContext)
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
        login(res.token)
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
    <Box>
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
            <FormControl fullWidth error={!!formik.errors.username}>
              <TextField
                type="text"
                value={formik.values.username ?? ''}
                label="Username"
                onChange={(e) =>
                  formik.setFieldValue('username', e.target.value)
                }
                error={!!formik.errors.username}
              />
              {formik.errors.username && (
                <FormHelperText>{formik.errors.username}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!formik.errors.email}>
              <TextField
                type="text"
                value={formik.values.email ?? ''}
                label="Email"
                onChange={(e) => formik.setFieldValue('email', e.target.value)}
                error={!!formik.errors.email}
              />
              {formik.errors.email && (
                <FormHelperText>{formik.errors.email}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!formik.errors.password}>
              <TextField
                type="password"
                value={formik.values.password ?? ''}
                label="Password"
                onChange={(e) =>
                  formik.setFieldValue('password', e.target.value)
                }
                error={!!formik.errors.password}
              />
              {formik.errors.password && (
                <FormHelperText>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!formik.errors.repeatPassword}>
              <TextField
                type="password"
                value={formik.values.repeatPassword ?? ''}
                label="Repeat password"
                onChange={(e) =>
                  formik.setFieldValue('repeatPassword', e.target.value)
                }
                error={!!formik.errors.repeatPassword}
              />
              {formik.errors.repeatPassword && (
                <FormHelperText>{formik.errors.repeatPassword}</FormHelperText>
              )}
            </FormControl>
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
          <Button variant="text" component={RouterLink} to={AppRoute.LOGIN}>
            Already have an account?
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default memo(RegisterForm)
